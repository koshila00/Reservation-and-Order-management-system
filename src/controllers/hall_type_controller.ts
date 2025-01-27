import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HallTypeService } from "../services/hall_type_service";
import CustomResponse from "../utills/responce";
import ErrorHandler from "../utills/error/ErrorHandler";
import { CreateHallTypeDTO, UpdateHallTypeDTO } from "../dtos/Hall_Type_Dto";

export class HallTypeController {
  private hallTypeService: HallTypeService;

  constructor(hallTypeService: HallTypeService) {
    this.hallTypeService = hallTypeService;
  }

  async createHallType(req: Request, res: Response) {
    try {
      const createHallTypeDto: CreateHallTypeDTO = req.body;
      const createdHallType = await this.hallTypeService.createHallType(
        createHallTypeDto
      );
      return CustomResponse(
        res,
        true,
        StatusCodes.CREATED,
        "Hall type created successfully!",
        createdHallType
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async updateHallType(req: Request, res: Response) {
    try {
      const hallTypeId: number = parseInt(req.params.hallTypeId, 10);
      const updateHallTypeDto: UpdateHallTypeDTO = req.body;
      const updatedHallType = await this.hallTypeService.updateHallType(
        hallTypeId,
        updateHallTypeDto
      );
      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Hall type updated successfully!",
        updatedHallType
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async deleteHallType(req: Request, res: Response) {
    try {
      const hallTypeId: number = parseInt(req.params.hallTypeId, 10);
      const deleted = await this.hallTypeService.deleteHallType(hallTypeId);
      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        deleted
          ? "Hall type deleted successfully!"
          : "Hall type not found for deletion",
        ""
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getAllHallTypes(req: Request, res: Response) {
    try {
      const hallTypes = await this.hallTypeService.getAllHallTypes();
      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "All hall types retrieved successfully",
        hallTypes
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getOneHallType(req: Request, res: Response) {
    try {
      const hallTypeId: number = parseInt(req.params.hallTypeId, 10);
      const hallType = await this.hallTypeService.getHallTypeById(hallTypeId);
      if (!hallType) {
        return CustomResponse(
          res,
          false,
          StatusCodes.NOT_FOUND,
          `Hall type with id ${hallTypeId} not found`,
          null
        );
      }
      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Hall type retrieved successfully",
        hallType
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }
}
