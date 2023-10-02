if (window.jQuery) window.jQuery.getUrlParam = function (name, UrlDecode = true) {
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

if (window.jQuery) window.jQuery["稀奇古怪"] = function (str) {
    return unescape(encodeURIComponent(str));
};

$(document).ready(function () {
    $('.synchronized-vertical-scrolling').on('wheel', function (event) {
        event.preventDefault();
        console.log(event);
        var deltaY = event.originalEvent.deltaY;
        var scrollLeft = $(this).scrollLeft();
        $(this).scrollLeft(scrollLeft + deltaY);
    });
});