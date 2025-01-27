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
exports.HallMenuPackageItem = void 0;
const typeorm_1 = require("typeorm");
const HallMenuPackage_1 = require("./HallMenuPackage");
let HallMenuPackageItem = class HallMenuPackageItem {
};
exports.HallMenuPackageItem = HallMenuPackageItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "hall_menu_package_item_id" }),
    __metadata("design:type", Number)
], HallMenuPackageItem.prototype, "hallMenuPackageItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "hall_menu_package_item_name" }),
    __metadata("design:type", String)
], HallMenuPackageItem.prototype, "hallMenuPackageItemName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "createdDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], HallMenuPackageItem.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "updatedDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], HallMenuPackageItem.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "hall_menu_package_id" }),
    __metadata("design:type", Number)
], HallMenuPackageItem.prototype, "hallMenuPackageId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => HallMenuPackage_1.HallMenuPackage, (hallMenuPackage) => hallMenuPackage.hallMenuPackageItem),
    (0, typeorm_1.JoinColumn)({
        name: "hall_menu_package_id",
        referencedColumnName: "hallMenuPackageId",
    }),
    __metadata("design:type", HallMenuPackage_1.HallMenuPackage)
], HallMenuPackageItem.prototype, "hallMenuPackage", void 0);
exports.HallMenuPackageItem = HallMenuPackageItem = __decorate([
    (0, typeorm_1.Entity)({ name: "hall_menu_package_items" })
], HallMenuPackageItem);
