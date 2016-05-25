/**
 * 队列处理
 * Created by lishuai on 16/4/23.
 */

window.onload=function() {
    /**
     * 1.初始化,给按钮以及展示div添加事件
     * 2.事件处理函数
     * 3.渲染函数
     */

    var queue = [];

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
     * button 事件处理函数
     * @param e
     */
    function buttonClick(e) {
        //判断点击的是哪个按钮
        var target = EventUtil.getTarget(e);
        var data = document.getElementById("data").value.trim();//暂且不考虑检验是否是数字
        if (target.tagName.toLowerCase() != "button" || !data) {
            return;
        }  //todo 输入的校验需要修改
        var groupArray = data.split(/[,|\s|\r|、|，]+/g);
        switch (target.id) {
            case "left-in" :
                //queue.unshift(data);
                //groupArray.reverse().forEach(function(item){
                //    queue.splice(0,0,item);
                //});
                queue = groupArray.concat(queue);
                break;
            case "right-in" :
                //queue.push(data);
                //groupArray.queue.splice(queue.length,0,groupArray);
                queue = queue.concat(groupArray);
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
        //找到点击元素对应的index
        var childNodes = document.getElementById("queue").getElementsByTagName("div");
        for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i] === target) {
                queue.splice(i, 1);
                renderQueue();
                return;
            }
        }


    }

    /**
     * 初始化队列,给队列添加事件
     */
    function initQueueShow() {
        var showDiv = document.getElementById("queue");
        EventUtil.addEvent(showDiv, "click", delQueue);

    }

    /**
     * 渲染数据
     */
    function renderQueue() {
        var showDiv = document.getElementById("queue");
        var html = '';
        queue.forEach(function (item) {  //foreach有兼容性问题
            html += "<div>" + item + "</div>";
        });
        showDiv.innerHTML = html;
    }

    /**
     * 查找字符串并标注颜色
     */
    function searchAndMarked(){

        var target=document.getElementById("search").value.trim();
        var div=document.getElementById("queue").getElementsByTagName("div");
        var divLength=div.length;

        var regTarget=new RegExp("("+target+")+",'g');
        var regSpan=new RegExp("(<span>|</span>)+",'g');
        for(var i=0;i<divLength;i++){//避免<>  之类的呗匹配上
            div[i].innerHTML=div[i].innerHTML.replace(regSpan,"");
            div[i].innerHTML=div[i].innerHTML.replace(regTarget,"<span>$&</span>");  //效率不是太好,可以弄好最终的html,一起渲染
        }
    }

    /**
     * 给搜索按钮添加事件
     */
    function initSearch(){

        var searchButton=document.getElementById("search");
        EventUtil.addEvent(searchButton,"blur",searchAndMarked)

    }

    /**
     * 初始化函数
     */
    function ini() {
        initButton();
        initQueueShow();
        initSearch();
    }
    ini();
};