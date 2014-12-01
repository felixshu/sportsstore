/**
 * Created by FelixGrayson on 2014/12/1.
 */

var express = require("express");
var router = express.Router();

//GET home page

router.get('/', function(req,res){
    res.render('default',{title:'Sport Store'});
});

module.exports = router;