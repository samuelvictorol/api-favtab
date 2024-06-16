const { Musica: MusicaModel } = require("../models/Musica");
const UsuarioManager = require("../managers/UsuarioManager");
const RepertorioManager = require("../managers/RepertorioManager");
const MusicaManager = require("../managers/MusicaManager");

const repertorioController = {
    novoRepertorio: async (req, res) => {
        const { nome, descricao, genero, password, login, private, musicas } = req.body;
        try {
            if(!await UsuarioManager.getUser({login: login, senha: password})){
                return res.status(400).json({
                    message: 'Credenciais inválidas',
                });
            }
            if ( !await RepertorioManager.verificarLimiteRepertorio(login)) {
                return res.status(400).json({
                    message: 'O usuário já atingiu o limite de 10 repertórios [PACOTE GRATUITO]',
                });
            }
    
            let musicasIds = [];
            if (musicas) {
                musicasIds = await MusicaManager.criarMusicas(musicas);
            }
    
            const repertorio = {
                nome,
                descricao,
                genero,
                private,
                criadoPor: login,
                curtidas: 0,
                musicas: musicasIds,
            };
            
            const response =  await RepertorioManager.criar(repertorio);

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
    getMeusRepertorios: async (req, res) => {
        const { login, senha } = req.params;
        const { page = 1, rowsPerPage = 5 } = req.query;
        const skip = (page - 1) * rowsPerPage;
        const limit = parseInt(rowsPerPage);
    
        try {
            const usuario = await UsuarioManager.getUser({ login: login, senha: senha });
            if (!usuario) {
                return res.status(404).json({
                    message: 'Credenciais inválidas',
                });
            } 
    
            const repertorios = await RepertorioManager.findByLogin(login, skip, limit);
    
            const repertoriosWithMusicasSize = repertorios.map(repertorio => ({
                ...repertorio.toObject(),
                musicas_size: repertorio.musicas.length,
            }));
    
            return res.status(200).json({
                repertorios: repertoriosWithMusicasSize,
                pagination: {
                    page: parseInt(page),
                    rowsPerPage: limit,
                    totalItems: repertorios.length,
                    totalPages: Math.ceil(repertorios.length / limit),
                    isLastPage: skip + repertorios.length >= repertorios.length,
                    isFirstPage: page == 1,
                }
            });
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao buscar meus repertórios',
                error: error.message,
            });
        }
    },
    getOneRepertorio: async (req, res) => {
        const { _id, login, senha } = req.body;
    
        try {
            const repertorio = await RepertorioManager.findById(_id)
    
            if (!repertorio) {
                return res.status(404).json({
                    message: 'Repertório não encontrado',
                });
            }
            else if (repertorio.private) {
                if (!await UsuarioManager.getUser({ login:login, senha: senha })) {
                    return res.status(404).json({
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
    },

};

module.exports = repertorioController;
