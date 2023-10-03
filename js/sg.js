var UserDataStorage = {
    userDataNamespace: "myUserData",
    userData: null,

    init: function () {
        if (typeof document.documentElement.addBehavior === "function") {
            this.userData = document.documentElement;
            this.userData.load(this.userDataNamespace);
        } else {
            // console.log("您的浏览器不支持userData。");
        }
    },

    setItem: function (key, value) {
        if (this.userData) {
            this.userData.setAttribute(key, value);
            this.userData.save(this.userDataNamespace);
        }
    },

    getItem: function (key) {
        if (this.userData) {
            this.userData.load(this.userDataNamespace);
            return this.userData.getAttribute(key);
        }
    },

    removeItem: function (key) {
        if (this.userData) {
            this.userData.removeAttribute(key);
            this.userData.save(this.userDataNamespace);
        }
    }
};

// 初始化userDataStorage
UserDataStorage.init();

// 使用示例
UserDataStorage.setItem("myData", "Hello, World!");
var myData = UserDataStorage.getItem("myData");
alert(myData); // 输出: Hello, World!
UserDataStorage.removeItem("myData");
