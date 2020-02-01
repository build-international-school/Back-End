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
  .then(admin => {
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: 'Could not find admin with given id.' })
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
  .then(admin => {
    if (admin) {
      Workers.update(changes, id)
      .then(updatedadmin => {
        res.status(201).json({ message: `Admin ${id} successfully updated`});
      });
    } else {
      res.status(404).json({ message: 'Could not find admin with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update admin' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Workers.remove(id)
  .then(deleted => {
    if (deleted) {
      res.status(201).json({ message: `Admin ${id} successfully deleted` });
    } else {
      res.status(404).json({ message: 'Could not find admin with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete admin' });
  });
});

module.exports = router;