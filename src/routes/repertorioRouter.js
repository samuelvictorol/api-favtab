const router = require('express').Router()

const repertorioController = require('../controllers/RepertorioController');

router
    .route('/novo-repertorio')
    .post((req, res) => repertorioController.novoRepertorio(req, res))

module.exports = router