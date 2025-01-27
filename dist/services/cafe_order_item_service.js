"use strict";
// // import { Repository } from "typeorm";
// // import { CafeOrderItem } from "../entities/CafeOrderItem";
// // import {
// //   CreateCafeOrderItemDTO,
// //   UpdateCafeOrderItemDTO,
// //   CafeOrderItemDTO,
// // } from "../dtos/Cafe_Order_Item_Dto";
// // import NotFoundError from "../utills/error/error.classes/NotFoundError";
// // export class CafeOrderItemService {
// //   private cafeOrderItemRepository: Repository<CafeOrderItem>;
// //   constructor(cafeOrderItemRepository: Repository<CafeOrderItem>) {
// //     this.cafeOrderItemRepository = cafeOrderItemRepository;
// //   }
// //   async createCafeOrderItems(
// //     createCafeOrderItemDtos: CreateCafeOrderItemDTO[]
// //   ): Promise<CafeOrderItem[]> {
// //     const newCafeOrderItems: CafeOrderItem[] = [];
// //     for (const createCafeOrderItemDto of createCafeOrderItemDtos) {
// //       try {
// //         const newCafeOrderItem = new CafeOrderItem();
// //         newCafeOrderItem.cafeOrderId = createCafeOrderItemDto.cafeOrderId ?? 0;
// //         newCafeOrderItem.cafeItemId = createCafeOrderItemDto.cafeItemId ?? 0;
// //         newCafeOrderItem.cafeOrderItemQty =
// //           createCafeOrderItemDto.cafeOrderItemQty ?? 0;
// //         console.log(newCafeOrderItem);
// //         const savedCafeOrderItem = await this.cafeOrderItemRepository.save(
// //           newCafeOrderItem
// //         );
// //         newCafeOrderItems.push(savedCafeOrderItem);
// //       } catch (error) {
// //         console.error("Error saving cafe order item:", error);
// //       }
// //     }
// //     return newCafeOrderItems;
// //   }
// //   async findCafeOrderItemsByOrderId(
// //     cafeOrderId: number
// //   ): Promise<CafeOrderItem[]> {
// //     const cafeOrderItems = await this.cafeOrderItemRepository.find({
// //       where: { cafeOrderId },
// //     });
// //     return cafeOrderItems || [];
// //   }
// //   async deleteCafeOrderItemsByOrderId(cafeOrderId: number): Promise<boolean> {
// //     try {
// //       // Find all Cafe Order Items with the provided cafeOrderId
// //       const cafeOrderItems = await this.cafeOrderItemRepository.find({
// //         where: { cafeOrderId },
// //       });
// //       // If no Cafe Order Items found, return false
// //       if (!cafeOrderItems || cafeOrderItems.length === 0) {
// //         return false;
// //       }
// //       // Delete each Cafe Order Item one by one
// //       for (const cafeOrderItem of cafeOrderItems) {
// //         await this.cafeOrderItemRepository.remove(cafeOrderItem);
// //       }
// //       // Return true to indicate successful deletion
// //       return true;
// //     } catch (error) {
// //       console.error("Error deleting cafe order items:", error);
// //       throw error;
// //     }
// //   }
// //   async getAllCafeOrderItems(): Promise<CafeOrderItemDTO[]> {
// //     try {
// //       const cafeOrderItems = await this.cafeOrderItemRepository.find();
// //       return cafeOrderItems.map((cafeOrderItem: any) => ({
// //         cafeOrderItemId: cafeOrderItem.cafeOrderItemId,
// //         cafeOrderId: cafeOrderItem.cafeOrderId,
// //         cafeItemId: cafeOrderItem.cafeItemId,
// //         createdDate: cafeOrderItem.createdDate,
// //         updatedDate: cafeOrderItem.updatedDate,
// //         cafeOrderItemQty: cafeOrderItem.cafeOrderItemQty,
// //       }));
// //     } catch (error) {
// //       console.error("Error retrieving all cafe order items:", error);
// //       throw error;
// //     }
// //   }
// // }
// import { Repository } from "typeorm";
// import { CafeOrderItem } from "../entities/CafeOrderItem";
// import { CreateCafeOrderItemDTO } from "../dtos/Cafe_Order_Item_Dto";
// import NotFoundError from "../utills/error/error.classes/NotFoundError";
// export class CafeOrderItemService {
//   private cafeOrderItemRepository: Repository<CafeOrderItem>;
//   constructor(cafeOrderItemRepository: Repository<CafeOrderItem>) {
//     this.cafeOrderItemRepository = cafeOrderItemRepository;
//   }
//   async createCafeOrderItems(
//     createCafeOrderItemDtos: CreateCafeOrderItemDTO[]
//   ): Promise<CafeOrderItem[]> {
//     const newCafeOrderItems: CafeOrderItem[] = [];
//     for (const createCafeOrderItemDto of createCafeOrderItemDtos) {
//       try {
//         const newCafeOrderItem = new CafeOrderItem();
//         newCafeOrderItem.cafeOrderId = createCafeOrderItemDto.cafeOrderId ?? 0;
//         newCafeOrderItem.cafeItemId = createCafeOrderItemDto.cafeItemId ?? 0;
//         newCafeOrderItem.cafeOrderItemQty =
//           createCafeOrderItemDto.cafeOrderItemQty ?? 0;
//         console.log(newCafeOrderItem);
//         const savedCafeOrderItem = await this.cafeOrderItemRepository.save(
//           newCafeOrderItem
//         );
//         newCafeOrderItems.push(savedCafeOrderItem);
//       } catch (error) {
//         console.error("Error saving cafe order item:", error);
//       }
//     }
//     return newCafeOrderItems;
//   }
//   async findCafeOrderItemsByOrderId(
//     cafeOrderId: number
//   ): Promise<CafeOrderItem[]> {
//     const cafeOrderItems = await this.cafeOrderItemRepository.find({
//       where: { cafeOrderId },
//     });
//     return cafeOrderItems || [];
//   }
//   async deleteCafeOrderItemsByOrderId(cafeOrderId: number): Promise<boolean> {
//     try {
//       const cafeOrderItems = await this.cafeOrderItemRepository.find({
//         where: { cafeOrderId },
//       });
//       if (!cafeOrderItems || cafeOrderItems.length === 0) {
//         return false;
//       }
//       for (const cafeOrderItem of cafeOrderItems) {
//         await this.cafeOrderItemRepository.remove(cafeOrderItem);
//       }
//       return true;
//     } catch (error) {
//       console.error("Error deleting cafe order items:", error);
//       throw error;
//     }
//   }
//   async getAllCafeOrderItems(): Promise<any[]> {
//     try {
//       const cafeOrderItems = await this.cafeOrderItemRepository.find();
//       return cafeOrderItems.map((cafeOrderItem: any) => ({
//         cafeOrderItemId: cafeOrderItem.cafeOrderItemId,
//         cafeOrderId: cafeOrderItem.cafeOrderId,
//         cafeItemId: cafeOrderItem.cafeItemId,
//         createdDate: cafeOrderItem.createdDate,
//         updatedDate: cafeOrderItem.updatedDate,
//         cafeOrderItemQty: cafeOrderItem.cafeOrderItemQty,
//       }));
//     } catch (error) {
//       console.error("Error retrieving all cafe order items:", error);
//       throw error;
//     }
//   }
// }
