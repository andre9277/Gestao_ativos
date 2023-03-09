import React, { useState } from "react";
import Card from "../Componentes/Card";
import "../Estilos/Dashboard.css";
import AreaChart from "../Componentes/AreaChart";
import PieChart from "../Componentes/PieChart";
import ProjectCard from "../Componentes/ProjectCard";
import Illustration from "../Componentes/Illustration";
import Approach from "../Componentes/Approach";
import MainPage from "./MainPage";

function Dashboard() {
  return (
    <div>
      {/*  <!-- Main Content --> */}
      <div id="content">
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
      {/*   <!-- End of Main Content -->*/}
    </div>
  );
}

export default Dashboard;
