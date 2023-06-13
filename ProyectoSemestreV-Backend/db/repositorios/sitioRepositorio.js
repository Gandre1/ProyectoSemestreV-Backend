import { conexion } from "../conexionDB.js"

const coleccion= ()=>{
    return conexion.obtenerDB().coleccion("sitios")
}

const crear= async (sitio)=>{
    await coleccion().insertOne(sitio)
}

const leer= async ()=>{
    return await coleccion().find().toArray()
}

const detalle= async (id)=>{
    const sitio= await coleccion().findOne({idSitio:id})

    return sitio ? sitio : {}
}

const actualizar= async (sitioDetalle)=>{
    await coleccion().replaceOne({idSitio: sitioDetalle.idSitio}, sitioDetalle);
}

const eliminar= async (idSitio)=>{
    await coleccion().remove({idSitio: id});
}

const misSitios= async (idUsuario)=>{

    const query= {"usuarioEntity.idUsuario":idUsuario}
    const sitio= await coleccion().find(query).toArray()

    return sitio ? sitio : []
}

export default {crear, leer, detalle, actualizar, eliminar, misSitios}