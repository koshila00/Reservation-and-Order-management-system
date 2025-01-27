"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cafe_order_items_controller_1 = require("../controllers/cafe_order_items_controller");
const constants_1 = __importDefault(require("../utills/constants"));
const user_middleware_1 = __importDefault(require("../middlewares/user_middleware"));
const cafe_order_items_service_1 = require("../services/cafe_order_items_service");
const cafe_order_item_repository_1 = require("../repositories/cafe_order_item_repository");
const CafeOrderItem_1 = require("../entities/CafeOrderItem");
const typeorm_1 = require("typeorm");
const cafe_inventory_repository_1 = require("../repositories/cafe_inventory_repository");
const CafeInventory_1 = require("../entities/CafeInventory");
const cafe_inventory_service_1 = require("../services/cafe_inventory_service"); // Import CafeInventoryService
const CafeOrderItemRouter = (0, express_1.Router)();
const entityManager = (0, typeorm_1.getManager)();
const cafeOrderItemRepository = new cafe_order_item_repository_1.CafeOrderItemRepository(CafeOrderItem_1.CafeOrderItem, entityManager);
const cafeInventoryRepository = new cafe_inventory_repository_1.CafeInventoryRepository(CafeInventory_1.CafeInventory, entityManager);
const cafeOrderItemService = new cafe_order_items_service_1.CafeOrderItemService(cafeOrderItemRepository);
const cafeInventoryService = new cafe_inventory_service_1.CafeInventoryService(cafeInventoryRepository); // Instantiate CafeInventoryService
const cafeOrderItemController = new cafe_order_items_controller_1.CafeOrderItemController(cafeOrderItemService, cafeInventoryService);
// Routes for managing cafe order items
// Create a new cafe order item
CafeOrderItemRouter.post("/createCafeOrderItem", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), cafeOrderItemController.createCafeOrderItems.bind(cafeOrderItemController));
// Retrieve all cafe order items
CafeOrderItemRouter.get("/getAllCafeOrderItems", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), cafeOrderItemController.getAllCafeOrderItems.bind(cafeOrderItemController));
// Retrieve cafe order items by cafe order ID
CafeOrderItemRouter.get("/getCafeOrderItemsByOrderId/:cafeOrderId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), cafeOrderItemController.findCafeOrderItemsByOrderId.bind(cafeOrderItemController));
// Delete cafe order items by cafe order ID
CafeOrderItemRouter.delete("/deleteCafeOrderItemsByOrderId/:cafeOrderId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), cafeOrderItemController.deleteCafeOrderItemsByOrderId.bind(cafeOrderItemController));
exports.default = CafeOrderItemRouter;
