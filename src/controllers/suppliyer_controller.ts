import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SupplierService } from "../services/suppliyer_service";
import CustomResponse from "../utills/responce";
import ErrorHandler from "../utills/error/ErrorHandler";
import { CreateSupplierDTO, UpdateSupplierDTO } from "../dtos/Supplier_Dto";

export class SupplierController {
  private supplierService: SupplierService;

  constructor(supplierService: SupplierService) {
    this.supplierService = supplierService;
  }

  async createSupplier(req: Request, res: Response) {
    try {
      const createSupplierDto: CreateSupplierDTO = req.body;
      const createdSupplier = await this.supplierService.createSupplier(
        createSupplierDto
      );
      return CustomResponse(
        res,
        true,
        StatusCodes.CREATED,
        "Supplier created successfully!",
        createdSupplier
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async updateSupplier(req: Request, res: Response) {
    try {
      const supplierId: number = parseInt(req.params.supplierId, 10);
      const updateSupplierDto: UpdateSupplierDTO = req.body;
      const updatedSupplier = await this.supplierService.updateSupplier(
        supplierId,
        updateSupplierDto
      );
      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Supplier updated successfully!",
        updatedSupplier
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async deleteSupplier(req: Request, res: Response) {
    try {
      const supplierId: number = parseInt(req.params.supplierId, 10);
      const deleted = await this.supplierService.deleteSupplier(supplierId);
      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        deleted
          ? "Supplier deleted successfully!"
          : "Supplier not found for deletion",
        ""
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getAllSuppliers(req: Request, res: Response) {
    try {
      const suppliers = await this.supplierService.getAllSuppliers();
      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "All suppliers retrieved successfully",
        suppliers
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getOneSupplier(req: Request, res: Response) {
    try {
      const supplierId: number = parseInt(req.params.supplierId, 10);
      const supplier = await this.supplierService.getSupplierById(supplierId);
      if (!supplier) {
        return CustomResponse(
          res,
          false,
          StatusCodes.NOT_FOUND,
          `Supplier with id ${supplierId} not found`,
          null
        );
      }
      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Supplier retrieved successfully",
        supplier
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }
}
