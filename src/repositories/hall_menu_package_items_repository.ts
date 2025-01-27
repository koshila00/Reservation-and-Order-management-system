import { EntityRepository, Repository } from "typeorm";
import { HallMenuPackageItems } from "../entities/HallMenuPackageItems";

@EntityRepository(HallMenuPackageItems)
export class HallMenuPackageItemsRepository extends Repository<HallMenuPackageItems> {}
