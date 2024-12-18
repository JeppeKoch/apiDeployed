import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router";
import Home from "./pages/Home";
import Vision from "./pages/Vision";
import Error404 from "./pages/Error404";
import Spice from "./pages/spice";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/LoginPage";
import Register from "./components/Auth/Register";
import facade  from "./services/apiFacade.js";
import App from './App'
import UserProfile from "./pages/UserProfile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="home" element={<Home />} />
      <Route path="vision" element={<Vision />} />
      <Route path="userProfile" element={<UserProfile/>} />
      <Route path="spice" element={ <Spice /> } />
      <Route path="admin" element={<AdminPage />} />
      <Route index element={<Spice />} />
      <Route path="spice" element={<Spice />} />
      <Route path="auth/login" element={ <Login />} />
      <Route path="auth/register" element={ <Register register={facade.register} />} />
      <Route path="*" element={<Error404/>}/>
      <Route path="admin" element={<AdminPage />} />
      <Route path="userpage" element={ <UserProfile/>}/>

  
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);