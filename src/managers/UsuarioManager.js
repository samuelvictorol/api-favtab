const { Usuario: UsuarioModel } = require("../models/Usuario");
const bcrypt = require("bcrypt");

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
    },
    registrarUsuario: async (usuario) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(usuario.senha, salt);
        usuario.senha = hashedPassword;
        return await UsuarioModel.create(usuario);
    },
    login: async (user) => {
        const usuario = await UsuarioModel.findOne({login: user.login});
        if (usuario && (await bcrypt.compare(user.senha, usuario.senha))) {
            usuario.logado = true;
            usuario.save();
            return usuario;
        } else {
            return null;
        }
    },
    logout: async (user) => {
        const usuario = await UsuarioModel.findOne({login: user.login, senha: user.senha});
        usuario.logado = false;
        usuario.save();
        return res.status(201).json({
            message: "Logout Efetuado com Sucesso!",
        });
    },
}

module.exports = UsuarioManager;
