import { EntityRepository, Repository } from "typeorm";
import { HallBooking } from "../entities/HallBooking";

@EntityRepository(HallBooking)
export class HallBookingRepository extends Repository<HallBooking> {}
