const UsuarioManager = require("../managers/UsuarioManager");
const MusicaManager = require("../managers/MusicaManager");
const RepertorioManager = require("../managers/RepertorioManager");

const musicaController = {
    criarMusica: async (req, res) => {
        const { musica, login, senha, repertorioId } = req.body;
        try {
            if(!await UsuarioManager.getUser({login: login, senha: senha})){
                return res.status(400).json({
                    message: 'Credenciais inválidas',
                });
            }
            musica.criadoPor = login;
            const repertorio = await RepertorioManager.findById(repertorioId);
            if(!repertorio){
                return res.status(404).json({
                    message: 'Repertório não encontrado',
                });
            } else {
                if(repertorio.criadoPor !== login){
                    return res.status(403).json({
                        message: 'Usuário não autorizado',
                    });
                } else {
                    const musicaResponse = await MusicaManager.criarMusicas([musica]);
                    repertorio.musicas.push(musicaResponse[0]);
                    repertorio.save();
                    return res.status(201).json({
                        message: musica.nome + ' foi adicionada com sucesso no repertório ' + repertorio.nome,
                        musica: musicaResponse[0]
                    });
                }
            }
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao criar música',
                error: error.message,
            });
        }
    },
    criarLinkMusica: async (req, res) => {
        const { musicaId, links, login, senha } = req.body;
        try {
            if(!await UsuarioManager.getUser({login: login, senha: senha})){
                return res.status(400).json({
                    message: 'Credenciais inválidas',
                });
            }
            const musica = await MusicaManager.findById(musicaId);
            if(!musica){
                return res.status(404).json({
                    message: 'Música não encontrada',
                });
            } else {
                    await MusicaManager.adicionarLinksMusica(musicaId, links)
                        .then(() => {
                            return res.status(201).json({
                                message: 'Link/Letra adicionado(a) a musica ' + musica.nome + ' com sucesso',
                            });
                        })
                        .catch((error) => {
                            return res.status(400).json({
                                message: 'Erro ao adicionar link/letra a música',
                                error: error.message,
                            });
                        });
            }
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao criar link de música',
                error: error.message,
            });
        }
    },removerMusica: async (req, res) => {
        const { musicaId, login, senha } = req.body;
        try {
            if(!await UsuarioManager.getUser({login: login, senha: senha})){
                return res.status(400).json({
                    message: 'Credenciais inválidas',
                });
            }
            const musica = await MusicaManager.findById(musicaId);
            if(!musica){
                return res.status(404).json({
                    message: 'Música não encontrada',
                });
            } else {
                await musica.remove();
                return res.status(200).json({
                    message: 'Música removida com sucesso',
                });
            }
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao remover música',
                error: error.message,
            });
        }
    
        
    },
    removerLinks: async (req, res) => {
        const { musicaId, linksIds, login, senha } = req.body;
        try {
            if(!await UsuarioManager.getUser({login: login, senha: senha})){
                return res.status(400).json({
                    message: 'Credenciais inválidas',
                });
            }
            const musica = await MusicaManager.findById(musicaId);
            if(!musica){
                return res.status(404).json({
                    message: 'Música não encontrada',
                });
            } else {
                musica.links_musica = musica.links_musica.filter((link) => !linksIds.includes(link._id.toString()));
                await musica.save();
                return res.status(200).json({
                    message: 'Links removidos com sucesso',
                });
            }
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao remover link de música',
                error: error.message,
            });
        }
    }
}

module.exports = musicaController;