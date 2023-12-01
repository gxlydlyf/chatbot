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
            var Element = $('<div class="' + ContainerClass + ' msgContainer"><div class="msgFun ' + FunClass + ' disable-selection no-scrollbar"><span>删除</span>' + copyBtn + '<span>编辑</span><span>发送</span></div><div class="' + BoxClass + '"></div></div>');
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
            $("*").not("input, textarea, #textarea_parent, label").attr("contenteditable", "false");
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
        TFC.animate({
            'top': '-60px'
        }, 50);
        TfcShowBtn.data('status', 'hide');
        this.BtnBottom();
    },
    Show: function () {
        var TfcShowBtn = $('#tfc_show_btn');
        var TFC = $('#top_function_container');
        var FbInTFC = $('#top_function_container .fu-btn');

        TFC.css('top', '-60px');
        FbInTFC.css('display', 'inline-block');

        TFC.animate({
            'top': '0'
        }, 50);
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

function Reset_function_box_position() {
    var TFC = $('#top_function_container');
    var OFC = $('#outer_function_container');
    var TfcShowBtn = $('#tfc_show_btn');
    var FbInTFC = $('#top_function_container .fu-btn');
    var TfcBtn = $('#tfc_buttons');
    var ChatMsgs = $('#chat_messages');
    var ChatContent = $('#chat_content');
    var FunBar = $('#leftFunctionBar');
    if (documentSize.width() > 700) {
        FunBar.show();
        if (isCalcSupported()) {
            ChatContent.width('calc(100% - 300px)');
        } else {
            ChatContent.width((documentSize.width() - 300) + 'px');
        }
    } else {
        FunBar.hide();
        ChatContent.width('100%');
    }
    if (ChatContent.width() > 500) {
        // 可用宽度大于500px时执行的命令
        // console.log('可用宽度大于500px');
        //TFC.children().not('#tfc_show_btn').children().prependTo(OFC);
        TfcBtn.children().prependTo(OFC);


        TFC.animate({
            'top': '-80px'
        }, 100);
        TfcShowBtn.data('status', 'hide');
        TfcFuns.BtnBottom();
        setTimeout(function () {
            TFC.css("display", "none");
        }, 100)

        OFC.animate({
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
            TFC.animate({
                'top': '0'
            }, 50);
            TfcShowBtn.data('status', 'show');
            TfcFuns.BtnTop();
        } else {
            TFC.animate({
                'top': '-60px'
            }, 50);
            TfcShowBtn.data('status', 'hide');
            TfcFuns.BtnBottom();
        }
        OFC.animate({
            'right': '-55px'
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

Reset_function_box_position();
// $(window).resize(function () {
//     Reset_function_box_position()
// });
function windowResize(callback) {
    if (typeof window.addEventListener === "undefined" && typeof window.attachEvent !== "undefined") {
        // IE5 or older browser
        window.attachEvent("onresize", function () {
            callback.call();
        });
    } else {
        // Modern browsers
        window.addEventListener("resize", function () {
            callback.call();
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
})


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

    var maxWidthPercent = 80; // 最大宽度百分比
    var containerWidth = $('#chat_messages').width();
    var maxWidth = Math.floor(containerWidth * (maxWidthPercent / 100)); // 计算最大宽度

    content.width(maxWidth); // 设置宽度为最大宽度，单位是px

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

function isCalcSupported() {
    var el = document.createElement('div');
    try {
        el.style.width = 'calc(1px + 1px)';
    } catch (e) {
        return false;
    }

    return !!el.style.width;
    /*
if (isCalcSupported()) {
    console.log('当前浏览器支持 calc 运算符');
} else {
    console.log('当前浏览器不支持 calc 运算符');
}
  */
}

if (!isCalcSupported()) {
    console.log("不支持calc() css运算");
    resizeStartFunction = function () {
        var ChatMsgs = $('#chat_messages');
        var ChatContent = $('#chat_content');
        ChatMsgs.css('height', (ChatContent.height() - 70) + 'px');

        if (ChatMsgs.css("margin-right") !== '0px') {
            ChatMsgs.css('width', (ChatContent.width() - 60) + 'px');
        } else {
            ChatMsgs.css('width', '100%');
        }
    }//手动跳转#chat_messages高度为 100%-70px
    resizeStartFunction();
    windowResize(function () {
        resizeStartFunction();
    });

}

$(document).ready(function () {
    $(document).on('mouseenter', '.msgContainer', function () {
        $(this).addClass('msgFunHover');
    });

    $(document).on('mouseleave', '.msgContainer', function () {
        $(this).removeClass('msgFunHover');
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

$(document).ready(function () {
    var userInput = $('#userInput');
    var textareaParent = $('#textarea_parent');
    userInput.focus(function () {
        textareaParent.addClass('active');
    });

    userInput.blur(function () {
        textareaParent.removeClass('active');
    });
});
$(document).ready(function () {
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


    });

    $('#more-btn').click(function () {
        var MoreBtnElm = $('#more-btn');
        var SendBtnElement = $('#send-btn');
        var ClearBtnElement = $('#clear-btn');
        if (MoreBtnElm.data("state") !== "open") {
            MoreBtnElm.data("state", "open");
            MoreBtnElm.addClass('transform-rotate-180');
            ClearBtnElement.animate({opacity: 1}, 200);
            $("#userInput").prop("readonly", true);//不允许输入
            $('#textarea_parent').width(0);
            SendBtnElement.width(0);
            SendBtnElement.height(0);
            ClearBtnElement.width(50);
            ClearBtnElement.height(50);
        } else {
            MoreBtnElm.data("state", "close");
            MoreBtnElm.removeClass('transform-rotate-180');
            ClearBtnElement.animate({opacity: 0}, 200);
            $("#userInput").prop("readonly", false);//不允许输入
            $('#textarea_parent').width('50%');
            SendBtnElement.width(50);
            SendBtnElement.height(50);
            ClearBtnElement.width(0);
            ClearBtnElement.height(0);

        }
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
            btn.text("保存");
            SaveMsgObj.editContenteditable();
            var rawContent = SaveMsgObj.getMsgContent(msgId);
            msgBox.text(rawContent);
            msgBox.attr("contenteditable", "true");
            msgBox.focus();
        } else if (btnText === '保存') {
            SaveMsgObj.editContenteditable();
            SaveMsgObj.editMessage(msgBox.text(), msgId);
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
