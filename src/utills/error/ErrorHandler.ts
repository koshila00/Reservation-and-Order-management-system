import { Response } from "express";
import NotFoundError from "./error.classes/NotFoundError";
import BadRequestError from "./error.classes/BadRequestError";
import ForbiddenError from "./error.classes/ForbiddenError";
import ConflictError from "./error.classes/ConflictError";
import UnauthorizedError from "./error.classes/UnauthorizedError";
import InternalServerError from "./error.classes/InternalServerError";
import CustomAPIError from "./error.classes/CustomAPIError";
import CustomResponse from "../responce";

class ErrorHandler {
  static handle(res: Response, err: any) {
    if (err instanceof NotFoundError) {
      return CustomResponse(res, false, err.statusCode, err.message, null);
    } else if (err instanceof BadRequestError) {
      return CustomResponse(res, false, err.statusCode, err.message, null);
    } else if (err instanceof ForbiddenError) {
      return CustomResponse(res, false, err.statusCode, err.message, null);
    } else if (err instanceof ConflictError) {
      return CustomResponse(res, false, err.statusCode, err.message, null);
    } else if (err instanceof UnauthorizedError) {
      return CustomResponse(res, false, err.statusCode, err.message, null);
    } else if (err instanceof InternalServerError) {
      return CustomResponse(res, false, err.statusCode, err.message, null);
    } else if (err instanceof CustomAPIError) {
      return CustomResponse(res, false, 500, err.message, null);
    } else {
      console.error(err);
      return CustomResponse(res, false, 500, "Internal server error", null);
    }
  }
}

export default ErrorHandler;
