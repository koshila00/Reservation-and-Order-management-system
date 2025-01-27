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
    constructor(cafeOrderItemService, cafeInventoryService) {
        this.cafeOrderItemService = cafeOrderItemService;
        this.cafeInventoryService = cafeInventoryService;
    }
    async createCafeOrderItems(req, res) {
        var _a, _b;
        try {
            const items = req.body.items;
            const orderId = req.body.orderId;
            const createdCafeOrderItems = [];
            for (const item of items) {
                const createdItem = await this.cafeOrderItemService.createCafeOrderItem(orderId, item);
                const cafeItemId = item.cafeItemId;
                if (cafeItemId === undefined) {
                    throw new Error("Cafe Item ID is undefined");
                }
                const cafeItem = await this.cafeInventoryService.findCafeItemById(cafeItemId);
                const newItemQty = ((_a = cafeItem === null || cafeItem === void 0 ? void 0 : cafeItem.cafeItemQty) !== null && _a !== void 0 ? _a : 0) - ((_b = item.cafeOrderItemQty) !== null && _b !== void 0 ? _b : 0);
                const updateCafeItemDto = {
                    cafeItemQty: newItemQty,
                };
                // Update inventory item count
                await this.cafeInventoryService.updateCafeItem(createdItem.cafeItemId, updateCafeItemDto);
                createdCafeOrderItems.push(createdItem);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Cafe order items created successfully!", createdCafeOrderItems);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async findCafeOrderItemsByOrderId(req, res) {
        try {
            const cafeOrderId = parseInt(req.params.cafeOrderId, 10);
            const cafeOrderItems = await this.cafeOrderItemService.findCafeOrderItemsByOrderId(cafeOrderId);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Cafe order items retrieved successfully", cafeOrderItems);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async deleteCafeOrderItemsByOrderId(req, res) {
        try {
            const cafeOrderId = parseInt(req.params.cafeOrderId, 10);
            const deleted = await this.cafeOrderItemService.deleteCafeOrderItemsByOrderId(cafeOrderId);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, deleted
                ? "Cafe order items deleted successfully!"
                : "No cafe order items found for deletion", "");
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getAllCafeOrderItems(req, res) {
        try {
            const cafeOrderItems = await this.cafeOrderItemService.getAllCafeOrderItems();
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "All cafe order items retrieved successfully", cafeOrderItems);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
}
exports.CafeOrderItemController = CafeOrderItemController;
