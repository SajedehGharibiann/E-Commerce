import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import {
  About,
  Auth,
  Cart,
  Contact,
  Home,
  NotFound,
  Product,
  ProductsDetails,
  Profile,
} from "../Pages";
import PrivateLayout from "../Layout/Private";
import PublicLayout from "../Layout/Public";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <PrivateLayout />,
        children: [
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        element: <PublicLayout />,
        children: [
          {
            path: "auth",
            element: <Auth />,
          },
        ],
      },
      {
        path: "products/:categoryId/:categoryName",
        element: <Product />,
      },
      {
        path: "product-details/:id/:name",
        element: <ProductsDetails />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path:"*",
        element:<NotFound/>
      }
    ],
  },
]);

export default router;
