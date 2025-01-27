"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hall_booking_controller_1 = require("../controllers/hall_booking_controller");
const constants_1 = __importDefault(require("../utills/constants"));
const user_middleware_1 = __importDefault(require("../middlewares/user_middleware"));
const hall_booking_service_1 = require("../services/hall_booking_service");
const hall_booking_repository_1 = require("../repositories/hall_booking_repository");
const HallBooking_1 = require("../entities/HallBooking");
const typeorm_1 = require("typeorm");
const HallBookingRouter = (0, express_1.Router)();
const entityManager = (0, typeorm_1.getManager)();
const hallBookingRepository = new hall_booking_repository_1.HallBookingRepository(HallBooking_1.HallBooking, entityManager);
const hallBookingService = new hall_booking_service_1.HallBookingService(hallBookingRepository);
const hallBookingController = new hall_booking_controller_1.HallBookingController(hallBookingService);
HallBookingRouter.post("/createHallBooking", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallBookingController.createHallBooking.bind(hallBookingController));
HallBookingRouter.get("/getAllHallBookings", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallBookingController.getAllHallBookings.bind(hallBookingController));
HallBookingRouter.get("/getHallBookingById/:hallBookingId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallBookingController.findHallBookingById.bind(hallBookingController));
HallBookingRouter.put("/updateHallBooking/:hallBookingId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallBookingController.updateHallBooking.bind(hallBookingController));
///h
HallBookingRouter.delete("/deleteHallBookingById/:hallBookingId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), hallBookingController.deleteHallBookingById.bind(hallBookingController));
exports.default = HallBookingRouter;
