import express, { Router } from "express"
import { rutas } from "./routes/rutas.js"
import lugarRepositiorio from "./db/repositorios/lugarRepositorio.js"
import  { conexion } from "./db/conexionDB.js"
import { variables } from "./utils/variables.js"
import { configuracionSeguridad } from "./security/configuracionSeguridad.js"

var app= express()

const PORT= variables.EXPRESS_PORT
const HOST= variables.EXPRESS_HOST

app.use("/", express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

configuracionSeguridad(app)

conexion.clienteMongo((err)=>{

    if (err) {
        console.error(err)
        process.exit
    }

    app.listen(PORT, HOST, ()=>{
        console.log(`Escuchando por http://${HOST}:${PORT}`)
        lugarRepositiorio.crear()
        .then( lugar=> console.log(lugar))
    })
})

