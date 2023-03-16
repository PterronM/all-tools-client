import { useEffect, useState } from "react";
import { getAllRepuestosService } from "../services/repuestos.services";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function ListRepuestosAdm() {
  const [allRepuestos, setAllRepuestos] = useState(null);
  const [isFeaching, setIsFeaching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await getAllRepuestosService();
    // console.log(response.data)
    setAllRepuestos(response.data);
    setIsFeaching(false);
  };

  if (allRepuestos === null) {
    return(
      <div className="Spinner">
        <Spinner className="spinner-grow" role="status"/>
      </div>
    )
  }

  return (
    <div className="d-flex flex-column gap-2">
      <p className="mb-3" style={{ borderBottom: "1px solid black" }}>Solicitud Repuesto</p>
      {allRepuestos.map((eachRepuesto) => {
        return(
          
          <div className="boxDetails d-flex justify-content-between bg-white" key={eachRepuesto._id}>
            <Link className="text-decoration-none text-black contenido-box" to = {`/repuesto/${eachRepuesto._id}/details`} value={eachRepuesto._id}><span>{eachRepuesto.descriptionRepuesto}</span><br /><span>{eachRepuesto.maquina}</span><br /><span>{new Date(eachRepuesto.createdAt).toLocaleDateString()} </span>
            </Link>
            <div className="estado">
            {eachRepuesto.estadoRepuesto === "Pendiente"  && <p>⏱️</p>}  
            {eachRepuesto.estadoRepuesto === "Rechazada" && <p>❌</p>} 
            {eachRepuesto.estadoRepuesto === "Aceptada" && <p>✅</p>}

            </div>
            
          </div>
        ) 
      })}
    </div>
  );
}

export default ListRepuestosAdm;
