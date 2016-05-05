/**
 * 树形组件
 * Created by lishuai on 16/5/5.
 */

window.onload=function(){

    /**
     * 事件帮助类
     */
    var EventUtil = {
        getEvent: function (e) {
            return e || window.event;
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
                console.log("没找到",className1);
            }else {
                obj.className=obj.className.replace(match1,className2);
                console.log("找到",className1);
            }
        }
    };

    /**
     * 遍历数组帮助类
     */
    function each(array,func){
        for(var i =0;i<array.length;i++){
            func(array[i]);
        }
    }

    /**
     * 处理主菜单点击的时候展开或者隐藏下面的子节点
     */

    function changeSubtree(){
        ClassUtil.toggleClasses(this.getElementsByTagName("div")[0],"left-triangle","bottom-triangle");
        ClassUtil.toggleClass(this.getElementsByTagName("ul")[0],"hide");
    }


    /**
     * 初始化函数
     */
    function init(){
        var mainMenus=document.getElementsByClassName("main-tree");
        console.log(mainMenus);
        each(mainMenus,function(item){
            EventUtil.addEvent(item,"click",changeSubtree); //可能有闭包的问题
        });

    }

    init();
};