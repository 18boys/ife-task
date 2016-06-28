/**
 * ui浮出组件
 * Created by lishuai on 16/5/17.
 */

(function(){

     var button=document.getElementById("button");
     var mask=document.getElementById("Alert-mask");
     var test=document.getElementById("Alert-pop");

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
        removeEvent:function(target, type,handler){
            if (target.removeEventListener) {
                target.removeEventListener(type,handler);
            } else if (target.detachEvent) {
                target.detachEvent('on' + type, handler);
            } else {
                target['on' + type] = null;
            }
        },
        getTarget: function (e) {
            return e.target || e.srcElement;
        },
        stopDefault:function(e){
            if(e.preventDefault){
                e.preventDefault();
                console.log("cx");
            }else{
                e.returnValue=false;
            }
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

    function stopDefault(e){
        e=EventUtil.getEvent(e);
        EventUtil.stopDefault(e);
        console.log(e.wheelDelta);
    }

    /**
     * 遮罩的展示
     * @type {Element}
     */
    function toggleMask(){
        ClassUtil.toggleClasses(mask,"Alert-hide","Alert-mask");
        ClassUtil.toggleClasses(test,"Alert-hide","Alert-popup");
    }

    function setWheel(e){
        if(ClassUtil.hasClass(mask,"Alert-mask")){
            //禁用滚轮
            stopDefault(e);
        }
    }

    function init(){
        EventUtil.addEvent(button,"click",toggleMask);
        EventUtil.addEvent(mask,"click",toggleMask);
        EventUtil.addEvent(document,"mousewheel",setWheel(event));
    }

    init();

})();