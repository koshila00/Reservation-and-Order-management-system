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
exports.Quotation = void 0;
const typeorm_1 = require("typeorm");
const Supplier_1 = require("./Supplier");
const CafeInventory_1 = require("./CafeInventory");
const HallInventory_1 = require("./HallInventory");
let Quotation = class Quotation {
};
exports.Quotation = Quotation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "quotation_id" }),
    __metadata("design:type", Number)
], Quotation.prototype, "quotationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "qty", type: "int" }),
    __metadata("design:type", Number)
], Quotation.prototype, "qty", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "createdDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Quotation.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "updatedDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Quotation.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "supplierSupplierId", type: "int", nullable: true }),
    __metadata("design:type", Number)
], Quotation.prototype, "supplierSupplierId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "itemCafeItemId", type: "int", nullable: true }),
    __metadata("design:type", Number)
], Quotation.prototype, "itemCafeItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "itemHallItemId", type: "int", nullable: true }),
    __metadata("design:type", Number)
], Quotation.prototype, "itemHallItemId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Supplier_1.Supplier, (supplier) => supplier.quotations, {
        nullable: true,
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: "supplierSupplierId",
        referencedColumnName: "supplierId",
    }),
    __metadata("design:type", Object)
], Quotation.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CafeInventory_1.CafeInventory, (cafeinventory) => cafeinventory.quotations, {
        nullable: true,
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "itemCafeItemId", referencedColumnName: "cafeItemId" }),
    __metadata("design:type", Object)
], Quotation.prototype, "cafeinventory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => HallInventory_1.HallInventory, (hallinventory) => hallinventory.quotations, {
        nullable: true,
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "itemHallItemId", referencedColumnName: "hallInventoryItemId" }),
    __metadata("design:type", Object)
], Quotation.prototype, "hallinventory", void 0);
exports.Quotation = Quotation = __decorate([
    (0, typeorm_1.Entity)({ name: "quotation" })
], Quotation);
