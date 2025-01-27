import { Repository } from "typeorm";
import { HallMenuPackage } from "../entities/HallMenuPackage";
import {
  CreateHallMenuPackageDTO,
  UpdateHallMenuPackageDTO,
  HallMenuPackageDTO,
} from "../dtos/Hall_Menu_Package_Dto";
import NotFoundError from "../utills/error/error.classes/NotFoundError";

export class HallMenuPackageService {
  private hallMenuPackageRepository: Repository<HallMenuPackage>;

  constructor(hallMenuPackageRepository: Repository<HallMenuPackage>) {
    this.hallMenuPackageRepository = hallMenuPackageRepository;
  }

  async createHallMenuPackage(
    createHallMenuPackageDto: CreateHallMenuPackageDTO
  ): Promise<HallMenuPackage> {
    const newHallMenuPackage = new HallMenuPackage();
    newHallMenuPackage.hallMenuPackageName =
      createHallMenuPackageDto.hallMenuPackageName ?? "";
    newHallMenuPackage.hallMenuPackagePrice =
      createHallMenuPackageDto.hallMenuPackagePrice ?? "";
    newHallMenuPackage.hallMenuPackageImage =
      createHallMenuPackageDto.hallMenuPackageImage ?? "";

    return await this.hallMenuPackageRepository.save(newHallMenuPackage);
  }

  async updateHallMenuPackage(
    hallMenuPackageId: number,
    updateHallMenuPackageDto: UpdateHallMenuPackageDTO
  ): Promise<HallMenuPackage> {
    try {
      const hallMenuPackage = await this.findHallMenuPackageById(
        hallMenuPackageId
      );

      if (!hallMenuPackage) {
        throw new NotFoundError(
          `Hall menu package with id ${hallMenuPackageId} not found`
        );
      }

      Object.assign(hallMenuPackage, updateHallMenuPackageDto);

      return await this.hallMenuPackageRepository.save(hallMenuPackage);
    } catch (error) {
      console.error("Error updating hall menu package:", error);
      throw error;
    }
  }

  async findHallMenuPackageById(
    hallMenuPackageId: number
  ): Promise<HallMenuPackage | null> {
    const hallMenuPackage = await this.hallMenuPackageRepository.findOne({
      where: { hallMenuPackageId },
    });
    return hallMenuPackage || null;
  }

  async deleteHallMenuPackage(hallMenuPackageId: number): Promise<boolean> {
    const hallMenuPackage = await this.findHallMenuPackageById(
      hallMenuPackageId
    );

    if (!hallMenuPackage) {
      return false;
    }

    await this.hallMenuPackageRepository.remove(hallMenuPackage);
    return true;
  }

  async getAllHallMenuPackages(): Promise<HallMenuPackageDTO[]> {
    const hallMenuPackages = await this.hallMenuPackageRepository.find();
    return hallMenuPackages.map((hallMenuPackage) => ({
      hallMenuPackageId: hallMenuPackage.hallMenuPackageId,
      hallMenuPackageName: hallMenuPackage.hallMenuPackageName,
      hallMenuPackagePrice: hallMenuPackage.hallMenuPackagePrice,
      hallMenuPackageImage: hallMenuPackage.hallMenuPackageImage,
    }));
  }
}
