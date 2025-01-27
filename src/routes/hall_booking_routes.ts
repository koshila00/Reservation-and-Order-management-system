import { Router } from "express";
import { HallBookingController } from "../controllers/hall_booking_controller";
import constants from "../utills/constants";
import user_middleware from "../middlewares/user_middleware";
import { HallBookingService } from "../services/hall_booking_service";
import { HallBookingRepository } from "../repositories/hall_booking_repository";
import { HallBooking } from "../entities/HallBooking";
import { getManager } from "typeorm";

const HallBookingRouter = Router();
const entityManager = getManager();
const hallBookingRepository = new HallBookingRepository(
  HallBooking,
  entityManager
);
const hallBookingService = new HallBookingService(hallBookingRepository);
const hallBookingController = new HallBookingController(hallBookingService);

HallBookingRouter.post(
  "/createHallBooking",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallBookingController.createHallBooking.bind(hallBookingController)
);

HallBookingRouter.get(
  "/getAllHallBookings",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallBookingController.getAllHallBookings.bind(hallBookingController)
);

HallBookingRouter.get(
  "/getHallBookingById/:hallBookingId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallBookingController.findHallBookingById.bind(hallBookingController)
);

HallBookingRouter.put(
  "/updateHallBooking/:hallBookingId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallBookingController.updateHallBooking.bind(hallBookingController)
);
///h
HallBookingRouter.delete(
  "/deleteHallBookingById/:hallBookingId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  hallBookingController.deleteHallBookingById.bind(hallBookingController)
);

export default HallBookingRouter;
