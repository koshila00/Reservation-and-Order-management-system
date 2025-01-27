import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserService } from "../services/user_service";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/User_Dto";
import NotFoundError from "../utills/error/error.classes/NotFoundError";
import BadRequestError from "../utills/error/error.classes/BadRequestError";
import ErrorHandler from "../utills/error/ErrorHandler";
import CustomResponse from "../utills/responce";
import { sendEmail } from "../utills/email/email-server";
import emailService from "../utills/email/email-templates";
import userUtill from "../utills/user-utill";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async registerUser(req: Request, res: Response) {
    const body: any = req.body;

    try {
      const existingUser = await this.userService.findUserByEmail(
        body.userEmail
      );

      if (existingUser) {
        throw new BadRequestError("User already exists!");
      }

      const hashedPassword = await userUtill.hashPassword(body.userPassword); // Hash the password

      const createUserDto: CreateUserDTO = {
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
        const htmlBody = emailService.UserRegisteredEmail({
          fullName: `${createdUser.userName}`,
        });
        await sendEmail(createdUser.userEmail, subject, htmlBody, null);
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.CREATED,
        "User registered successfully!",
        createdUser
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async loginUser(req: Request, res: Response) {
    const body: any = req.body;

    try {
      if (!body.userEmail || !body.userPassword) {
        throw new BadRequestError("Email and password are required");
      }

      const user = await this.userService.findUserByEmail(body.userEmail);

      if (!user) {
        throw new NotFoundError("Invalid email!");
      }

      const isPasswordMatch = await userUtill.comparePassword(
        body.userPassword,
        user.userPassword // Fix: Use user.userPassword instead of isAuthCheck.password
      );

      if (!isPasswordMatch) {
        throw new BadRequestError("Invalid password!");
      }

      // console.log(user.userId);

      let loggedInUser = {
        id: user.userId,
        fullName: user.userName,
        email: user.userEmail,
        role: user.userRole,
      };

      const token = userUtill.signToken(loggedInUser); // Fix: Use user instead of isAuthCheck

      return CustomResponse(res, true, StatusCodes.OK, "Login successful!", {
        user: user,
        token,
        role: user.userRole,
      });
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getUserProfile(req: Request, res: Response) {
    try {
      const auth: any = req.auth;

      const user = await this.userService.findUserByEmail(auth.email);

      if (!user) {
        throw new NotFoundError("User not found!");
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Profile fetched successfully!",
        user
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const userEmail = req.auth.email;

      const updateUserDto: UpdateUserDTO = req.body;

      const updatedUser = await this.userService.updateUser(
        userEmail,
        updateUserDto
      );

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "User updated successfully!",
        updatedUser
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;

      const deletedUser = await this.userService.deleteUser(+userId);

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "User deleted successfully!",
        deletedUser
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();

      if (!users || users.length === 0) {
        throw new NotFoundError("No users found!");
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Users fetched successfully!",
        users
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }
}
