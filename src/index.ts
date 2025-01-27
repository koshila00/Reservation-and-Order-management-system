import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db_config";
import errorHandlerMiddleware from "./utills/error/error.middleware";
import requestMappings from "./map";
import "reflect-metadata";

const app: Express = express();
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    optionsSuccessStatus: 200,
  })
);

requestMappings(app);
app.use(errorHandlerMiddleware);

const start = async () => {
  const port = process.env.PORT || 5000;

  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`SERVER IS LISTENING ON PORT ${port}..!`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

start();
