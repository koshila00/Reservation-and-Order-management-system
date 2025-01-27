export class CreateCafeOrderItemDTO {
  cafeOrderId?: number;
  cafeItemId?: number;
  cafeOrderItemQty?: number;
}

export class UpdateCafeOrderItemDTO {
  cafeOrderId?: number;
  cafeItemId?: number;
  cafeOrderItemQty?: number;
}

export class CafeOrderItemDTO {
  cafeOrderItemId?: number;
  cafeOrderId?: number;
  cafeItemId?: number;
  createdDate?: Date;
  updatedDate?: Date;
  cafeOrderItemQty?: number;
}
