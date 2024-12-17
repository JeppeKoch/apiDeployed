import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import Home from "./pages/Home";
import Vision from "./pages/Vision";
import Endpoints from "./pages/Endpoints";
import Error404 from "./pages/Error404";
import Spice from "./pages/spice";
import AdminPage from "./pages/AdminPage";

import App from './App'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="home" element={<Home />} />
      <Route path="vision" element={<Vision />} />
      <Route path="endpoints" element={<Endpoints />} />
      <Route path="spice" element={ <Spice /> } />
      <Route path="admin" element={<AdminPage />} />
      <Route path="*" element={<Error404/>}/>
   
    
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);