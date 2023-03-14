import { Link } from "react-router-dom";
import CreateAveria from "./CreateAveria";
import ListAveriasAdm from "./ListAveriasAdm";
import ListRepuestosAdm from "./ListRepuestosAdm";

function PerfAdm() {
  return (
    <div className="d-flex flex-column">
      <div className="mt-3 d-flex justify-content-around flex-wrap">
        <div className="solicitudes">
          <ListRepuestosAdm />
        </div>

        <div className="averias">
          <ListAveriasAdm />
        </div>
      </div>

      <div className="d-flex justify-content-center">
      <Link
        className="btnPerfTec d-flex justify-content-center mt-5"
        to="/create-averia"
        element={<CreateAveria />}
      >
        <p>Crear Averia</p>
      </Link>
      </div>
   
    </div>
  );
}

export default PerfAdm;
