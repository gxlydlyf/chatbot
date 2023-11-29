window.proxyObj = {
    createXHR: function () {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    // 创建XMLHttpRequest对象失败
                }
            }
        } else {
            // 浏览器不支持AJAX
            xhr = null;
        }
        return xhr;
    },
    currentURL: function () {
        var protocol = (window.location.protocol.indexOf('https') === 0) ? 'https://' : 'http://';
        var domain = document.location.hostname;
        return protocol + domain + '/';
    },
    netlify: function () {
        var xhr = this.createXHR();
        var result = null;
        xhr.open("GET", this.currentURL() + "verify/netlify", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                result = xhr.responseText;
            }
        }
        xhr.send();
        if (result === 'netlify') {
            return true;
        } else {
            return false;
        }
    }
}