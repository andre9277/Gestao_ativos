/* The MIT License (MIT)

Copyright (c) 2013-2023 Start Bootstrap LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. 

You may obtain a copy of the license at:

      https://github.com/StartBootstrap/startbootstrap-sb-admin-2


All the changes made to enable the implementation of the desired development tools were made by André Ferreira.
*/
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";
import logo_hb from "../assets/logo_hb.jpg";

const SideBar = () => {
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

        <li className="nav-item active">
          <Link to="/dashboard" className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <br></br>
        {/*  <!-- Divider --> */}
        {/*   <hr className="sidebar-divider" /> */}

        {/*   <!-- Heading --> */}
        <div className="sidebar-heading">Ativos</div>
        {/*  <!-- Nav Item - Pages Collapse Menu --> */}
        <MenuItem titulo={"Movimentação"} icon={"fa-plus"} origem={"report"} />
        <MenuItem titulo={"Listagem"} icon={"fa-cog"} origem={"assets"} />

        {/* <!-- Nav Item - ReportPage --> */}
        <MenuItem
          titulo={"Download"}
          icon={"fa-chart-area"}
          origem={"allocations"}
        />
        {/* <!-- Nav Item - ReportPage --> */}
        <MenuItem titulo={"Importar"} icon={"fa fa-edit"} origem={"import"} />

        {/*  <!-- Nav Item - Users --> */}
        {/*  <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Heading --> */}
        <div className="sidebar-heading"> Área do Administrador</div>

        <MenuItem titulo={"Utilizadores"} icon={"fa-table"} origem={"users"} />

        <div className="text-center d-none d-md-inline">
          <button
            className="border-0"
            id="sidebarToggle"
            onClick={changeStyle}
          ></button>
        </div>

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

export default SideBar;
