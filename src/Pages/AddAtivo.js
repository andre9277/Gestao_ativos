import React from "react";

const AddAtivo = () => {
  return (
    <div>
      <div class="main-block">
        <form action="/">
          <h1>Adicionar Novo Ativo</h1>
          <fieldset>
            <legend>
              <h3>Detalhes do Ativo</h3>
            </legend>
            <div class="account-details">
              <div>
                <label>Modelo*</label>
                <input type="text" name="name" required />
              </div>
              <div>
                <label>Marca*</label>
                <input type="password" name="name" required />
              </div>
              <div>
                <label>Número de série*</label>
                <input type="text" name="name" required />
              </div>
              <div>
                <label>Número de inventário</label>
                <input type="password" name="name" />
              </div>
            </div>
          </fieldset>

          <div class="personal-details">
            <div>
              <div>
                <label>Localização*</label>
                <input type="text" name="name" required />
              </div>
              <div>
                <label>CI*</label>
                <input type="text" name="name" required />
              </div>
              <div>
                <label>Sala</label>
                <input type="text" name="name" />
              </div>
              <div>
                <label>Ala*</label>
                <input type="text" name="name" required />
              </div>
            </div>
            <div>
              <div>
                <label>Categoria*</label>
                <select>
                  <option value=""></option>
                  <option value="Computador">Computador</option>
                  <option value="Impressora">Impressora</option>
                  <option value="Telefone">Telefone</option>
                  <option value="Monitor">Monitor</option>
                  <option value="Televisão">Televisão</option>
                </select>
              </div>
              <div>
                <label>Condição*</label>
                <select>
                  <option value=""></option>
                  <option value="Computador">Novo</option>
                  <option value="Impressora">Usado</option>
                  <option value="Telefone">Reparação</option>
                  <option value="Telefone">Obsoleto</option>
                </select>
              </div>
              <div>
                <label>Estado</label>
                <select>
                  <option value=""></option>
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
              <div class="birthdate">
                <label>Data de aquisição*</label>
                <div class="bdate-block">
                  <select class="day" required>
                    <option value=""></option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>
                  <select class="mounth" required>
                    <option value=""></option>
                    <option value="January">Janeiro</option>
                    <option value="February">Fevereiro</option>
                    <option value="March">Março</option>
                    <option value="April">Abril</option>
                    <option value="May">Maio</option>
                    <option value="June">Junho</option>
                    <option value="July">Julho</option>
                    <option value="August">Agosto</option>
                    <option value="September">Setembro</option>
                    <option value="October">Outubro</option>
                    <option value="November">Novembro</option>
                    <option value="December">Dezembro</option>
                  </select>
                  <input type="text" name="name" required />
                </div>
              </div>
            </div>
            <button type="submit" href="/">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAtivo;
