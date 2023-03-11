
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAveriasIdService} from "../services/averias.services";

function ListAverias() {

  const redirect = useNavigate();

  const [allAverias, setAllAverias] = useState(null);
  const [isFeaching, setIsFeaching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsFeaching(true);
    try {
      const response = await getAveriasIdService();
      // console.log(response);
      setAllAverias(response.data);
      setIsFeaching(false);
    } catch (error) {
      redirect("/error");
    }
  };

  if (allAverias === null) {
    return <h3>Buscando</h3>;
  }

 
  return (
    <div className="boxPendi d-flex flex-column mt-3">
      <h2>Averias Pendientes</h2>
      {allAverias.map((eachAveria) => {
        return(
          
          <div className="d-flex justify-content-around w-75" key={eachAveria._id}>
            <Link className="text-decoration-none" to = {`/averia/${eachAveria._id}/details`} value={eachAveria._id}>{eachAveria.createdAt}{eachAveria.maquina}</Link>
            {/* <div className="estado"> */}
            {eachAveria.estadoAveria === "Pendiente"  && <p>⏱️</p>}  
            {eachAveria.estadoAveria === "Rechazada" && <p>❌</p>} 
            {eachAveria.estadoAveria === "Finalizada" && <p>✅</p>}
            {/* </div> */}
          </div>
        ) 
      })}
    </div>
  );
}

export default ListAverias;
