"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CafeOrderService = void 0;
const CafeOrder_1 = require("../entities/CafeOrder");
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
class CafeOrderService {
    constructor(cafeOrderRepository) {
        this.cafeOrderRepository = cafeOrderRepository;
    }
    async createCafeOrder(createCafeOrderDto) {
        var _a, _b, _c, _d, _e;
        const newCafeOrder = new CafeOrder_1.CafeOrder();
        newCafeOrder.userId = (_a = createCafeOrderDto.userId) !== null && _a !== void 0 ? _a : 0;
        newCafeOrder.cafeOrderTotal = (_b = createCafeOrderDto.cafeOrderTotal) !== null && _b !== void 0 ? _b : 0;
        newCafeOrder.cafeOrderDeliveryStatus =
            (_c = createCafeOrderDto.cafeOrderDeliveryStatus) !== null && _c !== void 0 ? _c : "";
        newCafeOrder.cafeOrderType = (_d = createCafeOrderDto.cafeOrderType) !== null && _d !== void 0 ? _d : "";
        newCafeOrder.discountId = (_e = createCafeOrderDto.discountId) !== null && _e !== void 0 ? _e : 0;
        return await this.cafeOrderRepository.save(newCafeOrder);
    }
    async updateCafeOrder(cafeOrderId, updateCafeOrderDto) {
        try {
            const cafeOrder = await this.findCafeOrderById(cafeOrderId);
            if (!cafeOrder) {
                throw new NotFoundError_1.default(`Cafe order with id ${cafeOrderId} not found`);
            }
            Object.assign(cafeOrder, updateCafeOrderDto);
            return await this.cafeOrderRepository.save(cafeOrder);
        }
        catch (error) {
            console.error("Error updating cafe order:", error);
            throw error;
        }
    }
    async findCafeOrderById(cafeOrderId) {
        const cafeOrder = await this.cafeOrderRepository.findOne({
            where: { cafeOrderId },
            relations: ["user", "discount"],
        });
        return cafeOrder || null;
    }
    async deleteCafeOrder(cafeOrderId) {
        const cafeOrder = await this.findCafeOrderById(cafeOrderId);
        if (!cafeOrder) {
            return false;
        }
        await this.cafeOrderRepository.remove(cafeOrder);
        return true;
    }
    async getAllCafeOrders() {
        const cafeOrders = await this.cafeOrderRepository.find({
            relations: ["user", "discount"], // Include the user and discount relations
        });
        return cafeOrders.map((cafeOrder) => ({
            cafeOrderId: cafeOrder.cafeOrderId,
            user: {
                userId: cafeOrder.user.userId,
                userName: cafeOrder.user.userName,
                // Include other user details as needed
            },
            cafeOrderTotal: cafeOrder.cafeOrderTotal,
            createdDate: cafeOrder.createdDate,
            updatedDate: cafeOrder.updatedDate,
            cafeOrderDeliveryStatus: cafeOrder.cafeOrderDeliveryStatus,
            cafeOrderType: cafeOrder.cafeOrderType,
            discount: cafeOrder.discount
                ? {
                    discountId: cafeOrder.discount.discountId,
                    discountName: cafeOrder.discount.discountName,
                    // Include other discount details as needed
                }
                : null,
        }));
    }
}
exports.CafeOrderService = CafeOrderService;
