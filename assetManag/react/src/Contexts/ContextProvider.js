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
import React, { createContext, useContext, useState } from "react";

//Context Provider permite a transferencia de dados pelos componentes sem passar manualmente todos os níveis da árvore de componentes
//Dados podem ser considerados "global"

const StateContext = createContext({
    currentUser: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

const ContextProvider = ({ children }) => {
    //definir alguns states:
    const [user, setUser] = useState({
        name: "André Ferreira",
    });
    //const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [token, _setToken] = useState(123);

    //função que permite realizar o set token(poe o token na localStorage)
    const setToken = (token) => {
        _setToken(token);
        //guardar o token na local storage
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export default ContextProvider;

//Função que retorna o useContext state context
export const useStateContext = () => useContext(StateContext);
