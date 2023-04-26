import React from "react";

const Filter = ({
  assets,
  users,
  filterInv,
  resetFilter,
  selectedInv,
  filterOp,
  selectedOp,
  filterUser,
  selectedUser,
}) => {
  return (
    <div className="filter">
      <div className="filter-user">
        Utilizador:{""}
        <select value={selectedUser} onChange={filterUser}>
          <option value={null}>Selecione o utilizador...</option>
          {users.map((user) => (
            <option key={user.id} value={user.name}>
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
