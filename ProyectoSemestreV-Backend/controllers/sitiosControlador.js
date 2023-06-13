import { Router } from "express"
import respuestaHttp from "../utils/respuestaHttp.js"
import sitioServicio from "../services/sitioServicio.js"
import { SitioCrearReqModel, SitioDatosResModel, SitioActualizarReqModel } from "../models/sitioModelo.js"


const postSitio= (req, res)=>{
  
    const username= "Gandrey"

    sitioServicio.crearSitios(new SitioCrearReqModel(req.body), username)
    .then( sitio =>{
        respuestaHttp.exito(req, res, sitio, 201)
    })

    .catch( err=>{
        respuestaHttp.error(req, res, "No es posible crear el sitio", err, 400 )
    })
}

const getSitio= (req, res)=>{

    sitioServicio.leerSitios()
    .then( array =>{

            let losSitios=[]

            array.forEach(sitio =>{
                losSitios.push(sitio)
            });

            respuestaHttp.exito(req, res, losSitios, 200)
        })

    .catch( err =>{
        respuestaHttp.error(req, res, "No es posible leer los sitios", err, 500)
    })

}

const getDetalleSitio= (req, res)=>{
    sitioServicio.detalleSitio(req.params.id)
    .then( sitio =>{
        respuestaHttp.exito(req, res, sitio, 200)
    })

    .catch( err => {
        respuestaHttp.error(req, res, err, "Error al leer el detalle del sitio", 500)
    })
    
}

const putSitio= (req, res)=>{
    const username= "Gandrey"

    sitioServicio.actualizarSitio(req.params.id, new SitioActualizarReqModel(req.body), username)
    .then( sitio =>{
        respuestaHttp.exito(req, res, sitio, 200)
    })

    .catch( err=>{
        respuestaHttp.error(req, res, err, "Error al actualizar sitio", 400)
    })

    
}

const deleteSitio= (req, res)=>{
    const username= "Gandrey"
    
    sitioServicio.eliminarSitio(req.params.id, username)
    .then( () =>{
        respuestaHttp.exito(req, res, "Sitio eliminado con exito", 200)
    })

    .catch( err=>{
        respuestaHttp.error(req, res, err, "Error al eliminar sitio", 400)
    })

}

export default {postSitio, getSitio, getDetalleSitio, putSitio, deleteSitio}