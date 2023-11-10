//jQuery找不到成员, DTPW_changeTagName的问题
var DeveloperToolsPolyfill = {
    _consoleLog: [],
    _checkKeyPress: function (event) {
        // 检测按键事件
        // 检测按下的键码
        var newEvent = {};
        for (var prop in event) {
            if (event.hasOwnProperty(prop)) {
                newEvent[prop] = event[prop];
            }
        }
        // console.log(newEvent)
        event = newEvent;//以上操作防止var keyCode = event.keyCode || event.which;报莫名错误
        var keyCode = event.keyCode || event.which;

        // 判断是否按下了 F12 键或其他按键组合（例如Ctrl+Shift+I、Ctrl+Shift+J等），按下返回false，不按下返回true
        return (keyCode === 123 || (event.ctrlKey && event.shiftKey && (keyCode === 73 || keyCode === 74)));
    },
    _showDeveloperToolsWindow: function () {
        var DTPW_changeTagName = function ($element, newTagName) {
            // 创建新的目标元素
            var $newElement = $('<' + newTagName + '></' + newTagName + '>');

            // 复制原始元素的属性和内容到新元素
            $.each($element[0].attributes, function () {
                $newElement.attr(this.name, this.value);
            });
            $newElement.val($element.val());

            // 复制原始元素的所有事件处理程序到新元素
            var events = $._data($element[0], 'events');
            if (events) {
                $.each(events, function (eventName, eventHandlers) {
                    $.each(eventHandlers, function (index, handler) {
                        $newElement.on(eventName, handler.handler);
                    });
                });
            }

            // 替换原始元素
            $element.replaceWith($newElement);
        };//错误方法
        DTPW_changeTagName = function (element, newTagName) {
            if (element instanceof jQuery) {
                // element is a jQuery object
                element = element.get(0);
            } else {
                // element is a native DOM element
            }

            // 创建新的目标元素
            var newElement = document.createElement(newTagName);

            // 复制原始元素的属性和内容到新元素
            var attributes = element.attributes;
            for (var i = 0; i < attributes.length; i++) {
                var attribute = attributes[i];
                if (attribute.specified) {
                    newElement.setAttribute(attribute.name, attribute.value);
                }
            }
            newElement.value = element.value;

            // 复制原始元素的所有事件处理程序到新元素
            var eventHandlers = element._events;
            if (eventHandlers) {
                for (var eventName in eventHandlers) {
                    if (eventHandlers.hasOwnProperty(eventName)) {
                        var handlers = eventHandlers[eventName];
                        for (var j = 0; j < handlers.length; j++) {
                            var handler = handlers[j];
                            newElement.addEventListener(eventName, handler);
                        }
                    }
                }
            }

            // 替换原始元素
            element.parentNode.replaceChild(newElement, element);
        };//正确方法
        var ScreenHeight80Percent = document.documentElement.clientHeight * 0.8;
        var ScreenWidth80Percent = document.documentElement.clientWidth * 0.8;
        var i;
        var DTPW = $("<div id='DeveloperToolsPolyfillWindow'></div>");//窗口
        var DTPW_windowControl = $("<div id='DeveloperToolsPolyfillWindowControl'></div>");//窗口控制
        var DTPW_nav = $("<div id='DeveloperToolsPolyfillWindowNav' style='background-color: #1e1e1e'></div>");//导航栏
        var DTPW_nav_title = $("<p style='width: 100%;height: 25px;text-align: center;color: white;font-size: 15px;line-height: 25px;font-family: sans-serif;margin: 0;cursor: move' class='disable-selection' id='DeveloperToolsPolyfillWindowNavTitle'>" + location.pathname.split('/').pop()/*当前网页的文件名（包括扩展名）*/ + " - " + (document.title || "无标题网页")/*当前网页的标题*/ + "</p>");
        var DTPW_nav_items = $("<div id='DeveloperToolsPolyfillWindowNavItems' style='font-size: 15px;font-family: sans-serif;background: none;border: none;padding: 0;height: 25px'></div>");
        var DTPW_nav_items_list = $("<ul id='DeveloperToolsPolyfillWindowNavItemsList' class='disable-selection' style='padding: 0;border: none;background: none;height: 25px;overflow: hidden;border-radius: 0;'></ul>");
        DTPW_nav.css({
            height: "50px",
            backgroundColor: "1E1E1E",
            width: "100%",
            position: "absolute",
            top: "0px"
        });
        DTPW_nav.css("backgroundColor", "1E1E1E");
        DTPW_nav.append(DTPW_nav_title);
        DTPW_nav_items.append(DTPW_nav_items_list);
        var DTPW_nav_items_name_list = [
            {name: 'DOM资源管理器', pageElement: "None"},
            {
                name: '控制台',
                pageElement: "<div id='DeveloperToolsPolyfillWindowNavItemsConsole' style='height: 100%;background: white;position: relative;bottom: 0'><div id='DeveloperToolsPolyfillWindowNavItemsConsoleMessages' style='width: 100%'></div><div id='DeveloperToolsPolyfillWindowNavItemsConsoleInputContainer' style='background-color: #efeff2;border-top: 4px solid #cccedb;position: absolute;bottom: 0;height: 30px;width: 100%'><span class='DeveloperToolsPolyfillWindowNavItemsConsoleFunIcon' id='DeveloperToolsPolyfillWindowNavItemsConsoleInputIcon' style='left: 0;top: 0;'><img class='DeveloperToolsPolyfillWindowNavItemsConsoleFunIcon' src='/img/arrow-right-555555.png' alt='行数' /></span><input id='DeveloperToolsPolyfillWindowNavItemsConsoleTextarea' class='empty-style-input-box' style='resize: none;height: 100%;display: inline-block;margin-left: 30px;line-height: 15px;font-size: 15px'><span class='DeveloperToolsPolyfillWindowNavItemsConsoleFunIcon' id='DeveloperToolsPolyfillWindowNavItemsConsoleClearInputIcon' style='right: 60px' title='清除输入(Esc)'><img class='DeveloperToolsPolyfillWindowNavItemsConsoleFunIcon' src='/img/cross-mark-555555.png' alt='清除' /></span><span class='DeveloperToolsPolyfillWindowNavItemsConsoleFunIcon' id='DeveloperToolsPolyfillWindowNavItemsConsoleRunIcon' style='right: 30px' title='运行脚本(Enter)'><img class='DeveloperToolsPolyfillWindowNavItemsConsoleFunIcon' src='/img/triangle-13A04B.png' alt='运行' /></span><span class='DeveloperToolsPolyfillWindowNavItemsConsoleFunIcon' id='DeveloperToolsPolyfillWindowNavItemsConsoleSwitchMultipleLinesIcon' style='right: 0'><img class='DeveloperToolsPolyfillWindowNavItemsConsoleFunIcon' src='/img/arrow-up-double-line-555555.png' alt='行数' /></span></div></div>"
            },
            {name: '调试程序', pageElement: "None"},
            {name: '网络', pageElement: "None"},
            {name: '性能', pageElement: "None"},
            {name: '内存', pageElement: "None"},
            {name: '仿真', pageElement: "None"}
        ];
        for (i = 0; i < DTPW_nav_items_name_list.length; i++) {
            var idName = "DeveloperToolsPolyfillWindowNavItems-" + (i + 1);
            DTPW_nav_items_list.append("<li style='border: none;margin: 0;border-radius: 0;'><a style='padding: 3px 10px 3px 10px' href='#" + idName + "'>" + DTPW_nav_items_name_list[i]['name'] + "</a></li>");
            DTPW_nav_items.append("<div style='background: white' id='" + idName + "'>" + DTPW_nav_items_name_list[i]['pageElement'] + "</div>");
        }
        DTPW_nav.append(DTPW_nav_items);


        // 设置元素的绝对定位样式
        DTPW.css({
            position: "absolute",
            left: "0px",
            top: "0px",
            width: ScreenWidth80Percent + 'px',
            height: ScreenHeight80Percent + 'px',
            fontSize: '15px'
            // fontFamily: "-apple-system,system-ui,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial!important"
        });
        DTPW_windowControl.css({
            position: "absolute",
            top: "0px",
            right: "0px",
            width: '75px',
            height: '20px',
            background: 'none'
        });
        var DTPW_windowControl_BtnStyle = 'width: 20px;height: 20px;display: inline-block;margin-left: 5px;cursor: pointer;';
        var DTPW_windowControl_BtnImageStyle = 'width: 20px;height: 20px;background-size: 20px;background-position: center;background-repeat: no-repeat;';
        var DTPW_windowControl_sizeBtn = $("<div title='最大化' style='" + DTPW_windowControl_BtnStyle + "'><div style='" + DTPW_windowControl_BtnImageStyle + "background-image: url(/img/windowControl/window-maximize.png)'></div></div>");
        var DTPW_windowControl_minimizeBtn = $("<div title='最小化' style='" + DTPW_windowControl_BtnStyle + "'><div style='" + DTPW_windowControl_BtnImageStyle + "background-image: url(/img/windowControl/window-minimize.png)'></div></div>");
        var DTPW_windowControl_closeBtn = $("<div title='关闭' style='" + DTPW_windowControl_BtnStyle + "'><div style='" + DTPW_windowControl_BtnImageStyle + "background-image: url(/img/windowControl/close-line.png)'></div></div>");

        DTPW_windowControl.append(DTPW_windowControl_minimizeBtn, DTPW_windowControl_sizeBtn, DTPW_windowControl_closeBtn);
        DTPW.addClass("border-1px");
        DTPW.append(DTPW_nav);
        // DTPW.append(DTPW_windowControl);
        $("body").append(DTPW);
        console.log(DTPW)
        // $2(function () {
        //     $2("#DeveloperToolsPolyfillWindow").draggable({containment: "body", scroll: false});
        // });


        $2(function () {
            var tabs = $2(DTPW_nav_items.get(0)).tabs({
                active: 0//使用指定的选项初始化选项卡
            });
            //console.log(tabs.children())
            tabs.find(".ui-tabs-nav").sortable({
                axis: "x",
                containment: "parent",
                stop: function () {
                    tabs.tabs("refresh");
                }
            });
        });
        $2(function () {
            $2("#DeveloperToolsPolyfillWindow").draggable({
                handle: "#DeveloperToolsPolyfillWindowNavTitle",
                containment: "document"
            });
            $2("#DeveloperToolsPolyfillWindow").resizable({
                // maxHeight: 250,
                // maxWidth: 350,
                handles: "n, e, s, w, ne, se, sw, nw",//我们将handles选项设置为"n, e, s, w, ne, se, sw, nw"，这意味着resizable插件将允许通过上、右、下、左、右上角、右下角、左下角和左上角的拖动手柄来调整大小。
                minHeight: 300,
                minWidth: 300,
                containment: "document"
            }).on("resize mousemove click", function () {
                // console.log("窗口被调整大小了！");
                // console.log("新的宽度：" + ui.size.width);
                // console.log("新的高度：" + ui.size.height);
                var availableWidth;
                var availableHeight;
                var container;
                var element;
                var element1;

                container = document.getElementById('DeveloperToolsPolyfillWindow');
                availableHeight = container.clientHeight;
                if (availableHeight < 300) {
                    availableHeight = '300px';
                }
                container.style.height = availableHeight;


                container = document.getElementById('DeveloperToolsPolyfillWindow');
                element = document.getElementById('DeveloperToolsPolyfillWindowNavItems-2');
                // 计算可用的垂直空间
                availableHeight = container.clientHeight - 50;
                if (availableHeight < 0) {
                    availableHeight = 0;
                }
                // 设置元素的高度
                element.style.height = availableHeight + 'px';

                container = document.getElementById('DeveloperToolsPolyfillWindowNavItemsConsole');
                element = document.getElementById('DeveloperToolsPolyfillWindowNavItemsConsoleTextarea');
                availableWidth = container.clientWidth - 120;
                if (availableWidth < 50) {
                    availableWidth = 50;
                }
                element.style.width = availableWidth + 'px';

                container = document.getElementById('DeveloperToolsPolyfillWindowNavItemsConsole');
                element = document.getElementById('DeveloperToolsPolyfillWindowNavItemsConsoleMessages');
                element1 = document.getElementById('DeveloperToolsPolyfillWindowNavItemsConsoleInputContainer');
                availableHeight = container.offsetHeight - element1.clientHeight;
                if (availableHeight < 0) {
                    availableHeight = 0;
                }
                element.style.height = availableHeight + 'px';


            });
            $2('#DeveloperToolsPolyfillWindowNavItemsConsoleInputContainer').resizable({
                minHeight: 30,
                handles: "n",
                containment: '#DeveloperToolsPolyfillWindowNavItemsConsole',
                start: function (event, ui) {
                    ui.element.css({
                        width: "100%",
                        top: ''
                    });
                },
                stop: function (event, ui) {
                    ui.element.css({
                        width: "100%",
                        top: ''
                    });
                },
                resize: function (event, ui) {
                    // 在这里编写改变过程中要执行的代码
                    ui.element.css({
                        width: "100%",
                        top: ''
                    });
                }
            });

        });
        var DTPW_NICIC_ResizeScript = function () {
            var element = $('#DeveloperToolsPolyfillWindowNavItemsConsoleTextarea');
            var showBtn = $('#DeveloperToolsPolyfillWindowNavItemsConsoleSwitchMultipleLinesIcon');

            if (element.css('height') === '30px') {
                if (!element.is('input')) {
                    DTPW_changeTagName(element, 'input');
                    showBtn.addClass('transform-rotate-0');
                }

            } else {
                if (!element.is('textarea')) {
                    DTPW_changeTagName(element, 'textarea');
                    showBtn.addClass('transform-rotate-180');
                }
            }
            alert('r')
            DTPW_NICT = $($2('#DeveloperToolsPolyfillWindowNavItemsConsoleTextarea'));//防止后期按下清除和执行按钮获取不到元素，$($2())是为了防止编辑器报警告重复jquery选择器
        };
        $('#DeveloperToolsPolyfillWindowNavItemsConsoleInputContainer').on('resize', DTPW_NICIC_ResizeScript);
        DTPW_nav_title.on('dblclick', function () {
            DTPW = $2(DTPW);
            var TriggerResizeEvent = function () {
                $(DTPW).trigger("click");
            };
            var AnimateStepCallback = {
                duration: 75,
                easing: "easeInOutQuad",
                step: function () {
                    // 在动画过程中持续执行的操作
                    TriggerResizeEvent()
                },
                complete: function () {
                    // 动画完成后执行的操作
                    TriggerResizeEvent();
                }
            }
            if (document.getElementById("DeveloperToolsPolyfillWindow").style.height === '99%') {
                var lastSize = DTPW_nav_title.data('lastSize');
                DTPW.animate({
                    height: lastSize.height,
                    width: lastSize.width,
                    top: lastSize.top,
                    left: lastSize.left
                }, AnimateStepCallback); // 过渡动画的时间为0.1秒 (100毫秒)
            } else {
                DTPW_nav_title.data("lastSize", {
                    'height': DTPW.css('height'),
                    "width": DTPW.css('width'),
                    "top": DTPW.css('top'),
                    "left": DTPW.css('left')
                });
                DTPW.animate({
                    height: "99%",
                    width: "99%",
                    top: '0',
                    left: '0'
                }, AnimateStepCallback); // 过渡动画的时间为1秒 (100毫秒)
            }
        })
        DTPW = $(DTPW);
        DTPW.css({
            height: '300px',
            width: '500px'
        });
        var DTPW_NICT = $('#DeveloperToolsPolyfillWindowNavItemsConsoleTextarea');
        $('#DeveloperToolsPolyfillWindow > div.ui-resizable-handle.ui-resizable-se').trigger('click');
        $('#DeveloperToolsPolyfillWindowNavItemsConsoleRunIcon').on('click', function () {
            var inputCode = DTPW_NICT.val();
            DTPW_NICT.val('');
            try {
                var result = eval(inputCode);
                console.log({"output": "Result", "content": result});
            } catch (error) {
                console.log({"output": "error", "content": error});
            }
        });
        $('#DeveloperToolsPolyfillWindowNavItemsConsoleClearInputIcon').on('click', function () {
            DTPW_NICT.val('')
        });
        $('#DeveloperToolsPolyfillWindowNavItemsConsoleSwitchMultipleLinesIcon').on('click', function () {
            var DTPW_NICT = $('#DeveloperToolsPolyfillWindowNavItemsConsoleTextarea');
            var DTPW_NICIC = $('#DeveloperToolsPolyfillWindowNavItemsConsoleInputContainer');
            if (DTPW_NICT.css('height') === '30px') {
                DTPW_NICIC.css('height', '60px');
            } else {
                DTPW_NICIC.css('height', '30px');
            }
            DTPW_NICIC.css('top', '')
            DTPW_NICIC_ResizeScript()
        })
    },
    _hideDeveloperToolsWindow: function () {
        $("#DeveloperToolsPolyfillWindow").remove();
    },
    _funClassDependent: function () {
        if (typeof jQuery === "undefined") {// 创建<script>元素
            var scriptElement = document.createElement("script");

            // 设置<script>元素的属性
            scriptElement.src = "//code.jquery.com/jquery-1.12.4.min.js";
            scriptElement.integrity = "sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=";
            scriptElement.crossOrigin = "anonymous";

            // 将<script>元素添加到<head>标签中
            document.getElementsByTagName("head")[0].appendChild(scriptElement);
        }
        if (typeof jQuery !== "undefined") {
            var cssElement = ".border-1px {\n" +
                "    border-top-width: 1px;\n" +
                "    border-right-width: 1px;\n" +
                "    border-bottom-width: 1px;\n" +
                "    border-left-width: 1px;\n" +
                "    border-top-style: solid;\n" +
                "    border-right-style: solid;\n" +
                "    border-bottom-style: solid;\n" +
                "    border-left-style: solid;\n" +
                "    border-image-source: initial;\n" +
                "    border-image-slice: initial;\n" +
                "    border-image-width: initial;\n" +
                "    border-image-outset: initial;\n" +
                "    border-image-repeat: initial;\n" +
                "}\n" +
                "\n" +
                ".disable-selection {\n" +
                "    -webkit-user-select: none; /* Safari */\n" +
                "    -khtml-user-select: none; /* Konqueror HTML */\n" +
                "    -moz-user-select: none; /* Firefox */\n" +
                "    -o-user-select: none; /* Opera */\n" +
                "    user-select: none; /* Generic */\n" +
                "\n" +
                "    -webkit-user-drag: none; /* Safari */\n" +
                "    -khtml-user-drag: none; /* Konqueror HTML */\n" +
                "    -moz-user-drag: none; /* Firefox */\n" +
                "    -o-user-drag: none; /* Opera */\n" +
                "    user-drag: none; /* Generic */\n" +
                "\n" +
                "}" +
                "\n" +
                ".empty-style-input-box{\n" +
                "    padding: 0;\n" +
                "    border: 0;\n" +
                "    outline: none;\n" +
                "    background: none;" +
                "}" +
                ".empty-style-input-box::-ms-clear {\n" +
                "    display: none;\n" +
                "}\n" +
                "\n" +
                ".empty-style-input-box::-webkit-search-cancel-button {\n" +
                "    display: none;\n" +
                "}";
            var DTPW_Style = $("#DeveloperToolsPolyfillWindowStyle");
            if ((DTPW_Style.length > 0)) {
                DTPW_Style.remove();
            }
            $('head').append($("<style id='DeveloperToolsPolyfillWindowStyle'>" + cssElement + "</style>"));

        }
    },
    console: {
        _processingParameters: function (argumentsVariable, type) {
            var args = [];
            for (var i = 0; i < argumentsVariable.length; i++) {
                var arg = argumentsVariable[i];
                args.push(arg);
            }

            var CurTime;
            if (Date.now) {
                CurTime = Date.now();
            } else {
                // 对于不支持 Date.now() 的浏览器，使用 new Date().getTime() 获取当前时间的毫秒数
                CurTime = new Date().getTime();
            }
            if (type) {
                // args.unshift('[Messages]');
                // console.log(args);
                // Function.prototype.apply.call(console.log, console, args);
                DeveloperToolsPolyfill._consoleLog.push({"type": type, 'content': args, 'time': CurTime});
                return args;
            } else {
                return args;
            }
        },
        logs: function (type) {

        },
        log: function () {
            return DeveloperToolsPolyfill.console._processingParameters(arguments, 'log');
        },
        info: function () {
            return DeveloperToolsPolyfill.console._processingParameters(arguments, 'info');
        },
        warn: function () {
            return DeveloperToolsPolyfill.console._processingParameters(arguments, 'warn');
        },
        error: function () {
            return DeveloperToolsPolyfill.console._processingParameters(arguments, 'error');
        }
    }
}
window.console = DeveloperToolsPolyfill.console;//兼容IE,当IE不支持console.log时，自定义一个包含log方法的对象给他
DeveloperToolsPolyfill._funClassDependent();

if (document.addEventListener) {
    // 标准浏览器支持 addEventListener 方法
    document.addEventListener("keydown", function () {
        return !DeveloperToolsPolyfill._checkKeyPress();
    }, false);
} else if (document.attachEvent) {
    // IE 5 及以下版本使用 attachEvent 方法
    document.attachEvent("onkeydown", function () {
        return !DeveloperToolsPolyfill._checkKeyPress();
    });
}

setTimeout(function () {
// 绑定按键事件
    $(document).keydown(function (event) {
        DeveloperToolsPolyfill._funClassDependent();
        var WhetherToPress = DeveloperToolsPolyfill._checkKeyPress(event);
        if (WhetherToPress) {
            // console.log("被按下");
            if ($("#DeveloperToolsPolyfillWindow").length > 0) {
                // console.log("DeveloperToolsPolyfillWindow元素存在");
                DeveloperToolsPolyfill._hideDeveloperToolsWindow();
            } else {
                // console.log("DeveloperToolsPolyfillWindow元素不存在");
                DeveloperToolsPolyfill._showDeveloperToolsWindow();
            }
        }
        return !WhetherToPress;//按下就阻止这个事件的发生
    });

}, 1000)