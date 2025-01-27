import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HallInventoryService } from "../services/hall_inventory_service";
import {
  CreateHallInventoryItemDTO,
  UpdateHallInventoryItemDTO,
} from "../dtos/Hall_Inventory_Dto"; // Updated DTO import
import NotFoundError from "../utills/error/error.classes/NotFoundError";
import ErrorHandler from "../utills/error/ErrorHandler";
import CustomResponse from "../utills/responce";

export class HallInventoryItemController {
  private hallInventoryService: HallInventoryService;

  constructor(hallInventoryService: HallInventoryService) {
    this.hallInventoryService = hallInventoryService;
  }

  async createHallInventoryItem(req: Request, res: Response) {
    const body: any = req.body;
    const file: any = req.file;

    try {
      const createHallInventoryItemDto: CreateHallInventoryItemDTO = {
        hallInventoryItemName: body.hallItemName,
        hallInventoryItemPrice: body.hallItemPrice,
        hallInventoryItemQty: body.hallItemQty,
        hallInventoryItemDescription: body.hallItemDescription,
      };

      const createdHallInventoryItem =
        await this.hallInventoryService.createHallInventoryItem(
          createHallInventoryItemDto // Updated method name
        );

      return CustomResponse(
        res,
        true,
        StatusCodes.CREATED,
        "Hall inventory item created successfully!",
        createdHallInventoryItem
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async updateHallInventoryItem(req: Request, res: Response) {
    try {
      const hallInventoryItemId = req.params.hallInventoryItemId;
      const updateHallInventoryItemDto: UpdateHallInventoryItemDTO = req.body;

      const updatedHallInventoryItem =
        await this.hallInventoryService.updateHallInventoryItem(
          // Updated method name
          +hallInventoryItemId,
          updateHallInventoryItemDto
        );

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Hall inventory item updated successfully!",
        updatedHallInventoryItem
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async deleteHallInventoryItem(req: Request, res: Response) {
    try {
      const hallInventoryItemId = req.params.hallInventoryItemId;

      const deleted = await this.hallInventoryService.deleteHallInventoryItem(
        // Updated method name
        +hallInventoryItemId
      );

      if (!deleted) {
        throw new NotFoundError(
          `Hall inventory item with ID ${hallInventoryItemId} not found`
        );
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Hall inventory item deleted successfully!",
        ""
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getAllHallInventoryItems(req: Request, res: Response) {
    try {
      const hallInventoryItems =
        await this.hallInventoryService.getAllHallInventoryItems(); // Updated method name

      if (!hallInventoryItems || hallInventoryItems.length === 0) {
        throw new NotFoundError("No hall inventory items found!");
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Hall inventory items fetched successfully!",
        hallInventoryItems
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getOneHallInventoryItem(req: Request, res: Response) {
    try {
      const hallInventoryItemId: number = parseInt(
        req.params.hallInventoryItemId,
        10
      );
      const hallInventoryItem =
        await this.hallInventoryService.findHallInventoryItemById(
          // Updated method name
          hallInventoryItemId
        );

      if (!hallInventoryItem) {
        throw new NotFoundError(
          `Hall inventory item with ID ${hallInventoryItemId} not found`
        );
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Hall inventory item retrieved successfully",
        hallInventoryItem
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async reduceOne(req: Request, res: Response) {
    try {
      const hallInventoryItemId: number = parseInt(
        req.params.hallInventoryItemId,
        10
      );
      const hallInventoryItem =
        await this.hallInventoryService.reduceHallItemQty(hallInventoryItemId);

      if (!hallInventoryItem) {
        throw new NotFoundError(
          `Hall item with ID ${hallInventoryItemId} not found`
        );
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Hall item reduce successfully",
        hallInventoryItem
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async increaseOne(req: Request, res: Response) {
    try {
      const hallInventoryItemId: number = parseInt(
        req.params.hallInventoryItemId,
        10
      );
      const hallInventoryItem =
        await this.hallInventoryService.increaseHallItemQty(
          hallInventoryItemId
        );

      if (!hallInventoryItem) {
        throw new NotFoundError(
          `Hall item with ID ${hallInventoryItemId} not found`
        );
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Hall item increase successfully",
        hallInventoryItem
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }
}
