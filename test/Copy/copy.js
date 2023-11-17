function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // For IE5
        window.clipboardData.setData('Text', text);
    } else {
        // For modern browsers
        var textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}
