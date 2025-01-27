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
exports.Quatation = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Supplier_1 = require("./Supplier");
let Quatation = class Quatation {
};
exports.Quatation = Quatation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "quatation_id" }),
    __metadata("design:type", Number)
], Quatation.prototype, "quatationId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "createdDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Quatation.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "updatedDate",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Quatation.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.quatation),
    (0, typeorm_1.JoinColumn)({ name: "user_id", referencedColumnName: "userId" }),
    __metadata("design:type", User_1.User)
], Quatation.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Supplier_1.Supplier, (supplier) => supplier.quatation),
    (0, typeorm_1.JoinColumn)({ name: "supplier_id", referencedColumnName: "supplier_id" }),
    __metadata("design:type", Supplier_1.Supplier)
], Quatation.prototype, "supplier", void 0);
exports.Quatation = Quatation = __decorate([
    (0, typeorm_1.Entity)({ name: "quatation" })
], Quatation);
