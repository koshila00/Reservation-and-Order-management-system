import { Repository } from "typeorm";
import { HallInventory } from "../entities/HallInventory";
import {
  CreateHallInventoryItemDTO,
  UpdateHallInventoryItemDTO,
  HallInventoryItemDTO,
} from "../dtos/Hall_Inventory_Dto"; // Updated DTO imports
import NotFoundError from "../utills/error/error.classes/NotFoundError";

export class HallInventoryService {
  private hallInventoryRepository: Repository<HallInventory>;

  constructor(hallInventoryRepository: Repository<HallInventory>) {
    this.hallInventoryRepository = hallInventoryRepository;
  }

  async createHallInventoryItem(
    createHallInventoryItemDto: CreateHallInventoryItemDTO // Updated parameter name
  ): Promise<HallInventory> {
    const newHallInventoryItem = new HallInventory(); // Updated variable name
    newHallInventoryItem.hallInventoryItemName =
      createHallInventoryItemDto.hallInventoryItemName ?? ""; // Updated property name
    newHallInventoryItem.hallInventoryItemPrice =
      createHallInventoryItemDto.hallInventoryItemPrice ?? 0; // Updated property name
    newHallInventoryItem.hallInventoryItemQty =
      createHallInventoryItemDto.hallInventoryItemQty ?? 0; // Updated property name
    newHallInventoryItem.hallInventoryItemDescription =
      createHallInventoryItemDto.hallInventoryItemDescription ?? ""; // Updated property name

    return await this.hallInventoryRepository.save(newHallInventoryItem);
  }

  async updateHallInventoryItem(
    hallInventoryItemId: number, // Updated parameter name
    updateHallInventoryItemDto: UpdateHallInventoryItemDTO // Updated parameter name
  ): Promise<HallInventory> {
    try {
      const hallInventoryItem = await this.findHallInventoryItemById(
        hallInventoryItemId
      ); // Updated method name

      if (!hallInventoryItem) {
        throw new NotFoundError(
          `Hall inventory item with id ${hallInventoryItemId} not found`
        ); // Updated error message
      }

      Object.assign(hallInventoryItem, updateHallInventoryItemDto);

      return await this.hallInventoryRepository.save(hallInventoryItem);
    } catch (error) {
      console.error("Error updating hall inventory item:", error);
      throw error;
    }
  }

  async findHallInventoryItemById(
    hallInventoryItemId: number // Updated parameter name
  ): Promise<HallInventory | null> {
    const hallInventoryItem = await this.hallInventoryRepository.findOne({
      where: { hallInventoryItemId }, // Updated property name
    });
    return hallInventoryItem || null;
  }

  async deleteHallInventoryItem(hallInventoryItemId: number): Promise<boolean> {
    const hallInventoryItem = await this.findHallInventoryItemById(hallInventoryItemId);

    if (!hallInventoryItem) {
      return false;
    }

    // Mark the item as deleted instead of removing it
    hallInventoryItem.isDelete = true;
    await this.hallInventoryRepository.save(hallInventoryItem);
    return true;
  }

  async getActiveHallInventoryItems(): Promise<HallInventory[]> {
    return this.hallInventoryRepository.find({ where: { isDelete: false } });
  }


  async getAllHallInventoryItems(): Promise<HallInventoryItemDTO[]> {
    const hallInventoryItems = await this.hallInventoryRepository.find({
      where: { isDelete: false },
    });

    return hallInventoryItems.map((hallInventoryItem) => ({
      hallInventoryItemId: hallInventoryItem.hallInventoryItemId,
      hallInventoryItemName: hallInventoryItem.hallInventoryItemName,
      hallInventoryItemPrice: hallInventoryItem.hallInventoryItemPrice,
      hallInventoryItemQty: hallInventoryItem.hallInventoryItemQty,
      hallInventoryItemDescription: hallInventoryItem.hallInventoryItemDescription,
    }));
  }


  async reduceHallItemQty(hallInventoryItemId: number): Promise<HallInventory | null> {
    const hallItem = await this.hallInventoryRepository.findOne({
      where: { hallInventoryItemId },
    });
    if (!hallItem) {
      throw new NotFoundError(`Hall item with id ${hallInventoryItemId} not found`);
    }

    hallItem.hallInventoryItemQty -= 1;
    if (hallItem.hallInventoryItemQty < 0) {
      throw new NotFoundError(`Cannot reduce quantity below 0`);
    }

    return await this.hallInventoryRepository.save(hallItem);
  }

  async increaseHallItemQty(hallInventoryItemId: number): Promise<HallInventory | null> {
    const hallItem = await this.hallInventoryRepository.findOne({
      where: { hallInventoryItemId },
    });
    if (!hallItem) {
      throw new NotFoundError(`Hall item with id ${hallInventoryItemId} not found`);
    }

    hallItem.hallInventoryItemQty += 1;

    return await this.hallInventoryRepository.save(hallItem);
  }
}

