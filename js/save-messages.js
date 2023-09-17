class SaveMessages {
    constructor() {
        if (typeof localStorage === 'undefined') {
            localStorage = {};
        }

        this.messages = JSON.parse(localStorage.getItem("messages"));
        this.checkMsg();
        this.createMsgOperate();
        var SaveMessagesObj = this;
        $(document).ready(function () {
            // 在DOM加载完成后执行的命令
            // 可以在这里操作DOM元素、绑定事件等
            SaveMessagesObj.loadMessagesElement();
            SaveMessagesObj.scrollTopBottom()
        });


        // var messages = localStorage.getItem("messages")
        // if ()
    }

    scrollTopBottom() {
        var ChatMessagesParentElement = $('#chat_messages');
        var scrollToBottom = ChatMessagesParentElement.prop('scrollHeight') - ChatMessagesParentElement.height();
        ChatMessagesParentElement.scrollTop(scrollToBottom);
    }

    clearMessages() {
        localStorage.removeItem("messages")
    }

    ifScrollToBottom() {
        // this.log(this.isScrolledToBottom('#chat_messages'));
        return this.isScrolledToBottom('#chat_messages');

    }

    isScrolledToBottom(selector) {
        var element = $(selector);
        var scrollTop = element.scrollTop();
        var innerHeight = element.innerHeight();
        var scrollHeight = element[0].scrollHeight;

        return (scrollTop + innerHeight >= scrollHeight);
    }


    createMsgOperate() {
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
    }

    createBotElement(data) {
        var Element = $('<div class="robotBoxContainer"><div class="robotBox"></div></div>')
        Element.find('.robotBox').data('id', data['id']);
        Element.find('.robotBox').text(data['content']);
        return Element;
    }

    createUserElement(data) {
        var Element = $('<div class="userBoxContainer"><div class="userBox"></div></div>')
        Element.find('.userBox').text(data['content']);
        Element.find('.userBox').data('id', data['id']);
        return Element;
    }

    loadMessagesElement() {
        var ChatMessagesParentElement = $('#chat_messages');
        ChatMessagesParentElement.empty();
        for (var i = 0; i < this.messages.length; i++) {
            if (this.messages[i]['role'] === 'user') {
                ChatMessagesParentElement.append(this.createUserElement(this.messages[i]));
            } else if (this.messages[i]['role'] === 'assistant') {
                ChatMessagesParentElement.append(this.createBotElement(this.messages[i]));
            }

        }

    }

    newMsgOperateUserMsg(message) {
        var msg = message;
        msg['id'] = this.generateUniqueString();
        this.MsgOperate.push(msg);
        this.messages.push(message);
        this.saveMsgs();
        this.log('发送消息：\n', msg.content);
    }

    newUserMessage(message) {
        this.checkMsg();
        var msg = {'role': 'user', 'content': message};
        this.newMsgOperateUserMsg(msg);
        var ChatMessagesParentElement = $('#chat_messages');
        ChatMessagesParentElement.append(this.createUserElement(msg));

    }

    newMsgOperateBotMsg(message) {
        var msg = message;
        msg['id'] = this.generateUniqueString();
        this.MsgOperate.push(msg);
        this.messages.push(message);
        var MsgId = msg['id'];
        this.saveMsgs();

        // console.log('机器人回复', msg);
        return msg['id'];
    }


    addNextBotMsg(data, MsgId) {
        var SaveMessagesObj = this;
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
    }

    newBotMessage(message = '') {
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
    }

    initializeMsg() {
        this.messages = [];
        this.saveMsgs();
    }

    checkMsg() {
        var messages = this.messages;
        if ((messages === null) || (messages === undefined)) {
            this.log('初始化聊天信息');
            this.initializeMsg();
        }
    }

    saveMsgs() {
        localStorage.setItem("messages", JSON.stringify(this.messages));
    }


    generateUniqueString() {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()~-=_+[]{}\\|;:,./<>?';
        var uniqueString = '';
        for (var i = 0; i < 100; i++) {
            var randomIndex = Math.floor(Math.random() * characters.length);
            uniqueString += characters.charAt(randomIndex);
        }
        return uniqueString;
    }

    getApiContent(data) {
        var okContent = '';
        var response = data;

        var allLines = [];
        var currentLine = "";
        for (var l = 0; l < response.length; l++) {
            var char = response.charAt(l);
            if (char === "\n" || char === "\r") {
                allLines.push(currentLine);
                currentLine = "";
            } else {
                currentLine += char;
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
    }

    log(...messages) {
        console.log('[Messages]', ...messages);
    }
}


SaveMsgObj = new SaveMessages();

$(document).ready(function () {
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
        var headers = {};
        headers["Content-Type"] = "application/json";
        MsgId = SaveMsgObj.newBotMessage();
        var returnMessageAjax = $.ajax({
            url: "//lpi.glf.one",
            data: JSON.stringify(incomingParameters),
            headers: headers,
            type: "Post",
            dataType: "text",
            xhrFields: {
                onprogress: function (e) {
                    var response = e.currentTarget.response;
                    var CurContent = SaveMsgObj.getApiContent(response);
                    // SaveMsgObj.log(CurContent);
                    SaveMsgObj.addNextBotMsg(CurContent, MsgId);
                },
                onload: function (e) {

                }
            },
            timeout: 1000 * 60 * 2,
            complete: function (XMLHttpRequest, status, e) {
                var response = XMLHttpRequest.responseText;
                var CurContent = SaveMsgObj.getApiContent(response);
                SaveMsgObj.log('机器人回复：\n', CurContent);
                SaveMsgObj.addNextBotMsg(CurContent, MsgId);
                // SaveMsgObj.addNextBotMsg(CurContent, MsgId);

            }
        });
    });

    $('#more-btn').click(function () {
        var MoreBtnElm = $('#more-btn');
        var SendBtnElement = $('#send-btn');
        var ClearBtnElement = $('#clear-btn');
        if (MoreBtnElm.data("state") !== "open") {
            MoreBtnElm.data("state", "open");
            MoreBtnElm.addClass('transform-rotate-180');
            ClearBtnElement.animate({ opacity: 1 }, 200);
            $("#userInput").prop("readonly", true);//不允许输入
            $('#textarea_parent').width(0);
            SendBtnElement.width(0);
            SendBtnElement.height(0);
            ClearBtnElement.width(50);
            ClearBtnElement.height(50);
        } else {
            MoreBtnElm.data("state", "close");
            MoreBtnElm.removeClass('transform-rotate-180');
            ClearBtnElement.animate({ opacity: 0 }, 200);
            $("#userInput").prop("readonly", false);//不允许输入
            $('#textarea_parent').width('50%');
            SendBtnElement.width(50);
            SendBtnElement.height(50);
            ClearBtnElement.width(0);
            ClearBtnElement.height(0);

        }
    });
});

function polyfillCallback(){
    console.log('Polyfill','Start')
}