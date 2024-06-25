import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AuthPage,
  ErrorPage,
  MenuPage,
  OrderDetailsPage,
  OrdersPage,
} from "./pages";
import { LoginForm, RegisterForm } from "./features/auth";
import { Dashboard } from "./layout";

const router = createBrowserRouter([
  {
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MenuPage />,
        handle: { title: "Menu" },
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
    ],
  },
  {
    element: <AuthPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
