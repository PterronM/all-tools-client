import { useEffect, useState } from "react";
import { getAllRepuestosService } from "../services/repuestos.services";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function ListRepuestosAdm() {
  const redirect = useNavigate()
  const [allRepuestos, setAllRepuestos] = useState(null);
  const [isFeaching, setIsFeaching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getAllRepuestosService();
      // console.log(response.data)
      setAllRepuestos(response.data);
      setIsFeaching(false);
    } catch (error) {
      redirect("/home")
    }

  };

  if (allRepuestos === null) {
    return (
      <div className="Spinner">
        <Spinner className="spinner-grow" role="status" />
      </div>
    );
  }

  return (
    <div className="boxPendi d-flex flex-column gap-2">
      <h2 className="mb-3" style={{ borderBottom: "1px solid black" }}>
        Solicitud Repuesto
      </h2>
      {allRepuestos.map((eachRepuesto) => {
        return (
          <Link
            className="d-flex boxDetails text-decoration-none text-black justify-content-between"
            to={`/repuesto/${eachRepuesto._id}/details`}
            value={eachRepuesto._id}
          >
          <div
              className=" d-flex justify-content-between"
              key={eachRepuesto._id}
            >
            <p>
              <span>{eachRepuesto.descriptionRepuesto}</span>
              <br />
              <span>{eachRepuesto.maquina}</span>
              <br />
              <span>
                {new Date(eachRepuesto.createdAt).toLocaleDateString()}{" "}
              </span>
            </p> 
            </div> 
              <div>
                {eachRepuesto.estadoRepuesto === "Pendiente" && <p>⏱️</p>}
                {eachRepuesto.estadoRepuesto === "Rechazada" && <p>❌</p>}
                {eachRepuesto.estadoRepuesto === "Aceptada" && <p>✅</p>}
              </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ListRepuestosAdm;
