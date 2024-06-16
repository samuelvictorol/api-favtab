const { Usuario: UsuarioModel } = require("../models/Usuario");

const UsuarioManager = {
    verificaUsuario: async (usuarioReq) => {
        // console.log(usuarioReq)
        const usuario = await UsuarioModel.findOne(usuarioReq);
        
        if (!usuario) {
            return false
        } else{
            return true;
        }
    }
}

module.exports = UsuarioManager;
