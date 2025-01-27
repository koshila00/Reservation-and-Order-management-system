import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CafeInventoryService } from "../services/cafe_inventory_service";
import {
  CreateCafeItemDTO,
  UpdateCafeItemDTO,
} from "../dtos/Cafe_Inventory_Dto";
import NotFoundError from "../utills/error/error.classes/NotFoundError";
import BadRequestError from "../utills/error/error.classes/BadRequestError";
import ErrorHandler from "../utills/error/ErrorHandler";
import CustomResponse from "../utills/responce";

import commonService from "../config/storage_config";
import constants from "../utills/constants";

export class CafeInventoryController {
  private cafeInventoryService: CafeInventoryService;

  constructor(cafeInventoryService: CafeInventoryService) {
    this.cafeInventoryService = cafeInventoryService;
  }

  async createCafeItem(req: Request, res: Response) {
    const body: any = req.body;

    let file: any = req.file;

    try {
      //console.log(body);
      const createCafeItemDto: CreateCafeItemDTO = {
        cafeItemName: body.cafeItemName,
        cafeItemPrice: body.cafeItemPrice,
        cafeItemQty: body.cafeItemQty,
        cafeItemDescription: body.cafeItemDescription,
        cafeItemImage: body.cafeItemImage,
      };

      let uploadedObj: any = null;
      if (file) {
        uploadedObj = await commonService.uploadImageAndGetUri(
          file,
          constants.CLOUDINARY.FILE_NAME + "/Cafe_Items"
        );
      }

      if (uploadedObj != null) {
        createCafeItemDto.cafeItemImage = uploadedObj.uri.toString();
      }

      // console.log(createCafeItemDto);

      const createdCafeItem = await this.cafeInventoryService.createCafeItem(
        createCafeItemDto
      );

      return CustomResponse(
        res,
        true,
        StatusCodes.CREATED,
        "Cafe item created successfully!",
        createdCafeItem
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async updateCafeItem(req: Request, res: Response) {
    try {
      const cafeItemId = req.params.cafeItemId;
      const updateCafeItemDto: UpdateCafeItemDTO = req.body;

      const updatedCafeItem = await this.cafeInventoryService.updateCafeItem(
        +cafeItemId,
        updateCafeItemDto
      );

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Cafe item updated successfully!",
        updatedCafeItem
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async deleteCafeItem(req: Request, res: Response) {
    try {
      const cafeItemId = req.params.cafeItemId;

      const deleted = await this.cafeInventoryService.deleteCafeItem(
        +cafeItemId
      );

      if (!deleted) {
        throw new NotFoundError(`Cafe item with ID ${cafeItemId} not found`);
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Cafe item deleted successfully!",
        ""
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getAllCafeItems(req: Request, res: Response) {
    try {
      const cafeItems = await this.cafeInventoryService.getAllCafeItems();

      if (!cafeItems || cafeItems.length === 0) {
        throw new NotFoundError("No cafe items found!");
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Cafe items fetched successfully!",
        cafeItems
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getOneCafeItem(req: Request, res: Response) {
    try {
      const cafeItemId: number = parseInt(req.params.cafeItemId, 10);
      const cafeItem = await this.cafeInventoryService.findCafeItemById(
        cafeItemId
      );

      if (!cafeItem) {
        throw new NotFoundError(`Cafe item with ID ${cafeItemId} not found`);
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Cafe item retrieved successfully",
        cafeItem
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async reduceOne(req: Request, res: Response) {
    try {
      const cafeItemId: number = parseInt(req.params.cafeItemId, 10);
      const cafeItem = await this.cafeInventoryService.reduceCafeItemQty(
        cafeItemId
      );

      if (!cafeItem) {
        throw new NotFoundError(`Cafe item with ID ${cafeItemId} not found`);
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Cafe item reduce successfully",
        cafeItem
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async increaseOne(req: Request, res: Response) {
    try {
      const cafeItemId: number = parseInt(req.params.cafeItemId, 10);
      const cafeItem = await this.cafeInventoryService.increaseCafeItemQty(
        cafeItemId
      );

      if (!cafeItem) {
        throw new NotFoundError(`Cafe item with ID ${cafeItemId} not found`);
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Cafe item increase successfully",
        cafeItem
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }
}
