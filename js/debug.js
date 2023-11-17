var DeveloperToolsPolyfill = {
    _consoleLog: [],
    _repairEventError: function (event) {
        var newEvent = {};
        for (var prop in event) {
            if (event.hasOwnProperty(prop)) {
                newEvent[prop] = event[prop];
            }
        }
        return newEvent;
    },
    _checkKeyPress: function (event) {
        // 检测按键事件
        // 检测按下的键码
        event = this._repairEventError(event);//以上操作防止var keyCode = event.keyCode || event.which;报莫名错误
        var keyCode = event.keyCode || event.which;

        // 判断是否按下了 F12 键或其他按键组合（例如Ctrl+Shift+I、Ctrl+Shift+J等），按下返回false，不按下返回true
        return (keyCode === 123 || (event.ctrlKey && event.shiftKey && (keyCode === 73 || keyCode === 74)));
    },
    _checkCustomKeyPress: function (event) {
        // 检测按键事件
        // 检测按下的键码
        event = this._repairEventError(event);
        var keyCode = event.keyCode || event.which;

        // 判断是否按下了 Ctrl+Shift+I+J，按下返回true，否则返回false
        return (event.ctrlKey && event.shiftKey && keyCode === 72);
    },
    _showDeveloperToolsWindow: function () {
        var DTPW_changeTagName = function (element, newTagName) {
            if (element instanceof jQuery) {
                // element is a jQuery object
                // element = element.get(0);
            } else {
                // element is a native DOM element
            }
            element = $(element);

            var textbox = $(document.createElement(newTagName)).attr({
                id: element.attr('id'),
                name: element.attr('name'),
                style: element.attr("style"),
                "class": element.attr("class")
            }).val(element.val());
            element.replaceWith(textbox);

        };
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
            top: "0px",
            left: "0px"
        });
        DTPW_nav.css("backgroundColor", "1E1E1E");
        DTPW_nav.append(DTPW_nav_title);
        DTPW_nav_items.append(DTPW_nav_items_list);
        var DTPW_nav_items_name_list = [
            {name: 'DOM资源管理器', pageElement: "None"},
            {
                name: '控制台',
                pageElement: "<div id='DeveloperToolsPolyfillWindowNavItemsConsole' style='height: 100%;background: white;position: relative;bottom: 0'><div id='DeveloperToolsPolyfillWindowNavItemsConsoleMessages' style='width: 100%;overflow: auto'></div><div id='DeveloperToolsPolyfillWindowNavItemsConsoleInputContainer' style='background-color: #efeff2;border-top: 4px solid #cccedb;position: absolute;bottom: 0;height: 30px;width: 100%'><span class='DeveloperToolsPolyfillWindowNavItemsConsoleFunIcon' id='DeveloperToolsPolyfillWindowNavItemsConsoleInputIcon' style='left: 0;bottom: 0'><img class='DeveloperToolsPolyfillWindowNavItemsConsoleFunIcon' src='/img/arrow-right-555555.png' alt='行数' /></span><input id='DeveloperToolsPolyfillWindowNavItemsConsoleTextarea' class='empty-style-input-box' style='resize: none;height: 100%;display: inline-block;position: absolute;left: 30px;line-height: 15px;font-size: 15px;bottom: 0;'><span class='DeveloperToolsPolyfillWindowNavItemsConsoleFunIcon' id='DeveloperToolsPolyfillWindowNavItemsConsoleClearInputIcon' style='right: 60px' title='清除输入(Esc)'><img class='DeveloperToolsPolyfillWindowNavItemsConsoleFunIcon' src='/img/cross-mark-555555.png' alt='清除输入(Esc)' /></span><span class='DeveloperToolsPolyfillWindowNavItemsConsoleFunIcon' id='DeveloperToolsPolyfillWindowNavItemsConsoleRunIcon' style='right: 30px' title='运行脚本(Enter)'><img class='DeveloperToolsPolyfillWindowNavItemsConsoleFunIcon' src='/img/triangle-13A04B.png' alt='运行脚本(Enter)' /></span><span class='DeveloperToolsPolyfillWindowNavItemsConsoleFunIcon' id='DeveloperToolsPolyfillWindowNavItemsConsoleSwitchMultipleLinesIcon' style='right: 0' title='切换到多行模式(Ctrl + Shift + M)'><img class='DeveloperToolsPolyfillWindowNavItemsConsoleFunIcon' src='/img/arrow-up-double-line-555555.png' alt='切换到多行模式(Ctrl + Shift + M)' /></span></div></div>"
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
            DTPW_nav_items.append("<div style='background: white' id='" + idName + "' class='DeveloperToolsPolyfillWindowNavItems'>" + DTPW_nav_items_name_list[i]['pageElement'] + "</div>");
        }
        DTPW_nav.append(DTPW_nav_items);


        // 设置元素的绝对定位样式
        DTPW.css({
            position: "fixed",
            left: "0px",
            top: "0px",
            width: ScreenWidth80Percent + 'px',
            height: ScreenHeight80Percent + 'px',
            fontSize: '15px',
            fontFamily: "'Microsoft YaHei',Arial,Helvetica,sans-serif !important"
        });
        DTPW_windowControl.css({
            position: "absolute",
            top: "0px",
            right: "0px",
            width: '75px',
            height: '20px',
            background: 'none'
        });
        var DTPW_windowControl_BtnStyle = 'width: 20px;height: 20px;display: inline-block;padding-left: 5px;padding-right: 5px;cursor: pointer;position: absolute;border: none;margin: none;';
        var DTPW_windowControl_BtnImageStyle = 'width: 20px;height: 20px;';
        var DTPW_windowControl_sizeBtn = $("<div title='最大化' style='" + DTPW_windowControl_BtnStyle + "right: 30px;'><img style='" + DTPW_windowControl_BtnImageStyle + "' src='/img/windowControl/window-maximize.png'  alt='最大化'></div>");
        var DTPW_windowControl_minimizeBtn = $("<div title='最小化' style='" + DTPW_windowControl_BtnStyle + "right: 60px;'><img style='" + DTPW_windowControl_BtnImageStyle + "' src='/img/windowControl/window-minimize.png'  alt='最小化'></div>");
        var DTPW_windowControl_closeBtn = $("<div title='关闭' style='" + DTPW_windowControl_BtnStyle + "right: 0;'><img style='" + DTPW_windowControl_BtnImageStyle + "' src='/img/windowControl/close-line.png' alt='关闭'></div>");

        $(DTPW_windowControl_sizeBtn).add(DTPW_windowControl_minimizeBtn).add(DTPW_windowControl_closeBtn).hover(
            function () {
                $(this).css('backgroundColor', '#464646');
            },
            function () {
                $(this).css('backgroundColor', '');
            }
        );
        DTPW_windowControl.append(DTPW_windowControl_minimizeBtn, DTPW_windowControl_sizeBtn, DTPW_windowControl_closeBtn);
        DTPW.addClass("border-1px");
        DTPW.append(DTPW_nav);
        DTPW.append(DTPW_windowControl);
        $("body").append(DTPW);
        // console.log(DTPW)
        // $2(function () {
        //     $2("#DeveloperToolsPolyfillWindow").draggable({containment: "body", scroll: false});
        // });
        $(".DeveloperToolsPolyfillWindowNavItems").css({textAlign: "left"});
        DTPW_windowControl_sizeBtn.on('click', function () {
            DTPW_nav_title.dblclick();
        });
        DTPW_windowControl_closeBtn.on('click', function () {
            DeveloperToolsPolyfill._hideDeveloperToolsWindow();
        });
        DTPW_windowControl_minimizeBtn.on('click', function () {
            $('#DeveloperToolsPolyfillWindow').hide();
            var element = $("<div id='DeveloperToolsPolyfillWindowMinimize' style='position: fixed;_position: absolute;top: 10px;right: 10px;background: black;color: white;cursor: pointer;font-size: 10px;height: 10px;width: 40px;'>双击打开</div>");
            $2(element).disableSelection();
            $2(element).draggable({
                containment: "document"
            });
            $('body').append(element);
            $2(element).css({
                width: '60px',
                height: '15px',
                fontSize: '15px'
            });
            element.on('dblclick', function () {
                $('#DeveloperToolsPolyfillWindow').show();
                element.remove();
            });
        });
        $2('#DeveloperToolsPolyfillWindowNavTitle').disableSelection();

        var DTPW_NIC_messagesContainer = $('#DeveloperToolsPolyfillWindowNavItemsConsoleMessages');
        var DTPW_NICT = $('#DeveloperToolsPolyfillWindowNavItemsConsoleTextarea');
        var DTPW_NICIC = $('#DeveloperToolsPolyfillWindowNavItemsConsoleInputContainer');
        var DTPW_NIC_SMLI = $('#DeveloperToolsPolyfillWindowNavItemsConsoleSwitchMultipleLinesIcon');
        var DTPW_NIC_runBtn = $('#DeveloperToolsPolyfillWindowNavItemsConsoleRunIcon');
        var DTPW_NIC_clearBtn = $('#DeveloperToolsPolyfillWindowNavItemsConsoleClearInputIcon');

        $(function () {
            var msgList = DeveloperToolsPolyfill._consoleLog;
            DTPW_NIC_messagesContainer.html('');
            for (var i = 0; i < msgList.length; i++) {
                var msgContainer = $("<div></div>");
                if (msgList[i].type === 'warn') {
                    msgContainer.css('background', "gold");
                } else if (msgList[i].type === 'error') {
                    msgContainer.css('background', "#f6cbcb");
                } else {
                    msgContainer.css('background', "#d9d9d9");
                }
                msgContainer.css({
                    border: '1px solid black'
                });
                msgContainer.html(DeveloperToolsPolyfill._LogContentProcessing(msgList[i].content));
                DTPW_NIC_messagesContainer.append(msgContainer);
            }
        });
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
                element = document.getElementById('DeveloperToolsPolyfillWindowNavItems-2');
                // 计算可用的垂直空间
                availableHeight = container.clientHeight - 50;
                if (availableHeight < 0) {
                    availableHeight = 0;
                }
                // 设置元素的高度
                // element.style.height = availableHeight + 'px';
                $('.DeveloperToolsPolyfillWindowNavItems').css('height', availableHeight + 'px');

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
                availableHeight = container.offsetHeight - element1.offsetHeight;
                if (availableHeight < 0) {
                    availableHeight = 0;
                }
                element.style.height = availableHeight + 'px';

                if (DeveloperToolsPolyfill._DeveloperToolsPolyfillWindowIsFullScreen()) {
                    DTPW_windowControl_sizeBtn.children('img').attr('alt', '向下还原');
                    DTPW_windowControl_sizeBtn.children('img').attr('src', '/img/windowControl/select-window-sharp.png');
                } else {
                    DTPW_windowControl_sizeBtn.children('img').attr('alt', '最大化');
                    DTPW_windowControl_sizeBtn.children('img').attr('src', '/img/windowControl/window-maximize.png');
                }


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
                    DTPW_NICIC.resize();
                },
                stop: function (event, ui) {
                    ui.element.css({
                        width: "100%",
                        top: ''
                    });
                    DTPW_NICIC.resize();
                },
                resize: function (event, ui) {
                    // 在这里编写改变过程中要执行的代码
                    ui.element.css({
                        width: "100%",
                        top: ''
                    });
                    DTPW_NICIC.resize();
                }
            });

        });
        var DTPW_NICIC_ResizeScript = function () {
            var element = DTPW_NICT;//$('#DeveloperToolsPolyfillWindowNavItemsConsoleTextarea')
            var elementContainer = DTPW_NICIC;
            var showBtn = DTPW_NIC_SMLI;//$('#DeveloperToolsPolyfillWindowNavItemsConsoleSwitchMultipleLinesIcon')
            var runBtn = DTPW_NIC_runBtn;
            var inputIcon = $('#DeveloperToolsPolyfillWindowNavItemsConsoleInputIcon');
            var whetherToChange = false;

            var LineText1 = '切换到多行模式(Ctrl + Shift + M)';
            var LineText2 = '切换到单行模式(Ctrl + Shift + M)';
            var RunText1 = '运行脚本(Enter)';
            var RunText2 = '运行脚本(Ctrl + Enter)';

            if (DeveloperToolsPolyfill._DTPW_NICIC_Is_Single_Line(elementContainer)) {
                if (!element.is('input')) {
                    DTPW_changeTagName(element, 'input');
                    showBtn.removeClass('transform-rotate-180');
                    showBtn.addClass('transform-rotate-0');

                    showBtn.attr('title', LineText1);
                    showBtn.children('img').attr('alt', LineText1)
                    runBtn.attr('title', RunText1);
                    runBtn.children('img').attr('alt', RunText1);

                    inputIcon.css('top', '');
                    inputIcon.css('bottom', '0px');
                    whetherToChange = true;
                }

            } else {
                if (!element.is('textarea')) {
                    DTPW_changeTagName(element, 'textarea');
                    showBtn.removeClass('transform-rotate-0');
                    showBtn.addClass('transform-rotate-180');

                    showBtn.attr('title', LineText2);
                    showBtn.children('img').attr('alt', LineText2);
                    runBtn.attr('title', RunText2);
                    runBtn.children('img').attr('alt', RunText2);

                    inputIcon.css('bottom', '');
                    inputIcon.css('top', '0px');
                    whetherToChange = true;
                }
            }
            if (whetherToChange) {
                DTPW_NICT = $($2('#DeveloperToolsPolyfillWindowNavItemsConsoleTextarea'));//防止后期按下清除和执行按钮获取不到元素，$($2())是为了防止编辑器报警告重复jquery选择器
            }
        };
        $(document).on('focus', '#DeveloperToolsPolyfillWindowNavItemsConsoleTextarea', function () {
            $(this).on('keydown', function (event) {
                var newEvent = DeveloperToolsPolyfill._repairEventError(event);
                // 获取按下的按键码
                var keyCode = newEvent.keyCode || newEvent.which;

                // 获取按键组合情况（是否按下了Ctrl和Shift键）
                var ctrlKey = newEvent.ctrlKey || false;
                var shiftKey = newEvent.shiftKey || false;

                // 执行相应的操作
                if (keyCode === 27) {
                    // 按下ESC键
                    DTPW_NIC_clearBtn.click()
                } else if (keyCode === 13 && ctrlKey) {
                    // 按下Enter键并同时按下Ctrl键
                    // 执行相应的操作
                    if (!DeveloperToolsPolyfill._DTPW_NICIC_Is_Single_Line()) {
                        DTPW_NIC_runBtn.click();
                    } else {
                        return true;
                    }
                } else if (keyCode === 13) {
                    // 按下Enter键
                    // 执行相应的操作
                    if (DeveloperToolsPolyfill._DTPW_NICIC_Is_Single_Line()) {
                        DTPW_NIC_runBtn.click();
                    } else {
                        return true;
                    }
                } else if (keyCode === 77 && ctrlKey && shiftKey) {
                    // 按下M键并同时按下Ctrl和Shift键
                    // 执行相应的操作
                    DTPW_NIC_SMLI.click();
                } else {
                    return true;
                }
                DTPW_NICT.focus();
                return false;
            });
        });
        DTPW_NICIC.resize(DTPW_NICIC_ResizeScript);
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
            if (DeveloperToolsPolyfill._DeveloperToolsPolyfillWindowIsFullScreen()) {
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
                    height: "100%",
                    width: "100%",
                    top: '0',
                    left: '0'
                }, AnimateStepCallback); // 过渡动画的时间为0.1秒 (100毫秒)
            }
        })
        DTPW = $(DTPW);
        DTPW.css({
            height: '300px',
            width: '500px'
        });
        $('#DeveloperToolsPolyfillWindow > div.ui-resizable-handle.ui-resizable-se').trigger('click');
        DTPW_NIC_runBtn.on('click', function () {
            var inputCode = DTPW_NICT.val();
            DTPW_NICT.val('');
            try {
                var result = eval(inputCode);
                // console.log({"output": "Result", "content": result});
            } catch (error) {
                // console.log({"output": "error", "content": error});
            }
        });
        DTPW_NIC_clearBtn.on('click', function () {
            DTPW_NICT.val('')
        });
        DTPW_NIC_SMLI.on('click', function () {//$('#DeveloperToolsPolyfillWindowNavItemsConsoleSwitchMultipleLinesIcon')
            // var DTPW_NICT = DTPW_NICT;
            // var DTPW_NICIC = DTPW_NICIC;
            if (DeveloperToolsPolyfill._DTPW_NICIC_Is_Single_Line(DTPW_NICIC)) {
                DTPW_NICIC.css('height', '60px');
            } else {
                DTPW_NICIC.css('height', '30px');
            }
            DTPW_NICIC_ResizeScript();
        });
    },
    _hideDeveloperToolsWindow: function () {
        var DTPW_Minimize = $('#DeveloperToolsPolyfillWindowMinimize');
        if (DTPW_Minimize.length > 0) {
            DTPW_Minimize.remove();
        }
        $("#DeveloperToolsPolyfillWindow").remove();
    },
    _DTPW_NICIC_Is_Single_Line: function (DTPW_NICIC) {//可传入元素，防止重复jQuery选择器
        if (!DTPW_NICIC) {
            DTPW_NICIC = $('#DeveloperToolsPolyfillWindowNavItemsConsoleInputContainer');
        }
        return (DTPW_NICIC[0].style.height === '30px');//true是单行模式，false是多行模式
    },
    _DeveloperToolsPolyfillWindowIsFullScreen: function () {
        var DTPW = document.getElementById("DeveloperToolsPolyfillWindow");
        return (DTPW.style.width === '100%') && (DTPW.style.height === '100%') && (DTPW.style.top === '0px') && (DTPW.style.left === '0px')
    },
    _moreEqualTo: function (str) {
        for (var i = 1; i < arguments.length; i++) {
            if (arguments[i] !== str) {
                return false;
            }
        }
        return true;
    },
    _moreOrTo: function (str) {
        var judge = false;
        for (var i = 1; i < arguments.length; i++) {
            if (arguments[i] === str) {
                judge = true;
            }
        }
        return judge;
    },
    _LogContentProcessing: function (msgList) {
        var elementList = $('');
        var Msg;
        if (typeof msgList === 'object' && msgList instanceof Array) {
            Msg = msgList;
        } else {
            Msg = [msgList];
        }
        var MsgElement = $('<div></div>');
        for (var o = 0; Msg.length > o; o++) {
            var individualContentElement;
            if (typeof Msg[o] === "string") {
                individualContentElement = $('<span style="color: black"></span>').text(Msg[o]);
            } else if (typeof Msg[o] === "number") {
                individualContentElement = $('<span style="color: #0078D7"></span>').text(Msg[o]);
            } else if (DeveloperToolsPolyfill._moreOrTo(Msg[o], undefined, null)) {
                individualContentElement = $('<span style="color: #999999"></span>').text(String(Msg[o]));
            } else if (DeveloperToolsPolyfill._moreOrTo(Msg[o], false, true)) {
                individualContentElement = $('<span style="color: #ce8d6d"></span>').text(Msg[o]);
            } else if (typeof Msg[o] === 'function') {
                var functionText = String(Msg[o]);
                var codeElement = $('<div style="background: black"><pre style="display: block;font-size: 20px;background: black"><code></code></pre></div>');
                codeElement.find('code').text(functionText);
                individualContentElement = $('<span style="color: white;font-weight: bold;"></span>').html(codeElement);
            } else if (typeof Msg[o] === 'object' && Msg[o] instanceof Array) {
                var arrayContainer = $('<div><span style="color: black;">[</span></div>');
                for (var j = 0; Msg[o].length > j; j++) {
                    var valueContainer = $('<div style="margin-left: 30px"></div>');
                    valueContainer.append("<span style='color: #b140ff;font-weight: bold' class='DeveloperToolsPolyfillConsoleContentKey'>" + j + "</span>");
                    valueContainer.append("<span style='color: #000000'>：</span>");
                    var quotationMarks;
                    if (typeof Msg[o][j] === "string") {
                        quotationMarks = "<span style='color: #b140ff;background: #ebebeb;'>&quot;</span>";
                    } else {
                        quotationMarks = '';
                    }
                    valueContainer.append("<span>" + quotationMarks + DeveloperToolsPolyfill._LogContentProcessing([Msg[o][j]]).html() + quotationMarks + "</span>");
                    arrayContainer.append(valueContainer);
                }
                arrayContainer.append('<span style="color: black;">]</span>');
                individualContentElement = $('<span style="color: #000000"></span>').append(arrayContainer);
            } else if (typeof Msg[o] === 'object') {
                var objectContainer = $('<div><span style="color: black;">{</span></div>');
                for (var key in Msg[o]) {
                    var objectValueContainer = $('<div style="margin-left: 30px"></div>');
                    objectValueContainer.append("<span style='color: #b140ff;font-weight: bold;' class='DeveloperToolsPolyfillConsoleContentKey'>" + key + "</span>");
                    objectValueContainer.append("<span style='color: #000000'>：</span>");
                    var objectQuotationMarks;
                    if (typeof Msg[o][key] === "string") {
                        objectQuotationMarks = "<span style='color: #b140ff;background: #ebebeb;'>&quot;</span>";
                    } else {
                        objectQuotationMarks = '';
                    }
                    objectValueContainer.append("<span>" + objectQuotationMarks + DeveloperToolsPolyfill._LogContentProcessing([Msg[o][key]]).html() + objectQuotationMarks + "</span>");
                    objectContainer.append(objectValueContainer);
                }
                objectContainer.append('<span style="color: black;">}</span>');
                individualContentElement = $('<span style="color: #000000"></span>').append(objectContainer);
            }

            MsgElement.append(individualContentElement);
            if (o !== Msg.length - 1) {
                // 当前不是最后一次迭代
                MsgElement.append('<span style="display: inline-block;width: 5px"></span>');
            }
        }
        elementList = elementList.add(MsgElement);

        return elementList
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
if (!window.console) {
    window.Console = window.console = DeveloperToolsPolyfill.console;//兼容IE,当IE不支持console.log时，自定义一个包含log方法的对象给他

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
    // 绑定按键事件
    $(document).keydown(function (event) {
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
}
// 绑定按键事件
$(document).keydown(function (event) {
    var WhetherToPress = DeveloperToolsPolyfill._checkCustomKeyPress(event);
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
$('head').append("    <style>\n" +
    "        #DeveloperToolsPolyfillWindow .ui-state-default, #DeveloperToolsPolyfillWindow .ui-widget-content .ui-state-default, #DeveloperToolsPolyfillWindow .ui-widget-header .ui-state-default {\n" +
    "            border: none;\n" +
    "            background: #1e1e1e;\n" +
    "            font-weight: normal;\n" +
    "            cursor: pointer;\n" +
    "        }\n" +
    "\n" +
    "        #DeveloperToolsPolyfillWindow .ui-state-default a, #DeveloperToolsPolyfillWindow .ui-widget-content .ui-state-default a, #DeveloperToolsPolyfillWindow .ui-widget-header .ui-state-default a {\n" +
    "            color: white;\n" +
    "        }\n" +
    "\n" +
    "        #DeveloperToolsPolyfillWindow .ui-state-active, #DeveloperToolsPolyfillWindow .ui-widget-content .ui-state-active, #DeveloperToolsPolyfillWindow .ui-widget-header .ui-state-active {\n" +
    "            border: none;\n" +
    "            background: #ffffff;\n" +
    "            font-weight: normal;\n" +
    "            cursor: pointer;\n" +
    "        }\n" +
    "\n" +
    "        #DeveloperToolsPolyfillWindow .ui-state-active a, #DeveloperToolsPolyfillWindow .ui-widget-content .ui-state-active a, #DeveloperToolsPolyfillWindow .ui-widget-header .ui-state-active a {\n" +
    "            color: black;\n" +
    "            cursor: pointer;\n" +
    "        }\n" +
    "\n" +
    "        #DeveloperToolsPolyfillWindow .ui-state-hover, #DeveloperToolsPolyfillWindow .ui-widget-content .ui-state-hover, #DeveloperToolsPolyfillWindow .ui-widget-header .ui-state-hover {\n" +
    "            border: none;\n" +
    "            background: #464646;\n" +
    "            font-weight: normal;\n" +
    "        }\n" +
    "\n" +
    "        #DeveloperToolsPolyfillWindow .ui-state-hover A:hover {\n" +
    "            color: white;\n" +
    "            text-decoration: none;\n" +
    "        }\n" +
    "\n" +
    "        #DeveloperToolsPolyfillWindow .ui-state-hover.ui-state-active A:hover {\n" +
    "            color: black;\n" +
    "            text-decoration: none;\n" +
    "        }\n" +
    "\n" +
    "        #DeveloperToolsPolyfillWindow .ui-tabs .ui-tabs-nav LI.ui-tabs-active A {\n" +
    "            cursor: pointer;\n" +
    "        }\n" +
    "\n" +
    "\n" +
    "        #DeveloperToolsPolyfillWindow .ui-state-hover.ui-state-active, #DeveloperToolsPolyfillWindow .ui-widget-content .ui-state-hover.ui-state-active, #DeveloperToolsPolyfillWindow .ui-widget-header .ui-state-hover.ui-state-active {\n" +
    "            background: #ffffff;\n" +
    "            cursor: pointer;\n" +
    "        }\n" +
    "\n" +
    "        #DeveloperToolsPolyfillWindow .ui-widget-content {\n" +
    "            padding: 0;\n" +
    "        }\n" +
    "\n" +
    "        #DeveloperToolsPolyfillWindow .ui-resizable-e {\n" +
    "            right: 0;\n" +
    "        }\n" +
    "\n" +
    "        #DeveloperToolsPolyfillWindow .ui-resizable-s {\n" +
    "            bottom: 0;\n" +
    "        }\n" +
    "\n" +
    "        #DeveloperToolsPolyfillWindow .ui-resizable-sw, #DeveloperToolsPolyfillWindow .ui-resizable-nw, #DeveloperToolsPolyfillWindow .ui-resizable-ne {\n" +
    "            top: 0;\n" +
    "            left: 0;\n" +
    "            bottom: 0;\n" +
    "            right: 0;\n" +
    "        }\n" +
    "\n" +
    "        #DeveloperToolsPolyfillWindow {\n" +
    "            -webkit-font-smoothing: unset !important;\n" +
    "            font-family: 'Microsoft YaHei',Arial,Helvetica,sans-serif !important;\n" +
    "            z-index: 9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999;\n" +
    "        }\n" +
    "\n        #DeveloperToolsPolyfillWindow * {\n" +
    "            font-family: 'Microsoft YaHei',Arial,Helvetica,sans-serif !important;\n" +
    "        }" +
    "        #DeveloperToolsPolyfillWindow #DeveloperToolsPolyfillWindowNavItemsConsoleInputContainer span.DeveloperToolsPolyfillWindowNavItemsConsoleFunIcon {\n" +
    "            width: 30px;\n" +
    "            height: 30px;\n" +
    "            bottom: 0;\n" +
    "            position: absolute;\n" +
    "            overflow: hidden;\n" +
    "            /*background-size: 20px;*/\n" +
    "            /*background-position: center;*/\n" +
    "            /*background-repeat: no-repeat;*/\n" +
    "        }\n" +
    "\n" +
    "        #DeveloperToolsPolyfillWindow #DeveloperToolsPolyfillWindowNavItemsConsoleInputContainer img.DeveloperToolsPolyfillWindowNavItemsConsoleFunIcon {\n" +
    "            width: 20px;\n" +
    "            height: 20px;\n" +
    "            bottom: 0;\n" +
    "            position: absolute;\n" +
    "            margin: 5px;\n" +
    "        }\n" +
    "\n" +
    "        #DeveloperToolsPolyfillWindow {\n" +
    "            _position: absolute !important;\n" +
    "        }\n" +
    "        #DeveloperToolsPolyfillWindow #DeveloperToolsPolyfillWindowNavItemsConsoleInputContainer .ui-resizable-n{\n" +
    "            top: -10px;\n" +
    "        }\n" +
    "    </style>")
/*
setTimeout(function () {
    content = function () {
        return ['ds', 1, 3.1415926, undefined, null, false, true, '2', function () {
            return ok;
        }, 'ok', [], {}];
    }
    DeveloperToolsPolyfill.console.log(content());
    DeveloperToolsPolyfill.console.warn(content());
    DeveloperToolsPolyfill.console.error(content());
}, 1010)

 */