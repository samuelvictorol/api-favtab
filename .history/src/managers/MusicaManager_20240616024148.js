
const MusicaManager = {
    criarMusicas:async (musicas) => {
        const musicasIds = await Promise.all(musicas.map(async (musica) => {
            const novaMusica = new MusicaModel(musica);
            const musicaSalva = await novaMusica.save();
            return musicaSalva._id;
        }));
        return musicasIds;
    }
}

module.exports = MusicaManager;