import { Repository } from "typeorm";
import { HallMenuPackageItems } from "../entities/HallMenuPackageItems";
import {
  CreateHallMenuPackageItemDTO,
  UpdateHallMenuPackageItemDTO,
} from "../dtos/Hall_Menu_Package_Items_Dto";
import NotFoundError from "../utills/error/error.classes/NotFoundError";
import { HallMenuPackage } from "../entities/HallMenuPackage";

export class HallMenuPackageItemsService {
  private hallMenuPackageItemsRepository: Repository<HallMenuPackageItems>;

  constructor(
    hallMenuPackageItemsRepository: Repository<HallMenuPackageItems>
  ) {
    this.hallMenuPackageItemsRepository = hallMenuPackageItemsRepository;
  }

  async createHallMenuPackageItem(
    createHallMenuPackageItemDto: CreateHallMenuPackageItemDTO
  ): Promise<HallMenuPackageItems> {
    const newHallMenuPackageItem = new HallMenuPackageItems();
    newHallMenuPackageItem.hallMenuPackageItemName =
      createHallMenuPackageItemDto.hallMenuPackageItemName ?? "";
    newHallMenuPackageItem.hallMenuPackageId =
      createHallMenuPackageItemDto.hallMenuPackageId;

    return await this.hallMenuPackageItemsRepository.save(
      newHallMenuPackageItem
    );
  }

  async updateHallMenuPackageItem(
    hallMenuPackageItemId: number,
    updateHallMenuPackageItemDto: UpdateHallMenuPackageItemDTO
  ): Promise<HallMenuPackageItems> {
    try {
      const hallMenuPackageItem = await this.findHallMenuPackageItemById(
        hallMenuPackageItemId
      );

      if (!hallMenuPackageItem) {
        throw new NotFoundError(
          `Hall menu package item with id ${hallMenuPackageItemId} not found`
        );
      }

      Object.assign(hallMenuPackageItem, updateHallMenuPackageItemDto);

      return await this.hallMenuPackageItemsRepository.save(
        hallMenuPackageItem
      );
    } catch (error) {
      console.error("Error updating hall menu package item:", error);
      throw error;
    }
  }

  async findHallMenuPackageItemById(
    hallMenuPackageItemId: number
  ): Promise<HallMenuPackageItems | null> {
    const hallMenuPackageItem =
      await this.hallMenuPackageItemsRepository.findOne({
        where: { hallMenuPackageItemId },
      });
    return hallMenuPackageItem || null;
  }

  async deleteHallMenuPackageItem(
    hallMenuPackageItemId: number
  ): Promise<boolean> {
    const hallMenuPackageItem = await this.findHallMenuPackageItemById(
      hallMenuPackageItemId
    );

    if (!hallMenuPackageItem) {
      return false;
    }

    await this.hallMenuPackageItemsRepository.remove(hallMenuPackageItem);
    return true;
  }

  async getAllHallMenuPackageItems(): Promise<HallMenuPackageItems[]> {
    return await this.hallMenuPackageItemsRepository.find();
  }

  async getHallMenuPackageItemWithPackageDetails(
    hallMenuPackageItemId: number
  ): Promise<HallMenuPackageItems | null> {
    const hallMenuPackageItem = await this.findHallMenuPackageItemById(
      hallMenuPackageItemId
    );

    if (!hallMenuPackageItem) {
      return null;
    }

    // Fetch associated hall menu package details
    await hallMenuPackageItem.hallMenuPackage;

    return hallMenuPackageItem;
  }
}
