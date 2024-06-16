const { Usuario: UsuarioModel } = require("../models/Usuario");
async function verificaUsuario(usuarioReq) {
    console.log(usuarioReq)
    const usuario = await UsuarioModel.findOne(usuarioReq);
    if (!usuario) {
        return 'Credenciais inválidas'
    } else{
        return true;
    }
}

module.exports = UsuarioManager;
