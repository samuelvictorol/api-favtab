const { Usuario: UsuarioModel } = require("../models/Usuario");

const UsuarioManager = {
    verificaUsuario: async (usuarioReq) => {
        const usuario = await UsuarioModel.findOne(usuarioReq);
        if (!usuario) {
            console.log('verifica: ' + usuario);
            return false
        } else{
            return true;
        }
    },
    getUser: async (user) => {
        // user = {
        //     login,
        //     senha
        // }
        console.log(user)
        return await UsuarioModel.findOne(user);
    }
}

module.exports = UsuarioManager;
