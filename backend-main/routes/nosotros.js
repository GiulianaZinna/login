var express = require('express');
var router = express.Router();

/* GET nosotros page. */
router.get('/nosotros', function(req, res, next) {
  res.render('nosotros', { title: 'Express' });
});

module.exports = router;