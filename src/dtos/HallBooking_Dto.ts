export class CreateHallBookingDTO {
  hallTypeId!: number;
  hallBookingDate!: Date;
  hallBookingTotal!: number;
  hallBookingGuestCount!: number;
  hallBookingMenuPackageId?: number;
  discountId?: number;
}

export class UpdateHallBookingDTO {
  hallTypeId?: number;
  hallBookingDate?: Date;
  hallBookingTotal?: number;
  hallBookingGuestCount?: number;
  hallBookingMenuPackageId?: number;
  discountId?: number;
}
