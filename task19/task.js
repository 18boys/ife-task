/**
 * 队列处理
 * Created by lishuai on 16/4/23.
 */

window.onload = function () {
    /**
     * 1.初始化,给按钮以及展示div添加事件
     * 2.事件处理函数
     * 3.渲染函数
     */

    var queue = [34,89,24,98,10,11,23,90,35,28,89,34,49,99,45,25,25,89,36,42,59,85,37,59,83,28,
            34,89,24,98,10,11,23,90,35,28,89,34,49,99,45,25,25,89,36,42,59,85,37,59,83,28,
            34,89,24,98,10,11,23,90,35,28,89,34,49,99,45,25,25,89,36,42,59,85,37,59,83,28],
        MAX_NUM=60;//队列最大容纳数量


    /**
     * 事件帮助类
     */
    var EventUtil = {
        addEvent: function (target, type, handler) {
            if (target.addEventListener) {
                target.addEventListener(type, handler);
            } else if (target.attachEvent) {
                target.attachEvent('on' + type, handler);
            } else {
                target['on' + type] = handler;
            }
        },
        getTarget: function (e) {
            return e.target || e.srcElement;
        }
    };

    /**
     *
     */
    function valid(data) {
        //范围校验和整数校验
        if (!data||data < 10 || data > 100 || (/[^\d]+/g).test(data)) {
            console.log("mei");
            document.getElementById("tips").innerHTML = "*请输入10-100的整数";
            return false;
        }
        if(queue.length==MAX_NUM){
            alert("你添加的元素超过3个,请删除部分元素后再添加!");
            return false;
        }
        document.getElementById("tips").innerHTML ="";
        return true;
    }

    /**
     * button 事件处理函数
     * @param e
     */
    function buttonClick(e) {
        //判断点击的是哪个按钮
        var target = EventUtil.getTarget(e);
        if (target.tagName.toLowerCase() != "button") {
            return;
        }
        var input=document.getElementById("data");
        var data = input.value.trim();//暂且不考虑检验是否是数字
        switch (target.id) {
            case "left-in" :
                if (!valid(data)) {
                    return;
                }
                queue.unshift(data);
                input.value='';
                break;
            case "right-in" :
                if (!valid(data)) {
                    return;
                }
                queue.push(data);
                input.value='';
                break;
            case "left-out" :
                alert(queue.shift());
                break;
            case "right-out" :
                alert(queue.pop());
                break;
            default:
                alert("未知操作!")
        }
        renderQueue();
    }

    /**
     * 初始化按钮,添加事件
     */
    function initButton() {
        var button = document.getElementById("button");
        EventUtil.addEvent(button, "click", buttonClick);
    }

    /**
     * 点击删除队列中的元素
     */
    function delQueue(e) {
        var target = EventUtil.getTarget(e);
        if (target.tagName.toLowerCase() != "div") {
            return;
        }
        //找到点击元素对应的index   //可以试试call的方法使用array获取第几个参数的方式来获取其位置
        var childNodes = document.getElementById("queue").getElementsByTagName("div");
        //for (var i = 0; i < childNodes.length; i++) {
        //    if (childNodes[i] === target) {
        //        queue.splice(i, 1);
        //        renderQueue();
        //        return;
        //    }
        //}
        var  index=Array.prototype.indexOf.call(childNodes,target);
        queue.splice(index,1);
        renderQueue();

    }

    /**
     * 初始化队列,给队列添加事件
     */
    function initQueueShow() {
        var showDiv = document.getElementById("queue");
        EventUtil.addEvent(showDiv, "click", delQueue);

    }

    /**
     * 数组冒泡排序
     */
    function bubble(){
        var length=queue.length,
            t;
        for(var i=0;i<length;i++){
            console.log("2");
            for(var j=0;j<length-i;j++){
                if(queue[j]>queue[j+1]){
                    t=queue[j];
                    queue[j]=queue[j+1];
                    queue[j+1]=t;
                    return;
                }

            }

        }
    }

    /**
     * 渲染数据
     */
    function renderQueue() {
        console.log(queue);
        var showDiv = document.getElementById("queue");
        var html = '';
        var width=10;
        queue.forEach(function (item,index) {  //foreach有兼容性问题
            //<div style='height=10px;left=10px;width=10px'></div>
            html += "<div style='height:" + item + "px;width:"+width+"px;left:"+index*width+"px;'></div>";
        });
        showDiv.innerHTML = html;
    }

    //
    //Function.prototype.delay = function(this1, timeout) {
    //    this1 = this1 || null;
    //    timeout = timeout || 0;
    //    var _this = this;
    //    var args = [];
    //    //获取参数,注：第1、第2个参数是保留参数
    //    switch (arguments.length) {
    //        case 1:
    //            timeout = parseInt(arguments[0]);
    //            timeout = isNaN(timeout) ? 0 : timeout;
    //            timeout = timeout < 0 ? 0 : timeout;
    //            break;
    //        default:
    //            for (var i = 0; i < arguments.length; i++) {
    //                if (i > 1) {
    //                    args.push(arguments[i]);
    //                }
    //            }
    //            break;
    //    }
    //    var proxy = function() {
    //        _this.apply(this1, args);
    //    };
    //    return window.setTimeout(proxy, timeout);
    //};


    function sortAndShow(){

        //处理完毕点击事件之后就立即执行排序和渲染展示(queue.length*queue.length)--)
        setTimeout(function(){

        },0); //没用


        var count=queue.length*queue.length;
        while(count--){
            setTimeout(bubble,0);
            setTimeout(renderQueue,0);
        }

    }

    /**
     * 延迟函数,使用阻塞来实现,参数是延迟的毫秒数
     */
    function  delay(ms){
        var  now=new Date().getTime();
        while((new Date).getTime()<now+(ms-0)){}
    }

    /**
     * 初始化排序按钮
     */
    function initSortButton(){

        var sortButton=document.getElementById("sort");
        EventUtil.addEvent(sortButton,"click",sortAndShow);
    }

    /**
     * 初始化函数
     */
    function ini() {

        initButton();
        initQueueShow();
        initSortButton();
        renderQueue();
    }

    ini();
};