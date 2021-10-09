/** 
 @author Parth Shah
 @studentID 301171805
 @date October 7, 2021
 @description Personal Portfolio website- Authentication
**/ 

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;