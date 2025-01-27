export class CreateQuotationDTO {
  qty!: number;
  createdDate?: Date;
  updatedDate?: Date;
  supplierSupplierId?: number | null;
  itemCafeItemId?: number | null;
  itemHallItemId?: number | null;
}

export class UpdateQuotationDTO {
  qty?: number;
  createdDate?: Date;
  updatedDate?: Date;
  supplierSupplierId?: number | null;
  itemCafeItemId?: number | null;
}

export class QuotationDTO {
  quotationId?: number;
  qty!: number;
  createdDate!: Date;
  updatedDate!: Date;
  supplierSupplierId?: number | null;
  itemCafeItemId?: number | null;
  itemHallItemId?: number | null;
  
}
