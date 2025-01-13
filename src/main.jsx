import React from "react";
import ReactDOM from "react-dom/client";
import {Navigate,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router";
import Error404 from "./pages/Error404";
import Spice from "./pages/spice";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/LoginPage";
import Register from "./components/Auth/Register";
import facade from "./services/apiFacade.js";
import App from "./App";
import UserProfile from "./pages/UserProfile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Navigate to="/spice" replace />} />
      <Route path="userProfile" element={<UserProfile />} />
      <Route path="spice" element={<Spice />} />
      <Route path="admin" element={<AdminPage />} />
      <Route path="auth/login" element={<Login />} />
      <Route
        path="auth/register"
        element={<Register register={facade.register} />}
      />
      <Route
        path="userpage/:id/:username/:listType"
        element={<UserProfile />}
      />
      <Route path="*" element={<Error404 />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
