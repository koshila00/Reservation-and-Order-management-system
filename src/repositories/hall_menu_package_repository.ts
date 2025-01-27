import { EntityRepository, Repository } from "typeorm";
import { HallMenuPackage } from "../entities/HallMenuPackage";

@EntityRepository(HallMenuPackage)
export class HallMenuPackageRepository extends Repository<HallMenuPackage> {
  // You can add custom methods specific to HallMenuPackage if needed
}
