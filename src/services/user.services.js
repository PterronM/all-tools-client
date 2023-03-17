import service from "./config.services";

const getAllUserTecService = ()=>{
    return service.get("/user")
}

const getDetailsUserTec = (idUser)=>{
    return service.get(`/user/${idUser}`)
}

const updateUserStatus = (idUser,updateUser)=>{
    return service.patch(`/user/${idUser}/update`, updateUser)
}

const deleteUserId = (idUser)=>{
    return service.delete(`/user/${idUser}/delete`)
}


export {
    getAllUserTecService,
    getDetailsUserTec,
    updateUserStatus,
    deleteUserId
}