var $ = function(sel) {
    return document.querySelector(sel);
}
var button = $('#ajax'),
    preloader = $('#preloader5'),
    pk = $('#pk'),
    container = $('#container'),
    pkGo = $('#go');
button.addEventListener('click', function() {
    this.disabled = true; //禁用button
    preloader.style.display = "block";
    var input = $('#user');
    if (!input.value) {
        input.focus();
        return false;
    }
    var xhr = new XMLHttpRequest();
    url = window.location.href + 'ajax/' + input.value;

    function data2label(data) { //请求的数据生成chart label和value数据
        var monthdata = JSON.parse(data);
        var monthTotal = {}; //一个月份和总贡献值的对象{‘01’：23 ...}
        for (key in monthdata) {
            if (monthdata.hasOwnProperty(key)) {
                monthTotal[key] = monthdata[key].reduce(function(prev, cur) {
                    return prev + cur.data;
                }, 0);
            }
        }
        var labels = Object.keys(monthTotal).sort();
        var values = [];
        labels.forEach(function(i) {
            values.push(monthTotal[i]);
        });
        return { chartLabel: labels, chartvalue: values };

    }
    xhr.open('get', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState  ==  4) {
            button.disabled = false;
            preloader.style.display = "none";
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                var Alldata = JSON.parse(xhr.responseText);
                var chartD = data2label(Alldata.monthData);
                var chartdata = {
                    labels: chartD.chartLabel,
                    title: '月贡献值表',
                    datasets: [{
                        label: '月活跃度',
                        backgroundColor: "#44a340",
                        borderColor: "rgba(220,220,220,1)",
                        data: chartD.chartvalue
                    }]
                };
                //绘制chart
                function createCanvas(id) {
                    var canvas = document.createElement('canvas');
                    canvas.id = id;
                    return canvas;
                }
                container.innerHTML = '';
                var cvsBar = createCanvas('bar');
                container.appendChild(cvsBar);
                var cvsBar = document.getElementById('bar');
                ctx = cvsBar.getContext('2d');
                ctx.clearRect(0, 0, cvsBar.width, cvsBar.height);
                var chart = new Chart(ctx, {
                    type: 'bar',
                    data: chartdata,
                    xAxisID: '月份',
                    options: {
                        responsive: true,
                        layout: {
                            padding: 20
                        },
                        title: {
                            display: true,
                            text: Alldata.user + '2016年活跃度',
                            fontSize: 24
                        }
                    }
                });

            } else {
                alert("Request was unsuccessful: " + xhr.status);
            }
        }
    }
    xhr.send(null);
});
go.addEventListener('click', function() {
    this.disabled = true; //禁用button
    preloader.style.display = "block";
    var userA = $('#userA'),
        userB = $('#userB');
    if (!userA.value || !userB.value) {
        !userA.value ? userA.focus() : userB.focus();
        return false;
    }
    var xhr = new XMLHttpRequest();
    url = window.location.href + 'pk' + '?' + 'userA=' + userA.value + '&userB=' + userB.value;
    console.log(url);

    function data2label(data) { //请求的数据生成chart label和value数据
        var weekdata = JSON.parse(data),
            labels = [],
            values = [];
        for (var i = 0; i < weekdata.length; i++) {
            labels.push((i + 1).toString());
            var weektotal = weekdata[i].reduce(function(prev, curr) {
                return prev + curr.data;

            }, 0);
            values.push(weektotal);
        }

        return { chartLabel: labels, chartvalue: values };

    }
    xhr.open('get', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState  ==  4) {
            go.disabled = false;
            preloader.style.display = "none";
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                var Alldata = JSON.parse(xhr.responseText);
                console.log(Alldata);
                var userA_data = data2label(Alldata.userA.wdata);
                var userB_data = data2label(Alldata.userB.wdata);
                var chartdata = {
                    labels: userA_data.chartLabel,
                    title: '月贡献值表',
                    fill: false,
                    lineTension: 0,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    borderWidth: 2,
                    datasets: [{
                            label: Alldata.userA.name,
                            borderColor: "#529",
                            data: userA_data.chartvalue
                        },
                        {
                            label: Alldata.userB.name,
                            borderColor: "#f66",
                            data: userB_data.chartvalue
                        }
                    ]
                };
                //绘制chart
                function createCanvas(id) {
                    var canvas = document.createElement('canvas');
                    canvas.id = id;
                    return canvas;
                }
                container.innerHTML = '';
                var cvsBar = createCanvas('bar');
                container.appendChild(cvsBar);
                var cvsBar = document.getElementById('bar');
                ctx = cvsBar.getContext('2d');
                ctx.clearRect(0, 0, cvsBar.width, cvsBar.height);
                var chart = new Chart(ctx, {
                    type: 'line',
                    data: chartdata,
                    xAxisID: '周',
                    options: {
                        responsive: true,
                        layout: {
                            padding: 20
                        },
                        title: {
                            display: true,
                            text: Alldata.userA.name + ' VS ' + Alldata.userB.name,
                            fontSize: 24
                        }
                    }
                });

            } else {
                alert("Request was unsuccessful: " + xhr.status);
            }
        }
    }
    xhr.send(null);

})

function toggleInput() {
    var single = $('#single'),
        vs = $('#vs');
    if (getComputedStyle(single).display !== 'none') {
        console.log(getComputedStyle(single).display);
        single.style.display = 'none';
        vs.style.display = 'table';
    } else {
        single.style.display = 'table';
        vs.style.display = 'none';

    }

}
pk.addEventListener('click', function() {
    getComputedStyle(this).color == 'rgb(255, 255, 255)' ? this.style.color = '#fc6c22' : this.style.color = '#fff';
    console.log(getComputedStyle(this).color);
    toggleInput();

})