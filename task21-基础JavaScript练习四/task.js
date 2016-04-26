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

    var tags = [],
        hobbies = [],
        MAX_TAGS=10,
        MAX_HOBBIES=10;

    /**
     * 事件帮助类
     */
    var EventUtil = {
        getEvent:function(e){
            return e||window.event;
        },
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
     * 点击删除队列中的元素
     */
    function delQueue(e) {

        e=EventUtil.getEvent(e);
        var target = EventUtil.getTarget(e);
        if (target.tagName.toLowerCase() != "div") {
            return;
        }

        //找到点击元素对应的index,并根据具体事件类型做相应的处理
        var childNodes = document.getElementById("tagsShow").getElementsByTagName("div");
        for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i] === target) {
                switch(e.type){
                    case "click":
                        tags.splice(i, 1);
                        renderQueue("tagsShow",tags);
                        break;
                    case "mouseover":
                        childNodes[i].innerHTML="点击删除 "+childNodes[i].innerHTML;
                        break;
                    case "mouseout":
                        childNodes[i].innerHTML=childNodes[i].innerHTML.replace(/\s*(点击删除)\s*/g,"");
                        break;
                }
                return;
            }
        }

    }

    /**
     * 渲染数据
     */
    function renderQueue(renderAreaId,array) {
        var renderArea = document.getElementById(renderAreaId);
        var html = '';
        array.forEach(function (item) {  //foreach有兼容性问题 todo 可以换成for循环来完成
            if (item) {
                html += "<div>" + item + "</div>";
            }

        });
        renderArea.innerHTML = html;
    }

    /**
     * 初始化填写标签的输入框
     */

    function initTagInput() {

        var tagInput = document.getElementById("tag");
        EventUtil.addEvent(tagInput, "keyup", processTagInput);
    }

    /**
     * 重复校验,返回这是boolean
     */
    function isExist(key, array) {

        return array.some(function (item) {
            if (item == key) {
                return true;
            }
        });
    }

    /**
     * 遇到输入空格,逗号或者enter将前面的内容加入队列
     * @param e
     */
    function processTagInput(e) {

        e=EventUtil.getEvent(e);
        var tagInput = document.getElementById("tag");
        var tagInputValue = (e.keyCode == 188 ? tagInput.value.trim().slice(0, -1) : tagInput.value.trim());
        if (e.keyCode != 188 && e.keyCode != 32 && e.keyCode != 13 || !tagInput.value) {
            return;
        }
        if (!isExist(tagInputValue, tags)) {
            tags.push(tagInputValue);
            if(tags.length>MAX_TAGS){ //超过10个,将最先输入的剔除
                tags.shift();
            }
            renderQueue("tagsShow",tags);
        }
        tagInput.value = '';

    }

    /**
     * 初始化标签的删除事件
     */
    function initTagDel(){

        var tagsShow=document.getElementById("tagsShow");
        EventUtil.addEvent(tagsShow,"mouseout",delQueue);
        EventUtil.addEvent(tagsShow,"mouseover",delQueue);
        EventUtil.addEvent(tagsShow,"click",delQueue);
    }

    /**
     * 为提交兴趣爱好的按钮添加事件
     */
    function initCommitHobbyButton(){
        var commitHobbyButton=document.getElementById("commitHobbyButton");
        EventUtil.addEvent(commitHobbyButton,"click",CommitHobbyButtonClick);
    }

    /**
     * button 事件处理函数
     * @param e
     */
    function CommitHobbyButtonClick() {

        var hobsValue = document.getElementById("hobbies").value.trim();
        var groupArray = hobsValue.split(/[,|\s|\r|、|，]+/g);
        console.log("fs");
        if(groupArray.length==0){return;}

        //  去重  todo 用filter有兼容性问题.可以使用for循环+splice解决
        groupArray.forEach(function(item){
            console.log(item);
            if(hobbies.indexOf(item)>-1){return;}
            hobbies.push(item);
        });

        if(hobbies.length>MAX_HOBBIES){
            hobbies=hobbies.splice(hobbies.length-MAX_HOBBIES);
        }
        renderQueue("hobbyShow",hobbies);
    }

    /**
     * 初始化函数
     */
    function ini() {

        initTagInput();
        initTagDel();
        initCommitHobbyButton();
    }

    ini();
};