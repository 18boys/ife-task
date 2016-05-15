/**
 * 测试设计模式
 * Created by shuai.li on 5/15/2016.
 */


/**
 *单例模式
 *
 */

window.onload = function () {

    var createMask = function () {
        var result;
        return function () {
            return result || (result = document.body.appendChild(document.createElement("div")));
        }
    }();
    var firstObject = createMask();
    var secondObject = createMask();
    //console.log(firstObject == secondObject);
};


/**
 *桥连模式
 *
 */
var createSington = function () {
    var result;
    return function (fn) {
        return result || (result = fn.apply(this, arguments));
    }
}();

var firstObject = createSington(function () {
    return document.body.appendChild(document.createElement("div"))
});
var secondObject = createSington(function () {
    return document.body.appendChild(document.createElement("div"))
});

//console.log(firstObject == secondObject);


/**
 * 不好看懂的观察者模式
 */

var events = function () {

    var listen, log, obj, one, remove, trigger, __this;
    obj = {};
    __this = this;
    listen = function (key, eventfn) {  //把简历扔盒子, key就是联系方式.
        var stack, _ref;  //stack是盒子
        stack = ( _ref = obj[key] ) != null ? _ref : obj[key] = [];
        return stack.push(eventfn);

    };

    one = function (key, eventfn) {
        remove(key);
        return listen(key, eventfn);

    };

    remove = function (key) {
        var _ref;
        return ( _ref = obj[key] ) != null ? _ref.length = 0 : void 0;

    };

    trigger = function () {  //面试官打电话通知面试者

        var fn, stack, _i, _len, _ref, key;
        key = Array.prototype.shift.call(arguments);
        stack = ( _ref = obj[key] ) != null ? _ref : obj[key] = [];
        for (_i = 0, _len = stack.length; _i < _len; _i++) {
            fn = stack[_i];
            if (fn.apply(__this, arguments) === false) {
                return false;
            }

        }
    };

        return {

            listen: listen,

            one: one,

            remove: remove,

            trigger: trigger

        }
}();


var adultTv = Events();

adultTv.listen(  'play',  function( data ){

    alert ( "今天是谁的电影" + data.name );

});

//发布者

adultTv.trigger(  'play',  { 'name': '麻生希' }  );