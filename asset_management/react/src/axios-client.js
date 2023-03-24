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
import { useStateContext } from "./context/ContextProvider.jsx";

//Cliente axios
const axiosClient = axios.create({
  //Localização da API
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

//Interceptors são funções que serão executadas antes dos requests

//Request Interceptor
//Alteramos o objeto config antes de enviar
axiosClient.interceptors.request.use((config) => {
  //Vai buscar o valor do token
  const token = localStorage.getItem("ACCESS_TOKEN");

  //Alteramos os headers e passamos o token do utilizador
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

//Response Interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //Resposta vinda do servidor
    const { response } = error; //destruct a resposta e fica com a resposta

    //401: Request for realizado e a resposta nos diz que o utilizador não tem permissão
    if (response.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
      // window.location.reload();
    } else if (response.status === 404) {
      //Show not found
    }

    throw error;
  }
);

export default axiosClient;
