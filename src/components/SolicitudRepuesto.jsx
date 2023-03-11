import { useState } from "react";
import { Form, FormGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { createOneRepuesto } from "../services/repuestos.services";


function Repuesto() {
  const redirection = useNavigate()

  const [maquina, setMaquina] = useState("");
  const [modelo, setModelo] = useState("");
  const [nSerie, setnSerie] = useState("");
  const [imgRepuesto, setImgRepuesto] = useState("");
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
  const handleImgRepuestoChange = (event)=>{
    setImgRepuesto(event.target.value)
  }
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
      imgRepuesto,
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
     
   <div className="d-flex justify-content-center">
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
        <Form.Label htmlform="imgRepuesto">Fotos Repuesto</Form.Label>
        <Form.Control type="text-area" name="imgRepuesto" value={imgRepuesto} onChange={handleImgRepuestoChange}/>
      </FormGroup>
      <br/>
      <FormGroup>
        <Form.Label htmlform="descripcionRepuesto">Descripcion del Repuesto</Form.Label>
        <textarea className="form-control" rows={4} type="text" name="descripcionRepuesto" value={descriptionRepuesto} onChange={handledescripcionRepuestoChange}/>
      </FormGroup>
      <br/>
      <FormGroup>
        <Form.Label htmlform="nSerieRepuesto">Nº Serie del repuesto</Form.Label>
        <Form.Control type="text-area" name="nSerieRepuesto" value={nSerieRepuesto} onChange={handlenSerieRepuestoChange}/>
      </FormGroup>
      <br/>
      <button onClick={handleSubmit} type="submit" className="btn btn-primary mb-3">Enviar</button>
    </Form>
   </div>
    
    

    </div>
  )
}


export default Repuesto
