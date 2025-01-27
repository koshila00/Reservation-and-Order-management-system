import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CafeReviewService } from "../services/cafe_review_service";
import {
  CreateCafeReviewDTO,
  UpdateCafeReviewDTO,
} from "../dtos/Cafe_Review_Dto";
import NotFoundError from "../utills/error/error.classes/NotFoundError";
import ErrorHandler from "../utills/error/ErrorHandler";
import CustomResponse from "../utills/responce";

export class CafeReviewController {
  private cafeReviewService: CafeReviewService;

  constructor(cafeReviewService: CafeReviewService) {
    this.cafeReviewService = cafeReviewService;
  }

  async createCafeReview(req: Request, res: Response) {
    try {
      const body: any = req.body;
      const auth: any = req.auth;
      const createCafeReviewDto: CreateCafeReviewDTO = {
        userId: auth.id,
        cafeReviewDescription: body.cafeReviewDescription,
        cafeReviewRate: body.cafeReviewRate,
      };

      const createdCafeReview = await this.cafeReviewService.createCafeReview(
        createCafeReviewDto
      );

      return CustomResponse(
        res,
        true,
        StatusCodes.CREATED,
        "Cafe review created successfully!",
        createdCafeReview
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async updateCafeReview(req: Request, res: Response) {
    try {
      const cafeReviewId = req.params.cafeReviewId;
      const updateCafeReviewDto: UpdateCafeReviewDTO = req.body;

      const updatedCafeReview = await this.cafeReviewService.updateCafeReview(
        +cafeReviewId,
        updateCafeReviewDto
      );

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Cafe review updated successfully!",
        updatedCafeReview
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async deleteCafeReview(req: Request, res: Response) {
    try {
      const cafeReviewId = req.params.cafeReviewId;

      const deleted = await this.cafeReviewService.deleteCafeReview(
        +cafeReviewId
      );

      if (!deleted) {
        throw new NotFoundError(
          `Cafe review with ID ${cafeReviewId} not found`
        );
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Cafe review deleted successfully!",
        ""
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getAllCafeReviews(req: Request, res: Response) {
    try {
      const cafeReviews = await this.cafeReviewService.getAllCafeReviews();

      if (!cafeReviews || cafeReviews.length === 0) {
        throw new NotFoundError("No cafe reviews found!");
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Cafe reviews fetched successfully!",
        cafeReviews
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getOneCafeReview(req: Request, res: Response) {
    try {
      const cafeReviewId: number = parseInt(req.params.cafeReviewId, 10);
      const cafeReview = await this.cafeReviewService.findCafeReviewById(
        cafeReviewId
      );

      if (!cafeReview) {
        throw new NotFoundError(
          `Cafe review with ID ${cafeReviewId} not found`
        );
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Cafe review retrieved successfully",
        cafeReview
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getReviewCounts(req: Request, res: Response) {
    try {
      const cafeReviews = await this.cafeReviewService.getAllCafeReviews();

      if (!cafeReviews || cafeReviews.length === 0) {
        throw new NotFoundError("No cafe reviews found!");
      }

      // Initialize counts for each star rating
      const starCounts: any = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      };

      // Count the reviews for each star rating
      cafeReviews.forEach((review: any) => {
        if (review.cafeReviewRate >= 1 && review.cafeReviewRate <= 5) {
          starCounts[review.cafeReviewRate]++;
        }
      });

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Cafe reviews fetched successfully!",
        {
          reviews: cafeReviews,
          starCounts: starCounts,
        }
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }
}
