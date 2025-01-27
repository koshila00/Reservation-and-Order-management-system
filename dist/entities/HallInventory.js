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
exports.HallInventory = void 0;
const typeorm_1 = require("typeorm");
const Quotation_1 = require("./Quotation");
let HallInventory = class HallInventory {
};
exports.HallInventory = HallInventory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "hall_inventory_item_id" }),
    __metadata("design:type", Number)
], HallInventory.prototype, "hallInventoryItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "hall_inventory_item_name" }),
    __metadata("design:type", String)
], HallInventory.prototype, "hallInventoryItemName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "hall_inventory_item_price", type: "double" }),
    __metadata("design:type", Number)
], HallInventory.prototype, "hallInventoryItemPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "hall_inventory_item_qty" }),
    __metadata("design:type", Number)
], HallInventory.prototype, "hallInventoryItemQty", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "hall_inventory_item_description" }),
    __metadata("design:type", String)
], HallInventory.prototype, "hallInventoryItemDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "createdDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], HallInventory.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "updatedDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], HallInventory.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_delete", type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], HallInventory.prototype, "isDelete", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Quotation_1.Quotation, (quotation) => quotation.hallinventory),
    __metadata("design:type", Array)
], HallInventory.prototype, "quotations", void 0);
exports.HallInventory = HallInventory = __decorate([
    (0, typeorm_1.Entity)({ name: "hall_inventory" })
], HallInventory);
