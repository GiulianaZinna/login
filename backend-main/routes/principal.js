var express = require('express');
var router = express.Router();

/* GET principal page. */
router.get('/principal', function(req, res, next) {
  res.render('principal', { title: 'Express' });
});

module.exports = router;
