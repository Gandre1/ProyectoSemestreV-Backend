import { UsuarioDatosResModel } from "./usuarioModelo.js";
import { LugarDatosResModel, LugarEntity} from "./lugarModelo.js";

class SitioCrearReqModel {
    constructor(sitio) {
        this.sitioNombre= sitio.sitioNombre;
        this.bloque = sitio.bloque;
        this.descripcion = sitio.descripcion;
        this.imageUrl = sitio.imageUrl;
    }
}

class SitioDatosResModel {
    constructor(sitio) {
        this.idSitio = sitio.idSitio;
        this.sitioEntityNombre = new LugarDatosResModel(sitio.sitioEntityNombre);
        this.bloque = sitio.bloque;
        this.imageUrl = sitio.imageUrl;
        this.descripcion = sitio.descripcion;
        this.usuarioEntity = new UsuarioDatosResModel(sitio.usuarioEntity);
    }
}

class SitioActualizarReqModel {
    constructor(sitio) {
        this.descripcion = sitio.descripcion;
        this.imageUrl = sitio.imageUrl; 
    }
}

function SitioEntity(sitio){
    this.idSitio = sitio.idSitio;
    this.sitioEntityNombre = new LugarEntity(sitio.sitioEntityNombre);
    this.bloque = sitio.bloque;
    this.imageUrl = sitio.imageUrl;
    this.descripcion = sitio.descripcion;
    this.usuarioEntity = new UsuarioEntity(sitio.usuarioEntity);
}

export {SitioCrearReqModel, SitioDatosResModel, SitioActualizarReqModel, SitioEntity}