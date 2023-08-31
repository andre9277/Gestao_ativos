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
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Tooltip, Legend, ArcElement);

const PieChartActive = ({ assets }) => {
  let activeAssetsCount = 0;
  let inactiveAssetsCount = 0;

  assets.forEach((asset) => {
    if (asset.state === "Ativo") {
      activeAssetsCount++;
    } else if (asset.state === "Inativo") {
      inactiveAssetsCount++;
    }
  });

  const data = {
    labels: ["Ativo", "Inativo"],
    datasets: [
      {
        data: [activeAssetsCount, inactiveAssetsCount],
        borderWidth: 1,
        backgroundColor: ["rgba(54,162,235,0.2)", "rgba(255,99,132,0.2)"],
        borderColor: ["rgba(54,162,235,1)", "rgba(255,99,132,1)"],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return (
    <div className="col-xl-4 col-lg-7">
      <div className="card shadow mb-2">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h5 className="m-0 font-weight-bold graf-dash-gr">
            Proporção de Ativos e Inativos
          </h5>
        </div>
        <div>
          <Pie height={400} data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PieChartActive;
