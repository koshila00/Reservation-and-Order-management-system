"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// UserRouter.ts
const express_1 = require("express");
const user_middleware_1 = __importDefault(require("../middlewares/user_middleware"));
const user_controller_1 = require("../controllers/user_controller");
const constants_1 = __importDefault(require("../utills/constants"));
const user_service_1 = require("../services/user_service");
const user_repository_1 = require("../repositories/user_repository");
const User_1 = require("../entities/User");
const typeorm_1 = require("typeorm");
const UserRouter = (0, express_1.Router)();
const entityManager = (0, typeorm_1.getManager)();
// Create an instance of UserRepository and pass the EntityManager
const userRepository = new user_repository_1.UserRepository(User_1.User, entityManager);
const userService = new user_service_1.UserService(userRepository);
const userController = new user_controller_1.UserController(userService);
UserRouter.post("/register", userController.registerUser.bind(userController));
UserRouter.post("/login", userController.loginUser.bind(userController));
UserRouter.get("/profile", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), userController.getUserProfile.bind(userController));
UserRouter.get("/getAllUsers", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.USER,
    constants_1.default.USER.ROLES.ADMIN,
]), userController.getAllUsers.bind(userController));
UserRouter.delete("/deleteUser/:userId", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.ADMIN]), userController.deleteUser.bind(userController));
UserRouter.put("/updateUser", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), userController.updateUser.bind(userController));
exports.default = UserRouter;
