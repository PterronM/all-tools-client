import { Link } from "react-router-dom";
import CreateAveria from "./CreateAveria";
import ListAveriasAdm from "./ListAveriasAdm";
import ListRepuestosAdm from "./ListRepuestosAdm";

function PerfAdm() {
  return (
    <div className="d-flex flex-column">
      <div className="mt-3 d-flex justify-content-evenly">
        <div className="solicitudes gap-2">
          <ListRepuestosAdm />
        </div>

        <div className="averias  ">
          <ListAveriasAdm />
        </div>
      </div>

      <Link
        className="d-flex justify-content-center mt-5"
        to="/create-averia"
        element={<CreateAveria />}
      >
        <p className="textBtn">Averia</p>
      </Link>
    </div>
  );
}

export default PerfAdm;
