"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_utill_1 = __importDefault(require("../utills/user-utill"));
const UnauthorizedError_1 = __importDefault(require("../utills/error/error.classes/UnauthorizedError"));
const ForbiddenError_1 = __importDefault(require("../utills/error/error.classes/ForbiddenError"));
const ErrorHandler_1 = __importDefault(require("../utills/error/ErrorHandler"));
const authorize = (rolesArray = []) => {
    if (!rolesArray)
        rolesArray = [];
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                throw new UnauthorizedError_1.default("Authentication invalid!");
            }
            const token = user_utill_1.default.extractToken(authHeader);
            if (token) {
                let payload = null;
                try {
                    payload = user_utill_1.default.verifyToken(token);
                    // console.log(payload);
                }
                catch (error) {
                    if (error instanceof jsonwebtoken_1.default.TokenExpiredError)
                        throw new UnauthorizedError_1.default("Your session is expired!");
                    throw new UnauthorizedError_1.default(`You're unauthorized to access this resource!`);
                }
                if (rolesArray.length && !rolesArray.includes(payload.role)) {
                    throw new ForbiddenError_1.default(`You're unauthorized to access this resource!`);
                }
                req.auth = payload;
                return next();
            }
            else {
                throw new UnauthorizedError_1.default("You're unauthorized to access this resource!");
            }
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    };
};
exports.default = { authorize };
