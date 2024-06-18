const router = require('express').Router()

const musicaController = require('../controllers/MusicaController');

router
    .route('/nova-musica')
    .post((req, res) => musicaController.criarMusica(req, res))

router
    .route('/novo-link')
    .post((req, res) => musicaController.criarLinkMusica(req, res))

module.exports = router