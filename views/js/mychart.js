var ctx = document.querySelector('#bar').getContext("2d");
var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July", '8', '9', '10', '11', '12'],
    datasets: [{
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,1)",
        data: [65, 59, 90, 81, 56, 55, 40]
    }]
}
new Chart(ctx).Bar(data);