import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"; // Import ProtectedRoute
import MasterLayout from "../pages/MasterLayout/MasterLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Properties from "../pages/Properties/Properties";
import Portfolio from "../pages/Portfolio/Portfolio";
import Account from "../pages/Account/Account";
import BuyNow from "../pages/BuyNow/BuyNow";
import LandingPage from "../pages/LandingPage/";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

const routes = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },

  // Protected Routes
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <MasterLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Dashboard /> },
      { path: "properties/:id", element: <Properties /> },
      { path: "portfolio", element: <Portfolio /> },
      { path: "account", element: <Account /> },
      { path: "properties/:id/buynow", element: <BuyNow /> },
    ],
  },

  // Redirect all unknown routes to login
  { path: "*", element: <Navigate to="/login" replace /> },
]);

export default routes;
