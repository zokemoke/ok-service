const express = require('express');
const nhso = require('../models/nhso');
const router = express.Router();

function find(res, filter = {}) {
  nhso.find(filter).exec(function(err, data) {
    if (err) {
      res.send({
        status:'error',
        message:err.message
      });
    } else {
      res.json({
        status:'success',
        data: data
      });
    }
  });
}

function findOneAndUpdate(res, filter, data) {
  nhso.findOneAndUpdate(filter, { $set: data }, { upsert: true }, function(
    err,
    data
  ) {
    if (err) {
      res.send({
        status:'error',
        message:err.message
      });
    } else {
      res.json({
        status:'success',
        data: data
      });
    }
  });
}

function findOne(res, filter) {
  nhso.findOne(filter).exec(function(err, data) {
      if (err) {
        res.send({
          status:'error',
          message:err.message
        });
      } else {
        res.json({
          status:'success',
          data: data
        });
      }
    });
}

router.get('/', function(req, res) {
  find(res);
});

router.get('/:local', function(req, res) {
  findOne(res,{
    local: req.params.local
  })
});

router.post('/', function(req, res) {
  req.body = req.body.data;
  findOneAndUpdate(
    res,
    { local: req.body.local },
    {
      datetime: req.body.datetime,
      token: req.body.token,
      cid: req.body.cid,
      local: req.body.local
    }
  );

  //   token.save(function(err, data) {
  //     if (err) {
  //       res.send("error saving nhso");
  //     } else {
  //       res.send(data);
  //     }
  //   });
});

module.exports = router;
