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


Project developed under the EstágiAP XXI Program.
Advisor: Emanuel Gonçalves
Autor: André Ferreira
Local: Hospital de Braga, EPE
Department: Serviço de Sistema de Informação

All the changes made to enable the implementation of the desired development tools were made by André Ferreira.
*/
import React from "react";
import Card from "./components/Card";
import "./styles/Dashboard.css";
import AreaChart from "./components/AreaChart";
import PieChart from "./components/PieChart";
import { useState, useEffect } from "react";
import axiosClient from "./axios-client.js";
import AreaChartUser from "./components/AreaChartUser";
import PieChartActive from "./components/PieChartActive";

function Dashboard() {
  //Gets the total assets
  const [assetTotal, setAssetTotal] = useState("");
  //Data to store all the assets
  const [assets, setAssets] = useState([]);
  //Saves the assets State
  const [assetsState, setAssetsState] = useState([]);

  //if the user change the page it aborts
  useEffect(() => {
    const abortController = new AbortController();
    getTotalAssets(abortController.signal);
    getAssets(abortController.signal);
    getAssetsState(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, []);

  //Performs a client access request
  const getTotalAssets = (signal, url) => {
    url = url || "/assetsC";
    axiosClient.get(url, { signal }).then(({ data }) => {
      setAssetTotal(data);
    });
  };

  //Gets the assets to set the get dashboard data
  const getAssets = (signal, url) => {
    url = url || "/getDashb";
    //Uses the axiosClient
    axiosClient.get(url, { signal }).then(({ data }) => {
      // update the state with all the assets
      setAssets(data);
    });
  };

  //Gets the asset state
  const getAssetsState = (signal, url) => {
    url = url || "/indexState";
    axiosClient.get(url, { signal }).then(({ data }) => {
      // update the state with all the assets
      setAssetsState(data);
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
            <h1 className="graf-dash">Dashboard</h1>
          </div>

          {/*  <!-- Content Row --> */}
          <div className="row-dash">
            {/*  <!-- Total of Assets --> */}
            <Card
              Titulo="Total de Ativos"
              Descricao={assetTotal.total}
              Icon="fa-laptop"
              Cor="text-primary"
              Tipo="primary"
              LinkCard="assets"
              Space="mb-1-dash"
            />

            {/*  <!-- Assets Changed --> */}
            <Card
              Titulo="Média Mensal - Movimento Ativos"
              Descricao={assetTotal.countChanged}
              Icon="fa-arrows-alt"
              Cor="text-success"
              Tipo="success"
              LinkCard="report"
              Space="mb-1"
            />

            {/*  <!-- Assets in the reparation --> */}
            <Card
              Titulo="Ativos em Reparação"
              Descricao={assetTotal.totalRep}
              Icon="fa-wrench"
              Cor="text-warning"
              Tipo="warning"
              LinkCard="assetsRep"
              Space="mb-1-dash"
            />
            {/*  <!-- Assets that are "Obsoletos" --> */}
            <Card
              Titulo="Ativos Obsoletos"
              Descricao={assetTotal.allocationCounts}
              Icon="fa-warehouse"
              Cor="text-info"
              Tipo="info"
              LinkCard="assetsObs"
              Space="mb-1-dash"
            />
          </div>

          {/*  <!-- Content Row --> */}

          <div className="row-dash">
            {/*   <!-- Area Chart Assets/Entity --> */}
            <AreaChart assets={assets} />
            {/*  <!-- Pie Chart Asset/Category --> */}
            <PieChart assets={assets} />
            {/*  <!-- Pie Chart Active --> */}
            <PieChartActive assets={assetsState} />
            {/*  <!-- Area Chart Total Movement/User --> */}
            <AreaChartUser />
          </div>
        </div>
        {/*   <!-- /.container-fluid --> */}
      </div>
      {/*   <!-- End of Main Content -->*/}
    </div>
  );
}

export default Dashboard;
