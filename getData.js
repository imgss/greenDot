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
                dayDatas.push(parseInt($(days[i]).attr('data-count')));
            }
            dayDatas = _.chunk(dayDatas, 7);
            emitter.emit('dataDone', dayDatas);
            console.log(dayDatas);

        });
    });
}
getData(queryStr);
emitter.on('dataDone', function(data) {
    // http.createServer(function(req, res) {
    //     res.setHeader('Content-Type', 'text/html');
    //     res.writeHead(200);
    //     res.end('data.toString()');
    //     console.log('done');
    // }).listen(3000, '127.0.0.1');
    app(data);

})

// module.exports = getData;