import { Router } from "express";
import { SupplierController } from "../controllers/suppliyer_controller";
import constants from "../utills/constants";
import { SupplierService } from "../services/suppliyer_service";
import { SupplierRepository } from "../repositories/supplier_repository";
import { Supplier } from "../entities/Supplier";
import { getManager } from "typeorm";
import userMiddleware from "../middlewares/user_middleware";

const SupplierRouter = Router();

const entityManager = getManager();

// Create an instance of SupplierRepository and pass the EntityManager
const supplierRepository = new SupplierRepository(Supplier, entityManager);

const supplierService = new SupplierService(supplierRepository);

const supplierController = new SupplierController(supplierService);

SupplierRouter.post(
  "/createSupplier",
  userMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  supplierController.createSupplier.bind(supplierController)
);

SupplierRouter.put(
  "/updateSupplier/:supplierId",
  userMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  supplierController.updateSupplier.bind(supplierController)
);

SupplierRouter.delete(
  "/deleteSupplier/:supplierId",
  userMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  supplierController.deleteSupplier.bind(supplierController)
);

SupplierRouter.get(
  "/getAllSuppliers",
  userMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  supplierController.getAllSuppliers.bind(supplierController)
);

SupplierRouter.get(
  "/getOneSupplier/:supplierId",
  userMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  supplierController.getOneSupplier.bind(supplierController)
);

export default SupplierRouter;
