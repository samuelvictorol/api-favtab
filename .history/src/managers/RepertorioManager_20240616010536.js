const { Repertorio: RepertorioModel } = require("../models/Repertorio");

const RepertorioManager = {
    verificarLimiteRepertorio: async (login) => {
        const repertoriosDoUsuario = await RepertorioModel.find({ criadoPor: login });
        if (repertoriosDoUsuario.length >= 10) {
            console.log(repertoriosDoUsuario.length);
            // limite gratuito
            cosn
            return false;
        }
        return true;
    },
    criar: async (repertorio) => {
        return await RepertorioModel.create(repertorio);
    }

}


module.exports = RepertorioManager