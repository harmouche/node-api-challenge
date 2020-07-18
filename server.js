const express = require('express');
const server = express();

const helmet = require('helmet');

const actionsRouter = require('./routers/actionsRouter');
const projectsRouter = require('./routers/projectsRouter');

server.use(express.json());

server.use(helmet());

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>APIs Sprint Challenge</h2>`)
})

module.exports = server;