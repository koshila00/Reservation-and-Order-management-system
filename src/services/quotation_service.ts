import { Repository } from "typeorm";
import { Quotation } from "../entities/Quotation";
import {
  CreateQuotationDTO,
  UpdateQuotationDTO,
  QuotationDTO,
} from "../dtos/Quotation_Dto";
import NotFoundError from "../utills/error/error.classes/NotFoundError";

export class QuotationService {
  private quotationRepository: Repository<Quotation>;

  constructor(quotationRepository: Repository<Quotation>) {
    this.quotationRepository = quotationRepository;
  }

  async createQuotation(
    createQuotationDto: CreateQuotationDTO
  ): Promise<Quotation> {
    const newQuotation = new Quotation();
    newQuotation.qty = createQuotationDto.qty;

    // Ensure supplierSupplierId and itemCafeItemId are not undefined or null before assigning
    if (
      createQuotationDto.supplierSupplierId !== undefined &&
      createQuotationDto.supplierSupplierId !== null
    ) {
      console.log(createQuotationDto.supplierSupplierId);
      newQuotation.supplierSupplierId = createQuotationDto.supplierSupplierId;
    }
    if (
      createQuotationDto.itemCafeItemId !== undefined &&
      createQuotationDto.itemCafeItemId !== null
    ) {
      newQuotation.itemCafeItemId = createQuotationDto.itemCafeItemId;
    }
    if (
      createQuotationDto.itemHallItemId !== undefined &&
      createQuotationDto.itemHallItemId !== null
    ) {
      newQuotation.itemHallItemId = createQuotationDto.itemHallItemId;
    }
    

    return await this.quotationRepository.save(newQuotation);
  }

  async updateQuotation(
    quotationId: number,
    updateQuotationDto: UpdateQuotationDTO
  ): Promise<Quotation> {
    try {
      const quotation = await this.findQuotationById(quotationId);

      if (!quotation) {
        throw new NotFoundError(`Quotation with ID ${quotationId} not found`);
      }

      Object.assign(quotation, updateQuotationDto);

      return await this.quotationRepository.save(quotation);
    } catch (error) {
      console.error("Error updating quotation:", error);
      throw error;
    }
  }

  async findQuotationById(quotationId: number): Promise<Quotation | null> {
    const quotation = await this.quotationRepository.findOneById(quotationId);
    return quotation || null;
  }

  async deleteQuotation(quotationId: number): Promise<boolean> {
    const quotation = await this.quotationRepository.findOneById(quotationId);

    if (!quotation) {
      return false;
    }

    await this.quotationRepository.remove(quotation);
    return true;
  }

  async getAllQuotations(): Promise<QuotationDTO[]> {
    const quotations = await this.quotationRepository.find();
    return quotations.map((quotation) => ({
      quotationId: quotation.quotationId,
      qty: quotation.qty,
      createdDate: quotation.createdDate,
      updatedDate: quotation.updatedDate,
      supplier: quotation.supplier,
      cafeinventory: quotation.cafeinventory,
    }));
  }
}
