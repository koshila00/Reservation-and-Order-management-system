"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CafeReviewService = void 0;
const CafeReview_1 = require("../entities/CafeReview");
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
class CafeReviewService {
    constructor(cafeReviewRepository) {
        this.cafeReviewRepository = cafeReviewRepository;
    }
    async createCafeReview(createCafeReviewDto) {
        var _a, _b, _c;
        const newCafeReview = new CafeReview_1.CafeReview();
        newCafeReview.userId = (_a = createCafeReviewDto.userId) !== null && _a !== void 0 ? _a : 0;
        newCafeReview.cafeReviewDescription =
            (_b = createCafeReviewDto.cafeReviewDescription) !== null && _b !== void 0 ? _b : "";
        newCafeReview.cafeReviewRate = (_c = createCafeReviewDto.cafeReviewRate) !== null && _c !== void 0 ? _c : 0;
        return await this.cafeReviewRepository.save(newCafeReview);
    }
    async updateCafeReview(cafeReviewId, updateCafeReviewDto) {
        try {
            const cafeReview = await this.findCafeReviewById(cafeReviewId);
            if (!cafeReview) {
                throw new NotFoundError_1.default(`Cafe review with id ${cafeReviewId} not found`);
            }
            Object.assign(cafeReview, updateCafeReviewDto);
            return await this.cafeReviewRepository.save(cafeReview);
        }
        catch (error) {
            console.error("Error updating cafe review:", error);
            throw error;
        }
    }
    async findCafeReviewById(cafeReviewId) {
        const cafeReview = await this.cafeReviewRepository.findOne({
            where: { cafeReviewId },
            relations: ["user"], // Include the user relation
        });
        return cafeReview || null;
    }
    async deleteCafeReview(cafeReviewId) {
        const cafeReview = await this.findCafeReviewById(cafeReviewId);
        if (!cafeReview) {
            return false;
        }
        await this.cafeReviewRepository.remove(cafeReview);
        return true;
    }
    async getAllCafeReviews() {
        const cafeReviews = await this.cafeReviewRepository.find({
            relations: ["user"], // Include the user relation
        });
        return cafeReviews.map((cafeReview) => ({
            cafeReviewId: cafeReview.cafeReviewId,
            userId: cafeReview.user.userId,
            userName: cafeReview.user.userName,
            cafeReviewDescription: cafeReview.cafeReviewDescription,
            cafeReviewRate: cafeReview.cafeReviewRate,
        }));
    }
}
exports.CafeReviewService = CafeReviewService;
