"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// CafeInventoryRouter.ts
const express_1 = require("express");
const cafe_inventory_controller_1 = require("../controllers/cafe_inventory_controller");
const constants_1 = __importDefault(require("../utills/constants"));
const cafe_inventory_service_1 = require("../services/cafe_inventory_service");
const cafe_inventory_repository_1 = require("../repositories/cafe_inventory_repository");
const CafeInventory_1 = require("../entities/CafeInventory");
const typeorm_1 = require("typeorm");
const user_middleware_1 = __importDefault(require("../middlewares/user_middleware"));
const storage_middleware_1 = __importDefault(require("../config/storage_middleware"));
const CafeInventoryRouter = (0, express_1.Router)();
const entityManager = (0, typeorm_1.getManager)();
// Create an instance of CafeInventoryRepository and pass the EntityManager
const cafeInventoryRepository = new cafe_inventory_repository_1.CafeInventoryRepository(CafeInventory_1.CafeInventory, entityManager);
const cafeInventoryService = new cafe_inventory_service_1.CafeInventoryService(cafeInventoryRepository);
const cafeInventoryController = new cafe_inventory_controller_1.CafeInventoryController(cafeInventoryService);
CafeInventoryRouter.post("/createCafeItem", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), storage_middleware_1.default.multerUploader.single("cafeItemImage"), cafeInventoryController.createCafeItem.bind(cafeInventoryController));
CafeInventoryRouter.put("/updateCafeItem/:cafeItemId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), cafeInventoryController.updateCafeItem.bind(cafeInventoryController));
CafeInventoryRouter.delete("/deleteCafeItem/:cafeItemId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), cafeInventoryController.deleteCafeItem.bind(cafeInventoryController));
CafeInventoryRouter.get("/getAllCafeItems", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), cafeInventoryController.getAllCafeItems.bind(cafeInventoryController));
//get Not work
CafeInventoryRouter.post("/getOneCafeItem/:cafeItemId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), cafeInventoryController.getOneCafeItem.bind(cafeInventoryController));
CafeInventoryRouter.post("/reduce-one/:cafeItemId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), cafeInventoryController.reduceOne.bind(cafeInventoryController));
CafeInventoryRouter.post("/increase-one/:cafeItemId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), cafeInventoryController.increaseOne.bind(cafeInventoryController));
exports.default = CafeInventoryRouter;
