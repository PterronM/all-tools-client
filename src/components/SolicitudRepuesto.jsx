import { useState } from "react";
import { Form, FormGroup, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { createOneRepuesto } from "../services/repuestos.services";
import { uploadImageService } from "../services/upload.services";

function Repuesto() {
  const redirection = useNavigate()

  const [imageUrl, setImageUrl] = useState(null); 
const [isUploading, setIsUploading] = useState(false);

  const [maquina, setMaquina] = useState("");
  const [modelo, setModelo] = useState("");
  const [nSerie, setnSerie] = useState("");
  const [descriptionRepuesto, setDescriptionRepuesto] = useState("");
  const [nSerieRepuesto, setnSerieRepuesto] = useState("");

  const handleMaquinaChange = (event)=>{
    setMaquina(event.target.value)
  }
  const handleModeloChange = (event)=>{
    setModelo(event.target.value)
  }
  const handleNserieChange = (event)=>{
    setnSerie(event.target.value)
  }
  const handleFileUpload = async (event) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    if (!event.target.files[0]) {
      return;
    }
    setIsUploading(true);
    const uploadData = new FormData();
    // uploadData.append("image" , event.target.files[0][1][2]) -- Para subir varias fotos
    uploadData.append("image", event.target.files[0]);
    try {
      const response = await uploadImageService(uploadData);
      setImageUrl(response.data.imageUrl);
      setIsUploading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handledescripcionRepuestoChange = (event)=>{
    setDescriptionRepuesto(event.target.value)
  }
  const handlenSerieRepuestoChange = (event)=>{
    setnSerieRepuesto(event.target.value)
  }

  const handleSubmit = async (event)=>{

    event.preventDefault()

    const newRepuesto = {
      maquina,
      modelo,
      nSerie,
      imgRepuesto:imageUrl,
      descriptionRepuesto,
      nSerieRepuesto
    }

    try {
      await createOneRepuesto(newRepuesto)
      redirection("/home")

    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div>
     
   <div className="d-flex justify-content-center mt-3">
   <Form className="d-flex flex-column w-75" >
      <FormGroup className="justify-content-center" >
        <Form.Label htmlform="Maquina">Maquina</Form.Label>
        <Form.Control type="text" name="Maquina" value={maquina} onChange={handleMaquinaChange} />
      </FormGroup>
      <br/>
      <FormGroup>
        <Form.Label htmlform="modelo">Modelo</Form.Label>
        <Form.Control type="text" name="modelo" value={modelo} onChange={handleModeloChange} />
      </FormGroup>
      <br/>
      <FormGroup>
        <Form.Label htmlform="nSerie">Nª de Serie</Form.Label>
        <Form.Control type="text" name="nSerie" value={nSerie} onChange={handleNserieChange}/>
      </FormGroup>
      <br />
      <FormGroup>
        <Form.Label htmlform="image">Fotos Repuesto</Form.Label>
        <Form.Control type="file" name="image" onChange={handleFileUpload} disabled={isUploading}/>
        {isUploading ? <Spinner className="Spinner spinner-grow" role="status"/>: null}
            {imageUrl ? (
              <div>
                <img 
                className="imgDetails"
                src={imageUrl} alt="img" width={100} />
              </div>
            ) : null}
      </FormGroup>
      <br/>
      <FormGroup>
        <Form.Label htmlform="descripcionRepuesto">Descripcion del Repuesto</Form.Label>
        <textarea className="form-control" rows={3} type="text" name="descripcionRepuesto" value={descriptionRepuesto} onChange={handledescripcionRepuestoChange}/>
      </FormGroup>
      <br/>
      <FormGroup>
        <Form.Label htmlform="nSerieRepuesto">Nº Serie del repuesto</Form.Label>
        <Form.Control type="text-area" name="nSerieRepuesto" value={nSerieRepuesto} onChange={handlenSerieRepuestoChange}/>
      </FormGroup>
      <br/>
      <button onClick={handleSubmit} type="submit" className="btn btn-success mb-3 mt-3">Enviar</button>
    </Form>
   </div>
    
    

    </div>
  )
}


export default Repuesto
