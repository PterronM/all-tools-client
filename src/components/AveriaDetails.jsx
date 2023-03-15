import { useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
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

function AveriaDetails() {
  const redirect = useNavigate();

  const params = useParams();

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
      console.log(error);
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
      console.log(error);
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
      imgAveria:imageUrl,
      descriptionAveria,
    };

    try {
      await updateAveriaId(params.idAveria, updateAveria);
      redirect("/home");
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

  const handleStatusAveriaService = async () => {
    const updateStatus = { finalizada: finalizarStatus };
    // console.log(updateStatus);
    try {
      redirect("/home");
      await updateAveriaStatus(params.idAveria, updateStatus);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isFeching === true ? (
       <Spinner animation="border" role="status"/>
        
      ) : (
        <div className="details d-flex justify-content-center">
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
              {!imageUrl ? <img src="https://static.vecteezy.com/system/resources/previews/016/314/454/non_2x/red-cross-mark-free-png.png" alt="cruz" width={50}></img> : null}
              {isUploading ? <Spinner animation="border" role="status" />: null}
              {imageUrl ? (
                <div>
                  <img className="imgDetails" src={imageUrl} alt="img" width={100} />
                </div>
              ) : null}
            </FormGroup>
            <br />
            <FormGroup>
              <Form.Label htmlform="descriptionAveria">Descripcion</Form.Label>
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
              onClick={handleStatusAveriaService}
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
