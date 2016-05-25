/**
 *写成函数，便于new一个出来，但是需要重写函数的prototype会不会有问题
 */

(function () {

    //组件函数,个性的配置写在这里
    function textCount(config) {
        this.config = config;
        this.input = $('#' + config.id || "text-input-num");
    }

    //组件的原型，公用的方法写在这里
    textCount.prototype.init = function () {

        function bind(that){
            that.input.on('keyup',function(){
                that.render(that);
            })
        }

        bind(this);//this对象是新生成的textCount对象
        return this;
    };


    textCount.prototype.render=function(){

        var num = this.input.val().length;
        if ($('#J_input_count').length == 0) {
            this.input.after('<span id="J_input_count"></span>');
        };
        $('#J_input_count').html(num+'个字');
        return this;
    };

    window.textCount=textCount;
})();


/**
 * 写成对象的方式  实际上还是一个函数
 */

//var textCount=function(config){
//
//        function textCountObj(config){
//            //组件函数,个性的配置写在这里
//            this.config = config;
//            this.input = $('#' + config.id || "text-input-num");
//        }
//        //组件的原型，公用的方法写在这里
//        textCountObj.prototype.init = function () {
//
//            function bind(that){
//                that.input.on('keyup',function(){
//                    that.render(that);
//                })
//            }
//
//            bind(this);//this对象是新生成的textCount对象
//            return this;
//        };
//
//
//        textCountObj.prototype.render=function(){
//
//            var num = this.input.val().length;
//            if ($('#J_input_count').length == 0) {
//                this.input.after('<span id="J_input_count"></span>');
//            };
//            $('#J_input_count').html(num+'个字');
//            return this;
//        };
//
//       return textCount
//    }();
//
//    window.textCount=textCount;






