var button = document.querySelector('#ajax');


button.addEventListener('click', function() {

    var input = document.querySelector('#user');

    if (!input.value) {

        return false;

    }

    var xhr = new XMLHttpRequest();

    url = window.location.href + 'ajax/' + input.value;

    console.log(url);

    xhr.open('get', url, true);

    xhr.onreadystatechange = function() {

        if (xhr.readyState  ==  4) {

            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {

                var data = JSON.parse(xhr.responseText);

                console.log(data);

                var monthdata = JSON.parse(data.monthData), //由于getData对这个数据进行了stringfy

                    monthTotal = {}; //一个月份和总贡献值的对象{‘01’：23 ...}

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

                var chartdata = {

                    labels: labels,

                    title: '月贡献值表',

                    datasets: [{

                        label: '月活跃度',

                        backgroundColor: "#44a340",

                        borderColor: "rgba(220,220,220,1)",

                        data: values

                    }]

                };

                //绘制chart

                var canvas = document.createElement('canvas');

                canvas.width = '500';

                canvas.height = '300';

                var ctx = canvas.getContext('2d');

                document.getElementById('container').appendChild(canvas);

                new Chart(ctx,

                    {
                        type: 'bar',

                        data: chartdata,

                        xAxisID: '月份',

                        options: {

                            responsive: true

                        }

                    });





            } else {

                alert("Request was unsuccessful: " + xhr.status);

            }

        }

    }

    xhr.send(null);

});