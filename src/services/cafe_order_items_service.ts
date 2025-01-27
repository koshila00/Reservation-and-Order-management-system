import { Repository } from "typeorm";
import { CafeOrderItem } from "../entities/CafeOrderItem";
import { CreateCafeOrderItemDTO } from "../dtos/Cafe_Order_Item_Dto";
import NotFoundError from "../utills/error/error.classes/NotFoundError";

export class CafeOrderItemService {
  private cafeOrderItemRepository: Repository<CafeOrderItem>;

  constructor(cafeOrderItemRepository: Repository<CafeOrderItem>) {
    this.cafeOrderItemRepository = cafeOrderItemRepository;
  }

  async createCafeOrderItem(
    orderId: number,
    createCafeOrderItemDto: CreateCafeOrderItemDTO
  ): Promise<CafeOrderItem> {
    try {
      const newCafeOrderItem = new CafeOrderItem();
      newCafeOrderItem.cafeOrderId = orderId ?? 0;
      newCafeOrderItem.cafeItemId = createCafeOrderItemDto.cafeItemId ?? 0;
      newCafeOrderItem.cafeOrderItemQty =
        createCafeOrderItemDto.cafeOrderItemQty ?? 0;

      return await this.cafeOrderItemRepository.save(newCafeOrderItem);
    } catch (error) {
      console.error("Error creating cafe order item:", error);
      throw error;
    }
  }

  async findCafeOrderItemsByOrderId(
    cafeOrderId: number
  ): Promise<CafeOrderItem[]> {
    return await this.cafeOrderItemRepository.find({
      where: { cafeOrderId },
      relations: ["cafeOrder", "cafeInventory"],
    });
  }

  async deleteCafeOrderItemsByOrderId(cafeOrderId: number): Promise<boolean> {
    try {
      const cafeOrderItems = await this.cafeOrderItemRepository.find({
        where: { cafeOrderId },
      });

      if (!cafeOrderItems || cafeOrderItems.length === 0) {
        return false;
      }

      await this.cafeOrderItemRepository.remove(cafeOrderItems);
      return true;
    } catch (error) {
      console.error("Error deleting cafe order items:", error);
      throw error;
    }
  }

  async getAllCafeOrderItems(): Promise<CafeOrderItem[]> {
    return await this.cafeOrderItemRepository.find({
      relations: ["cafeOrder", "cafeInventory"],
    });
  }
}
