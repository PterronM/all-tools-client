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

const averiaDetailsService = (idAveria)=>{
    return service.get(`/averias/${idAveria}`)
}

const updateAveriaId = (idAveria, updateAveria)=>{
    return service.patch(`/averias/${idAveria}/update`, updateAveria)
}

const updateAveriaStatus = (idAveria, updateStatusFinal)=>{
    return service.patch(`/averias/${idAveria}/updateStatus`, updateStatusFinal)
}

const deleteAveriaId = (idAveria)=>{
    return service.delete(`/averias/${idAveria}/delete`)
}


export {
    getAllAveriasService,
    getAveriasIdService,
    createOneAveria,
    averiaDetailsService,
    updateAveriaId,
    updateAveriaStatus,
    deleteAveriaId
}