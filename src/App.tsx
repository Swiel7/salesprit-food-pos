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
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetailsPage />,
        handle: { title: "Order details" },
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
        handle: { title: "Favorites" },
      },
      {
        path: "/account",
        element: <AccountPage />,
        handle: { title: "Account" },
      },
    ],
  },
  {
    element: <AuthPage />,
    errorElement: <ErrorPage />,
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
