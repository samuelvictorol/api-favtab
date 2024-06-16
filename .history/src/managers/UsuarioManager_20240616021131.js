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
        if(!user.senha || user.senha.trim() === '' || user.senha === undefined) {
            console.log('senha obrigatória para acessar repertório privado');
            return null
        }
        return await UsuarioModel.findOne(user);
    }
}

module.exports = UsuarioManager;
