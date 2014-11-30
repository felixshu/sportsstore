/**
 * Created by FelixGrayson on 2014/11/30.
 */

var express = require('express');
var path = require('path');

var app = express();

app.use(express.static());

app.listen(3030);
