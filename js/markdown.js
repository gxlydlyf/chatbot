function parseMarkdown(markdownText) {
    // 解析标题
    var regex = /^(#+)\s+(.*)$/gm;
    markdownText = markdownText.replace(regex, function (match, hashes, title) {
        var level = hashes.length;  // 确定标题级别
        return "<h" + level + ">" + title + "</h" + level + ">";
    });

    // 解析代码块
    regex = /```([\s\S]*?)```/g;
    markdownText = markdownText.replace(regex, function (match, code) {
        return "<pre><code>" + code + "</code></pre>";
    });

    // 解析代码高亮
    regex = /`([^`\n]+)`/g;
    markdownText = markdownText.replace(regex, function (match, code) {
        return "<code>" + code + "</code>";
    });

    // 解析链接
    regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    markdownText = markdownText.replace(regex, function (match, text, url) {
        return "<a href='" + url + "'>" + text + "</a>";
    });

    // 解析粗体
    regex = /\*\*([^*]+)\*\*/g;
    markdownText = markdownText.replace(regex, function (match, content) {
        return "<strong>" + content + "</strong>";
    });

    // 解析斜体
    regex = /\*([^*]+)\*/g;
    markdownText = markdownText.replace(regex, function (match, content) {
        return "<em>" + content + "</em>";
    });

    return markdownText;
}

window.markdown = parseMarkdown;