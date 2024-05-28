const { Repertorio: RepertorioModel } = require("../models/Repertorio");
const { Musica: MusicaModel } = require("../models/Musica");

const repertorioController = {
    novoRepertorio: async (req, res) => {
        const { nome, descricao, genero, private, login, musicas } = req.body;

        try {
            // Primeiro, criar todas as músicas e obter seus IDs
            const musicasIds = await Promise.all(musicas.map(async (musica) => {
                const novaMusica = new MusicaModel(musica);
                const musicaSalva = await novaMusica.save();
                return musicaSalva._id;
            }));

            // Criação do objeto Repertório com IDs das músicas
            const repertorio = {
                nome,
                descricao,
                genero,
                private,
                criadoPor: login,
                curtidas: 0,
                musicas: musicasIds,
            };

            // Criação do novo repertório no banco de dados
            const response = await RepertorioModel.create(repertorio);

            // Resposta de sucesso
            res.status(201).json({
                response,
                message: `Repertório ${nome} registrado com sucesso`,
            });
        } catch (error) {
            // Resposta de erro
            res.status(400).json({
                message: 'Erro ao registrar repertório',
                error: error.message,
            });
        }
    },
};

module.exports = repertorioController;
