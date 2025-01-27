import { Repository } from "typeorm";
import { CafeOrder } from "../entities/CafeOrder";
import {
  CreateCafeOrderDTO,
  UpdateCafeOrderDTO,
  CafeOrderDTO,
} from "../dtos/Cafe_Order_Dto";
import NotFoundError from "../utills/error/error.classes/NotFoundError";

export class CafeOrderService {
  private cafeOrderRepository: Repository<CafeOrder>;

  constructor(cafeOrderRepository: Repository<CafeOrder>) {
    this.cafeOrderRepository = cafeOrderRepository;
  }

  async createCafeOrder(
    createCafeOrderDto: CreateCafeOrderDTO
  ): Promise<CafeOrder> {
    const newCafeOrder = new CafeOrder();
    newCafeOrder.userId = createCafeOrderDto.userId ?? 0;
    newCafeOrder.cafeOrderTotal = createCafeOrderDto.cafeOrderTotal ?? 0;
    newCafeOrder.cafeOrderDeliveryStatus =
      createCafeOrderDto.cafeOrderDeliveryStatus ?? "";
    newCafeOrder.cafeOrderType = createCafeOrderDto.cafeOrderType ?? "";
    newCafeOrder.discountId = createCafeOrderDto.discountId ?? 0;

    return await this.cafeOrderRepository.save(newCafeOrder);
  }

  async updateCafeOrder(
    cafeOrderId: number,
    updateCafeOrderDto: UpdateCafeOrderDTO
  ): Promise<CafeOrder> {
    try {
      const cafeOrder = await this.findCafeOrderById(cafeOrderId);

      if (!cafeOrder) {
        throw new NotFoundError(`Cafe order with id ${cafeOrderId} not found`);
      }

      Object.assign(cafeOrder, updateCafeOrderDto);

      return await this.cafeOrderRepository.save(cafeOrder);
    } catch (error) {
      console.error("Error updating cafe order:", error);
      throw error;
    }
  }

  async findCafeOrderById(cafeOrderId: number): Promise<CafeOrder | null> {
    const cafeOrder = await this.cafeOrderRepository.findOne({
      where: { cafeOrderId },
      relations: ["user", "discount"],
    });
    return cafeOrder || null;
  }

  async deleteCafeOrder(cafeOrderId: number): Promise<boolean> {
    const cafeOrder = await this.findCafeOrderById(cafeOrderId);

    if (!cafeOrder) {
      return false;
    }

    await this.cafeOrderRepository.remove(cafeOrder);
    return true;
  }

  async getAllCafeOrders(): Promise<CafeOrderDTO[]> {
    const cafeOrders = await this.cafeOrderRepository.find({
      relations: ["user", "discount"], // Include the user and discount relations
    });

    return cafeOrders.map((cafeOrder) => ({
      cafeOrderId: cafeOrder.cafeOrderId,
      user: {
        userId: cafeOrder.user.userId,
        userName: cafeOrder.user.userName,
        // Include other user details as needed
      },
      cafeOrderTotal: cafeOrder.cafeOrderTotal,
      createdDate: cafeOrder.createdDate,
      updatedDate: cafeOrder.updatedDate,
      cafeOrderDeliveryStatus: cafeOrder.cafeOrderDeliveryStatus,
      cafeOrderType: cafeOrder.cafeOrderType,
      discount: cafeOrder.discount
        ? {
            discountId: cafeOrder.discount.discountId,
            discountName: cafeOrder.discount.discountName,
            // Include other discount details as needed
          }
        : null,
    }));
  }
}
