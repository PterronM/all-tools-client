import PerfTec from "../components/PerfTec"
import PerfAdm from "../components/PerfAdm"

function Home() {
  return (
    <div className="d-flex flex-column home" style={{backgroundColor: "white" ,height: "100vh"}}>

    {/* Componentes para Tecnico */}

      <PerfTec/>


    {/* Componentes para Adm */}

      <PerfAdm/>


    </div>
  )
}

export default Home
