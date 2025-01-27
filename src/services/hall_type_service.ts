import { Repository } from "typeorm";
import { HallType } from "../entities/HallType";
import {
  CreateHallTypeDTO,
  UpdateHallTypeDTO,
  HallTypeDTO,
} from "../dtos/Hall_Type_Dto";
import NotFoundError from "../utills/error/error.classes/NotFoundError";

export class HallTypeService {
  private hallTypeRepository: Repository<HallType>;

  constructor(hallTypeRepository: Repository<HallType>) {
    this.hallTypeRepository = hallTypeRepository;
  }

  async createHallType(
    createHallTypeDto: CreateHallTypeDTO
  ): Promise<HallType> {
    const newHallType = new HallType();
    newHallType.hallTypeName = createHallTypeDto.hallTypeName ?? "";
    newHallType.hallTypeCapacity = createHallTypeDto.hallTypeCapacity ?? 0;
    newHallType.hallTypePrice = createHallTypeDto.hallTypePrice ?? 0;

    return await this.hallTypeRepository.save(newHallType);
  }

  async updateHallType(
    hallTypeId: number,
    updateHallTypeDto: UpdateHallTypeDTO
  ): Promise<HallType> {
    try {
      const hallType = await this.findHallTypeById(hallTypeId);

      if (!hallType) {
        throw new NotFoundError(`Hall type with id ${hallTypeId} not found`);
      }

      Object.assign(hallType, updateHallTypeDto);

      return await this.hallTypeRepository.save(hallType);
    } catch (error) {
      console.error("Error updating hall type:", error);
      throw error;
    }
  }

  async findHallTypeById(hallTypeId: number): Promise<HallType | null> {
    const hallType = await this.hallTypeRepository.findOne({
      where: { hallTypeId },
    });
    return hallType || null;
  }

  async deleteHallType(hallTypeId: number): Promise<boolean> {
    const hallType = await this.findHallTypeById(hallTypeId);

    if (!hallType) {
      return false;
    }

    await this.hallTypeRepository.remove(hallType);
    return true;
  }

  async getAllHallTypes(): Promise<HallTypeDTO[]> {
    const hallTypes = await this.hallTypeRepository.find();

    return hallTypes.map((hallType) => ({
      hallTypeId: hallType.hallTypeId,
      hallTypeName: hallType.hallTypeName,
      hallTypeCapacity: hallType.hallTypeCapacity,
      hallTypePrice: hallType.hallTypePrice,
      createdDate: hallType.createdDate,
      updatedDate: hallType.updatedDate,
    }));
  }

  async getHallTypeById(hallTypeId: number): Promise<HallType | null> {
    const hallType = await this.findHallTypeById(hallTypeId);
    return hallType || null;
  }
}
