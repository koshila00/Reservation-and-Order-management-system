"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CafeOrderController = void 0;
const http_status_codes_1 = require("http-status-codes");
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
const ErrorHandler_1 = __importDefault(require("../utills/error/ErrorHandler"));
const responce_1 = __importDefault(require("../utills/responce"));
const email_server_1 = require("../utills/email/email-server");
const email_templates_1 = __importDefault(require("../utills/email/email-templates"));
class CafeOrderController {
    constructor(cafeOrderService, cafeOrderItemService, cafeInventoryService) {
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
    async createCafeOrder(req, res) {
        var _a, _b;
        try {
            const body = req.body;
            const auth = req.auth;
            // Create the cafe order DTO
            const createCafeOrderDto = {
                userId: auth.id,
                cafeOrderTotal: body.cafeOrderTotal,
                cafeOrderDeliveryStatus: body.cafeOrderDeliveryStatus,
                cafeOrderType: body.cafeOrderType,
                discountId: body.discountId,
            };
            // Create the cafe order
            const createdCafeOrder = await this.cafeOrderService.createCafeOrder(createCafeOrderDto);
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
                const items = await Promise.all(body.items.map(async (item) => {
                    const cafeItemId = item.cafeItemId;
                    const detailedItem = await this.cafeInventoryService.findCafeItemById(cafeItemId);
                    if (!detailedItem) {
                        throw new NotFoundError_1.default(`Cafe item with ID ${cafeItemId} not found`);
                    }
                    return {
                        name: detailedItem.cafeItemName,
                        quantity: item.cafeOrderItemQty, // Assuming price is a property of detailedItem
                    };
                }));
                const htmlBody = email_templates_1.default.OrderCreatedEmail({
                    fullName: auth.fullName,
                    orderId: createdCafeOrder.cafeOrderId,
                    orderDate: createdCafeOrder.createdDate,
                    items: items,
                    orderTotal: body.cafeOrderTotal,
                });
                await (0, email_server_1.sendEmail)(auth.email, subject, htmlBody, null);
            }
            const items = body.items;
            const createdCafeOrderItems = [];
            for (const item of items) {
                item.cafeOrderId = createdCafeOrder.cafeOrderId;
                // Create the cafe order item
                const createdItem = await this.cafeOrderItemService.createCafeOrderItem(createdCafeOrder.cafeOrderId, item);
                createdCafeOrderItems.push(createdItem);
                const cafeItemId = item.cafeItemId;
                if (cafeItemId === undefined) {
                    throw new Error("Cafe Item ID is undefined");
                }
                // Find the cafe item by ID
                const cafeItem = await this.cafeInventoryService.findCafeItemById(cafeItemId);
                const newItemQty = ((_a = cafeItem === null || cafeItem === void 0 ? void 0 : cafeItem.cafeItemQty) !== null && _a !== void 0 ? _a : 0) - ((_b = item.cafeOrderItemQty) !== null && _b !== void 0 ? _b : 0);
                const updateCafeItemDto = {
                    cafeItemQty: newItemQty,
                };
                // Update the inventory item count
                await this.cafeInventoryService.updateCafeItem(createdItem.cafeItemId, updateCafeItemDto);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Cafe order created successfully!", {
                cafeOrder: createdCafeOrder,
                cafeOrderItems: createdCafeOrderItems,
            });
        }
        catch (error) {
            // Handle errors
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async updateCafeOrder(req, res) {
        try {
            const cafeOrderId = req.params.cafeOrderId;
            const updateCafeOrderDto = req.body;
            const updatedCafeOrder = await this.cafeOrderService.updateCafeOrder(+cafeOrderId, updateCafeOrderDto);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Cafe order updated successfully!", updatedCafeOrder);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async deleteCafeOrder(req, res) {
        try {
            const cafeOrderId = req.params.cafeOrderId;
            const deleted = await this.cafeOrderService.deleteCafeOrder(+cafeOrderId);
            if (!deleted) {
                throw new NotFoundError_1.default(`Cafe order with ID ${cafeOrderId} not found`);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Cafe order deleted successfully!", "");
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getAllCafeOrders(req, res) {
        try {
            const cafeOrders = await this.cafeOrderService.getAllCafeOrders();
            if (!cafeOrders || cafeOrders.length === 0) {
                throw new NotFoundError_1.default("No cafe orders found!");
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Cafe orders fetched successfully!", cafeOrders);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getOneCafeOrder(req, res) {
        try {
            const cafeOrderId = parseInt(req.params.cafeOrderId, 10);
            const cafeOrder = await this.cafeOrderService.findCafeOrderById(cafeOrderId);
            if (!cafeOrder) {
                throw new NotFoundError_1.default(`Cafe order with ID ${cafeOrderId} not found`);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Cafe order retrieved successfully", cafeOrder);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
}
exports.CafeOrderController = CafeOrderController;
