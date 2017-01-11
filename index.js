var express = require('express');
var app = express();
var data = require('./getData');
app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
    res.render('index.jade');
});
app.get('/user/:id', function(req, res) {
    var user = req.params.id;
    data.getData(user);
    data.emitter.on(user + 'datadone', function(wdata, mdata, user) {
        console.log(user + 'datadone');
        res.render('chart.jade', { weekData: wdata, monthData: mdata, user: user });
    });
});
app.get('/ajax/:id', function(req, res) {
    console.log('ni hao');
    var user = req.params.id;
    console.log(user);
    data.getData(user);

    data.emitter.on(user + 'datadone', function(wdata, mdata, user) {
        console.log(user + 'datadone');
        res.type('json');
        res.status(200).json({ weekData: wdata, monthData: mdata, user: user });
        res.end();
    });
});
app.listen(3000);