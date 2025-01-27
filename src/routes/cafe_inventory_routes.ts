// CafeInventoryRouter.ts
import { Router } from "express";
import { CafeInventoryController } from "../controllers/cafe_inventory_controller";
import constants from "../utills/constants";
import { CafeInventoryService } from "../services/cafe_inventory_service";
import { CafeInventoryRepository } from "../repositories/cafe_inventory_repository";
import { CafeInventory } from "../entities/CafeInventory";
import { getManager } from "typeorm";
import user_middleware from "../middlewares/user_middleware";
import commonMiddleware from "../config/storage_middleware";

const CafeInventoryRouter = Router();

const entityManager = getManager();

// Create an instance of CafeInventoryRepository and pass the EntityManager
const cafeInventoryRepository = new CafeInventoryRepository(
  CafeInventory,
  entityManager
);

const cafeInventoryService = new CafeInventoryService(cafeInventoryRepository);

const cafeInventoryController = new CafeInventoryController(
  cafeInventoryService
);

CafeInventoryRouter.post(
  "/createCafeItem",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  commonMiddleware.multerUploader.single("cafeItemImage"),
  cafeInventoryController.createCafeItem.bind(cafeInventoryController)
);

CafeInventoryRouter.put(
  "/updateCafeItem/:cafeItemId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  cafeInventoryController.updateCafeItem.bind(cafeInventoryController)
);

CafeInventoryRouter.delete(
  "/deleteCafeItem/:cafeItemId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  cafeInventoryController.deleteCafeItem.bind(cafeInventoryController)
);

CafeInventoryRouter.get(
  "/getAllCafeItems",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  cafeInventoryController.getAllCafeItems.bind(cafeInventoryController)
);

//get Not work
CafeInventoryRouter.post(
  "/getOneCafeItem/:cafeItemId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  cafeInventoryController.getOneCafeItem.bind(cafeInventoryController)
);

CafeInventoryRouter.post(
  "/reduce-one/:cafeItemId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  cafeInventoryController.reduceOne.bind(cafeInventoryController)
);

CafeInventoryRouter.post(
  "/increase-one/:cafeItemId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  cafeInventoryController.increaseOne.bind(cafeInventoryController)
);

export default CafeInventoryRouter;
