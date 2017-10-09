var express = require('express');
var app = express();
var data = require('./getData');
var userdb = require('./db')
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('public'));
app.get('/', function(req, res) {
    res.render('index.jade'); 
});
app.get('/user/:id', function(req, res) { //如果直接写路由/：id会导致与下面路由重叠，然后报错
    var user = req.params.id;
    data.getData(user, year);
    data.emitter.once(user + 'datadone', function(wdata, mdata, user) { //如果是on,再次触发相同事件时会报错
        console.log(user + 'datadone');
        res.render('chart.jade', { weekData: wdata, monthData: mdata, user: user });
    });
});
app.get('/ajax/:id', function(req, res) {
    var user = req.params.id;
    var year = req.query.year;
    console.log(user, year);
    userdb.read(user, year, function(doc){
        if(doc){//如果数据库中有
            res.status(200).json(doc.data);
            res.end();
        }else{
            data.getData(user, year); //获取user的小绿点数据
        }
    })


    data.emitter.once(user + 'datadone', function(wdata, mdata, user, year) { //监听datadone事件
        console.log(user + 'datadone');
        let userData = { weekData: wdata, monthData: mdata, user: user, year};
        res.status(200).json(userData);
        userdb.insert(user, year, userData);
        res.end();
    });
    data.emitter.once(user + 'error', function(status, user) {
        console.log(user + 'error', status);
        res.status(200).json({ error: status, user: user });
        res.end();
    });
});
app.get(/pk/, function(req, res) {
    var userA = req.query.userA;
    var userB = req.query.userB;
    console.log(userA, userB);
    data.getData(userA);
    data.getData(userB);
    data.emitter.once(userA + 'datadone', function(wdata, mdata, user) {
        console.log(user + 'datadone');
        var userA_wdata = wdata,
            userA = user;
        data.emitter.once(userB + 'datadone', function(wdata, mdata, user) {
            console.log(user + 'datadone');
            var userB_wdata = wdata,
                userB = user;
            res.status(200).json({ userA: { name: userA, wdata: userA_wdata }, userB: { name: userB, wdata: userB_wdata } });
            res.end();
        });
    });
});
app.listen(3000);
console.log('server started at http://localhost:3000')