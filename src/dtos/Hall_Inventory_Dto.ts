export class CreateHallInventoryItemDTO {
  hallInventoryItemName?: string;
  hallInventoryItemPrice?: number;
  hallInventoryItemQty?: number;
  hallInventoryItemDescription?: string | null;
}

export class UpdateHallInventoryItemDTO {
  hallInventoryItemName?: string;
  hallInventoryItemPrice?: number;
  hallInventoryItemQty?: number;
  hallInventoryItemDescription?: string | null;
}

export class HallInventoryItemDTO {
  hallInventoryItemId?: number;
  hallInventoryItemName?: string;
  hallInventoryItemPrice?: number;
  hallInventoryItemQty?: number;
  hallInventoryItemDescription?: string | null;
}
