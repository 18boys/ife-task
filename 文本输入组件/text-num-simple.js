/**
 * Created by shuai.li on 5/25/2016.
 */

$(function(){
    $("#text-input").on("keyup",function(){
        var num=$(this).val().length;
        if($("#text-input-num").length==0){
            $(this).after('<span id="text-input-num"></span>')
        }
        $("#text-input-num").html(num+"个字");
    });
});
