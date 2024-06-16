const { Usuario: UsuarioModel } = require("../models/Usuario");

const UsuarioManager = {
    getUser: async (user) => {
        // user = {
        //     login,
        //     senha
        // }
        if(!user.senha || user.senha.trim() === '' || user.senha === undefined) {
            console.log('senha obrigatória para acessar dados do usuário');
            return null
        }
        return await UsuarioModel.findOne(user);
    }
}

module.exports = UsuarioManager;
