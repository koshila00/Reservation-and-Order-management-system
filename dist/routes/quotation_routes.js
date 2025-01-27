"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quotation_controller_1 = require("../controllers/quotation_controller");
const constants_1 = __importDefault(require("../utills/constants"));
const quotation_service_1 = require("../services/quotation_service");
const quotation_repository_1 = require("../repositories/quotation_repository");
const Quotation_1 = require("../entities/Quotation");
const typeorm_1 = require("typeorm");
const user_middleware_1 = __importDefault(require("../middlewares/user_middleware"));
const suppliyer_service_1 = require("../services/suppliyer_service");
const supplier_repository_1 = require("../repositories/supplier_repository");
const Supplier_1 = require("../entities/Supplier");
const QuotationRouter = (0, express_1.Router)();
const entityManager = (0, typeorm_1.getManager)();
// Create an instance of QuotationRepository and pass the EntityManager
const quotationRepository = new quotation_repository_1.QuotationRepository(Quotation_1.Quotation, entityManager);
const quotationService = new quotation_service_1.QuotationService(quotationRepository);
const supplierRepository = new supplier_repository_1.SupplierRepository(Supplier_1.Supplier, entityManager);
const supplierService = new suppliyer_service_1.SupplierService(supplierRepository);
const quotationController = new quotation_controller_1.QuotationController(quotationService, supplierService);
QuotationRouter.post("/createQuotation", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), quotationController.createQuotation.bind(quotationController));
QuotationRouter.put("/updateQuotation/:quotationId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), quotationController.updateQuotation.bind(quotationController));
QuotationRouter.delete("/deleteQuotation/:quotationId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), quotationController.deleteQuotation.bind(quotationController));
QuotationRouter.get("/getAllQuotations", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), quotationController.getQuotations.bind(quotationController));
QuotationRouter.get("/getOneQuotation/:quotationId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), quotationController.getQuotationById.bind(quotationController));
exports.default = QuotationRouter;
