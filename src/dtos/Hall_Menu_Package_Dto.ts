export class CreateHallMenuPackageDTO {
  hallMenuPackageName?: string;
  hallMenuPackagePrice?: string;
  hallMenuPackageImage?: string | null;
}

export class UpdateHallMenuPackageDTO {
  hallMenuPackageName?: string;
  hallMenuPackagePrice?: string;
  hallMenuPackageImage?: string | null;
}

export class HallMenuPackageDTO {
  hallMenuPackageId?: number;
  hallMenuPackageName?: string;
  hallMenuPackagePrice?: string;
  hallMenuPackageImage?: string | null;
}
