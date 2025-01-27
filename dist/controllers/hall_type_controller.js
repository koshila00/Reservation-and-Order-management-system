"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HallTypeController = void 0;
const http_status_codes_1 = require("http-status-codes");
const responce_1 = __importDefault(require("../utills/responce"));
const ErrorHandler_1 = __importDefault(require("../utills/error/ErrorHandler"));
class HallTypeController {
    constructor(hallTypeService) {
        this.hallTypeService = hallTypeService;
    }
    async createHallType(req, res) {
        try {
            const createHallTypeDto = req.body;
            const createdHallType = await this.hallTypeService.createHallType(createHallTypeDto);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Hall type created successfully!", createdHallType);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async updateHallType(req, res) {
        try {
            const hallTypeId = parseInt(req.params.hallTypeId, 10);
            const updateHallTypeDto = req.body;
            const updatedHallType = await this.hallTypeService.updateHallType(hallTypeId, updateHallTypeDto);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Hall type updated successfully!", updatedHallType);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async deleteHallType(req, res) {
        try {
            const hallTypeId = parseInt(req.params.hallTypeId, 10);
            const deleted = await this.hallTypeService.deleteHallType(hallTypeId);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, deleted
                ? "Hall type deleted successfully!"
                : "Hall type not found for deletion", "");
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getAllHallTypes(req, res) {
        try {
            const hallTypes = await this.hallTypeService.getAllHallTypes();
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "All hall types retrieved successfully", hallTypes);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getOneHallType(req, res) {
        try {
            const hallTypeId = parseInt(req.params.hallTypeId, 10);
            const hallType = await this.hallTypeService.getHallTypeById(hallTypeId);
            if (!hallType) {
                return (0, responce_1.default)(res, false, http_status_codes_1.StatusCodes.NOT_FOUND, `Hall type with id ${hallTypeId} not found`, null);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Hall type retrieved successfully", hallType);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
}
exports.HallTypeController = HallTypeController;
