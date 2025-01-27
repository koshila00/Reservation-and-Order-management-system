"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
const BadRequestError_1 = __importDefault(require("../utills/error/error.classes/BadRequestError"));
const ErrorHandler_1 = __importDefault(require("../utills/error/ErrorHandler"));
const responce_1 = __importDefault(require("../utills/responce"));
const email_server_1 = require("../utills/email/email-server");
const email_templates_1 = __importDefault(require("../utills/email/email-templates"));
const user_utill_1 = __importDefault(require("../utills/user-utill"));
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async registerUser(req, res) {
        const body = req.body;
        try {
            const existingUser = await this.userService.findUserByEmail(body.userEmail);
            if (existingUser) {
                throw new BadRequestError_1.default("User already exists!");
            }
            const hashedPassword = await user_utill_1.default.hashPassword(body.userPassword); // Hash the password
            const createUserDto = {
                userName: body.userName,
                userAddress: body.userAddress,
                userPhoneNumber: body.userPhoneNumber,
                userEmail: body.userEmail,
                userPassword: hashedPassword, // Use the hashed password
                userRole: body.userRole,
            };
            const createdUser = await this.userService.createUser(createUserDto);
            if (createdUser) {
                const subject = "Register Success";
                const htmlBody = email_templates_1.default.UserRegisteredEmail({
                    fullName: `${createdUser.userName}`,
                });
                await (0, email_server_1.sendEmail)(createdUser.userEmail, subject, htmlBody, null);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "User registered successfully!", createdUser);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async loginUser(req, res) {
        const body = req.body;
        try {
            if (!body.userEmail || !body.userPassword) {
                throw new BadRequestError_1.default("Email and password are required");
            }
            const user = await this.userService.findUserByEmail(body.userEmail);
            if (!user) {
                throw new NotFoundError_1.default("Invalid email!");
            }
            const isPasswordMatch = await user_utill_1.default.comparePassword(body.userPassword, user.userPassword // Fix: Use user.userPassword instead of isAuthCheck.password
            );
            if (!isPasswordMatch) {
                throw new BadRequestError_1.default("Invalid password!");
            }
            // console.log(user.userId);
            let loggedInUser = {
                id: user.userId,
                fullName: user.userName,
                email: user.userEmail,
                role: user.userRole,
            };
            const token = user_utill_1.default.signToken(loggedInUser); // Fix: Use user instead of isAuthCheck
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Login successful!", {
                user: user,
                token,
                role: user.userRole,
            });
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getUserProfile(req, res) {
        try {
            const auth = req.auth;
            const user = await this.userService.findUserByEmail(auth.email);
            if (!user) {
                throw new NotFoundError_1.default("User not found!");
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Profile fetched successfully!", user);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async updateUser(req, res) {
        try {
            const userEmail = req.auth.email;
            const updateUserDto = req.body;
            const updatedUser = await this.userService.updateUser(userEmail, updateUserDto);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "User updated successfully!", updatedUser);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async deleteUser(req, res) {
        try {
            const userId = req.params.userId;
            const deletedUser = await this.userService.deleteUser(+userId);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "User deleted successfully!", deletedUser);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getAllUsers(req, res) {
        try {
            const users = await this.userService.getAllUsers();
            if (!users || users.length === 0) {
                throw new NotFoundError_1.default("No users found!");
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Users fetched successfully!", users);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
}
exports.UserController = UserController;
