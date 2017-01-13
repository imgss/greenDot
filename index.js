var express = require('express');
var app = express();
var data = require('./getData');
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('public'));
app.get('/', function(req, res) {
    res.render('index.jade');
});
app.get('/user/:id', function(req, res) { //如果直接写路由/：id会导致与下面路由重叠，然后报错
    var user = req.params.id;
    data.getData(user);
    data.emitter.once(user + 'datadone', function(wdata, mdata, user) { //如果是on,再次触发相同事件时会报错
        console.log(user + 'datadone');
        res.render('chart.jade', { weekData: wdata, monthData: mdata, user: user });
    });
});
app.get('/ajax/:id', function(req, res) {
    console.log('ni hao');
    var user = req.params.id;
    console.log(user);
    data.getData(user);

    data.emitter.once(user + 'datadone', function(wdata, mdata, user) {
        console.log(user + 'datadone');
        res.status(200).json({ weekData: wdata, monthData: mdata, user: user });
        res.end();
    });
});
app.listen(3000);