require('dotenv').config()

const express = require('express');
const router = require('./src/routes/router');
const conn = require('./src/db/conn');
const cors = require('cors');
const app = express();

app.listen(process.env.PORT);
conn()
app.use(cors());
app.use(express.json());
app.use('/api', router);

module.exports = app;  