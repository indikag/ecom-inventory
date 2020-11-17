var express = require('express');
var router = express.Router();
var StockIn = require('../model/stock-in');

/* GET home page. */
router.get('/', function (req, res, next) {
    StockIn.findAll().then( (result) => res.json(result) )
});

module.exports = router;