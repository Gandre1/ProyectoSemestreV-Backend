import sitiosControlador from "../controllers/sitiosControlador.js"
import usurioControlador from "../controllers/usuarioControlador.js"
import { Router } from "express"
import passport from "passport"

const rutas= Router()

rutas.post("/usuario",
    usurioControlador.postUsuario)

rutas.get("/usuario",
    passport.authenticate("jwt0", {session: false}),
    usurioControlador.getUsuario)

rutas.get("/usuario/misSitios",
    passport.authenticate("jwt", {session: false}),
    usurioControlador.getMisSitios)

rutas.post("/usuario/login",
    passport.authenticate("local", {session: false}),
    usurioControlador.postSignin)

rutas.post("/sitios",
    passport.authenticate("jwt", {session: false}),
    sitiosControlador.postSitio)

rutas.get("/sitios",
    sitiosControlador.getSitio)

rutas.get("/sitios/:id",
    sitiosControlador.getDetalleSitio)

rutas.put("/sitios/:id",
    passport.authenticate("local", {session: false}),
    sitiosControlador.putSitio)

rutas.delete("/partido/:id",
    passport.authenticate("local", {session: false}),
    sitiosControlador.deleteSitio)

export {rutas}