import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteUserId, getAllUserTecService } from "../services/user.services";
import ModalEliminarUser from "./Modals/ModalEliminarUser";


function User() {

  
  const redirect = useNavigate()

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(!show);

  const [allTec, setAllTec] = useState(null);
  const [isFeaching, setIsFeaching] = useState(true);
   
  useEffect(()=>{
    getData()
},[])

const getData = async()=>{
    setIsFeaching(true)
    try {
        const response = await getAllUserTecService()
        // console.log(response.data)
        setAllTec(response.data)
        setIsFeaching(false)
    } catch (error) {
        redirect("/home")
    }
}

   

    const handleDeleteUser = async (idUser)=>{

        // console.log(idUser)

        try {
            // handleClose();
            await deleteUserId(idUser);
            redirect("/home")
        } catch (error) {
            redirect("/home")
        }
    };


    if (allTec === null) {
        return(
          <div className="Spinner">
            <Spinner className="spinner-grow" role="status"/>
          </div>
        )
      }

  return (
    // <p>users</p>
     <>
     <div>
         {allTec.map((eachTec)=>{
             return(
                 <div key={eachTec._id} className="d-flex justify-content-around mt-2 p-2">
                    <p>{eachTec.nombre}</p>
                    {/* funcion anonima para poder pasarle parametros a la funcion */}
                     <button onClick={()=>handleDeleteUser(eachTec._id)}>Eliminar</button>
                </div>

            )
        })}
        {/* <ModalEliminarUser show={show} handleClose={handleClose} eliminar= {handleDeleteUser()}/>     */}
    </div>
    </>
  )
 }

export default User
