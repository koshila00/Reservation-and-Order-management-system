import { EntityRepository, Repository } from "typeorm";
import { HallType } from "../entities/HallType";

@EntityRepository(HallType)
export class HallTypeRepository extends Repository<HallType> {}
