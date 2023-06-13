import sitioRepositorio from "../db/repositorios/sitioRepositorio.js";
import usuarioRepositorio from "../db/repositorios/usuarioRepositorio.js";
import lugarRepositorio from "../db/repositorios/lugarRepositorio.js";
import crypto from "crypto"
import { SitioEntity } from "../models/sitioModelo.js" 

const crearSitios= (sitio, username)=>{
    return new Promise (async(resolver, rechazar)=>{
        if(!sitio.sitioNombre || !sitio.imageUrl || !sitio.bloque || !sitio.descripcion){
            rechazar("Datos incorrectos")
        }

        const sitioNombre = await lugarRepositorio.buscarId(sitio.sitioNombre)
        const usuario= await usuarioRepositorio.buscarUsername(username)

        sitio.idSitio= crypto.randomUUID()
        sitio.usuarioEntity= usuario
        sitio.sitioEntityNombre= sitioNombre

        await sitioRepositorio.crear(new SitioEntity(sitio))

        resolver(await sitioRepositorio.detalle(sitio.idSitio))
    })
}

const leerSitios= ()=>{
    return new Promise((resolver, rechazar)=>{
        sitioRepositorio.leer()
        .then( array=>{
            resolver(array)
        })
        .catch(err=>{
            rechazar("No es posible leer los partidos")
        })
    })
}

const detalleSitio= (id)=>{
    return new Promise((resolver, rechazar)=>{
        sitioRepositorio.detalle(id)
        .then( sitio=>{
            resolver(sitio)
        })
        .catch(err=>{
            rechazar("No es posible leer los partidos")
        })
    })
}

const actualizarSitio= (id, sitio, username)=>{
    return new Promise(async(resolver, rechazar)=>{
        if(!sitio.imageUrl || !sitio.descripcion){
            rechazar("Datos Incorrectos")
        }
        
        const sitioDetalle= await sitioRepositorio.detalle(id)

        const usuario= await usuarioRepositorio.buscarUsername(username)

        if(sitioDetalle.usuarioEntity.idUsuario != usuario.idUsuario){
            rechazar("No ser pude realizar esta accion")
        }

        sitioDetalle.descripcion= sitio.descripcion
        sitioDetalle.imageUrl= sitio.imageUrl
        
        await sitioRepositorio.actualizar(sitioDetalle)

        resolver(await sitioRepositorio.detalle(sitioDetalle.idSitio))

    })  

}

const eliminarSitio= (id, username)=>{
    return new Promise(async (resolver, rechazar)=>{

        const sitioDetalle= await sitioRepositorio.detalle(id)
        
        const usuario= await usuarioRepositorio.buscarUsername(username)

        if(sitioDetalle.usuarioEntity.idUsuario != usuario.idUsuario){
            rechazar("No se puede realizar esta accion")
        }

        resolver(await sitioRepositorio.eliminar(sitioDetalle.idSitio))
    })
}

export default {crearSitios, leerSitios, detalleSitio, actualizarSitio, eliminarSitio}