function SettingConfigConstructor() {
    var SettingConfig = {
        isObject: function (variable) {
            return window.jQuery.isObject(variable);
        },
        AEStest: function () {//AES加密测试
            // 定义待加密的明文和密钥
            var plaintext = "Hello, World!";
            var key = "0123456789abcdef";

            // 进行AES加密
            var ciphertext = CryptoJS.AES.encrypt(plaintext, key).toString();

            // 输出加密结果
            console.log("密文：" + ciphertext);

            // 进行AES解密
            var bytes = CryptoJS.AES.decrypt(ciphertext, key);
            var decryptedPlaintext = bytes.toString(CryptoJS.enc.Utf8);

            // 输出解密结果
            console.log("解密后的明文：" + decryptedPlaintext);
        },
        check: function () {
            if (!this["SC"]) {
                if ($.LS.getItem('setting-config') === undefined || $.LS.getItem('setting-config') === null) {
                    this.init();
                }
                this.SC = JSON.parse($.LS.getItem('setting-config'))
            }
            var SC = this.SC;
            if (!this.isObject(SC)) {
                this.init();
                SC = JSON.parse($.LS.getItem('setting-config'));
            }
            if (!('BaseUrl' in SC)) {
                SC.BaseUrl = 1;
            }
            this.Save(SC);
            return SC;
        },
        init: function () {
            var SC = {};
            $.LS.setItem("setting-config", JSON.stringify(SC));
        },
        Save: function (setting) {
            if (!setting) {
                setting = this.SC;
            }
            $.LS.setItem("setting-config", JSON.stringify(setting));
        },
        get: function (key) {
            var SC = this.check();
            if (key === 'BaseUrl') {
                if (SC.BaseUrl) {
                    return this.BaseUrlList(SC.BaseUrl);
                } else {
                    SC.BaseUrl = 1;
                    this.Save(SC);
                    return this.BaseUrlList(SC.BaseUrl);
                }
            }
        },
        modify: function (key, value) {
            var SC = this.SC;
            if (key === 'BaseUrl') {
                if (value) {
                    if (this.BaseUrlList(value) !== null) {
                        SC.BaseUrl = value;
                        this.Save();
                        return true;
                    } else {
                        return false;
                    }

                } else {
                    return false;
                }
            }
        },
        base_url: [
            {
                'domain': 'api-collect.idcdun.com/v1/chat/completions',//postapi.lbbai.cc
                'encryption': false,
                'description': '这是默认的 源地址 ，是免费的。',
                'headers': {
                    // 'Origin': 'https://26994461491.gpt150.xyz',
                    // 'Referer': 'https://26994461491.gpt150.xyz/',
                    // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
                    'Content-Type': 'application/json',
                    // 'Host': 'openai.lbbai.cc'
                },
                'models': [
                    "gpt-4"
                ],
                'id': 1
            },
            {
                'domain': 'api.xyhelper.cn/v1/chat/completions',
                'encryption': false,
                'description': '这是 https://ss.sbai.free.hr/ 的接口。',
                'headers': {
                    'Authorization': 'Bearer sk-api-xyhelper-cn-free-token-for-everyone-xyhelper'
                },
                'id': 2
            },
            {
                'domain': 'U2FsdGVkX19cvRBxUkOPFmmsJIhzsZrVe4os0m9IKaQ=',
                'encryption': true,
                'description': '这是一个普通的 源地址 ，需要输入密码以解开。',
                'id': 3
            },
            {
                'domain': 'api.openai.com/v1/chat',
                'encryption': false,
                'description': '这是OpenAI官方的接口地址，需要使用境外网络以及自己的 api key 以使用。',
                'id': 4
            },
            {
                'domain': 'api.chatanywhere.com.cn/v1/chat/completions',
                'encryption': false,
                'description': '这是ai.tentech.top(https://github.com/tentechtop/Free-chatGPT-api)的接口地址。',
                'headers': {
                    'Authorization': 'Bearer sk-7eLfqi1RRheP7HpkQswwrRqqUQLae0OScbjru8plvZGsGtiM',
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Origin": "https://ai.tentech.top",
                    "Referer": "https://ai.tentech.top/",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0"
                },
                'models': [
                    "gpt-3.5-turbo-1106"
                ],
                'id': 5
            },
            {
                'domain': 'chat.weijiajin.com/api/openai/v1/chat/completions',
                'encryption': false,
                'description': '这是 https://chat.weijiajin.com/ 的接口。',
                'id': 6
            }
        ]
        ,
        BaseUrlList: function (id) {
            if (typeof id === 'undefined') {
                id = false;
            }
            var BUL = JSON.parse(JSON.stringify(this.base_url))//防止直接操作 this.base_url
            if (id === false) {
                return BUL;
            }
            for (var i = 0; i < BUL.length; i++) {
                if (BUL[i].id === id) {
                    if (BUL[i].encryption === false) {
                        return BUL[i];
                    }
                }
            }
            return null;
        }
    }

    SettingConfig.check();
    window.SettingConfigObj = SettingConfig;

}

SettingConfigConstructor();