/**
 *
 * Created by lishuai on 16/4/26.
 */

window.onload=function(){


    var currentTree=[],
        lastNode=[];

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
     * 封装一个获取特定tag的子节点的方法
     */
    function getChildrenByTagName(parent,tagName){
        var special=[];
        var childNodes=parent.childNodes;
        if(childNodes.length>0){
            Array.prototype.forEach.call(childNodes,function(item){
                if(item.nodeType==1&&item.tagName.toLowerCase()==tagName){
                    special.push(item);
                }
            })
        }
        return special;

    }

    /**
     * 遍历二叉树的递归函数
     */
    function traverseTree(){


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
        //1.首先将上一次处理的目标的尺寸变回来
        if(lastNode.length>0){
            var last=lastNode.pop();
            last[0].style.borderColor=last[1];
        }
        if(currentTree.length>0){

           //2.取出第一个作为这一次遍历的目标
            var currentNode=currentTree.pop();
            lastNode.push([currentNode,currentNode.style.borderColor]);
            currentNode.style.borderColor="red";

            //3.将其子节点放入缓存队列中
            var childNodes=getChildrenByTagName(currentNode,"div");
            if(childNodes.length>0){
                //currentTree.concat(childNodes);  //为何还不行啊!!!  扯淡啊....
                console.log("childNodes",childNodes);
                Array.prototype.forEach.call(childNodes,function(item){
                    currentTree.push(item);
                });
                console.log("currentTree",currentTree);
            }
            setTimeout(arguments.callee,500);
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
     * 遍历二叉树的外部函数
     */
    function traverse(){

        //var obj=document.getElementsByTagName("div");
        var root=document.getElementById("level1_0");
        currentTree.push(root);
        //currentTree.push(obj);
        //Array.prototype.forEach.call(obj,function(item){   //使用concat都不能把他装进去,哎,什么情况?
        //    currentTree.push(item);
        //    console.log(item);
        //});
        setTimeout(traverseTree,0);
    }

    /**
     *
     * 添加开始遍历的按钮点击事件
     */
    function initButton(){
        var button=document.getElementById("button");
        EventUtil.addEvent(button,"click",traverse)
    }

    /**
     * 初始化
     */
    function init(){
        initButton();
    }

    init();
};
