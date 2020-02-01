const router = require('express').Router();

const Admins = require('./admins-model.js');

router.get('/', (req, res) => {
  Admins.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Admins.findById(id)
  .then(admin => {
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: 'Could not find admin with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get Admins' });
  });
});

router.get('/:id/instructions', (req, res) => {
  const { id } = req.params;

  Admins.findSteps(id)
  .then(steps => {
    if (steps.length) {
      res.json(steps);
    } else {
      res.status(404).json({ message: 'Could not find steps for given admin' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get steps' });
  });
});

router.post('/', (req, res) => {
  const adminData = req.body;

  Admins.add(adminData)
  .then(admin => {
    res.status(201).json(admin);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new admin' });
  });
});

router.post('/:id/instructions', (req, res) => {
  const stepData = req.body;
  const { id } = req.params; 

  Admins.findById(id)
  .then(admin => {
    if (admin) {
      Admins.addStep(stepData, id)
      .then(step => {
        res.status(201).json(step);
      })
    } else {
      res.status(404).json({ message: 'Could not find admin with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new step' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Admins.findById(id)
  .then(admin => {
    if (admin) {
      Admins.update(changes, id)
      .then(updatedadmin => {
        res.json(updatedadmin);
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

  Admins.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find admin with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete admin' });
  });
});

module.exports = router;