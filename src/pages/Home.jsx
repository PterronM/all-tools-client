import PerfTec from "../components/PerfTec"
import PerfAdm from "../components/PerfAdm"
import { useContext, useEffect, useState } from "react";
import { getAllUserTecService } from "../services/user.services";
import { AuthContext } from "../context/auth.context";

function Home() {

  const { loggedUser } = useContext(AuthContext);
  // console.log(loggedUser)

  const [status, setStatus] = useState();

  useEffect(()=>{
    getData()
  },[])

  const getData= async ()=>{
    const response = await getAllUserTecService()
    // console.log(response.data)
    setStatus(response.data)
  }



  return (
    <div className="d-flex flex-column home" style={{height: "100vh"}}>

    {loggedUser.role === "Tecnico" ? <PerfTec/> :  <PerfAdm/>}   

    </div>
  )
}

export default Home
