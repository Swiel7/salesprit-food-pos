import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthPage, ErrorPage } from "./pages";
import { LoginForm, RegisterForm } from "./features/auth";

const router = createBrowserRouter([
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
