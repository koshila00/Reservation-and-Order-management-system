"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HallBookingService = void 0;
const HallBooking_1 = require("../entities/HallBooking");
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
class HallBookingService {
    constructor(hallBookingRepository) {
        this.hallBookingRepository = hallBookingRepository;
    }
    async createHallBooking(createHallBookingDto) {
        try {
            const newHallBooking = new HallBooking_1.HallBooking();
            newHallBooking.hallTypeId = createHallBookingDto.hallTypeId;
            newHallBooking.hallBookingDate = createHallBookingDto.hallBookingDate;
            newHallBooking.hallBookingTotal = createHallBookingDto.hallBookingTotal;
            newHallBooking.hallBookingGuestCount =
                createHallBookingDto.hallBookingGuestCount;
            newHallBooking.hallBookingMenuPackageId =
                createHallBookingDto.hallBookingMenuPackageId;
            newHallBooking.discountId = createHallBookingDto.discountId;
            return await this.hallBookingRepository.save(newHallBooking);
        }
        catch (error) {
            console.error("Error creating hall booking:", error);
            throw error;
        }
    }
    async findHallBookingById(hallBookingId) {
        const hallBooking = await this.hallBookingRepository.findOne({
            where: { hallBookingId },
            relations: ["hallType", "hallMenuPackage", "discount"],
        });
        if (!hallBooking) {
            throw new NotFoundError_1.default(`Hall booking with ID ${hallBookingId} not found`);
        }
        return hallBooking;
    }
    async updateHallBooking(hallBookingId, updateHallBookingDto) {
        var _a, _b, _c, _d, _e, _f;
        const hallBooking = await this.findHallBookingById(hallBookingId);
        hallBooking.hallTypeId =
            (_a = updateHallBookingDto.hallTypeId) !== null && _a !== void 0 ? _a : hallBooking.hallTypeId;
        hallBooking.hallBookingDate =
            (_b = updateHallBookingDto.hallBookingDate) !== null && _b !== void 0 ? _b : hallBooking.hallBookingDate;
        hallBooking.hallBookingTotal =
            (_c = updateHallBookingDto.hallBookingTotal) !== null && _c !== void 0 ? _c : hallBooking.hallBookingTotal;
        hallBooking.hallBookingGuestCount =
            (_d = updateHallBookingDto.hallBookingGuestCount) !== null && _d !== void 0 ? _d : hallBooking.hallBookingGuestCount;
        hallBooking.hallBookingMenuPackageId =
            (_e = updateHallBookingDto.hallBookingMenuPackageId) !== null && _e !== void 0 ? _e : hallBooking.hallBookingMenuPackageId;
        hallBooking.discountId =
            (_f = updateHallBookingDto.discountId) !== null && _f !== void 0 ? _f : hallBooking.discountId;
        try {
            return await this.hallBookingRepository.save(hallBooking);
        }
        catch (error) {
            console.error("Error updating hall booking:", error);
            throw error;
        }
    }
    async deleteHallBookingById(hallBookingId) {
        const hallBooking = await this.findHallBookingById(hallBookingId);
        try {
            await this.hallBookingRepository.remove(hallBooking);
            return true;
        }
        catch (error) {
            console.error("Error deleting hall booking:", error);
            throw error;
        }
    }
    async getAllHallBookings() {
        return await this.hallBookingRepository.find({
            relations: ["hallType", "hallMenuPackage", "discount"],
        });
    }
}
exports.HallBookingService = HallBookingService;
