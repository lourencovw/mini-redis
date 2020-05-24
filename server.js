const express = require('express');
const MiniRedis = require('./mini-redis');


const app = express();
const port = 8080;
const mn = new MiniRedis();

app.get('/', (req, res) => {
    res.send(mn.validation(req.query.cmd));
});

app.listen(port, () => console.log(`Mini Redis listening at http://localhost:${port}`));