import { Router } from "express";
import { CafeOrderController } from "../controllers/cafe_order_controller";
import constants from "../utills/constants";
import { CafeOrderService } from "../services/cafe_order_service";
import { CafeOrderRepository } from "../repositories/cafe_order_repository";
import { CafeOrder } from "../entities/CafeOrder";
import { getManager } from "typeorm";
import user_middleware from "../middlewares/user_middleware";
import { CafeOrderItemRepository } from "../repositories/cafe_order_item_repository";
import { CafeOrderItemService } from "../services/cafe_order_items_service";
import { CafeInventoryRepository } from "../repositories/cafe_inventory_repository";
import { CafeInventory } from "../entities/CafeInventory";
import { CafeInventoryService } from "../services/cafe_inventory_service";

const CafeOrderRouter = Router();

const entityManager = getManager();

// Create an instance of CafeOrderRepository and pass the EntityManager
const cafeOrderRepository = new CafeOrderRepository(CafeOrder, entityManager);

const cafeOrderService = new CafeOrderService(cafeOrderRepository);

const cafeInventoryRepository = new CafeInventoryRepository(
  CafeInventory,
  entityManager
);

const cafeInventoryService = new CafeInventoryService(cafeInventoryRepository);

const cafeOrderItemRepository = new CafeOrderItemRepository(
  CafeOrder,
  entityManager
);

const cafeOrderItemService = new CafeOrderItemService(cafeOrderItemRepository);

const cafeOrderController = new CafeOrderController(
  cafeOrderService,
  cafeOrderItemService,
  cafeInventoryService
);

CafeOrderRouter.post(
  "/createCafeOrder",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  cafeOrderController.createCafeOrder.bind(cafeOrderController)
);

CafeOrderRouter.put(
  "/updateCafeOrder/:cafeOrderId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  cafeOrderController.updateCafeOrder.bind(cafeOrderController)
);

CafeOrderRouter.delete(
  "/deleteCafeOrder/:cafeOrderId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  cafeOrderController.deleteCafeOrder.bind(cafeOrderController)
);

CafeOrderRouter.get(
  "/getAllCafeOrders",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  cafeOrderController.getAllCafeOrders.bind(cafeOrderController)
);

CafeOrderRouter.get(
  "/getOneCafeOrder/:cafeOrderId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  cafeOrderController.getOneCafeOrder.bind(cafeOrderController)
);

export default CafeOrderRouter;
