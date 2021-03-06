var express = require('express');
var router = express.Router();

module.exports = function (Punch) {
  router.post('/', function (req, res, next) {
    var fighter1 = req.body.fighter1;
    var fighter2 = req.body.fighter2;
    console.log('API CALL : POST to punch : ' + fighter1 + '/' + fighter2);
    Punch.findOneAndUpdate({}, {
      fighter1: fighter1,
      fighter2: fighter2
    }, function (err, punch) {
      if (err) { next(err); }
      console.log('successfully updated punch.');
      res.json(punch);
    });
  });


  router.post('/incr/', function (req, res, next) {
    console.log(req.body);
    var accum1 = req.body.accum1;
    var accum2 = req.body.accum2;
    console.log('API CALL : POST to increase punch count : ' + accum1 + '/' + accum2);

    Punch.findOneAndUpdate({},
        { $inc: { fighter1: accum1, fighter2: accum2 } }, function (err, punch) {
          if (err) { next(err); }
          res.json(punch);
        });
  });

  router.get('/', function (req, res, next) {
    console.log('API CALL : GET to punch');

    Punch.findOne({}, function (err, punch) {
      if (err) { next(err); }
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('content-type', 'text/javascript');

      if (req.query.callback) {
        res.jsonp(punch);
      } else {
        res.json(punch);
      }
    });
  });

  return router;
};
