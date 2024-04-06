import { Router } from "express";
import { UserRouters } from "../modules/user/user.route";
import { BookRouters } from "../modules/book/book.route";
import { SalesRouters } from "../modules/sales/sales.route";
import { CartRoutes } from "../modules/cart/cart.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/api/auth",
    route: UserRouters,
  },
  {
    path: "/api/book",
    route: BookRouters,
  },
  {
    path: "/api/cart",
    route: CartRoutes,
  },
  {
    path: "/api/book",
    route: SalesRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
