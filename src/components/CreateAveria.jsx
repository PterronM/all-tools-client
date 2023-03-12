
import { useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { createOneAveria } from "../services/averias.services";

function Averia() {

  const redirection = useNavigate()

  const [maquina, setMaquina] = useState("");
  const [modelo, setModelo] = useState("");
  const [nSerie, setnSerie] = useState("");
  const [imgAveria, setImgAveria] = useState("");
  const [descriptionAveria, setdescriptionAveria] = useState("");

  const handleMaquinaChange = (event)=>{
    setMaquina(event.target.value)
  }
  const handleModeloChange = (event)=>{
    setModelo(event.target.value)
  }
  const handleNserieChange = (event)=>{
    setnSerie(event.target.value)
  }
  const handleImgAveriaChange = (event)=>{
    setImgAveria(event.target.value)
  }
  const handledescriptionAveriaChange = (event)=>{
    setdescriptionAveria(event.target.value)
  }

  const handleSubmit = async (event)=>{

    event.preventDefault()

    const newAveria = {
      maquina,
      modelo,
      nSerie,
      imgAveria,
      descriptionAveria,
    }

    try {
      await createOneAveria(newAveria)
      redirection("/home")

    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div>
     
   <div className="d-flex justify-content-center mt-5">
   <Form className="d-flex flex-column w-50 " >
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
        <Form.Label htmlform="imgAveria">Fotos Averia</Form.Label>
        <Form.Control type="text-area" name="imgAveria" value={imgAveria} onChange={handleImgAveriaChange}/>
      </FormGroup>
      <br/>
      <FormGroup>
        <Form.Label htmlform="descriptionAveria">Descripcion</Form.Label>
        <textarea className="form-control" rows={4} type="text" name="descriptionAveria" value={descriptionAveria} onChange={handledescriptionAveriaChange}/>
      </FormGroup>
      <br/>
      <br/>
      <Button onClick={handleSubmit} type="submit" className="btn btn-success mb-3 mt-3">Enviar</Button>
    </Form>
   </div>
    
    

    </div>
  )
}

export default Averia;
