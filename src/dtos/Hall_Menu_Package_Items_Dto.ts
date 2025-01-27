export class CreateHallMenuPackageItemDTO {
  hallMenuPackageItemName!: string;
  hallMenuPackageId!: number;
  createdDate?: Date;
  updatedDate?: Date;
}

export class UpdateHallMenuPackageItemDTO {
  hallMenuPackageItemName?: string;
  hallMenuPackageId?: number;
  createdDate?: Date;
  updatedDate?: Date;
}

export class HallMenuPackageItemDTO {
  hallMenuPackageItemId?: number;
  hallMenuPackageItemName?: string;
  hallMenuPackageId?: number;
  createdDate?: Date;
  updatedDate?: Date;
}
