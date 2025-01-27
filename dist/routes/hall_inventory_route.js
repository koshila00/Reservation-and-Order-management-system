"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// HallInventoryRouter.ts
const express_1 = require("express");
const hall_inventory_controller_1 = require("../controllers/hall_inventory_controller"); // Updated controller import
const constants_1 = __importDefault(require("../utills/constants"));
const hall_inventory_service_1 = require("../services/hall_inventory_service");
const hall_inventory_repository_1 = require("../repositories/hall_inventory_repository");
const HallInventory_1 = require("../entities/HallInventory");
const typeorm_1 = require("typeorm");
const user_middleware_1 = __importDefault(require("../middlewares/user_middleware"));
const HallInventoryRouter = (0, express_1.Router)();
const entityManager = (0, typeorm_1.getManager)();
const hallInventoryRepository = new hall_inventory_repository_1.HallInventoryRepository(HallInventory_1.HallInventory, entityManager);
const hallInventoryService = new hall_inventory_service_1.HallInventoryService(hallInventoryRepository);
const hallInventoryController = new hall_inventory_controller_1.HallInventoryItemController(hallInventoryService);
HallInventoryRouter.post("/createHallInventoryItem", // Updated endpoint
user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallInventoryController.createHallInventoryItem.bind(hallInventoryController) // Updated method reference
);
HallInventoryRouter.put("/updateHallInventoryItem/:hallInventoryItemId", // Updated endpoint
user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallInventoryController.updateHallInventoryItem.bind(hallInventoryController) // Updated method reference
);
HallInventoryRouter.delete("/deleteHallInventoryItem/:hallInventoryItemId", // Updated endpoint
user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallInventoryController.deleteHallInventoryItem.bind(hallInventoryController) // Updated method reference
);
HallInventoryRouter.get("/getAllHallInventoryItems", // Updated endpoint
user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallInventoryController.getAllHallInventoryItems.bind(hallInventoryController) // Updated method reference
);
HallInventoryRouter.get("/getOneHallInventoryItem/:hallInventoryItemId", // Updated endpoint
user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallInventoryController.getOneHallInventoryItem.bind(hallInventoryController) // Updated method reference
);
HallInventoryRouter.post("/reduce-one/:hallInventoryItemId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallInventoryController.reduceOne.bind(hallInventoryController));
HallInventoryRouter.post("/increase-one/:hallInventoryItemId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallInventoryController.increaseOne.bind(hallInventoryController));
exports.default = HallInventoryRouter;
