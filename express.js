var express = require('express');
var app = express();
app.set('views', './views');
app.set('view engine', 'jade');
module.exports = function(data) {
    app.get('/', function(req, res) {
        res.render('chart.jade', { dayData: data });
    });
    app.listen(3000);
}