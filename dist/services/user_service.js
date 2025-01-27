"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../entities/User");
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(createUserDto) {
        var _a, _b, _c, _d, _e, _f;
        const newUser = new User_1.User();
        newUser.userName = (_a = createUserDto.userName) !== null && _a !== void 0 ? _a : "";
        newUser.userAddress = (_b = createUserDto.userAddress) !== null && _b !== void 0 ? _b : ""; // Use empty string if userAddress is undefined
        newUser.userPhoneNumber = (_c = createUserDto.userPhoneNumber) !== null && _c !== void 0 ? _c : ""; // Use empty string if userPhoneNumber is undefined
        newUser.userEmail = (_d = createUserDto.userEmail) !== null && _d !== void 0 ? _d : ""; // Use empty string if userEmail is undefined
        newUser.userPassword = (_e = createUserDto.userPassword) !== null && _e !== void 0 ? _e : ""; // Use empty string if userPassword is undefined
        newUser.userRole = (_f = createUserDto.userRole) !== null && _f !== void 0 ? _f : ""; // Use empty string if userRole is undefined
        return await this.userRepository.save(newUser);
    }
    async updateUser(userEmail, updateUserDto) {
        try {
            const user = await this.findUserByEmail(userEmail);
            if (!user) {
                throw new NotFoundError_1.default(`User with email ${userEmail} not found`);
            }
            Object.assign(user, updateUserDto);
            return await this.userRepository.save(user);
        }
        catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    }
    async findUserById(userId) {
        const user = await this.findUserById(userId);
        // if (!user) {
        //   throw new NotFoundError(`User with id ${userId} not found`);
        // }
        return user;
    }
    async findUserByEmail(email) {
        const user = await this.userRepository.findOne({
            where: { userEmail: email },
        });
        return user || null;
    }
    async deleteUser(userId) {
        const user = await this.findUserById(userId);
        await this.userRepository.remove(user);
        return true;
    }
    async getAllUsers() {
        const users = await this.userRepository.find();
        return users.map((user) => ({
            userId: user.userId,
            userName: user.userName,
            userAddress: user.userAddress,
            userPhoneNumber: user.userPhoneNumber,
            userEmail: user.userEmail,
            userRole: user.userRole,
        }));
    }
}
exports.UserService = UserService;
