"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CafeInventoryService = void 0;
const CafeInventory_1 = require("../entities/CafeInventory");
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
class CafeInventoryService {
    constructor(cafeInventoryRepository) {
        this.cafeInventoryRepository = cafeInventoryRepository;
    }
    async createCafeItem(createCafeItemDto) {
        var _a, _b, _c, _d, _e;
        const newCafeItem = new CafeInventory_1.CafeInventory();
        newCafeItem.cafeItemName = (_a = createCafeItemDto.cafeItemName) !== null && _a !== void 0 ? _a : "";
        newCafeItem.cafeItemPrice = (_b = createCafeItemDto.cafeItemPrice) !== null && _b !== void 0 ? _b : 0;
        newCafeItem.cafeItemQty = (_c = createCafeItemDto.cafeItemQty) !== null && _c !== void 0 ? _c : 0;
        newCafeItem.cafeItemDescription =
            (_d = createCafeItemDto.cafeItemDescription) !== null && _d !== void 0 ? _d : "";
        newCafeItem.cafeItemImage = (_e = createCafeItemDto.cafeItemImage) !== null && _e !== void 0 ? _e : "";
        return await this.cafeInventoryRepository.save(newCafeItem);
    }
    async updateCafeItem(cafeItemId, updateCafeItemDto) {
        try {
            const cafeItem = await this.findCafeItemById(cafeItemId);
            if (!cafeItem) {
                throw new NotFoundError_1.default(`Cafe item with id ${cafeItemId} not found`);
            }
            Object.assign(cafeItem, updateCafeItemDto);
            return await this.cafeInventoryRepository.save(cafeItem);
        }
        catch (error) {
            console.error("Error updating cafe item:", error);
            throw error;
        }
    }
    async findCafeItemById(cafeItemId) {
        const cafeItem = await this.cafeInventoryRepository.findOne({
            where: { cafeItemId },
        });
        return cafeItem || null;
    }
    async deleteCafeItem(cafeItemId) {
        const cafeItem = await this.findCafeItemById(cafeItemId);
        if (!cafeItem) {
            return false;
        }
        cafeItem.isDelete = true;
        await this.cafeInventoryRepository.save(cafeItem);
        return true;
    }
    async getAllCafeItems() {
        const cafeItems = await this.cafeInventoryRepository.find({
            where: { isDelete: false },
        });
        return cafeItems.map((cafeItem) => ({
            cafeItemId: cafeItem.cafeItemId,
            cafeItemName: cafeItem.cafeItemName,
            cafeItemPrice: cafeItem.cafeItemPrice,
            cafeItemQty: cafeItem.cafeItemQty,
            cafeItemDescription: cafeItem.cafeItemDescription,
            cafeItemImage: cafeItem.cafeItemImage,
        }));
    }
    async reduceCafeItemQty(cafeItemId) {
        const cafeItem = await this.cafeInventoryRepository.findOne({
            where: { cafeItemId },
        });
        if (!cafeItem) {
            throw new NotFoundError_1.default(`Cafe item with id ${cafeItemId} not found`);
        }
        cafeItem.cafeItemQty -= 1;
        if (cafeItem.cafeItemQty < 0) {
            throw new NotFoundError_1.default(`Cannot reduce quantity below 0`);
        }
        return await this.cafeInventoryRepository.save(cafeItem);
    }
    async increaseCafeItemQty(cafeItemId) {
        const cafeItem = await this.cafeInventoryRepository.findOne({
            where: { cafeItemId },
        });
        if (!cafeItem) {
            throw new NotFoundError_1.default(`Cafe item with id ${cafeItemId} not found`);
        }
        cafeItem.cafeItemQty += 1;
        return await this.cafeInventoryRepository.save(cafeItem);
    }
}
exports.CafeInventoryService = CafeInventoryService;
