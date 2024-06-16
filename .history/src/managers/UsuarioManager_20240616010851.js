const { Usuario: UsuarioModel } = require("../models/Usuario");

const UsuarioManager = {
    verificaUsuario: async (usuarioReq) => {
        const usuario = await UsuarioModel.findOne(usuarioReq);
        if (!usuario) {
            console.log(usuario);
            return false
        } else{
            return true;
        }
    },
    get
}

module.exports = UsuarioManager;
