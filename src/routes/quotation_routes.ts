import { Router } from "express";
import { QuotationController } from "../controllers/quotation_controller";
import constants from "../utills/constants";
import { QuotationService } from "../services/quotation_service";
import { QuotationRepository } from "../repositories/quotation_repository";
import { Quotation } from "../entities/Quotation";
import { getManager } from "typeorm";
import userMiddleware from "../middlewares/user_middleware";
import { SupplierService } from "../services/suppliyer_service";
import { SupplierRepository } from "../repositories/supplier_repository";
import { Supplier } from "../entities/Supplier";

const QuotationRouter = Router();
const entityManager = getManager();

// Create an instance of QuotationRepository and pass the EntityManager
const quotationRepository = new QuotationRepository(Quotation, entityManager);
const quotationService = new QuotationService(quotationRepository);

const supplierRepository = new SupplierRepository(Supplier, entityManager);

const supplierService = new SupplierService(supplierRepository);
const quotationController = new QuotationController(
  quotationService,
  supplierService
);

QuotationRouter.post(
  "/createQuotation",
  userMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  quotationController.createQuotation.bind(quotationController)
);

QuotationRouter.put(
  "/updateQuotation/:quotationId",
  userMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  quotationController.updateQuotation.bind(quotationController)
);

QuotationRouter.delete(
  "/deleteQuotation/:quotationId",
  userMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  quotationController.deleteQuotation.bind(quotationController)
);

QuotationRouter.get(
  "/getAllQuotations",
  userMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  quotationController.getQuotations.bind(quotationController)
);

QuotationRouter.get(
  "/getOneQuotation/:quotationId",
  userMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  quotationController.getQuotationById.bind(quotationController)
);

export default QuotationRouter;
