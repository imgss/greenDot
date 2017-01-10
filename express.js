var express = require('express');
var app = express();
app.set('views', './views');
app.set('view engine', 'jade');
module.exports = function(wdata, mdata, user) {
    app.get('/', function(req, res) {
        res.render('chart.jade', { weekData: wdata, monthData: mdata, user: user });
    });
    app.get('/:id', function(req, res) {
        res.render('chart.jade', { weekData: wdata, monthData: mdata, user: user });
    });
    app.listen(3000);
}