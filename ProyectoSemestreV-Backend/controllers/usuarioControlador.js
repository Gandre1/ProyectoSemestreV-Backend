import { Router } from "express"
import respuestaHttp from "../utils/respuestaHttp.js"
import usuarioServicio from "../services/usuarioServicio.js"
import { UsuarioCrearReqModel, UsuarioDatosResModel } from "../models/usuarioModelo.js"
import { SitioDatosResModel } from "../models/sitioModelo.js"



const postUsuario= (req, res)=>{
    usuarioServicio.crearUsuario(new UsuarioCrearReqModel(req.body))
    .then(usuario =>{
        respuestaHttp.exito(req, res, new UsuarioDatosResModel(usuario), 201)
    })

    .catch( err=>{
        respuestaHttp.error(req, res, err, "Error al crear el usuario", 400)
    })

}

const getUsuario= (req, res)=>{
    const username= "Gandrey"

    usuarioServicio.leerUsuario(username)
    .then(usuario =>{
        respuestaHttp.exito(req, res, new UsuarioDatosResModel(usuario), 200)
    })

    .catch( err =>{
        respuestaHttp.error(req, res, err, "Error al leer el usuario", 500)
    })
}

const getMisSitios= (req, res)=>{
    const username= "Gandrey"

    usuarioServicio.leerMisSitios(username)
    .then(array =>{
        let losSitios=[]

        array.forEach(sitio =>{
            losSitios.push(sitio)
        })

        respuestaHttp.exito(req, res, losSitios, 200)
    })

    .catch( err =>{
        respuestaHttp.error(req, res, err, "Error al leer mis sitios", 500)
    })
}

const postSignin= (req, res)=>{
    if(!req.user.error){
        respuestaHttp.signin(req, res, "", 200)
    }else{
        respuestaHttp.error(req, res, "", req.user.error, 403)
    }
}

export default {postUsuario, getUsuario, getMisSitios, postSignin}