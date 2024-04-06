import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminRoutes } from "./main.routes";
import UpdateBook from "../pages/admin/UpdateBook";
import EditBookForm from "../components/form/EditBookForm";
import HomePage from "../pages/HomePage";
import { managerRoutes } from "./manager.routes";
import { userRoutes } from "./user.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/superAdmin",
    element: <App />,
    children: adminRoutes,
  },
  {
    path: "/user",
    element: <App />,
    children: userRoutes,
  },
  {
    path: "/manager",
    element: <App />,
    children: managerRoutes,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/book/:bookId",
    element: <UpdateBook />,
  },
  {
    path: "/book/edit",
    element: <EditBookForm />,
  },
]);

export default router;
