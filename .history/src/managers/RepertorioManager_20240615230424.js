const { Repertorio: RepertorioModel } = require("../models/Repertorio");

const RepertorioManager = {
    verificarLimiteRepertorio: async (login) => {
        const repertoriosDoUsuario = await RepertorioModel.find({ criadoPor: login });
        console.log(repertoriosDoUsuario);
        if (repertoriosDoUsuario.length >= 10) {
            // limite gratuito
            return false;
        }
        return true;
    }

}


module.exports = RepertorioManager