"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hall_menu_package_item_controller_1 = require("../controllers/hall_menu_package_item_controller");
const constants_1 = __importDefault(require("../utills/constants"));
const user_middleware_1 = __importDefault(require("../middlewares/user_middleware"));
const hall_menu_package_item_service_1 = require("../services/hall_menu_package_item_service");
const hall_menu_package_items_repository_1 = require("../repositories/hall_menu_package_items_repository");
const HallMenuPackageItems_1 = require("../entities/HallMenuPackageItems");
const typeorm_1 = require("typeorm");
const HallMenuPackageItemsRouter = (0, express_1.Router)();
const entityManager = (0, typeorm_1.getManager)();
const hallMenuPackageItemRepository = new hall_menu_package_items_repository_1.HallMenuPackageItemsRepository(HallMenuPackageItems_1.HallMenuPackageItems, entityManager);
const hallMenuPackageItemsService = new hall_menu_package_item_service_1.HallMenuPackageItemsService(hallMenuPackageItemRepository);
const hallMenuPackageItemsController = new hall_menu_package_item_controller_1.HallMenuPackageItemsController(hallMenuPackageItemsService);
HallMenuPackageItemsRouter.post("/createHallMenuPackageItem", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallMenuPackageItemsController.createHallMenuPackageItem.bind(hallMenuPackageItemsController));
HallMenuPackageItemsRouter.put("/updateHallMenuPackageItem/:hallMenuPackageItemId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallMenuPackageItemsController.updateHallMenuPackageItem.bind(hallMenuPackageItemsController));
HallMenuPackageItemsRouter.delete("/deleteHallMenuPackageItem/:hallMenuPackageItemId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallMenuPackageItemsController.deleteHallMenuPackageItem.bind(hallMenuPackageItemsController));
HallMenuPackageItemsRouter.get("/getAllHallMenuPackageItems", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallMenuPackageItemsController.getAllHallMenuPackageItems.bind(hallMenuPackageItemsController));
HallMenuPackageItemsRouter.get("/getHallMenuPackageItem/:hallMenuPackageItemId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallMenuPackageItemsController.getOneHallMenuPackageItem.bind(hallMenuPackageItemsController));
exports.default = HallMenuPackageItemsRouter;
