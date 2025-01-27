import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CafeOrderService } from "../services/cafe_order_service";

import { CafeOrderItemService } from "../services/cafe_order_items_service";
import { CreateCafeOrderDTO, UpdateCafeOrderDTO } from "../dtos/Cafe_Order_Dto";
import NotFoundError from "../utills/error/error.classes/NotFoundError";
import ErrorHandler from "../utills/error/ErrorHandler";
import CustomResponse from "../utills/responce";
import {
  CafeOrderItemDTO,
  CreateCafeOrderItemDTO,
} from "../dtos/Cafe_Order_Item_Dto";
import { UpdateCafeItemDTO } from "../dtos/Cafe_Inventory_Dto";
import { CafeInventoryService } from "../services/cafe_inventory_service";
import { sendEmail } from "../utills/email/email-server";
import emailService from "../utills/email/email-templates";

export class CafeOrderController {
  private cafeOrderService: CafeOrderService;
  private cafeOrderItemService: CafeOrderItemService;
  private cafeInventoryService: CafeInventoryService;

  constructor(
    cafeOrderService: CafeOrderService,
    cafeOrderItemService: CafeOrderItemService,
    cafeInventoryService: CafeInventoryService
  ) {
    this.cafeOrderService = cafeOrderService;
    this.cafeOrderItemService = cafeOrderItemService;
    this.cafeInventoryService = cafeInventoryService;
  }

  // async createCafeOrder(req: Request, res: Response) {
  //   try {
  //     const body: any = req.body;
  //     const auth: any = req.auth;
  //     const createCafeOrderDto: CreateCafeOrderDTO = {
  //       userId: auth.id,
  //       cafeOrderTotal: body.cafeOrderTotal,
  //       cafeOrderDeliveryStatus: body.cafeOrderDeliveryStatus,
  //       cafeOrderType: body.cafeOrderType,
  //       discountId: body.discountId,
  //     };

  //     // console.log(createCafeOrderDto);

  //     // Create the cafe order and wait for it to finish
  //     const createdCafeOrder = await this.cafeOrderService.createCafeOrder(
  //       createCafeOrderDto
  //     );

  //     const items: any[] = body.items;
  //     const createdCafeOrderItems: any = [];

  //     for (const item of items) {
  //       item.cafeOrderId = createdCafeOrder.cafeOrderId;
  //       const createdItem = await this.cafeOrderItemService.createCafeOrderItem(
  //         createdCafeOrder.cafeOrderId,
  //         item
  //       );

  //       console.log(createdItem);

  //       const cafeItemId = item.cafeItemId;
  //       if (cafeItemId === undefined) {
  //         throw new Error("Cafe Item ID is undefined");
  //       }

  //       const cafeItem = await this.cafeInventoryService.findCafeItemById(
  //         cafeItemId
  //       );

  //       console.log(item);

  //       const newItemQty =
  //         (cafeItem?.cafeItemQty ?? 0) - (item.cafeOrderItemQty ?? 0);

  //       const updateCafeItemDto: UpdateCafeItemDTO = {
  //         cafeItemQty: newItemQty,
  //       };

  //       // Update inventory item count
  //       await this.cafeInventoryService.updateCafeItem(
  //         createdItem.cafeItemId,
  //         updateCafeItemDto
  //       );

  //       createdCafeOrderItems.push(createdItem);
  //     }

  //     // items.forEach((item) => {
  //     //   console.log(item);
  //     //   item.userId = auth.id;

  //     //   const items: CreateCafeOrderItemDTO[] = item;

  //     //   Promise.resolve(
  //     //     this.cafeOrderItemService.createCafeOrderItem(
  //     //       createdCafeOrder.cafeOrderId,
  //     //       item
  //     //     )
  //     //   )
  //     //     .then((createdItem) => {
  //     //       createdCafeOrderItems.push(createdItem);
  //     //     })
  //     //     .catch((error) => {
  //     //       ErrorHandler.handle(res, error);
  //     //     });
  //     // });

  //     return CustomResponse(
  //       res,
  //       true,
  //       StatusCodes.CREATED,
  //       "Cafe order created successfully!",
  //       {
  //         cafeOrder: createdCafeOrder,
  //         cafeOrderItems: createdCafeOrderItems,
  //       }
  //     );
  //   } catch (error) {
  //     // Handle errors
  //     ErrorHandler.handle(res, error);
  //   }
  // }

  async createCafeOrder(req: Request, res: Response) {
    try {
      const body: any = req.body;
      const auth: any = req.auth;

      // Create the cafe order DTO
      const createCafeOrderDto: CreateCafeOrderDTO = {
        userId: auth.id,
        cafeOrderTotal: body.cafeOrderTotal,
        cafeOrderDeliveryStatus: body.cafeOrderDeliveryStatus,
        cafeOrderType: body.cafeOrderType,
        discountId: body.discountId,
      };

      // Create the cafe order
      const createdCafeOrder = await this.cafeOrderService.createCafeOrder(
        createCafeOrderDto
      );

      if (createdCafeOrder) {
        const subject = "Order Created Successfully";

        // Collect order items details for the email
        // const items = body.items.map((item: any) => ({
        //   name: item,
        //   quantity: item.quantity,
        //   price: item.price,
        // }));

        // const items = body.items.map(async (item: any) => {
        //   const cafeItemId = item.cafeItemId;
        //   const detailedItem = await this.cafeInventoryService.findCafeItemById(
        //     cafeItemId
        //   );

        //   if (!detailedItem) {
        //     throw new NotFoundError(
        //       `Cafe item with ID ${cafeItemId} not found`
        //     );
        //   }

        //   return {
        //     name: detailedItem.cafeItemName,
        //     quantity: item.cafeOrderItemQty,
        //   };
        // });
        const items = await Promise.all(
          body.items.map(async (item: any) => {
            const cafeItemId = item.cafeItemId;
            const detailedItem =
              await this.cafeInventoryService.findCafeItemById(cafeItemId);

            if (!detailedItem) {
              throw new NotFoundError(
                `Cafe item with ID ${cafeItemId} not found`
              );
            }

            return {
              name: detailedItem.cafeItemName,
              quantity: item.cafeOrderItemQty, // Assuming price is a property of detailedItem
            };
          })
        );

        const htmlBody = emailService.OrderCreatedEmail({
          fullName: auth.fullName,
          orderId: createdCafeOrder.cafeOrderId,
          orderDate: createdCafeOrder.createdDate,
          items: items,
          orderTotal: body.cafeOrderTotal,
        });

        await sendEmail(auth.email, subject, htmlBody, null);
      }

      const items: CreateCafeOrderItemDTO[] = body.items;
      const createdCafeOrderItems: any[] = [];

      for (const item of items) {
        item.cafeOrderId = createdCafeOrder.cafeOrderId;

        // Create the cafe order item
        const createdItem = await this.cafeOrderItemService.createCafeOrderItem(
          createdCafeOrder.cafeOrderId,
          item
        );
        createdCafeOrderItems.push(createdItem);

        const cafeItemId = item.cafeItemId;
        if (cafeItemId === undefined) {
          throw new Error("Cafe Item ID is undefined");
        }

        // Find the cafe item by ID
        const cafeItem = await this.cafeInventoryService.findCafeItemById(
          cafeItemId
        );

        const newItemQty =
          (cafeItem?.cafeItemQty ?? 0) - (item.cafeOrderItemQty ?? 0);

        const updateCafeItemDto: UpdateCafeItemDTO = {
          cafeItemQty: newItemQty,
        };

        // Update the inventory item count
        await this.cafeInventoryService.updateCafeItem(
          createdItem.cafeItemId,
          updateCafeItemDto
        );
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.CREATED,
        "Cafe order created successfully!",
        {
          cafeOrder: createdCafeOrder,
          cafeOrderItems: createdCafeOrderItems,
        }
      );
    } catch (error) {
      // Handle errors
      ErrorHandler.handle(res, error);
    }
  }

  async updateCafeOrder(req: Request, res: Response) {
    try {
      const cafeOrderId = req.params.cafeOrderId;
      const updateCafeOrderDto: UpdateCafeOrderDTO = req.body;

      const updatedCafeOrder = await this.cafeOrderService.updateCafeOrder(
        +cafeOrderId,
        updateCafeOrderDto
      );

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Cafe order updated successfully!",
        updatedCafeOrder
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async deleteCafeOrder(req: Request, res: Response) {
    try {
      const cafeOrderId = req.params.cafeOrderId;

      const deleted = await this.cafeOrderService.deleteCafeOrder(+cafeOrderId);

      if (!deleted) {
        throw new NotFoundError(`Cafe order with ID ${cafeOrderId} not found`);
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Cafe order deleted successfully!",
        ""
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getAllCafeOrders(req: Request, res: Response) {
    try {
      const cafeOrders = await this.cafeOrderService.getAllCafeOrders();

      if (!cafeOrders || cafeOrders.length === 0) {
        throw new NotFoundError("No cafe orders found!");
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Cafe orders fetched successfully!",
        cafeOrders
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getOneCafeOrder(req: Request, res: Response) {
    try {
      const cafeOrderId: number = parseInt(req.params.cafeOrderId, 10);
      const cafeOrder = await this.cafeOrderService.findCafeOrderById(
        cafeOrderId
      );

      if (!cafeOrder) {
        throw new NotFoundError(`Cafe order with ID ${cafeOrderId} not found`);
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Cafe order retrieved successfully",
        cafeOrder
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }
}
