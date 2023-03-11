import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";


function IsPrivate(props) {

    const {isLoggedIn} = useContext(AuthContext)

    if(isLoggedIn === true){
        //Solo renderiza el componente si el usuario esta activo
        return (props.children)
    }else{
        return <Navigate to="/"/>
    }


}

export default IsPrivate
