// HallInventoryRouter.ts
import { Router } from "express";
import { HallInventoryItemController } from "../controllers/hall_inventory_controller"; // Updated controller import
import constants from "../utills/constants";
import { HallInventoryService } from "../services/hall_inventory_service";
import { HallInventoryRepository } from "../repositories/hall_inventory_repository";
import { HallInventory } from "../entities/HallInventory";
import { getManager } from "typeorm";
import user_middleware from "../middlewares/user_middleware";
import commonMiddleware from "../config/storage_middleware";

const HallInventoryRouter = Router();

const entityManager = getManager();

const hallInventoryRepository = new HallInventoryRepository(
  HallInventory,
  entityManager
);

const hallInventoryService = new HallInventoryService(hallInventoryRepository);

const hallInventoryController = new HallInventoryItemController(
  hallInventoryService
);

HallInventoryRouter.post(
  "/createHallInventoryItem", // Updated endpoint
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallInventoryController.createHallInventoryItem.bind(hallInventoryController) // Updated method reference
);

HallInventoryRouter.put(
  "/updateHallInventoryItem/:hallInventoryItemId", // Updated endpoint
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallInventoryController.updateHallInventoryItem.bind(hallInventoryController) // Updated method reference
);

HallInventoryRouter.delete(
  "/deleteHallInventoryItem/:hallInventoryItemId", // Updated endpoint
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallInventoryController.deleteHallInventoryItem.bind(hallInventoryController) // Updated method reference
);

HallInventoryRouter.get(
  "/getAllHallInventoryItems", // Updated endpoint
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallInventoryController.getAllHallInventoryItems.bind(hallInventoryController) // Updated method reference
);

HallInventoryRouter.get(
  "/getOneHallInventoryItem/:hallInventoryItemId", // Updated endpoint
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallInventoryController.getOneHallInventoryItem.bind(hallInventoryController) // Updated method reference
);

HallInventoryRouter.post(
  "/reduce-one/:hallInventoryItemId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallInventoryController.reduceOne.bind(hallInventoryController)
);

HallInventoryRouter.post(
  "/increase-one/:hallInventoryItemId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallInventoryController.increaseOne.bind(hallInventoryController)
);

export default HallInventoryRouter;
