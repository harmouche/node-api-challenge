const express = require('express');
const router = express.Router();

const Actions = require('../data/helpers/actionModel');

router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions);
        console.log("actions from get request successful", Actions)
    })
    .catch(error => {
        console.log("Error from actions get request", error)
        res.status(500).json({ message: "Error retrieving actions"});
    });
});

router.get('/:id', (req, res) => {
      Actions.get(req.params.id)
  .then(action => {
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: 'action not found' });
    }
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the action',
    });
  });
});

router.post('/', (req, res) => {
    Actions.insert(req.body)
    .then( action => {
        res.status(201).json(action);
    })
    .catch(error => {
        console.log("error adding an action", error);
        res.status(500).json({ message: "Error adding action to database"});
    });
});

router.put('/:id', (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(action => {
        if(action) {
            res.status(200).json(action)
        } else {
            res.status(404).json({ message: 'action could not be found'});
        }
    })
    .catch(error => {
        console.log("error updating action", error);
        res.status(500).json({ message: 'there was an error updating the action'});
    });
});

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
    .then(count => {
        if(count === 0) {
            res.status(404).json({
                message: 'this action does not exist'
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