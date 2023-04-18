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
      <h1>Informação do Ativo</h1>
      <div>
        {asset.id ? (
          <div className="container">
            <li>
              <label>Marca:</label> {asset.brand.sig}
            </li>
            <li>
              <label>Modelo:</label> {asset.modelo.model_name}
            </li>
            <li>
              <label>Categoria:</label> {asset.category.name}
            </li>
            <li>
              <label>Nº de Inventário:</label> {asset.numb_inv}
            </li>
            <li>
              <label>Nº de Série:</label> {asset.numb_ser}
            </li>
            <li>
              <label>Entidade:</label> {asset.entity.ent_name}
            </li>
            <li>
              <label>Unidade:</label>{" "}
              {asset.units === null ? "" : asset.units.name}
            </li>
            <li>
              <label>Unidade-contato:</label>

              {asset.units === null ? "" : asset.units.unit_contact}
            </li>
            <li>
              <label>Unidade-Morada:</label>

              {asset.units === null ? "" : asset.units.unit_address}
            </li>
            <li>
              <label>Andar:</label> {asset.floor}
            </li>
            <li>
              <label>Ala:</label> {asset.ala}
            </li>
            <li>
              <label>CI:</label> {asset.ci}
            </li>
            <li>
              <label>Data de Compra:</label> {asset.date_purch}
            </li>
            <li>
              <label>Condição:</label> {asset.cond}
            </li>
            <li>
              <label>Estado:</label> {asset.state}
            </li>
            <li>
              <label>Fornecedor:</label> {asset.suppliers.name}
            </li>
            <li>
              <label>Fornecedor-email:</label> {asset.suppliers.email}
            </li>
            <li>
              <label>Fornecedor-phone:</label> {asset.suppliers.phone}
            </li>
            <li>
              <label>Fornecedor-Morada:</label> {asset.suppliers.address}
            </li>
          </div>
        ) : (
          <div>Carregando...</div>
        )}
      </div>
    </div>
  );
};

export default AssetInfo;
