import { Router } from "express";
import { HallTypeController } from "../controllers/hall_type_controller";
import constants from "../utills/constants";
import { HallTypeService } from "../services/hall_type_service";
import { HallTypeRepository } from "../repositories/hall_type_repository";
import { HallType } from "../entities/HallType";
import { getManager } from "typeorm";
import userMiddleware from "../middlewares/user_middleware";

const HallTypeRouter = Router();

const entityManager = getManager();

// Create an instance of HallTypeRepository and pass the EntityManager
const hallTypeRepository = new HallTypeRepository(HallType, entityManager);

const hallTypeService = new HallTypeService(hallTypeRepository);

const hallTypeController = new HallTypeController(hallTypeService);

HallTypeRouter.post(
  "/createHallType",
  userMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallTypeController.createHallType.bind(hallTypeController)
);

HallTypeRouter.put(
  "/updateHallType/:hallTypeId",
  userMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallTypeController.updateHallType.bind(hallTypeController)
);

HallTypeRouter.delete(
  "/deleteHallType/:hallTypeId",
  userMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallTypeController.deleteHallType.bind(hallTypeController)
);

HallTypeRouter.get(
  "/getAllHallTypes",
  userMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallTypeController.getAllHallTypes.bind(hallTypeController)
);

HallTypeRouter.get(
  "/getOneHallType/:hallTypeId",
  userMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallTypeController.getOneHallType.bind(hallTypeController)
);

export default HallTypeRouter;
