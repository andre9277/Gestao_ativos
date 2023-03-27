import axios from "axios";
import { useStateContext } from "./context/ContextProvider.jsx";

//Utilização da libraria Axios para realizar HTTP requests

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
}); //criado uma instância do axios com um baseURL que é obtido pela variável .env

//Dois interceptors (um para o request e outro para a response)

//Adiciona autorização com um JWT access token retirado do localStorage
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

//Verifica o status da resposta e realiza a ação conforme o código que recebe
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    //401: sem autorização (remove o access token do local storage)
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
//exportado , deste modo pode ser utilizado para realizar HTTP requests
