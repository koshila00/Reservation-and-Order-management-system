// UserRouter.ts
import { Router } from "express";
import UserMiddleware from "../middlewares/user_middleware";
import { UserController } from "../controllers/user_controller";
import constants from "../utills/constants";
import { UserService } from "../services/user_service";
import { UserRepository } from "../repositories/user_repository";
import { User } from "../entities/User";
import { getManager } from "typeorm";

const UserRouter = Router();

const entityManager = getManager();

// Create an instance of UserRepository and pass the EntityManager
const userRepository = new UserRepository(User, entityManager);

const userService = new UserService(userRepository);

const userController = new UserController(userService);

UserRouter.post("/register", userController.registerUser.bind(userController));
UserRouter.post("/login", userController.loginUser.bind(userController));
UserRouter.get(
  "/profile",
  UserMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  userController.getUserProfile.bind(userController)
);
UserRouter.get(
  "/getAllUsers",
  UserMiddleware.authorize([
    constants.USER.ROLES.USER,
    constants.USER.ROLES.ADMIN,
  ]),
  userController.getAllUsers.bind(userController)
);
UserRouter.delete(
  "/deleteUser/:userId",
  UserMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  userController.deleteUser.bind(userController)
);

UserRouter.put(
  "/updateUser",
  UserMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  userController.updateUser.bind(userController)
);

export default UserRouter;
