import React from "react";
import SideBar from "../Componentes/SideBar";
import Footer from "../Componentes/Footer";
import TopBar from "../Componentes/TopBar";
import Logout from "../Componentes/Logout";

const MainPage = () => {
  return (
    <body>
      <div id="wrapper">
        <SideBar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopBar />
          </div>

          <Footer />
        </div>
      </div>
      <Logout />
    </body>
  );
};

export default MainPage;
