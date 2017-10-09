var https = require('https'),
    eventEmitter = require("events").EventEmitter,
    http = require('http');
var cheerio = require('cheerio');
var _ = require('lodash');
var fs = require('fs');
var emitter = new eventEmitter();

function getData(user) {
    var url = 'https://github.com/' + user;
    var dayDatas = [];
    var pageStr = '';
    var req = https.get(url, function(res) {
        res.setEncoding('utf8');
        var status = res.statusCode;
        if (status == '200') {
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
                dayDatas = _.filter(dayDatas, function(o) { //过滤出2016年的数据
                    return (o.date.split('-'))[0] == '2017';
                })
                monthDatas = _.groupBy(dayDatas, function(o) {
                    return (o.date.split('-'))[1];
                });
                //console.log(JSON.stringify(monthDatas));
                emitter.emit(user + 'datadone', JSON.stringify(weekDatas), JSON.stringify(monthDatas), user); //为了适配jade,对ajax请求不友好。。
            });
        } else {
            emitter.emit(user + 'error', status, user);
        }
    });
}

module.exports = {
    getData: getData,
    emitter: emitter

}