const router = require('express').Router()

const usuarioController = require('../controllers/UsuarioController');

router
    .route('/usuario')
    .post((req, res) => usuarioController.registrar(req, res))
    // .put((req,res) => usuarioController.resetPassword(req,res))
    
router
    .route('/login')
    .post((req,res) => usuarioController.validaUsuario(req,res))
    
module.exports = router