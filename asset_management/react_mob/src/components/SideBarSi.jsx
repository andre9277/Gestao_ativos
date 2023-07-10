import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";
import logo_hb from "../assets/logo_hb.jpg";

const SideBarSi = () => {
  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );

  const changeStyle = () => {
    if (
      style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };
  const changeStyle1 = () => {
    if (
      style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };
  const [activeOption, setActiveOption] = useState("");

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  return (
    <>
      {/*  <!-- Sidebar --> */}
      <ul className={style} id="accordionSidebar">
        <br></br>
        <br></br>
        {/*  <!-- Sidebar - Brand --> */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="#"
        >
          <div className="sidebar-brand-icon ">
            <img src={logo_hb} alt="HB logo" className="img-sb" />
          </div>
        </a>

        {/*   <!-- Divider --> */}
        {/*         <hr className="sidebar-divider my-0" /> */}
        <br></br>
        <br></br>
        <br></br>

        {/*  <!-- Nav Item - Dashboard --> */}
        <p className="space-mov"></p>
        <li
          className={`nav-item ${activeOption === "dashboard" ? "active" : ""}`}
        >
          <Link
            to="/dashboard"
            className="nav-link"
            onClick={() => handleOptionClick("dashboard")}
          >
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>
              <h5>Dashboard</h5>
            </span>
          </Link>
        </li>
        <br></br>
        {/*  <!-- Divider --> */}
        {/*   <hr className="sidebar-divider" /> */}

        {/*   <!-- Heading --> */}
        <div className="sidebar-heading">Ativos</div>
        {/*  <!-- Nav Item - Pages Collapse Menu --> */}
        <MenuItem
          titulo={"Listagem"}
          icon={"fa-list"}
          origem={"assets"}
          handleOptionClick={handleOptionClick}
          activeOption={activeOption}
        />
        <MenuItem
          titulo={"Movimentos"}
          icon={"fa-exchange-alt"}
          origem={"report"}
          handleOptionClick={handleOptionClick}
          activeOption={activeOption}
        />

        <MenuItem
          titulo={"Donwload"}
          icon={"fa-arrow-circle-down"}
          origem={"allocations"}
          handleOptionClick={handleOptionClick}
          activeOption={activeOption}
        />

        {/* <!-- Nav Item - ReportPage --> */}

        {/* <div className="text-center d-none d-md-inline">
          <button
            className="border-0"
            id="sidebarToggle"
            onClick={changeStyle}
          ></button>
        </div> */}

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider d-none d-md-block" />

        <li className="nav-item dropdown no-arrow d-sm-none">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="searchDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-search fa-fw"></i>
          </a>
        </li>
      </ul>

      {/*  <!-- End of Sidebar --> */}

      {/*  <!-- Scroll to Top Button-->  */}
      <a className="scroll-to-top rounded" href="#top">
        <i className="fas fa-angle-up"></i>
      </a>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            {/*  <!-- Sidebar Toggle (Topbar) --> */}
            <button
              id="sidebarToggleTop"
              className="btn btn-link d-md-none rounded-circle mr-3"
              onClick={changeStyle1}
            >
              <i className="fa fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideBarSi;
