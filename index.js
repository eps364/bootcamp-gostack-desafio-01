const express = require('express');

const server = express();

server.use(express.json());


const projects = [{
        "id": "3",
        "title": "Novo projeto",
        "task": []
    },
    {
        "id": "4",
        "title": "Novo projeto",
        "task": []
    },
    {
        "id": "5",
        "title": "Novo projeto",
        "task": []
    }
];

function checkProjectExists(req, res, next) {

}

function logRequests(req, res, next) {

}

//server.use(logRequests);


server.get('/projects', (req, res) => {
    res.status(200).json(projects)
});


server.post('/projects', (req, res) => {
    const {
        id,
        title
    } = req.body
    const project = {
        id,
        title,
        task: []
    }
    projects.push(project)

    res.status(201).json(project)
});

server.put('/projects/:id', (req, res) => {
    const {
        id
    } = req.params
    const {
        title
    } = req.body

    const project = projects.find(p => p.id == id)

    project.title = title;

    res.status(200).json(project)

});

server.delete('/projects/:id',  (req, res) => {
    const { id } = req.params
    const project = projects.find(p => p.id == id)
    const deleted = project
    projects.splice(project,1)
    res.status(200).send("Deleted Project")
});


server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {

});

server.listen(3000);