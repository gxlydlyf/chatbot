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
        BaseUrlList: function (id) {
            if (typeof id === 'undefined') {
                id = false;
            }
            var BUL = [
                {
                    'domain': 'lpi.glf.one',//postapi.lbbai.cc
                    'encryption': false,
                    'description': '这是默认的 源地址 ，是免费的。',
                    'headers': {
                        'Origin': 'https://8162403981.ai701.live',
                        'Referer': 'https://8162403981.ai701.live/',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
                    },
                    'id': 1
                },
                {
                    'domain': 'tud5ihkrrr.freet.top/api/openai/v1/chat/completions',//postapi.lbbai.cc
                    'encryption': false,
                    'description': '这是默认的 源地址2 ，是免费的。',
                    'headers': {
                        'Origin': 'https://8162403981.ai701.live',
                        'Referer': 'https://8162403981.ai701.live/'
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
                }
            ]
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