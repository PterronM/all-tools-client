import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { getAllAveriasService } from "../services/averias.services";

function ListAveriasAdm() {

  const [allAveria, setAllAveria] = useState(null);
  const [isFeaching, setIsFeaching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await getAllAveriasService()
    // console.log(response.data)
    setAllAveria(response.data);
    setIsFeaching(false);
  };

  if (allAveria === null) {
    return <h3>Buscando...</h3>;
  }


  return (
    <div className="boxPendiAdm d-flex flex-column gap-2">
      <p className="mb-3" style={{ borderBottom: "1px solid black" }}>Lista Averias</p>
      {allAveria.map((eachAveria) => {
        return(
          
          <div className="boxDetails d-flex justify-content-between bg-white" key={eachAveria._id}>
            <Link className="contenido-box text-decoration-none text-black" to = {`/averia/${eachAveria._id}/details`} value={eachAveria._id}><span>{eachAveria.maquina}</span><br /><span>{new Date(eachAveria.createdAt).toLocaleDateString()} </span>
            </Link>
            <div className="estado">
            {eachAveria.estadoAveria === "Pendiente"  && <p>⏱️</p>}  
            {eachAveria.estadoAveria === "Rechazada" && <p>❌</p>} 
            {eachAveria.estadoAveria === "Finalizada" && <p>✅</p>}

            </div>
            
          </div>
        ) 
      })}
    </div>
  );
}

export default ListAveriasAdm
