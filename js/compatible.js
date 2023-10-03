// var console = console || {
//     log: function () {
//         return false;
//     },
//     warn: function () {
//         return false;
//     }
// };//兼容IE,当IE不支持console.log时，自定义一个包含log方法的对象给他

// Polyfill for Object.create()
if (typeof Object.create !== 'function') {
    Object.create = function (proto) {
        function F() {
        }

        F.prototype = proto;
        return new F();
    };
}
// Polyfill for Object.freeze()
if (typeof Object.freeze !== 'function') {
    Object.freeze = function (obj) {
        return obj;
    };
}

