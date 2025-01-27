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
exports.CafeOrder = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Discount_1 = require("./Discount");
const CafeOrderItem_1 = require("./CafeOrderItem");
let CafeOrder = class CafeOrder {
};
exports.CafeOrder = CafeOrder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "cafe_order_id" }),
    __metadata("design:type", Number)
], CafeOrder.prototype, "cafeOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id" }),
    __metadata("design:type", Number)
], CafeOrder.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cafe_order_total" }),
    __metadata("design:type", Number)
], CafeOrder.prototype, "cafeOrderTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "createdDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], CafeOrder.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "updatedDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], CafeOrder.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cafe_order_delivery_status" }),
    __metadata("design:type", String)
], CafeOrder.prototype, "cafeOrderDeliveryStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cafe_order_type" }),
    __metadata("design:type", String)
], CafeOrder.prototype, "cafeOrderType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "discount_id" }),
    __metadata("design:type", Number)
], CafeOrder.prototype, "discountId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.cafeOrders),
    (0, typeorm_1.JoinColumn)({ name: "user_id", referencedColumnName: "userId" }),
    __metadata("design:type", User_1.User)
], CafeOrder.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Discount_1.Discount, (discount) => discount.cafeOrders),
    (0, typeorm_1.JoinColumn)({ name: "discount_id", referencedColumnName: "discountId" }),
    __metadata("design:type", Discount_1.Discount)
], CafeOrder.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CafeOrderItem_1.CafeOrderItem, (cafeOrderItem) => cafeOrderItem.cafeOrder),
    __metadata("design:type", Array)
], CafeOrder.prototype, "cafeOrderItems", void 0);
exports.CafeOrder = CafeOrder = __decorate([
    (0, typeorm_1.Entity)({ name: "cafe_order" })
], CafeOrder);
