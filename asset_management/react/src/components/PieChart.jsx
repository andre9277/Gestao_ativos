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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";

ChartJS.register(Tooltip, Legend, ArcElement);

const PieChart = ({ assets }) => {
  //return all assets(mount hook its called 2x)
  useEffect(() => {
    getCategories();
  }, []);

  const [charts, setCharts] = useState([]);

  //Performs a client access request to categories
  const getCategories = (url) => {
    url = url || "/categories";

    axiosClient.get(url).then(({ data }) => {
      setCharts(data);
    });
  };

  //Performs a client access request to assets

  //Chart (Pie)
  var data = {
    labels: charts.map((x) => x.name),
    datasets: [
      {
        label: "",
        data: charts.map((x) => {
          let count = 0;
          assets.forEach((y) => {
            if (y.cat_id === x.id) {
              count++;
            }
          });
          return count;
        }),
        borderWidth: 1,
        backgroundColor: [
          "rgba(255,99,132,0.2)",
          "rgba(54,162,235,0.2)",
          "rgba(255,206,86,0.2)",
          "rgba(75,192,192,0.2)",
          "rgba(153,102,255,0.2)",
          "rgba(255,159,64,0.2)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54,162,235,1)",
          "rgba(255,206,86,1)",
          "rgba(75,192,192,1)",
          "rgba(153,102,255,1)",
          "rgba(255,159,64,1)",
        ],
      },
    ],
  };
  var options = {
    maintainAspectRatio: false,

    legend: {
      fontSize: 26,
    },
  };
  return (
    <div className="col-xl-4 col-lg-7">
      <div className="card shadow mb-2">
        {/*  <!-- Card Header - Dropdown --> */}
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h5 className="m-0 font-weight-bold graf-dash">
            Quantidade de Ativos/Categoria
          </h5>
        </div>
        {/*  <!-- Card Body --> */}
        <div>
          {/* Pie graphic */}
          <Pie height={400} data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
