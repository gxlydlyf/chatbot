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
        return variable !== null && variable !== undefined && typeof variable === 'object' && Object.prototype.toString.call(variable) !== '[object Array]';
    };
    // window.jQuery.isArray = function (variable) {//判断是否为数组
    //     return Object.prototype.toString.call([]) === '[object Array]';
    // };
    window.isArray = jQuery.isArray;

    window.jQuery.mergeObjects = function (obj1, obj2) {//合并两个对象
        // 检测浏览器是否支持Object.assign方法
        if (typeof Object.assign === 'function') {
            return Object.assign({}, obj1, obj2);
        } else {
            // 创建一个新对象作为合并结果
            var mergedObj = {};
            var prop;

            // 复制obj1的属性到mergedObj
            for (prop in obj1) {
                if (obj1.hasOwnProperty(prop)) {
                    mergedObj[prop] = obj1[prop];
                }
            }

            // 复制obj2的属性到mergedObj
            for (prop in obj2) {
                if (obj2.hasOwnProperty(prop)) {
                    mergedObj[prop] = obj2[prop];
                }
            }

            return mergedObj;
        }
    }

    $.generateRandomString = function (length, otherCharacters) {
        if (!otherCharacters) {
            otherCharacters = '';
        }
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" + otherCharacters.toString();
        var randomString = "";

        for (var i = 0; i < length; i++) {
            var randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }

        return randomString;
    }

    $._manyClick = {
        eventsList: [],
        newEvent: function (element, eventClass, unregisterCode) {
            this.eventsList.push({"element": element, "eventClass": eventClass, "remove": unregisterCode})
        },
        remove: function (eventClass, element) {
            if (!eventClass) {
                eventClass = '';
            }
            eventClass = eventClass.toString();

            var found = false;
            for (var i = 0; i < this.eventsList.length; i++) {
                var item = this.eventsList[i];
                if (element) {
                    if (!(item.element.selector === element.selector)) {
                        continue;
                    }
                }
                if (eventClass) {
                    if (!(item.eventClass === eventClass)) {
                        continue;
                    }
                }

                found = true;
                // 找到匹配项后的操作
                item.remove();
                delete this.eventsList[i];
            }

            this.deleteNull();

            return found;

        },
        deleteNull: function () {
            list = this.eventsList;
            // 创建一个新数组，用于存储非空值
            var filteredList = [];

            // 遍历原始列表
            for (var i = 0; i < list.length; i++) {
                // 判断元素是否为空值
                if (list[i]) {
                    // 将非空值添加到新数组中
                    filteredList.push(list[i]);
                }
            }
            this.eventsList = filteredList
        }
    }


    $.fn.manyClick = function (count, callback, eventClass) {//增加多击事件 使用方法(请在document ready时使用) $('Element').manyClick(TheNumberOfClicks,function(){ console.log("callback") ,'自定义事件类'})
        var element = this;
        // console.log(element)
        if (!eventClass) {
            eventClass = new Date().getTime() + ";" + $.generateRandomString(10);
        }
        var clickCount = 0;
        var clickTimer = null;
        var clickHandler = function (event) {
            var triggerElement = $(event.target);//触发这个事件的元素
            clickCount++;
            clearTimeout(clickTimer);

            clickTimer = window.setTimeout(function () {
                // console.log(clickCount);
                if (clickCount === count) {
                    callback.call(triggerElement, eventClass, unregisterClickHandler);
                }
                clickCount = 0;
                clickTimer = null;
            }, 400);
        };
        element.on('click', clickHandler);
        var unregisterClickHandler = function () {
            element.off('click', clickHandler);
            // console.log('事件处理程序已注销');
        };
        $._manyClick.newEvent(element, eventClass, unregisterClickHandler);
    };
    $.fn.offManyClick = function (eventClass) {
        return $._manyClick.remove(eventClass, $(this));
    }
    $.offManyClick = function (eventClass, JqueryElement) {
        if (!JqueryElement) {
            JqueryElement = '';
        }
        // console.log($._manyClick.eventsList)
        return $._manyClick.remove(eventClass, JqueryElement);

    }
    window.containsString = $.doesItContainAString = function (str, containsString) {
        if (typeof String.prototype.indexOf !== 'undefined') {
            // 使用indexOf方法检查字符串中是否包含 containsString
            return str.indexOf(containsString) !== -1;
        } else {
            // 兼容IE5及更早版本
            return str.search(containsString) !== -1;
        }
    }
    String.prototype.containsString = function (containsString) {
        return window.containsString(this, containsString);
    };

    window.isElement = $.isElement = function (element) {
        if (typeof element === 'object') {
            if (element instanceof jQuery) {
                // 是 jQuery 元素
                return true;
            } else if (element.nodeType === 1) {
                // 是 DOM 元素
                return true;
            }
        }
        return false;
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
                // console.log(event);
                var deltaY = event.wheelDelta;
                var scrollLeft = this.scrollLeft;
                this.scrollLeft = scrollLeft + deltaY;
            };
        }
    }
});
