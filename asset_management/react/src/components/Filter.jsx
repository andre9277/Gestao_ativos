import React from "react";

const Filter = ({
  assets,
  users,
  filterInv,
  resetFilter,
  selectedInv,
  filterOp,
  selectedOp,
}) => {
  return (
    <div className="filter">
      <div className="filter-user">
        Utilizador:{""}
        <select>
          <option>Selecione o utilizador...</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {" "}
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-user">
        Operação:{""}
        <select value={selectedOp} onChange={filterOp}>
          {" "}
          <option>Selecione a operação...</option>
          <option value="Pesquisa">Pesquisa</option>
          <option value="Atualiza">Atualiza</option>
          <option value="Apaga">Apaga</option>
          <option value="Adiciona">Adiciona</option>
        </select>
      </div>
      <div className="filter-user">
        NºInventário:{""}
        <select value={selectedInv} onChange={filterInv}>
          <option value={null}>Selecione o nºinventário...</option>
          {assets.map((asset) => (
            <option key={asset.id} value={asset.numb_inv}>
              {" "}
              {asset.numb_inv}
            </option>
          ))}
        </select>
        <button onClick={resetFilter}>Limpar filtro</button>
      </div>
    </div>
  );
};

export default Filter;
