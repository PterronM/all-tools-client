
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
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
      setAllAverias(response.data);
      setIsFeaching(false);
    } catch (error) {
      redirect("/error");
    }
  };

  if (allAverias === null) {
    return(
      <div className="Spinner">
        <Spinner className="spinner-grow" role="status"/>
      </div>
    )
  }

 
  return (
    <div className="boxPendi d-flex flex-column gap-1">
      <h2 className="mb-3" style={{borderBottom:"1px solid black"}}>Averias Pendientes</h2>
      {allAverias.map(( eachAveria) => {

        return(
        <Link
            className="d-flex boxDetails text-decoration-none text-black justify-content-between"
            to={`/averia/${eachAveria._id}/details`}
            value={eachAveria._id}
          >
            <div
              className=" d-flex justify-content-between"
              key={eachAveria._id}
            >
              <p>
                <span>{eachAveria.maquina}</span>
                <br />
                <span>
                  {new Date(eachAveria.createdAt).toLocaleDateString()}{" "}
                </span>
              </p>
            </div>
            <div>
              {eachAveria.estadoAveria === "Pendiente" && <p>⏱️</p>}
              {eachAveria.estadoAveria === "Rechazada" && <p>❌</p>}
              {eachAveria.estadoAveria === "Finalizada" && <p>✅</p>}
            </div>
          </Link>
        ) 
      })}
    </div>
  );
}

export default ListAverias;
