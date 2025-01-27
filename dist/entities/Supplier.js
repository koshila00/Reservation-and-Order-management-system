"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplier = void 0;
const typeorm_1 = require("typeorm");
const Quotation_1 = require("./Quotation");
let Supplier = class Supplier {
};
exports.Supplier = Supplier;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "supplier_id" }),
    __metadata("design:type", Number)
], Supplier.prototype, "supplierId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "supplier_name" }),
    __metadata("design:type", String)
], Supplier.prototype, "supplierName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "supplier_email" }),
    __metadata("design:type", String)
], Supplier.prototype, "supplierEmail", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Quotation_1.Quotation, (quotation) => quotation.supplier),
    __metadata("design:type", Array)
], Supplier.prototype, "quotations", void 0);
exports.Supplier = Supplier = __decorate([
    (0, typeorm_1.Entity)({ name: "supplier" })
], Supplier);
