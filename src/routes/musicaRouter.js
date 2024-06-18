const router = require('express').Router()

const musicaController = require('../controllers/MusicaController');

router
    .route('/nova-musica')
    .post((req, res) => musicaController.criarMusica(req, res))

    module.exports = router