import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HallMenuPackageService } from "../services/hall_menu_package_service";
import {
  CreateHallMenuPackageDTO,
  UpdateHallMenuPackageDTO,
} from "../dtos/Hall_Menu_Package_Dto";
import NotFoundError from "../utills/error/error.classes/NotFoundError";
import BadRequestError from "../utills/error/error.classes/BadRequestError";
import ErrorHandler from "../utills/error/ErrorHandler";
import CustomResponse from "../utills/responce";
import commonService from "../config/storage_config";
import constants from "../utills/constants";

export class HallMenuPackageController {
  private hallMenuPackageService: HallMenuPackageService;

  constructor(hallMenuPackageService: HallMenuPackageService) {
    this.hallMenuPackageService = hallMenuPackageService;
  }

  async createHallMenuPackage(req: Request, res: Response) {
    const body: any = req.body;
    let file: any = req.file;

    try {
      const createHallMenuPackageDto: CreateHallMenuPackageDTO = {
        hallMenuPackageName: body.hallMenuPackageName,
        hallMenuPackagePrice: body.hallMenuPackagePrice,
        hallMenuPackageImage: body.hallMenuPackageImage,
      };

      let uploadedObj: any = null;
      if (file) {
        uploadedObj = await commonService.uploadImageAndGetUri(
          file,
          constants.CLOUDINARY.FILE_NAME + "/Hall_Menu_Package"
        );
      }

      if (uploadedObj != null) {
        createHallMenuPackageDto.hallMenuPackageImage =
          uploadedObj.uri.toString();
      }

      const createdHallMenuPackage =
        await this.hallMenuPackageService.createHallMenuPackage(
          createHallMenuPackageDto
        );

      return CustomResponse(
        res,
        true,
        StatusCodes.CREATED,
        "Hall menu package created successfully!",
        createdHallMenuPackage
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async updateHallMenuPackage(req: Request, res: Response) {
    try {
      const hallMenuPackageId = req.params.hallMenuPackageId;
      const updateHallMenuPackageDto: UpdateHallMenuPackageDTO = req.body;

      const updatedHallMenuPackage =
        await this.hallMenuPackageService.updateHallMenuPackage(
          +hallMenuPackageId,
          updateHallMenuPackageDto
        );

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Hall menu package updated successfully!",
        updatedHallMenuPackage
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async deleteHallMenuPackage(req: Request, res: Response) {
    try {
      const hallMenuPackageId = req.params.hallMenuPackageId;

      const deleted = await this.hallMenuPackageService.deleteHallMenuPackage(
        +hallMenuPackageId
      );

      if (!deleted) {
        throw new NotFoundError(
          `Hall menu package with ID ${hallMenuPackageId} not found`
        );
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Hall menu package deleted successfully!",
        ""
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getAllHallMenuPackages(req: Request, res: Response) {
    try {
      const hallMenuPackages =
        await this.hallMenuPackageService.getAllHallMenuPackages();

      if (!hallMenuPackages || hallMenuPackages.length === 0) {
        throw new NotFoundError("No hall menu packages found!");
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Hall menu packages fetched successfully!",
        hallMenuPackages
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getOneHallMenuPackage(req: Request, res: Response) {
    try {
      const hallMenuPackageId: number = parseInt(
        req.params.hallMenuPackageId,
        10
      );
      const hallMenuPackage =
        await this.hallMenuPackageService.findHallMenuPackageById(
          hallMenuPackageId
        );

      if (!hallMenuPackage) {
        throw new NotFoundError(
          `Hall menu package with ID ${hallMenuPackageId} not found`
        );
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Hall menu package retrieved successfully",
        hallMenuPackage
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }
}
