import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services.js";

import { AuthContext } from "../../context/auth.context";

function Login() {
  const { authenticaUser } = useContext(AuthContext);

  const redirect = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    const userCredentials = {
      email,
      password,
    };

    try {
      //TODO--1---contactamos con el BE para pasarle las credenciales del usuario y validarlas
      const response = await loginService(userCredentials);
      //**console.log(response);

      //TODO--2----Recibir el token del backend y almacenarlo en el localStorage------
      localStorage.setItem("authToken", response.data.authToken);

      //TODO --3----Establecer mi contexto para decirle a toda la APP que el usuario esta activo
      redirect("/home");
      authenticaUser();
    } catch (error) {
      //vamos a determinar el tipo de error que recibimos, y actuar diferente en cada caso
      // console.log(error.response.status) //**-----codigo del error enviado
      // console.log(error.response.data.errorMessage) //**----- Mensaje de error que dio el fallo
      if (error.response.status === 400) {
        //Mostramos al usuario como solventar el problema
        setErrorMessage(error.response.data.errorMessage);
      } else {
        redirect("/error");
      }
    }
  };

  return (
    <div className="login d-flex flex-column justify-content-center mt-5">

    <div className="d-flex justify-content-center mb-5 mt-5"><img src="logo.png" alt="" width={200} /></div>      
      <form onSubmit={handleLogin}>
        <div className="input-login">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        </div>
        <br />
        <div className="input-login">
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        </div>
       
        <br />
        {errorMessage !== "" ? <p>{errorMessage}</p> : null}
        <br />
        <button className="btn loginBtn btn-block p-2" type="submit">Acceder</button>
      </form>
    </div>
  );
}

export default Login;
