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
exports.HallType = void 0;
const typeorm_1 = require("typeorm");
const HallBooking_1 = require("./HallBooking");
let HallType = class HallType {
};
exports.HallType = HallType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "hall_type_id" }),
    __metadata("design:type", Number)
], HallType.prototype, "hallTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "hall_type_name" }),
    __metadata("design:type", String)
], HallType.prototype, "hallTypeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "hall_type_capacity" }),
    __metadata("design:type", Number)
], HallType.prototype, "hallTypeCapacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "hall_type_price" }),
    __metadata("design:type", Number)
], HallType.prototype, "hallTypePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "createdDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], HallType.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "updatedDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], HallType.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => HallBooking_1.HallBooking, (hallBooking) => hallBooking.hallType),
    __metadata("design:type", Array)
], HallType.prototype, "hallBookings", void 0);
exports.HallType = HallType = __decorate([
    (0, typeorm_1.Entity)({ name: "hall_type" })
], HallType);
