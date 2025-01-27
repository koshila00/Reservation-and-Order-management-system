"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CafeOrderItemService = void 0;
const CafeOrderItem_1 = require("../entities/CafeOrderItem");
class CafeOrderItemService {
    constructor(cafeOrderItemRepository) {
        this.cafeOrderItemRepository = cafeOrderItemRepository;
    }
    async createCafeOrderItem(orderId, createCafeOrderItemDto) {
        var _a, _b;
        try {
            const newCafeOrderItem = new CafeOrderItem_1.CafeOrderItem();
            newCafeOrderItem.cafeOrderId = orderId !== null && orderId !== void 0 ? orderId : 0;
            newCafeOrderItem.cafeItemId = (_a = createCafeOrderItemDto.cafeItemId) !== null && _a !== void 0 ? _a : 0;
            newCafeOrderItem.cafeOrderItemQty =
                (_b = createCafeOrderItemDto.cafeOrderItemQty) !== null && _b !== void 0 ? _b : 0;
            return await this.cafeOrderItemRepository.save(newCafeOrderItem);
        }
        catch (error) {
            console.error("Error creating cafe order item:", error);
            throw error;
        }
    }
    async findCafeOrderItemsByOrderId(cafeOrderId) {
        return await this.cafeOrderItemRepository.find({
            where: { cafeOrderId },
            relations: ["cafeOrder", "cafeInventory"],
        });
    }
    async deleteCafeOrderItemsByOrderId(cafeOrderId) {
        try {
            const cafeOrderItems = await this.cafeOrderItemRepository.find({
                where: { cafeOrderId },
            });
            if (!cafeOrderItems || cafeOrderItems.length === 0) {
                return false;
            }
            await this.cafeOrderItemRepository.remove(cafeOrderItems);
            return true;
        }
        catch (error) {
            console.error("Error deleting cafe order items:", error);
            throw error;
        }
    }
    async getAllCafeOrderItems() {
        return await this.cafeOrderItemRepository.find({
            relations: ["cafeOrder", "cafeInventory"],
        });
    }
}
exports.CafeOrderItemService = CafeOrderItemService;
