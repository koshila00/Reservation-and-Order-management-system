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
exports.CafeInventory = void 0;
const typeorm_1 = require("typeorm");
const CafeOrderItem_1 = require("./CafeOrderItem");
const Quotation_1 = require("./Quotation");
let CafeInventory = class CafeInventory {
};
exports.CafeInventory = CafeInventory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "cafe_item_id" }),
    __metadata("design:type", Number)
], CafeInventory.prototype, "cafeItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cafe_item_name" }),
    __metadata("design:type", String)
], CafeInventory.prototype, "cafeItemName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cafe_item_price" }),
    __metadata("design:type", Number)
], CafeInventory.prototype, "cafeItemPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cafe_item_qty" }),
    __metadata("design:type", Number)
], CafeInventory.prototype, "cafeItemQty", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cafe_item_discription", nullable: true }),
    __metadata("design:type", String)
], CafeInventory.prototype, "cafeItemDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "createdDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], CafeInventory.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "updatedDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], CafeInventory.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cafe_item_image", nullable: true }),
    __metadata("design:type", String)
], CafeInventory.prototype, "cafeItemImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_delete", type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], CafeInventory.prototype, "isDelete", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CafeOrderItem_1.CafeOrderItem, (cafeOrderItem) => cafeOrderItem.cafeInventory),
    __metadata("design:type", Array)
], CafeInventory.prototype, "cafeOrderItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Quotation_1.Quotation, (quotation) => quotation.cafeinventory),
    __metadata("design:type", Array)
], CafeInventory.prototype, "quotations", void 0);
exports.CafeInventory = CafeInventory = __decorate([
    (0, typeorm_1.Entity)({ name: "cafe_inventory" })
], CafeInventory);
