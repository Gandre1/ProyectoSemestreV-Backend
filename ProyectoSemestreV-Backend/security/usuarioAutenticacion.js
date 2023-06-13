import LocalStrategy from "passport-local"
import bycrypt from "bcrypt"
import usuarioServicio from "../services/usuarioServicio.js"
import constantesSeguridad from "./constantesSeguridad.js"
import { variables } from "../utils/variables.js"

const crearToken= (usuario)=>{
    const payload={
        sub: usuario.username,
        exp: new Date().getTime() + constantesSeguridad.FECHA_EXPIRACION
    }

    return jwt.sign(payload, variables.TOKEN_SECRETO)
}

const localEstrategia= new LocalStrategy({usernameField: "username", passwordField: "password"},
    (username, password, callback)=>{   

    usuarioServicio.leerUsuario(username)
    .then(async (usuario) =>{
        const similar= await bycrypt.compare(password, usuario.passwordEncriptada)

        if(!similar){
            callback(null, {error: "Contraseña Incorrecta"})
        }else{
            callback(null, usuario, token)
        }
    })
    .catch( err =>{
        callback(null, {error: "No se encuentra el usuario"})
    })
})

export default {localEstrategia}
