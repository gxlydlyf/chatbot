window.PromptPopUpWindow = {
    closeImage5E5E5E: "data:image/png;base64,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",
    closeImage393939: "data:image/png;base64,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",
    isObject: function (variable) {//判断是否为对象
        // return variable !== null && variable !== undefined && typeof variable === 'object' && Object.prototype.toString.call(variable) !== '[object Array]';
        return Object.prototype.toString.call(variable) === '[object Object]';
    },
    isArray: jQuery.isArray,//判断是否为数组
    isElement: function (element) {
        if (typeof element === 'object') {
            if (element instanceof jQuery) {
                // 是 jQuery 元素
                return true;
            } else if (element.nodeType === 1) {
                // 是 DOM 元素
                return true;
            }
        }
        return false;
    },
    getConfigValueOfHtml: function (config, defaultConfig, key) {
        if ((key in config) && ((typeof config[key] === 'string') || this.isElement(config[key]))) {
            return config[key];
        } else {
            return defaultConfig[key];
        }
    },
    getConfigValueOfStyle: function (config, defaultConfig, key) {
        if ((key in config.style) && this.isObject(config.style[key])) {
            return this.mergeObjects(defaultConfig.style[key], config.style[key]);
        } else {
            return defaultConfig.style[key];
        }
    },
    getConfigValueOfFalse: function (config, defaultConfig, key) {
        if ((key in config) && (typeof config[key] === 'boolean')) {
            if (config[key] === false) {
                return '';
            }
        }
        return defaultConfig[key];

    },
    mergeObjects: function (object1, object2) {//合并两个对象
        // 检测浏览器是否支持Object.assign方法
        if (typeof Object.assign === 'function') {
            return Object.assign({}, object1, object2);
        } else {
            // 创建一个新对象作为合并结果
            var mergedObj = {};
            var prop;

            // 复制obj1的属性到mergedObj
            for (prop in object1) {
                if (object1.hasOwnProperty(prop)) {
                    mergedObj[prop] = object1[prop];
                }
            }

            // 复制obj2的属性到mergedObj
            for (prop in object2) {
                if (object2.hasOwnProperty(prop)) {
                    mergedObj[prop] = object2[prop];
                }
            }

            return mergedObj;
        }
    },
    mergeConfigs: function (config1, config2) {//合并两个 配置
        var mergeObjects = this.mergeObjects;
        var ifInConfig = function (key) {
            if (key in config2) {
                config1[key] = config2[key];
            }
        };
        var ifInConfigStyle = function (key) {
            if (key in config2.style) {
                config1.style[key] = mergeObjects(config1.style[key], config2.style[key]);
            }
        };
        ifInConfig('title');
        ifInConfig('content');
        ifInConfig('callback');
        ifInConfig('window');
        ifInConfig('mask');
        if ('style' in config2) {
            ifInConfigStyle("window");
            ifInConfigStyle("promptContent");
            ifInConfigStyle("promptContainer");
            ifInConfigStyle("promptTitle");
            ifInConfigStyle("mask");
        }
        return config1;
    },
    verifyUserConfiguration: function (userConfig, defaultConfig) {
        var This = this;
        var isObject = this.isObject;
        var isElement = this.isElement;
        var getValHtml = function (key) {
            return This.getConfigValueOfHtml(userConfig, defaultConfig, key);
        }
        var getValStyle = function (key) {
            return This.getConfigValueOfStyle(userConfig, defaultConfig, key);
        }
        var getValFalse = function (key) {
            return This.getConfigValueOfFalse(userConfig, defaultConfig, key);
        }
        defaultConfig.title = getValHtml('title');
        defaultConfig.content = getValHtml('content');
        defaultConfig.window = getValHtml('window');
        if (('callback' in userConfig) && (typeof userConfig.callback === 'function')) {
            defaultConfig.callback = userConfig.callback;
        }
        if (('mask' in userConfig) && (typeof userConfig.mask === 'boolean') && (userConfig.mask === false)) {
            defaultConfig.mask = userConfig.mask;
        }
        if ('style' in userConfig) {
            defaultConfig.style.window = getValStyle('window');
            defaultConfig.style.promptContent = getValStyle('promptContent');
            defaultConfig.style.promptContainer = getValStyle('promptContainer');
            defaultConfig.style.promptTitle = getValStyle('promptTitle');
            defaultConfig.style.mask = getValStyle('mask');
        }
        return defaultConfig;
    },
    verifyUserConfigurationButton: function (userConfig, defaultConfig, buttonKey) {
        var This = this;
        var isElement = this.isElement;
        var getValFalse = function (key) {
            return This.getConfigValueOfFalse(userConfig, defaultConfig, key);
        }
        var buttonElement;
        buttonElement = $(getValFalse(buttonKey));
        if ((buttonKey in userConfig) && (typeof userConfig[buttonKey] === 'string')) {
            buttonElement = $(defaultConfig[buttonKey]).html(userConfig[buttonKey]);
        }
        if ((buttonKey in userConfig) && isElement(userConfig[buttonKey])) {
            buttonElement = $(userConfig[buttonKey]);
        }
        return buttonElement;
    },
    buttons: {
        confirm: '<span class="PromptPopUpWindowButton PromptPopUpWindowButtonConfirm">确定</span>',
        cancel: '<span class="PromptPopUpWindowButton PromptPopUpWindowButtonCancel">取消</span>'
    },
    createOperationObject: function (windowElement) {
        return {
            element: windowElement,
            open: function () {
                windowElement.data('open')();
            },
            close: function () {
                windowElement.data('close')();
            },
            hide: function () {
                windowElement.data('hide')();
            }
        };
    },
    basicWindow: function (config) {
        this.basicStyle();
        var isObject = this.isObject;
        var isElement = this.isElement;
        var windowElement = $("<div class='PromptPopUpWindowContainer'></div>");
        /*
        var fullScreenStyle = {
            width: "100%",
            height: '100%',
            position: "absolute",
            top: "0",
            left: "0",
            display: "inline-block"
        };
         */

        var maskElement = (function () {
            var maskElement = $('<div class="PromptPopUpWindowMask"></div>');
            var hasMask = true;
            if ('mask' in config) {
                if ((config.mask === false) || (config.mask === 'false')) {
                    maskElement.addClass('PromptPopUpWindowNoMask');
                    hasMask = false;
                }
                if ((config.mask === true) || (config.mask === 'true')) {
                    hasMask = true;
                }
                if (isObject(config.mask)) {
                    maskElement.css(config.mask);
                    hasMask = true;
                }
                if (isElement(config.mask)) {
                    maskElement = $(config.mask);
                    hasMask = true;
                }
            }

            if (hasMask) {
                windowElement.css({
                    backdropFilter: 'blur(5px)'
                    // backgroundColor: 'rgba(128, 128, 128, 0.5)'
                });
            }
            return maskElement;
        })();

        var contentTable = $('<table class="PromptPopUpWindowTable"><tbody class="PromptPopUpWindowTbody"><tr class="PromptPopUpWindowTr"><td class="PromptPopUpWindowTd"></td></tr></tbody></table>');
        var contentWindow = $('<div class="PromptPopUpWindowContent"><div class="PromptPopUpWindowContentHead"><span class="PromptPopUpWindowContentTitle">标题</span><img alt="关闭" src="' + this.closeImage5E5E5E + '" class="PromptPopUpWindowContentClose"></div><div class="PromptPopUpWindowContentContainer"><div class="PromptPopUpWindowPrompt">内容</div></div></div>');
        var promptContent = contentWindow.find('.PromptPopUpWindowPrompt');
        var promptTitle = contentWindow.find('.PromptPopUpWindowContentTitle');
        var promptContainer = contentWindow.find('.PromptPopUpWindowContentContainer');
        if ('style' in config) {
            if ('window' in config.style) {
                contentWindow.css(config.style.window);
            }
            if ('promptContent' in config.style) {
                promptContent.css(config.style.promptContent);
            }
            if ('promptContainer' in config.style) {
                promptContainer.css(config.style.promptContainer);
            }
            if ('promptTitle' in config.style) {
                promptTitle.css(config.style.promptTitle);
            }
            if ('mask' in config.style) {
                maskElement.css(config.style.mask);
            }
        }
        if ('content' in config) {
            promptContent.html(config.content);
        }
        if ('title' in config) {
            promptTitle.html(config.title);
        }
        contentTable.find('td').append(contentWindow);

        if ('closeButton' in config) {
            if (config.closeButton === false) {
                contentWindow.find('.PromptPopUpWindowContentClose').remove();
            } else {
                contentWindow.find('.PromptPopUpWindowContentClose')
                    .click(function () {
                        windowElement.data('close')();
                    })
                    .hover(
                        function () {
                            $(this).attr('src', window.PromptPopUpWindow.closeImage393939);
                        },
                        function () {
                            $(this).attr('src', window.PromptPopUpWindow.closeImage5E5E5E);
                        }
                    );
            }
        }
        contentTable.click(function (event) {
            // console.log($(event.target).closest('.PromptPopUpWindowContent'), $(this).parent().data('close'))
            if ($(event.target).closest('.PromptPopUpWindowContent').length > 0) {
                // 当前点击发生在 .PromptPopUpWindowContainer 元素内部
                // console.log('In');
            } else {
                // 当前点击不发生在 .PromptPopUpWindowContainer 元素内部
                // console.log('notIn');
                windowElement.data('close')();
            }
        });


        windowElement.append(maskElement).append(contentTable);
        if ('window' in config) {
            if (config.window === true) {

            } else if (config.window === false) {
                windowElement = $('<div style="display: none;"></div>');
            } else {
                windowElement = $(config.window);
            }
        }
        windowElement
            .data('open', function () {
                windowElement.hide();
                windowElement.stop().fadeIn(200);
            })
            .data('hide', function (callback) {
                windowElement.show();
                windowElement.stop().fadeOut(200, function () {
                    if (typeof callback === 'function') {
                        callback.call(this);
                    }
                });
                if ('callback' in config) {
                    config.callback.call(windowElement.get(0));
                }
            })
            .data('close', function () {
                windowElement.data("hide")(function () {
                    windowElement.remove()
                });
            });
        windowElement.hide();
        return windowElement;
        // $('body').append(windowElement);
    },
    basicStyle: function () {
        var cssStyle = "" +
            ".PromptPopUpWindowContainer {" +
            "   z-index: 100;" +
            "   overflow: hidden;" +
            "   margin: 0;" +
            "   padding: 0;" +
            "" +
            "   left: 0px;" +
            "   top: 0px;" +
            "   width: 100%;" +
            "   height: 100%;" +
            "   display: inline-block;" +
            "   position: absolute;" +
            "}" +
            ".PromptPopUpWindowMask {" +
            "   filter: progid:DXImageTransform.Microsoft.Alpha(opacity=50);" +
            "   margin: 0;" +
            "   padding: 0;" +
            "   opacity: 0.5;" +
            "   background-color: gray;" +
            "   z-index: 101;" +
            "" +
            "   left: 0px;" +
            "   top: 0px;" +
            "   width: 100%;" +
            "   height: 100%;" +
            "   display: inline-block;" +
            "   position: absolute;" +
            "}" +
            ".PromptPopUpWindowNoMask{" +
            "   background: none;" +
            "}" +
            ".PromptPopUpWindowContent {" +
            "   display: inline-block;" +
            "   width: 80%;" +
            "   height: 80%;" +
            "   max-width: 500px;" +
            "   max-height: 800px;" +
            "   background-color: white;" +
            "   vertical-align: middle;" +
            "   border-radius: 10px;" +
            "   position: relative;" +
            "   overflow: hidden;" +
            "   border: 1px solid #aaaaaa;" +
            "   padding: 20px 20px 0px 20px;" +
            "   margin: auto;" +
            "   box-shadow: 5px 5px 20px 0px #aaaaaa;" +
            "   -webkit-box-shadow: 5px 5px 20px 0px #aaaaaa;" +
            "   -moz-box-shadow: 5px 5px 20px 0px #aaaaaa;" +
            "   -ms-box-shadow: 5px 5px 20px 0px #aaaaaa;" +
            "   -o-box-shadow: 5px 5px 20px 0px #aaaaaa;" +
            "}" +
            ".PromptPopUpWindowTable {" +
            "   z-index: 102;" +
            "   position: absolute;" +
            "   left: 0;" +
            "   top: 0;" +
            "}" +
            ".PromptPopUpWindowTable, .PromptPopUpWindowTbody, .PromptPopUpWindowTr {" +
            "   width: 100%;" +
            "   height: 100%;" +
            "   text-align: center;" +
            "}" +
            ".PromptPopUpWindowContentClose {" +
            "   position: absolute;" +
            "   width: 20px;" +
            "   height: 20px;" +
            "   margin: 5px;" +
            "   padding: 0;" +
            "   right: 0;" +
            "   top: 0;" +
            "   cursor: pointer;" +
            "}" +
            ".PromptPopUpWindowContentTitle {" +
            "   position: absolute;" +
            "   left: 0;" +
            "   top: 0;" +
            "   display: inline-block;" +
            "   padding: 8px 0 0 8px;" +
            "   font-size: 10px;" +
            "   font-weight: bold;" +
            "   color: #5e5e5e;" +
            "}" +
            ".PromptPopUpWindowContentContainer {" +
            "   overflow: auto;" +
            "   height: 100%;" +
            "}" +
            ".PromptPopUpWindowContentHead {" +
            "   position: absolute;" +
            "   height: 100%;" +
            "   top: 0;" +
            "   left: 0;" +
            "   width: 100%;" +
            "   height: 25px;" +
            "   background-color: white;" +
            "   z-index: 104;" +
            "}" +
            ".PromptPopUpWindowPrompt {" +
            "   padding: 10px;" +
            "   height: 0;" +
            "   text-align: left;" +
            "   overflow: visible;" +
            "}" +
            ".PromptPopUpWindowButtonGroup {" +
            "   width: 100%;" +
            "   text-align: right;" +
            "   margin-top: 30px;" +
            "}" +
            ".PromptPopUpWindowButton {" +
            "   width: auto;" +
            "   display: inline-block;" +
            "   padding: 8px 20px 8px 20px;" +
            "   font-size: 12.5px;" +
            "   color: black;" +
            "   -webkit-border-radius: 3;" +
            "   -moz-border-radius: 3;" +
            "   border-radius: 3px;" +
            "   text-shadow: 1px 1px 2px #bdbdbd;" +
            "   -webkit-box-shadow: 1px 1px 5px #CACACA;" +
            "   -moz-box-shadow: 1px 1px 5px #CACACA;" +
            "   box-shadow: 1px 1px 5px #CACACA;" +
            "   cursor: pointer;" +
            "   margin: 5px;" +
            "   background-color: #EBEBEB;" +
            "}" +
            ".PromptPopUpWindowButtonConfirm {" +
            "   background-color: #0078D4;" +
            "   text-shadow: 1px 1px 2px #666666;" +
            "   color: white;" +
            "}" +
            ".PromptPopUpWindowButtonCancel {" +
            "   background-color: #EBEBEB;" +
            "   text-shadow: 1px 1px 2px #bdbdbd;" +
            "}";
        if (!($('#PromptPopUpWindowStyle').length > 0)) {
            $('head').append($("<style id='PromptPopUpWindowStyle'>" + cssStyle + "</style>"));
            /*
            使用 “$('<style></style>').text(cssStyle)” 或者 “$('<style></style>').html(cssStyle)” 或者 “$('<style></style>').append(cssStyle)”
            在低版本IE报错 “SCRIPT65535: 意外地调用了方法或属性”

            使用 “var styleElement = document.createElement('style');styleElement.innerText = cssStyle;”
            在低版本IE报错 “SCRIPT600: 未知的运行时错误”
             */
        }
    },
    basicConfig: {
        title: "无标题",
        content: "无内容",
        callback: function () {

        },
        window: true,
        style: {
            window: {},
            promptContent: {},
            promptContainer: {},
            promptTitle: {},
            mask: {}
        },
        mask: true,
        closeButton: true
    },
    basicMinWindowConfig: function () {
        return this.mergeConfigs(
            this.basicConfig,
            {
                style: {
                    promptContent: {
                        height: 'auto'
                    },
                    window: {
                        height: 'auto'
                    }
                }
            }
        )
    },
    messagePopUpWindow: function (config) {
        var isObject = this.isObject;

        var configuration = {
            confirmBtn: this.buttons.confirm
        };
        configuration = this.mergeObjects(this.basicMinWindowConfig(), configuration)

        if (typeof config === 'string') {
            config = {'content': config};
        } else {
            config = isObject(config) ? config : {};
        }
        if (!isObject(config)) {
            config = {};
        }
        configuration = this.verifyUserConfiguration(config, configuration);

        var buttonGroup = $('<div class="PromptPopUpWindowButtonGroup"></div>');
        var confirmBtnElement = this.verifyUserConfigurationButton(config, configuration, 'confirmBtn');
        confirmBtnElement.click(function () {
            windowElement.data('close')();
        });

        buttonGroup.append(confirmBtnElement);
        configuration.content = $('<div></div>').html(configuration.content).add(buttonGroup);

        var windowElement = this.basicWindow(configuration);
        windowElement.appendTo('body');
        return this.createOperationObject(windowElement);
    },
    confirmPopUpWindow: function (config) {
        var isObject = this.isObject;
        var configuration = {
            confirmBtn: this.buttons.confirm,
            cancelBtn: this.buttons.cancel,
            closeButton: false
        };
        configuration = this.mergeObjects(this.basicMinWindowConfig(), configuration)
        config = isObject(config) ? config : {};
        configuration = this.verifyUserConfiguration(config, configuration);
        var isButtonsArrayValidFormat = function (arr) {
            var isString = function (value) {
                return typeof value === 'string';
            }

            var isElement = function (value) {
                if (typeof value === 'object') {
                    if (value instanceof jQuery) {
                        // 是 jQuery 元素
                        return true;
                    } else if (value.nodeType === 1) {
                        // 是 DOM 元素
                        return true;
                    }
                }
                return false;
            };

            var isValidObj = function (obj) {
                if (typeof obj !== 'object' || obj === null) {
                    return false;
                }

                for (var key in obj) {
                    if (key === 'html') {
                        if (!isString(obj[key]) && !isElement(obj[key])) {
                            return false;
                        }
                    } else if (key === 'click') {
                        if (typeof obj[key] !== 'function') {
                            return false;
                        }
                    } else {
                        // 可有多个其他 key，不做额外判断
                    }
                }

                return true;
            };

            if (!jQuery.isArray(arr)) {
                return false;
            }

            for (var i = 0; i < arr.length; i++) {
                if (!isValidObj(arr[i])) {
                    return false;
                }
            }

            return true;
        };

        var buttonGroup = $('<div class="PromptPopUpWindowButtonGroup"></div>');

        var confirmCallback = function (confirm) {

        }
        if (('callback' in configuration) && (typeof configuration.callback === 'function')) {
            confirmCallback = configuration.callback;

        }
        if ('callback' in configuration) {
            delete configuration.callback;
        }

        var confirmBtnElement = this.verifyUserConfigurationButton(config, configuration, 'confirmBtn');
        var cancelBtnElement = this.verifyUserConfigurationButton(config, configuration, 'cancelBtn');
        confirmBtnElement.click(function () {
            OperationObject.close(true);
        });
        cancelBtnElement.click(function () {
            OperationObject.close(false);
        });
        if (('confirmTitle' in config) && (typeof config.confirmTitle === 'string')) {
            confirmBtnElement.attr('title', config.confirmTitle);
        }
        if (('cancelTitle' in config) && (typeof config.cancelTitle === 'string')) {
            cancelBtnElement.attr('title', config.cancelTitle);
        }
        var userButtons = $('');
        if (('buttons' in config) && isButtonsArrayValidFormat(config.buttons)) {
            userButtons = (function () {
                var buttons = $('<div style="display: inline"></div>');
                for (var i = 0; i < config.buttons.length; i++) {
                    (function (curBtn) {
                        var newButton = $('<span class="PromptPopUpWindowButton"></span>')
                        if (typeof curBtn.html === 'string') {
                            newButton.html(curBtn.html);
                        } else {
                            newButton = $(curBtn.html);
                        }
                        if (('style' in curBtn) && (isObject(curBtn.style))) {
                            newButton.css(curBtn.style);
                        }
                        if (('hover' in curBtn) && (jQuery.isArray(curBtn.hover)) && (curBtn.hover.length) === 2) {
                            var whetherToSet = true;
                            for (var l = 0; l < curBtn.hover.length; l++) {
                                if (!(typeof curBtn.hover[l] === 'function')) {
                                    whetherToSet = false;
                                }
                            }
                            if (whetherToSet) {
                                newButton
                                    .on("mouseenter", function () {
                                        curBtn.hover[0].call(this);
                                    })
                                    .on("mouseleave", function () {
                                        curBtn.hover[1].call(this);
                                    });
                            }
                        }
                        if (('class' in curBtn) && ((typeof curBtn['class'] === 'string') || (typeof curBtn['class'] === 'function'))) {//直接使用 curBtn.class ie低版本会报错
                            newButton.addClass(curBtn['class']);
                        }
                        if (('title' in curBtn) && (typeof curBtn.title === 'string')) {
                            newButton.attr('title', curBtn.title);
                        }
                        newButton.click(function () {
                            curBtn.click.call(OperationObject.element, OperationObject);
                        });
                        buttons.append(newButton);
                    })(config.buttons[i]);//避免 可从闭包访问可变变量
                }
                return buttons;
            })();
        }
        buttonGroup.append(confirmBtnElement, cancelBtnElement, userButtons);
        configuration.content = $('<div></div>').html(configuration.content).add(buttonGroup);

        var windowElement = this.basicWindow(configuration);
        windowElement.find('table.PromptPopUpWindowTable').off('click');
        windowElement.appendTo('body');
        var OperationObject = this.createOperationObject(windowElement);
        OperationObject.close = function (confirm) {
            confirmCallback(confirm);

            windowElement.data('close')();
        }
        return OperationObject;
    }
}

$(document)
    .on('mouseenter', '.PromptPopUpWindowButtonConfirm', function () {
        // 鼠标进入时的处理逻辑
        $(this).stop().animate({backgroundColor: '#0070c5', color: '#f5f5f5'}, 100);
    })
    .on('mouseleave', '.PromptPopUpWindowButtonConfirm', function () {
        // 鼠标离开时的处理逻辑
        $(this).stop().animate({backgroundColor: "#0078D4", color: '#ffffff'}, 100);
    })
    .on('mouseenter', '.PromptPopUpWindowButtonCancel', function () {
        // 鼠标进入时的处理逻辑
        $(this).stop().animate({backgroundColor: '#d2d2d2'}, 100);
    })
    .on('mouseleave', '.PromptPopUpWindowButtonCancel', function () {
        // 鼠标离开时的处理逻辑
        $(this).stop().animate({backgroundColor: '#ebebeb'}, 100);
    });