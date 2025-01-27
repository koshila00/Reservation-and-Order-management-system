"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HallBookingController = void 0;
const http_status_codes_1 = require("http-status-codes");
const responce_1 = __importDefault(require("../utills/responce"));
const ErrorHandler_1 = __importDefault(require("../utills/error/ErrorHandler"));
const email_server_1 = require("../utills/email/email-server");
const email_templates_1 = __importDefault(require("../utills/email/email-templates"));
class HallBookingController {
    constructor(hallBookingService) {
        this.hallBookingService = hallBookingService;
    }
    async createHallBooking(req, res) {
        try {
            const createHallBookingDto = req.body;
            const auth = req.auth;
            const createdHallBooking = await this.hallBookingService.createHallBooking(createHallBookingDto);
            if (createdHallBooking) {
                const subject = "Hall Booking Confirmation";
                const htmlBody = email_templates_1.default.HallBookingSuccessEmail({
                    fullName: auth.fullName,
                    bookingId: createdHallBooking.hallBookingId,
                    bookingDate: createdHallBooking.hallBookingDate,
                });
                await (0, email_server_1.sendEmail)(auth.email, subject, htmlBody, null);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Hall booking created successfully!", createdHallBooking);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async findHallBookingById(req, res) {
        try {
            const hallBookingId = parseInt(req.params.hallBookingId, 10);
            const hallBooking = await this.hallBookingService.findHallBookingById(hallBookingId);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Hall booking retrieved successfully", hallBooking);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async updateHallBooking(req, res) {
        try {
            const hallBookingId = parseInt(req.params.hallBookingId, 10);
            const updateHallBookingDto = req.body;
            const updatedHallBooking = await this.hallBookingService.updateHallBooking(hallBookingId, updateHallBookingDto);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Hall booking updated successfully!", updatedHallBooking);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async deleteHallBookingById(req, res) {
        try {
            const hallBookingId = parseInt(req.params.hallBookingId, 10);
            const deleted = await this.hallBookingService.deleteHallBookingById(hallBookingId);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, deleted
                ? "Hall booking deleted successfully!"
                : "No hall booking found for deletion", "");
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getAllHallBookings(req, res) {
        try {
            const hallBookings = await this.hallBookingService.getAllHallBookings();
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "All hall bookings retrieved successfully", hallBookings);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
}
exports.HallBookingController = HallBookingController;
