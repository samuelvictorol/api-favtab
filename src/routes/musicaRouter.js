const router = require('express').Router()

const musicaController = require('../controllers/MusicaController');

router
    .route('/nova-musica')
    .post((req, res) => musicaController.criarMusica(req, res))

router
    .route('/novos-links')
    .post((req, res) => musicaController.criarLinkMusica(req, res))

    router
    .route('/remover-links')
    .delete((req, res) => musicaController.removerLinks(req, res))

module.exports = router