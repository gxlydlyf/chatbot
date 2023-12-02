$(document).ready(function () {
    var PWA_web_app_installBTN = $('#PWA_web_app_install');
    if (window.navigator && ('serviceWorker' in window.navigator)) {
        // 浏览器支持 Service Worker
        var deferredPrompt;
        window.addEventListener('beforeinstallprompt', function (e) {
            e.preventDefault();

            deferredPrompt = e;
        });

        // 当用户点击安装提示按钮时，调用以下方法来安装应用
        PWA_web_app_installBTN.click(function () {
            deferredPrompt.prompt();

            deferredPrompt.userChoice.then(function (choiceResult) {
                if (choiceResult.outcome === 'accepted') {
                    console.log('用户接受 A2HS 提示');
                } else {
                    console.log('用户忽略了 A2HS 提示');
                }

                deferredPrompt = null;
            });

        })
    } else {
        // 浏览器不支持 Service Worker
        PWA_web_app_installBTN.remove();
    }

})