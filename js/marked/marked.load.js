markedHighlight = window.markedHighlight.markedHighlight;
marked = window.marked;
hljs = window.hljs;

var renderer = new marked.Renderer();


function escapeReplaceHtml(html) {//转义html为文本
    var text = document.createTextNode(html);
    var div = document.createElement('div');
    div.appendChild(text);
    return div.innerHTML;
}

function escapeReplaceText(text) {//转义文本为html
    var div = document.createElement('div');
    div.innerHTML = text;
    return div.innerHTML;
}

// 设置转义规则
renderer.html = function (html) {
    //  console.log("转义之前",html);
    var NewHtml = html;
    var escapeReplace = new RegExp(/ /.source, 'g');
    var escapeReplacements = {
        ' ': '&nbsp;',
    };
    NewHtml = escapeReplaceHtml(NewHtml).replace(escapeReplace, function (matched) {
        return escapeReplacements[matched];
    });
    // console.log("转移之后", NewHtml);
    return NewHtml;
};
renderer.text = function (text) {
    // console.log("转义之前",text);
    var escapeReplace = new RegExp(/[<>]/.source, 'g');
    var escapeReplacements = {
        '&lt;': '<',
        '&gt;': '>',
        '	': '&nbsp;&nbsp;',
    };
    var NewText = text.replace(escapeReplace, function (matched) {
        return escapeReplacements[matched];
    });
    NewText = escapeReplaceText(NewText);
    // console.log("转义之后",NewText)
    return NewText;
};
renderer.code = function (code, language) {
    return '<div class="msgPreBox"><span class="BoxPreCopyBtn disable-selection">复制代码</span><pre><code class="language-' + escape(language, true) + '">' + code + '</code></pre></div>';
};

//marked.marked.setOptions({
//    renderer: new marked.Renderer(),
//    pedantic: false,
//    gfm: true,
//    tables: true,
//    breaks: true,
//    sanitize: false,
//    smartLists: false,
//    smartypants: false,
//    xhtml: false,
//});

marked.use(
    markedHighlight({
        langPrefix: 'language-',
        highlight(code, lang) {
            // console.log(lang);
            var language = hljs.getLanguage(lang) ? lang : 'plaintext';
            // console.log(hljs.highlight(code, { language }));
            return hljs.highlight(code, {language}).value;
        }
    }),
    markedLinkifyIt({}, {}),
    {
        renderer: renderer,
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: true,
        sanitize: false,
        smartLists: false,
        smartypants: false,
        xhtml: false,
    }
);