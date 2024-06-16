const { Repertorio: RepertorioModel } = require("../models/Repertorio");

const RepertorioManager = {
    verificarLimiteRepertorio: async (usuario) => {
        const repertoriosDoUsuario = await RepertorioModel.find({ criadoPor: login });
        if (repertoriosDoUsuario.length >= 10) {
            // limite gratuito
            return false;
        }
        return true;
    }

}


module.exports = RepertorioManager