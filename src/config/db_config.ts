import { Db, getConnection, getConnectionManager } from "typeorm";
import { User } from "../entities/User";
import { CafeInventory } from "../entities/CafeInventory";
import { HallMenuPackage } from "../entities/HallMenuPackage";
import { HallInventory } from "../entities/HallInventory";
import { CafeReview } from "../entities/CafeReview";
import { CafeOrder } from "../entities/CafeOrder";
import { Discount } from "../entities/Discount";
import { CafeOrderItem } from "../entities/CafeOrderItem";
import { HallMenuPackageItems } from "../entities/HallMenuPackageItems";
import { HallType } from "../entities/HallType";
import { Supplier } from "../entities/Supplier";
import { HallBooking } from "../entities/HallBooking";
import { Quotation } from "../entities/Quotation";

const connectionManager = getConnectionManager();

export const Connection = connectionManager.create({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_NAME || "cafe_db_sys",
  synchronize: true,
  entities: [
    User,
    CafeInventory,
    HallMenuPackage,
    HallInventory,
    CafeReview,
    CafeOrder,
    CafeOrderItem,
    Discount,
    HallMenuPackageItems,
    HallType,
    Supplier,
    Quotation,
    HallBooking,
  ],
  logging: false,
});

export const connectDB = async () => {
  try {
    const connection = await Connection.connect();
    console.log("Database connected !");
  } catch (error) {
    console.log(error);
    console.log("Database connection Failed !");
  }
};
