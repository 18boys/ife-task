/**
 * ui浮出组件
 * Created by lishuai on 16/5/17.
 */

(function(){

     var button=document.getElementById("button");
     var mask=document.getElementById("mask");
     var test=document.getElementById("test");

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
     * 添加类和删除类工具
     */
    var ClassUtil = {

        addClass: function (obj, className) {
            var match=new RegExp("(\\s|^)"+className+"(\\s|$)");
            if (!obj.className||obj.className.search(match)==-1) {
                obj.className += obj.className + " " + className;
            }

        },

        removeClass: function (obj, className) {
            var match=new RegExp("(\\s|^)"+className+"(\\s|$)");
            if (obj.className&&obj.className.search(match)>-1) {
                obj.className=obj.className.replace(match,'');
            }
        },

        hasClass:function(obj,className){
            var match=new RegExp("(\\s|^)"+className+"(\\s|$)");
            return obj.className&&obj.className.search(match)>-1? true:false;
        },

        toggleClass:function(obj,className){
            var match=new RegExp("(\\s|^)"+className+"(\\s|$)");
            if (obj.className.search(match)==-1) {
                obj.className += " " + className;
                console.log("calss",obj.className);
            }else {
                obj.className=obj.className.replace(match,'');
                console.log("calss",obj.className);
            }
        },

        toggleClasses:function(obj,className1,className2){
            var match1=new RegExp("(\\s|^)"+className1+"(\\s|$)");
            var match2=new RegExp("(\\s|^)"+className2+"(\\s|$)");
            if (obj.className.search(match1)==-1) {  //没找到class1
                obj.className=obj.className.replace(match2,'');
                obj.className +=  " " + className1;
            }else {
                obj.className=obj.className.replace(match1,className2);
            }
        }
    };

    /**
     * 遮罩的展示
     * @type {Element}
     */
    function showMask(){
        ClassUtil.toggleClasses(mask,"hide","mask");
        ClassUtil.toggleClasses(test,"hide","popup");

    }

    function closePop(e){
        e=EventUtil.getEvent(e);
        var target=EventUtil.getTarget(e);
        //如果界面有popup的类,那么僵此类对象的对象隐藏掉,并且将遮罩去除
        //if(ClassUtil.hasClass("popup"))
    }

    function init(){
        EventUtil.addEvent(button,"click",showMask);
        EventUtil.addEvent(document.body,"click",closePop);
    }

    init();

})();