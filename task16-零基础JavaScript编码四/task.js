/**
 * Created by lishuai on 16/4/21.
 */

(function () {

    /**
     * aqiData，存储用户输入的空气指数数据
     * 示例格式：
     * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
     */
    var aqiData = {};


    /**
     * 校验函数,所有的校验都抽象出来放在这儿,统一
     * 来做校验
     */

    function valid(Reg, item) {
        return Reg.test(item);
    }

    /**
     * 从用户输入中获取数据，向aqiData中增加一条数据
     * 然后渲染aqi-list列表，增加新增的数据
     */
    function addAqiData() {
        //获取到输入数据
        var city = document.getElementById("aqi-city-input").value.trim();
        var aqiNum = document.getElementById("aqi-value-input").value.trim();
        var nameReg = /[^\u4E00-\u9FA5a-zA-Z]/g;
        var numReg = /[^\d]/g;

        //做校验
        if (!city || !aqiNum) {
            return -3;
        }
        if (valid(nameReg, city)) {
            return -1;
        }
        if (valid(numReg, aqiNum)) {
            return -2;
        }
        aqiData[city] = aqiNum;
        return city;
    }

    /**
     * 渲染aqi-table表格
     */
    function renderAqiList(city) {
        var aqi = aqiData[city];
        var trNode = document.createElement("tr");
        var tdNodeCity = document.createElement("td");
        tdNodeCity.innerHTML = city;
        var tdNodeAqi = document.createElement("td");
        tdNodeAqi.innerHTML = aqi;
        var tdNodeOp = document.createElement("td");
        var button = document.createElement("button");
        button.innerHTML = "删除";
        tdNodeOp.appendChild(button);
        trNode.appendChild(tdNodeCity);
        trNode.appendChild(tdNodeAqi);
        trNode.appendChild(tdNodeOp);
        document.getElementById("aqi-table").getElementsByTagName("tbody")[0].appendChild(trNode);
    }

    /**
     * 点击add-btn时的处理逻辑
     * 获取用户输入，更新数据，并进行页面呈现的更新
     */
    function addBtnHandle() {
        var ret = addAqiData();
        if (ret < 0) {
            switch (ret) {
                case -1:
                    alert("你输入的城市不是汉字或者字母,请重新输入!");
                    break;
                case -2:
                    alert("你输入的空气质量指数不是整数,或者包含特殊字符.请重新输入!");
                    break;
                case -3:
                    alert("你输入的城市或者空气质量指数为空,请重新输入!");
                    break;
                default:
                    alert("你的输入不合法,请重新输入");
            }
            return;
        }
        renderAqiList(ret);
    }


    /**
     * 点击各个删除按钮的时候的处理逻辑
     * 获取哪个城市数据被删，删除数据，更新表格显示
     */
    function delBtnHandle(e) {
        //确定点击的是按钮,点击的地方不是按钮不处理
        e.target = e.target || e.srcElement;
        if (e.target.tagName.toLowerCase() == "button") {
            document.getElementById("aqi-table").getElementsByTagName("tbody")[0]
                .removeChild(e.target.parentNode.parentNode);
        }
    }

    function init() {

        // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
        //  document.getElementById("add-btn").onclick=addBtnHandle;
        document.getElementById("add-btn").addEventListener("click", addBtnHandle);
        // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
        document.getElementById("aqi-table").onclick = delBtnHandle;

        //可以在提示的那块做一些优化什么的
    }

    init();

})();