"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const discount_controller_1 = require("../controllers/discount_controller");
const constants_1 = __importDefault(require("../utills/constants"));
const discount_service_1 = require("../services/discount_service");
const discount_repository_1 = require("../repositories/discount_repository");
const Discount_1 = require("../entities/Discount");
const typeorm_1 = require("typeorm");
const user_middleware_1 = __importDefault(require("../middlewares/user_middleware"));
const DiscountRouter = (0, express_1.Router)();
const entityManager = (0, typeorm_1.getManager)();
// Create an instance of DiscountRepository and pass the EntityManager
const discountRepository = new discount_repository_1.DiscountRepository(Discount_1.Discount, entityManager);
const discountService = new discount_service_1.DiscountService(discountRepository);
const discountController = new discount_controller_1.DiscountController(discountService);
DiscountRouter.post("/createDiscount", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), discountController.createDiscount.bind(discountController));
DiscountRouter.put("/updateDiscount/:discountId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), discountController.updateDiscount.bind(discountController));
DiscountRouter.delete("/deleteDiscount/:discountId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), discountController.deleteDiscount.bind(discountController));
DiscountRouter.get("/getAllDiscounts", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), discountController.getAllDiscounts.bind(discountController));
DiscountRouter.get("/getOneDiscount/:discountId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), discountController.getOneDiscount.bind(discountController));
exports.default = DiscountRouter;
