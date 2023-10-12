var sourceBaseUrl = "./SyntaxHighlighterSrc/";
var themeDefaultName = 'desert';
if (window.SHLconfig) {
    if (window.SHLconfig.srcPath) {
        sourceBaseUrl = window.SHLconfig.srcPath;

    }
    if (window.SHLconfig.theme) {
        if (window.SHLconfig.theme === true || window.SHLconfig.theme === 'light') {
            themeDefaultName = 'default';
        } else {
            themeDefaultName = 'desert';
        }
    }
}
var sources = [
    "lang/common.js",
    "lang/apollo.js",
    "lang/clj.js",
    "lang/coffee.js",
    "lang/css.js",
    "lang/go.js",
    "lang/hs.js",
    "lang/lisp.js",
    "lang/lua.js",
    "lang/ml.js",
    "lang/n.js",
    "lang/php.js",
    "lang/proto.js",
    "lang/scala.js",
    "lang/sql.js",
    "lang/tex.js",
    "lang/vhdl.js",
    "lang/wiki.js",
    "lang/vb.js",
    "lang/xq.js",
    "lang/yaml.js"
];


document.write("<script src=\"" + sourceBaseUrl + "syntaxhighlighter.js\"><\/script>");
document.write("<link rel=\"stylesheet\" href=\"" + sourceBaseUrl + "syntaxhighlighter.css" + "\">");

for (var i = 0; i < sources.length; ++i) {
    document.write("<script src=\"" + sourceBaseUrl + sources[i] + "\"><\/script>");
}

document.write("<link id=\"SyntaxHighlighterTheme\" rel=\"stylesheet\" href=\"" + sourceBaseUrl + "themes/" + themeDefaultName + ".css" + "\">");

function changeSyntaxHighlighterTheme(mode) {
    var fileName = '';
    if (mode === true || mode === 'light') {
        fileName = 'default';
    } else {
        fileName = 'desert';
    }
    document.getElementById('SyntaxHighlighterTheme').href = sourceBaseUrl + 'themes/' + fileName + '.css';
}