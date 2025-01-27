"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CafeOrderItemController = void 0;
const http_status_codes_1 = require("http-status-codes");
const responce_1 = __importDefault(require("../utills/responce"));
const ErrorHandler_1 = __importDefault(require("../utills/error/ErrorHandler"));
class CafeOrderItemController {
    constructor(cafeOrderItemService) {
        this.cafeOrderItemService = cafeOrderItemService;
    }
    async createCafeOrderItems(req, res) {
        const body = req.body;
        try {
            let cafeOrderItems = [];
            const items = body.items;
            const createItemPromises = [];
            for (const itemData of items) {
                const createCafeOrderItemDto = {
                    cafeOrderId: 10,
                    cafeItemId: itemData.cafeItemId,
                    cafeOrderItemQty: itemData.cafeOrderItemQty,
                };
                createItemPromises.push(this.cafeOrderItemService.createCafeOrderItems([
                    createCafeOrderItemDto,
                ]));
            }
            // Wait for all cafe order items to be created
            cafeOrderItems = await Promise.all(createItemPromises);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Cafe order items created successfully!", cafeOrderItems);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getAllCafeOrderItems(req, res) {
        try {
            const cafeOrderItems = await this.cafeOrderItemService.getAllCafeOrderItems();
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "All cafe order items fetched successfully!", cafeOrderItems);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
}
exports.CafeOrderItemController = CafeOrderItemController;
