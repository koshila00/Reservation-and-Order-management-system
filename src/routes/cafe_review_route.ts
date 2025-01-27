import { Router } from "express";
import { CafeReviewController } from "../controllers/cafe_review_controller";
import constants from "../utills/constants";
import { CafeReviewService } from "../services/cafe_review_service";
import { CafeReviewRepository } from "../repositories/cafe_review_repository";
import { CafeReview } from "../entities/CafeReview";
import { getManager } from "typeorm";
import user_middleware from "../middlewares/user_middleware";

const CafeReviewRouter = Router();

const entityManager = getManager();

// Create an instance of CafeReviewRepository and pass the EntityManager
const cafeReviewRepository = new CafeReviewRepository(
  CafeReview,
  entityManager
);

const cafeReviewService = new CafeReviewService(cafeReviewRepository);

const cafeReviewController = new CafeReviewController(cafeReviewService);

CafeReviewRouter.post(
  "/createCafeReview",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  cafeReviewController.createCafeReview.bind(cafeReviewController)
);

CafeReviewRouter.put(
  "/updateCafeReview/:cafeReviewId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  cafeReviewController.updateCafeReview.bind(cafeReviewController)
);

CafeReviewRouter.delete(
  "/deleteCafeReview/:cafeReviewId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  cafeReviewController.deleteCafeReview.bind(cafeReviewController)
);

CafeReviewRouter.get(
  "/getAllCafeReviews",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  cafeReviewController.getAllCafeReviews.bind(cafeReviewController)
);

CafeReviewRouter.get(
  "/getOneCafeReview/:cafeReviewId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  cafeReviewController.getOneCafeReview.bind(cafeReviewController)
);

CafeReviewRouter.get(
  "/getReviewCount",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  cafeReviewController.getReviewCounts.bind(cafeReviewController)
);

export default CafeReviewRouter;
