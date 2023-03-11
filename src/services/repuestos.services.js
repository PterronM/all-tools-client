// llamadas al backEnd
//funciones que contactan con el backend solo para CRUD
import service from "./config.services";

//creamos una funcion para cada ruta definida en el backEnd

const getAllRepuestosService = ()=>{
    return service.get("/repuestos")
}

const getRepuestosIdService = () =>{
    return service.get("/repuestos/repuestosIdTec")
}

const createOneRepuesto = (newRepuesto)=>{
    return service.post("/repuestos/create-repuesto" , newRepuesto)
}

const updateRepuestoId = (idRepuesto, updateRepuesto)=>{
    return service.patch(`/repuestos/${idRepuesto}/update`, updateRepuesto)
}

const repuestoDetailsService = (idRepuesto)=>{
    return service.get(`/repuestos/${idRepuesto}` )
}

const updateRepuestoStatus = (idRepuesto, updateStatus)=>{
    return service.patch(`/repuestos/${idRepuesto}/updateStatus`, updateStatus)
}

const deleteRepuestoId = (idRepuesto)=>{
    return service.delete(`/repuestos/${idRepuesto}/delete`)
}


export {
    getAllRepuestosService,
    getRepuestosIdService,
    createOneRepuesto,
    updateRepuestoId,
    repuestoDetailsService,
    updateRepuestoStatus,
    deleteRepuestoId
}