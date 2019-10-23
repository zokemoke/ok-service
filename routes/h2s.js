const express = require('express');
const h2s = require('../models/h2s');
const router = express.Router();

function find(res, filter = {}) {
  h2s.find(filter).exec(function(err, data) {
    if (err) {
      res.send({
        status: 'error',
        message: err.message
      });
    } else {
      res.json({
        status: 'success',
        data: data
      });
    }
  });
}

function findOne(res, filter) {
  nhso.findOne(filter).exec(function(err, data) {
    if (err) {
      res.send({
        status: 'error',
        message: err.message
      });
    } else {
      res.json({
        status: 'success',
        data: data
      });
    }
  });
}

router.get('/', function(req, res) {
  find(res);
});

router.get('/:device', function(req, res) {
  findOne(res, {
    Device: req.params.device
  });
});

router.post('/', function(req, res) {
  console.log(req.body);
  // return;
  let data = req.body;
  h2s.create(
    {
      LogTime: data.LogTime,
      Type: data.Type,
      Device: {
        Name: data.Device.Name,
        Model: data.Device.Model,
        MACAddress: data.Device.MACAddress,
        IP: data.Device.IP
      },
      data: data.data
    },
    function(err, data) {
      if (err) {
        res.send('error saving');
      } else {
        res.send(data);
      }
    }
  );
});

module.exports = router;