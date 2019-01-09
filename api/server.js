const express = require('express');
const morgan = require('morgan');
const userDb = require('../data/helpers/userDb.js');


const server = express();

// middleware

server.use(express.json()); //built-in
server.use(morgan('short')); // logging middleware

server.use(doubler);

function doubler(req, res, next) {
    const value = req.body.number || 0;

    req.double=value * 2

    next();
}

// routes
// server.get('/', (req, res) => {
//     res.send('server alive');
// });

server.get('/users', (req, res) => {
    userDb.get()
    .then(users => {
        res.status(200).send({ users });
    })
    .catch(err => {
        res.send(500).send({ error: "The users could not be retrieved." })
    })
})

module.exports = server;