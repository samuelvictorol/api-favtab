const router = require('express').Router()

const repertorioController = require('../controllers/RepertorioController');

router
    .route('/novo-repertorio')
    .post((req, res) => repertorioController.novoRepertorio(req, res))
router
    .route('/repertorios/:login/:senha?')
    .get((req, res) => repertorioController.getMeusRepertorios(req, res))
router
    .route('/repertorios')
    .post((req, res) => repertorioController.getOneRepertorio(req, res))
router
    .route('/musica')
    .post((req, res) => repertorioController.getOneMusica(req, res))
module.exports = router