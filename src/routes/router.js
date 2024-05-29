const router = require('express').Router();

const loginRouter = require('./loginRouter');
const repertorioRouter = require('./repertorioRouter');
const favtabSettings = require('./favtabSettingsRouter');

router.use('/', favtabSettings)
router.use('/', loginRouter);
router.use('/', repertorioRouter);

module.exports = router;