const express = require('express');
const router = express.Router();

const Projects = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects);
        console.log("Projects from get request successful", Projects)
    })
    .catch(error => {
        console.log("Error from Projects get request", error)
        res.status(500).json({ message: "Error retrieving Projects"});
    });
});

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
.then(project => {
  if (project) {
    res.status(200).json(project);
  } else {
    res.status(404).json({ message: 'project not found' });
  }
})
.catch(error => {
  // log error to server
  console.log(error);
  res.status(500).json({
    message: 'Error retrieving the project',
  });
});
});

router.post('/', (req, res) => {
    Projects.insert(req.body)
    .then( project => {
        res.status(201).json(project);
    })
    .catch(error => {
        console.log("error adding an project", error);
        res.status(500).json({ message: "Error adding project to database"});
    });
});

router.put('/:id', (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(project => {
        if(project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({ message: 'project could not be found'});
        }
    })
    .catch(error => {
        console.log("error updating project", error);
        res.status(500).json({ message: 'there was an error updating the project'});
    });
});

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then(count => {
        if(count === 0) {
            res.status(404).json({
                message: 'this project does not exist'
            })
        } else {
            res.status(200).json(count);
        }
    })
    .catch(error => {
        res.status(500).json("error while deleting")
    })
});


module.exports = router;