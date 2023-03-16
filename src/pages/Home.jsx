import PerfTec from "../components/PerfTec"
import PerfAdm from "../components/PerfAdm"
import { useContext} from "react";
import { AuthContext } from "../context/auth.context";

function Home() {

  const { loggedUser } = useContext(AuthContext);

  return (
    <div className="d-flex flex-column home">
    <div className="container-home">
    {loggedUser.role === "Tecnico" ? <PerfTec/> :  <PerfAdm/>}   
    </div>
    </div>
  )
}

export default Home
