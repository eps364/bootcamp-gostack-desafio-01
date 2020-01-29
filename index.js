const express = require('express');

const server = express();

server.use(express.json());

let numberOfRequests = 0;
const projects = [{
        "id": "3",
        "title": "Novo projeto",
        "tasks": []
    },
    {
        "id": "4",
        "title": "Novo projeto",
        "tasks": []
    },
    {
        "id": "5",
        "title": "Novo projeto",
        "tasks": []
    }
];

function checkProjectExists(req, res, next) {
    const {
        id
    } = req.params;
    const project = projects.find(p => p.id == id);

    if (!project) {
        return res.status(400).json({
            error: 'Project not found'
        });
    }

    return next();
}

function logRequests(req, res, next) {
    numberOfRequests++;
    console.log(`Method: ${req.method} | URL: ${req.url} | Número de requisições: ${numberOfRequests}`);
    return next();
}

server.use(logRequests);


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
        tasks: []
    }
    projects.push(project)

    res.status(201).json(project)
});

server.put('/projects/:id', checkProjectExists,(req, res) => {
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

server.delete('/projects/:id', checkProjectExists,(req, res) => {
    const {
        id
    } = req.params
    const project = projects.find(p => p.id == id)

    projects.splice(project, 1)
    res.status(200).send("Deleted Project")
});


server.post('/projects/:id/tasks', checkProjectExists,(req, res) => {
    const {
        id
    } = req.params
    const {
        title
    } = req.body
    const project = projects.find(p => p.id == id)

    project.tasks.push(title)

    res.status(201).json(project)
});

server.get('/projects/:id', checkProjectExists,(req, res) => {
    const {
        id
    } = req.params
    const project = projects.find(p => p.id == id)
    res.status(200).json(project)
});

server.listen(3000);