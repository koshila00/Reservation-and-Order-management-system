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
exports.Discount = void 0;
const typeorm_1 = require("typeorm");
const CafeOrder_1 = require("./CafeOrder");
const HallBooking_1 = require("./HallBooking");
let Discount = class Discount {
};
exports.Discount = Discount;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "discount_id" }),
    __metadata("design:type", Number)
], Discount.prototype, "discountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "discount_name" }),
    __metadata("design:type", String)
], Discount.prototype, "discountName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "discount_percentage" }),
    __metadata("design:type", Number)
], Discount.prototype, "discountPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "createdDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Discount.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "updatedDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Discount.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CafeOrder_1.CafeOrder, (cafeOrder) => cafeOrder.discount),
    __metadata("design:type", Array)
], Discount.prototype, "cafeOrders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => HallBooking_1.HallBooking, (hallBooking) => hallBooking.discount),
    __metadata("design:type", Array)
], Discount.prototype, "hallBookings", void 0);
exports.Discount = Discount = __decorate([
    (0, typeorm_1.Entity)({ name: "discount" })
], Discount);
