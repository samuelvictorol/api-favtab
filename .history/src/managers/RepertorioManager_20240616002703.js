const { Repertorio: RepertorioModel } = require("../models/Repertorio");

const RepertorioManager = {
    verificarLimiteRepertorio: async (login) => {
        const repertoriosDoUsuario = await RepertorioModel.find({ criadoPor: login });
        if (repertoriosDoUsuario.length >= 10) {
            console.log(repertoriosDoUsuario.length);
            // limite gratuito
            return false;
        }
        return true;
    },
    

}


module.exports = RepertorioManager