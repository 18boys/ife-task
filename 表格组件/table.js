/**
 * 表格组件
 * Created by lishuai on 16/5/25.
 */


(function(){
    function Table(config){
        this.rows=config.rows||5;
        this.cols=config.cols||4;
    }

    //暴露给外部的初始化函数,返回值为一个dom对象
    Table.prototype.init=function(){
        var table=document.createElement("table");
        for(i=0;i<this.rows;i++){
            var row=table.insertRow(0);
            var html='';
            for(j=0;j<this.cols;j++){
               html+='<td></td>'
            }
        }
        return table;
    };
    window.Table=Table;

})();
