import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HallBookingService } from "../services/hall_booking_service";
import CustomResponse from "../utills/responce";
import ErrorHandler from "../utills/error/ErrorHandler";
import { CreateHallBookingDTO } from "../dtos/HallBooking_Dto";
import { UpdateHallBookingDTO } from "../dtos/HallBooking_Dto";
import { sendEmail } from "../utills/email/email-server";
import emailService from "../utills/email/email-templates";

export class HallBookingController {
  private hallBookingService: HallBookingService;

  constructor(hallBookingService: HallBookingService) {
    this.hallBookingService = hallBookingService;
  }

  async createHallBooking(req: Request, res: Response) {
    try {
      const createHallBookingDto: CreateHallBookingDTO = req.body;
      const auth: any = req.auth;

      const createdHallBooking =
        await this.hallBookingService.createHallBooking(createHallBookingDto);

      if (createdHallBooking) {
        const subject = "Hall Booking Confirmation";

        const htmlBody = emailService.HallBookingSuccessEmail({
          fullName: auth.fullName,
          bookingId: createdHallBooking.hallBookingId,
          bookingDate: createdHallBooking.hallBookingDate,
        });

        await sendEmail(auth.email, subject, htmlBody, null);
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.CREATED,
        "Hall booking created successfully!",
        createdHallBooking
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async findHallBookingById(req: Request, res: Response) {
    try {
      const hallBookingId: number = parseInt(req.params.hallBookingId, 10);
      const hallBooking = await this.hallBookingService.findHallBookingById(
        hallBookingId
      );

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Hall booking retrieved successfully",
        hallBooking
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async updateHallBooking(req: Request, res: Response) {
    try {
      const hallBookingId: number = parseInt(req.params.hallBookingId, 10);
      const updateHallBookingDto: UpdateHallBookingDTO = req.body;

      const updatedHallBooking =
        await this.hallBookingService.updateHallBooking(
          hallBookingId,
          updateHallBookingDto
        );

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Hall booking updated successfully!",
        updatedHallBooking
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async deleteHallBookingById(req: Request, res: Response) {
    try {
      const hallBookingId: number = parseInt(req.params.hallBookingId, 10);
      const deleted = await this.hallBookingService.deleteHallBookingById(
        hallBookingId
      );

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        deleted
          ? "Hall booking deleted successfully!"
          : "No hall booking found for deletion",
        ""
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getAllHallBookings(req: Request, res: Response) {
    try {
      const hallBookings = await this.hallBookingService.getAllHallBookings();

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "All hall bookings retrieved successfully",
        hallBookings
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }
}
