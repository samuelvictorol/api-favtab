const router = require('express').Router();

const loginRouter = require('./loginRouter');
const repertorioRouter = require('./repertorioRouter');
const musicaRouter = require('./musicaRouter');
const favtabSettings = require('./favtabSettingsRouter');

router.use('/', favtabSettings)
router.use('/', loginRouter);
router.use('/', repertorioRouter);
router.use('/', musicaRouter);

module.exports = router;