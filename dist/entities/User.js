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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const CafeReview_1 = require("./CafeReview");
const CafeOrder_1 = require("./CafeOrder");
let User = class User {
    email(email, subject, htmlBody) {
        throw new Error("Method not implemented.");
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "user_id" }),
    __metadata("design:type", Number)
], User.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_name" }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_address" }),
    __metadata("design:type", String)
], User.prototype, "userAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_phoneNumber" }),
    __metadata("design:type", String)
], User.prototype, "userPhoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_email" }),
    __metadata("design:type", String)
], User.prototype, "userEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_password" }),
    __metadata("design:type", String)
], User.prototype, "userPassword", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_role" }),
    __metadata("design:type", String)
], User.prototype, "userRole", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "created_date",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], User.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "updated_date",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], User.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CafeReview_1.CafeReview, (cafeReview) => cafeReview.user),
    __metadata("design:type", Array)
], User.prototype, "cafeReviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CafeOrder_1.CafeOrder, (cafeOrder) => cafeOrder.discount),
    __metadata("design:type", Array)
], User.prototype, "cafeOrders", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: "user" })
], User);
