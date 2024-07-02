import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AccountPage,
  AuthPage,
  ErrorPage,
  FavoritesPage,
  MenuPage,
  OrderDetailsPage,
  OrdersPage,
} from "./pages";
import { LoginForm, RegisterForm } from "./features/auth";
import { Dashboard } from "./layout";
import { registerAction } from "./features/auth/RegisterForm";
import { loginAction } from "./features/auth/LoginForm";
import { menuLoader } from "./pages/MenuPage";
import { favoritesLoader, favoritesAction } from "./pages/FavoritesPage";
import { authLoader } from "./pages/AuthPage";
import { accountAction, accountLoader } from "./pages/AccountPage";
import { ordersLoader } from "./pages/OrdersPage";
import { orderDetailsLoader } from "./pages/OrderDetailsPage";

const router = createBrowserRouter([
  {
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MenuPage />,
        handle: { title: "Menu" },
        loader: menuLoader,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
        handle: { title: "Orders" },
        loader: ordersLoader,
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetailsPage />,
        handle: { title: "Order details" },
        loader: orderDetailsLoader,
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
        handle: { title: "Favorites" },
        loader: favoritesLoader,
        action: favoritesAction,
      },
      {
        path: "/account",
        element: <AccountPage />,
        handle: { title: "Account" },
        loader: accountLoader,
        action: accountAction,
      },
    ],
  },
  {
    element: <AuthPage />,
    errorElement: <ErrorPage />,
    loader: authLoader,
    children: [
      {
        path: "/register",
        element: <RegisterForm />,
        action: registerAction,
      },
      {
        path: "/login",
        element: <LoginForm />,
        action: loginAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
