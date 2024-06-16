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
    findByLogin: async (login, skip, limit) => {
        return await RepertorioModel.find({ criadoPor: login })
            .select('nome descricao curtidas private musicas')
            .sort({ createdAt: -1 })  // Ordenando do mais recente para o mais antigo
            .skip(skip)
            .limit(limit);
    },
    findById: async (id) => {
        const repertorio = await RepertorioModel.findById(id);
        if ) {

        }
        return await RepertorioModel.findById(id)

    },

}

module.exports = RepertorioManager