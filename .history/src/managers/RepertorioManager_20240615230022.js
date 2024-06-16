const { Repertorio: RepertorioModel } = require("../models/Repertorio");

const RepertorioManager = {
    verificarLimiteRepertorio: async (usuario) => {
        const repertoriosDoUsuario = await RepertorioModel.find({ criadoPor: login });
        if (repertoriosDoUsuario.length >= 10) {
            // limite gratuito
            return res.status(400).json({
                message: 'O usuário já atingiu o limite de 10 repertórios',
            });
        }
    }

}


module.exports = RepertorioManager