

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
        /*
        var lowerCaseStr = '';
        for (var i = 0; i < str.length; i++) {
            var charCode = str.charCodeAt(i);
            if (charCode >= 65 && charCode <= 90) {
                // 大写字母转换为小写字母
                lowerCaseStr += String.fromCharCode(charCode + 32);
            } else {
                lowerCaseStr += str.charAt(i);
            }
        }

        return lowerCaseStr;
         */

        return this.replace(/[A-Z]/g, function (match) {
            return String.fromCharCode(match.charCodeAt(0) + 32);
        });
    };
}