export class CreateCafeOrderDTO {
  userId?: number;
  cafeOrderTotal?: number;
  cafeOrderDeliveryStatus?: string;
  cafeOrderType?: string;
  discountId?: number | null;
}

export class UpdateCafeOrderDTO {
  userId?: number;
  cafeOrderTotal?: number;
  cafeOrderDeliveryStatus?: string;
  cafeOrderType?: string;
  discountId?: number | null;
}

export class CafeOrderDTO {
  cafeOrderId?: number;
  userId?: number;
  cafeOrderTotal?: number;
  createdDate?: Date;
  updatedDate?: Date;
  cafeOrderDeliveryStatus?: string;
  cafeOrderType?: string;
  discountId?: number | null;
}
