import passport from "passport";
import usuarioAutenticacion from "./usuarioAutenticacion.js"
import { rutas } from "../routes/rutas.js";
import tokenAutorizacion from "./tokenAutorizacion.js";
import cors from "cors"

const whitelist = ['http://localhost:3000', 'http://sitiosfesc.com']

const opcionesCors = {
    "origin": (origen, callback)=>{
        if(whitelist.indexOf(origen) !== -1 || !origen){
            callback(null, true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
    },
    "allowedHeaders": "*",
    "methods": "*"
}

const configuracionSeguridad= (app)=>{
    app.use(cors(opcionesCors))
    app.use("/", rutas)
    passport.use(usuarioAutenticacion.localEstrategia)
    passport.use(tokenAutorizacion.jwtEstrategia)
}
export {configuracionSeguridad}