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

// Polyfill 字符串的.trim()去除两边空白符号
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

if (!String.prototype.toLowerCase) {// Polyfill 把字符串转化为小写
    String.prototype.toLowerCase = function () {
        return this.replace(/[A-Z]/g, function (match) {
            return String.fromCharCode(match.charCodeAt(0) + 32);
        });
    };
}
if (!String.prototype.toUpperCase) {// Polyfill 把字符串转化为大写
    String.prototype.toUpperCase = function () {
        return this.replace(/[a-z]/g, function (match) {
            return String.fromCharCode(match.charCodeAt(0) - 32);
        });
    }
}

//设置 .apply() 和 .call() 功能，from https://www.cnblogs.com/johnzhu/p/6510074.html
if (!Function.prototype.apply) {
    Function.prototype.apply = function (obj, args) {
        obj = obj === undefined ? window : Object(obj);//obj可以是js基本类型
        var i = 0, ary = [], str;
        if (args) {
            for (var len = args.length; i < len; i++) {
                ary[i] = "args[" + i + "]";
            }
        }
        obj._apply = this;
        str = 'obj._apply(' + ary.join(',') + ')';
        try {
            return eval(str);
        } catch (e) {
        } finally {
            delete obj._apply;
        }
    };
}
if (!Function.prototype.call) {
    Function.prototype.call = function (obj) {
        var i = 1, args = [];
        for (var len = arguments.length; i < len; i++) {
            args[i - 1] = arguments[i];
        }
        return this.apply(obj, args);
    };
}