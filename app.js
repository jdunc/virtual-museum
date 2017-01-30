'use strict';

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;
const bcrypt = require('bcrypt-as-promised');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const items = require('./routes/items');
const images = require('./routes/images');
const artists = require('./routes/artists');
const add_item = require('./routes/add_item');
const add_images = require('./routes/add_images');
const alter_item = require('./routes/alter_item');
const remove_item = require('./routes/remove_item');
const add_images_action = require('./routes/add_images_action');
const add_artist = require('./routes/add_artist');
const index = require('./routes/index');
const about = require('./routes/about');
const contact = require('./routes/contact');


// var nocache = require('superagent-no-cache');
var request = require('superagent');
// var prefix = require('superagent-prefix')('/static');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.static('images'))
app.use(bodyParser.json());
app.use(fileUpload());



app.use(add_images);
app.use(alter_item);
app.use(remove_item);
app.use(add_item);
app.use(items);
app.use(images);
app.use(artists);
app.use(add_images_action);
app.use(add_artist);
app.use(index);
app.use(about);
app.use(contact);

app.use((_req, res, _next) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  if (err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.message)
  }
  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log('Listening on port', port);
});
module.exports = app;
