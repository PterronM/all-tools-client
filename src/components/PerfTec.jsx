import { Link } from "react-router-dom";
import CreateAveria from "./CreateAveria";
import SolicitudRepuesto from "./SolicitudRepuesto";

import ListAverias from "./ListAverias";
import ListRepuestos from "./ListRepuestos";

function PerfTec() {


  return (
    <div className="d-flex flex-column mt-5">
      <div className="d-flex justify-content-around gap-3 mb-5">
        <Link className="btnPerfTec" to="/create-averia" element={<CreateAveria/>}><p className="textBtn">Averia</p></Link>
        <Link className="btnPerfTec" to="/create-repuesto" element={<SolicitudRepuesto/>}><p className="textBtn">Solicitud</p></Link>
      </div>

      <div>
        <ListAverias/>
        <ListRepuestos/>
      </div>

      </div>
  );
}

export default PerfTec;
