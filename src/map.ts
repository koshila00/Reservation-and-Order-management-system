import CafeInventoryRouter from "./routes/cafe_inventory_routes";
import CafeOrderItemRouter from "./routes/cafe_order_item_route";
// import CafeOrderItemRouter from "./routes/cafe_order_item_route";
import CafeOrderRouter from "./routes/cafe_order_route";
import CafeReviewRouter from "./routes/cafe_review_route";
import DiscountRouter from "./routes/discount_route";
import HallBookingRouter from "./routes/hall_booking_routes";
import HallInventoryRouter from "./routes/hall_inventory_route";
import HallMenuPackageItemsRouter from "./routes/hall_menu_package_item_route";
import HallMenuPackageRouter from "./routes/hall_menu_package_route";
import HallTypeRouter from "./routes/hall_type_route";
import QuotationRouter from "./routes/quotation_routes";
import SupplierRouter from "./routes/suppliyer_route";
import UserRouter from "./routes/user_router";
import constants from "./utills/constants";

const requestMappings = (app: any) => {
  app.use(constants.API.PREFIX.concat("/user"), UserRouter);
  app.use(constants.API.PREFIX.concat("/cafeitem"), CafeInventoryRouter);
  app.use(constants.API.PREFIX.concat("/cafereview"), CafeReviewRouter);
  app.use(constants.API.PREFIX.concat("/cafeorder"), CafeOrderRouter);

  app.use(constants.API.PREFIX.concat("/cafeorderitem"), CafeOrderItemRouter);

  app.use(constants.API.PREFIX.concat("/discount"), DiscountRouter);

  app.use(constants.API.PREFIX.concat("/hallmenu"), HallMenuPackageRouter);
  app.use(constants.API.PREFIX.concat("/hallinventory"), HallInventoryRouter);
  app.use(
    constants.API.PREFIX.concat("/hallmenupackageitem"),
    HallMenuPackageItemsRouter
  );

  app.use(constants.API.PREFIX.concat("/halltype"), HallTypeRouter);
  app.use(constants.API.PREFIX.concat("/hallbooking"), HallBookingRouter);

  app.use(constants.API.PREFIX.concat("/suppliyer"), SupplierRouter);
  app.use(constants.API.PREFIX.concat("/quotation"), QuotationRouter);
};

export default requestMappings;
