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
    criar: async (repertorio) => {
        return await RepertorioModel.create(repertorio);
    },
    findByLogin: async (login) => {
        return await RepertorioModel.find({ criadoPor: login })
        .select('nome descricao curtidas private musicas')
        .sort({ createdAt: -1 })  // Ordenando do mais recente para o mais antigo
        .skip(skip)
        .limit(limit);
    }

}


module.exports = RepertorioManager