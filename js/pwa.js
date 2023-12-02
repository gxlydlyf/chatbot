$(document).ready(function () {
    var PWA_web_app_installBTN = $('#PWA_web_app_install');

    window.isPwa = function () {
        var displayModes = ["fullscreen", "standalone", "minimal-ui"];
        for (var i = 0; i < displayModes.length; i++) {
            if (window.matchMedia('(display-mode: ' + displayModes[i] + ')').matches) {
                return true;
            }
        }
        return false;
    };

    try {
        if (window.navigator && ('serviceWorker' in window.navigator)) {
            // 浏览器支持 Service Worker
            window.deferredPrompt = undefined;
            window.appInstalled = false;
            window.addEventListener('beforeinstallprompt', function (e) {
                e.preventDefault();

                window.deferredPrompt = e;
            });
            window.addEventListener('appinstalled', function (e) {
                window.appInstalled = true;
            });

            // 当用户点击安装提示按钮时，调用以下方法来安装应用
            PWA_web_app_installBTN.click(function () {
                if (isPwa()) {
                    PWA_web_app_installBTN.remove();
                }
                if (window.deferredPrompt === undefined) {
                    if (window.appInstalled === true) {
                        window.open("web+chatgpt://index")
                    } else {
                        PWA_web_app_installBTN.children("span").text("失败");
                        setTimeout(function () {
                            PWA_web_app_installBTN.children("span").text("应用");
                        }, 1000)
                    }
                } else {
                    window.deferredPrompt.prompt();

                    window.deferredPrompt.userChoice.then(function (choiceResult) {
                        if (choiceResult.outcome === 'accepted') {
                            console.log('用户接受 A2HS 提示');
                            PWA_web_app_installBTN.children("span").text("成功");
                            setTimeout(function () {
                                PWA_web_app_installBTN.children("span").text("应用");
                            }, 1000)
                        } else {
                            console.log('用户忽略了 A2HS 提示');
                            PWA_web_app_installBTN.children("span").text("失败");
                            setTimeout(function () {
                                PWA_web_app_installBTN.children("span").text("应用");
                            }, 1000)
                        }

                        // deferredPrompt = null;
                    });

                }

            })

        } else {
            // 浏览器不支持 Service Worker
            PWA_web_app_installBTN.remove();
        }
    } catch (e) {
        //不支持pwa应用
        PWA_web_app_installBTN.remove();
    }

    if (isPwa()) {
        PWA_web_app_installBTN.remove();
    }

})