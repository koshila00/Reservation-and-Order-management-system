"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationService = void 0;
const Quotation_1 = require("../entities/Quotation");
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
class QuotationService {
    constructor(quotationRepository) {
        this.quotationRepository = quotationRepository;
    }
    async createQuotation(createQuotationDto) {
        const newQuotation = new Quotation_1.Quotation();
        newQuotation.qty = createQuotationDto.qty;
        // Ensure supplierSupplierId and itemCafeItemId are not undefined or null before assigning
        if (createQuotationDto.supplierSupplierId !== undefined &&
            createQuotationDto.supplierSupplierId !== null) {
            console.log(createQuotationDto.supplierSupplierId);
            newQuotation.supplierSupplierId = createQuotationDto.supplierSupplierId;
        }
        if (createQuotationDto.itemCafeItemId !== undefined &&
            createQuotationDto.itemCafeItemId !== null) {
            newQuotation.itemCafeItemId = createQuotationDto.itemCafeItemId;
        }
        if (createQuotationDto.itemHallItemId !== undefined &&
            createQuotationDto.itemHallItemId !== null) {
            newQuotation.itemHallItemId = createQuotationDto.itemHallItemId;
        }
        return await this.quotationRepository.save(newQuotation);
    }
    async updateQuotation(quotationId, updateQuotationDto) {
        try {
            const quotation = await this.findQuotationById(quotationId);
            if (!quotation) {
                throw new NotFoundError_1.default(`Quotation with ID ${quotationId} not found`);
            }
            Object.assign(quotation, updateQuotationDto);
            return await this.quotationRepository.save(quotation);
        }
        catch (error) {
            console.error("Error updating quotation:", error);
            throw error;
        }
    }
    async findQuotationById(quotationId) {
        const quotation = await this.quotationRepository.findOneById(quotationId);
        return quotation || null;
    }
    async deleteQuotation(quotationId) {
        const quotation = await this.quotationRepository.findOneById(quotationId);
        if (!quotation) {
            return false;
        }
        await this.quotationRepository.remove(quotation);
        return true;
    }
    async getAllQuotations() {
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
exports.QuotationService = QuotationService;
