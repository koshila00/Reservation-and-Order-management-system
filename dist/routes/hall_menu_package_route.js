"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hall_menu_package_controller_1 = require("../controllers/hall_menu_package_controller");
const constants_1 = __importDefault(require("../utills/constants"));
const hall_menu_package_service_1 = require("../services/hall_menu_package_service");
const hall_menu_package_repository_1 = require("../repositories/hall_menu_package_repository");
const HallMenuPackage_1 = require("../entities/HallMenuPackage");
const typeorm_1 = require("typeorm");
const user_middleware_1 = __importDefault(require("../middlewares/user_middleware"));
const storage_middleware_1 = __importDefault(require("../config/storage_middleware"));
const HallMenuPackageRouter = (0, express_1.Router)();
const entityManager = (0, typeorm_1.getManager)();
// Create an instance of HallMenuPackageRepository and pass the EntityManager
const hallMenuPackageRepository = new hall_menu_package_repository_1.HallMenuPackageRepository(HallMenuPackage_1.HallMenuPackage, entityManager);
const hallMenuPackageService = new hall_menu_package_service_1.HallMenuPackageService(hallMenuPackageRepository);
const hallMenuPackageController = new hall_menu_package_controller_1.HallMenuPackageController(hallMenuPackageService);
HallMenuPackageRouter.post("/createHallMenuPackage", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), storage_middleware_1.default.multerUploader.single("hallMenuPackageImage"), hallMenuPackageController.createHallMenuPackage.bind(hallMenuPackageController));
HallMenuPackageRouter.put("/updateHallMenuPackage/:hallMenuPackageId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallMenuPackageController.updateHallMenuPackage.bind(hallMenuPackageController));
HallMenuPackageRouter.delete("/deleteHallMenuPackage/:hallMenuPackageId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallMenuPackageController.deleteHallMenuPackage.bind(hallMenuPackageController));
HallMenuPackageRouter.get("/getAllHallMenuPackages", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallMenuPackageController.getAllHallMenuPackages.bind(hallMenuPackageController));
HallMenuPackageRouter.get("/getOneHallMenuPackage/:hallMenuPackageId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallMenuPackageController.getOneHallMenuPackage.bind(hallMenuPackageController));
exports.default = HallMenuPackageRouter;
