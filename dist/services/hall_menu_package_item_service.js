"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HallMenuPackageItemsService = void 0;
const HallMenuPackageItems_1 = require("../entities/HallMenuPackageItems");
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
class HallMenuPackageItemsService {
    constructor(hallMenuPackageItemsRepository) {
        this.hallMenuPackageItemsRepository = hallMenuPackageItemsRepository;
    }
    async createHallMenuPackageItem(createHallMenuPackageItemDto) {
        var _a;
        const newHallMenuPackageItem = new HallMenuPackageItems_1.HallMenuPackageItems();
        newHallMenuPackageItem.hallMenuPackageItemName =
            (_a = createHallMenuPackageItemDto.hallMenuPackageItemName) !== null && _a !== void 0 ? _a : "";
        newHallMenuPackageItem.hallMenuPackageId =
            createHallMenuPackageItemDto.hallMenuPackageId;
        return await this.hallMenuPackageItemsRepository.save(newHallMenuPackageItem);
    }
    async updateHallMenuPackageItem(hallMenuPackageItemId, updateHallMenuPackageItemDto) {
        try {
            const hallMenuPackageItem = await this.findHallMenuPackageItemById(hallMenuPackageItemId);
            if (!hallMenuPackageItem) {
                throw new NotFoundError_1.default(`Hall menu package item with id ${hallMenuPackageItemId} not found`);
            }
            Object.assign(hallMenuPackageItem, updateHallMenuPackageItemDto);
            return await this.hallMenuPackageItemsRepository.save(hallMenuPackageItem);
        }
        catch (error) {
            console.error("Error updating hall menu package item:", error);
            throw error;
        }
    }
    async findHallMenuPackageItemById(hallMenuPackageItemId) {
        const hallMenuPackageItem = await this.hallMenuPackageItemsRepository.findOne({
            where: { hallMenuPackageItemId },
        });
        return hallMenuPackageItem || null;
    }
    async deleteHallMenuPackageItem(hallMenuPackageItemId) {
        const hallMenuPackageItem = await this.findHallMenuPackageItemById(hallMenuPackageItemId);
        if (!hallMenuPackageItem) {
            return false;
        }
        await this.hallMenuPackageItemsRepository.remove(hallMenuPackageItem);
        return true;
    }
    async getAllHallMenuPackageItems() {
        return await this.hallMenuPackageItemsRepository.find();
    }
    async getHallMenuPackageItemWithPackageDetails(hallMenuPackageItemId) {
        const hallMenuPackageItem = await this.findHallMenuPackageItemById(hallMenuPackageItemId);
        if (!hallMenuPackageItem) {
            return null;
        }
        // Fetch associated hall menu package details
        await hallMenuPackageItem.hallMenuPackage;
        return hallMenuPackageItem;
    }
}
exports.HallMenuPackageItemsService = HallMenuPackageItemsService;
