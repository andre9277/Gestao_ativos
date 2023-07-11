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
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";

ChartJS.register(CategoryScale, BarElement, LinearScale);

const AreaChart = ({ assets }) => {
  //initialize all assets and entities (mount hook is called 2x)
  useEffect(() => {
    getEntities();
  }, []);

  const [charts, setCharts] = useState([]);

  //Performs a client access request to entities
  const getEntities = (url) => {
    url = url || "/entities";

    axiosClient.get(url).then(({ data }) => {
      setCharts(data);
    });
  };

  //Chart (bar):
  var data = {
    labels: charts.map((x) => x.ent_name),
    datasets: [
      {
        label: "Total de ativos",
        data: charts.map((x) => {
          let count = 0;
          assets.forEach((y) => {
            if (y.ent_id === x.id) {
              count++;
            }
          });
          return count;
        }),
        borderWidth: 1,
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255,159,64,0.2)",
          "rgba(153,102,255,0.2)",
          "rgba(255,206,86,0.2)",
          "rgba(75,192,192,0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255,159,64,1)",
          "rgba(153,102,255,1)",
          "rgba(255,206,86,1)",
          "rgba(75,192,192,1)",
        ],
      },
    ],
  };
  var options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };
  return (
    <div className="col-xl-8 col-lg-7">
      <div className="card shadow mb-4">
        {/*  <!-- Card Header - Dropdown --> */}
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h5 className="m-0 font-weight-bold graf-dash-gr">
            Total de Ativos/Entidade
          </h5>
        </div>
        {/*  <!-- Card Body --> */}
        <div>
          <Bar height={400} data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AreaChart;
