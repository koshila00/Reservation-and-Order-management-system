import { Router } from "express";
import { DiscountController } from "../controllers/discount_controller";
import constants from "../utills/constants";
import { DiscountService } from "../services/discount_service";
import { DiscountRepository } from "../repositories/discount_repository";
import { Discount } from "../entities/Discount";
import { getManager } from "typeorm";
import user_middleware from "../middlewares/user_middleware";

const DiscountRouter = Router();

const entityManager = getManager();

// Create an instance of DiscountRepository and pass the EntityManager
const discountRepository = new DiscountRepository(Discount, entityManager);

const discountService = new DiscountService(discountRepository);

const discountController = new DiscountController(discountService);

DiscountRouter.post(
  "/createDiscount",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  discountController.createDiscount.bind(discountController)
);

DiscountRouter.put(
  "/updateDiscount/:discountId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  discountController.updateDiscount.bind(discountController)
);

DiscountRouter.delete(
  "/deleteDiscount/:discountId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  discountController.deleteDiscount.bind(discountController)
);

DiscountRouter.get(
  "/getAllDiscounts",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  discountController.getAllDiscounts.bind(discountController)
);

DiscountRouter.get(
  "/getOneDiscount/:discountId",
  user_middleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  discountController.getOneDiscount.bind(discountController)
);

export default DiscountRouter;
