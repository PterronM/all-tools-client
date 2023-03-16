import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import {Link, useNavigate } from "react-router-dom";
import { getRepuestosIdService} from "../services/repuestos.services";



function ListRepuestos() {

    const redirect = useNavigate();

    const [allRepuestos, setAllRepuestos] = useState(null);
    const [isFeaching, setIsFeaching] = useState(true);
  
    useEffect(() => {
      getData();
    }, []);
  
    const getData = async () => {
      setIsFeaching(true);
      try {
        const response = await getRepuestosIdService();
        // console.log(response);
        setAllRepuestos(response.data);
        setIsFeaching(false);
      } catch (error) {
        redirect("/error");
      }
    };
  
    if (allRepuestos === null) {
      return(
        <div className="Spinner">
          <Spinner className="spinner-grow" role="status"/>
        </div>
      )
    }
  
    return (
     <div className="boxPendi d-flex flex-column mt-3 gap-1">
      <h2 className="mb-3" style={{borderBottom:"1px solid black"}}>Solicitud de Repuestos</h2>
      {allRepuestos.map((eachRepuesto) => {
        return(
          
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
        ) 
      })}
    </div>
    );
  }

export default ListRepuestos
