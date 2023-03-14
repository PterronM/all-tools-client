//configuracion inicial de los servicios
import axios from "axios";

//objeto de servicios donde se haran todas las llamadas al backEnd
const service = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
});

// todas las llamadas de este service, iran acompañadas de el Token
service.interceptors.request.use((config) => {
  // interceptar la llamada justo al momento de salir para añadirle el Token

  // extraer el Token de LocalStorage
  const storedToken = localStorage.getItem("authToken");
  const tokenAndType = `Bearer ${storedToken}`;

  if (storedToken) {
    config.headers.authorization = tokenAndType;
  }

  return config;
});

export default service;