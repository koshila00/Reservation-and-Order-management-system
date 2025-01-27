import { Repository } from "typeorm";
import { CafeInventory } from "../entities/CafeInventory";
import {
  CreateCafeItemDTO,
  UpdateCafeItemDTO,
  CafeInventoryDTO,
} from "../dtos/Cafe_Inventory_Dto";
import NotFoundError from "../utills/error/error.classes/NotFoundError";

export class CafeInventoryService {
  private cafeInventoryRepository: Repository<CafeInventory>;

  constructor(cafeInventoryRepository: Repository<CafeInventory>) {
    this.cafeInventoryRepository = cafeInventoryRepository;
  }

  async createCafeItem(
    createCafeItemDto: CreateCafeItemDTO
  ): Promise<CafeInventory> {
    const newCafeItem = new CafeInventory();
    newCafeItem.cafeItemName = createCafeItemDto.cafeItemName ?? "";
    newCafeItem.cafeItemPrice = createCafeItemDto.cafeItemPrice ?? 0;
    newCafeItem.cafeItemQty = createCafeItemDto.cafeItemQty ?? 0;
    newCafeItem.cafeItemDescription =
      createCafeItemDto.cafeItemDescription ?? "";
    newCafeItem.cafeItemImage = createCafeItemDto.cafeItemImage ?? "";

    return await this.cafeInventoryRepository.save(newCafeItem);
  }

  async updateCafeItem(
    cafeItemId: number,
    updateCafeItemDto: UpdateCafeItemDTO
  ): Promise<CafeInventory> {
    try {
      const cafeItem = await this.findCafeItemById(cafeItemId);

      if (!cafeItem) {
        throw new NotFoundError(`Cafe item with id ${cafeItemId} not found`);
      }

      Object.assign(cafeItem, updateCafeItemDto);

      return await this.cafeInventoryRepository.save(cafeItem);
    } catch (error) {
      console.error("Error updating cafe item:", error);
      throw error;
    }
  }

  async findCafeItemById(cafeItemId: number): Promise<CafeInventory | null> {
    const cafeItem = await this.cafeInventoryRepository.findOne({
      where: { cafeItemId },
    });
    return cafeItem || null;
  }

  async deleteCafeItem(cafeItemId: number): Promise<boolean> {
    const cafeItem = await this.findCafeItemById(cafeItemId);

    if (!cafeItem) {
      return false;
    }

    cafeItem.isDelete = true;
    await this.cafeInventoryRepository.save(cafeItem);
    return true;
  }


  async getAllCafeItems(): Promise<CafeInventoryDTO[]> {
    const cafeItems = await this.cafeInventoryRepository.find({
      where: { isDelete: false },
    });

    return cafeItems.map((cafeItem) => ({
      cafeItemId: cafeItem.cafeItemId,
      cafeItemName: cafeItem.cafeItemName,
      cafeItemPrice: cafeItem.cafeItemPrice,
      cafeItemQty: cafeItem.cafeItemQty,
      cafeItemDescription: cafeItem.cafeItemDescription,
      cafeItemImage: cafeItem.cafeItemImage,
    }));
  }


  async reduceCafeItemQty(cafeItemId: number): Promise<CafeInventory | null> {
    const cafeItem = await this.cafeInventoryRepository.findOne({
      where: { cafeItemId },
    });
    if (!cafeItem) {
      throw new NotFoundError(`Cafe item with id ${cafeItemId} not found`);
    }

    cafeItem.cafeItemQty -= 1;
    if (cafeItem.cafeItemQty < 0) {
      throw new NotFoundError(`Cannot reduce quantity below 0`);
    }

    return await this.cafeInventoryRepository.save(cafeItem);
  }

  async increaseCafeItemQty(cafeItemId: number): Promise<CafeInventory | null> {
    const cafeItem = await this.cafeInventoryRepository.findOne({
      where: { cafeItemId },
    });
    if (!cafeItem) {
      throw new NotFoundError(`Cafe item with id ${cafeItemId} not found`);
    }

    cafeItem.cafeItemQty += 1;

    return await this.cafeInventoryRepository.save(cafeItem);
  }
}
