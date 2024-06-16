
const MusicaManager = {
    criarMusicas:async (musica) => {
        const musicasIds = await Promise.all(musicas.map(async (musica) => {
            const novaMusica = new MusicaModel(musica);
            const musicaSalva = await novaMusica.save();
            return musicaSalva._id;
        }));
        
    }
}

module.exports = MusicaManager;