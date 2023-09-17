var console = console || {
    log: function () {
        return false;
    }
};//兼容IE,当IE不支持console.log时，自定义一个包含log方法的对象给他