import { Repository } from "typeorm";
import { HallBooking } from "../entities/HallBooking";
import {
  CreateHallBookingDTO,
  UpdateHallBookingDTO,
} from "../dtos/HallBooking_Dto";
import NotFoundError from "../utills/error/error.classes/NotFoundError";

export class HallBookingService {
  private hallBookingRepository: Repository<HallBooking>;

  constructor(hallBookingRepository: Repository<HallBooking>) {
    this.hallBookingRepository = hallBookingRepository;
  }

  async createHallBooking(
    createHallBookingDto: CreateHallBookingDTO
  ): Promise<HallBooking> {
    try {
      const newHallBooking = new HallBooking();
      newHallBooking.hallTypeId = createHallBookingDto.hallTypeId;
      newHallBooking.hallBookingDate = createHallBookingDto.hallBookingDate;
      newHallBooking.hallBookingTotal = createHallBookingDto.hallBookingTotal;
      newHallBooking.hallBookingGuestCount =
        createHallBookingDto.hallBookingGuestCount;
      newHallBooking.hallBookingMenuPackageId =
        createHallBookingDto.hallBookingMenuPackageId;
      newHallBooking.discountId = createHallBookingDto.discountId;

      return await this.hallBookingRepository.save(newHallBooking);
    } catch (error) {
      console.error("Error creating hall booking:", error);
      throw error;
    }
  }

  async findHallBookingById(hallBookingId: number): Promise<HallBooking> {
    const hallBooking = await this.hallBookingRepository.findOne({
      where: { hallBookingId },
      relations: ["hallType", "hallMenuPackage", "discount"],
    });

    if (!hallBooking) {
      throw new NotFoundError(
        `Hall booking with ID ${hallBookingId} not found`
      );
    }

    return hallBooking;
  }

  async updateHallBooking(
    hallBookingId: number,
    updateHallBookingDto: UpdateHallBookingDTO
  ): Promise<HallBooking> {
    const hallBooking = await this.findHallBookingById(hallBookingId);

    hallBooking.hallTypeId =
      updateHallBookingDto.hallTypeId ?? hallBooking.hallTypeId;
    hallBooking.hallBookingDate =
      updateHallBookingDto.hallBookingDate ?? hallBooking.hallBookingDate;
    hallBooking.hallBookingTotal =
      updateHallBookingDto.hallBookingTotal ?? hallBooking.hallBookingTotal;
    hallBooking.hallBookingGuestCount =
      updateHallBookingDto.hallBookingGuestCount ??
      hallBooking.hallBookingGuestCount;
    hallBooking.hallBookingMenuPackageId =
      updateHallBookingDto.hallBookingMenuPackageId ??
      hallBooking.hallBookingMenuPackageId;
    hallBooking.discountId =
      updateHallBookingDto.discountId ?? hallBooking.discountId;

    try {
      return await this.hallBookingRepository.save(hallBooking);
    } catch (error) {
      console.error("Error updating hall booking:", error);
      throw error;
    }
  }

  async deleteHallBookingById(hallBookingId: number): Promise<boolean> {
    const hallBooking = await this.findHallBookingById(hallBookingId);

    try {
      await this.hallBookingRepository.remove(hallBooking);
      return true;
    } catch (error) {
      console.error("Error deleting hall booking:", error);
      throw error;
    }
  }

  async getAllHallBookings(): Promise<HallBooking[]> {
    return await this.hallBookingRepository.find({
      relations: ["hallType", "hallMenuPackage", "discount"],
    });
  }
}
