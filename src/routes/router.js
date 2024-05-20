const router = require('express').Router();

const loginRouter = require('./loginRouter');

router.use('/', loginRouter);

module.exports = router;