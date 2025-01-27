"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HallMenuPackageItemsController = void 0;
const http_status_codes_1 = require("http-status-codes");
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
const ErrorHandler_1 = __importDefault(require("../utills/error/ErrorHandler"));
const responce_1 = __importDefault(require("../utills/responce"));
class HallMenuPackageItemsController {
    constructor(hallMenuPackageItemsService) {
        this.hallMenuPackageItemsService = hallMenuPackageItemsService;
    }
    async createHallMenuPackageItem(req, res) {
        try {
            const body = req.body;
            const createHallMenuPackageItemDto = {
                hallMenuPackageItemName: body.hallMenuPackageItemName,
                hallMenuPackageId: body.hallMenuPackageId,
            };
            const createdHallMenuPackageItem = await this.hallMenuPackageItemsService.createHallMenuPackageItem(createHallMenuPackageItemDto);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Hall menu package item created successfully!", createdHallMenuPackageItem);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async updateHallMenuPackageItem(req, res) {
        try {
            const hallMenuPackageItemId = req.params.hallMenuPackageItemId;
            const updateHallMenuPackageItemDto = req.body;
            const updatedHallMenuPackageItem = await this.hallMenuPackageItemsService.updateHallMenuPackageItem(+hallMenuPackageItemId, updateHallMenuPackageItemDto);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Hall menu package item updated successfully!", updatedHallMenuPackageItem);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async deleteHallMenuPackageItem(req, res) {
        try {
            const hallMenuPackageItemId = req.params.hallMenuPackageItemId;
            const deleted = await this.hallMenuPackageItemsService.deleteHallMenuPackageItem(+hallMenuPackageItemId);
            if (!deleted) {
                throw new NotFoundError_1.default(`Hall menu package item with ID ${hallMenuPackageItemId} not found`);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Hall menu package item deleted successfully!", "");
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getAllHallMenuPackageItems(req, res) {
        try {
            const hallMenuPackageItems = await this.hallMenuPackageItemsService.getAllHallMenuPackageItems();
            if (!hallMenuPackageItems || hallMenuPackageItems.length === 0) {
                throw new NotFoundError_1.default("No hall menu package items found!");
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Hall menu package items fetched successfully!", hallMenuPackageItems);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getOneHallMenuPackageItem(req, res) {
        try {
            const hallMenuPackageItemId = parseInt(req.params.hallMenuPackageItemId, 10);
            const hallMenuPackageItem = await this.hallMenuPackageItemsService.findHallMenuPackageItemById(hallMenuPackageItemId);
            if (!hallMenuPackageItem) {
                throw new NotFoundError_1.default(`Hall menu package item with ID ${hallMenuPackageItemId} not found`);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Hall menu package item retrieved successfully", hallMenuPackageItem);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
}
exports.HallMenuPackageItemsController = HallMenuPackageItemsController;
