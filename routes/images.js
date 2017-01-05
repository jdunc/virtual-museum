'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
var fs = require('fs');

router.get('/images/:id', (req, res, next) =>{
  var id = req.params.id;
  fs.readdir(`./images/${id}`, function(err, items) {
    if(err){
      res.send(err);
    }
    else{
      // console.log(items);
      // for (var i=0; i<items.length; i++) {
      //     console.log(items[i]);
      // }
      res.send(items);
    }
  });
});

module.exports = router;
