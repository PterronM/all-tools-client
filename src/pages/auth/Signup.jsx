import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../services/auth.services.js";

function Signup() {
  
  const redirect = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const handlNombreChange = (e) => setNombre(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleTelefonoChange = (e) => setTelefono(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      nombre,
      email,
      password,
      telefono,
    };

    try {
      await signupService(newUser);
      redirect("/");
    } catch (error) {
     
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        redirect("/error");
      }
    }
  };

  
  return (
    <div className="login signup d-flex flex-column justify-content-center mt-5">
    <div>
      <form onSubmit={handleSignup}>
        <div className="input-login">
        <input 
          type="nombre"
          name="nombre"
          placeholder="Nombre"
          value={nombre}
          onChange={handlNombreChange}
        />
        </div>
    <br />
        <div className="input-login">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        </div>
    <br />
    <div className="input-login">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
    </div>
    <br />
      <div className="input-login">
        <input
          id= "phone"
          type="tel"
          name="telefono"
          placeholder="Telefono"
          value={telefono}
          onChange={handleTelefonoChange}
        />
      </div>
    <br />

        {errorMessage !== "" ? <p>{errorMessage}</p> : null}

        <br />
        <button className="btn loginBtn btn-block p-2" type="submit">Registrate</button>
      </form>
    </div>
    </div>
  );
}

export default Signup;
