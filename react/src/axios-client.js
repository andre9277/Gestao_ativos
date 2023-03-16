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
import axios from "axios";

//Criar acesso ao client:
const axiosClient = axios.create({
    baseURL: `${import.meta.env.REACT_APP_BASE_URL}/api`,
});

export default axiosClient;

//axios utiliza o seguinte interceptor antes de fazer qualquer REQUEST (como parametro da função passamos o objeto config)
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.get("ACCESS_TOKEN"); // acesso ao token que está na localStorage

    //alteramos os headers do config
    config.headers.Authorization = `Bearer ${token}`; //autenticação Bearer(autenticação token)

    return config; //tambem retornamos o config object
});

//RESPONSE
axios.interceptors.response.use(
    (response) => {
        return response; //retorna a resposta bem sucedida
    },
    (error) => {
        //quando é rejeitada executa esta função
        const { response } = error; //destructuring do erro, ficando só com a reposta

        if (response.status === 401) {
            //erro 401: reuest foi feito, mas o utiizador não tem autorização ou token foi inválido
            localStorage.removeItem("ACCESS_TOKEN"); //removemos o token
        }

        throw error;
    }
);
