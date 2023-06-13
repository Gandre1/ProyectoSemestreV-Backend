import usuarioRepositorio from "../db/repositorios/usuarioRepositorio.js"
import sitioRepositorio from "../db/repositorios/sitioRepositorio.js"
import crypto from "crypto"
import bcrypt from "bcrypt"
import { UsuarioEntity } from "../models/usuarioModelo.js"

const crearUsuario= (usuario)=>{
    return new Promise((resolver, rechazar)=>{
        if(!usuario.nombre || !usuario.email || !usuario.username || !usuario.password){
            rechazar("Datos incorrectos")
        }

        usuarioRepositorio.buscarEmail(usuario.email) 
            .then( usuario=>{
                if(usuario != null){
                    rechazar("Ese correo ya se encuentra registrado")    
                }
            })
                

        usuarioRepositorio.buscarUsername(usuario.username)
            .then( usuario=>{
                if(usuario != null){
                    rechazar("Ese usuario ya se encuentra registrado")      
                }
            })


        usuario.idUsuario= crypto.randomUUID()
        usuario.passwordEncriptada= bcrypt.hashSync(usuario.password, 10)

        usuarioRepositorio.crear(new UsuarioEntity(usuario))    
        .then( async ()=>{
            resolver(usuarioRepositorio.buscarUsername(usuario.username))
        })

        .catch(err=>{
            rechazar("No es posible crear el usuario    ")
        })

        
    })
}

const leerUsuario= (username)=>{
    return new Promise((resolver, rechazar)=>{
        usuarioRepositorio.buscarUsername(username)
        .then(usuario =>{
            if(usuario == null){
                rechazar("No se encuentra el usuario")
            }
    
            resolver(usuario)
        })        
    })
}

const leerMisSitios= (username)=>{
    return new Promise((resolver, rechazar)=>{
        usuarioRepositorio.buscarUsername(username)
        .then( usuario =>{
            if(usuario == null){
                rechazar("No se encuentra el usuario")
            }
        })

        sitioRepositorio.misSitios(usuario.idUsuario)
        .then( array=>{
            rechazar(array)
        })

        .catch( err=>{
            rechazar("No es posible obtener los partidos")
        })
    })
}

export default {crearUsuario, leerUsuario, leerMisSitios}
