import PerfTec from "../components/PerfTec"
import PerfAdm from "../components/PerfAdm"
import { useContext} from "react";
import { AuthContext } from "../context/auth.context";

function Home() {

  const { loggedUser } = useContext(AuthContext);

  return (
    <div className="d-flex flex-column home" style={{height: "100vh"}}>

    {loggedUser.role === "Tecnico" ? <PerfTec/> :  <PerfAdm/>}   

    </div>
  )
}

export default Home
