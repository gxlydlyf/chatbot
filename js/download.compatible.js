function downloadFile(url, filename) {
    var userAgent = window.navigator.userAgent;
    if (userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident") !== -1) {
        // For old versions of IE
        if (parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < 6) {
            window.location = url;
        } else {
            var iframe = document.createElement("iframe");
            iframe.style.display = "none";
            iframe.src = url;
            document.body.appendChild(iframe);
        }
    } else {
        // For modern browsers
        var anchor = document.createElement("a");
        anchor.href = url;
        anchor.target = "_blank";
        anchor.download = url.split("/").pop();
        anchor.click();
    }
}