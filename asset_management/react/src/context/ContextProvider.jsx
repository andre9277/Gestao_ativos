import { createContext, useContext, useState } from "react";

//Gestão do estado utilizando um objeto Context
//Também armazena alguns dados no localStorage

//Valores iniciais e algumas funções para realizar atualizações
const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
});

//Função responsável por definir o estado inicial do utilizador, token e notificação utilizando o useState
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [notification, _setNotification] = useState("");

  //Grava o token no localstorage do browser, assim guarda o token quando o utilizador realiza refresh
  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  //Mensagem apresentada ao utilizador por um período de tempo
  const setNotification = (message) => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification("");
    }, 5000);
  };

  //
  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        notification,
        setNotification,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
