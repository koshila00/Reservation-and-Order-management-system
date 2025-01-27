"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HallInventoryService = void 0;
const HallInventory_1 = require("../entities/HallInventory");
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
class HallInventoryService {
    constructor(hallInventoryRepository) {
        this.hallInventoryRepository = hallInventoryRepository;
    }
    async createHallInventoryItem(createHallInventoryItemDto // Updated parameter name
    ) {
        var _a, _b, _c, _d;
        const newHallInventoryItem = new HallInventory_1.HallInventory(); // Updated variable name
        newHallInventoryItem.hallInventoryItemName =
            (_a = createHallInventoryItemDto.hallInventoryItemName) !== null && _a !== void 0 ? _a : ""; // Updated property name
        newHallInventoryItem.hallInventoryItemPrice =
            (_b = createHallInventoryItemDto.hallInventoryItemPrice) !== null && _b !== void 0 ? _b : 0; // Updated property name
        newHallInventoryItem.hallInventoryItemQty =
            (_c = createHallInventoryItemDto.hallInventoryItemQty) !== null && _c !== void 0 ? _c : 0; // Updated property name
        newHallInventoryItem.hallInventoryItemDescription =
            (_d = createHallInventoryItemDto.hallInventoryItemDescription) !== null && _d !== void 0 ? _d : ""; // Updated property name
        return await this.hallInventoryRepository.save(newHallInventoryItem);
    }
    async updateHallInventoryItem(hallInventoryItemId, // Updated parameter name
    updateHallInventoryItemDto // Updated parameter name
    ) {
        try {
            const hallInventoryItem = await this.findHallInventoryItemById(hallInventoryItemId); // Updated method name
            if (!hallInventoryItem) {
                throw new NotFoundError_1.default(`Hall inventory item with id ${hallInventoryItemId} not found`); // Updated error message
            }
            Object.assign(hallInventoryItem, updateHallInventoryItemDto);
            return await this.hallInventoryRepository.save(hallInventoryItem);
        }
        catch (error) {
            console.error("Error updating hall inventory item:", error);
            throw error;
        }
    }
    async findHallInventoryItemById(hallInventoryItemId // Updated parameter name
    ) {
        const hallInventoryItem = await this.hallInventoryRepository.findOne({
            where: { hallInventoryItemId }, // Updated property name
        });
        return hallInventoryItem || null;
    }
    async deleteHallInventoryItem(hallInventoryItemId) {
        const hallInventoryItem = await this.findHallInventoryItemById(hallInventoryItemId);
        if (!hallInventoryItem) {
            return false;
        }
        // Mark the item as deleted instead of removing it
        hallInventoryItem.isDelete = true;
        await this.hallInventoryRepository.save(hallInventoryItem);
        return true;
    }
    async getActiveHallInventoryItems() {
        return this.hallInventoryRepository.find({ where: { isDelete: false } });
    }
    async getAllHallInventoryItems() {
        const hallInventoryItems = await this.hallInventoryRepository.find({
            where: { isDelete: false },
        });
        return hallInventoryItems.map((hallInventoryItem) => ({
            hallInventoryItemId: hallInventoryItem.hallInventoryItemId,
            hallInventoryItemName: hallInventoryItem.hallInventoryItemName,
            hallInventoryItemPrice: hallInventoryItem.hallInventoryItemPrice,
            hallInventoryItemQty: hallInventoryItem.hallInventoryItemQty,
            hallInventoryItemDescription: hallInventoryItem.hallInventoryItemDescription,
        }));
    }
    async reduceHallItemQty(hallInventoryItemId) {
        const hallItem = await this.hallInventoryRepository.findOne({
            where: { hallInventoryItemId },
        });
        if (!hallItem) {
            throw new NotFoundError_1.default(`Hall item with id ${hallInventoryItemId} not found`);
        }
        hallItem.hallInventoryItemQty -= 1;
        if (hallItem.hallInventoryItemQty < 0) {
            throw new NotFoundError_1.default(`Cannot reduce quantity below 0`);
        }
        return await this.hallInventoryRepository.save(hallItem);
    }
    async increaseHallItemQty(hallInventoryItemId) {
        const hallItem = await this.hallInventoryRepository.findOne({
            where: { hallInventoryItemId },
        });
        if (!hallItem) {
            throw new NotFoundError_1.default(`Hall item with id ${hallInventoryItemId} not found`);
        }
        hallItem.hallInventoryItemQty += 1;
        return await this.hallInventoryRepository.save(hallItem);
    }
}
exports.HallInventoryService = HallInventoryService;
