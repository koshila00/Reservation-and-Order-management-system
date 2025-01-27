"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cafe_review_controller_1 = require("../controllers/cafe_review_controller");
const constants_1 = __importDefault(require("../utills/constants"));
const cafe_review_service_1 = require("../services/cafe_review_service");
const cafe_review_repository_1 = require("../repositories/cafe_review_repository");
const CafeReview_1 = require("../entities/CafeReview");
const typeorm_1 = require("typeorm");
const user_middleware_1 = __importDefault(require("../middlewares/user_middleware"));
const CafeReviewRouter = (0, express_1.Router)();
const entityManager = (0, typeorm_1.getManager)();
// Create an instance of CafeReviewRepository and pass the EntityManager
const cafeReviewRepository = new cafe_review_repository_1.CafeReviewRepository(CafeReview_1.CafeReview, entityManager);
const cafeReviewService = new cafe_review_service_1.CafeReviewService(cafeReviewRepository);
const cafeReviewController = new cafe_review_controller_1.CafeReviewController(cafeReviewService);
CafeReviewRouter.post("/createCafeReview", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), cafeReviewController.createCafeReview.bind(cafeReviewController));
CafeReviewRouter.put("/updateCafeReview/:cafeReviewId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), cafeReviewController.updateCafeReview.bind(cafeReviewController));
CafeReviewRouter.delete("/deleteCafeReview/:cafeReviewId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), cafeReviewController.deleteCafeReview.bind(cafeReviewController));
CafeReviewRouter.get("/getAllCafeReviews", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), cafeReviewController.getAllCafeReviews.bind(cafeReviewController));
CafeReviewRouter.get("/getOneCafeReview/:cafeReviewId", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), cafeReviewController.getOneCafeReview.bind(cafeReviewController));
CafeReviewRouter.get("/getReviewCount", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.USER,
]), cafeReviewController.getReviewCounts.bind(cafeReviewController));
exports.default = CafeReviewRouter;
