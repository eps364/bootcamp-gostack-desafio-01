const express = require('express');

const server = express();

server.use(express.json());


const projects = [];

function checkProjectExists(req, res, next) {

}

function logRequests(req, res, next) {

}

//server.use(logRequests);


server.get('/projects', (req, res) => {
    res.status(200).json(projects)
});


server.post('/projects', (req, res) => {

});


server.put('/projects/:id', checkProjectExists, (req, res) => {

});

server.delete('/projects/:id', checkProjectExists, (req, res) => {

});


server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {

});

server.listen(3000);