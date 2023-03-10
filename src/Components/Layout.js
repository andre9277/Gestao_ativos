import React from "react";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Logout from "./Logout";

const Layout = () => {
  return (
    <div id="wrapper">
      <SideBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar />
          <Outlet />
        </div>
        <Footer />
      </div>
      <Logout />
    </div>
  );
};

export default Layout;
