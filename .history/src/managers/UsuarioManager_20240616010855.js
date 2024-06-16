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
    getUser: async (login) => {
        return await UsuarioModel.findOne
}

module.exports = UsuarioManager;
