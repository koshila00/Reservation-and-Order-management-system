export class CreateDiscountDTO {
  discountName?: string;
  discountPercentage?: number;
}

export class UpdateDiscountDTO {
  discountName?: string;
  discountPercentage?: number;
}

export class DiscountDTO {
  discountId?: number;
  discountName?: string;
  discountPercentage?: number;
}
