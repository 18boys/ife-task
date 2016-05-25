/**
 * 一个带遮罩的确认取消弹出框
 * Created by shuai.li on 5/25/2016.
 */

(function(){

    function Pop(config){
        this.popId=config.popId||"pop";
        this.maskId=config.maskId||"mask";
        this.width=config.width||500;
        this.height=config.height||300;
        this.clickClose=config.clickClose||true;   //点击到pop外面是否关闭pop

    }

    Pop.prototype.init=function(){
        return this;
    };

    Pop.prototype.toggle=function(){
        $('#'+this.popId).toggleClass("hide mask-pop").css({
            height:this.height+"px",
            width:this.width+"px"

        });
        $('#'+this.maskId).toggleClass("hide mask-mask");

        if(this.clickClose){
            $('#'+this.maskId).on("click")
        }
        return this;
    };

    window.Pop=Pop;
})();


