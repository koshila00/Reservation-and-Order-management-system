import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HallMenuPackageItemsService } from "../services/hall_menu_package_item_service";
import {
  CreateHallMenuPackageItemDTO,
  UpdateHallMenuPackageItemDTO,
} from "../dtos/Hall_Menu_Package_Items_Dto";
import NotFoundError from "../utills/error/error.classes/NotFoundError";
import ErrorHandler from "../utills/error/ErrorHandler";
import CustomResponse from "../utills/responce";

export class HallMenuPackageItemsController {
  private hallMenuPackageItemsService: HallMenuPackageItemsService;

  constructor(hallMenuPackageItemsService: HallMenuPackageItemsService) {
    this.hallMenuPackageItemsService = hallMenuPackageItemsService;
  }

  async createHallMenuPackageItem(req: Request, res: Response) {
    try {
      const body: any = req.body;
      const createHallMenuPackageItemDto: CreateHallMenuPackageItemDTO = {
        hallMenuPackageItemName: body.hallMenuPackageItemName,
        hallMenuPackageId: body.hallMenuPackageId,
      };

      const createdHallMenuPackageItem =
        await this.hallMenuPackageItemsService.createHallMenuPackageItem(
          createHallMenuPackageItemDto
        );

      return CustomResponse(
        res,
        true,
        StatusCodes.CREATED,
        "Hall menu package item created successfully!",
        createdHallMenuPackageItem
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async updateHallMenuPackageItem(req: Request, res: Response) {
    try {
      const hallMenuPackageItemId = req.params.hallMenuPackageItemId;
      const updateHallMenuPackageItemDto: UpdateHallMenuPackageItemDTO =
        req.body;

      const updatedHallMenuPackageItem =
        await this.hallMenuPackageItemsService.updateHallMenuPackageItem(
          +hallMenuPackageItemId,
          updateHallMenuPackageItemDto
        );

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Hall menu package item updated successfully!",
        updatedHallMenuPackageItem
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async deleteHallMenuPackageItem(req: Request, res: Response) {
    try {
      const hallMenuPackageItemId = req.params.hallMenuPackageItemId;

      const deleted =
        await this.hallMenuPackageItemsService.deleteHallMenuPackageItem(
          +hallMenuPackageItemId
        );

      if (!deleted) {
        throw new NotFoundError(
          `Hall menu package item with ID ${hallMenuPackageItemId} not found`
        );
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Hall menu package item deleted successfully!",
        ""
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getAllHallMenuPackageItems(req: Request, res: Response) {
    try {
      const hallMenuPackageItems =
        await this.hallMenuPackageItemsService.getAllHallMenuPackageItems();

      if (!hallMenuPackageItems || hallMenuPackageItems.length === 0) {
        throw new NotFoundError("No hall menu package items found!");
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Hall menu package items fetched successfully!",
        hallMenuPackageItems
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getOneHallMenuPackageItem(req: Request, res: Response) {
    try {
      const hallMenuPackageItemId: number = parseInt(
        req.params.hallMenuPackageItemId,
        10
      );
      const hallMenuPackageItem =
        await this.hallMenuPackageItemsService.findHallMenuPackageItemById(
          hallMenuPackageItemId
        );

      if (!hallMenuPackageItem) {
        throw new NotFoundError(
          `Hall menu package item with ID ${hallMenuPackageItemId} not found`
        );
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Hall menu package item retrieved successfully",
        hallMenuPackageItem
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }
}
