"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountController = void 0;
const http_status_codes_1 = require("http-status-codes");
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
const ErrorHandler_1 = __importDefault(require("../utills/error/ErrorHandler"));
const responce_1 = __importDefault(require("../utills/responce"));
class DiscountController {
    constructor(discountService) {
        this.discountService = discountService;
    }
    async createDiscount(req, res) {
        const body = req.body;
        try {
            const createDiscountDto = {
                discountName: body.discountName,
                discountPercentage: body.discountPercentage,
            };
            const createdDiscount = await this.discountService.createDiscount(createDiscountDto);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Discount created successfully!", createdDiscount);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async updateDiscount(req, res) {
        try {
            const discountId = req.params.discountId;
            const updateDiscountDto = req.body;
            const updatedDiscount = await this.discountService.updateDiscount(+discountId, updateDiscountDto);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Discount updated successfully!", updatedDiscount);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async deleteDiscount(req, res) {
        try {
            const discountId = req.params.discountId;
            const deleted = await this.discountService.deleteDiscount(+discountId);
            if (!deleted) {
                throw new NotFoundError_1.default(`Discount with ID ${discountId} not found`);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Discount deleted successfully!", "");
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getAllDiscounts(req, res) {
        try {
            const discounts = await this.discountService.getAllDiscounts();
            if (!discounts || discounts.length === 0) {
                throw new NotFoundError_1.default("No discounts found!");
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Discounts fetched successfully!", discounts);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getOneDiscount(req, res) {
        try {
            const discountId = parseInt(req.params.discountId, 10);
            const discount = await this.discountService.findDiscountById(discountId);
            if (!discount) {
                throw new NotFoundError_1.default(`Discount with ID ${discountId} not found`);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Discount retrieved successfully", discount);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
}
exports.DiscountController = DiscountController;
