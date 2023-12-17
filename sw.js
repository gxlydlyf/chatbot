self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('ChatGPTFreeCache').then(function (cache) {
            return cache.addAll([
                // jQuery 以及 jQuery Plugins
                'js/jQuery/jquery/jquery.js',
                'js/jQuery/jquery/jquery.min.js',
                'js/jQuery/jquery2/demos.css',
                'js/jQuery/jquery2/jquery.ui.accordion.css',
                'js/jQuery/jquery2/jquery.ui.accordion.min.css',
                'js/jQuery/jquery2/jquery.ui.all.css',
                'js/jQuery/jquery2/jquery.ui.autocomplete.css',
                'js/jQuery/jquery2/jquery.ui.autocomplete.min.css',
                'js/jQuery/jquery2/jquery.ui.base.css',
                'js/jQuery/jquery2/jquery.ui.button.css',
                'js/jQuery/jquery2/jquery.ui.button.min.css',
                'js/jQuery/jquery2/jquery.ui.core.css',
                'js/jQuery/jquery2/jquery.ui.core.min.css',
                'js/jQuery/jquery2/jquery.ui.datepicker.css',
                'js/jQuery/jquery2/jquery.ui.datepicker.min.css',
                'js/jQuery/jquery2/jquery.ui.dialog.css',
                'js/jQuery/jquery2/jquery.ui.dialog.min.css',
                'js/jQuery/jquery2/jquery.ui.menu.css',
                'js/jQuery/jquery2/jquery.ui.menu.min.css',
                'js/jQuery/jquery2/jquery.ui.progressbar.css',
                'js/jQuery/jquery2/jquery.ui.progressbar.min.css',
                'js/jQuery/jquery2/jquery.ui.resizable.css',
                'js/jQuery/jquery2/jquery.ui.resizable.min.css',
                'js/jQuery/jquery2/jquery.ui.selectable.css',
                'js/jQuery/jquery2/jquery.ui.selectable.min.css',
                'js/jQuery/jquery2/jquery.ui.slider.css',
                'js/jQuery/jquery2/jquery.ui.slider.min.css',
                'js/jQuery/jquery2/jquery.ui.spinner.css',
                'js/jQuery/jquery2/jquery.ui.spinner.min.css',
                'js/jQuery/jquery2/jquery.ui.tabs.css',
                'js/jQuery/jquery2/jquery.ui.tabs.min.css',
                'js/jQuery/jquery2/jquery.ui.theme.css',
                'js/jQuery/jquery2/jquery.ui.theme.min.css',
                'js/jQuery/jquery2/jquery.ui.tooltip.css',
                'js/jQuery/jquery2/jquery.ui.tooltip.min.css',
                'js/jQuery/jquery2/jquery-1.8.2.js',
                'js/jQuery/jquery2/jquery-ui.css',
                'js/jQuery/jquery2/jquery-ui.js',
                'js/jQuery/jquery2/jquery-ui.min.css',
                'js/jQuery/jquery2/images/ui-bg_flat_0_aaaaaa_40x100.png',
                'js/jQuery/jquery2/images/ui-bg_flat_75_ffffff_40x100.png',
                'js/jQuery/jquery2/images/ui-bg_glass_55_fbf9ee_1x400.png',
                'js/jQuery/jquery2/images/ui-bg_glass_65_ffffff_1x400.png',
                'js/jQuery/jquery2/images/ui-bg_glass_75_dadada_1x400.png',
                'js/jQuery/jquery2/images/ui-bg_glass_75_e6e6e6_1x400.png',
                'js/jQuery/jquery2/images/ui-bg_glass_95_fef1ec_1x400.png',
                'js/jQuery/jquery2/images/ui-bg_highlight-soft_75_cccccc_1x100.png',
                'js/jQuery/jquery2/images/ui-icons_222222_256x240.png',
                'js/jQuery/jquery2/images/ui-icons_2e83ff_256x240.png',
                'js/jQuery/jquery2/images/ui-icons_454545_256x240.png',
                'js/jQuery/jquery2/images/ui-icons_888888_256x240.png',
                'js/jQuery/jquery2/images/ui-icons_cd0a0a_256x240.png',
                'js/jQuery/jqueryColor/jquery.color.js',
                'js/jQuery/jqueryColor/jquery.color.min.js',
                'js/jQuery/jqueryColor/jquery.color.plus-names.js',
                'js/jQuery/jqueryColor/jquery.color.plus-names.min.js',
                'js/jQuery/jqueryColor/jquery.color.svg-names.js',
                'js/jQuery/jqueryColor/jquery.color.svg-names.min.js',
                'js/jQuery/jqueryEasing/jquery.easing.compatibility.js',
                'js/jQuery/jqueryEasing/jquery.easing.js',
                'js/jQuery/jqueryEasing/jquery.easing.min.js',
                'js/jQuery/jqueryMouseWheel/jquery.mousewheel.js',
                'js/jQuery/jqueryMouseWheel/jquery.mousewheel.min.js',
                'js/jQuery/jqueryScrollIntoView/jquery.scrollintoview.js',
                'js/jQuery/jqueryScrollIntoView/jquery.scrollintoview.min.js',

                'js/html5shiv.min.js',
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
                "js/visibility/visibility.core.js",
                "js/visibility/visibility.fallback.js"
                // 添加其他需要缓存的文件
            ]);
        })
    );
});
