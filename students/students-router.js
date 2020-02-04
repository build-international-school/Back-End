const router = require('express').Router();

const Students = require('./students-model.js');

const cloudinary = require('cloudinary').v2;


router.get('/', (req, res) => {
  Students.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

// GET /api/students/images
router.get('/images', (req, res) => {
  Students.findPics()
    .then(pictures => {
      res.status(200).json(pictures);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get profile picture urls' });
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

// Cloudinary
cloudinary.config({
  cloud_name: 'oldman',
  api_key: '281342463124117',
  api_secret: 'R4VkwzpeZaRR_IsmH0UpXzczMpY',
});

// POST /api/drivers/:id/image
router.post('/:id/image', (req, res) => {
  const file = req.files.image;
  // console.log(file);
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    // console.log('CLOUDINARY', result);
    Students.addProfilePic({ url: result.url, driver_id: req.params.id })
      .then(output => {
        res.json({ success: true, result });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error uploading to Cloudinary' });
      });
  });
});

// PUT /api/drivers/:id/image
router.put('/:id/image', (req, res) => {
  const file = req.files.image;
  // console.log('REQ', req);
  // console.log('REQ.FILES', req.files);
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    // console.log('CLOUDINARY', result);
    Students.updateProfilePic({ url: result.url }, req.body.image_id)
      .then(output => {
        res.json({ success: true, result });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error uploading to Cloudinary' });
      });
  });
});

// GET /api/drivers/:id/image
router.get('/:id/image', (req, res) => {
  const { id } = req.params;
  Students.findPic(id)
    .then(pictures => {
      res.status(200).json(pictures);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get profile picture urls' });
    });
});



module.exports = router;