"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationController = void 0;
const http_status_codes_1 = require("http-status-codes");
const responce_1 = __importDefault(require("../utills/responce"));
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
const ErrorHandler_1 = __importDefault(require("../utills/error/ErrorHandler"));
const email_server_1 = require("../utills/email/email-server");
const email_templates_1 = __importDefault(require("../utills/email/email-templates"));
class QuotationController {
    constructor(quotationService, supplierService) {
        this.quotationService = quotationService;
        this.supplierService = supplierService;
    }
    async createQuotation(req, res) {
        const body = req.body;
        console.log("Type : ", body.type);
        try {
            if (body.type === 1) {
                console.log("running cafe");
                console.log("cafe id", body.cafeInventoryId);
                const createQuotationDto = {
                    qty: body.qty,
                    createdDate: body.createdDate,
                    updatedDate: body.updatedDate,
                    supplierSupplierId: body.supplierId,
                    itemCafeItemId: body.cafeInventoryId,
                };
                const suppliyerId = body.supplierId;
                const createdQuotation = await this.quotationService.createQuotation(createQuotationDto);
                const supplier = await this.supplierService.findSupplierById(suppliyerId);
                const emailDetails = {
                    supplierName: supplier === null || supplier === void 0 ? void 0 : supplier.supplierName,
                    supplierEmail: supplier === null || supplier === void 0 ? void 0 : supplier.supplierEmail,
                    qty: createQuotationDto.qty,
                    item: createQuotationDto.itemCafeItemId,
                };
                const subject = "New Quotation Created";
                const htmlBody = email_templates_1.default.QuotationEmail(emailDetails);
                const supplierEmail = supplier === null || supplier === void 0 ? void 0 : supplier.supplierEmail;
                if (supplierEmail) {
                    await (0, email_server_1.sendEmail)(supplierEmail, subject, htmlBody, null);
                }
                else {
                    throw new Error("Supplier email address is undefined.");
                }
                return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Quotation created successfully!", createdQuotation);
            }
            else if (body.type === 2) {
                console.log("running hall");
                console.log("hall id", body.cafeInventoryId);
                const createQuotationDto = {
                    qty: body.qty,
                    createdDate: body.createdDate,
                    updatedDate: body.updatedDate,
                    supplierSupplierId: body.supplierId,
                    itemHallItemId: body.cafeInventoryId,
                };
                const suppliyerId = body.supplierId;
                const createdQuotation = await this.quotationService.createQuotation(createQuotationDto);
                const supplier = await this.supplierService.findSupplierById(suppliyerId);
                const emailDetails = {
                    supplierName: supplier === null || supplier === void 0 ? void 0 : supplier.supplierName,
                    supplierEmail: supplier === null || supplier === void 0 ? void 0 : supplier.supplierEmail,
                    qty: createQuotationDto.qty,
                    item: createQuotationDto.itemHallItemId,
                };
                const subject = "New Quotation Created";
                const htmlBody = email_templates_1.default.QuotationEmail(emailDetails);
                const supplierEmail = supplier === null || supplier === void 0 ? void 0 : supplier.supplierEmail;
                if (supplierEmail) {
                    await (0, email_server_1.sendEmail)(supplierEmail, subject, htmlBody, null);
                }
                else {
                    throw new Error("Supplier email address is undefined.");
                }
                return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Quotation created successfully!", createdQuotation);
            }
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getQuotations(req, res) {
        try {
            const quotations = await this.quotationService.getAllQuotations();
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Quotations fetched successfully!", quotations);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getQuotationById(req, res) {
        const quotationId = +req.params.id;
        try {
            const quotation = await this.quotationService.findQuotationById(quotationId);
            if (!quotation) {
                throw new NotFoundError_1.default("Quotation not found!");
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Quotation fetched successfully!", quotation);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async updateQuotation(req, res) {
        const quotationId = +req.params.id;
        const updateQuotationDto = req.body;
        try {
            const updatedQuotation = await this.quotationService.updateQuotation(quotationId, updateQuotationDto);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Quotation updated successfully!", updatedQuotation);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async deleteQuotation(req, res) {
        const quotationId = +req.params.id;
        try {
            const deletedQuotation = await this.quotationService.deleteQuotation(quotationId);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Quotation deleted successfully!", deletedQuotation);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
}
exports.QuotationController = QuotationController;
