export class CreateCafeReviewDTO {
  userId?: number;
  cafeReviewDescription?: string;
  cafeReviewRate?: number;
}

export class UpdateCafeReviewDTO {
  cafeReviewDescription?: string;
  cafeReviewRate?: number;
}

export class CafeReviewDTO {
  cafeReviewId?: number;
  userId?: number;
  cafeReviewDescription?: string;
  cafeReviewRate?: number;
}
