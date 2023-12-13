//true支持，false不支持
function isCalcSupported() {
    if (window.isCalcSupportedBoolean === undefined) {
        var el = document.createElement('div');
        try {
            el.style.width = 'calc(1px + 1px)';
        } catch (e) {
            window.isCalcSupportedBoolean = false;
        }

        window.isCalcSupportedBoolean = !!el.style.width;
    }
    return window.isCalcSupportedBoolean;
}

function isTransitionSupported() {
    if (window.isTransitionSupportedBoolean === undefined) {
        var el = document.createElement('div');
        window.isTransitionSupportedBoolean = el.style.transition !== undefined;
    }
    return window.isTransitionSupportedBoolean;
}