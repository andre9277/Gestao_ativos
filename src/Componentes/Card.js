import React from "react";

const Card = ({ Titulo, Descricao, Icon, Cor, Tipo }) => {
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className={`card border-left-${Tipo} shadow h-100 py-2`}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div
                className={`text-xs font-weight-bold ${Cor} text-uppercase mb-1`}
              >
                {Titulo}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {Descricao}
              </div>
            </div>
            <div className="col-auto">
              <i className={`fas ${Icon} fa-2x text-gray-300`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
