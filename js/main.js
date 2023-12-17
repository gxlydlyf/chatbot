function SaveMsgConstructor() {
    window.SaveMsgObj = {

        scrollTopBottom: function () {
            var ChatMessagesParentElement = $('#chat_messages');
            var scrollToBottom = ChatMessagesParentElement.prop('scrollHeight') - ChatMessagesParentElement.height();
            ChatMessagesParentElement.scrollTop(scrollToBottom);
        },

        clearMessages: function () {
            $.LS.removeItem("messages")
        },

        ifScrollToBottom: function () {
            // this.log(this.isScrolledToBottom('#chat_messages'));
            return this.isScrolledToBottom('#chat_messages');

        },

        isScrolledToBottom: function (selector) {
            var element = $(selector);
            var scrollTop = element.scrollTop();
            var innerHeight = element.innerHeight();
            var scrollHeight = element[0].scrollHeight;

            var deviation = 50; // 偏差值

            return (scrollTop + innerHeight + deviation >= scrollHeight);
        },


        createMsgOperate: function () {
            for (var i = 0; i < this.messages.length; i++) {
                this.messages[i].id = this.generateUniqueString();
            }
            this.log('创建聊天信息变量', '结果：', this.messages);
            this.saveMsgs();
        },

        createContainerElement: function (FunClass, BoxClass, ContainerClass, data) {
            var copyBtn = '';
            try {
                if (ClipboardJS.isSupported()) {
                    copyBtn = '<span>复制</span>';
                }
            } catch (e) {
                console.log(e);
            }
            var Element = $('<div class="' + ContainerClass + ' msgContainer"><div class="msgFun ' + FunClass + ' disable-selection no-scrollbar"><span>删除</span>' + copyBtn + '<span>编辑</span><span>发送</span></div><div class="' + BoxClass + ' msgBox"></div></div>');
            Element.find('.' + BoxClass).data('id', data['id']);
            Element.find('.' + BoxClass).html(marked.marked(data['content']));
            return Element;

        },
        createBotElement: function (data) {
            return this.createContainerElement("robotFun", "robotBox", "robotBoxContainer", data)
        },

        createUserElement: function (data) {
            return this.createContainerElement("userFun", "userBox", "userBoxContainer", data)
        },

        loadMessagesElement: function () {
            var ChatMessagesParentElement = $('#chat_messages');
            ChatMessagesParentElement.empty();
            for (var i = 0; i < this.messages.length; i++) {
                if (this.messages[i]['role'] === 'user') {
                    ChatMessagesParentElement.append(this.createUserElement(this.messages[i]));
                } else if (this.messages[i]['role'] === 'assistant') {
                    ChatMessagesParentElement.append(this.createBotElement(this.messages[i]));
                }

            }
            if (isIE7OrLower()) {
                ModifyMessageBoxWidth();
                setTimeout(function () {
                    SaveMsgObj.scrollTopBottom();
                })
            }

        },

        newMsgOperateUserMsg: function (message) {
            var msg = message;
            msg['id'] = this.generateUniqueString();
            this.messages.push(message);
            this.saveMsgs();
            this.log('发送消息：\n', msg.content);
        },

        newUserMessage: function (message) {
            this.checkMsg();
            var msg = {'role': 'user', 'content': message};
            this.newMsgOperateUserMsg(msg);
            var ChatMessagesParentElement = $('#chat_messages');
            ChatMessagesParentElement.append(this.createUserElement(msg));

        },

        newMsgOperateBotMsg: function (message) {
            var msg = message;
            msg['id'] = this.generateUniqueString();
            this.messages.push(message);
            var MsgId = msg['id'];
            this.saveMsgs();

            // console.log('机器人回复', msg);
            return MsgId;
        },


        findMessage: function (data, MsgId) {
            this.checkMsg();
            for (var i = 0; i < this.messages.length; i++) {
                if (this.messages[i].id === MsgId) {
                    this.messages[i].content = data;
                    this.saveMsgs();
                    var ChatMessagesParentElement = $('#chat_messages');
                    ChatMessagesParentElement.find('div').each(function () {
                        // 在这里对每个div元素进行操作
                        if ($(this).data('id') === MsgId) {
                            ifSTB = SaveMsgObj.ifScrollToBottom();
                            $(this).html(marked.marked(data));
                        }

                    });


                }

            }
        },
        editMessage: function (data, MsgId) {
            var ifSTB;
            for (var i = 0; i < this.messages.length; i++) {
                if (this.messages[i].id === MsgId) {
                    this.messages[i].content = data;
                    this.saveMsgs();
                    var ChatMessagesParentElement = $('#chat_messages');
                    ChatMessagesParentElement.find('div').each(function () {
                        // 在这里对每个div元素进行操作
                        if ($(this).data('id') === MsgId) {
                            ifSTB = SaveMsgObj.ifScrollToBottom();
                            $(this).html(marked.marked(data));
                        }

                    });


                }

            }
            if (ifSTB) {
                SaveMsgObj.scrollTopBottom();
            }
        },

        newBotMessage: function (message) {
            if (!message) {
                message = '';
            }
            this.checkMsg();
            var msg = {'role': 'assistant', 'content': message};
            var MsgId = this.newMsgOperateBotMsg(msg);
            var ChatMessagesParentElement = $('#chat_messages');
            var ifSTB = SaveMsgObj.ifScrollToBottom();
            ChatMessagesParentElement.append(this.createBotElement(msg));
            if (ifSTB) {
                SaveMsgObj.scrollTopBottom();
            }

            return MsgId;
        },

        initializeMsg: function () {
            this.messages = [];
            this.saveMsgs();
        },

        checkMsg: function () {
            var messages = this.messages;
            if ((messages === null) || (messages === undefined)) {
                this.log('初始化聊天信息');
                this.initializeMsg();
            }
        },

        saveMsgs: function () {
            var saveMessages = JSON.parse(JSON.stringify(this.messages));//防止直接操作 this.messages 的数据
            for (var i = 0; i < saveMessages.length; i++) {
                delete saveMessages[i]['id'];
            }
            $.LS.setItem("messages", JSON.stringify(saveMessages));
        },


        generateUniqueString: function () {
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()~-=_+[]{}|;:,./<>?';
            var uniqueString = '';
            for (var i = 0; i < 100; i++) {
                var randomIndex = Math.floor(Math.random() * characters.length);
                uniqueString += characters.charAt(randomIndex);
            }
            return uniqueString;
        },

        getApiContent: function (data) {
            // console.log(data);
            var okContent = '';
            var response = data;

            var allLines = [];
            var currentLine = "";
            if (response !== undefined && response !== null) {
                for (var l = 0; l < response.length; l++) {
                    var char = response.charAt(l);
                    if (char === "\n" || char === "\r") {
                        allLines.push(currentLine);
                        currentLine = "";
                    } else {
                        currentLine += char;
                    }
                }
            }
            // this.log(allLines);
            for (var i = 0; i < allLines.length; i++) {
                var line = allLines[i];
                var lineStr = line.toString();
                if (lineStr.indexOf("data:") === 0) {
                    if (lineStr.indexOf("data: [DONE]") === 0) {
                        break;
                    }
                    var lineJson = JSON.parse(lineStr.substring(5));
                    if ('choices' in lineJson) {
                        if (lineJson.choices.length > 0) {
                            var choice = lineJson.choices[0];
                            if ('delta' in choice) {
                                var delta = choice.delta;
                                var role, deltaContent;
                                if ('role' in delta) {
                                    role = delta.role;
                                } else if ('content' in delta) {
                                    deltaContent = delta.content;
                                    i += 1;
                                    if (i < 40) {
                                        // console.log(deltaContent);
                                    } else if (i === 40) {
                                        // console.log("......");
                                    }
                                    okContent += deltaContent;
                                    // 这里写继续处理的代码
                                }
                            }
                        }
                    }
                }
            }

            return okContent;
        },
        getMsgContent: function (id) {
            for (var i = 0; i < this.messages.length; i++) {
                if (this.messages[i].id === id) {
                    return this.messages[i].content;
                }
            }
            return null;
        },
        removeMsg: function (MsgId) {
            for (var i = 0; i < this.messages.length; i++) {
                if (this.messages[i].id === MsgId) {
                    this.messages.splice(i, 1);
                    this.saveMsgs();
                    var ChatMessagesParentElement = $('#chat_messages');
                    ChatMessagesParentElement.find('div').each(function () {
                        // 在这里对每个div元素进行操作
                        if ($(this).data('id') === MsgId) {
                            $(this).parent().remove();
                        }

                    });

                    return true;
                }

            }
            return false;

        },
        getMsgBox: function (MsgId) {
            var returnElement = null;
            $('#chat_messages').find('div').each(function () {
                // 在这里对每个div元素进行操作
                if ($(this).data('id') === MsgId) {
                    // console.log("ok")
                    returnElement = $(this);
                }

            });
            return returnElement;

        },
        editContenteditable: function () {
            // $(".msgBox").attr("contenteditable", "false");
            var editMsgBox = $(".msgBox").filter(function () {
                return $(this).attr('contenteditable') === 'true';
            });
            if (editMsgBox.length > 0) {
                editMsgBox.filter(function () {
                    $(this).attr("contenteditable", "false").html(marked.marked(SaveMsgObj.getMsgContent($(this).data('id'))));
                });

            }
            // editMsgBox.attr("contenteditable", "false").html(marked.marked(this.getMsgContent(editMsgBox.data('id'))));
            $('.msgFun span').filter(function () {
                return $(this).text() === '保存';
            }).text('编辑');
        },
        findFunBtn: function (jQueryElement, funName) {
            /*var stopSpan = robotBox.parent().children('.msgFun').find('span').filter(function () {
                return $(this).text().trim() === '停止';
            });*/
            if (!funName) {
                funName = '停止';
            }
            return jQueryElement.filter(function () {
                return $(this).text().trim() === funName;
            });

        },
        log: function (param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
            try {
                var args = [];
                for (var i = 0; i < arguments.length; i++) {
                    var arg = arguments[i];
                    args.push((arg === undefined || arg === null) ? '' : arg);
                }
                args.unshift('[Messages]');
                // console.log(args);
                Function.prototype.apply.call(console.log, console, args);
            } catch (e) {
                console.warn(e);
            }
        }


    }
    if ($.LS.getItem("messages") === undefined) {
        SaveMsgObj.initializeMsg();
    }
    SaveMsgObj.messages = JSON.parse($.LS.getItem("messages"));
    SaveMsgObj.checkMsg();
    SaveMsgObj.createMsgOperate();
    $(document).ready(function () {
        // 在DOM加载完成后执行的命令
        // 可以在这里操作DOM元素、绑定事件等
        SaveMsgObj.loadMessagesElement();
        SaveMsgObj.scrollTopBottom()
    });
    var Preliminary_questions = $.getUrlParam('q');
    if (Preliminary_questions) {
        console.log(Preliminary_questions);
        var urlWithoutQueryParam = window.location.href.replace(/[?&]q=[^&]+/, '');
        try {
            window.history.replaceState(null, '', urlWithoutQueryParam);
        } catch (e) {
            console.log('替换浏览器Url历史出错：', e);
        }
        $(document).ready(function () {
            // 在DOM加载完成后执行的命令
            // 可以在这里操作DOM元素、绑定事件等
            var UserInput = $('#userInput');
            var uiv = UserInput.val();
            UserInput.val(Preliminary_questions);
            SendBtnClick()
            UserInput.val(uiv);
        });
    }

}

SaveMsgConstructor();
window.documentSize = {
    height: function () {
        return (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || document.documentElement.offsetHeight);
    },
    width: function () {
        return (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || document.documentElement.offsetWidth);
    }
};

window.TfcFuns = {
    Hide: function () {
        var TfcShowBtn = $('#tfc_show_btn');
        var TFC = $('#top_function_container');
        var FbInTFC = $('#top_function_container .fu-btn');
        FbInTFC.css('display', 'inline-block');
        TFC.css('top', '0');
        TFC.stop().animate({
            'top': '-60px'
        }, 100);
        TfcShowBtn.data('status', 'hide');
        this.BtnBottom();
    },
    Show: function () {
        var TfcShowBtn = $('#tfc_show_btn');
        var TFC = $('#top_function_container');
        var FbInTFC = $('#top_function_container .fu-btn');

        TFC.css('top', '-60px');
        FbInTFC.css('display', 'inline-block');

        TFC.stop().animate({
            'top': '0'
        }, 100);
        TfcShowBtn.data('status', 'show');
        this.BtnTop();
    },
    BtnBottom: function () {//向下
        var TfcShowBtn = $('#tfc_show_btn');
        var BtnImg = TfcShowBtn.children();
        BtnImg.removeClass('transform-rotate-180');
        BtnImg.addClass('transform-rotate-0');
    },
    BtnTop: function () {//向上
        var TfcShowBtn = $('#tfc_show_btn');
        var BtnImg = TfcShowBtn.children();
        BtnImg.removeClass('transform-rotate-0');
        BtnImg.addClass('transform-rotate-180');
    }
}

function setChatContentWidth(width) {
    // width = String(width);
    var ChatContent = $('#chat_content');
    var ChatInfo = $('#currentChatInformation');
    var ChatContentTransition = ChatContent.css('transition');
    var ChatInfoTransition = ChatInfo.css('transition');
    ChatContent.stop().animate({width: width}, 200, 'easeInOut');
    ChatInfo.stop().animate({width: width}, 200, 'easeInOut');
    if (width.containsString('calc')) {
        ChatContent.get(0).style.width = width;
        ChatInfo.get(0).style.width = width;
    }
    setTimeout(function () {
        ChatContent.css('transition', 'none')[0].style.width = width;
        ChatContent.css('transition', ChatContentTransition);

        ChatInfo.css('transition', 'none')[0].style.width = width;
        ChatInfo.css('transition', ChatInfoTransition);
    }, 200);
}

function Reset_function_box_position() {
    var TFC = $('#top_function_container');
    var OFC = $('#outer_function_container');
    var TfcShowBtn = $('#tfc_show_btn');
    var FbInTFC = $('#top_function_container .fu-btn');
    var TfcBtn = $('#tfc_buttons');
    var ChatMsgs = $('#chat_messages');
    var ChatContent = $('#chat_content');
    var FunBar = $('#leftFunctionBar');
    // var ChatInfo = $('#currentChatInformation');
    var FunBarStatus;
    var FunBarSwitch = $('#messageListSwitch');
    var FunBarSwitchHideImage = svgImagePath('svg/arrow-back-5e5e5e.svg');
    var FunBarSwitchShowImage = svgImagePath('svg/read-more-5e5e5e.svg');
    var changeFunBarSwitchSrc = function (FunBarStatus) {
        var changeNew = function (newImg) {
            FunBarSwitch.stop().animate({padding: '10px'}, 100, function () {
                // 在动画结束后执行的操作
                FunBarSwitch.attr('src', newImg);
                FunBarSwitch.stop().animate({padding: '0px'}, 100);
            });
        }
        if (FunBarStatus === 'show') {
            if (FunBarSwitch.attr('src') !== FunBarSwitchHideImage) {
                // FunBarSwitch.attr('src', FunBarSwitchHideImage);
                changeNew(FunBarSwitchHideImage);
            }
        } else if (FunBarStatus === 'hide') {
            if (FunBarSwitch.attr('src') !== FunBarSwitchShowImage) {
                // FunBarSwitch.attr('src', FunBarSwitchShowImage);
                changeNew(FunBarSwitchShowImage);
            }
        }
    }

    if (FunBar.data("status") === undefined) {
        FunBar.data("status", "auto");
    }
    if (documentSize.width() > 700) {
        FunBarStatus = FunBar.data("status");
        if ((FunBarStatus === 'auto') || (FunBarStatus === 'show')) {
            // FunBar.css("width", "300px");
            FunBar.show();
            FunBar.stop().animate({"left": "0", "width": "300px"}, 200, "easeInOut")//使用stop()防止延迟
            if (isCalcSupported()) {
                setChatContentWidth('calc(100% - 300px)');
            } else {
                setChatContentWidth((documentSize.width() - 300) + 'px');
            }
            changeFunBarSwitchSrc('show');
        } else if (FunBarStatus === 'hide') {
            FunBar.stop().animate({"left": -FunBar.width()}, 200, "easeInOut", function () {
                FunBar.hide();
            });
            setChatContentWidth('100%');
            changeFunBarSwitchSrc('hide');
        } else {
            FunBar.data("status", "auto");
        }
    } else {
        FunBarStatus = FunBar.data("status");
        if ((FunBarStatus === 'auto') || (FunBarStatus === 'hide')) {
            FunBar.stop().animate({"left": -FunBar.width()}, 200, "easeInOut", function () {
                FunBar.hide();
            });
            setChatContentWidth('100%');
            changeFunBarSwitchSrc('hide');
        } else if (FunBarStatus === 'show') {
            // FunBar.css("width", "100%");
            FunBar.show();
            FunBar.stop().animate({"left": "0", "width": "100%"}, 200, "easeInOut");
            setChatContentWidth('100%');
            changeFunBarSwitchSrc('show');
        } else {
            FunBar.data("status", "auto");
        }
    }
    if (ChatContent.width() > 500) {
        // 可用宽度大于500px时执行的命令
        // console.log('可用宽度大于500px');
        //TFC.children().not('#tfc_show_btn').children().prependTo(OFC);
        TfcBtn.children().prependTo(OFC);


        TFC.stop().animate({
            'top': '-80px'
        }, 100);
        TfcShowBtn.data('status', 'hide');
        TfcFuns.BtnBottom();
        setTimeout(function () {
            TFC.css("display", "none");
        }, 100)

        OFC.stop().animate({
            'right': '0px'
        }, 100);
        ChatMsgs.css({
            'margin-right': '60px'
        });
    } else {
        // console.log('可用宽度小于500px');
        setTimeout(function () {
            TFC.css("display", "block");
        }, 100)
        OFC.children().prependTo(TfcBtn);
        if (TfcShowBtn.data('status') === 'show') {
            TFC.stop().animate({
                'top': '0'
            }, 100);
            TfcShowBtn.data('status', 'show');
            TfcFuns.BtnTop();
        } else {
            TFC.stop().animate({
                'top': '-60px'
            }, 100);
            TfcShowBtn.data('status', 'hide');
            TfcFuns.BtnBottom();
        }
        OFC.stop().animate({
            'right': '-60px'
        }, 100);
        ChatMsgs.css({
            'margin-right': '0px'
        });

    }
    if (isCalcSupported()) {
        if (ChatMsgs.css("margin-right") !== '0px') {
            ChatMsgs.css('width', 'calc(100% - 60px)');
        } else {
            ChatMsgs.css('width', '100%');
        }
    }

}

$('#chat_messages').mousewheel()

function changeInterfaceSizeAndPosition() {
    var ChatMsgs = $('#chat_messages');
    var ChatContent = $('#chat_content');
    var ChatInput = $('#chat_input');
    var OFC = $('#outer_function_container');
    // var ChatInfo = $('#currentChatInformation');
    var userInput = $('#userInput');
    ChatContent.css('height', documentSize.height() - 40);
    var newChatMsgsHeight = ChatContent.height() - ChatInput.height() - 2;
    ChatMsgs.height(newChatMsgsHeight + 'px');
    OFC.css('height', newChatMsgsHeight + 'px');
    heightAdaptationOfUserInput(userInput.get(0));
}


// $(window).resize(function () {
//     Reset_function_box_position()
// });
function windowResize(callback) {
    var runCallback = function () {
        callback.call();
        setTimeout(function () {
            callback.call();
        }, 200);
        /*
        setTimeout(function () {
            callback.call();
        }, 500);
        setTimeout(function () {
            callback.call();
        }, 1000);
         */
    }
    if (typeof window.addEventListener === "undefined" && typeof window.attachEvent !== "undefined") {
        // IE5 or older browser
        window.attachEvent("onresize", function () {
            runCallback();
        });
    } else {
        // Modern browsers
        window.addEventListener("resize", function () {
            runCallback();
        });
    }

}

var resizeTrigger = function () {
    var event;
    if (window.attachEvent) {
        // Old IE browsers
        event = document.createEventObject();
        window.fireEvent("onresize", event);
    } else {
        // Modern browsers
        event = new Event("resize");
        window.dispatchEvent(event);
    }
};

windowResize(function () {
    Reset_function_box_position();
    changeInterfaceSizeAndPosition();
    heightAdaptationOfUserInput(document.getElementById('userInput'));
})
Reset_function_box_position();
changeInterfaceSizeAndPosition();
setTimeout(function () {
    Reset_function_box_position();
    changeInterfaceSizeAndPosition();
}, 500)

function isViewportHeightSupported() {//是否支持 vh 高度
    var testElement = document.createElement("div");
    try {
        testElement.style.height = "50vh";
    } catch (e) {
        return false;
    }
    return !!testElement.style.height;//支持返回true，否则返回false
}

function getStringWidth(Text, fontSize) {
    var text = Text; // 替换为您要检查的文本字符串

    var englishCount = (text.match(/[\u0000-\u007F]/g) || []).length;
    var nonEnglishCount = (text.match(/[^\u0000-\u007F]/g) || []).length;

    //console.log("英文字符个数（含数字）：" + englishCount);
    //console.log("非英文字符个数：" + nonEnglishCount);
    return englishCount * (fontSize * 0.5) + nonEnglishCount * fontSize;
}

function ModifyMessageBoxWidth(element) {
    if (!element) {
        element = '.userBoxContainer, .robotBoxContainer';
    }
    var container = $(element);

    var content = container.find('.userBox, .robotBox');
    /*
    var maxWidthPercent = 80; // 最大宽度百分比
    var containerWidth = $('#chat_messages').width();
    var maxWidth = Math.floor(containerWidth * (maxWidthPercent / 100)); // 计算最大宽度

    content.width(maxWidth); // 设置宽度为最大宽度，单位是px
    */
    content.css({zoom: 1, display: "inline"});

}

function getIEVersion(version, priority) {
    if (!priority) {
        priority = 3;
    }
    priority = priority.toString().toLowerCase();
    if (priority === "ua") {//userAgent
        priority = 3;
    } else if (priority === "so") {//specific object
        priority = 2;
    } else {//Conditional comments
        priority = 1;
    }
    var testFun = function (version) {
        var ie = document.createElement('div');
        ie.innerHTML = '<!--[if IE ' + version + ']>1<![endif]-->';

        return '1' === ie.innerHTML;

    }
    if (priority === 1) {
        if (testFun(5)) {
            return 5;
        } else if (testFun(6)) {
            return 6;
        } else if (testFun(7)) {
            return 7;
        } else if (testFun(8)) {
            return 8;
        } else if (testFun(9)) {
            return 9;
        } else if (document.all && document.addEventListener && window.atob) {
            return 10;
        } else if (!document.all) {//ie11以及以上
            return 11;
        }
        return false;

    } else if (priority === 2) {
        if (!document.all) {
            // alert('IE11+ or not IE');
            return 11;
        } else if (document.all && document.addEventListener && window.atob) {
            // alert('IE10');
            return 10;
        } else if (document.all && document.addEventListener && !window.atob) {
            // alert('IE9');
            return 9;
        } else if (document.all && document.querySelector && !document.addEventListener) {
            // alert('IE8');
            return 8;
        } else if (document.all && window.XMLHttpRequest && !document.querySelector) {
            // alert('IE7');
            return 7;
        } else if (document.all && document.compatMode && !window.XMLHttpRequest) {
            // alert('IE6');
            return 6;
        } else if (testFun(5)) {
            return 5;
        }
        return false;
    } else if (priority === 3) {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            console.log(fIEVersion)
            if (fIEVersion == 7) {
                return 7;
            } else if (fIEVersion == 8) {
                return 8;
            } else if (fIEVersion == 9) {
                return 9;
            } else if (fIEVersion == 10) {
                return 10;
            } else {
                return 6;//IE版本<=7
            }
        } else if (isEdge) {
            // return 'edge';//edge
            return -1;//不是ie浏览器
        } else if (isIE11) {
            return 11; //IE11
        } else {
            return -1;//不是ie浏览器
        }

    }

}

function isIE7OrLower() {
    return getIEVersion() < 7;
}

if (isIE7OrLower()) {
    console.log("Ie7以下浏览器");
    windowResize(function () {
        ModifyMessageBoxWidth();
    });//手动设置自适应文本宽度(大概适应)

}


if (!isCalcSupported()) {
    console.log("不支持calc() css运算");

    function resizeStartFunction() {
        var ChatMsgs = $('#chat_messages');
        var ChatContent = $('#chat_content');
        var ChatInput = $('#chat_input');
        var userInput = $('#userInput');
        var inputParent = $('#textarea_parent');
        var ChatInputWidth = ChatInput.width();

        if (ChatMsgs.css("margin-right") !== '0px') {
            ChatMsgs.width((ChatContent.width() - 60) + 'px');
        } else {
            ChatMsgs.width('100%');
        }
        inputParent.width((ChatInputWidth - 40) + 'px');
        userInput.width((inputParent.width() - 70) + 'px');
        userInput.height((inputParent.height() - 5) + 'px');

    }//手动调整#chat_messages高度为 100%-70px
    resizeStartFunction();
    windowResize(function () {
        resizeStartFunction();
    });

}

function runResizeStartFunction() {
    if (window.resizeStartFunction) {
        resizeStartFunction();
    }
}


$(document).ready(function () {
    $(document)
        .on('mouseenter', '.msgContainer', function () {
            if (isTransitionSupported()) {
                $(this).addClass('msgFunHover');
            } else {
                $('.msgFun span').css({backgroundColor: ""});
                var msgFunElement = $(this).find('.msgFun');
                msgFunElement.children('span').stop().animate({fontSize: '16px'}, 100);
                $2(msgFunElement).fadeTo(100, 1);//重新获取元素执行动画，否则不明原因无法实现
                if ($(this).find('.robotFun').length > 0) {
                    $(this).find('.robotFun').stop().animate({left: 0}, 100);
                }
                if ($(this).find('.userFun').length > 0) {
                    $(this).find('.userFun').stop().animate({right: 0}, 100);
                }
            }
        })
        .on('mouseleave', '.msgContainer', function () {
            if (isTransitionSupported()) {
                $(this).removeClass('msgFunHover');
            } else {
                var msgFunElement = $(this).find('.msgFun');
                msgFunElement.children('span').stop().animate({fontSize: '15px'}, 100);
                $2(msgFunElement).fadeTo(100, 0);//重新获取元素执行动画，否则不明原因无法实现
                if ($(this).find('.robotFun').length > 0) {
                    $(this).find('.robotFun').stop().animate({left: -5}, 100);
                }
                if ($(this).find('.userFun').length > 0) {
                    $(this).find('.userFun').stop().animate({right: -5}, 100);
                }
            }
        });

    $(document)
        .on('mouseenter', '.msgFun span', function () {
            if (isTransitionSupported()) {
                $(this).addClass('msgFunButtonHover');
            } else {
                $(this).stop().animate({backgroundColor: "#e3e3e3"}, 200, "easeInOut");
            }
        })
        .on('mouseleave', '.msgFun span', function () {
            if (isTransitionSupported()) {
                $(this).removeClass('msgFunButtonHover');
            } else {
                $(this).stop().animate({backgroundColor: "rgba(255,255,255,0)"}, 200, "easeInOut");
            }
        });
});

function ClipboardCopy(text, callback) {
    /*
    if (ClipboardJS.isSupported()) {
        var tempElement = $("<button>click</button>").get(0);
        var clipboard = new ClipboardJS(tempElement);
        clipboard.text = function () {
            clipboard.destroy();
            return text;
        };
        clipboard.on('success', function (e) {
            if (typeof callback === "function") {
                callback.call(null, true, e)
            }
        });
        clipboard.on('error', function (e) {
            if (typeof callback === "function") {
                callback.call(null, false, e)
            }
        });
        tempElement.click();
    }
     */
    if (typeof callback !== "function") {
        callback = function () {

        };
    }
    window.ClipboardPlugin.Copy(text, function (status, message) {
        if (status === 'error') {
            callback(false, message)
        } else if (status === 'success') {
            callback(true, message)
        }
    });
}

function runAllAdjustmentsFunctions() {
    Reset_function_box_position();
    changeInterfaceSizeAndPosition();
    runResizeStartFunction();
}

function heightAdaptationOfUserInput(userInput) {
    var ChatContent = $('#chat_content');
    userInput.style.height = '45px';
    var thisParent = $(userInput).parent().parent().get(0);
    var thisPParent = $(userInput).parent().parent().parent().get(0);
    var newHeight = userInput.scrollHeight;
    if (newHeight < 45) {
        newHeight = 45;
    }
    if (newHeight > (ChatContent.height() - 55)) {
        newHeight = ChatContent.height() - 55;
    }
    userInput.style.height = '';
    runResizeStartFunction();
    thisParent.style.height = (newHeight + 5) + 'px';
    thisPParent.style.height = (newHeight + 35) + 'px';
}


$(document).ready(function () {
    var userInput = $('#userInput');
    var textareaParent = $('#textarea_parent');
    userInput.focus(function () {
        textareaParent.addClass('childFocus');
    });

    userInput.blur(function () {
        textareaParent.removeClass('childFocus');
    });
});
$(document).ready(function () {
    $(document)
        .on('mouseenter', '*', function () {
            $(this).addClass('hover');
        })
        .on('mouseleave', '*', function () {
            $(this).removeClass('hover');
        })
        .on('focus', '*', function () {
            $(this).addClass('focus');
        })
        .on('blur', '*', function () {
            $(this).removeClass('focus');
        })
        .on('mousedown', '*', function () {
            $(this).addClass('active');
        })
        .on('mouseup', '*', function () {
            $(this).removeClass('active');
        });

    $(document)
        .on('focus', '.msgBox', function () {
            $(this).addClass('msgBoxFocus');
        })
        .on('blur', '.msgBox', function () {
            $(this).removeClass('msgBoxFocus');

        });
    $(document).on('click', function (event) {
        if (($(event.target).closest('.msgFun span').text() === '保存') || ($(event.target).closest('.PromptPopUpWindowContainer').length > 0)) {

        } else {
            var editMsgBox = $(".msgBox").filter(function () {
                return $(this).attr('contenteditable') === 'true';
            });
            if (editMsgBox.hasClass('msgBoxFocus')) {
                return;
            }
            if (editMsgBox.length > 0) {
                var windowOperation = PromptPopUpWindow.confirmPopUpWindow({
                    title: '',
                    content: $("<p style='padding: 0;margin: 0'>您还有未保存的编辑，继续将取消更改，确定要继续吗？</p>"),
                    callback: function (confirm) {
                        if (confirm === true) {
                            SaveMsgObj.editMessage(editMsgBox.text(), editMsgBox.data('id'));
                            SaveMsgObj.editContenteditable();
                            editMsgBox.parent().children('.msgFun').children('span:contains("保存")').text('编辑');
                        } else if (confirm === false) {
                            editMsgBox.parent().scrollintoview({
                                    duration: 500,
                                    direction: 'vertical',
                                    complete: function () {
                                        editMsgBox.addClass('msgBoxFocus');
                                        editMsgBox.parent().addClass('msgFunHover');
                                    }
                                }
                            );

                            editMsgBox.focus();
                        } else {
                            //放弃更改
                            SaveMsgObj.editContenteditable();
                        }
                    },
                    confirmBtn: '保存',
                    confirmTitle: '保存编辑',
                    cancelBtn: '编辑',
                    cancelTitle: '定位并编辑消息',
                    buttons: [
                        {
                            html: '继续',
                            title: '放弃更改',
                            click: function (OperationObject) {
                                OperationObject.close('放弃更改');
                            },
                            'class': 'PromptPopUpWindowButtonCancel'
                        }
                    ]
                });
                windowOperation.open();
            }
        }

    });
});
$(document).ready(function () {
    $('#messageListSwitch').click(function () {
        var FunBar = $('#leftFunctionBar');
        var FunBarStatus = FunBar.data('status');
        if (FunBarStatus === 'auto') {
            if (documentSize.width() < 700) {
                FunBar.data('status', 'show');
            } else {
                FunBar.data('status', 'hide');
            }
        } else if (FunBarStatus === 'hide') {
            FunBar.data('status', 'show');
        } else if (FunBarStatus === 'show') {
            FunBar.data('status', 'hide');
        } else {
            FunBar.data('status', 'auto');
        }
        Reset_function_box_position();
        setTimeout(function () {
            runAllAdjustmentsFunctions();
        }, 200)
    });
    $('#userInput').on("input keyup change blur focus click", function () {
        runAllAdjustmentsFunctions();
    })
    $('#tfc_show_btn').click(function () {
        var TfcShowBtn = $('#tfc_show_btn');
        var status = TfcShowBtn.data('status');
        if (status !== 'show' && status !== 'hide') {
            TfcShowBtn.data('status', 'hide');
        }
        status = TfcShowBtn.data('status');
        if (status === 'hide') {
            TfcFuns.Show();
        } else {
            TfcFuns.Hide();
        }
    });
    $('#send-btn').click(function () {
        var UserInput = $('#userInput');
        var ifSTB = SaveMsgObj.ifScrollToBottom();
        SaveMsgObj.newUserMessage(UserInput.val());
        setTimeout(function () {
            if (ifSTB) {
                SaveMsgObj.scrollTopBottom();
            }

        }, 100);
        UserInput.val('');
        runAllAdjustmentsFunctions();
        var NewMessages = [];
        var MsgId;
        for (var i = 0; i < SaveMsgObj.messages.length; i++) {
            NewMessages.push({'role': SaveMsgObj.messages[i]['role'], 'content': SaveMsgObj.messages[i]['content']})
        }
        var incomingParameters = {

            model: 'gpt-3.5-turbo-16k',
            messages: NewMessages,
            temperature: 0.9,
            max_tokens: 4096,
            top_p: 1.0,
            frequency_penalty: 0,
            presence_penalty: 0.6,
            stream: true
        };
        // SaveMsgObj.log(NewMessages);
        var PostUrl = SettingConfigObj.get("BaseUrl");
        var headers = {};
        headers["Content-Type"] = "application/json";
        if ('headers' in PostUrl) {
            $.mergeObjects(headers, PostUrl.headers);
        }
        MsgId = SaveMsgObj.newBotMessage();
        var robotBox = SaveMsgObj.getMsgBox(MsgId);
        robotBox.parent().children('.robotFun').append('<span>停止</span>');
        if (isIE7OrLower()) {
            ModifyMessageBoxWidth();//手动设置自适应文本宽度(大概适应)
        }
        var protocol = (window.location.protocol.indexOf('https') === 0) ? 'https://' : 'http://';
        PostUrl.domain = protocol + PostUrl.domain;
        SaveMsgObj.log("请求接口：" + PostUrl.domain);
        var msgFunButtons = robotBox.parent().children('.msgFun').find('span');

        /*var returnMessageAjax = $.ajax({
            url: "//" + PostUrl.domain,
            data: JSON.stringify(incomingParameters),
            headers: headers,
            type: "Post",
            dataType: "text",
            xhrFields: {
                onprogress: function (e) {
                    console.log(e);
                    var response = e.currentTarget.response;
                    console.log(response);
                    var CurContent = SaveMsgObj.getApiContent(response);
                    // SaveMsgObj.log(CurContent);
                    SaveMsgObj.editMessage(CurContent, MsgId);
                },
                onload: function (e) {

                }
            },
            timeout: 1000 * 60 * 2,
            complete: function (XMLHttpRequest, status, e) {
                var response = XMLHttpRequest.responseText;
                var CurContent = SaveMsgObj.getApiContent(response);
                SaveMsgObj.log('机器人回复：\n', CurContent);
                SaveMsgObj.editMessage(CurContent, MsgId);
                // SaveMsgObj.editMessage(CurContent, MsgId);

            }
        });*/
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    // 创建XMLHttpRequest对象失败
                }
            }
        } else {
            // 浏览器不支持AJAX
            xhr = null;
        }
        try {
            xhr.open("POST", PostUrl.domain, true);
        } catch (e) {
            console.warn("请求错误:", e)
            var stopSpan = SaveMsgObj.findFunBtn(msgFunButtons);
            stopSpan.remove();
            SaveMsgObj.editMessage("请求错误：" + e["description"], MsgId);
            return;
        }
        for (var header in headers) {
            xhr.setRequestHeader(header, headers[header]);
        }
        var requestAborted = false;
        xhr.onreadystatechange = function () {
            if (requestAborted) {
                // 处理请求被中断的情况
                // console.log('请求被中断');
                return;
            }
            // console.log(xhr.responseText);
            var response;
            var CurContent;
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    response = xhr.responseText;
                    CurContent = SaveMsgObj.getApiContent(response);
                    SaveMsgObj.log('机器人回复：\n', CurContent);
                    SaveMsgObj.editMessage(CurContent, MsgId);
                } else if (xhr.status === 0) {
                    // 发生"拒绝访问"错误
                    console.log("发生拒绝访问错误");
                } else {
                    // 处理请求失败的情况
                    console.error('请求失败，状态码：', xhr.status);
                    CurContent = "请求失败，状态码：" + xhr.status;
                    SaveMsgObj.editMessage(CurContent, MsgId);
                }
                robotBox.data("stopCode").call();
            } else if (xhr.readyState === 3) {
                console.log("处理流数据中");
                try {
                    response = xhr.responseText;
                    CurContent = SaveMsgObj.getApiContent(response);
                } catch (e) {
                    console.log("错误", e);
                    CurContent = "由于“ " + e["description"] + " ”错误，当前不支持流请求数据，所以请等待ChatGPT回答完毕后才可获取回答。（当前正在获取回答中，您不必重新发送问题。）";


                }
                SaveMsgObj.editMessage(CurContent, MsgId);

            }
        };
        try {
            xhr.onerror = function () {
                // 发生网络错误
                console.log("网络错误");
            };
        } catch (e) {

        }

        try {
            xhr.ontimeout = function () {
                // 请求超时
                console.log("请求超时");
            };
        } catch (e) {

        }

        try {
            xhr.onabort = function () {
                // 请求被中止
                console.log("请求被中止");
            };
        } catch (e) {

        }

        try {
            xhr.timeout = 1000 * 60 * 2;
        } catch (e) {

        }
        xhr.send(JSON.stringify(incomingParameters));
        // 中断流请求
        if (robotBox) {
            robotBox.data("stopCode", function () {
                requestAborted = true;
                xhr.abort();
                var stopSpan = SaveMsgObj.findFunBtn(msgFunButtons);
                stopSpan.remove();
                robotBox.data("stopCode", null);

            });
        }

        runAllAdjustmentsFunctions();
    });

    $(document).on("click", ".msgFun span", function () {
        var btn = $(this);
        var btnText = btn.text();
        var msgContainer = btn.parent().parent();
        var msgBox = $(msgContainer).children().not('.msgFun');
        var msgId = msgBox.data('id');
        if (btnText === '复制') {
            ClipboardCopy(SaveMsgObj.getMsgContent(msgId), function (status, event) {
                if (status) {
                    btn.text('成功');
                } else {
                    console.log("复制失败", event);
                    btn.text('失败');
                }
            });
            setTimeout(function () {
                btn.text('复制');
            }, 1000);

        } else if (btnText === '删除') {
            if (msgBox.data("stopCode")) {
                msgBox.data("stopCode").call();
            }
            SaveMsgObj.removeMsg(msgId);
        } else if (btnText === '停止') {
            msgBox.data("stopCode").call();
        } else if (btnText === '编辑') {
            var editMsgBox = $(".msgBox").filter(function () {
                return $(this).attr('contenteditable') === 'true';
            });
            if (editMsgBox.length > 0) {

            } else {
                SaveMsgObj.editContenteditable();
                btn.text("保存");
                var rawContent = SaveMsgObj.getMsgContent(msgId);
                msgBox.text(rawContent);
                msgBox.attr("contenteditable", "true");
                msgBox.focus();
            }
        } else if (btnText === '保存') {
            SaveMsgObj.editMessage(msgBox.text(), msgId);
            SaveMsgObj.editContenteditable();
            btn.text("编辑");
        } else if (btnText === '发送') {
            var Preliminary_questions = SaveMsgObj.getMsgContent(msgId);
            var UserInput = $('#userInput');
            var uiv = UserInput.val();
            UserInput.val(Preliminary_questions);
            SendBtnClick()
            UserInput.val(uiv);
        }
    });
    $(document).on("click", ".msgPreBox .BoxPreCopyBtn", function () {
        var btn = $(this);
        var msgPreBox = $(btn.parent());
        var pre = msgPreBox.children().not('.BoxPreCopyBtn');
        var code = pre.children();
        if (btn.text() === "复制代码") {
            ClipboardCopy(code.text(), function (status, event) {
                if (status) {
                    btn.text('复制成功');
                } else {
                    console.log("复制失败", event);
                    btn.text('复制失败');
                }
            });
            setTimeout(function () {
                btn.text('复制代码');
            }, 1000);

        }
    });

});

function polyfillCallback() {
    console.log('Polyfill', 'Start')
}

function SendBtnClick() {
    $(document).ready(function () {
        $('#send-btn').click();
    });
}
