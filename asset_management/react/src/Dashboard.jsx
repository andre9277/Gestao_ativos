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
import React from "react";
import Card from "./components/Card";
import "./styles/Dashboard.css";
import AreaChart from "./components/AreaChart";
import PieChart from "./components/PieChart";
import { useState, useLayoutEffect } from "react";
import axiosClient from "./axios-client.js";

function Dashboard() {
  useLayoutEffect(() => {
    getTotalAssets();
    getRepairs();
  }, []);

  const [assetTotal, setAssetTotal] = useState("");
  const [repairAsset, setRepairAsset] = useState([]);

  //Performs a client access request
  const getTotalAssets = (url) => {
    url = url || "/assetsC";
    axiosClient.get(url).then(({ data }) => {
      setAssetTotal(data);
    });
  };

  const getRepairs = (url) => {
    url = url || "/countRepair";
    axiosClient.get(url).then(({ data }) => {
      setRepairAsset(data);
    });
  };
  return (
    <div id="content-wrapper" className="d-flex flex-column">
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
            {/*  <!-- Total of Assets --> */}
            <Card
              Titulo="Total de ativos"
              Descricao={assetTotal}
              Icon="fa-laptop"
              Cor="text-primary"
              Tipo="primary"
            />

            {/*  <!-- Assets Changed --> */}
            <Card
              Titulo="Ativos Alterados - Média Mensal"
              Descricao=""
              Icon="fa-arrows-alt"
              Cor="text-success"
              Tipo="success"
            />

            {/*  <!-- Assets in Repair --> */}

            <Card
              Titulo="Ativos em Reparação"
              Descricao={repairAsset}
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
              {/*  <ProjectCard /> */}
            </div>

            <div className="col-lg-6 mb-4">
              {/* <!-- Illustrations --> */}
              {/*  <Illustration /> */}

              {/* <!-- Approach --> */}
              {/*  <Approach /> */}
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
