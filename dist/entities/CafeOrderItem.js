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
exports.CafeOrderItem = void 0;
const typeorm_1 = require("typeorm");
const CafeOrder_1 = require("./CafeOrder");
const CafeInventory_1 = require("./CafeInventory");
let CafeOrderItem = class CafeOrderItem {
};
exports.CafeOrderItem = CafeOrderItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "cafe_order_items_id" }),
    __metadata("design:type", Number)
], CafeOrderItem.prototype, "cafeOrderItemsId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cafe_order_id" }),
    __metadata("design:type", Number)
], CafeOrderItem.prototype, "cafeOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cafe_item_id" }),
    __metadata("design:type", Number)
], CafeOrderItem.prototype, "cafeItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cafe_order_item_qty" }),
    __metadata("design:type", Number)
], CafeOrderItem.prototype, "cafeOrderItemQty", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "createdDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], CafeOrderItem.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "updatedDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], CafeOrderItem.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CafeOrder_1.CafeOrder, (cafeOrder) => cafeOrder.cafeOrderItems),
    (0, typeorm_1.JoinColumn)({ name: "cafe_order_id", referencedColumnName: "cafeOrderId" }),
    __metadata("design:type", CafeOrder_1.CafeOrder)
], CafeOrderItem.prototype, "cafeOrder", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CafeInventory_1.CafeInventory, (cafeInventory) => cafeInventory.cafeOrderItems),
    (0, typeorm_1.JoinColumn)({ name: "cafe_item_id", referencedColumnName: "cafeItemId" }),
    __metadata("design:type", CafeInventory_1.CafeInventory)
], CafeOrderItem.prototype, "cafeInventory", void 0);
exports.CafeOrderItem = CafeOrderItem = __decorate([
    (0, typeorm_1.Entity)({ name: "cafe_order_items" })
], CafeOrderItem);
