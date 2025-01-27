"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const suppliyer_controller_1 = require("../controllers/suppliyer_controller");
const constants_1 = __importDefault(require("../utills/constants"));
const suppliyer_service_1 = require("../services/suppliyer_service");
const supplier_repository_1 = require("../repositories/supplier_repository");
const Supplier_1 = require("../entities/Supplier");
const typeorm_1 = require("typeorm");
const user_middleware_1 = __importDefault(require("../middlewares/user_middleware"));
const SupplierRouter = (0, express_1.Router)();
const entityManager = (0, typeorm_1.getManager)();
// Create an instance of SupplierRepository and pass the EntityManager
const supplierRepository = new supplier_repository_1.SupplierRepository(Supplier_1.Supplier, entityManager);
const supplierService = new suppliyer_service_1.SupplierService(supplierRepository);
const supplierController = new suppliyer_controller_1.SupplierController(supplierService);
SupplierRouter.post("/createSupplier", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), supplierController.createSupplier.bind(supplierController));
SupplierRouter.put("/updateSupplier/:supplierId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), supplierController.updateSupplier.bind(supplierController));
SupplierRouter.delete("/deleteSupplier/:supplierId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), supplierController.deleteSupplier.bind(supplierController));
SupplierRouter.get("/getAllSuppliers", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), supplierController.getAllSuppliers.bind(supplierController));
SupplierRouter.get("/getOneSupplier/:supplierId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), supplierController.getOneSupplier.bind(supplierController));
exports.default = SupplierRouter;
