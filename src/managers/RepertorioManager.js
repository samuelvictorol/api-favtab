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
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
    },
    findById: async (id) => {
        const repertorio = await RepertorioModel.findById(id);
        if (repertorio.musicas && repertorio.musicas.length > 0) {
            return repertorio.populate({
                path: 'musicas',
                select: 'nome link_audio'
            });
        }
        return repertorio;
    },  
    removerRepertorios: async (idsRepertoriosArray, user) => {
        return await RepertorioModel.deleteMany({ _id: { $in: idsRepertoriosArray }, criadoPor: user.login });
    },
}

module.exports = RepertorioManager