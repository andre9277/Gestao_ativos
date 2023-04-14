import React from "react";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";

const AssetInfo = () => {
  const [assets, setAssets] = useState([]);
  //retorna todos os assets (mount hook é chamado 2x)
  useEffect(() => {
    getAssets();
  }, []);

  //Realiza um request access client
  const getAssets = (url) => {
    url = url || "/assets";

    axiosClient.get(url).then(({ data }) => {
      setAssets(data.data);
    });
  };

  return (
    <div>
      <div>Informação do Ativo:</div>
      <div>
        {assets.map((ast) => (
          <div>
            <li>{ast.modelo.model_name}</li>
            <li>{ast.brand.sig}</li>
            <li>{ast.category.name}</li>
            <li>{ast.numb_inv}</li>
            <li>{ast.numb_ser}</li>
            <li>{ast.entity.ent_name}</li>
            <li>{ast.units === null ? "" : ast.units.name}</li>
            <li>{ast.floor}</li>
            <li>{ast.ala}</li>
            <li>{ast.ci}</li>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetInfo;
