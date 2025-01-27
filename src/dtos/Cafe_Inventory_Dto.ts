export class CreateCafeItemDTO {
  cafeItemName?: string;
  cafeItemPrice?: number;
  cafeItemQty?: number;
  cafeItemDescription?: string | null;
  cafeItemImage?: string | null;
}

export class UpdateCafeItemDTO {
  cafeItemName?: string;
  cafeItemPrice?: number;
  cafeItemQty?: number;
  cafeItemDescription?: string | null;
  cafeItemImage?: string | null;
}

export class CafeInventoryDTO {
  cafeItemId?: number;
  cafeItemName?: string;
  cafeItemPrice?: number;
  cafeItemQty?: number;
  cafeItemDescription?: string | null;
  cafeItemImage?: string | null;
}
