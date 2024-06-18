const { Musica: MusicaModel } = require("../models/Musica");

const MusicaManager = {
    criarMusicas:async (musicas) => {
        const musicasIds = await Promise.all(musicas.map(async (musica) => {
            const novaMusica = new MusicaModel(musica);
            const musicaSalva = await novaMusica.save();
            return musicaSalva._id;
        }));
        return musicasIds;
    },
    findById: async (id) => {
        return await MusicaModel.findById(id);
    },
    adicionarLinksMusica: async (musicaId, links) => {
        const musica = await MusicaModel.findById(musicaId);
        musica.links_musica.push(...links);
        return await musica.save();
    }

}

module.exports = MusicaManager;