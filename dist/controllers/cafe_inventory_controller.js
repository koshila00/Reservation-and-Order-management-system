"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CafeInventoryController = void 0;
const http_status_codes_1 = require("http-status-codes");
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
const ErrorHandler_1 = __importDefault(require("../utills/error/ErrorHandler"));
const responce_1 = __importDefault(require("../utills/responce"));
const storage_config_1 = __importDefault(require("../config/storage_config"));
const constants_1 = __importDefault(require("../utills/constants"));
class CafeInventoryController {
    constructor(cafeInventoryService) {
        this.cafeInventoryService = cafeInventoryService;
    }
    async createCafeItem(req, res) {
        const body = req.body;
        let file = req.file;
        try {
            //console.log(body);
            const createCafeItemDto = {
                cafeItemName: body.cafeItemName,
                cafeItemPrice: body.cafeItemPrice,
                cafeItemQty: body.cafeItemQty,
                cafeItemDescription: body.cafeItemDescription,
                cafeItemImage: body.cafeItemImage,
            };
            let uploadedObj = null;
            if (file) {
                uploadedObj = await storage_config_1.default.uploadImageAndGetUri(file, constants_1.default.CLOUDINARY.FILE_NAME + "/Cafe_Items");
            }
            if (uploadedObj != null) {
                createCafeItemDto.cafeItemImage = uploadedObj.uri.toString();
            }
            // console.log(createCafeItemDto);
            const createdCafeItem = await this.cafeInventoryService.createCafeItem(createCafeItemDto);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Cafe item created successfully!", createdCafeItem);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async updateCafeItem(req, res) {
        try {
            const cafeItemId = req.params.cafeItemId;
            const updateCafeItemDto = req.body;
            const updatedCafeItem = await this.cafeInventoryService.updateCafeItem(+cafeItemId, updateCafeItemDto);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Cafe item updated successfully!", updatedCafeItem);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async deleteCafeItem(req, res) {
        try {
            const cafeItemId = req.params.cafeItemId;
            const deleted = await this.cafeInventoryService.deleteCafeItem(+cafeItemId);
            if (!deleted) {
                throw new NotFoundError_1.default(`Cafe item with ID ${cafeItemId} not found`);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Cafe item deleted successfully!", "");
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getAllCafeItems(req, res) {
        try {
            const cafeItems = await this.cafeInventoryService.getAllCafeItems();
            if (!cafeItems || cafeItems.length === 0) {
                throw new NotFoundError_1.default("No cafe items found!");
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Cafe items fetched successfully!", cafeItems);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getOneCafeItem(req, res) {
        try {
            const cafeItemId = parseInt(req.params.cafeItemId, 10);
            const cafeItem = await this.cafeInventoryService.findCafeItemById(cafeItemId);
            if (!cafeItem) {
                throw new NotFoundError_1.default(`Cafe item with ID ${cafeItemId} not found`);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Cafe item retrieved successfully", cafeItem);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async reduceOne(req, res) {
        try {
            const cafeItemId = parseInt(req.params.cafeItemId, 10);
            const cafeItem = await this.cafeInventoryService.reduceCafeItemQty(cafeItemId);
            if (!cafeItem) {
                throw new NotFoundError_1.default(`Cafe item with ID ${cafeItemId} not found`);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Cafe item reduce successfully", cafeItem);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async increaseOne(req, res) {
        try {
            const cafeItemId = parseInt(req.params.cafeItemId, 10);
            const cafeItem = await this.cafeInventoryService.increaseCafeItemQty(cafeItemId);
            if (!cafeItem) {
                throw new NotFoundError_1.default(`Cafe item with ID ${cafeItemId} not found`);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Cafe item increase successfully", cafeItem);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
}
exports.CafeInventoryController = CafeInventoryController;
