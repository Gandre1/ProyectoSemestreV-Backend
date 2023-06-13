import { conexion } from "../conexionDB.js";

const coleccion= ()=>{
  return conexion.obtenerDB().collection("lugar")
}

const crear = async () => {

  await coleccion().deleteMany({})

  let lugarNombre = ["Biblioteca", "Cafeteria", "Cancha", "Ajedrez Gigante"];

  for (let i = 0; i < lugarNombre.length; i++) {
    const lugar = {
      id: `${i + 1}`,
      nombre: lugarNombre[i]
    };

    await coleccion().insertOne(lugar)
  }

  return await coleccion().find().toArray()
};

const buscarId = async (id) => {
  const lugar = await coleccion().findOne({id: id})

  return lugar ? lugar : null;
};

export default { crear, buscarId };
