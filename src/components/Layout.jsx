// Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const showNavbarOn = ["/setup", "/quiz-page", "/result"];
  const showNavbar = showNavbarOn.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="content">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
