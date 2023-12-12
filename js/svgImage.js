function svgImagePath(svgPath) {
    if (window.compatibilityWithSVG) {
        return svgPath;
    } else {
        return svgPath.replace('svg/', 'img/').replace('.svg', '.png');
    }
}

$(document).ready(function () {
    var SVG_NS = 'http://www.w3.org/2000/svg';
    window.compatibilityWithSVG = !!document.createElementNS && !!document.createElementNS(SVG_NS, 'svg').createSVGRect;
    console.log('对SVG的兼容性：', compatibilityWithSVG);
    if (!compatibilityWithSVG) {

        for (var i = 0; i < document.images.length; i++) {
            var image = document.images[i];
            var newSrc = svgImagePath(image.src);
            // 在这里对每个图像进行操作
            console.log("改变图像URL“" + image.src + "”变为“" + newSrc + "”", image);
            document.images[i].src = newSrc;

        }

    }
})