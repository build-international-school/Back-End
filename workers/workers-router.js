const router = require('express').Router();

const Workers = require('./workers-model.js');

router.get('/', (req, res) => {
  Workers.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Workers.findById(id)
  .then(worker => {
    if (worker) {
      res.json(worker);
    } else {
      res.status(404).json({ message: 'Could not find worker with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get Workers' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Workers.findById(id)
  .then(worker => {
    if (worker) {
      Workers.update(changes, id)
      .then(() => {
        res.status(201).json({ message: `Worker ${id} successfully updated`});
      });
    } else {
      res.status(404).json({ message: 'Could not find worker with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update worker' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Workers.remove(id)
  .then(deleted => {
    if (deleted) {
      res.status(201).json({ message: `Worker ${id} successfully deleted` });
    } else {
      res.status(404).json({ message: 'Could not find worker with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete worker' });
  });
});

module.exports = router;