/**
 *
 * Created by lishuai on 16/5/24.
 */

window.onload = function() {
    var data = {
        title: '这是测试标题',
        content: '这是测试里的内容',
        type: 'default'
    };
    modal(data);

    function modal(data) {
        var config = data;
        console.log(data);
        var modalBox = {
            modalConfig: {
                title: config.title || '默认标题', // modal标题
                content: config.content || '这是默认的内容', // modal内容
                //type: config.type, // modal类型
                func: config.func || 0 // 其他处理方法
            },
            //modal显示/隐藏
            toggle: function() {
                var modal = document.getElementById("modal");
                if (modal.className.indexOf('hide')) {
                    modal.className = 'modal';
                } else {
                    modal.className = 'modal hide';
                }
            },
            init: function() {
                var that = this;
                var modal = document.getElementById("modal");
                //写入配置
                document.querySelector(".modal-title").innerText = that.modalConfig.title;
                document.querySelector(".modal-body").innerText = that.modalConfig.content;
                document.querySelector(".modal-title").innerText = that.modalConfig.title;
                //监听事件
                document.querySelector(".toggle").addEventListener('click', function() {
                    that.toggle();
                }, false);

                //遮罩层隐藏
                document.querySelector("#overlay-mask").addEventListener('click', function() {
                    document.getElementById("modal").className = 'modal hide';

                }, false);
                //取消事件
                document.querySelector(".modal-cancel").addEventListener('click', function() {
                    document.getElementById("modal").className = 'modal hide';
                }, false);

                document.querySelector(".modal-func").addEventListener('click', function() {
                    //如果没有指定处理函数
                    if(that.modalConfig.func == 0){
                        document.getElementById("modal").className = 'modal hide';
                    }else{
                        that.modalConfig.func();
                        document.getElementById("modal").className = 'modal hide';
                    }
                }, false);
            }

        };
        return modalBox.init();
    }


}