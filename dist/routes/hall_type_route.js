"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hall_type_controller_1 = require("../controllers/hall_type_controller");
const constants_1 = __importDefault(require("../utills/constants"));
const hall_type_service_1 = require("../services/hall_type_service");
const hall_type_repository_1 = require("../repositories/hall_type_repository");
const HallType_1 = require("../entities/HallType");
const typeorm_1 = require("typeorm");
const user_middleware_1 = __importDefault(require("../middlewares/user_middleware"));
const HallTypeRouter = (0, express_1.Router)();
const entityManager = (0, typeorm_1.getManager)();
// Create an instance of HallTypeRepository and pass the EntityManager
const hallTypeRepository = new hall_type_repository_1.HallTypeRepository(HallType_1.HallType, entityManager);
const hallTypeService = new hall_type_service_1.HallTypeService(hallTypeRepository);
const hallTypeController = new hall_type_controller_1.HallTypeController(hallTypeService);
HallTypeRouter.post("/createHallType", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallTypeController.createHallType.bind(hallTypeController));
HallTypeRouter.put("/updateHallType/:hallTypeId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallTypeController.updateHallType.bind(hallTypeController));
HallTypeRouter.delete("/deleteHallType/:hallTypeId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallTypeController.deleteHallType.bind(hallTypeController));
HallTypeRouter.get("/getAllHallTypes", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallTypeController.getAllHallTypes.bind(hallTypeController));
HallTypeRouter.get("/getOneHallType/:hallTypeId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallTypeController.getOneHallType.bind(hallTypeController));
exports.default = HallTypeRouter;
