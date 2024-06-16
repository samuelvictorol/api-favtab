const { Usuario: UsuarioModel } = require("../models/Usuario");

const UsuarioManager = {
    verificaUsuario: async (usuarioReq) => {
        const usuario = await UsuarioModel.findOne(usuarioReq);
        if (!usuario) {
            console.log('verifica: ' + JSON.stringify(usuarioReq));
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
        return await UsuarioModel.findOne(user);
    }
}

module.exports = UsuarioManager;
