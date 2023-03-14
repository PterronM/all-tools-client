import service from "./config.services";

const getAllAveriasService = ()=>{
    return service.get("/averias")
}

const getAveriasIdService = () =>{
    return service.get("/averias/averiasIdTec")
}

const createOneAveria = (newAveria)=>{
    return service.post("/averias/create-averia" , newAveria)
}

const createAveriaAdm =(newAveria)=>{
    return service.post("/averias/create-averia-adm", newAveria)
}

const averiaDetailsService = (idAveria)=>{
    return service.get(`/averias/${idAveria}`)
}

const updateAveriaId = (idAveria, updateAveria)=>{
    return service.patch(`/averias/${idAveria}/update`, updateAveria)
}

const updateAveriaStatus = (idAveria, updateStatus)=>{
    return service.patch(`/averias/${idAveria}/updateStatus`, updateStatus)
}

const deleteAveriaId = (idAveria)=>{
    return service.delete(`/averias/${idAveria}/delete`)
}


export {
    getAllAveriasService,
    getAveriasIdService,
    createOneAveria,
    createAveriaAdm,
    averiaDetailsService,
    updateAveriaId,
    updateAveriaStatus,
    deleteAveriaId
}