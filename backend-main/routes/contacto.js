var express = require('express');
var router = express.Router();

/* GET contacto page. */
router.get('/contacto', function(req, res, next) {
  res.render('contacto', { title: 'Express' });
});

module.exports = router;