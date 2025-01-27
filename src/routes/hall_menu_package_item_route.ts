import { Router } from "express";
import { HallMenuPackageItemsController } from "../controllers/hall_menu_package_item_controller";
import constants from "../utills/constants";
import user_middleware from "../middlewares/user_middleware";
import { HallMenuPackageItemsService } from "../services/hall_menu_package_item_service";
import { HallMenuPackageItemsRepository } from "../repositories/hall_menu_package_items_repository";
import { HallMenuPackageItems } from "../entities/HallMenuPackageItems";
import { getManager } from "typeorm";

const HallMenuPackageItemsRouter = Router();
const entityManager = getManager();
const hallMenuPackageItemRepository = new HallMenuPackageItemsRepository(
  HallMenuPackageItems,
  entityManager
);
const hallMenuPackageItemsService = new HallMenuPackageItemsService(
  hallMenuPackageItemRepository
);
const hallMenuPackageItemsController = new HallMenuPackageItemsController(
  hallMenuPackageItemsService
);

HallMenuPackageItemsRouter.post(
  "/createHallMenuPackageItem",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallMenuPackageItemsController.createHallMenuPackageItem.bind(
    hallMenuPackageItemsController
  )
);

HallMenuPackageItemsRouter.put(
  "/updateHallMenuPackageItem/:hallMenuPackageItemId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallMenuPackageItemsController.updateHallMenuPackageItem.bind(
    hallMenuPackageItemsController
  )
);

HallMenuPackageItemsRouter.delete(
  "/deleteHallMenuPackageItem/:hallMenuPackageItemId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallMenuPackageItemsController.deleteHallMenuPackageItem.bind(
    hallMenuPackageItemsController
  )
);

HallMenuPackageItemsRouter.get(
  "/getAllHallMenuPackageItems",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallMenuPackageItemsController.getAllHallMenuPackageItems.bind(
    hallMenuPackageItemsController
  )
);

HallMenuPackageItemsRouter.get(
  "/getHallMenuPackageItem/:hallMenuPackageItemId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallMenuPackageItemsController.getOneHallMenuPackageItem.bind(
    hallMenuPackageItemsController
  )
);

export default HallMenuPackageItemsRouter;
