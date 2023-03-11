import { Link } from "react-router-dom";
import CreateAveria from "./CreateAveria";
import SolicitudRepuesto from "./SolicitudRepuesto";

import ListAverias from "./ListAverias";
import ListRepuestos from "./ListRepuestos";

function PerfTec() {


  return (
    <div>
      <Link to="/create-averia" element={<CreateAveria/>}><button>Crear Averia</button></Link>
      <Link to="/create-repuesto" element={<SolicitudRepuesto/>}><button>Solicitar Repuesto</button></Link>
<br />
      <ListAverias/>
      <ListRepuestos/>

    </div>
  );
}

export default PerfTec;
