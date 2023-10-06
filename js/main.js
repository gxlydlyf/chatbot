function SaveMsgConstructor() {
    SaveMsgObj = {

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

            return (scrollTop + innerHeight >= scrollHeight);
        },


        createMsgOperate: function () {
            var MsgOperate = [];
            var tempSave;
            var tempSaveList = [];
            for (var i = 0; i < this.messages.length; i++) {
                tempSave = this.messages[i];
                tempSaveList.push(tempSave);
                tempSave['id'] = this.generateUniqueString();
                MsgOperate.push(tempSave);
            }
            this.MsgOperate = MsgOperate;
            this.log('创建聊天信息变量', '过程：', tempSaveList, '结果：', this.MsgOperate);
            this.saveMsgs();
        },

        createBotElement: function (data) {
            var copyBtn = '';
            if (ClipboardJS.isSupported()) {
                copyBtn = '<span>复制</span>';
            }
            var Element = $('<div class="robotBoxContainer"><div class="msgFun robotFun disable-selection no-scrollbar"><span>删除</span>' + copyBtn + '<span>编辑</span></div><div class="robotBox"></div></div>');
            Element.find('.robotBox').data('id', data['id']);
            Element.find('.robotBox').text(data['content']);
            return Element;
        },

        createUserElement: function (data) {
            var copyBtn = '';
            if (ClipboardJS.isSupported()) {
                copyBtn = '<span>复制</span>';
            }
            var Element = $('<div class="userBoxContainer"><div class="msgFun userFun disable-selection no-scrollbar"><span>删除</span>' + copyBtn + '<span>编辑</span><span>发送</span></div><div class="userBox"></div></div>')
            Element.find('.userBox').text(data['content']);
            Element.find('.userBox').data('id', data['id']);
            return Element;
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

        },

        newMsgOperateUserMsg: function (message) {
            var msg = message;
            msg['id'] = this.generateUniqueString();
            this.MsgOperate.push(msg);
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
            this.MsgOperate.push(msg);
            this.messages.push(message);
            var MsgId = msg['id'];
            this.saveMsgs();

            // console.log('机器人回复', msg);
            return MsgId;
        },


        editMessage: function (data, MsgId) {
            for (var i = 0; i < this.messages.length; i++) {
                if (this.messages[i].id === MsgId) {
                    this.messages[i].content = data;
                    this.saveMsgs();
                    var ChatMessagesParentElement = $('#chat_messages');
                    ChatMessagesParentElement.find('div').each(function () {
                        // 在这里对每个div元素进行操作
                        if ($(this).data('id') === MsgId) {
                            var ifSTB = SaveMsgObj.ifScrollToBottom();
                            $(this).text(data);
                            if (ifSTB) {
                                SaveMsgObj.scrollTopBottom();
                            }
                        }

                    });


                }

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
            $.LS.setItem("messages", JSON.stringify(this.messages));
        },


        generateUniqueString: function () {
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()~-=_+[]{}\\|;:,./<>?';
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
                    console.log("ok")
                    returnElement = $(this);
                }

            });
            return returnElement;

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

TfcFuns = {
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
    if ($(window).width() > 500) {
        // 可用宽度大于500px时执行的命令
        // console.log('可用宽度大于500px');
        //TFC.children().not('#tfc_show_btn').children().prependTo(OFC);
        TfcBtn.children().prependTo(OFC);


        TFC.animate({
            'top': '-80px'
        }, 100);
        TfcShowBtn.data('status', 'hide');
        TfcFuns.BtnBottom();

        OFC.animate({
            'right': '0px'
        }, 100);
        $('#chat_messages').animate({
            'margin-right': '60px'
        }, 100);

    } else {
        // console.log('可用宽度小于500px');
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
        $('#chat_messages').animate({
            'margin-right': '10px'
        }, 100);
    }

}

Reset_function_box_position();
$(window).resize(function () {
    Reset_function_box_position()
});

function ClipboardCopy(text, callback) {
    var tempElement = $("<button>click</buttpn>").get(0);
    var clipboard = new ClipboardJS(tempElement, {
        text: function () {
            clipboard.destroy();
            return text;
        },
    });
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
        if (ifSTB) {
            SaveMsgObj.scrollTopBottom();
        }
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
        SaveMsgObj.log("请求接口：" + location.protocol + "//" + PostUrl.domain);
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
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "//" + PostUrl.domain, true);
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
                    CurContent = "由于“ " + e + " ”错误，当前不支持流请求数据，所以请等待ChatGPT回答完毕后才可获取回答。（当前正在获取回答中，您不必重新发送问题。）";
                }
                SaveMsgObj.editMessage(CurContent, MsgId);

            }
        };
        xhr.timeout = 1000 * 60 * 2;
        xhr.send(JSON.stringify(incomingParameters));
        // 中断流请求
        if (robotBox) {
            robotBox.data("stopCode", function () {
                requestAborted = true;
                xhr.abort();
                var stopSpan = robotBox.parent().children('.msgFun').find('span').filter(function () {
                    return $(this).text().trim() === '停止';
                });
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
            $("*").attr("contenteditable", "false");
            var rawContent = SaveMsgObj.getMsgContent(msgId);
            msgBox.val(rawContent);
            msgBox.attr("contenteditable", "true");
            msgBox.focus();
        } else if (btnText === '保存') {
            $("*").attr("contenteditable", "false");
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

});

function polyfillCallback() {
    console.log('Polyfill', 'Start')
}

function SendBtnClick() {
    $(document).ready(function () {
        $('#send-btn').click();
    });
}
