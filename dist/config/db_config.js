"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.Connection = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const CafeInventory_1 = require("../entities/CafeInventory");
const HallMenuPackage_1 = require("../entities/HallMenuPackage");
const HallInventory_1 = require("../entities/HallInventory");
const CafeReview_1 = require("../entities/CafeReview");
const CafeOrder_1 = require("../entities/CafeOrder");
const Discount_1 = require("../entities/Discount");
const CafeOrderItem_1 = require("../entities/CafeOrderItem");
const HallMenuPackageItems_1 = require("../entities/HallMenuPackageItems");
const HallType_1 = require("../entities/HallType");
const Supplier_1 = require("../entities/Supplier");
const HallBooking_1 = require("../entities/HallBooking");
const Quotation_1 = require("../entities/Quotation");
const connectionManager = (0, typeorm_1.getConnectionManager)();
exports.Connection = connectionManager.create({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_NAME || "cafe_db_sys",
    synchronize: true,
    entities: [
        User_1.User,
        CafeInventory_1.CafeInventory,
        HallMenuPackage_1.HallMenuPackage,
        HallInventory_1.HallInventory,
        CafeReview_1.CafeReview,
        CafeOrder_1.CafeOrder,
        CafeOrderItem_1.CafeOrderItem,
        Discount_1.Discount,
        HallMenuPackageItems_1.HallMenuPackageItems,
        HallType_1.HallType,
        Supplier_1.Supplier,
        Quotation_1.Quotation,
        HallBooking_1.HallBooking,
    ],
    logging: false,
});
const connectDB = async () => {
    try {
        const connection = await exports.Connection.connect();
        console.log("Database connected !");
    }
    catch (error) {
        console.log(error);
        console.log("Database connection Failed !");
    }
};
exports.connectDB = connectDB;
