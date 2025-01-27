"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountService = void 0;
const Discount_1 = require("../entities/Discount");
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
class DiscountService {
    constructor(discountRepository) {
        this.discountRepository = discountRepository;
    }
    async createDiscount(createDiscountDto) {
        var _a, _b;
        const newDiscount = new Discount_1.Discount();
        newDiscount.discountName = (_a = createDiscountDto.discountName) !== null && _a !== void 0 ? _a : "";
        newDiscount.discountPercentage = (_b = createDiscountDto.discountPercentage) !== null && _b !== void 0 ? _b : 0;
        return await this.discountRepository.save(newDiscount);
    }
    async updateDiscount(discountId, updateDiscountDto) {
        try {
            const discount = await this.findDiscountById(discountId);
            if (!discount) {
                throw new NotFoundError_1.default(`Discount with id ${discountId} not found`);
            }
            Object.assign(discount, updateDiscountDto);
            return await this.discountRepository.save(discount);
        }
        catch (error) {
            console.error("Error updating discount:", error);
            throw error;
        }
    }
    async findDiscountById(discountId) {
        const discount = await this.discountRepository.findOne({
            where: { discountId },
        });
        return discount || null;
    }
    async deleteDiscount(discountId) {
        const discount = await this.findDiscountById(discountId);
        if (!discount) {
            return false;
        }
        await this.discountRepository.remove(discount);
        return true;
    }
    async getAllDiscounts() {
        const discounts = await this.discountRepository.find();
        return discounts.map((discount) => ({
            discountId: discount.discountId,
            discountName: discount.discountName,
            discountPercentage: discount.discountPercentage,
        }));
    }
}
exports.DiscountService = DiscountService;
