import { Router } from "express";
import { HallMenuPackageController } from "../controllers/hall_menu_package_controller";
import constants from "../utills/constants";
import { HallMenuPackageService } from "../services/hall_menu_package_service";
import { HallMenuPackageRepository } from "../repositories/hall_menu_package_repository";
import { HallMenuPackage } from "../entities/HallMenuPackage";
import { getManager } from "typeorm";
import userMiddleware from "../middlewares/user_middleware";
import commonMiddleware from "../config/storage_middleware";

const HallMenuPackageRouter = Router();

const entityManager = getManager();

// Create an instance of HallMenuPackageRepository and pass the EntityManager
const hallMenuPackageRepository = new HallMenuPackageRepository(
  HallMenuPackage,
  entityManager
);

const hallMenuPackageService = new HallMenuPackageService(
  hallMenuPackageRepository
);

const hallMenuPackageController = new HallMenuPackageController(
  hallMenuPackageService
);

HallMenuPackageRouter.post(
  "/createHallMenuPackage",
  userMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  commonMiddleware.multerUploader.single("hallMenuPackageImage"),
  hallMenuPackageController.createHallMenuPackage.bind(
    hallMenuPackageController
  )
);

HallMenuPackageRouter.put(
  "/updateHallMenuPackage/:hallMenuPackageId",
  userMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallMenuPackageController.updateHallMenuPackage.bind(
    hallMenuPackageController
  )
);

HallMenuPackageRouter.delete(
  "/deleteHallMenuPackage/:hallMenuPackageId",
  userMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallMenuPackageController.deleteHallMenuPackage.bind(
    hallMenuPackageController
  )
);

HallMenuPackageRouter.get(
  "/getAllHallMenuPackages",
  userMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallMenuPackageController.getAllHallMenuPackages.bind(
    hallMenuPackageController
  )
);

HallMenuPackageRouter.get(
  "/getOneHallMenuPackage/:hallMenuPackageId",
  userMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallMenuPackageController.getOneHallMenuPackage.bind(
    hallMenuPackageController
  )
);

export default HallMenuPackageRouter;
