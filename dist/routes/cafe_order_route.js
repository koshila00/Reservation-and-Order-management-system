"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cafe_order_controller_1 = require("../controllers/cafe_order_controller");
const constants_1 = __importDefault(require("../utills/constants"));
const cafe_order_service_1 = require("../services/cafe_order_service");
const cafe_order_repository_1 = require("../repositories/cafe_order_repository");
const CafeOrder_1 = require("../entities/CafeOrder");
const typeorm_1 = require("typeorm");
const user_middleware_1 = __importDefault(require("../middlewares/user_middleware"));
const cafe_order_item_repository_1 = require("../repositories/cafe_order_item_repository");
const cafe_order_items_service_1 = require("../services/cafe_order_items_service");
const cafe_inventory_repository_1 = require("../repositories/cafe_inventory_repository");
const CafeInventory_1 = require("../entities/CafeInventory");
const cafe_inventory_service_1 = require("../services/cafe_inventory_service");
const CafeOrderRouter = (0, express_1.Router)();
const entityManager = (0, typeorm_1.getManager)();
// Create an instance of CafeOrderRepository and pass the EntityManager
const cafeOrderRepository = new cafe_order_repository_1.CafeOrderRepository(CafeOrder_1.CafeOrder, entityManager);
const cafeOrderService = new cafe_order_service_1.CafeOrderService(cafeOrderRepository);
const cafeInventoryRepository = new cafe_inventory_repository_1.CafeInventoryRepository(CafeInventory_1.CafeInventory, entityManager);
const cafeInventoryService = new cafe_inventory_service_1.CafeInventoryService(cafeInventoryRepository);
const cafeOrderItemRepository = new cafe_order_item_repository_1.CafeOrderItemRepository(CafeOrder_1.CafeOrder, entityManager);
const cafeOrderItemService = new cafe_order_items_service_1.CafeOrderItemService(cafeOrderItemRepository);
const cafeOrderController = new cafe_order_controller_1.CafeOrderController(cafeOrderService, cafeOrderItemService, cafeInventoryService);
CafeOrderRouter.post("/createCafeOrder", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), cafeOrderController.createCafeOrder.bind(cafeOrderController));
CafeOrderRouter.put("/updateCafeOrder/:cafeOrderId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), cafeOrderController.updateCafeOrder.bind(cafeOrderController));
CafeOrderRouter.delete("/deleteCafeOrder/:cafeOrderId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), cafeOrderController.deleteCafeOrder.bind(cafeOrderController));
CafeOrderRouter.get("/getAllCafeOrders", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), cafeOrderController.getAllCafeOrders.bind(cafeOrderController));
CafeOrderRouter.get("/getOneCafeOrder/:cafeOrderId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), cafeOrderController.getOneCafeOrder.bind(cafeOrderController));
exports.default = CafeOrderRouter;
