if (window.jQuery) {
    window.jQuery.getUrlParam = function (name, UrlDecode) {//获取get参数
        if (typeof UrlDecode === 'undefined') {
            UrlDecode = true;
        }
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (UrlDecode === true) {//是否对获取到的内容进行url解码
            if (r != null) return decodeURIComponent(r[2]);//返回解码字符
        } else if (UrlDecode === false) {
            if (r != null) return r[2];//返回没有解码的url字符
        } else {
            if (r != null) return unescape(r[2]);//返回稀奇古怪的乱码字符，但ChatGPT可以识别

        }
        return null;
    };

    window.jQuery["稀奇古怪"] = function (str) {
        return unescape(encodeURIComponent(str));
    };

    window.jQuery.isObject = function (variable) {//判断是否为对象
        // if (window.jQuery) window.jQuery.isObject = function (variable) {
        //     return variable !== null && variable !== undefined && typeof variable === 'object' && !Array.isArray(variable);
        // };
        return variable !== null && variable !== undefined && typeof variable === 'object' && Object.prototype.toString.call(variable) !== '[object Array]';
    };

    window.jQuery.mergeObjects = function (obj1, obj2) {//合并两个对象
        // 判断浏览器是否为IE5及以上版本
        var isIE5orAbove = (navigator.userAgent.indexOf("MSIE") !== -1 && parseFloat(navigator.appVersion.split("MSIE")[1]) >= 5);

        // 判断浏览器是否支持ES6的Object.assign方法
        var isObjectAssignSupported = (typeof Object.assign === 'function');

        // 兼容IE5及以上的方法
        function merge(obj1, obj2) {
            if (isObjectAssignSupported) {
                return Object.assign(obj1, obj2);
            } else if (isIE5orAbove) {
                for (var key in obj2) {
                    if (obj2.hasOwnProperty(key)) {
                        obj1[key] = obj2[key];
                    }
                }
                return obj1;
            } else {
                throw new Error('Browser not supported');
            }
        }

        // 调用合并函数
        return merge(obj1, obj2);
    }
}


/*
//无法兼容到更低版本的浏览器
$(document).ready(function () {
    $('.synchronized-vertical-scrolling').on('wheel', function (event) {
        event.preventDefault();
        console.log(event);
        var deltaY = event.originalEvent.deltaY;
        var scrollLeft = $(this).scrollLeft();
        $(this).scrollLeft(scrollLeft + deltaY);
    });
});

 */

function ready(callback) {
    if (document.readyState === 'complete') {
        callback();
    } else {
        document.onreadystatechange = function () {
            if (document.readyState === 'complete') {
                callback();
            }
        };
    }
}

ready(function () {
    var elements = document.getElementsByTagName('div');
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].className.indexOf('synchronized-vertical-scrolling') > -1) {
            elements[i].onmousewheel = function (event) {
                event = event || window.event;
                event.returnValue = false;
                console.log(event);
                var deltaY = event.wheelDelta;
                var scrollLeft = this.scrollLeft;
                this.scrollLeft = scrollLeft + deltaY;
            };
        }
    }
});
