const router = require('express').Router()
const favtabSettingsController = require('../controllers/FavtabSettingsController');

router
    .route('/initialize-app')
    .post((req, res) => favtabSettingsController.initializeApp(req, res))

module.exports = router
