class SaveMessages {
    constructor() {
        this.messages = JSON.parse(localStorage.getItem("messages"));
        this.checkMsg();
        this.createMsgOperate();
        var SaveMessagesObj = this;
        $(document).ready(function () {
            // 在DOM加载完成后执行的命令
            // 可以在这里操作DOM元素、绑定事件等
            SaveMessagesObj.loadMessagesElement();
            const ChatMessagesParentElement = $('#chat_messages');
            var scrollToBottom = ChatMessagesParentElement.prop('scrollHeight') - ChatMessagesParentElement.height();
            ChatMessagesParentElement.scrollTop(scrollToBottom);
        });


        // var messages = localStorage.getItem("messages")
        // if ()
    }

    createMsgOperate() {
        var MsgOperate = [];
        var tempSave;
        var tempSaveList = [];
        for (let i = 0; i < this.messages.length; i++) {
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
        var Element = $('<div class="robotBox"></div>')
        Element.data('id', data['id']);
        Element.text(data['content']);
        return Element;
    }

    createUserElement(data) {
        var Element = $('<div class="UserBox"></div>')
        Element.text(data['content']);
        Element.data('id', data['id']);
        return Element;
    }

    loadMessagesElement() {
        const ChatMessagesParentElement = $('#chat_messages');
        ChatMessagesParentElement.empty();
        for (let i = 0; i < this.messages.length; i++) {
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
        console.log('发送消息', msg);
        return msg['id'];
    }

    newUserMessage(message) {
        this.checkMsg();
        var msg = {'role': 'user', 'content': message};
        this.newMsgOperateUserMsg(msg);
        const ChatMessagesParentElement = $('#chat_messages');
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
    }

    addNextBotMsg(data, MsgId) {
        for (let i = 0; i < this.messages.length; i++) {
            if (this.messages[i].id === MsgId) {
                this.messages[i].content += data;
                this.saveMsgs();
                const ChatMessagesParentElement = $('#chat_messages');
                ChatMessagesParentElement.find('div').each(function () {
                    // 在这里对每个div元素进行操作
                    if ($(this).data('id') === MsgId) {
                        $(this).text($(this).text() + data)
                    }

                });


            }

        }
    }

    newBotMessage(message) {
        this.checkMsg();
        var msg = {'role': 'assistant', 'content': message};
        var MsgId = this.newMsgOperateUserMsg(msg);
        const ChatMessagesParentElement = $('#chat_messages');
        ChatMessagesParentElement.append(this.createBotElement(msg));

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

    log(...messages) {
        console.log('[Messages]', ...messages);
    }
}

var SaveMsgObj = new SaveMessages();
$('#send-btn').click(function () {
    console.log('s')
    var NewMessages;
    for (let i = 0; i < SaveMsgObj.messages.length; i++) {
        NewMessages.push({'role': SaveMsgObj.messages[i]['role'], 'content': SaveMsgObj.messages[i]['content']})
    }
    SaveMsgObj.log(NewMessages);
    var returnMessageAjax = $.ajax({
        url: "https://lpi.glf.one",
        data: JSON.stringify(NewMessages),
        type: "Post",
        dataType: "text",
        xhrFields: {
            onprogress: function (e) {
                let response = e.currentTarget.response;
                SaveMsgObj.log(response);
            },
            onload: function (e) {

            }
        },
        timeout: 1000 * 60 * 2,
        complete: function (XMLHttpRequest, status, e) {

        }
    });
})