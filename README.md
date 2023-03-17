# ALL TOOLS

## Cliente

## Descripcion

All tools es una app enfocada al mundo de maquinaria industrial. Con dicha app podemos facilitar el trabajo diario de los técnicos y jefes de taller a la hora de comunicarse entre ellos. 
Dicha app permite generar por parte de los técnicos, averias y solicitudes de repuesto, asi como por parte del administrador poder gestionar dichas averias y peticiones, al igual que poder generar nuevas averias y asignarlas al tecnico que corresponda.

## MVP 

- Autorizacion
- Autenticacion
- 3 modelos en la BD
- CRUD




# Componentes
- AVeriaDetails.jsx
- CreateAveria.jsx
- ListAveria.jsx
- ListAveriasAdm.jsx
- IsPrivate.jsx
- RepuestoDetails.jsx
- SolicitudRepuesto.jsx
- ListRepuesto.jsx
- ListRepuestoAdm-jsx
- Navbar.jsx
- PerfAdm.jsx
- PerfTec.jsx
- MODALS
-   ModalAveria.jsx
-   ModalRepuesto.jsx


# Context

- auth.context

# page
- auth
-   Login.jsx
-   Signup.jsx
- Error.jsx
- Home.jsx
- NotFound.jsx


# services

- auth.services
    - signupService(newUser)
    - loginService(userCredentials)
    - verifyService()
- averias.services
    - getAllAveriasService()
    - getAveriasIdService()
    - createOneAveria(newAveria)
    - createAveriaAdm(newAveria)
    - averiaDetailsService(idAveria)
    - updateAveriaId(idAveria, updateAveria)
    - updateAveriaStatus(idAveria, updateStatus)
    - deleteAveriaId(idAveria)

- config.services
- pepuestos.services
    - getAllRepuestosService()
    - getRepuestosIdService()
    - createOneRepuesto(newRepuesto)
    - updateRepuestoId(idRepuesto, updateRepuesto)
    - repuestoDetailsService(idRepuesto)
    - updateRepuestoStatus(idRepuesto, updateStatus)
    - deleteRepuestoId(idRepuesto)
- upload.services
- user.services
    - getAllUserTecService()
    - getDetailsUserTec(idUser)
    - updateAveriaStatus(idUser,updateUser)
    - deleteAveriaId(idUser)




### Git
URls for the project repo and deploy
[Link Repo Server](https://github.com/PterronM/all-tools-server)
[Link Repo Client](https://github.com/PterronM/all-tools-client)
[Link Deploy](https://all-tools.netlify.app/)



