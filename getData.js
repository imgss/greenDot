var https = require('https'),
    eventEmitter = require("events").EventEmitter,
    http = require('http');
var cheerio = require('cheerio');
var app = require('./express.js');
var _ = require('lodash');
var fs = require('fs');
var queryStr = 'https://github.com/ruanyf';
var emitter = new eventEmitter();

function getData(url) {
    var dayDatas = [];
    var pageStr = '';
    var req = https.get(url, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            pageStr += chunk;
        });

        res.on('end', function() {
            $ = cheerio.load(pageStr);
            var days = $("g rect");
            for (var i = 0; i < days.length; i++) {
                var daycount = parseInt($(days[i]).attr('data-count')); //日贡献
                var date = $(days[i]).attr('data-date'); //日期
                var newObj = {};
                newObj.date = date;
                newObj.data = daycount;
                dayDatas.push(newObj);
            }
            weekDatas = _.chunk(dayDatas, 7);
            console.log('weekDatas');
            dayDatas = _.filter(dayDatas, function(o) { //过滤出2016年的数据
                return (o.date.split('-'))[0] == '2016';
            })
            monthDatas = _.groupBy(dayDatas, function(o) {
                return (o.date.split('-'))[1];
            });
            //console.log(JSON.stringify(monthDatas));
            emitter.emit('dataDone', JSON.stringify(weekDatas), JSON.stringify(monthDatas));


        });
    });
}
getData(queryStr);
emitter.on('dataDone', function(weekdata, monthdata) {
    // http.createServer(function(req, res) {
    //     res.setHeader('Content-Type', 'text/html');
    //     res.writeHead(200);
    //     res.end('data.toString()');
    //     console.log('done');
    // }).listen(3000, '127.0.0.1');
    app(weekdata, monthdata);

})

// module.exports = getData;