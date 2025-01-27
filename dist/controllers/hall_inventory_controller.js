"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HallInventoryItemController = void 0;
const http_status_codes_1 = require("http-status-codes");
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
const ErrorHandler_1 = __importDefault(require("../utills/error/ErrorHandler"));
const responce_1 = __importDefault(require("../utills/responce"));
class HallInventoryItemController {
    constructor(hallInventoryService) {
        this.hallInventoryService = hallInventoryService;
    }
    async createHallInventoryItem(req, res) {
        const body = req.body;
        const file = req.file;
        try {
            const createHallInventoryItemDto = {
                hallInventoryItemName: body.hallItemName,
                hallInventoryItemPrice: body.hallItemPrice,
                hallInventoryItemQty: body.hallItemQty,
                hallInventoryItemDescription: body.hallItemDescription,
            };
            const createdHallInventoryItem = await this.hallInventoryService.createHallInventoryItem(createHallInventoryItemDto // Updated method name
            );
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Hall inventory item created successfully!", createdHallInventoryItem);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async updateHallInventoryItem(req, res) {
        try {
            const hallInventoryItemId = req.params.hallInventoryItemId;
            const updateHallInventoryItemDto = req.body;
            const updatedHallInventoryItem = await this.hallInventoryService.updateHallInventoryItem(
            // Updated method name
            +hallInventoryItemId, updateHallInventoryItemDto);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Hall inventory item updated successfully!", updatedHallInventoryItem);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async deleteHallInventoryItem(req, res) {
        try {
            const hallInventoryItemId = req.params.hallInventoryItemId;
            const deleted = await this.hallInventoryService.deleteHallInventoryItem(
            // Updated method name
            +hallInventoryItemId);
            if (!deleted) {
                throw new NotFoundError_1.default(`Hall inventory item with ID ${hallInventoryItemId} not found`);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Hall inventory item deleted successfully!", "");
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getAllHallInventoryItems(req, res) {
        try {
            const hallInventoryItems = await this.hallInventoryService.getAllHallInventoryItems(); // Updated method name
            if (!hallInventoryItems || hallInventoryItems.length === 0) {
                throw new NotFoundError_1.default("No hall inventory items found!");
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Hall inventory items fetched successfully!", hallInventoryItems);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getOneHallInventoryItem(req, res) {
        try {
            const hallInventoryItemId = parseInt(req.params.hallInventoryItemId, 10);
            const hallInventoryItem = await this.hallInventoryService.findHallInventoryItemById(
            // Updated method name
            hallInventoryItemId);
            if (!hallInventoryItem) {
                throw new NotFoundError_1.default(`Hall inventory item with ID ${hallInventoryItemId} not found`);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Hall inventory item retrieved successfully", hallInventoryItem);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async reduceOne(req, res) {
        try {
            const hallInventoryItemId = parseInt(req.params.hallInventoryItemId, 10);
            const hallInventoryItem = await this.hallInventoryService.reduceHallItemQty(hallInventoryItemId);
            if (!hallInventoryItem) {
                throw new NotFoundError_1.default(`Hall item with ID ${hallInventoryItemId} not found`);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Hall item reduce successfully", hallInventoryItem);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async increaseOne(req, res) {
        try {
            const hallInventoryItemId = parseInt(req.params.hallInventoryItemId, 10);
            const hallInventoryItem = await this.hallInventoryService.increaseHallItemQty(hallInventoryItemId);
            if (!hallInventoryItem) {
                throw new NotFoundError_1.default(`Hall item with ID ${hallInventoryItemId} not found`);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Hall item increase successfully", hallInventoryItem);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
}
exports.HallInventoryItemController = HallInventoryItemController;
