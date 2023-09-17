var console = console || {
    log: function () {
        return false;
    }
};//兼容IE,当IE不支持console.log时，自定义一个包含log方法的对象给他
if (!window.localStorage) {
    window.localStorage = {
        getItem: function (sKey) {
            if (!sKey || !this.hasOwnProperty(sKey)) {
                return null;
            }
            return unescape(document.documentElement.getAttribute("localStorage_" + sKey));
        },
        setItem: function (sKey, sValue) {
            if (!sKey) {
                return;
            }
            document.documentElement.setAttribute("localStorage_" + sKey, escape(sValue));
            document.documentElement.save("localStorage");
        },
        removeItem: function (sKey) {
            if (!sKey || !this.hasOwnProperty(sKey)) {
                return;
            }
            document.documentElement.removeAttribute("localStorage_" + sKey);
            document.documentElement.save("localStorage");
        },
        clear: function () {
            var attributes = document.documentElement.attributes;
            for (var i = attributes.length - 1; i >= 0; i--) {
                var attributeName = attributes[i].name;
                if (attributeName.indexOf("localStorage_") === 0) {
                    document.documentElement.removeAttribute(attributeName);
                }
            }
            document.documentElement.save("localStorage");
        }
    };
}
