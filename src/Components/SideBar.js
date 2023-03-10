import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuItem from "../Components/MenuItem";

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
        {/*  <!-- Sidebar - Brand --> */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="#"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">GAHB</div>
          <div className="text-center d-none d-md-inline">
            <button
              className="rounded-circle border-0"
              id="sidebarToggle"
              onClick={changeStyle}
            ></button>
          </div>
        </a>

        {/*   <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/*  <!-- Nav Item - Dashboard --> */}
        <li className="nav-item active">
          <Link to="/dashboard">
            <a className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </a>
          </Link>
        </li>

        {/*  <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/*   <!-- Heading --> */}
        <div className="sidebar-heading">Interface</div>

        {/*  <!-- Nav Item - Pages Collapse Menu --> */}
        <MenuItem
          titulo={"Gestão de ativos"}
          icon={"fa-cog"}
          origem={"pesquisativos"}
        />

        {/* <!-- Nav Item - Utilities Collapse Menu --> */}
        {/* <MenuItem Name="Utilities-teste" MenuId="collapseUtilities" /> */}

        {/*  <!-- Nav Item - Pages Collapse Menu --> */}
        {/* <MenuItem Name="Pages" MenuId="collapsePages" /> */}

        {/* <!-- Nav Item - Relatorios --> */}
        <MenuItem titulo={"Relatórios"} icon={"fa-chart-area"} />

        {/*  <!-- Nav Item - Utilizadores --> */}
        {/*  <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Heading --> */}
        <div className="sidebar-heading"> Área do Administrador</div>

        <MenuItem titulo={"Utilizadores"} icon={"fa-table"} />
        <MenuItem titulo={"Inserir Ativos"} icon={"fa-plus"} />

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider d-none d-md-block" />

        {/*   <!-- Sidebar Toggler (Sidebar) --> */}
        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
            onClick={changeStyle}
          ></button>
        </div>

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

          {/*   <!-- Dropdown - Messages --> */}
          <div
            className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
            aria-labelledby="searchDropdown"
          >
            <form className="form-inline mr-auto w-100 navbar-search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-light border-0 small"
                  placeholder="Procure o ativo..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>
      </ul>
      {/*  <!-- End of Sidebar --> */}

      {/*  <!-- Scroll to Top Button-->  */}
      <a className="scroll-to-top rounded" href="/main">
        <i className="fas fa-angle-up"></i>
      </a>
    </>
  );
};

export default SideBar;
