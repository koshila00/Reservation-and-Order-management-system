import { Repository } from "typeorm";
import { CafeReview } from "../entities/CafeReview";
import {
  CreateCafeReviewDTO,
  UpdateCafeReviewDTO,
  CafeReviewDTO,
} from "../dtos/Cafe_Review_Dto";
import NotFoundError from "../utills/error/error.classes/NotFoundError";

export class CafeReviewService {
  private cafeReviewRepository: Repository<CafeReview>;

  constructor(cafeReviewRepository: Repository<CafeReview>) {
    this.cafeReviewRepository = cafeReviewRepository;
  }

  async createCafeReview(
    createCafeReviewDto: CreateCafeReviewDTO
  ): Promise<CafeReview> {
    const newCafeReview = new CafeReview();
    newCafeReview.userId = createCafeReviewDto.userId ?? 0;
    newCafeReview.cafeReviewDescription =
      createCafeReviewDto.cafeReviewDescription ?? "";
    newCafeReview.cafeReviewRate = createCafeReviewDto.cafeReviewRate ?? 0;

    return await this.cafeReviewRepository.save(newCafeReview);
  }

  async updateCafeReview(
    cafeReviewId: number,
    updateCafeReviewDto: UpdateCafeReviewDTO
  ): Promise<CafeReview> {
    try {
      const cafeReview = await this.findCafeReviewById(cafeReviewId);

      if (!cafeReview) {
        throw new NotFoundError(
          `Cafe review with id ${cafeReviewId} not found`
        );
      }

      Object.assign(cafeReview, updateCafeReviewDto);

      return await this.cafeReviewRepository.save(cafeReview);
    } catch (error) {
      console.error("Error updating cafe review:", error);
      throw error;
    }
  }

  async findCafeReviewById(cafeReviewId: number): Promise<CafeReview | null> {
    const cafeReview = await this.cafeReviewRepository.findOne({
      where: { cafeReviewId },
      relations: ["user"], // Include the user relation
    });
    return cafeReview || null;
  }

  async deleteCafeReview(cafeReviewId: number): Promise<boolean> {
    const cafeReview = await this.findCafeReviewById(cafeReviewId);

    if (!cafeReview) {
      return false;
    }

    await this.cafeReviewRepository.remove(cafeReview);
    return true;
  }

  async getAllCafeReviews(): Promise<CafeReviewDTO[]> {
    const cafeReviews = await this.cafeReviewRepository.find({
      relations: ["user"], // Include the user relation
    });

    return cafeReviews.map((cafeReview) => ({
      cafeReviewId: cafeReview.cafeReviewId,
      userId: cafeReview.user.userId,
      userName: cafeReview.user.userName,
      cafeReviewDescription: cafeReview.cafeReviewDescription,
      cafeReviewRate: cafeReview.cafeReviewRate,
    }));
  }
}
