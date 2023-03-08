import React, { useState } from "react";
import Alert from "../Componentes/Alert";
import Message from "../Componentes/Message";
import Search from "../Componentes/Search";
import UserInfo from "../Componentes/UserInfo";
import MenuItem from "../Componentes/MenuItem";
import Card from "../Componentes/Card";
import "../Estilos/Dashboard.css";
import MenuItemSimple from "../Componentes/MenuItemSimple";
import AreaChart from "../Componentes/AreaChart";
import PieChart from "../Componentes/PieChart";
import ProjectCard from "../Componentes/ProjectCard";
import Illustration from "../Componentes/Illustration";
import Approach from "../Componentes/Approach";
import Footer from "../Componentes/Footer";
import Logout from "../Componentes/Logout";
import { Link } from "react-router-dom";

function Dashboard() {
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
    <div>
      <body id="page-top">
        {/*  <!-- Page Wrapper --> */}
        <div id="wrapper">
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
            <MenuItem Name="Gestão de ativos" MenuId="collapseTwo" />

            {/* <!-- Nav Item - Utilities Collapse Menu --> */}
            {/* <MenuItem Name="Utilities-teste" MenuId="collapseUtilities" /> */}

            {/*  <!-- Nav Item - Pages Collapse Menu --> */}
            {/* <MenuItem Name="Pages" MenuId="collapsePages" /> */}

            {/* <!-- Nav Item - Relatorios --> */}
            <MenuItemSimple Titulo={"Relatórios"} Icon={"fa-chart-area"} />

            {/*  <!-- Nav Item - Utilizadores --> */}
            {/*  <!-- Divider --> */}
            <hr className="sidebar-divider" />

            {/* <!-- Heading --> */}
            <div className="sidebar-heading"> Área do Administrador</div>

            <MenuItemSimple Titulo={"Utilizadores"} Icon={"fa-table"} />
            <MenuItemSimple Titulo={"Inserir Ativos"} Icon={"fa-plus"} />

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

          {/*  <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/*  <!-- Main Content --> */}
            <div id="content">
              {/*  <!-- Topbar --> */}
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/*  <!-- Sidebar Toggle (Topbar) --> */}
                <button
                  id="sidebarToggleTop"
                  className="btn btn-link d-md-none rounded-circle mr-3"
                  onClick={changeStyle1}
                >
                  <i className="fa fa-bars"></i>
                </button>

                {/*  <!-- Topbar Search --> */}
                <Search />
                {/*  <!-- Topbar Navbar --> */}
                <ul className="navbar-nav ml-auto">
                  {/*  <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}

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

                  {/*  <!-- Nav Item - Alerts --> */}
                  <Alert />
                  {/*  <!-- Nav Item - Messages --> */}
                  <Message />

                  <div className="topbar-divider d-none d-sm-block"></div>

                  {/* <!-- Nav Item - User Information --> */}
                  <UserInfo />
                </ul>
              </nav>
              {/*  <!-- End of Topbar --> */}

              {/* <!-- Begin Page Content --> */}
              <div className="container-fluid">
                {/*  <!-- Page Heading --> */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                </div>

                {/*  <!-- Content Row --> */}
                <div className="row">
                  {/*  <!-- Total de Ativos --> */}
                  <Card
                    Titulo="Total de ativos"
                    Descricao="1295"
                    Icon="fa-laptop"
                    Cor="text-primary"
                    Tipo="primary"
                  />

                  {/*  <!-- Ativos Alterados --> */}
                  <Card
                    Titulo="Ativos Alterados (Mensalmente)"
                    Descricao="83"
                    Icon="fa-arrows-alt"
                    Cor="text-success"
                    Tipo="success"
                  />

                  {/*  <!-- Ativos em Estado Inativo --> */}

                  <Card
                    Titulo="Ativos em Estado Inativo"
                    Descricao="10%"
                    Icon="fa-lock"
                    Cor="text-info"
                    Tipo="info"
                  />

                  {/*  <!-- Ativos em Reparação --> */}

                  <Card
                    Titulo="Ativos em Reparação"
                    Descricao="27"
                    Icon="fa-wrench"
                    Cor="text-warning"
                    Tipo="warning"
                  />
                </div>

                {/*  <!-- Content Row --> */}

                <div className="row">
                  {/*   <!-- Area Chart --> */}
                  <AreaChart />

                  {/*  <!-- Pie Chart --> */}
                  <PieChart />
                </div>

                {/*   <!-- Content Row --> */}
                <div className="row">
                  {/*   <!-- Content Column --> */}
                  <div className="col-lg-6 mb-4">
                    {/* <!-- Project Card Example --> */}
                    <ProjectCard />
                  </div>

                  <div className="col-lg-6 mb-4">
                    {/* <!-- Illustrations --> */}
                    <Illustration />

                    {/* <!-- Approach --> */}
                    <Approach />
                  </div>
                </div>
              </div>
              {/*   <!-- /.container-fluid --> */}
            </div>
            {/*   <!-- End of Main Content -->

            <!-- Footer --> */}
            <Footer />
            {/* <!-- End of Footer --> */}
          </div>
          {/*  <!-- End of Content Wrapper --> */}
        </div>
        {/*  <!-- End of Page Wrapper -->

                                <!-- Scroll to Top Button--> */}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>

        {/*  <!-- Logout Modal--> */}
        <Logout />
      </body>
    </div>
  );
}

export default Dashboard;
