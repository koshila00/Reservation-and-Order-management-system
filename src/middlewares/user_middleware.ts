import jwt from "jsonwebtoken";
import UserUtil from "../utills/user-utill";
import UnauthorizedError from "../utills/error/error.classes/UnauthorizedError";
import ForbiddenError from "../utills/error/error.classes/ForbiddenError";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utills/error/ErrorHandler";

declare global {
  namespace Express {
    interface Request {
      auth?: any;
    }
  }
}

const authorize = (rolesArray: any = []) => {
  if (!rolesArray) rolesArray = [];

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader: any = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedError("Authentication invalid!");
      }

      const token = UserUtil.extractToken(authHeader);

      if (token) {
        let payload: any = null;

        try {
          payload = UserUtil.verifyToken(token);

          // console.log(payload);
        } catch (error) {
          if (error instanceof jwt.TokenExpiredError)
            throw new UnauthorizedError("Your session is expired!");

          throw new UnauthorizedError(
            `You're unauthorized to access this resource!`
          );
        }

        if (rolesArray.length && !rolesArray.includes(payload.role)) {
          throw new ForbiddenError(
            `You're unauthorized to access this resource!`
          );
        }

        req.auth = payload;
        return next();
      } else {
        throw new UnauthorizedError(
          "You're unauthorized to access this resource!"
        );
      }
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  };
};

export default { authorize };
