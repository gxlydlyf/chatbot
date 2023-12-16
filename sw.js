self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('ChatGPTFreeCache').then(function (cache) {
            return cache.addAll([
                'js/html5shiv.min.js',
                'js/jquery2/jquery-1.8.2.js',
                'js/jquery2/jquery-ui.js',
                'js/jquery2/jquery-ui.min.css',
                'js/jquery.min.js',
                'js/jquery.easing.min.js',
                'js/jquery.easing.compatibility.js',
                'js/ServiceWorker.js',
                'js/json2.js',
                'js/crypto-js.min.js',
                'js/marked/marked.min.js',
                'js/marked/highlight/index.umd.js',
                'js/marked/highlight/highlight.min.js',
                'js/marked/highlight/languages/go.min.js',
                'js/marked/highlight/styles/a11y-dark.min.css',
                'js/marked/linkify/index.umd.js',
                'js/showdown/dist/showdown.js',
                'js/marked/marked.load.js',
                'js/js.cookie.min.js',
                'js/jquery.scrollintoview.min.js',
                'js/jqueryColor/jquery.color.js'
                // 添加其他需要缓存的文件
            ]);
        })
    );
});
