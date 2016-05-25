/**
 * 树形组件
 * Created by lishuai on 16/5/5.
 */

window.onload = function () {


    var currentTree = [],
        lastNode = [],
        searchedNode = [];

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
            var match = new RegExp("(\\s|^)" + className + "(\\s|$)");
            if (!obj.className || obj.className.search(match) == -1) {
                obj.className += obj.className + " " + className;
            }

        },

        removeClass: function (obj, className) {
            var match = new RegExp("(\\s|^)" + className + "(\\s|$)");
            if (obj.className.search(match) > -1) {
                obj.className = obj.className.replace(match, '');
            }
        },

        hasClass: function (obj, className) {
            var match = new RegExp("(\\s|^)" + className + "(\\s|$)");
            return obj.className && obj.className.search(match) > -1 ? true : false;
        },

        toggleClass: function (obj, className) {
            var match = new RegExp("(\\s|^)" + className + "(\\s|$)");
            if (obj.className.search(match) == -1) {
                obj.className += " " + className;
            } else {
                obj.className = obj.className.replace(match, '');
            }
        },

        toggleClasses: function (obj, className1, className2) {
            var match1 = new RegExp("(\\s|^)" + className1 + "(\\s|$)");
            var match2 = new RegExp("(\\s|^)" + className2 + "(\\s|$)");
            if (obj.className.search(match1) == -1) {  //没找到class1
                obj.className = obj.className.replace(match2, '');
                obj.className += " " + className1;
            } else {
                obj.className = obj.className.replace(match1, className2);
            }
        }
    };

    /**
     * 遍历数组帮助类
     */
    function each(array, func) {
        for (var i = 0; i < array.length; i++) {
            func(array[i]);
        }
    }

    /**
     * 获取第一个特定node类型的子节点
     */
    function getChildrenByNodeType(parent, nodeType) {
        var special = [];
        var childNodes = parent.childNodes;
        try {
            if (childNodes.length > 0) {
                each(childNodes, function (item) {
                    if (item.nodeType == nodeType) {

                        special.push(item);
                    }
                })
            }
        } catch (e) {

        }
        return special;

    }


    /**
     * 封装一个获取特定tag的子节点的方法
     */
    function getChildrenByTagName(parent, tagName) {
        var special = [];
        var childNodes = parent.childNodes;
        try {
            if (childNodes.length > 0) {
                each(childNodes, function (item) {
                    if (item.nodeType == 1 && item.tagName.toLowerCase() == tagName) {
                        special.push(item);
                    }
                })
            }
        } catch (e) {

        }
        return special;

    }

    /**
     * 处理主菜单点击的时候展开或者隐藏下面的子节点
     */

    function changeSubtree(event) {
        event = event || window.event;
        var target = EventUtil.getTarget(event);

        //点击的是三角
        if (target.tagName.toLocaleLowerCase() === "span") {
            ClassUtil.toggleClasses(target, "left-triangle", "bottom-triangle");

            //如果点击的目标元素下面有子元素div，那么就将其下面的子元素折叠或者展开
            var divChildren = getChildrenByTagName(target.parentNode, "div");
            if (divChildren.length) {
                each(divChildren, function (item) {
                    ClassUtil.toggleClass(item, "hide");
                });

            }
        }

        //点击的是文字，将文字背景设置为蓝色
        if (target.nodeType == 1 && target.tagName.toLocaleLowerCase() === "div") {
            each(document.getElementsByClassName("focus"), function (item) {
                ClassUtil.removeClass(item, "focus");
            });
            ClassUtil.addClass(target, "focus");
        }

    }

    /**
     * 初始化树
     */
    function initTree() {
        var tree = document.getElementById("tree");
        EventUtil.addEvent(tree, "click", changeSubtree);
    }

    /**
     * 删除选中的节点
     */
    function deleteNode() {
        var deleteNodes = document.getElementsByClassName("focus");
        each(deleteNodes, function (item) {  //现在有点问题是 删除不同层次的节点的时候,总会有删除不干净的情况存在??
            item.outerHTML = '';
        })
    }

    /**
     * 删除button初始化
     */
    function initDeleteButton() {
        var deleteButton = document.getElementById("deleteButton");
        EventUtil.addEvent(deleteButton, "click", deleteNode);
    }

    /**
     * 在选中的节点下面增加节点
     */
    function addNode() {
        var addNodeParents = document.getElementsByClassName("focus");
        each(addNodeParents, function (item) {
            var newNode = document.createElement("div");
            newNode.innerHTML = "<span class='left-triangle'></span>" + document.getElementById("node-text").value.trim();
            item.appendChild(newNode);  //可以试试多种插入的方法
        })
    }

    /**
     * 增加节点初始化
     */
    function initAddButton() {
        var addButton = document.getElementById("addButton");
        EventUtil.addEvent(addButton, "click", addNode);
    }

    /**
     * 初始化搜索按钮
     */
    function initSearchButton() {
        var searchButton = document.getElementById("start-search");
        EventUtil.addEvent(searchButton, "click", traverse);
    }

    /**
     * 遍历二叉树的递归函数
     */
    function traverseTree() {

        //使用数组缓存的方案
        //深度中序
        //1.首先将上一次处理的目标的颜色变回来
        if (lastNode.length > 0) {
            var last = lastNode.pop();
            ClassUtil.removeClass(last, "focus");
        }
        if (currentTree.length > 0) {

            //2.取出第一个作为这一次遍历的目标
            var currentNode = currentTree.pop();
            lastNode.push(currentNode);
            ClassUtil.addClass(currentNode, "focus");
            var searchInput = document.getElementById("node-text").value.trim();

            if (getChildrenByNodeType(currentNode, 3).length && searchInput == getChildrenByNodeType(currentNode, 3)[0].nodeValue.trim()) {
                searchedNode.push(currentNode);
            }

            //将需要特殊显示的节点显示
            each(searchedNode, function (item) {
                ClassUtil.addClass(item, "focus");
            });


            //3.将其子节点放入缓存队列中
            var childNodes = getChildrenByTagName(currentNode, "div");
            if (childNodes.length > 0) {
                //currentTree.concat(childNodes);  //为何还不行啊!!!  扯淡啊....
                each(childNodes, function (item) {
                    currentTree.push(item);
                });
            }
            setTimeout(arguments.callee, 500);
        } else {
            //遍历完毕
            if (searchedNode.length == 0) {
                document.getElementById("tips").innerHTML = '*找不到此文本';
            } else {
                //将需要特殊显示的节点显示
                each(searchedNode, function (item) {
                    ClassUtil.addClass(item, "focus");
                })
            }
        }

    }


    /**
     * 遍历二叉树的事件处理函数
     */
    function traverse() {

        //初始化搜索环境
        currentTree = [];
        lastNode = [];
        searchedNode = [];
        each(document.getElementsByClassName("focus"), function (item) {
            ClassUtil.removeClass(item, "focus");
        });

        var root = document.getElementById("tree");
        currentTree.push(root);
        setTimeout(traverseTree, 0);
    }


    /**
     * 初始化函数
     */
    function init() {
        initTree();
        initDeleteButton();
        initAddButton();
        initSearchButton();
    }

    init();
};