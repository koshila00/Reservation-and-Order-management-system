"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierService = void 0;
const Supplier_1 = require("../entities/Supplier");
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
class SupplierService {
    constructor(supplierRepository) {
        this.supplierRepository = supplierRepository;
    }
    async createSupplier(createSupplierDto) {
        var _a, _b;
        const newSupplier = new Supplier_1.Supplier();
        newSupplier.supplierName = (_a = createSupplierDto.supplierName) !== null && _a !== void 0 ? _a : "";
        newSupplier.supplierEmail = (_b = createSupplierDto.supplierEmail) !== null && _b !== void 0 ? _b : "";
        return await this.supplierRepository.save(newSupplier);
    }
    async updateSupplier(supplierId, updateSupplierDto) {
        try {
            const supplier = await this.findSupplierById(supplierId);
            if (!supplier) {
                throw new NotFoundError_1.default(`Supplier with id ${supplierId} not found`);
            }
            Object.assign(supplier, updateSupplierDto);
            return await this.supplierRepository.save(supplier);
        }
        catch (error) {
            console.error("Error updating supplier:", error);
            throw error;
        }
    }
    async findSupplierById(supplierId) {
        try {
            const supplier = await this.supplierRepository.findOne({
                where: { supplierId: supplierId },
            });
            return supplier;
        }
        catch (error) {
            console.error("Error finding supplier:", error);
            throw error;
        }
    }
    async deleteSupplier(supplierId) {
        const supplier = await this.findSupplierById(supplierId);
        if (!supplier) {
            return false;
        }
        await this.supplierRepository.remove(supplier);
        return true;
    }
    async getAllSuppliers() {
        const suppliers = await this.supplierRepository.find();
        return suppliers.map((supplier) => ({
            supplierId: supplier.supplierId,
            supplierName: supplier.supplierName,
            supplierEmail: supplier.supplierEmail,
        }));
    }
    async getSupplierById(supplierId) {
        const supplier = await this.findSupplierById(supplierId);
        return supplier || null;
    }
}
exports.SupplierService = SupplierService;
