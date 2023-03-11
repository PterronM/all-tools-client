import { createContext, useEffect, useState } from "react";
import { verifyService } from "../services/auth.services";

const AuthContext = createContext();

function AuthWrapper(props) {
  // Tendremos los estados de auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  // Tendremos funciones de auth

  //Esta funcion contacta con el BE para validar el token
  const authenticaUser = async () => {
    setIsFetching(true)
    try {
      const response = await verifyService();
      // console.log("Token Valido");
      // console.log(response);
      setIsLoggedIn(true);
      setLoggedUser(response.data);
      setIsFetching(false)
    } catch (error) {
      // console.log("Token NO valido");
      // console.log(error);
      setIsLoggedIn(false);
      setLoggedUser(null);
      setIsFetching(false)
    }
  };

  useEffect(() => {
    authenticaUser(); //Autentica el token del usuario cuando visita la pagina o refresca la pag.
  }, []);

  const passedContext = {
    isLoggedIn,
    loggedUser,
    authenticaUser,
  };

  if (isFetching === true) {
    return (
      <div className="App">
        <h2>... Validando credenciales</h2>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
