class UsuarioCrearReqModel {
    constructor(usuario) {
        this.nombre = usuario.nombre
        this.email = usuario.email
        this.username = usuario.username
        this.password = usuario.password
    }
}

class UsuarioDatosResModel {
    constructor(usuario) {
        this.idUsuario = usuario.idUsuario
        this.nombre = usuario.nombre
        this.email = usuario.email
        this.username = usuario.username
    }
}

class UsuarioEntity {
    constructor(usuario) {
        this.idUsuario = usuario.idUsuario
        this.nombre = usuario.nombre
        this.email = usuario.email
        this.username = usuario.username
        this.passwordEncriptada = usuario.passwordEncriptada
    }
}

export {UsuarioCrearReqModel, UsuarioDatosResModel, UsuarioEntity}