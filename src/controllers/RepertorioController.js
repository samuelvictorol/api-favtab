const { Repertorio: RepertorioModel } = require("../models/Repertorio");
const { Musica: MusicaModel } = require("../models/Musica");
const { Usuario: UsuarioModel } = require("../models/Usuario");
const bcrypt = require("bcrypt");

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
    getUsersRepertorios: async (req, res) => {
        const { login, senha } = req.params;
        if(!login || login.trim() === ''){
            res.status(400).json({
                message: 'Campo Login é obrigatório',
            });
            return;
        }
        try{
            if(!senha || senha.trim() === ''){
                const repertorios = await RepertorioModel.find({ criadoPor: login, private: false }).populate('musicas');
                return res.status(200).json(repertorios);
            } else {
                const usuario = await UsuarioModel.findOne({ login });
                if(!usuario){
                    return res.status(404).json({
                        message: 'Usuário não encontrado',
                    });
                } else if(!(await bcrypt.compare(senha, usuario.senha))){
                    return res.status(401).json({
                        message: 'Senha inválida',
                    });
                }
                const repertorios = await RepertorioModel.find({ criadoPor: login }).populate('musicas');
                return res.status(200).json({repertorios});
            }
        } catch (error) {
            res.status(400).json({
                message: 'Erro ao buscar repertórios',
                error: error.message,
            });
        }
    },
};

module.exports = repertorioController;
