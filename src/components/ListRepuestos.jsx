import { useEffect, useState } from "react";
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
        console.log(response);
        setAllRepuestos(response.data);
        setIsFeaching(false);
      } catch (error) {
        redirect("/error");
      }
    };
  
    if (allRepuestos === null) {
      return <h3>Buscando</h3>;
    }
  
    return (
     <div className="mt-3">
      <h2>Solicitud de Repuestos</h2>
      {allRepuestos.map((eachRepuesto) => {
        return(
          
          <div className="d-flex justify-content-center" key={eachRepuesto._id}>
            <Link to = {`/repuesto/${eachRepuesto._id}/details`} value={eachRepuesto._id}>{eachRepuesto.maquina}</Link>
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

export default ListRepuestos