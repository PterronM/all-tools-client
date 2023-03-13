import { useState } from "react";
import { useEffect } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  averiaDetailsService,
  updateAveriaId,
  updateAveriaStatus,
  deleteAveriaId,
} from "../services/averias.services";

function AveriaDetails() {
  const redirect = useNavigate();

  const params = useParams();
  //   console.log(params);
  const [finalizar, setFinalizar] = useState("finalizar");
  const [isFeching, setIsFeching] = useState(true);
  const [maquina, setMaquina] = useState("");
  const [modelo, setModelo] = useState("");
  const [nSerie, setnSerie] = useState("");
  const [imgAveria, setImgAveria] = useState("");
  const [descriptionAveria, setdescriptionAveria] = useState("");

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const response = await averiaDetailsService(params.idAveria);
      //   console.log(response);
      //   setSingleAveria(response.data);
      setIsFeching(false);
      setMaquina(response.data.maquina);
      setModelo(response.data.modelo);
      setnSerie(response.data.nSerie);
      setImgAveria(response.data.imgAveria);
      setdescriptionAveria(response.data.descriptionAveria);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMaquinaChange = (e) => setMaquina(e.target.value);
  const handleModeloChange = (e) => setModelo(e.target.value);
  const handleNserieChange = (e) => setnSerie(e.target.value);
  const handleImgAveriaChange = (e) => setImgAveria(e.target.value);
  const handledescriptionAveriaChange = (e) =>
    setdescriptionAveria(e.target.value);

  const handleUpdateAveriaService = async (event) => {
    event.preventDefault();

    const updateAveria = {
      maquina,
      modelo,
      nSerie,
      imgAveria,
      descriptionAveria,
    };

    try {
      await updateAveriaId(params.idAveria, updateAveria);
      redirect("/home");
    } catch (error) {
      console.log(error);
    }
  };
  const handleFinalizarAveriaService = async () => {
    const updateStatusFinal = { finalizar };
    try {
        redirect("/home");
      await updateAveriaStatus(params.idAveria, updateStatusFinal);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteAveriaService = async () => {
    try {
      redirect("/home");
      await deleteAveriaId(params.idAveria);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
 

      {isFeching === true ? (
        <h3>Buscando ....</h3>
      ) : (
        <div className="details d-flex justify-content-center">
          <Form className="d-flex flex-column w-50">
            <FormGroup className="justify-content-center">
              <Form.Label htmlform="Maquina">Maquina</Form.Label>
              <Form.Control
                type="text"
                name="Maquina"
                value={maquina}
                onChange={handleMaquinaChange}
              />
            </FormGroup>
            <br />
            <FormGroup>
              <Form.Label htmlform="modelo">Modelo</Form.Label>
              <Form.Control
                type="text"
                name="modelo"
                value={modelo}
                onChange={handleModeloChange}
              />
            </FormGroup>
            <br />
            <FormGroup>
              <Form.Label htmlform="nSerie">Nª de Serie</Form.Label>
              <Form.Control
                type="text"
                name="nSerie"
                value={nSerie}
                onChange={handleNserieChange}
              />
            </FormGroup>
            <br />
            <FormGroup>
              <Form.Label htmlform="imgAveria">Fotos Averia</Form.Label>
              <Form.Control
                src={imgAveria} alt="averia" width={50}
                type="text-area"
                name="imgAveria"
                value={imgAveria}
                onChange={handleImgAveriaChange}
              />
            </FormGroup>
            <br />
            <FormGroup>
              <Form.Label htmlform="descriptionAveria">Descripcion</Form.Label>
              <textarea
                className="form-control"
                rows={4}
                type="text"
                name="descriptionAveria"
                value={descriptionAveria}
                onChange={handledescriptionAveriaChange}
              />
            </FormGroup>
            <br />
            <br />
            <Button
              onClick={handleUpdateAveriaService}
              type="submit"
              className="btn btn-warning mb-3"
            >
              Actualizar
            </Button>
            <Button
              onClick={handleDeleteAveriaService}
              type="submit"
              className="btn btn-danger mb-3"
            >
              Eliminar
            </Button>
            <Button
              onClick={handleFinalizarAveriaService}
              type="submit"
              className="btn btn-success mb-3"
            >
              Finalizar
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}
export default AveriaDetails;
