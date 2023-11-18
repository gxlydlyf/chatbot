function copyToClipboard(text, callback) {
    if (typeof callback !== 'function') {
        callback = function () {

        }
    }
    var error;
    var Elog = function (error) {
        if (typeof window.console !== 'undefined' && typeof window.console.error === 'function') {
            window.console.error(error);
        }
    }

    if (window.clipboardData && window.clipboardData.setData) {
        // For IE5
        window.clipboardData.setData('Text', text);
        if (window.clipboardData.getData('Text') === text) {
            callback('success', text);
        } else {
            callback('error', 'Failed to copy to clipboard');
        }
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
        try {

        } catch (e) {

        }
        Promise.resolve(navigator.clipboard.writeText(text))
            .then(function () {
                callback('success', text);
            }, function (error) {
                callback('error', error);
            });//某些IE浏览器没有.catch，引用时会报错
    } else if (document.execCommand) {
        if (document.body) {
            var input = document.createElement("input");
            input.value = text;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length);
            document.execCommand('Copy');
            document.body.removeChild(input);
            callback('success', text);
        } else {
            error = "Please wait until the body is loaded before executing.";
            // window.console.log("请等待body加载完成之后再执行。");
            Elog(error);
            callback('error', error);
        }
    } else {
        // Clipboard API is not supported
        error = "Clipboard API is not supported";
        Elog(error);
        callback('error', error);
    }
}