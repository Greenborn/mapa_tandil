const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require("body-parser")
const fs = require("fs")
dotenv.config();

const app = express();
const port = process.env.service_port_api;

app.use(bodyParser.json({ limit: '10mb' }));

app.get('/reclamos', (req, res) => {
    console.log('/reclamos')//, req.body);
    let data = []
    return res.status(200).send({ "item": data });
});

app.post('/reclamo', (req, res) => {
    console.log('/reclamo')//, req.body);

    try {
        return res.status(200).send({ "stat": true });
    } catch (error) {
        console.log(error)
        return res.status(200).send({ "stat": false });
    }
});


app.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`);
});

