window.multipleConversationManagementConstructor = function () {
    window.multipleConversationManagement = {
        conversations: $.LS.getItem('conversations'),
        isArray: jQuery.isArray,
        isObject: jQuery.isObject,
        OrdinaryArray: function (json_array) {
            return JSON.parse(JSON.stringify(json_array))
        },
        checkConversations: function () {
            var This = this;
            var isArray = This.isArray;
            var isObject = This.isObject;
            var generateRandomId = This.generateRandomId;
            var i;
            var Conversations;
            try {
                Conversations = JSON.parse(This.conversations);
            } catch (e) {
                this.initializeAllConversations();
                Conversations = JSON.parse(This.conversations);
            }
            if (!isArray(Conversations)) {
                this.initializeAllConversations();
            }
            if (!Conversations) {
                this.initializeAllConversations();
            }
            if (!Conversations) {
                this.initializeAllConversations();
            }
            if (Conversations.length === 0) {
                this.initializeAllConversations();
            }
            var ItContainTheCurrentConversations = false;
            var ConversationIDList = []
            for (i = 0; i < Conversations.length; i++) {
                var conversation = Conversations[i];
                if (!isObject(conversation)) {
                    Conversations[i] = this.ConversationalFormat()
                    continue;
                }
                if (!conversation.hasOwnProperty('type')) {
                    conversation.type = "normal";
                } else {
                    if (conversation.type === 'current') {
                        if (ItContainTheCurrentConversations === true) {
                            conversation.type = 'normal'
                        }
                        ItContainTheCurrentConversations = true;
                    } else {
                        conversation.type = "normal";
                    }
                }

                if (!conversation.hasOwnProperty('id')) {
                    conversation["id"] = generateRandomId();
                }
                if (conversation['id'] in ConversationIDList) {
                    conversation["id"] = generateRandomId();
                }
                ConversationIDList.push(conversation["id"]);
                if (!conversation.hasOwnProperty('messages')) {
                    conversation.messages = [];
                }
                if (!conversation.hasOwnProperty('name')) {
                    conversation.name = "对话";
                }
                Conversations[i] = this.ConversationalFormat(
                    conversation.type,
                    conversation["id"],
                    conversation.messages,
                    conversation.name
                )
            }
        },
        getAllConversations: function () {
            this.checkConversations();
            return this.OrdinaryArray(this.conversations);
        },
        initializeAllConversations: function () {
            this.conversations = [
                this.ConversationalFormat("current", null, null, "默认对话")
            ];
            this.saveConversations();
        },
        saveConversations: function (Conversations) {
            if (!Conversations) {
                Conversations = this.conversations;
            }
            $.LS.setItem("conversations", JSON.stringify(Conversations));
        },
        generateRandomId: function (length) {
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            var id = "";

            for (var i = 0; i < length; i++) {
                var randomIndex = Math.floor(Math.random() * chars.length);
                id += chars.charAt(randomIndex);
            }

            return id;
        },
        setCurrentConversation: function (id) {
            this.checkConversations();
            $.each(this.conversations, function (index, item) {
                item.type = 'normal';
            });
            var conversation = $.grep(this.conversations, function (item) {
                return item['id'] === id;
            });
            if (conversation >= 1) {
                conversation = conversation[0]
            } else {
                return false;
            }
            conversation.type = 'current'
            return conversation;
        },
        addConversation: function (name) {
            this.conversations.push(this.ConversationalFormat('', '', '', name))
        },
        removeConversation: function (id) {
            var conversation = $.grep(this.conversations, function (item) {
                return item['id'] === id;
            });
            if (conversation >= 1) {
                delete conversation[0]
                return true
            } else {
                return false;
            }
        },
        MsgOperate: function () {
            return $.grep(this.conversations, function (item) {
                return item['type'] === 'current';
            });
        },
        ConversationalFormat: function (type, id, messages, name) {
            var EqualToUN = function (variable) {
                return variable === undefined || variable === null || variable === ''
            }
            if (EqualToUN(type)) {
                type = "normal"
            }
            if (EqualToUN(id)) {
                id = this.generateRandomId(10)
            }
            if (EqualToUN(messages)) {
                messages = []
            }
            if (EqualToUN(name)) {
                name = "新对话"
            }
            return {
                "type": type,
                "id": id,
                "messages": messages,
                "name": name
            }
        },
        checkMessages: function (messages) {
            if ((messages === null) || (messages === undefined)) {
                messages = []
            }
            $.each(messages, function (index, item) {
                if (!((item.role === 'system') || (item.role === 'user') || (item.role === 'assistant'))) {
                    messages[index].role = 'user'
                    messages[index].content = ''
                } else {
                    if (typeof item.content !== 'string') {
                        messages[index].content = ''
                    }
                }
            });
            return messages
        },
        log: function () {
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
    $.each(multipleConversationManagement.conversations, function (index, item) {
        $.each(item.messages, function (index, item) {
            item.type = 'normal';
        });
    });
}