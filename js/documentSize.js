$(document).ready(function () {
    window.documentSize = {
        height: function () {
            return (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || document.documentElement.offsetHeight);
        },
        width: function () {
            return (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || document.documentElement.offsetWidth);
        }
    };
})
