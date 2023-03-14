import { useState } from "react";
import { useEffect, useContext } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateRepuestoId,
  repuestoDetailsService,
  deleteRepuestoId,
  updateRepuestoStatus,
} from "../services/repuestos.services";
import { AuthContext } from "../context/auth.context";

function RepuestoDetails() {
  const { loggedUser } = useContext(AuthContext);

  const redirect = useNavigate();

  const params = useParams();

  const [aceptarStatus, setAceptarStatus] = useState("Aceptada");
  const [rechazarStatus, setRechazarStatus] = useState("Rechazada");
  const [isFeching, setIsFeching] = useState(true);
  const [maquina, setMaquina] = useState("");
  const [modelo, setModelo] = useState("");
  const [nSerie, setnSerie] = useState("");
  const [imgRepuesto, setImgRepuesto] = useState("");
  const [descriptionRepuesto, setDescriptionRepuesto] = useState("");
  const [nSerieRepuesto, setnSerieRepuesto] = useState();

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const response = await repuestoDetailsService(params.idRepuesto);
      //   console.log(response);
      //   setSingleAveria(response.data);
      setIsFeching(false);
      setMaquina(response.data.maquina);
      setModelo(response.data.modelo);
      setnSerie(response.data.nSerie);
      setImgRepuesto(response.data.imgRepuesto);
      setDescriptionRepuesto(response.data.descriptionRepuesto);
      setnSerieRepuesto(response.data.nSerieRepuesto);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMaquinaChange = (e) => setMaquina(e.target.value);
  const handleModeloChange = (e) => setModelo(e.target.value);
  const handleNserieChange = (e) => setnSerie(e.target.value);
  const handleImgRepuestoChange = (e) => setImgRepuesto(e.target.value);
  const handledescriptionRepuestoChange = (e) =>
    setDescriptionRepuesto(e.target.value);
  const handlenSerieRepuestoChange = (e) => setnSerieRepuesto(e.target.value);

  const handleUpdateRepuestoService = async (event) => {
    event.preventDefault();

    const updateRepuesto = {
      maquina,
      modelo,
      nSerie,
      imgRepuesto,
      descriptionRepuesto,
      nSerieRepuesto,
    };

    try {
      await updateRepuestoId(params.idRepuesto, updateRepuesto);
      redirect("/home");
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleStatusRepuestoService = async () => {
    const updateStatus = { aceptada: aceptarStatus };
    try {
      redirect("/home");
      await updateRepuestoStatus(params.idRepuesto, updateStatus);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRechazarRepuestoService = async () =>{
  const updateStatus = {rechazada:rechazarStatus }

    try {
      redirect("/home")
      await updateRepuestoStatus(params.idRepuesto , updateStatus)
    } catch (error) {
      console.log(error)
    }
  }
  const handleDeleteRepuestoService = async () => {
    try {
      redirect("/home");
      await deleteRepuestoId(params.idRepuesto);
    } catch (error) {
      console.log(error);
    }
  };


  if (loggedUser.role === "Tecnico") {
    return (
      <div>
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
              <Form.Label htmlform="imgRepuesto">Fotos Repuesto</Form.Label>
              <Form.Control
                type="text"
                name="imgRepuesto"
                value={imgRepuesto}
                onChange={handleImgRepuestoChange}
              />
            </FormGroup>
            <br />
            <FormGroup>
              <Form.Label htmlform="descriptionAveria">Descripcion</Form.Label>
              <textarea
                className="form-control"
                rows={3}
                type="text"
                name="descriptionAveria"
                value={descriptionRepuesto}
                onChange={handledescriptionRepuestoChange}
              />
            </FormGroup>
            <br />
            <FormGroup>
              <Form.Label htmlform="nSerieRepuesto">
                Nº de Serie del Repuesto
              </Form.Label>
              <textarea
                className="form-control"
                type="text"
                name="nSerieRepuesto"
                value={nSerieRepuesto}
                onChange={handlenSerieRepuestoChange}
              />
            </FormGroup>
            <br />
            <Button
              onClick={handleUpdateRepuestoService}
              type="submit"
              className="btn btn-warning mb-3"
            >
              Actualizar
            </Button>
            <Button
              onClick={handleDeleteRepuestoService}
              type="submit"
              className="btn btn-danger mb-3"
            >
              Eliminar
            </Button>
          </Form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="d-flex flex-column justify-content-center">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
          <Form className="d-flex flex-column">
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
              <Form.Label htmlform="imgRepuesto">Fotos Repuesto</Form.Label>
              <Form.Control
                type="text"
                name="imgRepuesto"
                value={imgRepuesto}
                onChange={handleImgRepuestoChange}
              />
            </FormGroup>
            <br />
            <FormGroup>
              <Form.Label htmlform="descriptionAveria">Descripcion</Form.Label>
              <textarea
                className="form-control"
                rows={2}
                type="text"
                name="descriptionAveria"
                value={descriptionRepuesto}
                onChange={handledescriptionRepuestoChange}
              />
            </FormGroup>
            <br />
            <FormGroup>
              <Form.Label htmlform="nSerieRepuesto">
                Nº de Serie del Repuesto
              </Form.Label>
              <Form.Control
                type="text"
                name="nSerieRepuesto"
                value={nSerieRepuesto}
                onChange={handleImgRepuestoChange}
              />
            </FormGroup>
          </Form>
          <br />
          <div className="d-flex w-100 justify-content-center mt-3">
            <Form className="d-flex gap-3">
            <div className="d-flex flex-column">
            <Button
                onClick={handleUpdateRepuestoService}
                type="submit"
                className="btn btn-warning mb-3"
              >
                Actualizar
              </Button>
              <Button
                onClick={handleStatusRepuestoService}
                type="submit"
                className="btn btn-success mb-3"
              >
                Aceptar
              </Button>

            </div>
              
              <div className="d-flex flex-column">
                <Button
                  onClick={handleRechazarRepuestoService}
                  type="submit"
                  className="btn btn-primary mb-3"
                >
                  Rechazar
                </Button>
                <Button
                  onClick={handleDeleteRepuestoService}
                  type="submit"
                  className="btn btn-danger mb-3"
                >
                  Eliminar
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default RepuestoDetails;
