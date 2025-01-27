"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierController = void 0;
const http_status_codes_1 = require("http-status-codes");
const responce_1 = __importDefault(require("../utills/responce"));
const ErrorHandler_1 = __importDefault(require("../utills/error/ErrorHandler"));
class SupplierController {
    constructor(supplierService) {
        this.supplierService = supplierService;
    }
    async createSupplier(req, res) {
        try {
            const createSupplierDto = req.body;
            const createdSupplier = await this.supplierService.createSupplier(createSupplierDto);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Supplier created successfully!", createdSupplier);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async updateSupplier(req, res) {
        try {
            const supplierId = parseInt(req.params.supplierId, 10);
            const updateSupplierDto = req.body;
            const updatedSupplier = await this.supplierService.updateSupplier(supplierId, updateSupplierDto);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Supplier updated successfully!", updatedSupplier);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async deleteSupplier(req, res) {
        try {
            const supplierId = parseInt(req.params.supplierId, 10);
            const deleted = await this.supplierService.deleteSupplier(supplierId);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, deleted
                ? "Supplier deleted successfully!"
                : "Supplier not found for deletion", "");
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getAllSuppliers(req, res) {
        try {
            const suppliers = await this.supplierService.getAllSuppliers();
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "All suppliers retrieved successfully", suppliers);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getOneSupplier(req, res) {
        try {
            const supplierId = parseInt(req.params.supplierId, 10);
            const supplier = await this.supplierService.getSupplierById(supplierId);
            if (!supplier) {
                return (0, responce_1.default)(res, false, http_status_codes_1.StatusCodes.NOT_FOUND, `Supplier with id ${supplierId} not found`, null);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Supplier retrieved successfully", supplier);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
}
exports.SupplierController = SupplierController;
