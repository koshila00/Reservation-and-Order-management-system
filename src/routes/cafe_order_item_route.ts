import { Router } from "express";
import { CafeOrderItemController } from "../controllers/cafe_order_items_controller";
import constants from "../utills/constants";
import user_middleware from "../middlewares/user_middleware";
import { CafeOrderItemService } from "../services/cafe_order_items_service";
import { CafeOrderItemRepository } from "../repositories/cafe_order_item_repository";
import { CafeOrderItem } from "../entities/CafeOrderItem";
import { getManager } from "typeorm";
import { CafeInventoryRepository } from "../repositories/cafe_inventory_repository";
import { CafeInventory } from "../entities/CafeInventory";
import { CafeInventoryService } from "../services/cafe_inventory_service"; // Import CafeInventoryService

const CafeOrderItemRouter = Router();
const entityManager = getManager();
const cafeOrderItemRepository = new CafeOrderItemRepository(
  CafeOrderItem,
  entityManager
);
const cafeInventoryRepository = new CafeInventoryRepository(
  CafeInventory,
  entityManager
);
const cafeOrderItemService = new CafeOrderItemService(cafeOrderItemRepository);
const cafeInventoryService = new CafeInventoryService(cafeInventoryRepository); // Instantiate CafeInventoryService
const cafeOrderItemController = new CafeOrderItemController(
  cafeOrderItemService,
  cafeInventoryService
);

// Routes for managing cafe order items

// Create a new cafe order item
CafeOrderItemRouter.post(
  "/createCafeOrderItem",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  cafeOrderItemController.createCafeOrderItems.bind(cafeOrderItemController)
);

// Retrieve all cafe order items
CafeOrderItemRouter.get(
  "/getAllCafeOrderItems",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  cafeOrderItemController.getAllCafeOrderItems.bind(cafeOrderItemController)
);

// Retrieve cafe order items by cafe order ID
CafeOrderItemRouter.get(
  "/getCafeOrderItemsByOrderId/:cafeOrderId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  cafeOrderItemController.findCafeOrderItemsByOrderId.bind(
    cafeOrderItemController
  )
);

// Delete cafe order items by cafe order ID
CafeOrderItemRouter.delete(
  "/deleteCafeOrderItemsByOrderId/:cafeOrderId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  cafeOrderItemController.deleteCafeOrderItemsByOrderId.bind(
    cafeOrderItemController
  )
);

export default CafeOrderItemRouter;
