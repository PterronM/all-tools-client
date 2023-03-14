import { useContext, useEffect, useState } from "react";
import { Button, Form, FormGroup, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {

  createAveriaAdm,
  createOneAveria,
} from "../services/averias.services";
import { uploadImageService } from "../services/upload.services";
import { AuthContext } from "../context/auth.context";
import { getAllUserTecService } from "../services/user.services";

function Averia() {
  const redirection = useNavigate();

  // const params = useParams();
  const { loggedUser } = useContext(AuthContext);

  const [imageUrl, setImageUrl] = useState(null); 
  const [isUploading, setIsUploading] = useState(false);

  const [idUser, setIdUser] = useState("");
  const [tecnico, setTecnico] = useState("");
  const [maquina, setMaquina] = useState("");
  const [modelo, setModelo] = useState("");
  const [nSerie, setnSerie] = useState("");
  const [descriptionAveria, setdescriptionAveria] = useState("");

  useEffect(() => {
    getDataTec();
  }, []);

  const getDataTec = async (req, res, next) => {
    try {
      // setIsFeching(true);
      const response = await getAllUserTecService();
      // console.log(response.data);
      setIdUser(response.data);
    } catch (error) {
      next(error);
    }
  };

  const handleTecnicoChange = (event) => {
    setTecnico(event.target.value);
    console.log(event.target.value);
  };
  const handleMaquinaChange = (event) => {
    setMaquina(event.target.value);
  };
  const handleModeloChange = (event) => {
    setModelo(event.target.value);
  };
  const handleNserieChange = (event) => {
    setnSerie(event.target.value);
  };
  const handleFileUpload = async (event) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    if (!event.target.files[0]) {
      return;
    }
    setIsUploading(true);
    const uploadData = new FormData();
    // uploadData.append("imgAveria" , event.target.files[0][1][2]) -- Para subir varias fotos
    uploadData.append("image", event.target.files[0]);
    try {
      const response = await uploadImageService(uploadData);
      setImageUrl(response.data.imageUrl);
      setIsUploading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handledescriptionAveriaChange = (event) => {
    setdescriptionAveria(event.target.value);
  };
  const handleSubmitTec = async (event) => {
    event.preventDefault();

    const newAveria = {
      idUser,
      maquina,
      modelo,
      nSerie,
      imgAveria:imageUrl,
      descriptionAveria,
    };

    try {
      await createOneAveria(newAveria);
      redirection("/home");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitAdm = async (event) => {
    event.preventDefault();

    const newAveria = {
      idUser:tecnico,
      maquina,
      modelo,
      nSerie,
      imgAveria:imageUrl,
      descriptionAveria,
    };

    try {
      await createAveriaAdm(newAveria)
      redirection("/home");
    } catch (error) {
      console.log(error);
    }
  };
 

  if (loggedUser.role === "Tecnico") {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Form className="d-flex flex-column w-50 ">
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
            {isUploading ? <Spinner animation="border" role="status" /> : null}
            {imageUrl ? (
              <div>
                <img src={imageUrl} alt="img" width={100} />
              </div>
            ) : null}
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
            onClick={handleSubmitTec}
            type="submit"
            className="btn btn-success mb-3 mt-3"
          >
            Enviar
          </Button>
        </Form>
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Form className="d-flex flex-column w-50 ">
          <Form.Label htmlform="tecnico">Técnico</Form.Label>
          <FormGroup className="justify-content-center">
            <Form.Select
              aria-label="Default select Example"
              value={tecnico}
              onChange={handleTecnicoChange}
            >
              {idUser === "" ? (
                <Spinner animation="border" role="status"/>
              ) : (
                <>
                <option>Seleccion</option>
                {idUser.map((eachUser) => {
                  return (
                    <option key={eachUser._id} value={eachUser._id}>
                      {eachUser.nombre}
                    </option>
                  );
                })}
                </>
              )}
            </Form.Select>
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
            {isUploading ? <Spinner animation="border" role="status" /> : null}
            {imageUrl ? (
              <div>
                <img src={imageUrl} alt="img" width={100} />
              </div>
            ) : null}
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
            onClick={handleSubmitAdm}
            type="submit"
            className="btn btn-success mb-3 mt-3"
          >
            Enviar
          </Button>
        </Form>
      </div>
    );
  }
}

export default Averia;
