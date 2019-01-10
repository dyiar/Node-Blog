const express = require('express');
const morgan = require('morgan');
const userDb = require('../data/helpers/userDb.js');


const server = express();

// middleware

server.use(express.json()); //built-in
server.use(morgan('short')); // logging middleware


function makeCapital(req, res, next) {
   let name = req.body.name;

   let uppercase = name[0].toUpperCase() + name.substring(1);
   
   req.body.name = uppercase;

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

server.get('/users/:id', (req, res) => {
    const id = req.params.id;
    userDb.get(id)
    .then(user => {
        if(user) {
            res.status(200).send({ user });
        } else {
            res.status(404).send({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(500).send({ error: "The user information could not be retrieved." })
    })
})

server.post('/users/create', makeCapital, async (req, res) => {
    const userInfo = req.body;

    userDb.insert(userInfo)
    .then(result => {
        userDb.get(result.id)
        .then(user => {
            res.status(201).send({ user });
        })
        .catch(err => 
            res.status(400).send({ errorMessage: "Please provide a Name." })
    );
})
.catch(err => 
    res.status(500).send({ error: "There was an error while saving the user to the database." }))
})

server.put('/users/:id', makeCapital, async (req, res) => {
    const id = req.params.id;
    const userChange = req.body;

   userDb.get(id)
   .then(user => {
       if (user) {
        userDb.update(id, userChange).then(count => 
            res.status(200).send('1')
        )
        .catch(err => res.status(400).send({ errorMessage: "Please provide updated information for this user." }));
       } else {
           res.status(404).send({ message: "The user does not exist." })
       }
   }) 
   .catch(err => res.status(500).send({ error: "The user could not be modified." }))


})

server.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    userDb.get(id)
    .then(user => {
        if(user) {
            userDb.remove(id).then(count => {
                res.status(200).send({ deleted: "One record" })
            })
        } else {
            res.status(404).send({ message: "The user with that ID doesn't exist." })
        }
    })
    .catch(err => res.status(500).send({ error: "The user could not be removed." }))
})

server.get('/users/posts/:id', (req, res) => {
    const id = req.params.id;

    userDb.get(id)
    .then(user => {
        if(user) {
        userDb.getUserPosts(id).then(result => 
            res.status(200).send({ result }));
        } else {
            res.status(404).send({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(() => res.status(500).send({ error: "The posts could not be retrieved." }))
})

module.exports = server;