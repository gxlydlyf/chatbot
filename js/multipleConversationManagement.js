window.multipleConversationManagementConstructor = function () {
    window.multipleConversationManagement = {
        conversations: undefined,
        isArray: jQuery.isArray,
        isObject: jQuery.isObject,
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
            for (i = 0; i < Conversations.length; i++) {
                var conversation = Conversations[i];
                if (!isObject(conversation)) {
                    window.multipleConversationManagementConstructor();
                    return;
                }
                if (!conversation.hasOwnProperty('type')) {
                    conversation.type = "";
                } else {
                    if (conversation.type === 'current') {
                        ItContainTheCurrentConversations = true;
                    } else {
                        conversation.type = "";
                    }
                }

                if (!conversation.hasOwnProperty('id')) {
                    conversation.id = generateRandomId();
                }
                Conversations[i] = {'type': conversation.type, 'id': conversation.id}
            }
        },
        getAllConversations: function () {
            this.checkConversations();
            return this.conversations;
        },
        initializeAllConversations: function () {
            this.conversations = [
                {"type": "current", "id": "", "messages": []}
            ];
            this.saveConversations();
        },
        saveConversations: function (Conversations) {
            if (!Conversations) {
                Conversations = this.conversations;
            }
            $.LS.setItem("conversations", Conversations);
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
        addConversation: function () {

        }
    }
}