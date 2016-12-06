class Resources {
    constructor() {
        this.resourceCache = {};
        this.loading = [];
        this.readyCallbacks = [];
    }

    load(url) {
        console.log(this.resourceCache[url]);
        if (url in this.resourceCache) {
            return this.resourceCache[url];
        } else {
            var img = new Image();
            var resourceCache = this.resourceCache;
            var readyCallbacks = this.readyCallbacks;
            img.onload = function() {
                resourceCache[url] = img;
                if (isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };
            this.resourceCache[url] = false;
            img.src = url;
        }
    }

    get(url) {
        return this.resourceCache[url];
    }

    onReady(func) {
        this.readyCallbacks.push(func);
    }

}

function isReady() {
    var ready = true;
    for (var k in this.resourceCache) {
        if (this.resourceCache.hasOwnProperty(k) &&
            !this.resourceCache[k]) {
            ready = false;
        }
    }
    return ready;
}