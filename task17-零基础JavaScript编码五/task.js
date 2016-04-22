window.onload = function () {

// 以下两个函数用于随机模拟生成测试数据
    function getDateStr(dat) {
        var y = dat.getFullYear();
        var m = dat.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = dat.getDate();
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
    }

    function randomBuildData(seed) {
        var returnData = [];
        var dat = new Date("2016-01-01");
        var datStr = '';
        for (var i = 1; i < 92; i++) {
            datStr = getDateStr(dat);
            returnData.push([datStr,Math.ceil(Math.random() * seed)]);
            dat.setDate(dat.getDate() + 1);
        }
        return returnData;
    }

    var aqiSourceData = {
        "北京": randomBuildData(500),
        "上海": randomBuildData(300),
        "广州": randomBuildData(200),
        "深圳": randomBuildData(100),
        "成都": randomBuildData(300),
        "西安": randomBuildData(500),
        "福州": randomBuildData(100),
        "厦门": randomBuildData(100),
        "沈阳": randomBuildData(500)
    };

// 用于渲染图表的数据
    var chartData = [];

// 记录当前页面的表单选项
    var pageState = {
        nowSelectCity: -1,
        nowGraTime: "month"
    };


    var color=["red","yellow","blue","green","black"];
    /**
     * 渲染图表
     */
    function renderChart() {
        if (chartData==''){
            return;
        }
        var html='';
        var width=Math.floor(Math.round(document.body.clientWidth*0.8/chartData.length));

        chartData.forEach(function(item,index){
            var title="时间:"+item[0]+",aqi:"+item[1];
            html+="<span title='"+title+"' style='width:"+width+"px;"+"height:"+item[1]+"px;"+"left:"+width*index+"px;background:"+color[Math.round(Math.random()*4)]+"'></span>"
        });
        console.log(html);
        document.getElementById("aqi-chart-wrap").innerHTML=html;
    }

    /**
     * 添加事件帮助对象
     */
    var EventUtil = {
        addEvent: function (target, type, handler) {
            if (target.addEventListener != undefined) {
                target.addEventListener(type, handler);
            } else if (target.attachEvent != undefined) {
                target.attachEvent('on' + type, handler);
            } else {
                target['on' + type] = handler;
            }
        },
        getTarget: function(e){
            return e.target|| e.srcElement;
        }
    };

    /**
     * 日、周、月的radio事件点击时的处理函数
     */
    function graTimeChange(e) {
        var eventTaget=EventUtil.getTarget(e);
        if(eventTaget.tagName.toLowerCase()!="input"){
            return;
        }
        // 确定是否选项发生了变化
        var currentValue= eventTaget.value;
        if (currentValue==pageState.nowGraTime){
            return;
        }
        // 设置对应数据
        pageState.nowGraTime=currentValue;
        // 调用图表渲染函数
        renderChart();
    }

    /**
     * select发生变化时的处理函数
     */
    function citySelectChange(e) {
        var eventTaget=EventUtil.getTarget(e);
        // 确定是否选项发生了变化
        var currentValue= eventTaget.value;
        if (currentValue==pageState.nowSelectCity){
            return;
        }
        // 设置对应数据
        pageState.nowSelectCity=currentValue;
        // 调用图表渲染函数
        renderChart();
    }



    /**
     * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
     */
    function initGraTimeForm() {
        var formGra = document.getElementsByName("form-gra-time");
        EventUtil.addEvent(formGra,"click",graTimeChange);
    }

    /**
     * 初始化城市Select下拉选择框中的选项
     */
    function initCitySelector() {
        // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
        var citySelect=document.getElementById("city-select");
        var html="";
        for(var item in aqiSourceData){
            html+="<option>"+item+"</option>";
        }
        citySelect.innerHTML=html;
        var defaultOption=citySelect.getElementsByTagName("option")[0];
            defaultOption.selected=true;
        pageState.nowSelectCity=defaultOption.innerHTML;
        // 给select设置事件，当选项发生变化时调用函数citySelectChange
        EventUtil.addEvent(citySelect,"change",citySelectChange);
    }

    /**
     * 初始化图表需要的数据格式
     */
    function initAqiChartData() {
        // 将原始的源数据处理成图表需要的数据格式
        var data=aqiSourceData[pageState.nowSelectCity];
        switch (pageState.nowGraTime){
            case "day":
                chartData=data;
                break;
            case "week":
                //按
                break;
            case "month":
                //按照月来做聚合
                var month={};
                data.forEach(function(item){
                  if(month[item[0].slice(0,7)]){
                      month[item[0].slice(0,7)].push(item[1]);
                  }else{
                      month[item[0].slice(0,7)]=[item[1]];
                  }

            });
                console.log(month);
                for(var key in month){
                    var avg=month[key].reduce(function(prev,now){
                            return  prev+now;
                        })/month[key].length;
                    console.log(avg);
                    chartData.push([key,Math.round(avg)]);
                }
                console.log(chartData);
                break;
        }

    }

    /**
     * 初始化函数
     */
    function init() {
        initGraTimeForm();
        initCitySelector();
        initAqiChartData();
        renderChart()
    }

    init();

};