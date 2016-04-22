/**
 *
 * Created by lishuai on 16/4/22.
 */

window.onload = function () {
    var test = document.getElementsByClassName("aqi-chart-wrap")[0];
    if (test.getContext) {
        var context = test.getContext("2d");
        context.fillStyle = 'blue';
        context.fillRect(10, 10, 10, 50);
    } else {
        alert("buzhichi");
    }
};


