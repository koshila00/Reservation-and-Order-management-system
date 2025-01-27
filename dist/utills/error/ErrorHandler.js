"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundError_1 = __importDefault(require("./error.classes/NotFoundError"));
const BadRequestError_1 = __importDefault(require("./error.classes/BadRequestError"));
const ForbiddenError_1 = __importDefault(require("./error.classes/ForbiddenError"));
const ConflictError_1 = __importDefault(require("./error.classes/ConflictError"));
const UnauthorizedError_1 = __importDefault(require("./error.classes/UnauthorizedError"));
const InternalServerError_1 = __importDefault(require("./error.classes/InternalServerError"));
const CustomAPIError_1 = __importDefault(require("./error.classes/CustomAPIError"));
const responce_1 = __importDefault(require("../responce"));
class ErrorHandler {
    static handle(res, err) {
        if (err instanceof NotFoundError_1.default) {
            return (0, responce_1.default)(res, false, err.statusCode, err.message, null);
        }
        else if (err instanceof BadRequestError_1.default) {
            return (0, responce_1.default)(res, false, err.statusCode, err.message, null);
        }
        else if (err instanceof ForbiddenError_1.default) {
            return (0, responce_1.default)(res, false, err.statusCode, err.message, null);
        }
        else if (err instanceof ConflictError_1.default) {
            return (0, responce_1.default)(res, false, err.statusCode, err.message, null);
        }
        else if (err instanceof UnauthorizedError_1.default) {
            return (0, responce_1.default)(res, false, err.statusCode, err.message, null);
        }
        else if (err instanceof InternalServerError_1.default) {
            return (0, responce_1.default)(res, false, err.statusCode, err.message, null);
        }
        else if (err instanceof CustomAPIError_1.default) {
            return (0, responce_1.default)(res, false, 500, err.message, null);
        }
        else {
            console.error(err);
            return (0, responce_1.default)(res, false, 500, "Internal server error", null);
        }
    }
}
exports.default = ErrorHandler;
