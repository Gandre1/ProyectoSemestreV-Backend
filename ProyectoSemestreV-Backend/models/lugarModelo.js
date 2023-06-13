class LugarDatosResModel {
    constructor(lugar){
        this.id= lugar.id
        this.nombre= lugar.nombre
    }
}

function LugarEntity(lugar){
    this.id= lugar.id
    this.nombre= lugar.nombre
}

export {LugarDatosResModel, LugarEntity}