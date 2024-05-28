const router = require('express').Router();

const loginRouter = require('./loginRouter');
const repertorioRouter = require('./repertorioRouter');

router.use('/', loginRouter);
router.use('/', repertorioRouter);

module.exports = router;