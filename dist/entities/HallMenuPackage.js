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
exports.HallMenuPackage = void 0;
const typeorm_1 = require("typeorm");
const HallMenuPackageItems_1 = require("./HallMenuPackageItems");
const HallBooking_1 = require("./HallBooking");
let HallMenuPackage = class HallMenuPackage {
};
exports.HallMenuPackage = HallMenuPackage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "hall_menu_package_id" }),
    __metadata("design:type", Number)
], HallMenuPackage.prototype, "hallMenuPackageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "hall_menu_package_name" }),
    __metadata("design:type", String)
], HallMenuPackage.prototype, "hallMenuPackageName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "hall_menu_package_price" }),
    __metadata("design:type", String)
], HallMenuPackage.prototype, "hallMenuPackagePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "hall_menu_package_image", nullable: true }),
    __metadata("design:type", String)
], HallMenuPackage.prototype, "hallMenuPackageImage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "createdDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], HallMenuPackage.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "updatedDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], HallMenuPackage.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => HallMenuPackageItems_1.HallMenuPackageItems, (hallMenuPackageItems) => hallMenuPackageItems.hallMenuPackage),
    __metadata("design:type", Array)
], HallMenuPackage.prototype, "hallMenuPackageItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => HallBooking_1.HallBooking, (hallBooking) => hallBooking.hallMenuPackage),
    __metadata("design:type", Array)
], HallMenuPackage.prototype, "hallBookings", void 0);
exports.HallMenuPackage = HallMenuPackage = __decorate([
    (0, typeorm_1.Entity)({ name: "hall_menu_package" })
], HallMenuPackage);
