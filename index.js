const express = require('express');
const cors = require('cors');
const app = express();

app.listen(3333);
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    return res.json('server is up');
})
module.exports = app;  