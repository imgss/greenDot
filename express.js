var express = require('express');
var app = express();
app.set('views', './views');
app.set('view engine', 'jade');
module.exports = function(wdata, mdata) {
    app.get('/', function(req, res) {
        res.render('chart.jade', { weekData: wdata, monthData: mdata });
    });
    app.listen(3000);
}