//如果此文件引入时产生错误，说明不支持
const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register("/sw.js", {
                scope: "/",
            });
            if (registration.installing) {
                console.log("正在安装 Service worker");
            } else if (registration.waiting) {
                console.log("已安装 Service worker installed");
            } else if (registration.active) {
                console.log("激活 Service worker");
            }
        } catch (error) {
            console.error(`注册失败：${error}`);
        }
    }
};

// …

registerServiceWorker();
const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
    event.waitUntil(
        addResourcesToCache([
            "/js/jquery2/"
        ]),
    );
});
