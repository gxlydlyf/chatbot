//if 代码块进行特性检测测试，以确保在尝试注册 service worker 之前，该特性是被支持的。
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(function (registration) {
            console.log('Service Worker 注册成功:', registration);
        }, function (error) {
            console.log('Service Worker 注册失败:', error);
        })
}