import { createContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
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

      setIsLoggedIn(true);
      setLoggedUser(response.data);
      setIsFetching(false)
    } catch (error) {

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
      <div className="Spinner">
       <Spinner className="spinner-grow w-30 align-content-center" role="status"/>
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
