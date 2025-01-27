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
exports.HallBooking = void 0;
const typeorm_1 = require("typeorm");
const HallType_1 = require("./HallType");
const HallMenuPackage_1 = require("./HallMenuPackage");
const Discount_1 = require("./Discount");
let HallBooking = class HallBooking {
};
exports.HallBooking = HallBooking;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "hall_booking_id" }),
    __metadata("design:type", Number)
], HallBooking.prototype, "hallBookingId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "hall_type_id" }),
    __metadata("design:type", Number)
], HallBooking.prototype, "hallTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "hall_booking_date", type: "datetime" }),
    __metadata("design:type", Date)
], HallBooking.prototype, "hallBookingDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "hall_booking_Total", type: "double" }),
    __metadata("design:type", Number)
], HallBooking.prototype, "hallBookingTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "hall_booking_guestCount" }),
    __metadata("design:type", Number)
], HallBooking.prototype, "hallBookingGuestCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "createdDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], HallBooking.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "updatedDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], HallBooking.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "hall_booking_menuPackage_id", nullable: true }),
    __metadata("design:type", Number)
], HallBooking.prototype, "hallBookingMenuPackageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "discount_id", nullable: true }),
    __metadata("design:type", Number)
], HallBooking.prototype, "discountId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => HallType_1.HallType, (hallType) => hallType.hallBookings),
    (0, typeorm_1.JoinColumn)({ name: "hall_type_id", referencedColumnName: "hallTypeId" }),
    __metadata("design:type", HallType_1.HallType)
], HallBooking.prototype, "hallType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => HallMenuPackage_1.HallMenuPackage, (hallMenuPackage) => hallMenuPackage.hallBookings),
    (0, typeorm_1.JoinColumn)({
        name: "hall_booking_menuPackage_id",
        referencedColumnName: "hallMenuPackageId",
    }),
    __metadata("design:type", HallMenuPackage_1.HallMenuPackage)
], HallBooking.prototype, "hallMenuPackage", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Discount_1.Discount, (discount) => discount.hallBookings),
    (0, typeorm_1.JoinColumn)({ name: "discount_id", referencedColumnName: "discountId" }),
    __metadata("design:type", Discount_1.Discount)
], HallBooking.prototype, "discount", void 0);
exports.HallBooking = HallBooking = __decorate([
    (0, typeorm_1.Entity)({ name: "hall_booking" })
], HallBooking);
