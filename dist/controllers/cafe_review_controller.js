"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CafeReviewController = void 0;
const http_status_codes_1 = require("http-status-codes");
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
const ErrorHandler_1 = __importDefault(require("../utills/error/ErrorHandler"));
const responce_1 = __importDefault(require("../utills/responce"));
class CafeReviewController {
    constructor(cafeReviewService) {
        this.cafeReviewService = cafeReviewService;
    }
    async createCafeReview(req, res) {
        try {
            const body = req.body;
            const auth = req.auth;
            const createCafeReviewDto = {
                userId: auth.id,
                cafeReviewDescription: body.cafeReviewDescription,
                cafeReviewRate: body.cafeReviewRate,
            };
            const createdCafeReview = await this.cafeReviewService.createCafeReview(createCafeReviewDto);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Cafe review created successfully!", createdCafeReview);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async updateCafeReview(req, res) {
        try {
            const cafeReviewId = req.params.cafeReviewId;
            const updateCafeReviewDto = req.body;
            const updatedCafeReview = await this.cafeReviewService.updateCafeReview(+cafeReviewId, updateCafeReviewDto);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Cafe review updated successfully!", updatedCafeReview);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async deleteCafeReview(req, res) {
        try {
            const cafeReviewId = req.params.cafeReviewId;
            const deleted = await this.cafeReviewService.deleteCafeReview(+cafeReviewId);
            if (!deleted) {
                throw new NotFoundError_1.default(`Cafe review with ID ${cafeReviewId} not found`);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Cafe review deleted successfully!", "");
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getAllCafeReviews(req, res) {
        try {
            const cafeReviews = await this.cafeReviewService.getAllCafeReviews();
            if (!cafeReviews || cafeReviews.length === 0) {
                throw new NotFoundError_1.default("No cafe reviews found!");
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Cafe reviews fetched successfully!", cafeReviews);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getOneCafeReview(req, res) {
        try {
            const cafeReviewId = parseInt(req.params.cafeReviewId, 10);
            const cafeReview = await this.cafeReviewService.findCafeReviewById(cafeReviewId);
            if (!cafeReview) {
                throw new NotFoundError_1.default(`Cafe review with ID ${cafeReviewId} not found`);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Cafe review retrieved successfully", cafeReview);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getReviewCounts(req, res) {
        try {
            const cafeReviews = await this.cafeReviewService.getAllCafeReviews();
            if (!cafeReviews || cafeReviews.length === 0) {
                throw new NotFoundError_1.default("No cafe reviews found!");
            }
            // Initialize counts for each star rating
            const starCounts = {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
            };
            // Count the reviews for each star rating
            cafeReviews.forEach((review) => {
                if (review.cafeReviewRate >= 1 && review.cafeReviewRate <= 5) {
                    starCounts[review.cafeReviewRate]++;
                }
            });
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Cafe reviews fetched successfully!", {
                reviews: cafeReviews,
                starCounts: starCounts,
            });
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
}
exports.CafeReviewController = CafeReviewController;
