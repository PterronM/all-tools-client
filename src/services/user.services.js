import service from "./config.services";

const getAllUserTecService = ()=>{
    return service.get("/user")
}

const getDetailsUserTec = (idUser)=>{
    return service.get(`/user/${idUser}`)
}

const updateAveriaStatus = (idUser,updateUser)=>{
    return service.patch(`/user/${idUser}/update`, updateUser)
}

const deleteAveriaId = (idUser)=>{
    return service.delete(`/user/${idUser}/delete`)
}


export {
    getAllUserTecService,
    getDetailsUserTec,
    updateAveriaStatus,
    deleteAveriaId
}