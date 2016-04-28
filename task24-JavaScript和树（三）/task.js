/**
 * Created by lishuai on 16/4/27.
 */

window.onload = function () {


    var currentTree = [],
        lastNode = [],
        searchKey = [],
        isSearch = false,
        searchedText = [];

    var DEFAULT_COLOR = '#49b8ff';
    var TARGET_COLOR = 'red';
    var SEARCH_COLOR = 'yellow';
    var CLICKED_CLASS = 'clicked';

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
    var ClassNameUtil = {

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
                obj.className += obj.className + " " + className;
                console.log("mei")
            }else {
                obj.className=obj.className.replace(match,'');
                console.log("you")
            }
        }
    };

    /**
     * 封装一个获取特定tag的子节点的方法
     */
    function getChildrenByTagName(parent, tagName) {
        var special = [];
        var childNodes = parent.childNodes;
        if (childNodes.length > 0) {
            Array.prototype.forEach.call(childNodes, function (item) {
                if (item.nodeType == 1 && item.tagName.toLowerCase() == tagName) {
                    special.push(item);
                }
            })
        }
        return special;

    }


    /**
     * 给定一个节点,给出他的文本节点
     */
    function getTextNode() {

    }

    /**
     * 遍历二叉树的递归函数
     */
    function traverseTree() {


        /*   传参的遍历方法目前看是失败的
         if(parentColor){
         obj.parentNode.style.borderColor=parentColor
         }
         console.log("ookk",obj);
         prev=obj.style.borderColor;
         obj.style.borderColor="black";

         //若果obj有子节点,那么就遍历他的子节点,
         var length=obj.childNodes.length;
         if(length>0){
         for(var i=0;i<length;i++){
         var child=obj.childNodes[i];
         if(child.nodeType==1){
         console.log("i1:",i);
         //setTimeout(traverseTree,500)
         setTimeout(function(i){
         console.log("i2:",i);
         traverseTree(obj.childNodes[i],prev);  //obj.childNodes[i] 不能用这个,因为其值最后不定,不能使用这种变量,要直接使用对象
         },500);
         }
         }
         }else{
         //obj.style.borderColor=prev;
         } */

        //使用数组缓存的方案
        //深度中序
        //1.首先将上一次处理的目标的颜色变回来
        if (lastNode.length > 0) {
            var last = lastNode.pop();
            last[0].style.borderColor = last[1];

        }
        if (currentTree.length > 0) {

            //2.取出第一个作为这一次遍历的目标
            var currentNode = currentTree.pop();
            lastNode.push([currentNode, currentNode.style.borderColor]);
            currentNode.style.borderColor = TARGET_COLOR;

            if (isSearch) {
                var searchInput = document.getElementById("search-input").value.trim();
                if (searchInput == currentNode.childNodes[0].nodeValue.trim()) {
                    searchedText.push(currentNode.childNodes[0]);
                }

                //将需要特殊显示的节点显示
                searchedText.forEach(function (item) {
                    item.parentNode.style.borderColor = SEARCH_COLOR;
                })
            }

            //3.将其子节点放入缓存队列中
            var childNodes = getChildrenByTagName(currentNode, "div");
            if (childNodes.length > 0) {
                //currentTree.concat(childNodes);  //为何还不行啊!!!  扯淡啊....
                Array.prototype.forEach.call(childNodes, function (item) {
                    currentTree.push(item);
                });
            }
            setTimeout(arguments.callee, 500);
            console.log("search:", searchedText);
        } else {
            //遍历完毕
            if (isSearch) {
                if (searchedText.length == 0) {
                    document.getElementById("tips").innerHTML = '*找不到此文本';
                } else {
                    //将需要特殊显示的节点显示
                    searchedText.forEach(function (item) {
                        item.parentNode.style.borderColor = SEARCH_COLOR;
                    })
                }

            }
        }


        //简单粗暴的方法,直接获取到所有的div节点
        //1.首先将上一次处理的目标的尺寸变回来
        //if(lastNode.length>0){
        //    var last=lastNode.pop();
        //    last[0].style.borderColor=last[1];
        //}
        //if(currentTree.length>0){
        //
        //   //2.取出第一个作为这一次遍历的目标
        //    var currentNode=currentTree.pop();
        //    lastNode.push([currentNode,currentNode.style.borderColor]);
        //    currentNode.style.borderColor="red";
        //    setTimeout(arguments.callee,500);
        //}

    }


    /**
     * 遍历二叉树的事件处理函数
     */
    function traverse(e) {

        while (searchedText.length) {
            searchedText.pop().parentNode.style.borderColor = DEFAULT_COLOR;
        }
        e = EventUtil.getEvent(e);
        if (EventUtil.getTarget(e).id == 'start-search') {
            isSearch = true;
            document.getElementById("tips").innerHTML = '';
            searchKey.push(document.getElementById("start-search").value);
        } else {
            isSearch = false;
        }
        var root = document.getElementById("level1_0");
        currentTree.push(root);
        //currentTree.push(obj);
        //Array.prototype.forEach.call(obj,function(item){   //使用concat都不能把他装进去,哎,什么情况?
        //    currentTree.push(item);
        //    console.log(item);
        //});
        setTimeout(traverseTree, 0);
    }

    /**
     *
     * 添加开始遍历的按钮点击事件
     */
    function initTraverseButton() {
        var button = document.getElementById("button");
        EventUtil.addEvent(button, "click", traverse)
    }

    /**
     * 初始化搜索按钮
     */
    function initSearchButton() {
        var searchButton = document.getElementById("start-search");
        EventUtil.addEvent(searchButton, "click", traverse);
    }

    /**
     * 处理被选中的节点
     */
    function processClickedDiv(e) {
        e = EventUtil.getEvent(e);
        var target = EventUtil.getTarget(e);
        ClassNameUtil.toggleClass(target,CLICKED_CLASS);
    }

    /**
     * 初始化元素被点击之后选中的处理事件
     */
    function initNodeClick() {
        var divContainer = document.getElementById("level1_0");
        EventUtil.addEvent(divContainer, "click", processClickedDiv);
    }

    /**
     * 删除选中的节点
     */
    function deleteNode(){
        var deleteNodes=document.getElementsByClassName(CLICKED_CLASS);
        Array.prototype.forEach.call(deleteNodes,function(item){  //现在有点问题是 删除不同层次的节点的时候,总会有删除不干净的情况存在??
            item.outerHTML='';
        })
    }
    /**
     * 删除button初始化
     */
    function initDeleteButton(){
        var deleteButton=document.getElementById("deleteButton");
        EventUtil.addEvent(deleteButton,"click",deleteNode);
    }
    /**
     * 初始化
     */
    function init() {
        initNodeClick();
        initDeleteButton();
        initTraverseButton();
        initSearchButton();
    }

    init();
};
