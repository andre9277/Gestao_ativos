import React from "react";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useNavigate, useParams } from "react-router-dom";

const AssetInfo = () => {
  //Ficamos com o ID
  let { id } = useParams();

  //Lista de utilizadores:
  const [asset, setAsset] = useState({
    id: null,
    numb_inv: "",
    numb_ser: "",
    cond: "",
    ala: "",
    ci: "",
    state: "",
    floor: "",
    category: {
      id: "",
      name: "",
    },
    cat_id: "",
    supplier_id: "",
    brand: {
      id: "",
      name: "",
      sig: "",
    },
    brand_id: "",
    ent_id: "",
    date_purch: "",
    model_id: "",
    modelo: {
      id: "",
      model_name: "",
    },
    unit_id: "",
    entity: {
      id: "",
      ent_name: "",
      ent_type: "",
    },
    units: "",
  });

  if (id) {
    //Realiza um request access client
    axiosClient.get(`/assets/${id}`).then(({ data }) => {
      setAsset(data);
    });
  }

  return (
    <div>
      <div>Informação do Ativo:</div>
      <div>
        {asset.id ? (
          <div>
            <li>Moldelo: {asset.modelo.model_name}</li>
            <li>Marca: {asset.brand.sig}</li>
            <li>Categoria: {asset.category.name}</li>
            <li>Número de Inventário: {asset.numb_inv}</li>
            <li>Número de Série: {asset.numb_ser}</li>
            <li>Entidade: {asset.entity.ent_name}</li>
            <li>Unidade: {asset.units === null ? "" : asset.units.name}</li>
            <li>
              Unidade contato:{" "}
              {asset.units.unit_contact === null
                ? ""
                : asset.units.unit_contact}
            </li>
            <li>Unidade Morada: {asset.units.unit_address}</li>
            <li>Andar: {asset.floor}</li>
            <li>Ala: {asset.ala}</li>
            <li>CI: {asset.ci}</li>
            <li>Data de Compra: {asset.date_purch}</li>
            <li>Condição: {asset.cond}</li>
            <li>Estado: {asset.state}</li>
            <li>Fornecedor: {asset.suppliers.name}</li>
            <li>Fornecedor email: {asset.suppliers.email}</li>
            <li>Fornecedor phone: {asset.suppliers.phone}</li>
            <li>Fornecedor Morada: {asset.suppliers.address}</li>
          </div>
        ) : (
          <div>Carregando...</div>
        )}
      </div>
    </div>
  );
};

export default AssetInfo;
