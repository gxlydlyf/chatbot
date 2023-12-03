window.multipleConversationManagementConstructor = function () {
    window.multipleConversationManagement = {
        conversations: undefined,
        checkConversations: function () {
            var Conversations = this.conversations;
            if (!Conversations) {
                this.initializeAllConversations();
            }
            Conversations = this.conversations;
            if (Conversations.length === 0) {
                this.initializeAllConversations();
            }
            Conversations = this.conversations;
            var isThereACurrent = 0;
            for (var i = 0; i < Conversations.length; i++) {
                if (Conversations[i]) {

                }
            }
        },
        getAllConversations: function () {
            this.checkConversations();
            return this.conversations;
        },
        initializeAllConversations: function () {
            this.conversations = [
                {"type": "current", "id": ""}
            ];
            this.saveConversations();
        },
        saveConversations: function (Conversations) {
            if (!Conversations) {
                Conversations = this.conversations;
            }
            $.LS.setItem("conversations", Conversations);
        },
        addConversation: function () {

        }
    }
}