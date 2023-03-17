import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useEffect } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  averiaDetailsService,
  updateAveriaId,
  updateAveriaStatus,
  deleteAveriaId,
} from "../services/averias.services";
import { uploadImageService } from "../services/upload.services";
import ModalAveria from "./Modals/ModalAveria";

function AveriaDetails() {
  const redirect = useNavigate();

  const params = useParams();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(!show);

  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [finalizarStatus, setFinalizarStatus] = useState("Finalizada");
  const [isFeching, setIsFeching] = useState(true);
  const [maquina, setMaquina] = useState("");
  const [modelo, setModelo] = useState("");
  const [nSerie, setnSerie] = useState("");
  const [descriptionAveria, setdescriptionAveria] = useState("");

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const response = await averiaDetailsService(params.idAveria);
      //   console.log(response);
      setIsFeching(false);
      setMaquina(response.data.maquina);
      setModelo(response.data.modelo);
      setnSerie(response.data.nSerie);
      setImageUrl(response.data.imgAveria);
      setdescriptionAveria(response.data.descriptionAveria);
    } catch (error) {
      redirect("/home")
    }
  };

  const handleMaquinaChange = (e) => setMaquina(e.target.value);
  const handleModeloChange = (e) => setModelo(e.target.value);
  const handleNserieChange = (e) => setnSerie(e.target.value);
  const handleFileUpload = async (event) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    if (!event.target.files[0]) {
      return;
    }
    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);
    try {
      const response = await uploadImageService(uploadData);
      setImageUrl(response.data.imageUrl);
      setIsUploading(false);
    } catch (error) {
      // console.log(error);
      redirect("/home")
    }
  };
  const handledescriptionAveriaChange = (e) =>
    setdescriptionAveria(e.target.value);

  const handleUpdateAveriaService = async (event) => {
    event.preventDefault();

    const updateAveria = {
      maquina,
      modelo,
      nSerie,
      imgAveria: imageUrl,
      descriptionAveria,
    };

    try {
      redirect("/home");
      await updateAveriaId(params.idAveria, updateAveria);
    } catch (error) {
      redirect("/home")
    }
  };

  const handleDeleteAveriaService = async () => {
    try {
      handleClose();
      await deleteAveriaId(params.idAveria);
      redirect("/home");
    } catch (error) {
      // console.log(error);
      redirect("/home")
    }
  };

  const handleStatusAveriaService = async () => {
    const updateStatus = { finalizada: finalizarStatus };
    // console.log(updateStatus);
    try {
      redirect("/home");
      await updateAveriaStatus(params.idAveria, updateStatus);
    } catch (error) {
      // console.log(error);
      redirect("/home")
    }
  };

  return (
    <>
      <div>
        {isFeching === true ? (
          <div className="Spinner">
            <Spinner className="spinner-grow" role="status" />
          </div>
        ) : (
          <div className="d-flex flex-column justify-content-center">
          <div className="detailsRepuestoWeb mt-1 d-flex flex-column justify-content-center align-items-center">
            <Form className="d-flex flex-column w-75">
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
                <Form.Label htmlform="image">Fotos Averia</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
                {!imageUrl ? (
                  <img
                    className="imgCruz"
                    src="https://static.vecteezy.com/system/resources/previews/016/314/454/non_2x/red-cross-mark-free-png.png"
                    alt="cruz"
                    width={50}
                  ></img>
                ) : null}
                {isUploading ? (
                  <Spinner
                    className="spinner-grow"
                    animation="border"
                    role="status"
                  />
                ) : null}
                {imageUrl ? (
                  <div>
                    <img
                      className="imgDetails"
                      src={imageUrl}
                      alt="img"
                      width={100}
                    />
                  </div>
                ) : null}
              </FormGroup>
              <br />
              <FormGroup>
                <Form.Label htmlform="descriptionAveria">
                  Descripcion
                </Form.Label>
                <textarea
                  className="form-control"
                  rows={2}
                  type="text"
                  name="descriptionAveria"
                  value={descriptionAveria}
                  onChange={handledescriptionAveriaChange}
                />
              </FormGroup>
              <br />
              <br />
              <div className="d-flex w-100 justify-content-center ">
              <Form className="d-flex gap-3">
                <div className="d-flex flex-column btnDetailsRepuestoWeb">
              <Button
                onClick={handleUpdateAveriaService}
                type="submit"
                className="btn btn-warning mb-3"
              >
                Actualizar
              </Button>

              <Button onClick={handleClose} className="btn btn-danger mb-3">
                Eliminar
              </Button>
              <Button
                onClick={handleStatusAveriaService}
                type="submit"
                className="btn btn-success mb-3"
              >
                Finalizar
              </Button>
            </div>
            </Form>
            </div>
            </Form>
          </div>
        </div>
        )}
      </div>
      <ModalAveria
        show={show}
        handleClose={handleClose}
        eliminar={handleDeleteAveriaService}
      />
    </>
  );
}
export default AveriaDetails;
