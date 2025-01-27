import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CafeOrderItemService } from "../services/cafe_order_items_service";
import CustomResponse from "../utills/responce";
import ErrorHandler from "../utills/error/ErrorHandler";
import { CreateCafeOrderItemDTO } from "../dtos/Cafe_Order_Item_Dto";
import { UpdateCafeItemDTO } from "../dtos/Cafe_Inventory_Dto";
import { CafeInventoryService } from "../services/cafe_inventory_service";

export class CafeOrderItemController {
  private cafeOrderItemService: CafeOrderItemService;
  private cafeInventoryService: CafeInventoryService;

  constructor(
    cafeOrderItemService: CafeOrderItemService,
    cafeInventoryService: CafeInventoryService
  ) {
    this.cafeOrderItemService = cafeOrderItemService;
    this.cafeInventoryService = cafeInventoryService;
  }

  async createCafeOrderItems(req: Request, res: Response) {
    try {
      const items: CreateCafeOrderItemDTO[] = req.body.items;
      const orderId = req.body.orderId;

      const createdCafeOrderItems = [];
      for (const item of items) {
        const createdItem = await this.cafeOrderItemService.createCafeOrderItem(
          orderId,
          item
        );

        const cafeItemId = item.cafeItemId;
        if (cafeItemId === undefined) {
          throw new Error("Cafe Item ID is undefined");
        }

        const cafeItem = await this.cafeInventoryService.findCafeItemById(
          cafeItemId
        );

        const newItemQty =
          (cafeItem?.cafeItemQty ?? 0) - (item.cafeOrderItemQty ?? 0);

        const updateCafeItemDto: UpdateCafeItemDTO = {
          cafeItemQty: newItemQty,
        };

        // Update inventory item count
        await this.cafeInventoryService.updateCafeItem(
          createdItem.cafeItemId,
          updateCafeItemDto
        );

        createdCafeOrderItems.push(createdItem);
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.CREATED,
        "Cafe order items created successfully!",
        createdCafeOrderItems
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async findCafeOrderItemsByOrderId(req: Request, res: Response) {
    try {
      const cafeOrderId: number = parseInt(req.params.cafeOrderId, 10);
      const cafeOrderItems =
        await this.cafeOrderItemService.findCafeOrderItemsByOrderId(
          cafeOrderId
        );
      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Cafe order items retrieved successfully",
        cafeOrderItems
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async deleteCafeOrderItemsByOrderId(req: Request, res: Response) {
    try {
      const cafeOrderId: number = parseInt(req.params.cafeOrderId, 10);
      const deleted =
        await this.cafeOrderItemService.deleteCafeOrderItemsByOrderId(
          cafeOrderId
        );
      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        deleted
          ? "Cafe order items deleted successfully!"
          : "No cafe order items found for deletion",
        ""
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getAllCafeOrderItems(req: Request, res: Response) {
    try {
      const cafeOrderItems =
        await this.cafeOrderItemService.getAllCafeOrderItems();
      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "All cafe order items retrieved successfully",
        cafeOrderItems
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }
}
