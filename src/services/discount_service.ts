import { Repository } from "typeorm";
import { Discount } from "../entities/Discount";
import {
  CreateDiscountDTO,
  UpdateDiscountDTO,
  DiscountDTO,
} from "../dtos/Discount_Dto";
import NotFoundError from "../utills/error/error.classes/NotFoundError";

export class DiscountService {
  private discountRepository: Repository<Discount>;

  constructor(discountRepository: Repository<Discount>) {
    this.discountRepository = discountRepository;
  }

  async createDiscount(
    createDiscountDto: CreateDiscountDTO
  ): Promise<Discount> {
    const newDiscount = new Discount();
    newDiscount.discountName = createDiscountDto.discountName ?? "";
    newDiscount.discountPercentage = createDiscountDto.discountPercentage ?? 0;

    return await this.discountRepository.save(newDiscount);
  }

  async updateDiscount(
    discountId: number,
    updateDiscountDto: UpdateDiscountDTO
  ): Promise<Discount> {
    try {
      const discount = await this.findDiscountById(discountId);

      if (!discount) {
        throw new NotFoundError(`Discount with id ${discountId} not found`);
      }

      Object.assign(discount, updateDiscountDto);

      return await this.discountRepository.save(discount);
    } catch (error) {
      console.error("Error updating discount:", error);
      throw error;
    }
  }

  async findDiscountById(discountId: number): Promise<Discount | null> {
    const discount = await this.discountRepository.findOne({
      where: { discountId },
    });
    return discount || null;
  }

  async deleteDiscount(discountId: number): Promise<boolean> {
    const discount = await this.findDiscountById(discountId);

    if (!discount) {
      return false;
    }

    await this.discountRepository.remove(discount);
    return true;
  }

  async getAllDiscounts(): Promise<DiscountDTO[]> {
    const discounts = await this.discountRepository.find();
    return discounts.map((discount) => ({
      discountId: discount.discountId,
      discountName: discount.discountName,
      discountPercentage: discount.discountPercentage,
    }));
  }
}
