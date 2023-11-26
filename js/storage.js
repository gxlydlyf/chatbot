window.LS = window.localStorage || {
    isObject: function (variable) {
        return $.isObject(variable);
    },
    checkItem: function () {
        var tempLocalStorage = Cookies.get('localStorage');
        try {
            tempLocalStorage = JSON.parse(tempLocalStorage);
        } catch (e) {
            tempLocalStorage = false;
            console.log('转化为JSON出现问题', e);
        }
        if (!this.isObject(tempLocalStorage)) {
            tempLocalStorage = {};
            Cookies.set('localStorage', JSON.stringify(tempLocalStorage));
        }
    },
    setItem: function (key, value) {
        this.checkItem();
        var tempLocalStorage = JSON.parse(Cookies.get('localStorage'));
        tempLocalStorage[key] = value;
        Cookies.set('localStorage', JSON.stringify(tempLocalStorage));
    },
    getItem: function (key) {
        this.checkItem();
        var tempLocalStorage = JSON.parse(Cookies.get('localStorage'));
        return tempLocalStorage[key];
    },
    removeItem: function (key) {
        this.checkItem();
        var tempLocalStorage = JSON.parse(Cookies.get('localStorage'));
        delete tempLocalStorage[key];
        Cookies.set('localStorage', JSON.stringify(tempLocalStorage));
    },
    clear: function () {
        Cookies.set('localStorage', false);
        this.checkItem();
    }
};
if (window.jQuery) window.jQuery.LS = window.LS;