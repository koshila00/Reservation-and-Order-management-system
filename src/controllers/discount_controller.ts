import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DiscountService } from "../services/discount_service";
import { CreateDiscountDTO, UpdateDiscountDTO } from "../dtos/Discount_Dto";
import NotFoundError from "../utills/error/error.classes/NotFoundError";
import ErrorHandler from "../utills/error/ErrorHandler";
import CustomResponse from "../utills/responce";

export class DiscountController {
  private discountService: DiscountService;

  constructor(discountService: DiscountService) {
    this.discountService = discountService;
  }

  async createDiscount(req: Request, res: Response) {
    const body: any = req.body;

    try {
      const createDiscountDto: CreateDiscountDTO = {
        discountName: body.discountName,
        discountPercentage: body.discountPercentage,
      };

      const createdDiscount = await this.discountService.createDiscount(
        createDiscountDto
      );

      return CustomResponse(
        res,
        true,
        StatusCodes.CREATED,
        "Discount created successfully!",
        createdDiscount
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async updateDiscount(req: Request, res: Response) {
    try {
      const discountId = req.params.discountId;
      const updateDiscountDto: UpdateDiscountDTO = req.body;

      const updatedDiscount = await this.discountService.updateDiscount(
        +discountId,
        updateDiscountDto
      );

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Discount updated successfully!",
        updatedDiscount
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async deleteDiscount(req: Request, res: Response) {
    try {
      const discountId = req.params.discountId;

      const deleted = await this.discountService.deleteDiscount(+discountId);

      if (!deleted) {
        throw new NotFoundError(`Discount with ID ${discountId} not found`);
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Discount deleted successfully!",
        ""
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getAllDiscounts(req: Request, res: Response) {
    try {
      const discounts = await this.discountService.getAllDiscounts();

      if (!discounts || discounts.length === 0) {
        throw new NotFoundError("No discounts found!");
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Discounts fetched successfully!",
        discounts
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getOneDiscount(req: Request, res: Response) {
    try {
      const discountId: number = parseInt(req.params.discountId, 10);
      const discount = await this.discountService.findDiscountById(discountId);

      if (!discount) {
        throw new NotFoundError(`Discount with ID ${discountId} not found`);
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Discount retrieved successfully",
        discount
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }
}
