var express = require('express');
var router = express.Router();
const { postController } = require('../controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/posts', postController.index)

module.exports = router;
