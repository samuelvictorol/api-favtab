const router = require('express').Router()

const repertorioController = require('../controllers/RepertorioController');

router
    .route('/novo-repertorio')
    .post((req, res) => repertorioController.novoRepertorio(req, res))
router
    .route('/repertorios/:login/:senha?')
    .get((req, res) => repertorioController.getUsersRepertorios(req, res))

module.exports = router