

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const fs = require('fs');
const bodyParser = require('body-parser');

router.post('/add_images_action', (req, res, next) => {
  const dir = `./images/${req.body.id}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  if (!req.files) {
    res.send('No files were uploaded.');
    return;
  }
  console.log('files:', Object.keys(req.files).length);
  console.log('body:', req.body);
  console.log('directory', dir);
  for (let i = 0; i < Object.keys(req.files).length; i++) {
    console.log(req.files[Object.keys(req.files)[i]]);
    const tempFile = req.files[Object.keys(req.files)[i]];
    tempFile.mv(`${dir}/${req.files[Object.keys(req.files)[i]].name}`, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.render('pages/add_images', {
          data: 'Images Uploaded!',
        });
      }
    });
  }
  console.log('add_images_action');
  // var tempPath = req.files.file.path,
  //       targetPath = path.resolve('./uploads/image.png');
  // knex('images').insert(req.body)
  // .returning(['id', 'name', 'location', 'dimensions', 'provenance', 'culture']).then((items) => {
  //   res.send(items[0]);
  // });
});

module.exports = router;
