import React from "react";

const ReportPage = () => {
  return (
    <div>
      <div className="tb-user">
        <h1>Relatórios</h1>
        <div className="tb-btn-user">
          <button className="btn-add">Download</button>
        </div>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Ativo</th>
              <th>Local Anterior</th>
              <th>Local Atual</th>
              <th>Utilizador</th>
              <th>Movido em</th>
              <th></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportPage;
