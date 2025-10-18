// Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
    {!hideNavbar && <Navbar />}
      <div className="content">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
