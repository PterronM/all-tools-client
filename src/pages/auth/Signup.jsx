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
        //Mostramos al usuario como solventar el problema
        setErrorMessage(error.response.data.errorMessage);
      } else {
        redirect("/error");
      }
    }
  };

  return (
    <div>
      <h1>Registro</h1>

      <form onSubmit={handleSignup}>
        <label>Nombre:</label>
        <input
          type="nombre"
          name="nombre"
          value={nombre}
          onChange={handlNombreChange}
        />
    <br />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
    <br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
    <br />
        <label>Teléfono:</label>
        <input
          type="telefono"
          name="telefono"
          value={telefono}
          onChange={handleTelefonoChange}
        />
    <br />

        {errorMessage !== "" ? <p>{errorMessage}</p> : null}

        <br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
