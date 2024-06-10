const { Repertorio: RepertorioModel } = require("../models/Repertorio");
const { Musica: MusicaModel } = require("../models/Musica");
const { Usuario: UsuarioModel } = require("../models/Usuario");
const bcrypt = require("bcrypt");

const repertorioController = {
    novoRepertorio: async (req, res) => {
        const { nome, descricao, genero, private, login, musicas } = req.body;
        console.log(req.body);
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
            let query = { criadoPor: login };
            if (!senha || senha.trim() === '') {
                query.private = false;
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
            }
    
            const repertorios = await RepertorioModel.find(query)
                .select('nome descricao curtidas private musicas')
                .sort({ createdAt: -1 })  // Ordenando do mais recente para o mais antigo
                .skip(skip)
                .limit(limit);
    
            const totalItems = await RepertorioModel.countDocuments(query);
    
            const repertoriosWithMusicasSize = repertorios.map(repertorio => ({
                ...repertorio.toObject(),
                musicas_size: repertorio.musicas.length,
            }));
    
            return res.status(200).json({
                repertorios: repertoriosWithMusicasSize,
                pagination: {
                    page: parseInt(page),
                    rowsPerPage: limit,
                    totalItems,
                    totalPages: Math.ceil(totalItems / limit),
                    isLastPage: skip + repertorios.length >= totalItems,
                    isFirstPage: page == 1,
                }
            });
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao buscar repertórios',
                error: error.message,
            });
        }
    },
    
    getOneRepertorio: async (req, res) => {
        const { _id, login, senha } = req.body;
    
        try {
            // Buscar o repertório pelo ID e popular apenas os campos nome e link_audio das músicas
            const repertorio = await RepertorioModel.findById(_id)
                .populate({
                    path: 'musicas',
                    select: '_id nome link_audio' // Selecionar apenas os campos nome e link_audio
                });
    
            if (!repertorio) {
                return res.status(404).json({
                    message: 'Repertório não encontrado',
                });
            }
    
            if (repertorio.private) {
                if (!senha || senha.trim() === '') {
                    return res.status(401).json({
                        message: 'Senha é obrigatória para acessar repertório privado',
                    });
                }
                const usuario = await UsuarioModel.findOne({ login });
                if (!usuario) {
                    return res.status(404).json({
                        message: 'Usuário não encontrado',
                    });
                } else if (senha !== usuario.senha) {
                    return res.status(401).json({
                        message: 'Você não tem permissão para acessar este repertório privado',
                    });
                }
            }
    
            return res.status(200).json({
                repertorio,
            });
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao buscar repertório',
                error: error.message,
            });
        }
    },
    getOneMusica: async (req, res) => {
        const { _id } = req.body;
    
        try {
            // Buscar a música pelo ID
            const musica = await MusicaModel.findById(_id);
            if (!musica) {
                return res.status(404).json({
                    message: 'Música não encontrada',
                });
            } else {
                return res.status(200).json({
                    musica,
                });
            }
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao buscar música',
                error: error.message,
            });
        }
    }

};

module.exports = repertorioController;
