import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateBooks from "../pages/admin/CreateBooks";
import ViewBooks from "../pages/admin/ViewBooks";
import ProductOperation from "../pages/admin/ProductOperation";
import BookFiltering from "../pages/admin/BookFiltering";
import SalesHistory from "../pages/admin/SalesHistory";
import CheckoutPage from "../pages/cart/CheckoutPage";
import CompleteCheckout from "../pages/cart/CompleteCheckout";

type TRoute = {
  path: string;
  element: ReactNode;
};

type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Books Management",
    children: [
      {
        name: "Create Books",
        path: "create-books",
        element: <CreateBooks />,
      },
      {
        name: "View Books",
        path: "view-books",
        element: <ViewBooks />,
      },
      {
        name: "Product Operations",
        path: "product-operations",
        element: <ProductOperation />,
      },
      {
        name: "Book Filtering",
        path: "book-filtering",
        element: <BookFiltering />,
      },
      {
        name: "Sales History",
        path: "sales-history",
        element: <SalesHistory />,
      },
      {
        name: "Cart Checkout",
        path: "cart-checkout",
        element: <CheckoutPage />,
      },
      {
        name: "Cart Complete Checkout",
        path: "cart-complete-checkout",
        element: <CompleteCheckout />,
      },
    ],
  },
];

export const userSidebarItems = userPaths.reduce(
  (acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }

    return acc;
  },
  []
);

export const userRoutes = userPaths.reduce((acc: TRoute[], item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }

  if (item.children) {
    item.children.forEach((child) => {
      acc.push({
        path: child.path,
        element: child.element,
      });
    });
  }

  return acc;
}, []);
