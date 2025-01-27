import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { QuotationService } from "../services/quotation_service";
import { CreateQuotationDTO } from "../dtos/Quotation_Dto";
import CustomResponse from "../utills/responce";
import NotFoundError from "../utills/error/error.classes/NotFoundError";
import BadRequestError from "../utills/error/error.classes/BadRequestError";
import ErrorHandler from "../utills/error/ErrorHandler";
import { sendEmail } from "../utills/email/email-server";
import emailService from "../utills/email/email-templates";
import { SupplierService } from "../services/suppliyer_service";

export class QuotationController {
  private quotationService: QuotationService;
  private supplierService: SupplierService;

  constructor(
    quotationService: QuotationService,
    supplierService: SupplierService
  ) {
    this.quotationService = quotationService;
    this.supplierService = supplierService;
  }

  async createQuotation(req: Request, res: Response) {
    const body: any = req.body;
    console.log("Type : ",body.type)

    try {

      if (body.type === 1) {

        console.log("running cafe")
        console.log("cafe id", body.cafeInventoryId)

        const createQuotationDto: CreateQuotationDTO = {
          qty: body.qty,
          createdDate: body.createdDate,
          updatedDate: body.updatedDate,
          supplierSupplierId: body.supplierId,
          itemCafeItemId: body.cafeInventoryId,
        };

        const suppliyerId = body.supplierId;

        const createdQuotation = await this.quotationService.createQuotation(
          createQuotationDto
        );

        const supplier = await this.supplierService.findSupplierById(suppliyerId);

        const emailDetails = {
          supplierName: supplier?.supplierName,
          supplierEmail: supplier?.supplierEmail,
          qty: createQuotationDto.qty,
          item: createQuotationDto.itemCafeItemId,
        };

        const subject = "New Quotation Created";
        const htmlBody = emailService.QuotationEmail(emailDetails);
        const supplierEmail: string | undefined = supplier?.supplierEmail;

        if (supplierEmail) {
          await sendEmail(supplierEmail, subject, htmlBody, null);
        } else {
          throw new Error("Supplier email address is undefined.");
        }

        return CustomResponse(
          res,
          true,
          StatusCodes.CREATED,
          "Quotation created successfully!",
          createdQuotation
        );

      } else if (body.type === 2){

        console.log("running hall")
        console.log("hall id", body.cafeInventoryId)

        const createQuotationDto: CreateQuotationDTO = {
          qty: body.qty,
          createdDate: body.createdDate,
          updatedDate: body.updatedDate,
          supplierSupplierId: body.supplierId,
          itemHallItemId: body.cafeInventoryId,
        };

        const suppliyerId = body.supplierId;

        const createdQuotation = await this.quotationService.createQuotation(
          createQuotationDto
        );

        const supplier = await this.supplierService.findSupplierById(suppliyerId);

        const emailDetails = {
          supplierName: supplier?.supplierName,
          supplierEmail: supplier?.supplierEmail,
          qty: createQuotationDto.qty,
          item: createQuotationDto.itemHallItemId,
        };

        const subject = "New Quotation Created";
        const htmlBody = emailService.QuotationEmail(emailDetails);
        const supplierEmail: string | undefined = supplier?.supplierEmail;

        if (supplierEmail) {
          await sendEmail(supplierEmail, subject, htmlBody, null);
        } else {
          throw new Error("Supplier email address is undefined.");
        }

        return CustomResponse(
          res,
          true,
          StatusCodes.CREATED,
          "Quotation created successfully!",
          createdQuotation
        );
      }



    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getQuotations(req: Request, res: Response) {
    try {
      const quotations = await this.quotationService.getAllQuotations();

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Quotations fetched successfully!",
        quotations
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async getQuotationById(req: Request, res: Response) {
    const quotationId: number = +req.params.id;

    try {
      const quotation = await this.quotationService.findQuotationById(
        quotationId
      );

      if (!quotation) {
        throw new NotFoundError("Quotation not found!");
      }

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Quotation fetched successfully!",
        quotation
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async updateQuotation(req: Request, res: Response) {
    const quotationId: number = +req.params.id;
    const updateQuotationDto: CreateQuotationDTO = req.body;

    try {
      const updatedQuotation = await this.quotationService.updateQuotation(
        quotationId,
        updateQuotationDto
      );

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Quotation updated successfully!",
        updatedQuotation
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }

  async deleteQuotation(req: Request, res: Response) {
    const quotationId: number = +req.params.id;

    try {
      const deletedQuotation = await this.quotationService.deleteQuotation(
        quotationId
      );

      return CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Quotation deleted successfully!",
        deletedQuotation
      );
    } catch (error) {
      ErrorHandler.handle(res, error);
    }
  }
}
