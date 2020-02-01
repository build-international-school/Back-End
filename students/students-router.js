const router = require('express').Router();

const Students = require('./students-model.js');

router.get('/', (req, res) => {
  Students.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Students.findById(id)
  .then(student => {
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: `Could not find student ${id}` })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get Students' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Students.findById(id)
  .then(student => {
    if (student) {
      Students.update(changes, id)
      .then(() => {
        res.status(201).json({ message: `Student ${id} successfully updated`});
      });
    } else {
      res.status(404).json({ message: `Could not find student ${id}` });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update student' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Students.remove(id)
  .then(deleted => {
    if (deleted) {
      res.status(201).json({ message: `Student ${id} successfully deleted` });
    } else {
      res.status(404).json({ message: 'Could not find student with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete student' });
  });
});

module.exports = router;