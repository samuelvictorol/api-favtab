const { Repertorio: RepertorioModel } = require("../models/Repertorio");
const { Musica: MusicaModel } = require("../models/Musica");
const { Usuario: UsuarioModel } = require("../models/Usuario");
const bcrypt = require("bcrypt");

const repertorioController = {
    novoRepertorio: async (req, res) => {
        const { nome, descricao, genero, private, login, musicas } = req.body;

        try {
            // Primeiro, criar todas as músicas e obter seus IDs
            let musicasIds = [];
            if(musicas){
                musicasIds = await Promise.all(musicas.map(async (musica) => {
                    const novaMusica = new MusicaModel(musica);
                    const musicaSalva = await novaMusica.save();
                    return musicaSalva._id;
                }));
            }

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
        const { page = 1, rowsPerPage = 5 } = req.query;  // Parâmetros de paginação

        if (!login || login.trim() === '') {
            return res.status(400).json({
                message: 'Campo Login é obrigatório',
            });
        }

        const skip = (page - 1) * rowsPerPage;
        const limit = parseInt(rowsPerPage);

        try {
            if (!senha || senha.trim() === '') {
                // Se a senha não for fornecida, apenas repertórios públicos serão retornados
                const repertorios = await RepertorioModel.find({ criadoPor: login, private: false })
                    .select('nome descricao curtidas private')
                    .sort({ createdAt: -1 })  // Ordenando do mais recente para o mais antigo
                    .skip(skip)
                    .limit(limit);

                const totalItems = await RepertorioModel.countDocuments({ criadoPor: login, private: false });

                return res.status(200).json({
                    repertorios,
                    pagination: {
                        page: parseInt(page),
                        rowsPerPage: limit,
                        totalItems,
                        totalPages: Math.ceil(totalItems / limit),
                        isLastPage: skip + repertorios.length >= totalItems,
                        isFirstPage: page == 1
                    }
                });
            } else {
                const usuario = await UsuarioModel.findOne({ login });
                if (!usuario) {
                    return res.status(404).json({
                        message: 'Usuário não encontrado',
                    });
                } else if (senha !== usuario.senha) {
                    return res.status(401).json({
                        message: 'Senha inválida',
                    });
                }

                // Se a senha for fornecida e válida, todos os repertórios serão retornados
                const repertorios = await RepertorioModel.find({ criadoPor: login })
                    .select('nome descricao curtidas private')
                    .sort({ createdAt: -1 })  // Ordenando do mais recente para o mais antigo
                    .skip(skip)
                    .limit(limit);

                const totalItems = await RepertorioModel.countDocuments({ criadoPor: login });

                return res.status(200).json({
                    repertorios,
                    pagination: {
                        page: parseInt(page),
                        rowsPerPage: limit,
                        totalItems,
                        totalPages: Math.ceil(totalItems / limit),
                        isLastPage: skip + repertorios.length >= totalItems,
                        isFirstPage: page == 1
                    }
                });
            }
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao buscar repertórios',
                error: error.message,
            });
        }
    },

};

module.exports = repertorioController;
