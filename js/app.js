(() => {
    var __webpack_modules__ = {
        541: function() {
            (function() {
                var MutationObserver, Util, WeakMap, getComputedStyle, getComputedStyleRX, bind = function(fn, me) {
                    return function() {
                        return fn.apply(me, arguments);
                    };
                }, indexOf = [].indexOf || function(item) {
                    for (var i = 0, l = this.length; i < l; i++) if (i in this && this[i] === item) return i;
                    return -1;
                };
                Util = function() {
                    function Util() {}
                    Util.prototype.extend = function(custom, defaults) {
                        var key, value;
                        for (key in defaults) {
                            value = defaults[key];
                            if (null == custom[key]) custom[key] = value;
                        }
                        return custom;
                    };
                    Util.prototype.isMobile = function(agent) {
                        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
                    };
                    Util.prototype.createEvent = function(event, bubble, cancel, detail) {
                        var customEvent;
                        if (null == bubble) bubble = false;
                        if (null == cancel) cancel = false;
                        if (null == detail) detail = null;
                        if (null != document.createEvent) {
                            customEvent = document.createEvent("CustomEvent");
                            customEvent.initCustomEvent(event, bubble, cancel, detail);
                        } else if (null != document.createEventObject) {
                            customEvent = document.createEventObject();
                            customEvent.eventType = event;
                        } else customEvent.eventName = event;
                        return customEvent;
                    };
                    Util.prototype.emitEvent = function(elem, event) {
                        if (null != elem.dispatchEvent) return elem.dispatchEvent(event); else if (event in (null != elem)) return elem[event](); else if ("on" + event in (null != elem)) return elem["on" + event]();
                    };
                    Util.prototype.addEvent = function(elem, event, fn) {
                        if (null != elem.addEventListener) return elem.addEventListener(event, fn, false); else if (null != elem.attachEvent) return elem.attachEvent("on" + event, fn); else return elem[event] = fn;
                    };
                    Util.prototype.removeEvent = function(elem, event, fn) {
                        if (null != elem.removeEventListener) return elem.removeEventListener(event, fn, false); else if (null != elem.detachEvent) return elem.detachEvent("on" + event, fn); else return delete elem[event];
                    };
                    Util.prototype.innerHeight = function() {
                        if ("innerHeight" in window) return window.innerHeight; else return document.documentElement.clientHeight;
                    };
                    return Util;
                }();
                WeakMap = this.WeakMap || this.MozWeakMap || (WeakMap = function() {
                    function WeakMap() {
                        this.keys = [];
                        this.values = [];
                    }
                    WeakMap.prototype.get = function(key) {
                        var i, item, j, len, ref;
                        ref = this.keys;
                        for (i = j = 0, len = ref.length; j < len; i = ++j) {
                            item = ref[i];
                            if (item === key) return this.values[i];
                        }
                    };
                    WeakMap.prototype.set = function(key, value) {
                        var i, item, j, len, ref;
                        ref = this.keys;
                        for (i = j = 0, len = ref.length; j < len; i = ++j) {
                            item = ref[i];
                            if (item === key) {
                                this.values[i] = value;
                                return;
                            }
                        }
                        this.keys.push(key);
                        return this.values.push(value);
                    };
                    return WeakMap;
                }());
                MutationObserver = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (MutationObserver = function() {
                    function MutationObserver() {
                        if ("undefined" !== typeof console && null !== console) console.warn("MutationObserver is not supported by your browser.");
                        if ("undefined" !== typeof console && null !== console) console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.");
                    }
                    MutationObserver.notSupported = true;
                    MutationObserver.prototype.observe = function() {};
                    return MutationObserver;
                }());
                getComputedStyle = this.getComputedStyle || function(el, pseudo) {
                    this.getPropertyValue = function(prop) {
                        var ref;
                        if ("float" === prop) prop = "styleFloat";
                        if (getComputedStyleRX.test(prop)) prop.replace(getComputedStyleRX, (function(_, _char) {
                            return _char.toUpperCase();
                        }));
                        return (null != (ref = el.currentStyle) ? ref[prop] : void 0) || null;
                    };
                    return this;
                };
                getComputedStyleRX = /(\-([a-z]){1})/g;
                this.WOW = function() {
                    WOW.prototype.defaults = {
                        boxClass: "wow",
                        animateClass: "animated",
                        offset: 0,
                        mobile: true,
                        live: true,
                        callback: null,
                        scrollContainer: null
                    };
                    function WOW(options) {
                        if (null == options) options = {};
                        this.scrollCallback = bind(this.scrollCallback, this);
                        this.scrollHandler = bind(this.scrollHandler, this);
                        this.resetAnimation = bind(this.resetAnimation, this);
                        this.start = bind(this.start, this);
                        this.scrolled = true;
                        this.config = this.util().extend(options, this.defaults);
                        if (null != options.scrollContainer) this.config.scrollContainer = document.querySelector(options.scrollContainer);
                        this.animationNameCache = new WeakMap;
                        this.wowEvent = this.util().createEvent(this.config.boxClass);
                    }
                    WOW.prototype.init = function() {
                        var ref;
                        this.element = window.document.documentElement;
                        if ("interactive" === (ref = document.readyState) || "complete" === ref) this.start(); else this.util().addEvent(document, "DOMContentLoaded", this.start);
                        return this.finished = [];
                    };
                    WOW.prototype.start = function() {
                        var box, j, len, ref;
                        this.stopped = false;
                        this.boxes = function() {
                            var j, len, ref, results;
                            ref = this.element.querySelectorAll("." + this.config.boxClass);
                            results = [];
                            for (j = 0, len = ref.length; j < len; j++) {
                                box = ref[j];
                                results.push(box);
                            }
                            return results;
                        }.call(this);
                        this.all = function() {
                            var j, len, ref, results;
                            ref = this.boxes;
                            results = [];
                            for (j = 0, len = ref.length; j < len; j++) {
                                box = ref[j];
                                results.push(box);
                            }
                            return results;
                        }.call(this);
                        if (this.boxes.length) if (this.disabled()) this.resetStyle(); else {
                            ref = this.boxes;
                            for (j = 0, len = ref.length; j < len; j++) {
                                box = ref[j];
                                this.applyStyle(box, true);
                            }
                        }
                        if (!this.disabled()) {
                            this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler);
                            this.util().addEvent(window, "resize", this.scrollHandler);
                            this.interval = setInterval(this.scrollCallback, 50);
                        }
                        if (this.config.live) return new MutationObserver(function(_this) {
                            return function(records) {
                                var k, len1, node, record, results;
                                results = [];
                                for (k = 0, len1 = records.length; k < len1; k++) {
                                    record = records[k];
                                    results.push(function() {
                                        var l, len2, ref1, results1;
                                        ref1 = record.addedNodes || [];
                                        results1 = [];
                                        for (l = 0, len2 = ref1.length; l < len2; l++) {
                                            node = ref1[l];
                                            results1.push(this.doSync(node));
                                        }
                                        return results1;
                                    }.call(_this));
                                }
                                return results;
                            };
                        }(this)).observe(document.body, {
                            childList: true,
                            subtree: true
                        });
                    };
                    WOW.prototype.stop = function() {
                        this.stopped = true;
                        this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler);
                        this.util().removeEvent(window, "resize", this.scrollHandler);
                        if (null != this.interval) return clearInterval(this.interval);
                    };
                    WOW.prototype.sync = function(element) {
                        if (MutationObserver.notSupported) return this.doSync(this.element);
                    };
                    WOW.prototype.doSync = function(element) {
                        var box, j, len, ref, results;
                        if (null == element) element = this.element;
                        if (1 !== element.nodeType) return;
                        element = element.parentNode || element;
                        ref = element.querySelectorAll("." + this.config.boxClass);
                        results = [];
                        for (j = 0, len = ref.length; j < len; j++) {
                            box = ref[j];
                            if (indexOf.call(this.all, box) < 0) {
                                this.boxes.push(box);
                                this.all.push(box);
                                if (this.stopped || this.disabled()) this.resetStyle(); else this.applyStyle(box, true);
                                results.push(this.scrolled = true);
                            } else results.push(void 0);
                        }
                        return results;
                    };
                    WOW.prototype.show = function(box) {
                        this.applyStyle(box);
                        box.className = box.className + " " + this.config.animateClass;
                        if (null != this.config.callback) this.config.callback(box);
                        this.util().emitEvent(box, this.wowEvent);
                        this.util().addEvent(box, "animationend", this.resetAnimation);
                        this.util().addEvent(box, "oanimationend", this.resetAnimation);
                        this.util().addEvent(box, "webkitAnimationEnd", this.resetAnimation);
                        this.util().addEvent(box, "MSAnimationEnd", this.resetAnimation);
                        return box;
                    };
                    WOW.prototype.applyStyle = function(box, hidden) {
                        var delay, duration, iteration;
                        duration = box.getAttribute("data-wow-duration");
                        delay = box.getAttribute("data-wow-delay");
                        iteration = box.getAttribute("data-wow-iteration");
                        return this.animate(function(_this) {
                            return function() {
                                return _this.customStyle(box, hidden, duration, delay, iteration);
                            };
                        }(this));
                    };
                    WOW.prototype.animate = function() {
                        if ("requestAnimationFrame" in window) return function(callback) {
                            return window.requestAnimationFrame(callback);
                        }; else return function(callback) {
                            return callback();
                        };
                    }();
                    WOW.prototype.resetStyle = function() {
                        var box, j, len, ref, results;
                        ref = this.boxes;
                        results = [];
                        for (j = 0, len = ref.length; j < len; j++) {
                            box = ref[j];
                            results.push(box.style.visibility = "visible");
                        }
                        return results;
                    };
                    WOW.prototype.resetAnimation = function(event) {
                        var target;
                        if (event.type.toLowerCase().indexOf("animationend") >= 0) {
                            target = event.target || event.srcElement;
                            return target.className = target.className.replace(this.config.animateClass, "").trim();
                        }
                    };
                    WOW.prototype.customStyle = function(box, hidden, duration, delay, iteration) {
                        if (hidden) this.cacheAnimationName(box);
                        box.style.visibility = hidden ? "hidden" : "visible";
                        if (duration) this.vendorSet(box.style, {
                            animationDuration: duration
                        });
                        if (delay) this.vendorSet(box.style, {
                            animationDelay: delay
                        });
                        if (iteration) this.vendorSet(box.style, {
                            animationIterationCount: iteration
                        });
                        this.vendorSet(box.style, {
                            animationName: hidden ? "none" : this.cachedAnimationName(box)
                        });
                        return box;
                    };
                    WOW.prototype.vendors = [ "moz", "webkit" ];
                    WOW.prototype.vendorSet = function(elem, properties) {
                        var name, results, value, vendor;
                        results = [];
                        for (name in properties) {
                            value = properties[name];
                            elem["" + name] = value;
                            results.push(function() {
                                var j, len, ref, results1;
                                ref = this.vendors;
                                results1 = [];
                                for (j = 0, len = ref.length; j < len; j++) {
                                    vendor = ref[j];
                                    results1.push(elem["" + vendor + name.charAt(0).toUpperCase() + name.substr(1)] = value);
                                }
                                return results1;
                            }.call(this));
                        }
                        return results;
                    };
                    WOW.prototype.vendorCSS = function(elem, property) {
                        var j, len, ref, result, style, vendor;
                        style = getComputedStyle(elem);
                        result = style.getPropertyCSSValue(property);
                        ref = this.vendors;
                        for (j = 0, len = ref.length; j < len; j++) {
                            vendor = ref[j];
                            result = result || style.getPropertyCSSValue("-" + vendor + "-" + property);
                        }
                        return result;
                    };
                    WOW.prototype.animationName = function(box) {
                        var animationName;
                        try {
                            animationName = this.vendorCSS(box, "animation-name").cssText;
                        } catch (error) {
                            animationName = getComputedStyle(box).getPropertyValue("animation-name");
                        }
                        if ("none" === animationName) return ""; else return animationName;
                    };
                    WOW.prototype.cacheAnimationName = function(box) {
                        return this.animationNameCache.set(box, this.animationName(box));
                    };
                    WOW.prototype.cachedAnimationName = function(box) {
                        return this.animationNameCache.get(box);
                    };
                    WOW.prototype.scrollHandler = function() {
                        return this.scrolled = true;
                    };
                    WOW.prototype.scrollCallback = function() {
                        var box;
                        if (this.scrolled) {
                            this.scrolled = false;
                            this.boxes = function() {
                                var j, len, ref, results;
                                ref = this.boxes;
                                results = [];
                                for (j = 0, len = ref.length; j < len; j++) {
                                    box = ref[j];
                                    if (!box) continue;
                                    if (this.isVisible(box)) {
                                        this.show(box);
                                        continue;
                                    }
                                    results.push(box);
                                }
                                return results;
                            }.call(this);
                            if (!(this.boxes.length || this.config.live)) return this.stop();
                        }
                    };
                    WOW.prototype.offsetTop = function(element) {
                        var top;
                        while (void 0 === element.offsetTop) element = element.parentNode;
                        top = element.offsetTop;
                        while (element = element.offsetParent) top += element.offsetTop;
                        return top;
                    };
                    WOW.prototype.isVisible = function(box) {
                        var bottom, offset, top, viewBottom, viewTop;
                        offset = box.getAttribute("data-wow-offset") || this.config.offset;
                        viewTop = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset;
                        viewBottom = viewTop + Math.min(this.element.clientHeight, this.util().innerHeight()) - offset;
                        top = this.offsetTop(box);
                        bottom = top + box.clientHeight;
                        return top <= viewBottom && bottom >= viewTop;
                    };
                    WOW.prototype.util = function() {
                        return null != this._util ? this._util : this._util = new Util;
                    };
                    WOW.prototype.disabled = function() {
                        return !this.config.mobile && this.util().isMobile(navigator.userAgent);
                    };
                    return WOW;
                }();
            }).call(this);
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        "use strict";
        function isWebp() {
            function testWebP(callback) {
                let webP = new Image;
                webP.onload = webP.onerror = function() {
                    callback(2 == webP.height);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            testWebP((function(support) {
                let className = true === support ? "webp" : "no-webp";
                document.documentElement.classList.add(className);
            }));
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout((() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout((() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
        let bodyLockStatus = true;
        let bodyLockToggle = (delay = 500) => {
            if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
        };
        let bodyUnlock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                setTimeout((() => {
                    for (let index = 0; index < lock_padding.length; index++) {
                        const el = lock_padding[index];
                        el.style.paddingRight = "0px";
                    }
                    body.style.paddingRight = "0px";
                    document.documentElement.classList.remove("lock");
                }), delay);
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        let bodyLock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                }
                body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                document.documentElement.classList.add("lock");
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        function spollers() {
            const spollersArray = document.querySelectorAll("[data-spollers]");
            if (spollersArray.length > 0) {
                const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
                    return !item.dataset.spollers.split(",")[0];
                }));
                if (spollersRegular.length) initSpollers(spollersRegular);
                let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
                if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                    mdQueriesItem.matchMedia.addEventListener("change", (function() {
                        initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    }));
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                function initSpollers(spollersArray, matchMedia = false) {
                    spollersArray.forEach((spollersBlock => {
                        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                        if (matchMedia.matches || !matchMedia) {
                            spollersBlock.classList.add("_spoller-init");
                            initSpollerBody(spollersBlock);
                            spollersBlock.addEventListener("click", setSpollerAction);
                        } else {
                            spollersBlock.classList.remove("_spoller-init");
                            initSpollerBody(spollersBlock, false);
                            spollersBlock.removeEventListener("click", setSpollerAction);
                        }
                    }));
                }
                function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                    let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                    if (spollerTitles.length) {
                        spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
                        spollerTitles.forEach((spollerTitle => {
                            if (hideSpollerBody) {
                                spollerTitle.removeAttribute("tabindex");
                                if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                            } else {
                                spollerTitle.setAttribute("tabindex", "-1");
                                spollerTitle.nextElementSibling.hidden = false;
                            }
                        }));
                    }
                }
                function setSpollerAction(e) {
                    const el = e.target;
                    if (el.closest("[data-spoller]")) {
                        const spollerTitle = el.closest("[data-spoller]");
                        const spollersBlock = spollerTitle.closest("[data-spollers]");
                        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        if (!spollersBlock.querySelectorAll("._slide").length) {
                            if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                            spollerTitle.classList.toggle("_spoller-active");
                            _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                        }
                        e.preventDefault();
                    }
                }
                function hideSpollersBody(spollersBlock) {
                    const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                        spollerActiveTitle.classList.remove("_spoller-active");
                        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                    }
                }
                const spollersClose = document.querySelectorAll("[data-spoller-close]");
                if (spollersClose.length) document.addEventListener("click", (function(e) {
                    const el = e.target;
                    if (!el.closest("[data-spollers]")) spollersClose.forEach((spollerClose => {
                        const spollersBlock = spollerClose.closest("[data-spollers]");
                        if (spollersBlock.classList.contains("_spoller-init")) {
                            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                            spollerClose.classList.remove("_spoller-active");
                            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                        }
                    }));
                }));
            }
        }
        function menuInit() {
            if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
                if (bodyLockStatus && e.target.closest(".icon-menu")) {
                    bodyLockToggle();
                    document.documentElement.classList.toggle("menu-open");
                }
            }));
        }
        function uniqArray(array) {
            return array.filter((function(item, index, self) {
                return self.indexOf(item) === index;
            }));
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter((function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            }));
            if (media.length) {
                const breakpointsArray = [];
                media.forEach((item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                }));
                let mdQueries = breakpointsArray.map((function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                }));
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach((breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter((function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        }));
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    }));
                    return mdQueriesArray;
                }
            }
        }
        function ssr_window_esm_isObject(obj) {
            return null !== obj && "object" === typeof obj && "constructor" in obj && obj.constructor === Object;
        }
        function extend(target = {}, src = {}) {
            Object.keys(src).forEach((key => {
                if ("undefined" === typeof target[key]) target[key] = src[key]; else if (ssr_window_esm_isObject(src[key]) && ssr_window_esm_isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
            }));
        }
        const ssrDocument = {
            body: {},
            addEventListener() {},
            removeEventListener() {},
            activeElement: {
                blur() {},
                nodeName: ""
            },
            querySelector() {
                return null;
            },
            querySelectorAll() {
                return [];
            },
            getElementById() {
                return null;
            },
            createEvent() {
                return {
                    initEvent() {}
                };
            },
            createElement() {
                return {
                    children: [],
                    childNodes: [],
                    style: {},
                    setAttribute() {},
                    getElementsByTagName() {
                        return [];
                    }
                };
            },
            createElementNS() {
                return {};
            },
            importNode() {
                return null;
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            }
        };
        function ssr_window_esm_getDocument() {
            const doc = "undefined" !== typeof document ? document : {};
            extend(doc, ssrDocument);
            return doc;
        }
        const ssrWindow = {
            document: ssrDocument,
            navigator: {
                userAgent: ""
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            },
            history: {
                replaceState() {},
                pushState() {},
                go() {},
                back() {}
            },
            CustomEvent: function CustomEvent() {
                return this;
            },
            addEventListener() {},
            removeEventListener() {},
            getComputedStyle() {
                return {
                    getPropertyValue() {
                        return "";
                    }
                };
            },
            Image() {},
            Date() {},
            screen: {},
            setTimeout() {},
            clearTimeout() {},
            matchMedia() {
                return {};
            },
            requestAnimationFrame(callback) {
                if ("undefined" === typeof setTimeout) {
                    callback();
                    return null;
                }
                return setTimeout(callback, 0);
            },
            cancelAnimationFrame(id) {
                if ("undefined" === typeof setTimeout) return;
                clearTimeout(id);
            }
        };
        function ssr_window_esm_getWindow() {
            const win = "undefined" !== typeof window ? window : {};
            extend(win, ssrWindow);
            return win;
        }
        function makeReactive(obj) {
            const proto = obj.__proto__;
            Object.defineProperty(obj, "__proto__", {
                get() {
                    return proto;
                },
                set(value) {
                    proto.__proto__ = value;
                }
            });
        }
        class Dom7 extends Array {
            constructor(items) {
                if ("number" === typeof items) super(items); else {
                    super(...items || []);
                    makeReactive(this);
                }
            }
        }
        function arrayFlat(arr = []) {
            const res = [];
            arr.forEach((el => {
                if (Array.isArray(el)) res.push(...arrayFlat(el)); else res.push(el);
            }));
            return res;
        }
        function arrayFilter(arr, callback) {
            return Array.prototype.filter.call(arr, callback);
        }
        function arrayUnique(arr) {
            const uniqueArray = [];
            for (let i = 0; i < arr.length; i += 1) if (-1 === uniqueArray.indexOf(arr[i])) uniqueArray.push(arr[i]);
            return uniqueArray;
        }
        function qsa(selector, context) {
            if ("string" !== typeof selector) return [ selector ];
            const a = [];
            const res = context.querySelectorAll(selector);
            for (let i = 0; i < res.length; i += 1) a.push(res[i]);
            return a;
        }
        function dom7_esm_$(selector, context) {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            let arr = [];
            if (!context && selector instanceof Dom7) return selector;
            if (!selector) return new Dom7(arr);
            if ("string" === typeof selector) {
                const html = selector.trim();
                if (html.indexOf("<") >= 0 && html.indexOf(">") >= 0) {
                    let toCreate = "div";
                    if (0 === html.indexOf("<li")) toCreate = "ul";
                    if (0 === html.indexOf("<tr")) toCreate = "tbody";
                    if (0 === html.indexOf("<td") || 0 === html.indexOf("<th")) toCreate = "tr";
                    if (0 === html.indexOf("<tbody")) toCreate = "table";
                    if (0 === html.indexOf("<option")) toCreate = "select";
                    const tempParent = document.createElement(toCreate);
                    tempParent.innerHTML = html;
                    for (let i = 0; i < tempParent.childNodes.length; i += 1) arr.push(tempParent.childNodes[i]);
                } else arr = qsa(selector.trim(), context || document);
            } else if (selector.nodeType || selector === window || selector === document) arr.push(selector); else if (Array.isArray(selector)) {
                if (selector instanceof Dom7) return selector;
                arr = selector;
            }
            return new Dom7(arrayUnique(arr));
        }
        dom7_esm_$.fn = Dom7.prototype;
        function addClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            this.forEach((el => {
                el.classList.add(...classNames);
            }));
            return this;
        }
        function removeClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            this.forEach((el => {
                el.classList.remove(...classNames);
            }));
            return this;
        }
        function toggleClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            this.forEach((el => {
                classNames.forEach((className => {
                    el.classList.toggle(className);
                }));
            }));
        }
        function hasClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            return arrayFilter(this, (el => classNames.filter((className => el.classList.contains(className))).length > 0)).length > 0;
        }
        function attr(attrs, value) {
            if (1 === arguments.length && "string" === typeof attrs) {
                if (this[0]) return this[0].getAttribute(attrs);
                return;
            }
            for (let i = 0; i < this.length; i += 1) if (2 === arguments.length) this[i].setAttribute(attrs, value); else for (const attrName in attrs) {
                this[i][attrName] = attrs[attrName];
                this[i].setAttribute(attrName, attrs[attrName]);
            }
            return this;
        }
        function removeAttr(attr) {
            for (let i = 0; i < this.length; i += 1) this[i].removeAttribute(attr);
            return this;
        }
        function transform(transform) {
            for (let i = 0; i < this.length; i += 1) this[i].style.transform = transform;
            return this;
        }
        function transition(duration) {
            for (let i = 0; i < this.length; i += 1) this[i].style.transitionDuration = "string" !== typeof duration ? `${duration}ms` : duration;
            return this;
        }
        function on(...args) {
            let [eventType, targetSelector, listener, capture] = args;
            if ("function" === typeof args[1]) {
                [eventType, listener, capture] = args;
                targetSelector = void 0;
            }
            if (!capture) capture = false;
            function handleLiveEvent(e) {
                const target = e.target;
                if (!target) return;
                const eventData = e.target.dom7EventData || [];
                if (eventData.indexOf(e) < 0) eventData.unshift(e);
                if (dom7_esm_$(target).is(targetSelector)) listener.apply(target, eventData); else {
                    const parents = dom7_esm_$(target).parents();
                    for (let k = 0; k < parents.length; k += 1) if (dom7_esm_$(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
                }
            }
            function handleEvent(e) {
                const eventData = e && e.target ? e.target.dom7EventData || [] : [];
                if (eventData.indexOf(e) < 0) eventData.unshift(e);
                listener.apply(this, eventData);
            }
            const events = eventType.split(" ");
            let j;
            for (let i = 0; i < this.length; i += 1) {
                const el = this[i];
                if (!targetSelector) for (j = 0; j < events.length; j += 1) {
                    const event = events[j];
                    if (!el.dom7Listeners) el.dom7Listeners = {};
                    if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
                    el.dom7Listeners[event].push({
                        listener,
                        proxyListener: handleEvent
                    });
                    el.addEventListener(event, handleEvent, capture);
                } else for (j = 0; j < events.length; j += 1) {
                    const event = events[j];
                    if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
                    if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
                    el.dom7LiveListeners[event].push({
                        listener,
                        proxyListener: handleLiveEvent
                    });
                    el.addEventListener(event, handleLiveEvent, capture);
                }
            }
            return this;
        }
        function off(...args) {
            let [eventType, targetSelector, listener, capture] = args;
            if ("function" === typeof args[1]) {
                [eventType, listener, capture] = args;
                targetSelector = void 0;
            }
            if (!capture) capture = false;
            const events = eventType.split(" ");
            for (let i = 0; i < events.length; i += 1) {
                const event = events[i];
                for (let j = 0; j < this.length; j += 1) {
                    const el = this[j];
                    let handlers;
                    if (!targetSelector && el.dom7Listeners) handlers = el.dom7Listeners[event]; else if (targetSelector && el.dom7LiveListeners) handlers = el.dom7LiveListeners[event];
                    if (handlers && handlers.length) for (let k = handlers.length - 1; k >= 0; k -= 1) {
                        const handler = handlers[k];
                        if (listener && handler.listener === listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        } else if (!listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        }
                    }
                }
            }
            return this;
        }
        function trigger(...args) {
            const window = ssr_window_esm_getWindow();
            const events = args[0].split(" ");
            const eventData = args[1];
            for (let i = 0; i < events.length; i += 1) {
                const event = events[i];
                for (let j = 0; j < this.length; j += 1) {
                    const el = this[j];
                    if (window.CustomEvent) {
                        const evt = new window.CustomEvent(event, {
                            detail: eventData,
                            bubbles: true,
                            cancelable: true
                        });
                        el.dom7EventData = args.filter(((data, dataIndex) => dataIndex > 0));
                        el.dispatchEvent(evt);
                        el.dom7EventData = [];
                        delete el.dom7EventData;
                    }
                }
            }
            return this;
        }
        function transitionEnd(callback) {
            const dom = this;
            function fireCallBack(e) {
                if (e.target !== this) return;
                callback.call(this, e);
                dom.off("transitionend", fireCallBack);
            }
            if (callback) dom.on("transitionend", fireCallBack);
            return this;
        }
        function dom7_esm_outerWidth(includeMargins) {
            if (this.length > 0) {
                if (includeMargins) {
                    const styles = this.styles();
                    return this[0].offsetWidth + parseFloat(styles.getPropertyValue("margin-right")) + parseFloat(styles.getPropertyValue("margin-left"));
                }
                return this[0].offsetWidth;
            }
            return null;
        }
        function dom7_esm_outerHeight(includeMargins) {
            if (this.length > 0) {
                if (includeMargins) {
                    const styles = this.styles();
                    return this[0].offsetHeight + parseFloat(styles.getPropertyValue("margin-top")) + parseFloat(styles.getPropertyValue("margin-bottom"));
                }
                return this[0].offsetHeight;
            }
            return null;
        }
        function offset() {
            if (this.length > 0) {
                const window = ssr_window_esm_getWindow();
                const document = ssr_window_esm_getDocument();
                const el = this[0];
                const box = el.getBoundingClientRect();
                const body = document.body;
                const clientTop = el.clientTop || body.clientTop || 0;
                const clientLeft = el.clientLeft || body.clientLeft || 0;
                const scrollTop = el === window ? window.scrollY : el.scrollTop;
                const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
                return {
                    top: box.top + scrollTop - clientTop,
                    left: box.left + scrollLeft - clientLeft
                };
            }
            return null;
        }
        function styles() {
            const window = ssr_window_esm_getWindow();
            if (this[0]) return window.getComputedStyle(this[0], null);
            return {};
        }
        function css(props, value) {
            const window = ssr_window_esm_getWindow();
            let i;
            if (1 === arguments.length) if ("string" === typeof props) {
                if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
            } else {
                for (i = 0; i < this.length; i += 1) for (const prop in props) this[i].style[prop] = props[prop];
                return this;
            }
            if (2 === arguments.length && "string" === typeof props) {
                for (i = 0; i < this.length; i += 1) this[i].style[props] = value;
                return this;
            }
            return this;
        }
        function each(callback) {
            if (!callback) return this;
            this.forEach(((el, index) => {
                callback.apply(el, [ el, index ]);
            }));
            return this;
        }
        function filter(callback) {
            const result = arrayFilter(this, callback);
            return dom7_esm_$(result);
        }
        function html(html) {
            if ("undefined" === typeof html) return this[0] ? this[0].innerHTML : null;
            for (let i = 0; i < this.length; i += 1) this[i].innerHTML = html;
            return this;
        }
        function dom7_esm_text(text) {
            if ("undefined" === typeof text) return this[0] ? this[0].textContent.trim() : null;
            for (let i = 0; i < this.length; i += 1) this[i].textContent = text;
            return this;
        }
        function is(selector) {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            const el = this[0];
            let compareWith;
            let i;
            if (!el || "undefined" === typeof selector) return false;
            if ("string" === typeof selector) {
                if (el.matches) return el.matches(selector);
                if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                compareWith = dom7_esm_$(selector);
                for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
                return false;
            }
            if (selector === document) return el === document;
            if (selector === window) return el === window;
            if (selector.nodeType || selector instanceof Dom7) {
                compareWith = selector.nodeType ? [ selector ] : selector;
                for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
                return false;
            }
            return false;
        }
        function index() {
            let child = this[0];
            let i;
            if (child) {
                i = 0;
                while (null !== (child = child.previousSibling)) if (1 === child.nodeType) i += 1;
                return i;
            }
            return;
        }
        function eq(index) {
            if ("undefined" === typeof index) return this;
            const length = this.length;
            if (index > length - 1) return dom7_esm_$([]);
            if (index < 0) {
                const returnIndex = length + index;
                if (returnIndex < 0) return dom7_esm_$([]);
                return dom7_esm_$([ this[returnIndex] ]);
            }
            return dom7_esm_$([ this[index] ]);
        }
        function append(...els) {
            let newChild;
            const document = ssr_window_esm_getDocument();
            for (let k = 0; k < els.length; k += 1) {
                newChild = els[k];
                for (let i = 0; i < this.length; i += 1) if ("string" === typeof newChild) {
                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = newChild;
                    while (tempDiv.firstChild) this[i].appendChild(tempDiv.firstChild);
                } else if (newChild instanceof Dom7) for (let j = 0; j < newChild.length; j += 1) this[i].appendChild(newChild[j]); else this[i].appendChild(newChild);
            }
            return this;
        }
        function prepend(newChild) {
            const document = ssr_window_esm_getDocument();
            let i;
            let j;
            for (i = 0; i < this.length; i += 1) if ("string" === typeof newChild) {
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = newChild;
                for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
            } else if (newChild instanceof Dom7) for (j = 0; j < newChild.length; j += 1) this[i].insertBefore(newChild[j], this[i].childNodes[0]); else this[i].insertBefore(newChild, this[i].childNodes[0]);
            return this;
        }
        function next(selector) {
            if (this.length > 0) {
                if (selector) {
                    if (this[0].nextElementSibling && dom7_esm_$(this[0].nextElementSibling).is(selector)) return dom7_esm_$([ this[0].nextElementSibling ]);
                    return dom7_esm_$([]);
                }
                if (this[0].nextElementSibling) return dom7_esm_$([ this[0].nextElementSibling ]);
                return dom7_esm_$([]);
            }
            return dom7_esm_$([]);
        }
        function nextAll(selector) {
            const nextEls = [];
            let el = this[0];
            if (!el) return dom7_esm_$([]);
            while (el.nextElementSibling) {
                const next = el.nextElementSibling;
                if (selector) {
                    if (dom7_esm_$(next).is(selector)) nextEls.push(next);
                } else nextEls.push(next);
                el = next;
            }
            return dom7_esm_$(nextEls);
        }
        function prev(selector) {
            if (this.length > 0) {
                const el = this[0];
                if (selector) {
                    if (el.previousElementSibling && dom7_esm_$(el.previousElementSibling).is(selector)) return dom7_esm_$([ el.previousElementSibling ]);
                    return dom7_esm_$([]);
                }
                if (el.previousElementSibling) return dom7_esm_$([ el.previousElementSibling ]);
                return dom7_esm_$([]);
            }
            return dom7_esm_$([]);
        }
        function prevAll(selector) {
            const prevEls = [];
            let el = this[0];
            if (!el) return dom7_esm_$([]);
            while (el.previousElementSibling) {
                const prev = el.previousElementSibling;
                if (selector) {
                    if (dom7_esm_$(prev).is(selector)) prevEls.push(prev);
                } else prevEls.push(prev);
                el = prev;
            }
            return dom7_esm_$(prevEls);
        }
        function dom7_esm_parent(selector) {
            const parents = [];
            for (let i = 0; i < this.length; i += 1) if (null !== this[i].parentNode) if (selector) {
                if (dom7_esm_$(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
            } else parents.push(this[i].parentNode);
            return dom7_esm_$(parents);
        }
        function parents(selector) {
            const parents = [];
            for (let i = 0; i < this.length; i += 1) {
                let parent = this[i].parentNode;
                while (parent) {
                    if (selector) {
                        if (dom7_esm_$(parent).is(selector)) parents.push(parent);
                    } else parents.push(parent);
                    parent = parent.parentNode;
                }
            }
            return dom7_esm_$(parents);
        }
        function closest(selector) {
            let closest = this;
            if ("undefined" === typeof selector) return dom7_esm_$([]);
            if (!closest.is(selector)) closest = closest.parents(selector).eq(0);
            return closest;
        }
        function find(selector) {
            const foundElements = [];
            for (let i = 0; i < this.length; i += 1) {
                const found = this[i].querySelectorAll(selector);
                for (let j = 0; j < found.length; j += 1) foundElements.push(found[j]);
            }
            return dom7_esm_$(foundElements);
        }
        function children(selector) {
            const children = [];
            for (let i = 0; i < this.length; i += 1) {
                const childNodes = this[i].children;
                for (let j = 0; j < childNodes.length; j += 1) if (!selector || dom7_esm_$(childNodes[j]).is(selector)) children.push(childNodes[j]);
            }
            return dom7_esm_$(children);
        }
        function remove() {
            for (let i = 0; i < this.length; i += 1) if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
            return this;
        }
        const noTrigger = "resize scroll".split(" ");
        function shortcut(name) {
            function eventHandler(...args) {
                if ("undefined" === typeof args[0]) {
                    for (let i = 0; i < this.length; i += 1) if (noTrigger.indexOf(name) < 0) if (name in this[i]) this[i][name](); else dom7_esm_$(this[i]).trigger(name);
                    return this;
                }
                return this.on(name, ...args);
            }
            return eventHandler;
        }
        shortcut("click");
        shortcut("blur");
        shortcut("focus");
        shortcut("focusin");
        shortcut("focusout");
        shortcut("keyup");
        shortcut("keydown");
        shortcut("keypress");
        shortcut("submit");
        shortcut("change");
        shortcut("mousedown");
        shortcut("mousemove");
        shortcut("mouseup");
        shortcut("mouseenter");
        shortcut("mouseleave");
        shortcut("mouseout");
        shortcut("mouseover");
        shortcut("touchstart");
        shortcut("touchend");
        shortcut("touchmove");
        shortcut("resize");
        shortcut("scroll");
        const Methods = {
            addClass,
            removeClass,
            hasClass,
            toggleClass,
            attr,
            removeAttr,
            transform,
            transition,
            on,
            off,
            trigger,
            transitionEnd,
            outerWidth: dom7_esm_outerWidth,
            outerHeight: dom7_esm_outerHeight,
            styles,
            offset,
            css,
            each,
            html,
            text: dom7_esm_text,
            is,
            index,
            eq,
            append,
            prepend,
            next,
            nextAll,
            prev,
            prevAll,
            parent: dom7_esm_parent,
            parents,
            closest,
            find,
            children,
            filter,
            remove
        };
        Object.keys(Methods).forEach((methodName => {
            Object.defineProperty(dom7_esm_$.fn, methodName, {
                value: Methods[methodName],
                writable: true
            });
        }));
        const dom = dom7_esm_$;
        function deleteProps(obj) {
            const object = obj;
            Object.keys(object).forEach((key => {
                try {
                    object[key] = null;
                } catch (e) {}
                try {
                    delete object[key];
                } catch (e) {}
            }));
        }
        function utils_nextTick(callback, delay) {
            if (void 0 === delay) delay = 0;
            return setTimeout(callback, delay);
        }
        function utils_now() {
            return Date.now();
        }
        function utils_getComputedStyle(el) {
            const window = ssr_window_esm_getWindow();
            let style;
            if (window.getComputedStyle) style = window.getComputedStyle(el, null);
            if (!style && el.currentStyle) style = el.currentStyle;
            if (!style) style = el.style;
            return style;
        }
        function utils_getTranslate(el, axis) {
            if (void 0 === axis) axis = "x";
            const window = ssr_window_esm_getWindow();
            let matrix;
            let curTransform;
            let transformMatrix;
            const curStyle = utils_getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map((a => a.replace(",", "."))).join(", ");
                transformMatrix = new window.WebKitCSSMatrix("none" === curTransform ? "" : curTransform);
            } else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
                matrix = transformMatrix.toString().split(",");
            }
            if ("x" === axis) if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (16 === matrix.length) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
            if ("y" === axis) if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (16 === matrix.length) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
            return curTransform || 0;
        }
        function utils_isObject(o) {
            return "object" === typeof o && null !== o && o.constructor && "Object" === Object.prototype.toString.call(o).slice(8, -1);
        }
        function isNode(node) {
            if ("undefined" !== typeof window && "undefined" !== typeof window.HTMLElement) return node instanceof HTMLElement;
            return node && (1 === node.nodeType || 11 === node.nodeType);
        }
        function utils_extend() {
            const to = Object(arguments.length <= 0 ? void 0 : arguments[0]);
            const noExtend = [ "__proto__", "constructor", "prototype" ];
            for (let i = 1; i < arguments.length; i += 1) {
                const nextSource = i < 0 || arguments.length <= i ? void 0 : arguments[i];
                if (void 0 !== nextSource && null !== nextSource && !isNode(nextSource)) {
                    const keysArray = Object.keys(Object(nextSource)).filter((key => noExtend.indexOf(key) < 0));
                    for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                        const nextKey = keysArray[nextIndex];
                        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (void 0 !== desc && desc.enumerable) if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]); else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
                            to[nextKey] = {};
                            if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]);
                        } else to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
        function utils_setCSSProperty(el, varName, varValue) {
            el.style.setProperty(varName, varValue);
        }
        function animateCSSModeScroll(_ref) {
            let {swiper, targetPosition, side} = _ref;
            const window = ssr_window_esm_getWindow();
            const startPosition = -swiper.translate;
            let startTime = null;
            let time;
            const duration = swiper.params.speed;
            swiper.wrapperEl.style.scrollSnapType = "none";
            window.cancelAnimationFrame(swiper.cssModeFrameID);
            const dir = targetPosition > startPosition ? "next" : "prev";
            const isOutOfBound = (current, target) => "next" === dir && current >= target || "prev" === dir && current <= target;
            const animate = () => {
                time = (new Date).getTime();
                if (null === startTime) startTime = time;
                const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
                const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
                let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
                if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
                swiper.wrapperEl.scrollTo({
                    [side]: currentPosition
                });
                if (isOutOfBound(currentPosition, targetPosition)) {
                    swiper.wrapperEl.style.overflow = "hidden";
                    swiper.wrapperEl.style.scrollSnapType = "";
                    setTimeout((() => {
                        swiper.wrapperEl.style.overflow = "";
                        swiper.wrapperEl.scrollTo({
                            [side]: currentPosition
                        });
                    }));
                    window.cancelAnimationFrame(swiper.cssModeFrameID);
                    return;
                }
                swiper.cssModeFrameID = window.requestAnimationFrame(animate);
            };
            animate();
        }
        let support;
        function calcSupport() {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            return {
                smoothScroll: document.documentElement && "scrollBehavior" in document.documentElement.style,
                touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
                passiveListener: function checkPassiveListener() {
                    let supportsPassive = false;
                    try {
                        const opts = Object.defineProperty({}, "passive", {
                            get() {
                                supportsPassive = true;
                            }
                        });
                        window.addEventListener("testPassiveListener", null, opts);
                    } catch (e) {}
                    return supportsPassive;
                }(),
                gestures: function checkGestures() {
                    return "ongesturestart" in window;
                }()
            };
        }
        function getSupport() {
            if (!support) support = calcSupport();
            return support;
        }
        let deviceCached;
        function calcDevice(_temp) {
            let {userAgent} = void 0 === _temp ? {} : _temp;
            const support = getSupport();
            const window = ssr_window_esm_getWindow();
            const platform = window.navigator.platform;
            const ua = userAgent || window.navigator.userAgent;
            const device = {
                ios: false,
                android: false
            };
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;
            const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            const windows = "Win32" === platform;
            let macos = "MacIntel" === platform;
            const iPadScreens = [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ];
            if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
                ipad = ua.match(/(Version)\/([\d.]+)/);
                if (!ipad) ipad = [ 0, 1, "13_0_0" ];
                macos = false;
            }
            if (android && !windows) {
                device.os = "android";
                device.android = true;
            }
            if (ipad || iphone || ipod) {
                device.os = "ios";
                device.ios = true;
            }
            return device;
        }
        function getDevice(overrides) {
            if (void 0 === overrides) overrides = {};
            if (!deviceCached) deviceCached = calcDevice(overrides);
            return deviceCached;
        }
        let browser;
        function calcBrowser() {
            const window = ssr_window_esm_getWindow();
            function isSafari() {
                const ua = window.navigator.userAgent.toLowerCase();
                return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
            }
            return {
                isSafari: isSafari(),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
            };
        }
        function getBrowser() {
            if (!browser) browser = calcBrowser();
            return browser;
        }
        function Resize(_ref) {
            let {swiper, on, emit} = _ref;
            const window = ssr_window_esm_getWindow();
            let observer = null;
            let animationFrame = null;
            const resizeHandler = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                emit("beforeResize");
                emit("resize");
            };
            const createObserver = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                observer = new ResizeObserver((entries => {
                    animationFrame = window.requestAnimationFrame((() => {
                        const {width, height} = swiper;
                        let newWidth = width;
                        let newHeight = height;
                        entries.forEach((_ref2 => {
                            let {contentBoxSize, contentRect, target} = _ref2;
                            if (target && target !== swiper.el) return;
                            newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                            newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
                        }));
                        if (newWidth !== width || newHeight !== height) resizeHandler();
                    }));
                }));
                observer.observe(swiper.el);
            };
            const removeObserver = () => {
                if (animationFrame) window.cancelAnimationFrame(animationFrame);
                if (observer && observer.unobserve && swiper.el) {
                    observer.unobserve(swiper.el);
                    observer = null;
                }
            };
            const orientationChangeHandler = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                emit("orientationchange");
            };
            on("init", (() => {
                if (swiper.params.resizeObserver && "undefined" !== typeof window.ResizeObserver) {
                    createObserver();
                    return;
                }
                window.addEventListener("resize", resizeHandler);
                window.addEventListener("orientationchange", orientationChangeHandler);
            }));
            on("destroy", (() => {
                removeObserver();
                window.removeEventListener("resize", resizeHandler);
                window.removeEventListener("orientationchange", orientationChangeHandler);
            }));
        }
        function Observer(_ref) {
            let {swiper, extendParams, on, emit} = _ref;
            const observers = [];
            const window = ssr_window_esm_getWindow();
            const attach = function(target, options) {
                if (void 0 === options) options = {};
                const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
                const observer = new ObserverFunc((mutations => {
                    if (1 === mutations.length) {
                        emit("observerUpdate", mutations[0]);
                        return;
                    }
                    const observerUpdate = function observerUpdate() {
                        emit("observerUpdate", mutations[0]);
                    };
                    if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
                }));
                observer.observe(target, {
                    attributes: "undefined" === typeof options.attributes ? true : options.attributes,
                    childList: "undefined" === typeof options.childList ? true : options.childList,
                    characterData: "undefined" === typeof options.characterData ? true : options.characterData
                });
                observers.push(observer);
            };
            const init = () => {
                if (!swiper.params.observer) return;
                if (swiper.params.observeParents) {
                    const containerParents = swiper.$el.parents();
                    for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
                }
                attach(swiper.$el[0], {
                    childList: swiper.params.observeSlideChildren
                });
                attach(swiper.$wrapperEl[0], {
                    attributes: false
                });
            };
            const destroy = () => {
                observers.forEach((observer => {
                    observer.disconnect();
                }));
                observers.splice(0, observers.length);
            };
            extendParams({
                observer: false,
                observeParents: false,
                observeSlideChildren: false
            });
            on("init", init);
            on("destroy", destroy);
        }
        const events_emitter = {
            on(events, handler, priority) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if ("function" !== typeof handler) return self;
                const method = priority ? "unshift" : "push";
                events.split(" ").forEach((event => {
                    if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
                    self.eventsListeners[event][method](handler);
                }));
                return self;
            },
            once(events, handler, priority) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if ("function" !== typeof handler) return self;
                function onceHandler() {
                    self.off(events, onceHandler);
                    if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
                    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                    handler.apply(self, args);
                }
                onceHandler.__emitterProxy = handler;
                return self.on(events, onceHandler, priority);
            },
            onAny(handler, priority) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if ("function" !== typeof handler) return self;
                const method = priority ? "unshift" : "push";
                if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
                return self;
            },
            offAny(handler) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsAnyListeners) return self;
                const index = self.eventsAnyListeners.indexOf(handler);
                if (index >= 0) self.eventsAnyListeners.splice(index, 1);
                return self;
            },
            off(events, handler) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsListeners) return self;
                events.split(" ").forEach((event => {
                    if ("undefined" === typeof handler) self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach(((eventHandler, index) => {
                        if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
                    }));
                }));
                return self;
            },
            emit() {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsListeners) return self;
                let events;
                let data;
                let context;
                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                if ("string" === typeof args[0] || Array.isArray(args[0])) {
                    events = args[0];
                    data = args.slice(1, args.length);
                    context = self;
                } else {
                    events = args[0].events;
                    data = args[0].data;
                    context = args[0].context || self;
                }
                data.unshift(context);
                const eventsArray = Array.isArray(events) ? events : events.split(" ");
                eventsArray.forEach((event => {
                    if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach((eventHandler => {
                        eventHandler.apply(context, [ event, ...data ]);
                    }));
                    if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler => {
                        eventHandler.apply(context, data);
                    }));
                }));
                return self;
            }
        };
        function updateSize() {
            const swiper = this;
            let width;
            let height;
            const $el = swiper.$el;
            if ("undefined" !== typeof swiper.params.width && null !== swiper.params.width) width = swiper.params.width; else width = $el[0].clientWidth;
            if ("undefined" !== typeof swiper.params.height && null !== swiper.params.height) height = swiper.params.height; else height = $el[0].clientHeight;
            if (0 === width && swiper.isHorizontal() || 0 === height && swiper.isVertical()) return;
            width = width - parseInt($el.css("padding-left") || 0, 10) - parseInt($el.css("padding-right") || 0, 10);
            height = height - parseInt($el.css("padding-top") || 0, 10) - parseInt($el.css("padding-bottom") || 0, 10);
            if (Number.isNaN(width)) width = 0;
            if (Number.isNaN(height)) height = 0;
            Object.assign(swiper, {
                width,
                height,
                size: swiper.isHorizontal() ? width : height
            });
        }
        function updateSlides() {
            const swiper = this;
            function getDirectionLabel(property) {
                if (swiper.isHorizontal()) return property;
                return {
                    width: "height",
                    "margin-top": "margin-left",
                    "margin-bottom ": "margin-right",
                    "margin-left": "margin-top",
                    "margin-right": "margin-bottom",
                    "padding-left": "padding-top",
                    "padding-right": "padding-bottom",
                    marginRight: "marginBottom"
                }[property];
            }
            function getDirectionPropertyValue(node, label) {
                return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
            }
            const params = swiper.params;
            const {$wrapperEl, size: swiperSize, rtlTranslate: rtl, wrongRTL} = swiper;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
            const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
            const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
            let snapGrid = [];
            const slidesGrid = [];
            const slidesSizesGrid = [];
            let offsetBefore = params.slidesOffsetBefore;
            if ("function" === typeof offsetBefore) offsetBefore = params.slidesOffsetBefore.call(swiper);
            let offsetAfter = params.slidesOffsetAfter;
            if ("function" === typeof offsetAfter) offsetAfter = params.slidesOffsetAfter.call(swiper);
            const previousSnapGridLength = swiper.snapGrid.length;
            const previousSlidesGridLength = swiper.slidesGrid.length;
            let spaceBetween = params.spaceBetween;
            let slidePosition = -offsetBefore;
            let prevSlideSize = 0;
            let index = 0;
            if ("undefined" === typeof swiperSize) return;
            if ("string" === typeof spaceBetween && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
            swiper.virtualSize = -spaceBetween;
            if (rtl) slides.css({
                marginLeft: "",
                marginBottom: "",
                marginTop: ""
            }); else slides.css({
                marginRight: "",
                marginBottom: "",
                marginTop: ""
            });
            if (params.centeredSlides && params.cssMode) {
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", "");
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", "");
            }
            const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
            if (gridEnabled) swiper.grid.initSlides(slidesLength);
            let slideSize;
            const shouldResetSlideSize = "auto" === params.slidesPerView && params.breakpoints && Object.keys(params.breakpoints).filter((key => "undefined" !== typeof params.breakpoints[key].slidesPerView)).length > 0;
            for (let i = 0; i < slidesLength; i += 1) {
                slideSize = 0;
                const slide = slides.eq(i);
                if (gridEnabled) swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
                if ("none" === slide.css("display")) continue;
                if ("auto" === params.slidesPerView) {
                    if (shouldResetSlideSize) slides[i].style[getDirectionLabel("width")] = ``;
                    const slideStyles = getComputedStyle(slide[0]);
                    const currentTransform = slide[0].style.transform;
                    const currentWebKitTransform = slide[0].style.webkitTransform;
                    if (currentTransform) slide[0].style.transform = "none";
                    if (currentWebKitTransform) slide[0].style.webkitTransform = "none";
                    if (params.roundLengths) slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true); else {
                        const width = getDirectionPropertyValue(slideStyles, "width");
                        const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
                        const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
                        const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
                        const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
                        const boxSizing = slideStyles.getPropertyValue("box-sizing");
                        if (boxSizing && "border-box" === boxSizing) slideSize = width + marginLeft + marginRight; else {
                            const {clientWidth, offsetWidth} = slide[0];
                            slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
                        }
                    }
                    if (currentTransform) slide[0].style.transform = currentTransform;
                    if (currentWebKitTransform) slide[0].style.webkitTransform = currentWebKitTransform;
                    if (params.roundLengths) slideSize = Math.floor(slideSize);
                } else {
                    slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                    if (params.roundLengths) slideSize = Math.floor(slideSize);
                    if (slides[i]) slides[i].style[getDirectionLabel("width")] = `${slideSize}px`;
                }
                if (slides[i]) slides[i].swiperSlideSize = slideSize;
                slidesSizesGrid.push(slideSize);
                if (params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if (0 === prevSlideSize && 0 !== i) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                    if (0 === i) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
                    if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                    if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                    slidesGrid.push(slidePosition);
                } else {
                    if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                    if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                    slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }
                swiper.virtualSize += slideSize + spaceBetween;
                prevSlideSize = slideSize;
                index += 1;
            }
            swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
            if (rtl && wrongRTL && ("slide" === params.effect || "coverflow" === params.effect)) $wrapperEl.css({
                width: `${swiper.virtualSize + params.spaceBetween}px`
            });
            if (params.setWrapperSize) $wrapperEl.css({
                [getDirectionLabel("width")]: `${swiper.virtualSize + params.spaceBetween}px`
            });
            if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
            if (!params.centeredSlides) {
                const newSlidesGrid = [];
                for (let i = 0; i < snapGrid.length; i += 1) {
                    let slidesGridItem = snapGrid[i];
                    if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                    if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
                }
                snapGrid = newSlidesGrid;
                if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) snapGrid.push(swiper.virtualSize - swiperSize);
            }
            if (0 === snapGrid.length) snapGrid = [ 0 ];
            if (0 !== params.spaceBetween) {
                const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
                slides.filter(((_, slideIndex) => {
                    if (!params.cssMode) return true;
                    if (slideIndex === slides.length - 1) return false;
                    return true;
                })).css({
                    [key]: `${spaceBetween}px`
                });
            }
            if (params.centeredSlides && params.centeredSlidesBounds) {
                let allSlidesSize = 0;
                slidesSizesGrid.forEach((slideSizeValue => {
                    allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
                }));
                allSlidesSize -= params.spaceBetween;
                const maxSnap = allSlidesSize - swiperSize;
                snapGrid = snapGrid.map((snap => {
                    if (snap < 0) return -offsetBefore;
                    if (snap > maxSnap) return maxSnap + offsetAfter;
                    return snap;
                }));
            }
            if (params.centerInsufficientSlides) {
                let allSlidesSize = 0;
                slidesSizesGrid.forEach((slideSizeValue => {
                    allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
                }));
                allSlidesSize -= params.spaceBetween;
                if (allSlidesSize < swiperSize) {
                    const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
                    snapGrid.forEach(((snap, snapIndex) => {
                        snapGrid[snapIndex] = snap - allSlidesOffset;
                    }));
                    slidesGrid.forEach(((snap, snapIndex) => {
                        slidesGrid[snapIndex] = snap + allSlidesOffset;
                    }));
                }
            }
            Object.assign(swiper, {
                slides,
                snapGrid,
                slidesGrid,
                slidesSizesGrid
            });
            if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
                const addToSnapGrid = -swiper.snapGrid[0];
                const addToSlidesGrid = -swiper.slidesGrid[0];
                swiper.snapGrid = swiper.snapGrid.map((v => v + addToSnapGrid));
                swiper.slidesGrid = swiper.slidesGrid.map((v => v + addToSlidesGrid));
            }
            if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
            if (snapGrid.length !== previousSnapGridLength) {
                if (swiper.params.watchOverflow) swiper.checkOverflow();
                swiper.emit("snapGridLengthChange");
            }
            if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
            if (params.watchSlidesProgress) swiper.updateSlidesOffset();
            if (!isVirtual && !params.cssMode && ("slide" === params.effect || "fade" === params.effect)) {
                const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
                const hasClassBackfaceClassAdded = swiper.$el.hasClass(backFaceHiddenClass);
                if (slidesLength <= params.maxBackfaceHiddenSlides) {
                    if (!hasClassBackfaceClassAdded) swiper.$el.addClass(backFaceHiddenClass);
                } else if (hasClassBackfaceClassAdded) swiper.$el.removeClass(backFaceHiddenClass);
            }
        }
        function updateAutoHeight(speed) {
            const swiper = this;
            const activeSlides = [];
            const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
            let newHeight = 0;
            let i;
            if ("number" === typeof speed) swiper.setTransition(speed); else if (true === speed) swiper.setTransition(swiper.params.speed);
            const getSlideByIndex = index => {
                if (isVirtual) return swiper.slides.filter((el => parseInt(el.getAttribute("data-swiper-slide-index"), 10) === index))[0];
                return swiper.slides.eq(index)[0];
            };
            if ("auto" !== swiper.params.slidesPerView && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) swiper.visibleSlides.each((slide => {
                activeSlides.push(slide);
            })); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
                const index = swiper.activeIndex + i;
                if (index > swiper.slides.length && !isVirtual) break;
                activeSlides.push(getSlideByIndex(index));
            } else activeSlides.push(getSlideByIndex(swiper.activeIndex));
            for (i = 0; i < activeSlides.length; i += 1) if ("undefined" !== typeof activeSlides[i]) {
                const height = activeSlides[i].offsetHeight;
                newHeight = height > newHeight ? height : newHeight;
            }
            if (newHeight || 0 === newHeight) swiper.$wrapperEl.css("height", `${newHeight}px`);
        }
        function updateSlidesOffset() {
            const swiper = this;
            const slides = swiper.slides;
            for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
        }
        function updateSlidesProgress(translate) {
            if (void 0 === translate) translate = this && this.translate || 0;
            const swiper = this;
            const params = swiper.params;
            const {slides, rtlTranslate: rtl, snapGrid} = swiper;
            if (0 === slides.length) return;
            if ("undefined" === typeof slides[0].swiperSlideOffset) swiper.updateSlidesOffset();
            let offsetCenter = -translate;
            if (rtl) offsetCenter = translate;
            slides.removeClass(params.slideVisibleClass);
            swiper.visibleSlidesIndexes = [];
            swiper.visibleSlides = [];
            for (let i = 0; i < slides.length; i += 1) {
                const slide = slides[i];
                let slideOffset = slide.swiperSlideOffset;
                if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
                const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
                const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
                const slideBefore = -(offsetCenter - slideOffset);
                const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
                const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
                if (isVisible) {
                    swiper.visibleSlides.push(slide);
                    swiper.visibleSlidesIndexes.push(i);
                    slides.eq(i).addClass(params.slideVisibleClass);
                }
                slide.progress = rtl ? -slideProgress : slideProgress;
                slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
            }
            swiper.visibleSlides = dom(swiper.visibleSlides);
        }
        function updateProgress(translate) {
            const swiper = this;
            if ("undefined" === typeof translate) {
                const multiplier = swiper.rtlTranslate ? -1 : 1;
                translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
            }
            const params = swiper.params;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            let {progress, isBeginning, isEnd} = swiper;
            const wasBeginning = isBeginning;
            const wasEnd = isEnd;
            if (0 === translatesDiff) {
                progress = 0;
                isBeginning = true;
                isEnd = true;
            } else {
                progress = (translate - swiper.minTranslate()) / translatesDiff;
                isBeginning = progress <= 0;
                isEnd = progress >= 1;
            }
            Object.assign(swiper, {
                progress,
                isBeginning,
                isEnd
            });
            if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
            if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
            if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
            if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
            swiper.emit("progress", progress);
        }
        function updateSlidesClasses() {
            const swiper = this;
            const {slides, params, $wrapperEl, activeIndex, realIndex} = swiper;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
            let activeSlide;
            if (isVirtual) activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`); else activeSlide = slides.eq(activeIndex);
            activeSlide.addClass(params.slideActiveClass);
            if (params.loop) if (activeSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
            let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);
            if (params.loop && 0 === nextSlide.length) {
                nextSlide = slides.eq(0);
                nextSlide.addClass(params.slideNextClass);
            }
            let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);
            if (params.loop && 0 === prevSlide.length) {
                prevSlide = slides.eq(-1);
                prevSlide.addClass(params.slidePrevClass);
            }
            if (params.loop) {
                if (nextSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass);
                if (prevSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass);
            }
            swiper.emitSlidesClasses();
        }
        function updateActiveIndex(newActiveIndex) {
            const swiper = this;
            const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
            const {slidesGrid, snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex} = swiper;
            let activeIndex = newActiveIndex;
            let snapIndex;
            if ("undefined" === typeof activeIndex) {
                for (let i = 0; i < slidesGrid.length; i += 1) if ("undefined" !== typeof slidesGrid[i + 1]) {
                    if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i; else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
                } else if (translate >= slidesGrid[i]) activeIndex = i;
                if (params.normalizeSlideIndex) if (activeIndex < 0 || "undefined" === typeof activeIndex) activeIndex = 0;
            }
            if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate); else {
                const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
                snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
            }
            if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
            if (activeIndex === previousIndex) {
                if (snapIndex !== previousSnapIndex) {
                    swiper.snapIndex = snapIndex;
                    swiper.emit("snapIndexChange");
                }
                return;
            }
            const realIndex = parseInt(swiper.slides.eq(activeIndex).attr("data-swiper-slide-index") || activeIndex, 10);
            Object.assign(swiper, {
                snapIndex,
                realIndex,
                previousIndex,
                activeIndex
            });
            swiper.emit("activeIndexChange");
            swiper.emit("snapIndexChange");
            if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
            if (swiper.initialized || swiper.params.runCallbacksOnInit) swiper.emit("slideChange");
        }
        function updateClickedSlide(e) {
            const swiper = this;
            const params = swiper.params;
            const slide = dom(e).closest(`.${params.slideClass}`)[0];
            let slideFound = false;
            let slideIndex;
            if (slide) for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
                slideFound = true;
                slideIndex = i;
                break;
            }
            if (slide && slideFound) {
                swiper.clickedSlide = slide;
                if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(dom(slide).attr("data-swiper-slide-index"), 10); else swiper.clickedIndex = slideIndex;
            } else {
                swiper.clickedSlide = void 0;
                swiper.clickedIndex = void 0;
                return;
            }
            if (params.slideToClickedSlide && void 0 !== swiper.clickedIndex && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
        }
        const update = {
            updateSize,
            updateSlides,
            updateAutoHeight,
            updateSlidesOffset,
            updateSlidesProgress,
            updateProgress,
            updateSlidesClasses,
            updateActiveIndex,
            updateClickedSlide
        };
        function getSwiperTranslate(axis) {
            if (void 0 === axis) axis = this.isHorizontal() ? "x" : "y";
            const swiper = this;
            const {params, rtlTranslate: rtl, translate, $wrapperEl} = swiper;
            if (params.virtualTranslate) return rtl ? -translate : translate;
            if (params.cssMode) return translate;
            let currentTranslate = utils_getTranslate($wrapperEl[0], axis);
            if (rtl) currentTranslate = -currentTranslate;
            return currentTranslate || 0;
        }
        function setTranslate(translate, byController) {
            const swiper = this;
            const {rtlTranslate: rtl, params, $wrapperEl, wrapperEl, progress} = swiper;
            let x = 0;
            let y = 0;
            const z = 0;
            if (swiper.isHorizontal()) x = rtl ? -translate : translate; else y = translate;
            if (params.roundLengths) {
                x = Math.floor(x);
                y = Math.floor(y);
            }
            if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y; else if (!params.virtualTranslate) $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
            swiper.previousTranslate = swiper.translate;
            swiper.translate = swiper.isHorizontal() ? x : y;
            let newProgress;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            if (0 === translatesDiff) newProgress = 0; else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
            if (newProgress !== progress) swiper.updateProgress(translate);
            swiper.emit("setTranslate", swiper.translate, byController);
        }
        function minTranslate() {
            return -this.snapGrid[0];
        }
        function maxTranslate() {
            return -this.snapGrid[this.snapGrid.length - 1];
        }
        function translateTo(translate, speed, runCallbacks, translateBounds, internal) {
            if (void 0 === translate) translate = 0;
            if (void 0 === speed) speed = this.params.speed;
            if (void 0 === runCallbacks) runCallbacks = true;
            if (void 0 === translateBounds) translateBounds = true;
            const swiper = this;
            const {params, wrapperEl} = swiper;
            if (swiper.animating && params.preventInteractionOnTransition) return false;
            const minTranslate = swiper.minTranslate();
            const maxTranslate = swiper.maxTranslate();
            let newTranslate;
            if (translateBounds && translate > minTranslate) newTranslate = minTranslate; else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate; else newTranslate = translate;
            swiper.updateProgress(newTranslate);
            if (params.cssMode) {
                const isH = swiper.isHorizontal();
                if (0 === speed) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate; else {
                    if (!swiper.support.smoothScroll) {
                        animateCSSModeScroll({
                            swiper,
                            targetPosition: -newTranslate,
                            side: isH ? "left" : "top"
                        });
                        return true;
                    }
                    wrapperEl.scrollTo({
                        [isH ? "left" : "top"]: -newTranslate,
                        behavior: "smooth"
                    });
                }
                return true;
            }
            if (0 === speed) {
                swiper.setTransition(0);
                swiper.setTranslate(newTranslate);
                if (runCallbacks) {
                    swiper.emit("beforeTransitionStart", speed, internal);
                    swiper.emit("transitionEnd");
                }
            } else {
                swiper.setTransition(speed);
                swiper.setTranslate(newTranslate);
                if (runCallbacks) {
                    swiper.emit("beforeTransitionStart", speed, internal);
                    swiper.emit("transitionStart");
                }
                if (!swiper.animating) {
                    swiper.animating = true;
                    if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
                        if (!swiper || swiper.destroyed) return;
                        if (e.target !== this) return;
                        swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                        swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
                        swiper.onTranslateToWrapperTransitionEnd = null;
                        delete swiper.onTranslateToWrapperTransitionEnd;
                        if (runCallbacks) swiper.emit("transitionEnd");
                    };
                    swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                    swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
                }
            }
            return true;
        }
        const translate = {
            getTranslate: getSwiperTranslate,
            setTranslate,
            minTranslate,
            maxTranslate,
            translateTo
        };
        function setTransition(duration, byController) {
            const swiper = this;
            if (!swiper.params.cssMode) swiper.$wrapperEl.transition(duration);
            swiper.emit("setTransition", duration, byController);
        }
        function transitionEmit(_ref) {
            let {swiper, runCallbacks, direction, step} = _ref;
            const {activeIndex, previousIndex} = swiper;
            let dir = direction;
            if (!dir) if (activeIndex > previousIndex) dir = "next"; else if (activeIndex < previousIndex) dir = "prev"; else dir = "reset";
            swiper.emit(`transition${step}`);
            if (runCallbacks && activeIndex !== previousIndex) {
                if ("reset" === dir) {
                    swiper.emit(`slideResetTransition${step}`);
                    return;
                }
                swiper.emit(`slideChangeTransition${step}`);
                if ("next" === dir) swiper.emit(`slideNextTransition${step}`); else swiper.emit(`slidePrevTransition${step}`);
            }
        }
        function transitionStart(runCallbacks, direction) {
            if (void 0 === runCallbacks) runCallbacks = true;
            const swiper = this;
            const {params} = swiper;
            if (params.cssMode) return;
            if (params.autoHeight) swiper.updateAutoHeight();
            transitionEmit({
                swiper,
                runCallbacks,
                direction,
                step: "Start"
            });
        }
        function transitionEnd_transitionEnd(runCallbacks, direction) {
            if (void 0 === runCallbacks) runCallbacks = true;
            const swiper = this;
            const {params} = swiper;
            swiper.animating = false;
            if (params.cssMode) return;
            swiper.setTransition(0);
            transitionEmit({
                swiper,
                runCallbacks,
                direction,
                step: "End"
            });
        }
        const core_transition = {
            setTransition,
            transitionStart,
            transitionEnd: transitionEnd_transitionEnd
        };
        function slideTo(index, speed, runCallbacks, internal, initial) {
            if (void 0 === index) index = 0;
            if (void 0 === speed) speed = this.params.speed;
            if (void 0 === runCallbacks) runCallbacks = true;
            if ("number" !== typeof index && "string" !== typeof index) throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`);
            if ("string" === typeof index) {
                const indexAsNumber = parseInt(index, 10);
                const isValidNumber = isFinite(indexAsNumber);
                if (!isValidNumber) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
                index = indexAsNumber;
            }
            const swiper = this;
            let slideIndex = index;
            if (slideIndex < 0) slideIndex = 0;
            const {params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled} = swiper;
            if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) return false;
            const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
            let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
            if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
            if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
            const translate = -snapGrid[snapIndex];
            swiper.updateProgress(translate);
            if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
                const normalizedTranslate = -Math.floor(100 * translate);
                const normalizedGrid = Math.floor(100 * slidesGrid[i]);
                const normalizedGridNext = Math.floor(100 * slidesGrid[i + 1]);
                if ("undefined" !== typeof slidesGrid[i + 1]) {
                    if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i; else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
                } else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
            }
            if (swiper.initialized && slideIndex !== activeIndex) {
                if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) return false;
                if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) if ((activeIndex || 0) !== slideIndex) return false;
            }
            let direction;
            if (slideIndex > activeIndex) direction = "next"; else if (slideIndex < activeIndex) direction = "prev"; else direction = "reset";
            if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
                swiper.updateActiveIndex(slideIndex);
                if (params.autoHeight) swiper.updateAutoHeight();
                swiper.updateSlidesClasses();
                if ("slide" !== params.effect) swiper.setTranslate(translate);
                if ("reset" !== direction) {
                    swiper.transitionStart(runCallbacks, direction);
                    swiper.transitionEnd(runCallbacks, direction);
                }
                return false;
            }
            if (params.cssMode) {
                const isH = swiper.isHorizontal();
                const t = rtl ? translate : -translate;
                if (0 === speed) {
                    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
                    if (isVirtual) {
                        swiper.wrapperEl.style.scrollSnapType = "none";
                        swiper._immediateVirtual = true;
                    }
                    wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                    if (isVirtual) requestAnimationFrame((() => {
                        swiper.wrapperEl.style.scrollSnapType = "";
                        swiper._swiperImmediateVirtual = false;
                    }));
                } else {
                    if (!swiper.support.smoothScroll) {
                        animateCSSModeScroll({
                            swiper,
                            targetPosition: t,
                            side: isH ? "left" : "top"
                        });
                        return true;
                    }
                    wrapperEl.scrollTo({
                        [isH ? "left" : "top"]: t,
                        behavior: "smooth"
                    });
                }
                return true;
            }
            swiper.setTransition(speed);
            swiper.setTranslate(translate);
            swiper.updateActiveIndex(slideIndex);
            swiper.updateSlidesClasses();
            swiper.emit("beforeTransitionStart", speed, internal);
            swiper.transitionStart(runCallbacks, direction);
            if (0 === speed) swiper.transitionEnd(runCallbacks, direction); else if (!swiper.animating) {
                swiper.animating = true;
                if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                    if (!swiper || swiper.destroyed) return;
                    if (e.target !== this) return;
                    swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                    swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
                    swiper.onSlideToWrapperTransitionEnd = null;
                    delete swiper.onSlideToWrapperTransitionEnd;
                    swiper.transitionEnd(runCallbacks, direction);
                };
                swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
            }
            return true;
        }
        function slideToLoop(index, speed, runCallbacks, internal) {
            if (void 0 === index) index = 0;
            if (void 0 === speed) speed = this.params.speed;
            if (void 0 === runCallbacks) runCallbacks = true;
            const swiper = this;
            let newIndex = index;
            if (swiper.params.loop) newIndex += swiper.loopedSlides;
            return swiper.slideTo(newIndex, speed, runCallbacks, internal);
        }
        function slideNext(speed, runCallbacks, internal) {
            if (void 0 === speed) speed = this.params.speed;
            if (void 0 === runCallbacks) runCallbacks = true;
            const swiper = this;
            const {animating, enabled, params} = swiper;
            if (!enabled) return swiper;
            let perGroup = params.slidesPerGroup;
            if ("auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
            const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
            if (params.loop) {
                if (animating && params.loopPreventsSlide) return false;
                swiper.loopFix();
                swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
            }
            if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
            return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
        }
        function slidePrev(speed, runCallbacks, internal) {
            if (void 0 === speed) speed = this.params.speed;
            if (void 0 === runCallbacks) runCallbacks = true;
            const swiper = this;
            const {params, animating, snapGrid, slidesGrid, rtlTranslate, enabled} = swiper;
            if (!enabled) return swiper;
            if (params.loop) {
                if (animating && params.loopPreventsSlide) return false;
                swiper.loopFix();
                swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
            }
            const translate = rtlTranslate ? swiper.translate : -swiper.translate;
            function normalize(val) {
                if (val < 0) return -Math.floor(Math.abs(val));
                return Math.floor(val);
            }
            const normalizedTranslate = normalize(translate);
            const normalizedSnapGrid = snapGrid.map((val => normalize(val)));
            let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
            if ("undefined" === typeof prevSnap && params.cssMode) {
                let prevSnapIndex;
                snapGrid.forEach(((snap, snapIndex) => {
                    if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
                }));
                if ("undefined" !== typeof prevSnapIndex) prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
            }
            let prevIndex = 0;
            if ("undefined" !== typeof prevSnap) {
                prevIndex = slidesGrid.indexOf(prevSnap);
                if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
                if ("auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto) {
                    prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
                    prevIndex = Math.max(prevIndex, 0);
                }
            }
            if (params.rewind && swiper.isBeginning) {
                const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
                return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
            }
            return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
        }
        function slideReset(speed, runCallbacks, internal) {
            if (void 0 === speed) speed = this.params.speed;
            if (void 0 === runCallbacks) runCallbacks = true;
            const swiper = this;
            return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
        }
        function slideToClosest(speed, runCallbacks, internal, threshold) {
            if (void 0 === speed) speed = this.params.speed;
            if (void 0 === runCallbacks) runCallbacks = true;
            if (void 0 === threshold) threshold = .5;
            const swiper = this;
            let index = swiper.activeIndex;
            const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
            const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
            const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
            if (translate >= swiper.snapGrid[snapIndex]) {
                const currentSnap = swiper.snapGrid[snapIndex];
                const nextSnap = swiper.snapGrid[snapIndex + 1];
                if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
            } else {
                const prevSnap = swiper.snapGrid[snapIndex - 1];
                const currentSnap = swiper.snapGrid[snapIndex];
                if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
            }
            index = Math.max(index, 0);
            index = Math.min(index, swiper.slidesGrid.length - 1);
            return swiper.slideTo(index, speed, runCallbacks, internal);
        }
        function slideToClickedSlide() {
            const swiper = this;
            const {params, $wrapperEl} = swiper;
            const slidesPerView = "auto" === params.slidesPerView ? swiper.slidesPerViewDynamic() : params.slidesPerView;
            let slideToIndex = swiper.clickedIndex;
            let realIndex;
            if (params.loop) {
                if (swiper.animating) return;
                realIndex = parseInt(dom(swiper.clickedSlide).attr("data-swiper-slide-index"), 10);
                if (params.centeredSlides) if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
                    swiper.loopFix();
                    slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
                    utils_nextTick((() => {
                        swiper.slideTo(slideToIndex);
                    }));
                } else swiper.slideTo(slideToIndex); else if (slideToIndex > swiper.slides.length - slidesPerView) {
                    swiper.loopFix();
                    slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
                    utils_nextTick((() => {
                        swiper.slideTo(slideToIndex);
                    }));
                } else swiper.slideTo(slideToIndex);
            } else swiper.slideTo(slideToIndex);
        }
        const slide = {
            slideTo,
            slideToLoop,
            slideNext,
            slidePrev,
            slideReset,
            slideToClosest,
            slideToClickedSlide
        };
        function loopCreate() {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            const {params, $wrapperEl} = swiper;
            const $selector = $wrapperEl.children().length > 0 ? dom($wrapperEl.children()[0].parentNode) : $wrapperEl;
            $selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
            let slides = $selector.children(`.${params.slideClass}`);
            if (params.loopFillGroupWithBlank) {
                const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;
                if (blankSlidesNum !== params.slidesPerGroup) {
                    for (let i = 0; i < blankSlidesNum; i += 1) {
                        const blankNode = dom(document.createElement("div")).addClass(`${params.slideClass} ${params.slideBlankClass}`);
                        $selector.append(blankNode);
                    }
                    slides = $selector.children(`.${params.slideClass}`);
                }
            }
            if ("auto" === params.slidesPerView && !params.loopedSlides) params.loopedSlides = slides.length;
            swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
            swiper.loopedSlides += params.loopAdditionalSlides;
            if (swiper.loopedSlides > slides.length) swiper.loopedSlides = slides.length;
            const prependSlides = [];
            const appendSlides = [];
            slides.each(((el, index) => {
                const slide = dom(el);
                if (index < swiper.loopedSlides) appendSlides.push(el);
                if (index < slides.length && index >= slides.length - swiper.loopedSlides) prependSlides.push(el);
                slide.attr("data-swiper-slide-index", index);
            }));
            for (let i = 0; i < appendSlides.length; i += 1) $selector.append(dom(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
            for (let i = prependSlides.length - 1; i >= 0; i -= 1) $selector.prepend(dom(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
        }
        function loopFix() {
            const swiper = this;
            swiper.emit("beforeLoopFix");
            const {activeIndex, slides, loopedSlides, allowSlidePrev, allowSlideNext, snapGrid, rtlTranslate: rtl} = swiper;
            let newIndex;
            swiper.allowSlidePrev = true;
            swiper.allowSlideNext = true;
            const snapTranslate = -snapGrid[activeIndex];
            const diff = snapTranslate - swiper.getTranslate();
            if (activeIndex < loopedSlides) {
                newIndex = slides.length - 3 * loopedSlides + activeIndex;
                newIndex += loopedSlides;
                const slideChanged = swiper.slideTo(newIndex, 0, false, true);
                if (slideChanged && 0 !== diff) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
            } else if (activeIndex >= slides.length - loopedSlides) {
                newIndex = -slides.length + activeIndex + loopedSlides;
                newIndex += loopedSlides;
                const slideChanged = swiper.slideTo(newIndex, 0, false, true);
                if (slideChanged && 0 !== diff) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
            }
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            swiper.emit("loopFix");
        }
        function loopDestroy() {
            const swiper = this;
            const {$wrapperEl, params, slides} = swiper;
            $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();
            slides.removeAttr("data-swiper-slide-index");
        }
        const loop = {
            loopCreate,
            loopFix,
            loopDestroy
        };
        function setGrabCursor(moving) {
            const swiper = this;
            if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
            const el = "container" === swiper.params.touchEventsTarget ? swiper.el : swiper.wrapperEl;
            el.style.cursor = "move";
            el.style.cursor = moving ? "grabbing" : "grab";
        }
        function unsetGrabCursor() {
            const swiper = this;
            if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
            swiper["container" === swiper.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "";
        }
        const grab_cursor = {
            setGrabCursor,
            unsetGrabCursor
        };
        function closestElement(selector, base) {
            if (void 0 === base) base = this;
            function __closestFrom(el) {
                if (!el || el === ssr_window_esm_getDocument() || el === ssr_window_esm_getWindow()) return null;
                if (el.assignedSlot) el = el.assignedSlot;
                const found = el.closest(selector);
                return found || __closestFrom(el.getRootNode().host);
            }
            return __closestFrom(base);
        }
        function onTouchStart(event) {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            const window = ssr_window_esm_getWindow();
            const data = swiper.touchEventsData;
            const {params, touches, enabled} = swiper;
            if (!enabled) return;
            if (swiper.animating && params.preventInteractionOnTransition) return;
            if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            let $targetEl = dom(e.target);
            if ("wrapper" === params.touchEventsTarget) if (!$targetEl.closest(swiper.wrapperEl).length) return;
            data.isTouchEvent = "touchstart" === e.type;
            if (!data.isTouchEvent && "which" in e && 3 === e.which) return;
            if (!data.isTouchEvent && "button" in e && e.button > 0) return;
            if (data.isTouched && data.isMoved) return;
            const swipingClassHasValue = !!params.noSwipingClass && "" !== params.noSwipingClass;
            if (swipingClassHasValue && e.target && e.target.shadowRoot && event.path && event.path[0]) $targetEl = dom(event.path[0]);
            const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
            const isTargetShadow = !!(e.target && e.target.shadowRoot);
            if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, e.target) : $targetEl.closest(noSwipingSelector)[0])) {
                swiper.allowClick = true;
                return;
            }
            if (params.swipeHandler) if (!$targetEl.closest(params.swipeHandler)[0]) return;
            touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX;
            touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
            const startX = touches.currentX;
            const startY = touches.currentY;
            const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
            const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
            if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) if ("prevent" === edgeSwipeDetection) event.preventDefault(); else return;
            Object.assign(data, {
                isTouched: true,
                isMoved: false,
                allowTouchCallbacks: true,
                isScrolling: void 0,
                startMoving: void 0
            });
            touches.startX = startX;
            touches.startY = startY;
            data.touchStartTime = utils_now();
            swiper.allowClick = true;
            swiper.updateSize();
            swiper.swipeDirection = void 0;
            if (params.threshold > 0) data.allowThresholdMove = false;
            if ("touchstart" !== e.type) {
                let preventDefault = true;
                if ($targetEl.is(data.focusableElements)) {
                    preventDefault = false;
                    if ("SELECT" === $targetEl[0].nodeName) data.isTouched = false;
                }
                if (document.activeElement && dom(document.activeElement).is(data.focusableElements) && document.activeElement !== $targetEl[0]) document.activeElement.blur();
                const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
                if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) e.preventDefault();
            }
            if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) swiper.freeMode.onTouchStart();
            swiper.emit("touchStart", e);
        }
        function onTouchMove(event) {
            const document = ssr_window_esm_getDocument();
            const swiper = this;
            const data = swiper.touchEventsData;
            const {params, touches, rtlTranslate: rtl, enabled} = swiper;
            if (!enabled) return;
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            if (!data.isTouched) {
                if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
                return;
            }
            if (data.isTouchEvent && "touchmove" !== e.type) return;
            const targetTouch = "touchmove" === e.type && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
            const pageX = "touchmove" === e.type ? targetTouch.pageX : e.pageX;
            const pageY = "touchmove" === e.type ? targetTouch.pageY : e.pageY;
            if (e.preventedByNestedSwiper) {
                touches.startX = pageX;
                touches.startY = pageY;
                return;
            }
            if (!swiper.allowTouchMove) {
                if (!dom(e.target).is(data.focusableElements)) swiper.allowClick = false;
                if (data.isTouched) {
                    Object.assign(touches, {
                        startX: pageX,
                        startY: pageY,
                        currentX: pageX,
                        currentY: pageY
                    });
                    data.touchStartTime = utils_now();
                }
                return;
            }
            if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) if (swiper.isVertical()) {
                if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
                    data.isTouched = false;
                    data.isMoved = false;
                    return;
                }
            } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) return;
            if (data.isTouchEvent && document.activeElement) if (e.target === document.activeElement && dom(e.target).is(data.focusableElements)) {
                data.isMoved = true;
                swiper.allowClick = false;
                return;
            }
            if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
            if (e.targetTouches && e.targetTouches.length > 1) return;
            touches.currentX = pageX;
            touches.currentY = pageY;
            const diffX = touches.currentX - touches.startX;
            const diffY = touches.currentY - touches.startY;
            if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
            if ("undefined" === typeof data.isScrolling) {
                let touchAngle;
                if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false; else if (diffX * diffX + diffY * diffY >= 25) {
                    touchAngle = 180 * Math.atan2(Math.abs(diffY), Math.abs(diffX)) / Math.PI;
                    data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
                }
            }
            if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
            if ("undefined" === typeof data.startMoving) if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
            if (data.isScrolling) {
                data.isTouched = false;
                return;
            }
            if (!data.startMoving) return;
            swiper.allowClick = false;
            if (!params.cssMode && e.cancelable) e.preventDefault();
            if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
            if (!data.isMoved) {
                if (params.loop && !params.cssMode) swiper.loopFix();
                data.startTranslate = swiper.getTranslate();
                swiper.setTransition(0);
                if (swiper.animating) swiper.$wrapperEl.trigger("webkitTransitionEnd transitionend");
                data.allowMomentumBounce = false;
                if (params.grabCursor && (true === swiper.allowSlideNext || true === swiper.allowSlidePrev)) swiper.setGrabCursor(true);
                swiper.emit("sliderFirstMove", e);
            }
            swiper.emit("sliderMove", e);
            data.isMoved = true;
            let diff = swiper.isHorizontal() ? diffX : diffY;
            touches.diff = diff;
            diff *= params.touchRatio;
            if (rtl) diff = -diff;
            swiper.swipeDirection = diff > 0 ? "prev" : "next";
            data.currentTranslate = diff + data.startTranslate;
            let disableParentSwiper = true;
            let resistanceRatio = params.resistanceRatio;
            if (params.touchReleaseOnEdges) resistanceRatio = 0;
            if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
            } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
            }
            if (disableParentSwiper) e.preventedByNestedSwiper = true;
            if (!swiper.allowSlideNext && "next" === swiper.swipeDirection && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
            if (!swiper.allowSlidePrev && "prev" === swiper.swipeDirection && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
            if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
            if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
                if (!data.allowThresholdMove) {
                    data.allowThresholdMove = true;
                    touches.startX = touches.currentX;
                    touches.startY = touches.currentY;
                    data.currentTranslate = data.startTranslate;
                    touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                    return;
                }
            } else {
                data.currentTranslate = data.startTranslate;
                return;
            }
            if (!params.followFinger || params.cssMode) return;
            if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
            swiper.updateProgress(data.currentTranslate);
            swiper.setTranslate(data.currentTranslate);
        }
        function onTouchEnd(event) {
            const swiper = this;
            const data = swiper.touchEventsData;
            const {params, touches, rtlTranslate: rtl, slidesGrid, enabled} = swiper;
            if (!enabled) return;
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
            data.allowTouchCallbacks = false;
            if (!data.isTouched) {
                if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
                data.isMoved = false;
                data.startMoving = false;
                return;
            }
            if (params.grabCursor && data.isMoved && data.isTouched && (true === swiper.allowSlideNext || true === swiper.allowSlidePrev)) swiper.setGrabCursor(false);
            const touchEndTime = utils_now();
            const timeDiff = touchEndTime - data.touchStartTime;
            if (swiper.allowClick) {
                const pathTree = e.path || e.composedPath && e.composedPath();
                swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
                swiper.emit("tap click", e);
                if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
            }
            data.lastClickTime = utils_now();
            utils_nextTick((() => {
                if (!swiper.destroyed) swiper.allowClick = true;
            }));
            if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || 0 === touches.diff || data.currentTranslate === data.startTranslate) {
                data.isTouched = false;
                data.isMoved = false;
                data.startMoving = false;
                return;
            }
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            let currentPos;
            if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate; else currentPos = -data.currentTranslate;
            if (params.cssMode) return;
            if (swiper.params.freeMode && params.freeMode.enabled) {
                swiper.freeMode.onTouchEnd({
                    currentPos
                });
                return;
            }
            let stopIndex = 0;
            let groupSize = swiper.slidesSizesGrid[0];
            for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
                const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
                if ("undefined" !== typeof slidesGrid[i + increment]) {
                    if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
                        stopIndex = i;
                        groupSize = slidesGrid[i + increment] - slidesGrid[i];
                    }
                } else if (currentPos >= slidesGrid[i]) {
                    stopIndex = i;
                    groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
                }
            }
            let rewindFirstIndex = null;
            let rewindLastIndex = null;
            if (params.rewind) if (swiper.isBeginning) rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1; else if (swiper.isEnd) rewindFirstIndex = 0;
            const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
            const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
            if (timeDiff > params.longSwipesMs) {
                if (!params.longSwipes) {
                    swiper.slideTo(swiper.activeIndex);
                    return;
                }
                if ("next" === swiper.swipeDirection) if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment); else swiper.slideTo(stopIndex);
                if ("prev" === swiper.swipeDirection) if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else if (null !== rewindLastIndex && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) swiper.slideTo(rewindLastIndex); else swiper.slideTo(stopIndex);
            } else {
                if (!params.shortSwipes) {
                    swiper.slideTo(swiper.activeIndex);
                    return;
                }
                const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
                if (!isNavButtonTarget) {
                    if ("next" === swiper.swipeDirection) swiper.slideTo(null !== rewindFirstIndex ? rewindFirstIndex : stopIndex + increment);
                    if ("prev" === swiper.swipeDirection) swiper.slideTo(null !== rewindLastIndex ? rewindLastIndex : stopIndex);
                } else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
            }
        }
        function onResize() {
            const swiper = this;
            const {params, el} = swiper;
            if (el && 0 === el.offsetWidth) return;
            if (params.breakpoints) swiper.setBreakpoint();
            const {allowSlideNext, allowSlidePrev, snapGrid} = swiper;
            swiper.allowSlideNext = true;
            swiper.allowSlidePrev = true;
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateSlidesClasses();
            if (("auto" === params.slidesPerView || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) swiper.slideTo(swiper.slides.length - 1, 0, false, true); else swiper.slideTo(swiper.activeIndex, 0, false, true);
            if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.run();
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
        }
        function onClick(e) {
            const swiper = this;
            if (!swiper.enabled) return;
            if (!swiper.allowClick) {
                if (swiper.params.preventClicks) e.preventDefault();
                if (swiper.params.preventClicksPropagation && swiper.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        }
        function onScroll() {
            const swiper = this;
            const {wrapperEl, rtlTranslate, enabled} = swiper;
            if (!enabled) return;
            swiper.previousTranslate = swiper.translate;
            if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft; else swiper.translate = -wrapperEl.scrollTop;
            if (0 === swiper.translate) swiper.translate = 0;
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
            let newProgress;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            if (0 === translatesDiff) newProgress = 0; else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
            if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
            swiper.emit("setTranslate", swiper.translate, false);
        }
        let dummyEventAttached = false;
        function dummyEventListener() {}
        const events = (swiper, method) => {
            const document = ssr_window_esm_getDocument();
            const {params, touchEvents, el, wrapperEl, device, support} = swiper;
            const capture = !!params.nested;
            const domMethod = "on" === method ? "addEventListener" : "removeEventListener";
            const swiperMethod = method;
            if (!support.touch) {
                el[domMethod](touchEvents.start, swiper.onTouchStart, false);
                document[domMethod](touchEvents.move, swiper.onTouchMove, capture);
                document[domMethod](touchEvents.end, swiper.onTouchEnd, false);
            } else {
                const passiveListener = "touchstart" === touchEvents.start && support.passiveListener && params.passiveListeners ? {
                    passive: true,
                    capture: false
                } : false;
                el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
                el[domMethod](touchEvents.move, swiper.onTouchMove, support.passiveListener ? {
                    passive: false,
                    capture
                } : capture);
                el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);
                if (touchEvents.cancel) el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
            }
            if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
            if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
            if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true); else swiper[swiperMethod]("observerUpdate", onResize, true);
        };
        function attachEvents() {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            const {params, support} = swiper;
            swiper.onTouchStart = onTouchStart.bind(swiper);
            swiper.onTouchMove = onTouchMove.bind(swiper);
            swiper.onTouchEnd = onTouchEnd.bind(swiper);
            if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
            swiper.onClick = onClick.bind(swiper);
            if (support.touch && !dummyEventAttached) {
                document.addEventListener("touchstart", dummyEventListener);
                dummyEventAttached = true;
            }
            events(swiper, "on");
        }
        function detachEvents() {
            const swiper = this;
            events(swiper, "off");
        }
        const core_events = {
            attachEvents,
            detachEvents
        };
        const isGridEnabled = (swiper, params) => swiper.grid && params.grid && params.grid.rows > 1;
        function setBreakpoint() {
            const swiper = this;
            const {activeIndex, initialized, loopedSlides = 0, params, $el} = swiper;
            const breakpoints = params.breakpoints;
            if (!breakpoints || breakpoints && 0 === Object.keys(breakpoints).length) return;
            const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
            if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
            const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
            const breakpointParams = breakpointOnlyParams || swiper.originalParams;
            const wasMultiRow = isGridEnabled(swiper, params);
            const isMultiRow = isGridEnabled(swiper, breakpointParams);
            const wasEnabled = params.enabled;
            if (wasMultiRow && !isMultiRow) {
                $el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
                swiper.emitContainerClasses();
            } else if (!wasMultiRow && isMultiRow) {
                $el.addClass(`${params.containerModifierClass}grid`);
                if (breakpointParams.grid.fill && "column" === breakpointParams.grid.fill || !breakpointParams.grid.fill && "column" === params.grid.fill) $el.addClass(`${params.containerModifierClass}grid-column`);
                swiper.emitContainerClasses();
            }
            const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
            const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
            if (directionChanged && initialized) swiper.changeDirection();
            utils_extend(swiper.params, breakpointParams);
            const isEnabled = swiper.params.enabled;
            Object.assign(swiper, {
                allowTouchMove: swiper.params.allowTouchMove,
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev
            });
            if (wasEnabled && !isEnabled) swiper.disable(); else if (!wasEnabled && isEnabled) swiper.enable();
            swiper.currentBreakpoint = breakpoint;
            swiper.emit("_beforeBreakpoint", breakpointParams);
            if (needsReLoop && initialized) {
                swiper.loopDestroy();
                swiper.loopCreate();
                swiper.updateSlides();
                swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
            }
            swiper.emit("breakpoint", breakpointParams);
        }
        function getBreakpoint(breakpoints, base, containerEl) {
            if (void 0 === base) base = "window";
            if (!breakpoints || "container" === base && !containerEl) return;
            let breakpoint = false;
            const window = ssr_window_esm_getWindow();
            const currentHeight = "window" === base ? window.innerHeight : containerEl.clientHeight;
            const points = Object.keys(breakpoints).map((point => {
                if ("string" === typeof point && 0 === point.indexOf("@")) {
                    const minRatio = parseFloat(point.substr(1));
                    const value = currentHeight * minRatio;
                    return {
                        value,
                        point
                    };
                }
                return {
                    value: point,
                    point
                };
            }));
            points.sort(((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10)));
            for (let i = 0; i < points.length; i += 1) {
                const {point, value} = points[i];
                if ("window" === base) {
                    if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
                } else if (value <= containerEl.clientWidth) breakpoint = point;
            }
            return breakpoint || "max";
        }
        const breakpoints = {
            setBreakpoint,
            getBreakpoint
        };
        function prepareClasses(entries, prefix) {
            const resultClasses = [];
            entries.forEach((item => {
                if ("object" === typeof item) Object.keys(item).forEach((classNames => {
                    if (item[classNames]) resultClasses.push(prefix + classNames);
                })); else if ("string" === typeof item) resultClasses.push(prefix + item);
            }));
            return resultClasses;
        }
        function addClasses() {
            const swiper = this;
            const {classNames, params, rtl, $el, device, support} = swiper;
            const suffixes = prepareClasses([ "initialized", params.direction, {
                "pointer-events": !support.touch
            }, {
                "free-mode": swiper.params.freeMode && params.freeMode.enabled
            }, {
                autoheight: params.autoHeight
            }, {
                rtl
            }, {
                grid: params.grid && params.grid.rows > 1
            }, {
                "grid-column": params.grid && params.grid.rows > 1 && "column" === params.grid.fill
            }, {
                android: device.android
            }, {
                ios: device.ios
            }, {
                "css-mode": params.cssMode
            }, {
                centered: params.cssMode && params.centeredSlides
            }, {
                "watch-progress": params.watchSlidesProgress
            } ], params.containerModifierClass);
            classNames.push(...suffixes);
            $el.addClass([ ...classNames ].join(" "));
            swiper.emitContainerClasses();
        }
        function removeClasses_removeClasses() {
            const swiper = this;
            const {$el, classNames} = swiper;
            $el.removeClass(classNames.join(" "));
            swiper.emitContainerClasses();
        }
        const classes = {
            addClasses,
            removeClasses: removeClasses_removeClasses
        };
        function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
            const window = ssr_window_esm_getWindow();
            let image;
            function onReady() {
                if (callback) callback();
            }
            const isPicture = dom(imageEl).parent("picture")[0];
            if (!isPicture && (!imageEl.complete || !checkForComplete)) if (src) {
                image = new window.Image;
                image.onload = onReady;
                image.onerror = onReady;
                if (sizes) image.sizes = sizes;
                if (srcset) image.srcset = srcset;
                if (src) image.src = src;
            } else onReady(); else onReady();
        }
        function preloadImages() {
            const swiper = this;
            swiper.imagesToLoad = swiper.$el.find("img");
            function onReady() {
                if ("undefined" === typeof swiper || null === swiper || !swiper || swiper.destroyed) return;
                if (void 0 !== swiper.imagesLoaded) swiper.imagesLoaded += 1;
                if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
                    if (swiper.params.updateOnImagesReady) swiper.update();
                    swiper.emit("imagesReady");
                }
            }
            for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
                const imageEl = swiper.imagesToLoad[i];
                swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute("src"), imageEl.srcset || imageEl.getAttribute("srcset"), imageEl.sizes || imageEl.getAttribute("sizes"), true, onReady);
            }
        }
        const core_images = {
            loadImage,
            preloadImages
        };
        function checkOverflow() {
            const swiper = this;
            const {isLocked: wasLocked, params} = swiper;
            const {slidesOffsetBefore} = params;
            if (slidesOffsetBefore) {
                const lastSlideIndex = swiper.slides.length - 1;
                const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + 2 * slidesOffsetBefore;
                swiper.isLocked = swiper.size > lastSlideRightEdge;
            } else swiper.isLocked = 1 === swiper.snapGrid.length;
            if (true === params.allowSlideNext) swiper.allowSlideNext = !swiper.isLocked;
            if (true === params.allowSlidePrev) swiper.allowSlidePrev = !swiper.isLocked;
            if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
            if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
        }
        const check_overflow = {
            checkOverflow
        };
        const defaults = {
            init: true,
            direction: "horizontal",
            touchEventsTarget: "wrapper",
            initialSlide: 0,
            speed: 300,
            cssMode: false,
            updateOnWindowResize: true,
            resizeObserver: true,
            nested: false,
            createElements: false,
            enabled: true,
            focusableElements: "input, select, option, textarea, button, video, label",
            width: null,
            height: null,
            preventInteractionOnTransition: false,
            userAgent: null,
            url: null,
            edgeSwipeDetection: false,
            edgeSwipeThreshold: 20,
            autoHeight: false,
            setWrapperSize: false,
            virtualTranslate: false,
            effect: "slide",
            breakpoints: void 0,
            breakpointsBase: "window",
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            slidesPerGroupAuto: false,
            centeredSlides: false,
            centeredSlidesBounds: false,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: true,
            centerInsufficientSlides: false,
            watchOverflow: true,
            roundLengths: false,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: true,
            allowTouchMove: true,
            threshold: 0,
            touchMoveStopPropagation: false,
            touchStartPreventDefault: true,
            touchStartForcePreventDefault: false,
            touchReleaseOnEdges: false,
            uniqueNavElements: true,
            resistance: true,
            resistanceRatio: .85,
            watchSlidesProgress: false,
            grabCursor: false,
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            preloadImages: true,
            updateOnImagesReady: true,
            loop: false,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: false,
            loopPreventsSlide: true,
            rewind: false,
            allowSlidePrev: true,
            allowSlideNext: true,
            swipeHandler: null,
            noSwiping: true,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: true,
            maxBackfaceHiddenSlides: 10,
            containerModifierClass: "swiper-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: true,
            _emitClasses: false
        };
        function moduleExtendParams(params, allModulesParams) {
            return function extendParams(obj) {
                if (void 0 === obj) obj = {};
                const moduleParamName = Object.keys(obj)[0];
                const moduleParams = obj[moduleParamName];
                if ("object" !== typeof moduleParams || null === moduleParams) {
                    utils_extend(allModulesParams, obj);
                    return;
                }
                if ([ "navigation", "pagination", "scrollbar" ].indexOf(moduleParamName) >= 0 && true === params[moduleParamName]) params[moduleParamName] = {
                    auto: true
                };
                if (!(moduleParamName in params && "enabled" in moduleParams)) {
                    utils_extend(allModulesParams, obj);
                    return;
                }
                if (true === params[moduleParamName]) params[moduleParamName] = {
                    enabled: true
                };
                if ("object" === typeof params[moduleParamName] && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
                if (!params[moduleParamName]) params[moduleParamName] = {
                    enabled: false
                };
                utils_extend(allModulesParams, obj);
            };
        }
        const prototypes = {
            eventsEmitter: events_emitter,
            update,
            translate,
            transition: core_transition,
            slide,
            loop,
            grabCursor: grab_cursor,
            events: core_events,
            breakpoints,
            checkOverflow: check_overflow,
            classes,
            images: core_images
        };
        const extendedDefaults = {};
        class core_Swiper {
            constructor() {
                let el;
                let params;
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                if (1 === args.length && args[0].constructor && "Object" === Object.prototype.toString.call(args[0]).slice(8, -1)) params = args[0]; else [el, params] = args;
                if (!params) params = {};
                params = utils_extend({}, params);
                if (el && !params.el) params.el = el;
                if (params.el && dom(params.el).length > 1) {
                    const swipers = [];
                    dom(params.el).each((containerEl => {
                        const newParams = utils_extend({}, params, {
                            el: containerEl
                        });
                        swipers.push(new core_Swiper(newParams));
                    }));
                    return swipers;
                }
                const swiper = this;
                swiper.__swiper__ = true;
                swiper.support = getSupport();
                swiper.device = getDevice({
                    userAgent: params.userAgent
                });
                swiper.browser = getBrowser();
                swiper.eventsListeners = {};
                swiper.eventsAnyListeners = [];
                swiper.modules = [ ...swiper.__modules__ ];
                if (params.modules && Array.isArray(params.modules)) swiper.modules.push(...params.modules);
                const allModulesParams = {};
                swiper.modules.forEach((mod => {
                    mod({
                        swiper,
                        extendParams: moduleExtendParams(params, allModulesParams),
                        on: swiper.on.bind(swiper),
                        once: swiper.once.bind(swiper),
                        off: swiper.off.bind(swiper),
                        emit: swiper.emit.bind(swiper)
                    });
                }));
                const swiperParams = utils_extend({}, defaults, allModulesParams);
                swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
                swiper.originalParams = utils_extend({}, swiper.params);
                swiper.passedParams = utils_extend({}, params);
                if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach((eventName => {
                    swiper.on(eventName, swiper.params.on[eventName]);
                }));
                if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
                swiper.$ = dom;
                Object.assign(swiper, {
                    enabled: swiper.params.enabled,
                    el,
                    classNames: [],
                    slides: dom(),
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal() {
                        return "horizontal" === swiper.params.direction;
                    },
                    isVertical() {
                        return "vertical" === swiper.params.direction;
                    },
                    activeIndex: 0,
                    realIndex: 0,
                    isBeginning: true,
                    isEnd: false,
                    translate: 0,
                    previousTranslate: 0,
                    progress: 0,
                    velocity: 0,
                    animating: false,
                    allowSlideNext: swiper.params.allowSlideNext,
                    allowSlidePrev: swiper.params.allowSlidePrev,
                    touchEvents: function touchEvents() {
                        const touch = [ "touchstart", "touchmove", "touchend", "touchcancel" ];
                        const desktop = [ "pointerdown", "pointermove", "pointerup" ];
                        swiper.touchEventsTouch = {
                            start: touch[0],
                            move: touch[1],
                            end: touch[2],
                            cancel: touch[3]
                        };
                        swiper.touchEventsDesktop = {
                            start: desktop[0],
                            move: desktop[1],
                            end: desktop[2]
                        };
                        return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
                    }(),
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        focusableElements: swiper.params.focusableElements,
                        lastClickTime: utils_now(),
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        isTouchEvent: void 0,
                        startMoving: void 0
                    },
                    allowClick: true,
                    allowTouchMove: swiper.params.allowTouchMove,
                    touches: {
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        diff: 0
                    },
                    imagesToLoad: [],
                    imagesLoaded: 0
                });
                swiper.emit("_swiper");
                if (swiper.params.init) swiper.init();
                return swiper;
            }
            enable() {
                const swiper = this;
                if (swiper.enabled) return;
                swiper.enabled = true;
                if (swiper.params.grabCursor) swiper.setGrabCursor();
                swiper.emit("enable");
            }
            disable() {
                const swiper = this;
                if (!swiper.enabled) return;
                swiper.enabled = false;
                if (swiper.params.grabCursor) swiper.unsetGrabCursor();
                swiper.emit("disable");
            }
            setProgress(progress, speed) {
                const swiper = this;
                progress = Math.min(Math.max(progress, 0), 1);
                const min = swiper.minTranslate();
                const max = swiper.maxTranslate();
                const current = (max - min) * progress + min;
                swiper.translateTo(current, "undefined" === typeof speed ? 0 : speed);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            emitContainerClasses() {
                const swiper = this;
                if (!swiper.params._emitClasses || !swiper.el) return;
                const cls = swiper.el.className.split(" ").filter((className => 0 === className.indexOf("swiper") || 0 === className.indexOf(swiper.params.containerModifierClass)));
                swiper.emit("_containerClasses", cls.join(" "));
            }
            getSlideClasses(slideEl) {
                const swiper = this;
                if (swiper.destroyed) return "";
                return slideEl.className.split(" ").filter((className => 0 === className.indexOf("swiper-slide") || 0 === className.indexOf(swiper.params.slideClass))).join(" ");
            }
            emitSlidesClasses() {
                const swiper = this;
                if (!swiper.params._emitClasses || !swiper.el) return;
                const updates = [];
                swiper.slides.each((slideEl => {
                    const classNames = swiper.getSlideClasses(slideEl);
                    updates.push({
                        slideEl,
                        classNames
                    });
                    swiper.emit("_slideClass", slideEl, classNames);
                }));
                swiper.emit("_slideClasses", updates);
            }
            slidesPerViewDynamic(view, exact) {
                if (void 0 === view) view = "current";
                if (void 0 === exact) exact = false;
                const swiper = this;
                const {params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex} = swiper;
                let spv = 1;
                if (params.centeredSlides) {
                    let slideSize = slides[activeIndex].swiperSlideSize;
                    let breakLoop;
                    for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
                        slideSize += slides[i].swiperSlideSize;
                        spv += 1;
                        if (slideSize > swiperSize) breakLoop = true;
                    }
                    for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
                        slideSize += slides[i].swiperSlideSize;
                        spv += 1;
                        if (slideSize > swiperSize) breakLoop = true;
                    }
                } else if ("current" === view) for (let i = activeIndex + 1; i < slides.length; i += 1) {
                    const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
                    if (slideInView) spv += 1;
                } else for (let i = activeIndex - 1; i >= 0; i -= 1) {
                    const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
                    if (slideInView) spv += 1;
                }
                return spv;
            }
            update() {
                const swiper = this;
                if (!swiper || swiper.destroyed) return;
                const {snapGrid, params} = swiper;
                if (params.breakpoints) swiper.setBreakpoint();
                swiper.updateSize();
                swiper.updateSlides();
                swiper.updateProgress();
                swiper.updateSlidesClasses();
                function setTranslate() {
                    const translateValue = swiper.rtlTranslate ? -1 * swiper.translate : swiper.translate;
                    const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                    swiper.setTranslate(newTranslate);
                    swiper.updateActiveIndex();
                    swiper.updateSlidesClasses();
                }
                let translated;
                if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
                    setTranslate();
                    if (swiper.params.autoHeight) swiper.updateAutoHeight();
                } else {
                    if (("auto" === swiper.params.slidesPerView || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true); else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                    if (!translated) setTranslate();
                }
                if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
                swiper.emit("update");
            }
            changeDirection(newDirection, needUpdate) {
                if (void 0 === needUpdate) needUpdate = true;
                const swiper = this;
                const currentDirection = swiper.params.direction;
                if (!newDirection) newDirection = "horizontal" === currentDirection ? "vertical" : "horizontal";
                if (newDirection === currentDirection || "horizontal" !== newDirection && "vertical" !== newDirection) return swiper;
                swiper.$el.removeClass(`${swiper.params.containerModifierClass}${currentDirection}`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);
                swiper.emitContainerClasses();
                swiper.params.direction = newDirection;
                swiper.slides.each((slideEl => {
                    if ("vertical" === newDirection) slideEl.style.width = ""; else slideEl.style.height = "";
                }));
                swiper.emit("changeDirection");
                if (needUpdate) swiper.update();
                return swiper;
            }
            mount(el) {
                const swiper = this;
                if (swiper.mounted) return true;
                const $el = dom(el || swiper.params.el);
                el = $el[0];
                if (!el) return false;
                el.swiper = swiper;
                const getWrapperSelector = () => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
                const getWrapper = () => {
                    if (el && el.shadowRoot && el.shadowRoot.querySelector) {
                        const res = dom(el.shadowRoot.querySelector(getWrapperSelector()));
                        res.children = options => $el.children(options);
                        return res;
                    }
                    return $el.children(getWrapperSelector());
                };
                let $wrapperEl = getWrapper();
                if (0 === $wrapperEl.length && swiper.params.createElements) {
                    const document = ssr_window_esm_getDocument();
                    const wrapper = document.createElement("div");
                    $wrapperEl = dom(wrapper);
                    wrapper.className = swiper.params.wrapperClass;
                    $el.append(wrapper);
                    $el.children(`.${swiper.params.slideClass}`).each((slideEl => {
                        $wrapperEl.append(slideEl);
                    }));
                }
                Object.assign(swiper, {
                    $el,
                    el,
                    $wrapperEl,
                    wrapperEl: $wrapperEl[0],
                    mounted: true,
                    rtl: "rtl" === el.dir.toLowerCase() || "rtl" === $el.css("direction"),
                    rtlTranslate: "horizontal" === swiper.params.direction && ("rtl" === el.dir.toLowerCase() || "rtl" === $el.css("direction")),
                    wrongRTL: "-webkit-box" === $wrapperEl.css("display")
                });
                return true;
            }
            init(el) {
                const swiper = this;
                if (swiper.initialized) return swiper;
                const mounted = swiper.mount(el);
                if (false === mounted) return swiper;
                swiper.emit("beforeInit");
                if (swiper.params.breakpoints) swiper.setBreakpoint();
                swiper.addClasses();
                if (swiper.params.loop) swiper.loopCreate();
                swiper.updateSize();
                swiper.updateSlides();
                if (swiper.params.watchOverflow) swiper.checkOverflow();
                if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
                if (swiper.params.preloadImages) swiper.preloadImages();
                if (swiper.params.loop) swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true); else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
                swiper.attachEvents();
                swiper.initialized = true;
                swiper.emit("init");
                swiper.emit("afterInit");
                return swiper;
            }
            destroy(deleteInstance, cleanStyles) {
                if (void 0 === deleteInstance) deleteInstance = true;
                if (void 0 === cleanStyles) cleanStyles = true;
                const swiper = this;
                const {params, $el, $wrapperEl, slides} = swiper;
                if ("undefined" === typeof swiper.params || swiper.destroyed) return null;
                swiper.emit("beforeDestroy");
                swiper.initialized = false;
                swiper.detachEvents();
                if (params.loop) swiper.loopDestroy();
                if (cleanStyles) {
                    swiper.removeClasses();
                    $el.removeAttr("style");
                    $wrapperEl.removeAttr("style");
                    if (slides && slides.length) slides.removeClass([ params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass ].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index");
                }
                swiper.emit("destroy");
                Object.keys(swiper.eventsListeners).forEach((eventName => {
                    swiper.off(eventName);
                }));
                if (false !== deleteInstance) {
                    swiper.$el[0].swiper = null;
                    deleteProps(swiper);
                }
                swiper.destroyed = true;
                return null;
            }
            static extendDefaults(newDefaults) {
                utils_extend(extendedDefaults, newDefaults);
            }
            static get extendedDefaults() {
                return extendedDefaults;
            }
            static get defaults() {
                return defaults;
            }
            static installModule(mod) {
                if (!core_Swiper.prototype.__modules__) core_Swiper.prototype.__modules__ = [];
                const modules = core_Swiper.prototype.__modules__;
                if ("function" === typeof mod && modules.indexOf(mod) < 0) modules.push(mod);
            }
            static use(module) {
                if (Array.isArray(module)) {
                    module.forEach((m => core_Swiper.installModule(m)));
                    return core_Swiper;
                }
                core_Swiper.installModule(module);
                return core_Swiper;
            }
        }
        Object.keys(prototypes).forEach((prototypeGroup => {
            Object.keys(prototypes[prototypeGroup]).forEach((protoMethod => {
                core_Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
            }));
        }));
        core_Swiper.use([ Resize, Observer ]);
        const core = core_Swiper;
        function create_element_if_not_defined_createElementIfNotDefined(swiper, originalParams, params, checkProps) {
            const document = ssr_window_esm_getDocument();
            if (swiper.params.createElements) Object.keys(checkProps).forEach((key => {
                if (!params[key] && true === params.auto) {
                    let element = swiper.$el.children(`.${checkProps[key]}`)[0];
                    if (!element) {
                        element = document.createElement("div");
                        element.className = checkProps[key];
                        swiper.$el.append(element);
                    }
                    params[key] = element;
                    originalParams[key] = element;
                }
            }));
            return params;
        }
        function Navigation(_ref) {
            let {swiper, extendParams, on, emit} = _ref;
            extendParams({
                navigation: {
                    nextEl: null,
                    prevEl: null,
                    hideOnClick: false,
                    disabledClass: "swiper-button-disabled",
                    hiddenClass: "swiper-button-hidden",
                    lockClass: "swiper-button-lock"
                }
            });
            swiper.navigation = {
                nextEl: null,
                $nextEl: null,
                prevEl: null,
                $prevEl: null
            };
            function getEl(el) {
                let $el;
                if (el) {
                    $el = dom(el);
                    if (swiper.params.uniqueNavElements && "string" === typeof el && $el.length > 1 && 1 === swiper.$el.find(el).length) $el = swiper.$el.find(el);
                }
                return $el;
            }
            function toggleEl($el, disabled) {
                const params = swiper.params.navigation;
                if ($el && $el.length > 0) {
                    $el[disabled ? "addClass" : "removeClass"](params.disabledClass);
                    if ($el[0] && "BUTTON" === $el[0].tagName) $el[0].disabled = disabled;
                    if (swiper.params.watchOverflow && swiper.enabled) $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
                }
            }
            function update() {
                if (swiper.params.loop) return;
                const {$nextEl, $prevEl} = swiper.navigation;
                toggleEl($prevEl, swiper.isBeginning && !swiper.params.rewind);
                toggleEl($nextEl, swiper.isEnd && !swiper.params.rewind);
            }
            function onPrevClick(e) {
                e.preventDefault();
                if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
                swiper.slidePrev();
            }
            function onNextClick(e) {
                e.preventDefault();
                if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
                swiper.slideNext();
            }
            function init() {
                const params = swiper.params.navigation;
                swiper.params.navigation = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
                    nextEl: "swiper-button-next",
                    prevEl: "swiper-button-prev"
                });
                if (!(params.nextEl || params.prevEl)) return;
                const $nextEl = getEl(params.nextEl);
                const $prevEl = getEl(params.prevEl);
                if ($nextEl && $nextEl.length > 0) $nextEl.on("click", onNextClick);
                if ($prevEl && $prevEl.length > 0) $prevEl.on("click", onPrevClick);
                Object.assign(swiper.navigation, {
                    $nextEl,
                    nextEl: $nextEl && $nextEl[0],
                    $prevEl,
                    prevEl: $prevEl && $prevEl[0]
                });
                if (!swiper.enabled) {
                    if ($nextEl) $nextEl.addClass(params.lockClass);
                    if ($prevEl) $prevEl.addClass(params.lockClass);
                }
            }
            function destroy() {
                const {$nextEl, $prevEl} = swiper.navigation;
                if ($nextEl && $nextEl.length) {
                    $nextEl.off("click", onNextClick);
                    $nextEl.removeClass(swiper.params.navigation.disabledClass);
                }
                if ($prevEl && $prevEl.length) {
                    $prevEl.off("click", onPrevClick);
                    $prevEl.removeClass(swiper.params.navigation.disabledClass);
                }
            }
            on("init", (() => {
                init();
                update();
            }));
            on("toEdge fromEdge lock unlock", (() => {
                update();
            }));
            on("destroy", (() => {
                destroy();
            }));
            on("enable disable", (() => {
                const {$nextEl, $prevEl} = swiper.navigation;
                if ($nextEl) $nextEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
                if ($prevEl) $prevEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
            }));
            on("click", ((_s, e) => {
                const {$nextEl, $prevEl} = swiper.navigation;
                const targetEl = e.target;
                if (swiper.params.navigation.hideOnClick && !dom(targetEl).is($prevEl) && !dom(targetEl).is($nextEl)) {
                    if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
                    let isHidden;
                    if ($nextEl) isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass); else if ($prevEl) isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
                    if (true === isHidden) emit("navigationShow"); else emit("navigationHide");
                    if ($nextEl) $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
                    if ($prevEl) $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
                }
            }));
            Object.assign(swiper.navigation, {
                update,
                init,
                destroy
            });
        }
        function classes_to_selector_classesToSelector(classes) {
            if (void 0 === classes) classes = "";
            return `.${classes.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")}`;
        }
        function Pagination(_ref) {
            let {swiper, extendParams, on, emit} = _ref;
            const pfx = "swiper-pagination";
            extendParams({
                pagination: {
                    el: null,
                    bulletElement: "span",
                    clickable: false,
                    hideOnClick: false,
                    renderBullet: null,
                    renderProgressbar: null,
                    renderFraction: null,
                    renderCustom: null,
                    progressbarOpposite: false,
                    type: "bullets",
                    dynamicBullets: false,
                    dynamicMainBullets: 1,
                    formatFractionCurrent: number => number,
                    formatFractionTotal: number => number,
                    bulletClass: `${pfx}-bullet`,
                    bulletActiveClass: `${pfx}-bullet-active`,
                    modifierClass: `${pfx}-`,
                    currentClass: `${pfx}-current`,
                    totalClass: `${pfx}-total`,
                    hiddenClass: `${pfx}-hidden`,
                    progressbarFillClass: `${pfx}-progressbar-fill`,
                    progressbarOppositeClass: `${pfx}-progressbar-opposite`,
                    clickableClass: `${pfx}-clickable`,
                    lockClass: `${pfx}-lock`,
                    horizontalClass: `${pfx}-horizontal`,
                    verticalClass: `${pfx}-vertical`
                }
            });
            swiper.pagination = {
                el: null,
                $el: null,
                bullets: []
            };
            let bulletSize;
            let dynamicBulletIndex = 0;
            function isPaginationDisabled() {
                return !swiper.params.pagination.el || !swiper.pagination.el || !swiper.pagination.$el || 0 === swiper.pagination.$el.length;
            }
            function setSideBullets($bulletEl, position) {
                const {bulletActiveClass} = swiper.params.pagination;
                $bulletEl[position]().addClass(`${bulletActiveClass}-${position}`)[position]().addClass(`${bulletActiveClass}-${position}-${position}`);
            }
            function update() {
                const rtl = swiper.rtl;
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
                const $el = swiper.pagination.$el;
                let current;
                const total = swiper.params.loop ? Math.ceil((slidesLength - 2 * swiper.loopedSlides) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                if (swiper.params.loop) {
                    current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
                    if (current > slidesLength - 1 - 2 * swiper.loopedSlides) current -= slidesLength - 2 * swiper.loopedSlides;
                    if (current > total - 1) current -= total;
                    if (current < 0 && "bullets" !== swiper.params.paginationType) current = total + current;
                } else if ("undefined" !== typeof swiper.snapIndex) current = swiper.snapIndex; else current = swiper.activeIndex || 0;
                if ("bullets" === params.type && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
                    const bullets = swiper.pagination.bullets;
                    let firstIndex;
                    let lastIndex;
                    let midIndex;
                    if (params.dynamicBullets) {
                        bulletSize = bullets.eq(0)[swiper.isHorizontal() ? "outerWidth" : "outerHeight"](true);
                        $el.css(swiper.isHorizontal() ? "width" : "height", `${bulletSize * (params.dynamicMainBullets + 4)}px`);
                        if (params.dynamicMainBullets > 1 && void 0 !== swiper.previousIndex) {
                            dynamicBulletIndex += current - (swiper.previousIndex - swiper.loopedSlides || 0);
                            if (dynamicBulletIndex > params.dynamicMainBullets - 1) dynamicBulletIndex = params.dynamicMainBullets - 1; else if (dynamicBulletIndex < 0) dynamicBulletIndex = 0;
                        }
                        firstIndex = Math.max(current - dynamicBulletIndex, 0);
                        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
                        midIndex = (lastIndex + firstIndex) / 2;
                    }
                    bullets.removeClass([ "", "-next", "-next-next", "-prev", "-prev-prev", "-main" ].map((suffix => `${params.bulletActiveClass}${suffix}`)).join(" "));
                    if ($el.length > 1) bullets.each((bullet => {
                        const $bullet = dom(bullet);
                        const bulletIndex = $bullet.index();
                        if (bulletIndex === current) $bullet.addClass(params.bulletActiveClass);
                        if (params.dynamicBullets) {
                            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) $bullet.addClass(`${params.bulletActiveClass}-main`);
                            if (bulletIndex === firstIndex) setSideBullets($bullet, "prev");
                            if (bulletIndex === lastIndex) setSideBullets($bullet, "next");
                        }
                    })); else {
                        const $bullet = bullets.eq(current);
                        const bulletIndex = $bullet.index();
                        $bullet.addClass(params.bulletActiveClass);
                        if (params.dynamicBullets) {
                            const $firstDisplayedBullet = bullets.eq(firstIndex);
                            const $lastDisplayedBullet = bullets.eq(lastIndex);
                            for (let i = firstIndex; i <= lastIndex; i += 1) bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);
                            if (swiper.params.loop) if (bulletIndex >= bullets.length) {
                                for (let i = params.dynamicMainBullets; i >= 0; i -= 1) bullets.eq(bullets.length - i).addClass(`${params.bulletActiveClass}-main`);
                                bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(`${params.bulletActiveClass}-prev`);
                            } else {
                                setSideBullets($firstDisplayedBullet, "prev");
                                setSideBullets($lastDisplayedBullet, "next");
                            } else {
                                setSideBullets($firstDisplayedBullet, "prev");
                                setSideBullets($lastDisplayedBullet, "next");
                            }
                        }
                    }
                    if (params.dynamicBullets) {
                        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
                        const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
                        const offsetProp = rtl ? "right" : "left";
                        bullets.css(swiper.isHorizontal() ? offsetProp : "top", `${bulletsOffset}px`);
                    }
                }
                if ("fraction" === params.type) {
                    $el.find(classes_to_selector_classesToSelector(params.currentClass)).text(params.formatFractionCurrent(current + 1));
                    $el.find(classes_to_selector_classesToSelector(params.totalClass)).text(params.formatFractionTotal(total));
                }
                if ("progressbar" === params.type) {
                    let progressbarDirection;
                    if (params.progressbarOpposite) progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal"; else progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
                    const scale = (current + 1) / total;
                    let scaleX = 1;
                    let scaleY = 1;
                    if ("horizontal" === progressbarDirection) scaleX = scale; else scaleY = scale;
                    $el.find(classes_to_selector_classesToSelector(params.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`).transition(swiper.params.speed);
                }
                if ("custom" === params.type && params.renderCustom) {
                    $el.html(params.renderCustom(swiper, current + 1, total));
                    emit("paginationRender", $el[0]);
                } else emit("paginationUpdate", $el[0]);
                if (swiper.params.watchOverflow && swiper.enabled) $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
            }
            function render() {
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
                const $el = swiper.pagination.$el;
                let paginationHTML = "";
                if ("bullets" === params.type) {
                    let numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - 2 * swiper.loopedSlides) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                    if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.loop && numberOfBullets > slidesLength) numberOfBullets = slidesLength;
                    for (let i = 0; i < numberOfBullets; i += 1) if (params.renderBullet) paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass); else paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
                    $el.html(paginationHTML);
                    swiper.pagination.bullets = $el.find(classes_to_selector_classesToSelector(params.bulletClass));
                }
                if ("fraction" === params.type) {
                    if (params.renderFraction) paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass); else paginationHTML = `<span class="${params.currentClass}"></span>` + " / " + `<span class="${params.totalClass}"></span>`;
                    $el.html(paginationHTML);
                }
                if ("progressbar" === params.type) {
                    if (params.renderProgressbar) paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass); else paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
                    $el.html(paginationHTML);
                }
                if ("custom" !== params.type) emit("paginationRender", swiper.pagination.$el[0]);
            }
            function init() {
                swiper.params.pagination = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
                    el: "swiper-pagination"
                });
                const params = swiper.params.pagination;
                if (!params.el) return;
                let $el = dom(params.el);
                if (0 === $el.length) return;
                if (swiper.params.uniqueNavElements && "string" === typeof params.el && $el.length > 1) {
                    $el = swiper.$el.find(params.el);
                    if ($el.length > 1) $el = $el.filter((el => {
                        if (dom(el).parents(".swiper")[0] !== swiper.el) return false;
                        return true;
                    }));
                }
                if ("bullets" === params.type && params.clickable) $el.addClass(params.clickableClass);
                $el.addClass(params.modifierClass + params.type);
                $el.addClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                if ("bullets" === params.type && params.dynamicBullets) {
                    $el.addClass(`${params.modifierClass}${params.type}-dynamic`);
                    dynamicBulletIndex = 0;
                    if (params.dynamicMainBullets < 1) params.dynamicMainBullets = 1;
                }
                if ("progressbar" === params.type && params.progressbarOpposite) $el.addClass(params.progressbarOppositeClass);
                if (params.clickable) $el.on("click", classes_to_selector_classesToSelector(params.bulletClass), (function onClick(e) {
                    e.preventDefault();
                    let index = dom(this).index() * swiper.params.slidesPerGroup;
                    if (swiper.params.loop) index += swiper.loopedSlides;
                    swiper.slideTo(index);
                }));
                Object.assign(swiper.pagination, {
                    $el,
                    el: $el[0]
                });
                if (!swiper.enabled) $el.addClass(params.lockClass);
            }
            function destroy() {
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                const $el = swiper.pagination.$el;
                $el.removeClass(params.hiddenClass);
                $el.removeClass(params.modifierClass + params.type);
                $el.removeClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                if (swiper.pagination.bullets && swiper.pagination.bullets.removeClass) swiper.pagination.bullets.removeClass(params.bulletActiveClass);
                if (params.clickable) $el.off("click", classes_to_selector_classesToSelector(params.bulletClass));
            }
            on("init", (() => {
                init();
                render();
                update();
            }));
            on("activeIndexChange", (() => {
                if (swiper.params.loop) update(); else if ("undefined" === typeof swiper.snapIndex) update();
            }));
            on("snapIndexChange", (() => {
                if (!swiper.params.loop) update();
            }));
            on("slidesLengthChange", (() => {
                if (swiper.params.loop) {
                    render();
                    update();
                }
            }));
            on("snapGridLengthChange", (() => {
                if (!swiper.params.loop) {
                    render();
                    update();
                }
            }));
            on("destroy", (() => {
                destroy();
            }));
            on("enable disable", (() => {
                const {$el} = swiper.pagination;
                if ($el) $el[swiper.enabled ? "removeClass" : "addClass"](swiper.params.pagination.lockClass);
            }));
            on("lock unlock", (() => {
                update();
            }));
            on("click", ((_s, e) => {
                const targetEl = e.target;
                const {$el} = swiper.pagination;
                if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && $el.length > 0 && !dom(targetEl).hasClass(swiper.params.pagination.bulletClass)) {
                    if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
                    const isHidden = $el.hasClass(swiper.params.pagination.hiddenClass);
                    if (true === isHidden) emit("paginationShow"); else emit("paginationHide");
                    $el.toggleClass(swiper.params.pagination.hiddenClass);
                }
            }));
            Object.assign(swiper.pagination, {
                render,
                update,
                init,
                destroy
            });
        }
        function Autoplay(_ref) {
            let {swiper, extendParams, on, emit} = _ref;
            let timeout;
            swiper.autoplay = {
                running: false,
                paused: false
            };
            extendParams({
                autoplay: {
                    enabled: false,
                    delay: 3e3,
                    waitForTransition: true,
                    disableOnInteraction: true,
                    stopOnLastSlide: false,
                    reverseDirection: false,
                    pauseOnMouseEnter: false
                }
            });
            function run() {
                const $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
                let delay = swiper.params.autoplay.delay;
                if ($activeSlideEl.attr("data-swiper-autoplay")) delay = $activeSlideEl.attr("data-swiper-autoplay") || swiper.params.autoplay.delay;
                clearTimeout(timeout);
                timeout = utils_nextTick((() => {
                    let autoplayResult;
                    if (swiper.params.autoplay.reverseDirection) if (swiper.params.loop) {
                        swiper.loopFix();
                        autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.isBeginning) {
                        autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.params.autoplay.stopOnLastSlide) {
                        autoplayResult = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
                        emit("autoplay");
                    } else stop(); else if (swiper.params.loop) {
                        swiper.loopFix();
                        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.isEnd) {
                        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.params.autoplay.stopOnLastSlide) {
                        autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);
                        emit("autoplay");
                    } else stop();
                    if (swiper.params.cssMode && swiper.autoplay.running) run(); else if (false === autoplayResult) run();
                }), delay);
            }
            function start() {
                if ("undefined" !== typeof timeout) return false;
                if (swiper.autoplay.running) return false;
                swiper.autoplay.running = true;
                emit("autoplayStart");
                run();
                return true;
            }
            function stop() {
                if (!swiper.autoplay.running) return false;
                if ("undefined" === typeof timeout) return false;
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = void 0;
                }
                swiper.autoplay.running = false;
                emit("autoplayStop");
                return true;
            }
            function pause(speed) {
                if (!swiper.autoplay.running) return;
                if (swiper.autoplay.paused) return;
                if (timeout) clearTimeout(timeout);
                swiper.autoplay.paused = true;
                if (0 === speed || !swiper.params.autoplay.waitForTransition) {
                    swiper.autoplay.paused = false;
                    run();
                } else [ "transitionend", "webkitTransitionEnd" ].forEach((event => {
                    swiper.$wrapperEl[0].addEventListener(event, onTransitionEnd);
                }));
            }
            function onVisibilityChange() {
                const document = ssr_window_esm_getDocument();
                if ("hidden" === document.visibilityState && swiper.autoplay.running) pause();
                if ("visible" === document.visibilityState && swiper.autoplay.paused) {
                    run();
                    swiper.autoplay.paused = false;
                }
            }
            function onTransitionEnd(e) {
                if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
                if (e.target !== swiper.$wrapperEl[0]) return;
                [ "transitionend", "webkitTransitionEnd" ].forEach((event => {
                    swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
                }));
                swiper.autoplay.paused = false;
                if (!swiper.autoplay.running) stop(); else run();
            }
            function onMouseEnter() {
                if (swiper.params.autoplay.disableOnInteraction) stop(); else {
                    emit("autoplayPause");
                    pause();
                }
                [ "transitionend", "webkitTransitionEnd" ].forEach((event => {
                    swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
                }));
            }
            function onMouseLeave() {
                if (swiper.params.autoplay.disableOnInteraction) return;
                swiper.autoplay.paused = false;
                emit("autoplayResume");
                run();
            }
            function attachMouseEvents() {
                if (swiper.params.autoplay.pauseOnMouseEnter) {
                    swiper.$el.on("mouseenter", onMouseEnter);
                    swiper.$el.on("mouseleave", onMouseLeave);
                }
            }
            function detachMouseEvents() {
                swiper.$el.off("mouseenter", onMouseEnter);
                swiper.$el.off("mouseleave", onMouseLeave);
            }
            on("init", (() => {
                if (swiper.params.autoplay.enabled) {
                    start();
                    const document = ssr_window_esm_getDocument();
                    document.addEventListener("visibilitychange", onVisibilityChange);
                    attachMouseEvents();
                }
            }));
            on("beforeTransitionStart", ((_s, speed, internal) => {
                if (swiper.autoplay.running) if (internal || !swiper.params.autoplay.disableOnInteraction) swiper.autoplay.pause(speed); else stop();
            }));
            on("sliderFirstMove", (() => {
                if (swiper.autoplay.running) if (swiper.params.autoplay.disableOnInteraction) stop(); else pause();
            }));
            on("touchEnd", (() => {
                if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) run();
            }));
            on("destroy", (() => {
                detachMouseEvents();
                if (swiper.autoplay.running) stop();
                const document = ssr_window_esm_getDocument();
                document.removeEventListener("visibilitychange", onVisibilityChange);
            }));
            Object.assign(swiper.autoplay, {
                pause,
                run,
                start,
                stop
            });
        }
        function initSliders() {
            if (document.querySelector(".marquee-page__slider")) new core(".marquee-page__slider", {
                modules: [ Autoplay ],
                observer: true,
                observeParents: true,
                slidesPerView: "auto",
                spaceBetween: 15,
                speed: 4e3,
                allowTouchMove: false,
                loop: true,
                autoplay: {
                    delay: 0,
                    stopOnLastSlide: false,
                    reverseDirection: true,
                    disableOnInteraction: false
                }
            });
            if (document.querySelector(".slider-team-page__slider")) new core(".slider-team-page__slider", {
                modules: [ Navigation, Pagination ],
                pagination: {
                    el: ".slider-team-page__bullets",
                    clickable: true
                },
                observer: true,
                observeParents: true,
                slidesPerView: 3,
                spaceBetween: 54,
                speed: 600,
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 15
                    },
                    478: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 54
                    }
                }
            });
            if (document.querySelector(".team-page__list-slider")) new core(".team-page__list-slider", {
                modules: [ Autoplay ],
                observer: true,
                observeParents: true,
                slidesPerView: "auto",
                spaceBetween: 20,
                speed: 5e3,
                allowTouchMove: false,
                loop: true,
                loopedSlides: 10,
                autoplay: {
                    delay: 0,
                    stopOnLastSlide: false,
                    reverseDirection: true,
                    disableOnInteraction: false
                }
            });
        }
        window.addEventListener("load", (function(e) {
            initSliders();
        }));
        const requestAnimFrame = function() {
            if ("undefined" === typeof window) return function(callback) {
                return callback();
            };
            return window.requestAnimationFrame;
        }();
        function throttled(fn, thisArg, updateFn) {
            const updateArgs = updateFn || (args => Array.prototype.slice.call(args));
            let ticking = false;
            let args = [];
            return function(...rest) {
                args = updateArgs(rest);
                if (!ticking) {
                    ticking = true;
                    requestAnimFrame.call(window, (() => {
                        ticking = false;
                        fn.apply(thisArg, args);
                    }));
                }
            };
        }
        function debounce(fn, delay) {
            let timeout;
            return function(...args) {
                if (delay) {
                    clearTimeout(timeout);
                    timeout = setTimeout(fn, delay, args);
                } else fn.apply(this, args);
                return delay;
            };
        }
        const _toLeftRightCenter = align => "start" === align ? "left" : "end" === align ? "right" : "center";
        const _alignStartEnd = (align, start, end) => "start" === align ? start : "end" === align ? end : (start + end) / 2;
        const _textX = (align, left, right, rtl) => {
            const check = rtl ? "left" : "right";
            return align === check ? right : "center" === align ? (left + right) / 2 : left;
        };
        function noop() {}
        const uid = function() {
            let id = 0;
            return function() {
                return id++;
            };
        }();
        function isNullOrUndef(value) {
            return null === value || "undefined" === typeof value;
        }
        function isArray(value) {
            if (Array.isArray && Array.isArray(value)) return true;
            const type = Object.prototype.toString.call(value);
            if ("[object" === type.substr(0, 7) && "Array]" === type.substr(-6)) return true;
            return false;
        }
        function helpers_segment_isObject(value) {
            return null !== value && "[object Object]" === Object.prototype.toString.call(value);
        }
        const isNumberFinite = value => ("number" === typeof value || value instanceof Number) && isFinite(+value);
        function finiteOrDefault(value, defaultValue) {
            return isNumberFinite(value) ? value : defaultValue;
        }
        function valueOrDefault(value, defaultValue) {
            return "undefined" === typeof value ? defaultValue : value;
        }
        const toPercentage = (value, dimension) => "string" === typeof value && value.endsWith("%") ? parseFloat(value) / 100 : value / dimension;
        const toDimension = (value, dimension) => "string" === typeof value && value.endsWith("%") ? parseFloat(value) / 100 * dimension : +value;
        function callback(fn, args, thisArg) {
            if (fn && "function" === typeof fn.call) return fn.apply(thisArg, args);
        }
        function helpers_segment_each(loopable, fn, thisArg, reverse) {
            let i, len, keys;
            if (isArray(loopable)) {
                len = loopable.length;
                if (reverse) for (i = len - 1; i >= 0; i--) fn.call(thisArg, loopable[i], i); else for (i = 0; i < len; i++) fn.call(thisArg, loopable[i], i);
            } else if (helpers_segment_isObject(loopable)) {
                keys = Object.keys(loopable);
                len = keys.length;
                for (i = 0; i < len; i++) fn.call(thisArg, loopable[keys[i]], keys[i]);
            }
        }
        function _elementsEqual(a0, a1) {
            let i, ilen, v0, v1;
            if (!a0 || !a1 || a0.length !== a1.length) return false;
            for (i = 0, ilen = a0.length; i < ilen; ++i) {
                v0 = a0[i];
                v1 = a1[i];
                if (v0.datasetIndex !== v1.datasetIndex || v0.index !== v1.index) return false;
            }
            return true;
        }
        function clone$1(source) {
            if (isArray(source)) return source.map(clone$1);
            if (helpers_segment_isObject(source)) {
                const target = Object.create(null);
                const keys = Object.keys(source);
                const klen = keys.length;
                let k = 0;
                for (;k < klen; ++k) target[keys[k]] = clone$1(source[keys[k]]);
                return target;
            }
            return source;
        }
        function isValidKey(key) {
            return -1 === [ "__proto__", "prototype", "constructor" ].indexOf(key);
        }
        function _merger(key, target, source, options) {
            if (!isValidKey(key)) return;
            const tval = target[key];
            const sval = source[key];
            if (helpers_segment_isObject(tval) && helpers_segment_isObject(sval)) merge(tval, sval, options); else target[key] = clone$1(sval);
        }
        function merge(target, source, options) {
            const sources = isArray(source) ? source : [ source ];
            const ilen = sources.length;
            if (!helpers_segment_isObject(target)) return target;
            options = options || {};
            const merger = options.merger || _merger;
            for (let i = 0; i < ilen; ++i) {
                source = sources[i];
                if (!helpers_segment_isObject(source)) continue;
                const keys = Object.keys(source);
                for (let k = 0, klen = keys.length; k < klen; ++k) merger(keys[k], target, source, options);
            }
            return target;
        }
        function mergeIf(target, source) {
            return merge(target, source, {
                merger: _mergerIf
            });
        }
        function _mergerIf(key, target, source) {
            if (!isValidKey(key)) return;
            const tval = target[key];
            const sval = source[key];
            if (helpers_segment_isObject(tval) && helpers_segment_isObject(sval)) mergeIf(tval, sval); else if (!Object.prototype.hasOwnProperty.call(target, key)) target[key] = clone$1(sval);
        }
        const emptyString = "";
        const dot = ".";
        function indexOfDotOrLength(key, start) {
            const idx = key.indexOf(dot, start);
            return -1 === idx ? key.length : idx;
        }
        function resolveObjectKey(obj, key) {
            if (key === emptyString) return obj;
            let pos = 0;
            let idx = indexOfDotOrLength(key, pos);
            while (obj && idx > pos) {
                obj = obj[key.substr(pos, idx - pos)];
                pos = idx + 1;
                idx = indexOfDotOrLength(key, pos);
            }
            return obj;
        }
        function _capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        const defined = value => "undefined" !== typeof value;
        const isFunction = value => "function" === typeof value;
        const setsEqual = (a, b) => {
            if (a.size !== b.size) return false;
            for (const item of a) if (!b.has(item)) return false;
            return true;
        };
        function _isClickEvent(e) {
            return "mouseup" === e.type || "click" === e.type || "contextmenu" === e.type;
        }
        const PI = Math.PI;
        const TAU = 2 * PI;
        const PITAU = TAU + PI;
        const INFINITY = Number.POSITIVE_INFINITY;
        const RAD_PER_DEG = PI / 180;
        const HALF_PI = PI / 2;
        const QUARTER_PI = PI / 4;
        const TWO_THIRDS_PI = 2 * PI / 3;
        const log10 = Math.log10;
        const sign = Math.sign;
        function niceNum(range) {
            const roundedRange = Math.round(range);
            range = almostEquals(range, roundedRange, range / 1e3) ? roundedRange : range;
            const niceRange = Math.pow(10, Math.floor(log10(range)));
            const fraction = range / niceRange;
            const niceFraction = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
            return niceFraction * niceRange;
        }
        function _factorize(value) {
            const result = [];
            const sqrt = Math.sqrt(value);
            let i;
            for (i = 1; i < sqrt; i++) if (value % i === 0) {
                result.push(i);
                result.push(value / i);
            }
            if (sqrt === (0 | sqrt)) result.push(sqrt);
            result.sort(((a, b) => a - b)).pop();
            return result;
        }
        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
        function almostEquals(x, y, epsilon) {
            return Math.abs(x - y) < epsilon;
        }
        function almostWhole(x, epsilon) {
            const rounded = Math.round(x);
            return rounded - epsilon <= x && rounded + epsilon >= x;
        }
        function _setMinAndMaxByKey(array, target, property) {
            let i, ilen, value;
            for (i = 0, ilen = array.length; i < ilen; i++) {
                value = array[i][property];
                if (!isNaN(value)) {
                    target.min = Math.min(target.min, value);
                    target.max = Math.max(target.max, value);
                }
            }
        }
        function toRadians(degrees) {
            return degrees * (PI / 180);
        }
        function toDegrees(radians) {
            return radians * (180 / PI);
        }
        function _decimalPlaces(x) {
            if (!isNumberFinite(x)) return;
            let e = 1;
            let p = 0;
            while (Math.round(x * e) / e !== x) {
                e *= 10;
                p++;
            }
            return p;
        }
        function getAngleFromPoint(centrePoint, anglePoint) {
            const distanceFromXCenter = anglePoint.x - centrePoint.x;
            const distanceFromYCenter = anglePoint.y - centrePoint.y;
            const radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
            let angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
            if (angle < -.5 * PI) angle += TAU;
            return {
                angle,
                distance: radialDistanceFromCenter
            };
        }
        function distanceBetweenPoints(pt1, pt2) {
            return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
        }
        function _angleDiff(a, b) {
            return (a - b + PITAU) % TAU - PI;
        }
        function _normalizeAngle(a) {
            return (a % TAU + TAU) % TAU;
        }
        function _angleBetween(angle, start, end, sameAngleIsFullCircle) {
            const a = _normalizeAngle(angle);
            const s = _normalizeAngle(start);
            const e = _normalizeAngle(end);
            const angleToStart = _normalizeAngle(s - a);
            const angleToEnd = _normalizeAngle(e - a);
            const startToAngle = _normalizeAngle(a - s);
            const endToAngle = _normalizeAngle(a - e);
            return a === s || a === e || sameAngleIsFullCircle && s === e || angleToStart > angleToEnd && startToAngle < endToAngle;
        }
        function _limitValue(value, min, max) {
            return Math.max(min, Math.min(max, value));
        }
        function _int16Range(value) {
            return _limitValue(value, -32768, 32767);
        }
        function _isBetween(value, start, end, epsilon = 1e-6) {
            return value >= Math.min(start, end) - epsilon && value <= Math.max(start, end) + epsilon;
        }
        const atEdge = t => 0 === t || 1 === t;
        const elasticIn = (t, s, p) => -Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * TAU / p);
        const elasticOut = (t, s, p) => Math.pow(2, -10 * t) * Math.sin((t - s) * TAU / p) + 1;
        const effects = {
            linear: t => t,
            easeInQuad: t => t * t,
            easeOutQuad: t => -t * (t - 2),
            easeInOutQuad: t => (t /= .5) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1),
            easeInCubic: t => t * t * t,
            easeOutCubic: t => (t -= 1) * t * t + 1,
            easeInOutCubic: t => (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2),
            easeInQuart: t => t * t * t * t,
            easeOutQuart: t => -((t -= 1) * t * t * t - 1),
            easeInOutQuart: t => (t /= .5) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2),
            easeInQuint: t => t * t * t * t * t,
            easeOutQuint: t => (t -= 1) * t * t * t * t + 1,
            easeInOutQuint: t => (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2),
            easeInSine: t => -Math.cos(t * HALF_PI) + 1,
            easeOutSine: t => Math.sin(t * HALF_PI),
            easeInOutSine: t => -.5 * (Math.cos(PI * t) - 1),
            easeInExpo: t => 0 === t ? 0 : Math.pow(2, 10 * (t - 1)),
            easeOutExpo: t => 1 === t ? 1 : -Math.pow(2, -10 * t) + 1,
            easeInOutExpo: t => atEdge(t) ? t : t < .5 ? .5 * Math.pow(2, 10 * (2 * t - 1)) : .5 * (-Math.pow(2, -10 * (2 * t - 1)) + 2),
            easeInCirc: t => t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1),
            easeOutCirc: t => Math.sqrt(1 - (t -= 1) * t),
            easeInOutCirc: t => (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
            easeInElastic: t => atEdge(t) ? t : elasticIn(t, .075, .3),
            easeOutElastic: t => atEdge(t) ? t : elasticOut(t, .075, .3),
            easeInOutElastic(t) {
                const s = .1125;
                const p = .45;
                return atEdge(t) ? t : t < .5 ? .5 * elasticIn(2 * t, s, p) : .5 + .5 * elasticOut(2 * t - 1, s, p);
            },
            easeInBack(t) {
                const s = 1.70158;
                return t * t * ((s + 1) * t - s);
            },
            easeOutBack(t) {
                const s = 1.70158;
                return (t -= 1) * t * ((s + 1) * t + s) + 1;
            },
            easeInOutBack(t) {
                let s = 1.70158;
                if ((t /= .5) < 1) return .5 * (t * t * (((s *= 1.525) + 1) * t - s));
                return .5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
            },
            easeInBounce: t => 1 - effects.easeOutBounce(1 - t),
            easeOutBounce(t) {
                const m = 7.5625;
                const d = 2.75;
                if (t < 1 / d) return m * t * t;
                if (t < 2 / d) return m * (t -= 1.5 / d) * t + .75;
                if (t < 2.5 / d) return m * (t -= 2.25 / d) * t + .9375;
                return m * (t -= 2.625 / d) * t + .984375;
            },
            easeInOutBounce: t => t < .5 ? .5 * effects.easeInBounce(2 * t) : .5 * effects.easeOutBounce(2 * t - 1) + .5
        };
        /*!
 * @kurkle/color v0.1.9
 * https://github.com/kurkle/color#readme
 * (c) 2020 Jukka Kurkela
 * Released under the MIT License
 */        const map = {
            0: 0,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            A: 10,
            B: 11,
            C: 12,
            D: 13,
            E: 14,
            F: 15,
            a: 10,
            b: 11,
            c: 12,
            d: 13,
            e: 14,
            f: 15
        };
        const hex = "0123456789ABCDEF";
        const h1 = b => hex[15 & b];
        const h2 = b => hex[(240 & b) >> 4] + hex[15 & b];
        const helpers_segment_eq = b => (240 & b) >> 4 === (15 & b);
        function isShort(v) {
            return helpers_segment_eq(v.r) && helpers_segment_eq(v.g) && helpers_segment_eq(v.b) && helpers_segment_eq(v.a);
        }
        function hexParse(str) {
            var len = str.length;
            var ret;
            if ("#" === str[0]) if (4 === len || 5 === len) ret = {
                r: 255 & 17 * map[str[1]],
                g: 255 & 17 * map[str[2]],
                b: 255 & 17 * map[str[3]],
                a: 5 === len ? 17 * map[str[4]] : 255
            }; else if (7 === len || 9 === len) ret = {
                r: map[str[1]] << 4 | map[str[2]],
                g: map[str[3]] << 4 | map[str[4]],
                b: map[str[5]] << 4 | map[str[6]],
                a: 9 === len ? map[str[7]] << 4 | map[str[8]] : 255
            };
            return ret;
        }
        function hexString(v) {
            var f = isShort(v) ? h1 : h2;
            return v ? "#" + f(v.r) + f(v.g) + f(v.b) + (v.a < 255 ? f(v.a) : "") : v;
        }
        function round(v) {
            return v + .5 | 0;
        }
        const lim = (v, l, h) => Math.max(Math.min(v, h), l);
        function p2b(v) {
            return lim(round(2.55 * v), 0, 255);
        }
        function n2b(v) {
            return lim(round(255 * v), 0, 255);
        }
        function b2n(v) {
            return lim(round(v / 2.55) / 100, 0, 1);
        }
        function n2p(v) {
            return lim(round(100 * v), 0, 100);
        }
        const RGB_RE = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
        function rgbParse(str) {
            const m = RGB_RE.exec(str);
            let a = 255;
            let r, g, b;
            if (!m) return;
            if (m[7] !== r) {
                const v = +m[7];
                a = 255 & (m[8] ? p2b(v) : 255 * v);
            }
            r = +m[1];
            g = +m[3];
            b = +m[5];
            r = 255 & (m[2] ? p2b(r) : r);
            g = 255 & (m[4] ? p2b(g) : g);
            b = 255 & (m[6] ? p2b(b) : b);
            return {
                r,
                g,
                b,
                a
            };
        }
        function rgbString(v) {
            return v && (v.a < 255 ? `rgba(${v.r}, ${v.g}, ${v.b}, ${b2n(v.a)})` : `rgb(${v.r}, ${v.g}, ${v.b})`);
        }
        const HUE_RE = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
        function hsl2rgbn(h, s, l) {
            const a = s * Math.min(l, 1 - l);
            const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return [ f(0), f(8), f(4) ];
        }
        function hsv2rgbn(h, s, v) {
            const f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
            return [ f(5), f(3), f(1) ];
        }
        function hwb2rgbn(h, w, b) {
            const rgb = hsl2rgbn(h, 1, .5);
            let i;
            if (w + b > 1) {
                i = 1 / (w + b);
                w *= i;
                b *= i;
            }
            for (i = 0; i < 3; i++) {
                rgb[i] *= 1 - w - b;
                rgb[i] += w;
            }
            return rgb;
        }
        function rgb2hsl(v) {
            const range = 255;
            const r = v.r / range;
            const g = v.g / range;
            const b = v.b / range;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const l = (max + min) / 2;
            let h, s, d;
            if (max !== min) {
                d = max - min;
                s = l > .5 ? d / (2 - max - min) : d / (max + min);
                h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
                h = 60 * h + .5;
            }
            return [ 0 | h, s || 0, l ];
        }
        function calln(f, a, b, c) {
            return (Array.isArray(a) ? f(a[0], a[1], a[2]) : f(a, b, c)).map(n2b);
        }
        function hsl2rgb(h, s, l) {
            return calln(hsl2rgbn, h, s, l);
        }
        function hwb2rgb(h, w, b) {
            return calln(hwb2rgbn, h, w, b);
        }
        function hsv2rgb(h, s, v) {
            return calln(hsv2rgbn, h, s, v);
        }
        function hue(h) {
            return (h % 360 + 360) % 360;
        }
        function hueParse(str) {
            const m = HUE_RE.exec(str);
            let a = 255;
            let v;
            if (!m) return;
            if (m[5] !== v) a = m[6] ? p2b(+m[5]) : n2b(+m[5]);
            const h = hue(+m[2]);
            const p1 = +m[3] / 100;
            const p2 = +m[4] / 100;
            if ("hwb" === m[1]) v = hwb2rgb(h, p1, p2); else if ("hsv" === m[1]) v = hsv2rgb(h, p1, p2); else v = hsl2rgb(h, p1, p2);
            return {
                r: v[0],
                g: v[1],
                b: v[2],
                a
            };
        }
        function rotate(v, deg) {
            var h = rgb2hsl(v);
            h[0] = hue(h[0] + deg);
            h = hsl2rgb(h);
            v.r = h[0];
            v.g = h[1];
            v.b = h[2];
        }
        function hslString(v) {
            if (!v) return;
            const a = rgb2hsl(v);
            const h = a[0];
            const s = n2p(a[1]);
            const l = n2p(a[2]);
            return v.a < 255 ? `hsla(${h}, ${s}%, ${l}%, ${b2n(v.a)})` : `hsl(${h}, ${s}%, ${l}%)`;
        }
        const map$1 = {
            x: "dark",
            Z: "light",
            Y: "re",
            X: "blu",
            W: "gr",
            V: "medium",
            U: "slate",
            A: "ee",
            T: "ol",
            S: "or",
            B: "ra",
            C: "lateg",
            D: "ights",
            R: "in",
            Q: "turquois",
            E: "hi",
            P: "ro",
            O: "al",
            N: "le",
            M: "de",
            L: "yello",
            F: "en",
            K: "ch",
            G: "arks",
            H: "ea",
            I: "ightg",
            J: "wh"
        };
        const names = {
            OiceXe: "f0f8ff",
            antiquewEte: "faebd7",
            aqua: "ffff",
            aquamarRe: "7fffd4",
            azuY: "f0ffff",
            beige: "f5f5dc",
            bisque: "ffe4c4",
            black: "0",
            blanKedOmond: "ffebcd",
            Xe: "ff",
            XeviTet: "8a2be2",
            bPwn: "a52a2a",
            burlywood: "deb887",
            caMtXe: "5f9ea0",
            KartYuse: "7fff00",
            KocTate: "d2691e",
            cSO: "ff7f50",
            cSnflowerXe: "6495ed",
            cSnsilk: "fff8dc",
            crimson: "dc143c",
            cyan: "ffff",
            xXe: "8b",
            xcyan: "8b8b",
            xgTMnPd: "b8860b",
            xWay: "a9a9a9",
            xgYF: "6400",
            xgYy: "a9a9a9",
            xkhaki: "bdb76b",
            xmagFta: "8b008b",
            xTivegYF: "556b2f",
            xSange: "ff8c00",
            xScEd: "9932cc",
            xYd: "8b0000",
            xsOmon: "e9967a",
            xsHgYF: "8fbc8f",
            xUXe: "483d8b",
            xUWay: "2f4f4f",
            xUgYy: "2f4f4f",
            xQe: "ced1",
            xviTet: "9400d3",
            dAppRk: "ff1493",
            dApskyXe: "bfff",
            dimWay: "696969",
            dimgYy: "696969",
            dodgerXe: "1e90ff",
            fiYbrick: "b22222",
            flSOwEte: "fffaf0",
            foYstWAn: "228b22",
            fuKsia: "ff00ff",
            gaRsbSo: "dcdcdc",
            ghostwEte: "f8f8ff",
            gTd: "ffd700",
            gTMnPd: "daa520",
            Way: "808080",
            gYF: "8000",
            gYFLw: "adff2f",
            gYy: "808080",
            honeyMw: "f0fff0",
            hotpRk: "ff69b4",
            RdianYd: "cd5c5c",
            Rdigo: "4b0082",
            ivSy: "fffff0",
            khaki: "f0e68c",
            lavFMr: "e6e6fa",
            lavFMrXsh: "fff0f5",
            lawngYF: "7cfc00",
            NmoncEffon: "fffacd",
            ZXe: "add8e6",
            ZcSO: "f08080",
            Zcyan: "e0ffff",
            ZgTMnPdLw: "fafad2",
            ZWay: "d3d3d3",
            ZgYF: "90ee90",
            ZgYy: "d3d3d3",
            ZpRk: "ffb6c1",
            ZsOmon: "ffa07a",
            ZsHgYF: "20b2aa",
            ZskyXe: "87cefa",
            ZUWay: "778899",
            ZUgYy: "778899",
            ZstAlXe: "b0c4de",
            ZLw: "ffffe0",
            lime: "ff00",
            limegYF: "32cd32",
            lRF: "faf0e6",
            magFta: "ff00ff",
            maPon: "800000",
            VaquamarRe: "66cdaa",
            VXe: "cd",
            VScEd: "ba55d3",
            VpurpN: "9370db",
            VsHgYF: "3cb371",
            VUXe: "7b68ee",
            VsprRggYF: "fa9a",
            VQe: "48d1cc",
            VviTetYd: "c71585",
            midnightXe: "191970",
            mRtcYam: "f5fffa",
            mistyPse: "ffe4e1",
            moccasR: "ffe4b5",
            navajowEte: "ffdead",
            navy: "80",
            Tdlace: "fdf5e6",
            Tive: "808000",
            TivedBb: "6b8e23",
            Sange: "ffa500",
            SangeYd: "ff4500",
            ScEd: "da70d6",
            pOegTMnPd: "eee8aa",
            pOegYF: "98fb98",
            pOeQe: "afeeee",
            pOeviTetYd: "db7093",
            papayawEp: "ffefd5",
            pHKpuff: "ffdab9",
            peru: "cd853f",
            pRk: "ffc0cb",
            plum: "dda0dd",
            powMrXe: "b0e0e6",
            purpN: "800080",
            YbeccapurpN: "663399",
            Yd: "ff0000",
            Psybrown: "bc8f8f",
            PyOXe: "4169e1",
            saddNbPwn: "8b4513",
            sOmon: "fa8072",
            sandybPwn: "f4a460",
            sHgYF: "2e8b57",
            sHshell: "fff5ee",
            siFna: "a0522d",
            silver: "c0c0c0",
            skyXe: "87ceeb",
            UXe: "6a5acd",
            UWay: "708090",
            UgYy: "708090",
            snow: "fffafa",
            sprRggYF: "ff7f",
            stAlXe: "4682b4",
            tan: "d2b48c",
            teO: "8080",
            tEstN: "d8bfd8",
            tomato: "ff6347",
            Qe: "40e0d0",
            viTet: "ee82ee",
            JHt: "f5deb3",
            wEte: "ffffff",
            wEtesmoke: "f5f5f5",
            Lw: "ffff00",
            LwgYF: "9acd32"
        };
        function unpack() {
            const unpacked = {};
            const keys = Object.keys(names);
            const tkeys = Object.keys(map$1);
            let i, j, k, ok, nk;
            for (i = 0; i < keys.length; i++) {
                ok = nk = keys[i];
                for (j = 0; j < tkeys.length; j++) {
                    k = tkeys[j];
                    nk = nk.replace(k, map$1[k]);
                }
                k = parseInt(names[ok], 16);
                unpacked[nk] = [ k >> 16 & 255, k >> 8 & 255, 255 & k ];
            }
            return unpacked;
        }
        let names$1;
        function nameParse(str) {
            if (!names$1) {
                names$1 = unpack();
                names$1.transparent = [ 0, 0, 0, 0 ];
            }
            const a = names$1[str.toLowerCase()];
            return a && {
                r: a[0],
                g: a[1],
                b: a[2],
                a: 4 === a.length ? a[3] : 255
            };
        }
        function modHSL(v, i, ratio) {
            if (v) {
                let tmp = rgb2hsl(v);
                tmp[i] = Math.max(0, Math.min(tmp[i] + tmp[i] * ratio, 0 === i ? 360 : 1));
                tmp = hsl2rgb(tmp);
                v.r = tmp[0];
                v.g = tmp[1];
                v.b = tmp[2];
            }
        }
        function clone(v, proto) {
            return v ? Object.assign(proto || {}, v) : v;
        }
        function fromObject(input) {
            var v = {
                r: 0,
                g: 0,
                b: 0,
                a: 255
            };
            if (Array.isArray(input)) {
                if (input.length >= 3) {
                    v = {
                        r: input[0],
                        g: input[1],
                        b: input[2],
                        a: 255
                    };
                    if (input.length > 3) v.a = n2b(input[3]);
                }
            } else {
                v = clone(input, {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 1
                });
                v.a = n2b(v.a);
            }
            return v;
        }
        function functionParse(str) {
            if ("r" === str.charAt(0)) return rgbParse(str);
            return hueParse(str);
        }
        class Color {
            constructor(input) {
                if (input instanceof Color) return input;
                const type = typeof input;
                let v;
                if ("object" === type) v = fromObject(input); else if ("string" === type) v = hexParse(input) || nameParse(input) || functionParse(input);
                this._rgb = v;
                this._valid = !!v;
            }
            get valid() {
                return this._valid;
            }
            get rgb() {
                var v = clone(this._rgb);
                if (v) v.a = b2n(v.a);
                return v;
            }
            set rgb(obj) {
                this._rgb = fromObject(obj);
            }
            rgbString() {
                return this._valid ? rgbString(this._rgb) : this._rgb;
            }
            hexString() {
                return this._valid ? hexString(this._rgb) : this._rgb;
            }
            hslString() {
                return this._valid ? hslString(this._rgb) : this._rgb;
            }
            mix(color, weight) {
                const me = this;
                if (color) {
                    const c1 = me.rgb;
                    const c2 = color.rgb;
                    let w2;
                    const p = weight === w2 ? .5 : weight;
                    const w = 2 * p - 1;
                    const a = c1.a - c2.a;
                    const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
                    w2 = 1 - w1;
                    c1.r = 255 & w1 * c1.r + w2 * c2.r + .5;
                    c1.g = 255 & w1 * c1.g + w2 * c2.g + .5;
                    c1.b = 255 & w1 * c1.b + w2 * c2.b + .5;
                    c1.a = p * c1.a + (1 - p) * c2.a;
                    me.rgb = c1;
                }
                return me;
            }
            clone() {
                return new Color(this.rgb);
            }
            alpha(a) {
                this._rgb.a = n2b(a);
                return this;
            }
            clearer(ratio) {
                const rgb = this._rgb;
                rgb.a *= 1 - ratio;
                return this;
            }
            greyscale() {
                const rgb = this._rgb;
                const val = round(.3 * rgb.r + .59 * rgb.g + .11 * rgb.b);
                rgb.r = rgb.g = rgb.b = val;
                return this;
            }
            opaquer(ratio) {
                const rgb = this._rgb;
                rgb.a *= 1 + ratio;
                return this;
            }
            negate() {
                const v = this._rgb;
                v.r = 255 - v.r;
                v.g = 255 - v.g;
                v.b = 255 - v.b;
                return this;
            }
            lighten(ratio) {
                modHSL(this._rgb, 2, ratio);
                return this;
            }
            darken(ratio) {
                modHSL(this._rgb, 2, -ratio);
                return this;
            }
            saturate(ratio) {
                modHSL(this._rgb, 1, ratio);
                return this;
            }
            desaturate(ratio) {
                modHSL(this._rgb, 1, -ratio);
                return this;
            }
            rotate(deg) {
                rotate(this._rgb, deg);
                return this;
            }
        }
        function index_esm(input) {
            return new Color(input);
        }
        const isPatternOrGradient = value => value instanceof CanvasGradient || value instanceof CanvasPattern;
        function color(value) {
            return isPatternOrGradient(value) ? value : index_esm(value);
        }
        function getHoverColor(value) {
            return isPatternOrGradient(value) ? value : index_esm(value).saturate(.5).darken(.1).hexString();
        }
        const overrides = Object.create(null);
        const descriptors = Object.create(null);
        function getScope$1(node, key) {
            if (!key) return node;
            const keys = key.split(".");
            for (let i = 0, n = keys.length; i < n; ++i) {
                const k = keys[i];
                node = node[k] || (node[k] = Object.create(null));
            }
            return node;
        }
        function set(root, scope, values) {
            if ("string" === typeof scope) return merge(getScope$1(root, scope), values);
            return merge(getScope$1(root, ""), scope);
        }
        class Defaults {
            constructor(_descriptors) {
                this.animation = void 0;
                this.backgroundColor = "rgba(0,0,0,0.1)";
                this.borderColor = "rgba(0,0,0,0.1)";
                this.color = "#666";
                this.datasets = {};
                this.devicePixelRatio = context => context.chart.platform.getDevicePixelRatio();
                this.elements = {};
                this.events = [ "mousemove", "mouseout", "click", "touchstart", "touchmove" ];
                this.font = {
                    family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    size: 12,
                    style: "normal",
                    lineHeight: 1.2,
                    weight: null
                };
                this.hover = {};
                this.hoverBackgroundColor = (ctx, options) => getHoverColor(options.backgroundColor);
                this.hoverBorderColor = (ctx, options) => getHoverColor(options.borderColor);
                this.hoverColor = (ctx, options) => getHoverColor(options.color);
                this.indexAxis = "x";
                this.interaction = {
                    mode: "nearest",
                    intersect: true
                };
                this.maintainAspectRatio = true;
                this.onHover = null;
                this.onClick = null;
                this.parsing = true;
                this.plugins = {};
                this.responsive = true;
                this.scale = void 0;
                this.scales = {};
                this.showLine = true;
                this.drawActiveElementsOnTop = true;
                this.describe(_descriptors);
            }
            set(scope, values) {
                return set(this, scope, values);
            }
            get(scope) {
                return getScope$1(this, scope);
            }
            describe(scope, values) {
                return set(descriptors, scope, values);
            }
            override(scope, values) {
                return set(overrides, scope, values);
            }
            route(scope, name, targetScope, targetName) {
                const scopeObject = getScope$1(this, scope);
                const targetScopeObject = getScope$1(this, targetScope);
                const privateName = "_" + name;
                Object.defineProperties(scopeObject, {
                    [privateName]: {
                        value: scopeObject[name],
                        writable: true
                    },
                    [name]: {
                        enumerable: true,
                        get() {
                            const local = this[privateName];
                            const target = targetScopeObject[targetName];
                            if (helpers_segment_isObject(local)) return Object.assign({}, target, local);
                            return valueOrDefault(local, target);
                        },
                        set(value) {
                            this[privateName] = value;
                        }
                    }
                });
            }
        }
        var helpers_segment_defaults = new Defaults({
            _scriptable: name => !name.startsWith("on"),
            _indexable: name => "events" !== name,
            hover: {
                _fallback: "interaction"
            },
            interaction: {
                _scriptable: false,
                _indexable: false
            }
        });
        function toFontString(font) {
            if (!font || isNullOrUndef(font.size) || isNullOrUndef(font.family)) return null;
            return (font.style ? font.style + " " : "") + (font.weight ? font.weight + " " : "") + font.size + "px " + font.family;
        }
        function _measureText(ctx, data, gc, longest, string) {
            let textWidth = data[string];
            if (!textWidth) {
                textWidth = data[string] = ctx.measureText(string).width;
                gc.push(string);
            }
            if (textWidth > longest) longest = textWidth;
            return longest;
        }
        function _longestText(ctx, font, arrayOfThings, cache) {
            cache = cache || {};
            let data = cache.data = cache.data || {};
            let gc = cache.garbageCollect = cache.garbageCollect || [];
            if (cache.font !== font) {
                data = cache.data = {};
                gc = cache.garbageCollect = [];
                cache.font = font;
            }
            ctx.save();
            ctx.font = font;
            let longest = 0;
            const ilen = arrayOfThings.length;
            let i, j, jlen, thing, nestedThing;
            for (i = 0; i < ilen; i++) {
                thing = arrayOfThings[i];
                if (void 0 !== thing && null !== thing && true !== isArray(thing)) longest = _measureText(ctx, data, gc, longest, thing); else if (isArray(thing)) for (j = 0, 
                jlen = thing.length; j < jlen; j++) {
                    nestedThing = thing[j];
                    if (void 0 !== nestedThing && null !== nestedThing && !isArray(nestedThing)) longest = _measureText(ctx, data, gc, longest, nestedThing);
                }
            }
            ctx.restore();
            const gcLen = gc.length / 2;
            if (gcLen > arrayOfThings.length) {
                for (i = 0; i < gcLen; i++) delete data[gc[i]];
                gc.splice(0, gcLen);
            }
            return longest;
        }
        function _alignPixel(chart, pixel, width) {
            const devicePixelRatio = chart.currentDevicePixelRatio;
            const halfWidth = 0 !== width ? Math.max(width / 2, .5) : 0;
            return Math.round((pixel - halfWidth) * devicePixelRatio) / devicePixelRatio + halfWidth;
        }
        function clearCanvas(canvas, ctx) {
            ctx = ctx || canvas.getContext("2d");
            ctx.save();
            ctx.resetTransform();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
        }
        function drawPoint(ctx, options, x, y) {
            let type, xOffset, yOffset, size, cornerRadius;
            const style = options.pointStyle;
            const rotation = options.rotation;
            const radius = options.radius;
            let rad = (rotation || 0) * RAD_PER_DEG;
            if (style && "object" === typeof style) {
                type = style.toString();
                if ("[object HTMLImageElement]" === type || "[object HTMLCanvasElement]" === type) {
                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(rad);
                    ctx.drawImage(style, -style.width / 2, -style.height / 2, style.width, style.height);
                    ctx.restore();
                    return;
                }
            }
            if (isNaN(radius) || radius <= 0) return;
            ctx.beginPath();
            switch (style) {
              default:
                ctx.arc(x, y, radius, 0, TAU);
                ctx.closePath();
                break;

              case "triangle":
                ctx.moveTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
                rad += TWO_THIRDS_PI;
                ctx.lineTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
                rad += TWO_THIRDS_PI;
                ctx.lineTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
                ctx.closePath();
                break;

              case "rectRounded":
                cornerRadius = .516 * radius;
                size = radius - cornerRadius;
                xOffset = Math.cos(rad + QUARTER_PI) * size;
                yOffset = Math.sin(rad + QUARTER_PI) * size;
                ctx.arc(x - xOffset, y - yOffset, cornerRadius, rad - PI, rad - HALF_PI);
                ctx.arc(x + yOffset, y - xOffset, cornerRadius, rad - HALF_PI, rad);
                ctx.arc(x + xOffset, y + yOffset, cornerRadius, rad, rad + HALF_PI);
                ctx.arc(x - yOffset, y + xOffset, cornerRadius, rad + HALF_PI, rad + PI);
                ctx.closePath();
                break;

              case "rect":
                if (!rotation) {
                    size = Math.SQRT1_2 * radius;
                    ctx.rect(x - size, y - size, 2 * size, 2 * size);
                    break;
                }
                rad += QUARTER_PI;

              case "rectRot":
                xOffset = Math.cos(rad) * radius;
                yOffset = Math.sin(rad) * radius;
                ctx.moveTo(x - xOffset, y - yOffset);
                ctx.lineTo(x + yOffset, y - xOffset);
                ctx.lineTo(x + xOffset, y + yOffset);
                ctx.lineTo(x - yOffset, y + xOffset);
                ctx.closePath();
                break;

              case "crossRot":
                rad += QUARTER_PI;

              case "cross":
                xOffset = Math.cos(rad) * radius;
                yOffset = Math.sin(rad) * radius;
                ctx.moveTo(x - xOffset, y - yOffset);
                ctx.lineTo(x + xOffset, y + yOffset);
                ctx.moveTo(x + yOffset, y - xOffset);
                ctx.lineTo(x - yOffset, y + xOffset);
                break;

              case "star":
                xOffset = Math.cos(rad) * radius;
                yOffset = Math.sin(rad) * radius;
                ctx.moveTo(x - xOffset, y - yOffset);
                ctx.lineTo(x + xOffset, y + yOffset);
                ctx.moveTo(x + yOffset, y - xOffset);
                ctx.lineTo(x - yOffset, y + xOffset);
                rad += QUARTER_PI;
                xOffset = Math.cos(rad) * radius;
                yOffset = Math.sin(rad) * radius;
                ctx.moveTo(x - xOffset, y - yOffset);
                ctx.lineTo(x + xOffset, y + yOffset);
                ctx.moveTo(x + yOffset, y - xOffset);
                ctx.lineTo(x - yOffset, y + xOffset);
                break;

              case "line":
                xOffset = Math.cos(rad) * radius;
                yOffset = Math.sin(rad) * radius;
                ctx.moveTo(x - xOffset, y - yOffset);
                ctx.lineTo(x + xOffset, y + yOffset);
                break;

              case "dash":
                ctx.moveTo(x, y);
                ctx.lineTo(x + Math.cos(rad) * radius, y + Math.sin(rad) * radius);
                break;
            }
            ctx.fill();
            if (options.borderWidth > 0) ctx.stroke();
        }
        function _isPointInArea(point, area, margin) {
            margin = margin || .5;
            return !area || point && point.x > area.left - margin && point.x < area.right + margin && point.y > area.top - margin && point.y < area.bottom + margin;
        }
        function clipArea(ctx, area) {
            ctx.save();
            ctx.beginPath();
            ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
            ctx.clip();
        }
        function unclipArea(ctx) {
            ctx.restore();
        }
        function _steppedLineTo(ctx, previous, target, flip, mode) {
            if (!previous) return ctx.lineTo(target.x, target.y);
            if ("middle" === mode) {
                const midpoint = (previous.x + target.x) / 2;
                ctx.lineTo(midpoint, previous.y);
                ctx.lineTo(midpoint, target.y);
            } else if ("after" === mode !== !!flip) ctx.lineTo(previous.x, target.y); else ctx.lineTo(target.x, previous.y);
            ctx.lineTo(target.x, target.y);
        }
        function _bezierCurveTo(ctx, previous, target, flip) {
            if (!previous) return ctx.lineTo(target.x, target.y);
            ctx.bezierCurveTo(flip ? previous.cp1x : previous.cp2x, flip ? previous.cp1y : previous.cp2y, flip ? target.cp2x : target.cp1x, flip ? target.cp2y : target.cp1y, target.x, target.y);
        }
        function renderText(ctx, text, x, y, font, opts = {}) {
            const lines = isArray(text) ? text : [ text ];
            const stroke = opts.strokeWidth > 0 && "" !== opts.strokeColor;
            let i, line;
            ctx.save();
            ctx.font = font.string;
            setRenderOpts(ctx, opts);
            for (i = 0; i < lines.length; ++i) {
                line = lines[i];
                if (stroke) {
                    if (opts.strokeColor) ctx.strokeStyle = opts.strokeColor;
                    if (!isNullOrUndef(opts.strokeWidth)) ctx.lineWidth = opts.strokeWidth;
                    ctx.strokeText(line, x, y, opts.maxWidth);
                }
                ctx.fillText(line, x, y, opts.maxWidth);
                decorateText(ctx, x, y, line, opts);
                y += font.lineHeight;
            }
            ctx.restore();
        }
        function setRenderOpts(ctx, opts) {
            if (opts.translation) ctx.translate(opts.translation[0], opts.translation[1]);
            if (!isNullOrUndef(opts.rotation)) ctx.rotate(opts.rotation);
            if (opts.color) ctx.fillStyle = opts.color;
            if (opts.textAlign) ctx.textAlign = opts.textAlign;
            if (opts.textBaseline) ctx.textBaseline = opts.textBaseline;
        }
        function decorateText(ctx, x, y, line, opts) {
            if (opts.strikethrough || opts.underline) {
                const metrics = ctx.measureText(line);
                const left = x - metrics.actualBoundingBoxLeft;
                const right = x + metrics.actualBoundingBoxRight;
                const top = y - metrics.actualBoundingBoxAscent;
                const bottom = y + metrics.actualBoundingBoxDescent;
                const yDecoration = opts.strikethrough ? (top + bottom) / 2 : bottom;
                ctx.strokeStyle = ctx.fillStyle;
                ctx.beginPath();
                ctx.lineWidth = opts.decorationWidth || 2;
                ctx.moveTo(left, yDecoration);
                ctx.lineTo(right, yDecoration);
                ctx.stroke();
            }
        }
        function addRoundedRectPath(ctx, rect) {
            const {x, y, w, h, radius} = rect;
            ctx.arc(x + radius.topLeft, y + radius.topLeft, radius.topLeft, -HALF_PI, PI, true);
            ctx.lineTo(x, y + h - radius.bottomLeft);
            ctx.arc(x + radius.bottomLeft, y + h - radius.bottomLeft, radius.bottomLeft, PI, HALF_PI, true);
            ctx.lineTo(x + w - radius.bottomRight, y + h);
            ctx.arc(x + w - radius.bottomRight, y + h - radius.bottomRight, radius.bottomRight, HALF_PI, 0, true);
            ctx.lineTo(x + w, y + radius.topRight);
            ctx.arc(x + w - radius.topRight, y + radius.topRight, radius.topRight, 0, -HALF_PI, true);
            ctx.lineTo(x + radius.topLeft, y);
        }
        const LINE_HEIGHT = new RegExp(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);
        const FONT_STYLE = new RegExp(/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/);
        function toLineHeight(value, size) {
            const matches = ("" + value).match(LINE_HEIGHT);
            if (!matches || "normal" === matches[1]) return 1.2 * size;
            value = +matches[2];
            switch (matches[3]) {
              case "px":
                return value;

              case "%":
                value /= 100;
                break;
            }
            return size * value;
        }
        const numberOrZero = v => +v || 0;
        function _readValueToProps(value, props) {
            const ret = {};
            const objProps = helpers_segment_isObject(props);
            const keys = objProps ? Object.keys(props) : props;
            const read = helpers_segment_isObject(value) ? objProps ? prop => valueOrDefault(value[prop], value[props[prop]]) : prop => value[prop] : () => value;
            for (const prop of keys) ret[prop] = numberOrZero(read(prop));
            return ret;
        }
        function toTRBL(value) {
            return _readValueToProps(value, {
                top: "y",
                right: "x",
                bottom: "y",
                left: "x"
            });
        }
        function toTRBLCorners(value) {
            return _readValueToProps(value, [ "topLeft", "topRight", "bottomLeft", "bottomRight" ]);
        }
        function toPadding(value) {
            const obj = toTRBL(value);
            obj.width = obj.left + obj.right;
            obj.height = obj.top + obj.bottom;
            return obj;
        }
        function toFont(options, fallback) {
            options = options || {};
            fallback = fallback || helpers_segment_defaults.font;
            let size = valueOrDefault(options.size, fallback.size);
            if ("string" === typeof size) size = parseInt(size, 10);
            let style = valueOrDefault(options.style, fallback.style);
            if (style && !("" + style).match(FONT_STYLE)) {
                console.warn('Invalid font style specified: "' + style + '"');
                style = "";
            }
            const font = {
                family: valueOrDefault(options.family, fallback.family),
                lineHeight: toLineHeight(valueOrDefault(options.lineHeight, fallback.lineHeight), size),
                size,
                style,
                weight: valueOrDefault(options.weight, fallback.weight),
                string: ""
            };
            font.string = toFontString(font);
            return font;
        }
        function resolve(inputs, context, index, info) {
            let cacheable = true;
            let i, ilen, value;
            for (i = 0, ilen = inputs.length; i < ilen; ++i) {
                value = inputs[i];
                if (void 0 === value) continue;
                if (void 0 !== context && "function" === typeof value) {
                    value = value(context);
                    cacheable = false;
                }
                if (void 0 !== index && isArray(value)) {
                    value = value[index % value.length];
                    cacheable = false;
                }
                if (void 0 !== value) {
                    if (info && !cacheable) info.cacheable = false;
                    return value;
                }
            }
        }
        function _addGrace(minmax, grace, beginAtZero) {
            const {min, max} = minmax;
            const change = toDimension(grace, (max - min) / 2);
            const keepZero = (value, add) => beginAtZero && 0 === value ? 0 : value + add;
            return {
                min: keepZero(min, -Math.abs(change)),
                max: keepZero(max, change)
            };
        }
        function createContext(parentContext, context) {
            return Object.assign(Object.create(parentContext), context);
        }
        function _lookup(table, value, cmp) {
            cmp = cmp || (index => table[index] < value);
            let hi = table.length - 1;
            let lo = 0;
            let mid;
            while (hi - lo > 1) {
                mid = lo + hi >> 1;
                if (cmp(mid)) lo = mid; else hi = mid;
            }
            return {
                lo,
                hi
            };
        }
        const _lookupByKey = (table, key, value) => _lookup(table, value, (index => table[index][key] < value));
        const _rlookupByKey = (table, key, value) => _lookup(table, value, (index => table[index][key] >= value));
        function _filterBetween(values, min, max) {
            let start = 0;
            let end = values.length;
            while (start < end && values[start] < min) start++;
            while (end > start && values[end - 1] > max) end--;
            return start > 0 || end < values.length ? values.slice(start, end) : values;
        }
        const arrayEvents = [ "push", "pop", "shift", "splice", "unshift" ];
        function listenArrayEvents(array, listener) {
            if (array._chartjs) {
                array._chartjs.listeners.push(listener);
                return;
            }
            Object.defineProperty(array, "_chartjs", {
                configurable: true,
                enumerable: false,
                value: {
                    listeners: [ listener ]
                }
            });
            arrayEvents.forEach((key => {
                const method = "_onData" + _capitalize(key);
                const base = array[key];
                Object.defineProperty(array, key, {
                    configurable: true,
                    enumerable: false,
                    value(...args) {
                        const res = base.apply(this, args);
                        array._chartjs.listeners.forEach((object => {
                            if ("function" === typeof object[method]) object[method](...args);
                        }));
                        return res;
                    }
                });
            }));
        }
        function unlistenArrayEvents(array, listener) {
            const stub = array._chartjs;
            if (!stub) return;
            const listeners = stub.listeners;
            const index = listeners.indexOf(listener);
            if (-1 !== index) listeners.splice(index, 1);
            if (listeners.length > 0) return;
            arrayEvents.forEach((key => {
                delete array[key];
            }));
            delete array._chartjs;
        }
        function _arrayUnique(items) {
            const set = new Set;
            let i, ilen;
            for (i = 0, ilen = items.length; i < ilen; ++i) set.add(items[i]);
            if (set.size === ilen) return items;
            return Array.from(set);
        }
        function _createResolver(scopes, prefixes = [ "" ], rootScopes = scopes, fallback, getTarget = (() => scopes[0])) {
            if (!defined(fallback)) fallback = _resolve("_fallback", scopes);
            const cache = {
                [Symbol.toStringTag]: "Object",
                _cacheable: true,
                _scopes: scopes,
                _rootScopes: rootScopes,
                _fallback: fallback,
                _getTarget: getTarget,
                override: scope => _createResolver([ scope, ...scopes ], prefixes, rootScopes, fallback)
            };
            return new Proxy(cache, {
                deleteProperty(target, prop) {
                    delete target[prop];
                    delete target._keys;
                    delete scopes[0][prop];
                    return true;
                },
                get(target, prop) {
                    return _cached(target, prop, (() => _resolveWithPrefixes(prop, prefixes, scopes, target)));
                },
                getOwnPropertyDescriptor(target, prop) {
                    return Reflect.getOwnPropertyDescriptor(target._scopes[0], prop);
                },
                getPrototypeOf() {
                    return Reflect.getPrototypeOf(scopes[0]);
                },
                has(target, prop) {
                    return getKeysFromAllScopes(target).includes(prop);
                },
                ownKeys(target) {
                    return getKeysFromAllScopes(target);
                },
                set(target, prop, value) {
                    const storage = target._storage || (target._storage = getTarget());
                    target[prop] = storage[prop] = value;
                    delete target._keys;
                    return true;
                }
            });
        }
        function _attachContext(proxy, context, subProxy, descriptorDefaults) {
            const cache = {
                _cacheable: false,
                _proxy: proxy,
                _context: context,
                _subProxy: subProxy,
                _stack: new Set,
                _descriptors: _descriptors(proxy, descriptorDefaults),
                setContext: ctx => _attachContext(proxy, ctx, subProxy, descriptorDefaults),
                override: scope => _attachContext(proxy.override(scope), context, subProxy, descriptorDefaults)
            };
            return new Proxy(cache, {
                deleteProperty(target, prop) {
                    delete target[prop];
                    delete proxy[prop];
                    return true;
                },
                get(target, prop, receiver) {
                    return _cached(target, prop, (() => _resolveWithContext(target, prop, receiver)));
                },
                getOwnPropertyDescriptor(target, prop) {
                    return target._descriptors.allKeys ? Reflect.has(proxy, prop) ? {
                        enumerable: true,
                        configurable: true
                    } : void 0 : Reflect.getOwnPropertyDescriptor(proxy, prop);
                },
                getPrototypeOf() {
                    return Reflect.getPrototypeOf(proxy);
                },
                has(target, prop) {
                    return Reflect.has(proxy, prop);
                },
                ownKeys() {
                    return Reflect.ownKeys(proxy);
                },
                set(target, prop, value) {
                    proxy[prop] = value;
                    delete target[prop];
                    return true;
                }
            });
        }
        function _descriptors(proxy, defaults = {
            scriptable: true,
            indexable: true
        }) {
            const {_scriptable = defaults.scriptable, _indexable = defaults.indexable, _allKeys = defaults.allKeys} = proxy;
            return {
                allKeys: _allKeys,
                scriptable: _scriptable,
                indexable: _indexable,
                isScriptable: isFunction(_scriptable) ? _scriptable : () => _scriptable,
                isIndexable: isFunction(_indexable) ? _indexable : () => _indexable
            };
        }
        const readKey = (prefix, name) => prefix ? prefix + _capitalize(name) : name;
        const needsSubResolver = (prop, value) => helpers_segment_isObject(value) && "adapters" !== prop && (null === Object.getPrototypeOf(value) || value.constructor === Object);
        function _cached(target, prop, resolve) {
            if (Object.prototype.hasOwnProperty.call(target, prop)) return target[prop];
            const value = resolve();
            target[prop] = value;
            return value;
        }
        function _resolveWithContext(target, prop, receiver) {
            const {_proxy, _context, _subProxy, _descriptors: descriptors} = target;
            let value = _proxy[prop];
            if (isFunction(value) && descriptors.isScriptable(prop)) value = _resolveScriptable(prop, value, target, receiver);
            if (isArray(value) && value.length) value = _resolveArray(prop, value, target, descriptors.isIndexable);
            if (needsSubResolver(prop, value)) value = _attachContext(value, _context, _subProxy && _subProxy[prop], descriptors);
            return value;
        }
        function _resolveScriptable(prop, value, target, receiver) {
            const {_proxy, _context, _subProxy, _stack} = target;
            if (_stack.has(prop)) throw new Error("Recursion detected: " + Array.from(_stack).join("->") + "->" + prop);
            _stack.add(prop);
            value = value(_context, _subProxy || receiver);
            _stack.delete(prop);
            if (needsSubResolver(prop, value)) value = createSubResolver(_proxy._scopes, _proxy, prop, value);
            return value;
        }
        function _resolveArray(prop, value, target, isIndexable) {
            const {_proxy, _context, _subProxy, _descriptors: descriptors} = target;
            if (defined(_context.index) && isIndexable(prop)) value = value[_context.index % value.length]; else if (helpers_segment_isObject(value[0])) {
                const arr = value;
                const scopes = _proxy._scopes.filter((s => s !== arr));
                value = [];
                for (const item of arr) {
                    const resolver = createSubResolver(scopes, _proxy, prop, item);
                    value.push(_attachContext(resolver, _context, _subProxy && _subProxy[prop], descriptors));
                }
            }
            return value;
        }
        function resolveFallback(fallback, prop, value) {
            return isFunction(fallback) ? fallback(prop, value) : fallback;
        }
        const getScope = (key, parent) => true === key ? parent : "string" === typeof key ? resolveObjectKey(parent, key) : void 0;
        function addScopes(set, parentScopes, key, parentFallback, value) {
            for (const parent of parentScopes) {
                const scope = getScope(key, parent);
                if (scope) {
                    set.add(scope);
                    const fallback = resolveFallback(scope._fallback, key, value);
                    if (defined(fallback) && fallback !== key && fallback !== parentFallback) return fallback;
                } else if (false === scope && defined(parentFallback) && key !== parentFallback) return null;
            }
            return false;
        }
        function createSubResolver(parentScopes, resolver, prop, value) {
            const rootScopes = resolver._rootScopes;
            const fallback = resolveFallback(resolver._fallback, prop, value);
            const allScopes = [ ...parentScopes, ...rootScopes ];
            const set = new Set;
            set.add(value);
            let key = addScopesFromKey(set, allScopes, prop, fallback || prop, value);
            if (null === key) return false;
            if (defined(fallback) && fallback !== prop) {
                key = addScopesFromKey(set, allScopes, fallback, key, value);
                if (null === key) return false;
            }
            return _createResolver(Array.from(set), [ "" ], rootScopes, fallback, (() => subGetTarget(resolver, prop, value)));
        }
        function addScopesFromKey(set, allScopes, key, fallback, item) {
            while (key) key = addScopes(set, allScopes, key, fallback, item);
            return key;
        }
        function subGetTarget(resolver, prop, value) {
            const parent = resolver._getTarget();
            if (!(prop in parent)) parent[prop] = {};
            const target = parent[prop];
            if (isArray(target) && helpers_segment_isObject(value)) return value;
            return target;
        }
        function _resolveWithPrefixes(prop, prefixes, scopes, proxy) {
            let value;
            for (const prefix of prefixes) {
                value = _resolve(readKey(prefix, prop), scopes);
                if (defined(value)) return needsSubResolver(prop, value) ? createSubResolver(scopes, proxy, prop, value) : value;
            }
        }
        function _resolve(key, scopes) {
            for (const scope of scopes) {
                if (!scope) continue;
                const value = scope[key];
                if (defined(value)) return value;
            }
        }
        function getKeysFromAllScopes(target) {
            let keys = target._keys;
            if (!keys) keys = target._keys = resolveKeysFromAllScopes(target._scopes);
            return keys;
        }
        function resolveKeysFromAllScopes(scopes) {
            const set = new Set;
            for (const scope of scopes) for (const key of Object.keys(scope).filter((k => !k.startsWith("_")))) set.add(key);
            return Array.from(set);
        }
        const EPSILON = Number.EPSILON || 1e-14;
        const getPoint = (points, i) => i < points.length && !points[i].skip && points[i];
        const getValueAxis = indexAxis => "x" === indexAxis ? "y" : "x";
        function splineCurve(firstPoint, middlePoint, afterPoint, t) {
            const previous = firstPoint.skip ? middlePoint : firstPoint;
            const current = middlePoint;
            const next = afterPoint.skip ? middlePoint : afterPoint;
            const d01 = distanceBetweenPoints(current, previous);
            const d12 = distanceBetweenPoints(next, current);
            let s01 = d01 / (d01 + d12);
            let s12 = d12 / (d01 + d12);
            s01 = isNaN(s01) ? 0 : s01;
            s12 = isNaN(s12) ? 0 : s12;
            const fa = t * s01;
            const fb = t * s12;
            return {
                previous: {
                    x: current.x - fa * (next.x - previous.x),
                    y: current.y - fa * (next.y - previous.y)
                },
                next: {
                    x: current.x + fb * (next.x - previous.x),
                    y: current.y + fb * (next.y - previous.y)
                }
            };
        }
        function monotoneAdjust(points, deltaK, mK) {
            const pointsLen = points.length;
            let alphaK, betaK, tauK, squaredMagnitude, pointCurrent;
            let pointAfter = getPoint(points, 0);
            for (let i = 0; i < pointsLen - 1; ++i) {
                pointCurrent = pointAfter;
                pointAfter = getPoint(points, i + 1);
                if (!pointCurrent || !pointAfter) continue;
                if (almostEquals(deltaK[i], 0, EPSILON)) {
                    mK[i] = mK[i + 1] = 0;
                    continue;
                }
                alphaK = mK[i] / deltaK[i];
                betaK = mK[i + 1] / deltaK[i];
                squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
                if (squaredMagnitude <= 9) continue;
                tauK = 3 / Math.sqrt(squaredMagnitude);
                mK[i] = alphaK * tauK * deltaK[i];
                mK[i + 1] = betaK * tauK * deltaK[i];
            }
        }
        function monotoneCompute(points, mK, indexAxis = "x") {
            const valueAxis = getValueAxis(indexAxis);
            const pointsLen = points.length;
            let delta, pointBefore, pointCurrent;
            let pointAfter = getPoint(points, 0);
            for (let i = 0; i < pointsLen; ++i) {
                pointBefore = pointCurrent;
                pointCurrent = pointAfter;
                pointAfter = getPoint(points, i + 1);
                if (!pointCurrent) continue;
                const iPixel = pointCurrent[indexAxis];
                const vPixel = pointCurrent[valueAxis];
                if (pointBefore) {
                    delta = (iPixel - pointBefore[indexAxis]) / 3;
                    pointCurrent[`cp1${indexAxis}`] = iPixel - delta;
                    pointCurrent[`cp1${valueAxis}`] = vPixel - delta * mK[i];
                }
                if (pointAfter) {
                    delta = (pointAfter[indexAxis] - iPixel) / 3;
                    pointCurrent[`cp2${indexAxis}`] = iPixel + delta;
                    pointCurrent[`cp2${valueAxis}`] = vPixel + delta * mK[i];
                }
            }
        }
        function splineCurveMonotone(points, indexAxis = "x") {
            const valueAxis = getValueAxis(indexAxis);
            const pointsLen = points.length;
            const deltaK = Array(pointsLen).fill(0);
            const mK = Array(pointsLen);
            let i, pointBefore, pointCurrent;
            let pointAfter = getPoint(points, 0);
            for (i = 0; i < pointsLen; ++i) {
                pointBefore = pointCurrent;
                pointCurrent = pointAfter;
                pointAfter = getPoint(points, i + 1);
                if (!pointCurrent) continue;
                if (pointAfter) {
                    const slopeDelta = pointAfter[indexAxis] - pointCurrent[indexAxis];
                    deltaK[i] = 0 !== slopeDelta ? (pointAfter[valueAxis] - pointCurrent[valueAxis]) / slopeDelta : 0;
                }
                mK[i] = !pointBefore ? deltaK[i] : !pointAfter ? deltaK[i - 1] : sign(deltaK[i - 1]) !== sign(deltaK[i]) ? 0 : (deltaK[i - 1] + deltaK[i]) / 2;
            }
            monotoneAdjust(points, deltaK, mK);
            monotoneCompute(points, mK, indexAxis);
        }
        function capControlPoint(pt, min, max) {
            return Math.max(Math.min(pt, max), min);
        }
        function capBezierPoints(points, area) {
            let i, ilen, point, inArea, inAreaPrev;
            let inAreaNext = _isPointInArea(points[0], area);
            for (i = 0, ilen = points.length; i < ilen; ++i) {
                inAreaPrev = inArea;
                inArea = inAreaNext;
                inAreaNext = i < ilen - 1 && _isPointInArea(points[i + 1], area);
                if (!inArea) continue;
                point = points[i];
                if (inAreaPrev) {
                    point.cp1x = capControlPoint(point.cp1x, area.left, area.right);
                    point.cp1y = capControlPoint(point.cp1y, area.top, area.bottom);
                }
                if (inAreaNext) {
                    point.cp2x = capControlPoint(point.cp2x, area.left, area.right);
                    point.cp2y = capControlPoint(point.cp2y, area.top, area.bottom);
                }
            }
        }
        function _updateBezierControlPoints(points, options, area, loop, indexAxis) {
            let i, ilen, point, controlPoints;
            if (options.spanGaps) points = points.filter((pt => !pt.skip));
            if ("monotone" === options.cubicInterpolationMode) splineCurveMonotone(points, indexAxis); else {
                let prev = loop ? points[points.length - 1] : points[0];
                for (i = 0, ilen = points.length; i < ilen; ++i) {
                    point = points[i];
                    controlPoints = splineCurve(prev, point, points[Math.min(i + 1, ilen - (loop ? 0 : 1)) % ilen], options.tension);
                    point.cp1x = controlPoints.previous.x;
                    point.cp1y = controlPoints.previous.y;
                    point.cp2x = controlPoints.next.x;
                    point.cp2y = controlPoints.next.y;
                    prev = point;
                }
            }
            if (options.capBezierPoints) capBezierPoints(points, area);
        }
        function _isDomSupported() {
            return "undefined" !== typeof window && "undefined" !== typeof document;
        }
        function _getParentNode(domNode) {
            let parent = domNode.parentNode;
            if (parent && "[object ShadowRoot]" === parent.toString()) parent = parent.host;
            return parent;
        }
        function parseMaxStyle(styleValue, node, parentProperty) {
            let valueInPixels;
            if ("string" === typeof styleValue) {
                valueInPixels = parseInt(styleValue, 10);
                if (-1 !== styleValue.indexOf("%")) valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
            } else valueInPixels = styleValue;
            return valueInPixels;
        }
        const helpers_segment_getComputedStyle = element => window.getComputedStyle(element, null);
        function getStyle(el, property) {
            return helpers_segment_getComputedStyle(el).getPropertyValue(property);
        }
        const positions = [ "top", "right", "bottom", "left" ];
        function getPositionedStyle(styles, style, suffix) {
            const result = {};
            suffix = suffix ? "-" + suffix : "";
            for (let i = 0; i < 4; i++) {
                const pos = positions[i];
                result[pos] = parseFloat(styles[style + "-" + pos + suffix]) || 0;
            }
            result.width = result.left + result.right;
            result.height = result.top + result.bottom;
            return result;
        }
        const useOffsetPos = (x, y, target) => (x > 0 || y > 0) && (!target || !target.shadowRoot);
        function getCanvasPosition(evt, canvas) {
            const e = evt.native || evt;
            const touches = e.touches;
            const source = touches && touches.length ? touches[0] : e;
            const {offsetX, offsetY} = source;
            let box = false;
            let x, y;
            if (useOffsetPos(offsetX, offsetY, e.target)) {
                x = offsetX;
                y = offsetY;
            } else {
                const rect = canvas.getBoundingClientRect();
                x = source.clientX - rect.left;
                y = source.clientY - rect.top;
                box = true;
            }
            return {
                x,
                y,
                box
            };
        }
        function getRelativePosition(evt, chart) {
            const {canvas, currentDevicePixelRatio} = chart;
            const style = helpers_segment_getComputedStyle(canvas);
            const borderBox = "border-box" === style.boxSizing;
            const paddings = getPositionedStyle(style, "padding");
            const borders = getPositionedStyle(style, "border", "width");
            const {x, y, box} = getCanvasPosition(evt, canvas);
            const xOffset = paddings.left + (box && borders.left);
            const yOffset = paddings.top + (box && borders.top);
            let {width, height} = chart;
            if (borderBox) {
                width -= paddings.width + borders.width;
                height -= paddings.height + borders.height;
            }
            return {
                x: Math.round((x - xOffset) / width * canvas.width / currentDevicePixelRatio),
                y: Math.round((y - yOffset) / height * canvas.height / currentDevicePixelRatio)
            };
        }
        function getContainerSize(canvas, width, height) {
            let maxWidth, maxHeight;
            if (void 0 === width || void 0 === height) {
                const container = _getParentNode(canvas);
                if (!container) {
                    width = canvas.clientWidth;
                    height = canvas.clientHeight;
                } else {
                    const rect = container.getBoundingClientRect();
                    const containerStyle = helpers_segment_getComputedStyle(container);
                    const containerBorder = getPositionedStyle(containerStyle, "border", "width");
                    const containerPadding = getPositionedStyle(containerStyle, "padding");
                    width = rect.width - containerPadding.width - containerBorder.width;
                    height = rect.height - containerPadding.height - containerBorder.height;
                    maxWidth = parseMaxStyle(containerStyle.maxWidth, container, "clientWidth");
                    maxHeight = parseMaxStyle(containerStyle.maxHeight, container, "clientHeight");
                }
            }
            return {
                width,
                height,
                maxWidth: maxWidth || INFINITY,
                maxHeight: maxHeight || INFINITY
            };
        }
        const round1 = v => Math.round(10 * v) / 10;
        function getMaximumSize(canvas, bbWidth, bbHeight, aspectRatio) {
            const style = helpers_segment_getComputedStyle(canvas);
            const margins = getPositionedStyle(style, "margin");
            const maxWidth = parseMaxStyle(style.maxWidth, canvas, "clientWidth") || INFINITY;
            const maxHeight = parseMaxStyle(style.maxHeight, canvas, "clientHeight") || INFINITY;
            const containerSize = getContainerSize(canvas, bbWidth, bbHeight);
            let {width, height} = containerSize;
            if ("content-box" === style.boxSizing) {
                const borders = getPositionedStyle(style, "border", "width");
                const paddings = getPositionedStyle(style, "padding");
                width -= paddings.width + borders.width;
                height -= paddings.height + borders.height;
            }
            width = Math.max(0, width - margins.width);
            height = Math.max(0, aspectRatio ? Math.floor(width / aspectRatio) : height - margins.height);
            width = round1(Math.min(width, maxWidth, containerSize.maxWidth));
            height = round1(Math.min(height, maxHeight, containerSize.maxHeight));
            if (width && !height) height = round1(width / 2);
            return {
                width,
                height
            };
        }
        function retinaScale(chart, forceRatio, forceStyle) {
            const pixelRatio = forceRatio || 1;
            const deviceHeight = Math.floor(chart.height * pixelRatio);
            const deviceWidth = Math.floor(chart.width * pixelRatio);
            chart.height = deviceHeight / pixelRatio;
            chart.width = deviceWidth / pixelRatio;
            const canvas = chart.canvas;
            if (canvas.style && (forceStyle || !canvas.style.height && !canvas.style.width)) {
                canvas.style.height = `${chart.height}px`;
                canvas.style.width = `${chart.width}px`;
            }
            if (chart.currentDevicePixelRatio !== pixelRatio || canvas.height !== deviceHeight || canvas.width !== deviceWidth) {
                chart.currentDevicePixelRatio = pixelRatio;
                canvas.height = deviceHeight;
                canvas.width = deviceWidth;
                chart.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
                return true;
            }
            return false;
        }
        const supportsEventListenerOptions = function() {
            let passiveSupported = false;
            try {
                const options = {
                    get passive() {
                        passiveSupported = true;
                        return false;
                    }
                };
                window.addEventListener("test", null, options);
                window.removeEventListener("test", null, options);
            } catch (e) {}
            return passiveSupported;
        }();
        function readUsedSize(element, property) {
            const value = getStyle(element, property);
            const matches = value && value.match(/^(\d+)(\.\d+)?px$/);
            return matches ? +matches[1] : void 0;
        }
        function _pointInLine(p1, p2, t, mode) {
            return {
                x: p1.x + t * (p2.x - p1.x),
                y: p1.y + t * (p2.y - p1.y)
            };
        }
        function _steppedInterpolation(p1, p2, t, mode) {
            return {
                x: p1.x + t * (p2.x - p1.x),
                y: "middle" === mode ? t < .5 ? p1.y : p2.y : "after" === mode ? t < 1 ? p1.y : p2.y : t > 0 ? p2.y : p1.y
            };
        }
        function _bezierInterpolation(p1, p2, t, mode) {
            const cp1 = {
                x: p1.cp2x,
                y: p1.cp2y
            };
            const cp2 = {
                x: p2.cp1x,
                y: p2.cp1y
            };
            const a = _pointInLine(p1, cp1, t);
            const b = _pointInLine(cp1, cp2, t);
            const c = _pointInLine(cp2, p2, t);
            const d = _pointInLine(a, b, t);
            const e = _pointInLine(b, c, t);
            return _pointInLine(d, e, t);
        }
        const intlCache = new Map;
        function getNumberFormat(locale, options) {
            options = options || {};
            const cacheKey = locale + JSON.stringify(options);
            let formatter = intlCache.get(cacheKey);
            if (!formatter) {
                formatter = new Intl.NumberFormat(locale, options);
                intlCache.set(cacheKey, formatter);
            }
            return formatter;
        }
        function formatNumber(num, locale, options) {
            return getNumberFormat(locale, options).format(num);
        }
        const getRightToLeftAdapter = function(rectX, width) {
            return {
                x(x) {
                    return rectX + rectX + width - x;
                },
                setWidth(w) {
                    width = w;
                },
                textAlign(align) {
                    if ("center" === align) return align;
                    return "right" === align ? "left" : "right";
                },
                xPlus(x, value) {
                    return x - value;
                },
                leftForLtr(x, itemWidth) {
                    return x - itemWidth;
                }
            };
        };
        const getLeftToRightAdapter = function() {
            return {
                x(x) {
                    return x;
                },
                setWidth(w) {},
                textAlign(align) {
                    return align;
                },
                xPlus(x, value) {
                    return x + value;
                },
                leftForLtr(x, _itemWidth) {
                    return x;
                }
            };
        };
        function getRtlAdapter(rtl, rectX, width) {
            return rtl ? getRightToLeftAdapter(rectX, width) : getLeftToRightAdapter();
        }
        function overrideTextDirection(ctx, direction) {
            let style, original;
            if ("ltr" === direction || "rtl" === direction) {
                style = ctx.canvas.style;
                original = [ style.getPropertyValue("direction"), style.getPropertyPriority("direction") ];
                style.setProperty("direction", direction, "important");
                ctx.prevTextDirection = original;
            }
        }
        function restoreTextDirection(ctx, original) {
            if (void 0 !== original) {
                delete ctx.prevTextDirection;
                ctx.canvas.style.setProperty("direction", original[0], original[1]);
            }
        }
        function propertyFn(property) {
            if ("angle" === property) return {
                between: _angleBetween,
                compare: _angleDiff,
                normalize: _normalizeAngle
            };
            return {
                between: _isBetween,
                compare: (a, b) => a - b,
                normalize: x => x
            };
        }
        function normalizeSegment({start, end, count, loop, style}) {
            return {
                start: start % count,
                end: end % count,
                loop: loop && (end - start + 1) % count === 0,
                style
            };
        }
        function getSegment(segment, points, bounds) {
            const {property, start: startBound, end: endBound} = bounds;
            const {between, normalize} = propertyFn(property);
            const count = points.length;
            let {start, end, loop} = segment;
            let i, ilen;
            if (loop) {
                start += count;
                end += count;
                for (i = 0, ilen = count; i < ilen; ++i) {
                    if (!between(normalize(points[start % count][property]), startBound, endBound)) break;
                    start--;
                    end--;
                }
                start %= count;
                end %= count;
            }
            if (end < start) end += count;
            return {
                start,
                end,
                loop,
                style: segment.style
            };
        }
        function _boundSegment(segment, points, bounds) {
            if (!bounds) return [ segment ];
            const {property, start: startBound, end: endBound} = bounds;
            const count = points.length;
            const {compare, between, normalize} = propertyFn(property);
            const {start, end, loop, style} = getSegment(segment, points, bounds);
            const result = [];
            let inside = false;
            let subStart = null;
            let value, point, prevValue;
            const startIsBefore = () => between(startBound, prevValue, value) && 0 !== compare(startBound, prevValue);
            const endIsBefore = () => 0 === compare(endBound, value) || between(endBound, prevValue, value);
            const shouldStart = () => inside || startIsBefore();
            const shouldStop = () => !inside || endIsBefore();
            for (let i = start, prev = start; i <= end; ++i) {
                point = points[i % count];
                if (point.skip) continue;
                value = normalize(point[property]);
                if (value === prevValue) continue;
                inside = between(value, startBound, endBound);
                if (null === subStart && shouldStart()) subStart = 0 === compare(value, startBound) ? i : prev;
                if (null !== subStart && shouldStop()) {
                    result.push(normalizeSegment({
                        start: subStart,
                        end: i,
                        loop,
                        count,
                        style
                    }));
                    subStart = null;
                }
                prev = i;
                prevValue = value;
            }
            if (null !== subStart) result.push(normalizeSegment({
                start: subStart,
                end,
                loop,
                count,
                style
            }));
            return result;
        }
        function _boundSegments(line, bounds) {
            const result = [];
            const segments = line.segments;
            for (let i = 0; i < segments.length; i++) {
                const sub = _boundSegment(segments[i], line.points, bounds);
                if (sub.length) result.push(...sub);
            }
            return result;
        }
        function findStartAndEnd(points, count, loop, spanGaps) {
            let start = 0;
            let end = count - 1;
            if (loop && !spanGaps) while (start < count && !points[start].skip) start++;
            while (start < count && points[start].skip) start++;
            start %= count;
            if (loop) end += start;
            while (end > start && points[end % count].skip) end--;
            end %= count;
            return {
                start,
                end
            };
        }
        function solidSegments(points, start, max, loop) {
            const count = points.length;
            const result = [];
            let last = start;
            let prev = points[start];
            let end;
            for (end = start + 1; end <= max; ++end) {
                const cur = points[end % count];
                if (cur.skip || cur.stop) {
                    if (!prev.skip) {
                        loop = false;
                        result.push({
                            start: start % count,
                            end: (end - 1) % count,
                            loop
                        });
                        start = last = cur.stop ? end : null;
                    }
                } else {
                    last = end;
                    if (prev.skip) start = end;
                }
                prev = cur;
            }
            if (null !== last) result.push({
                start: start % count,
                end: last % count,
                loop
            });
            return result;
        }
        function _computeSegments(line, segmentOptions) {
            const points = line.points;
            const spanGaps = line.options.spanGaps;
            const count = points.length;
            if (!count) return [];
            const loop = !!line._loop;
            const {start, end} = findStartAndEnd(points, count, loop, spanGaps);
            if (true === spanGaps) return splitByStyles(line, [ {
                start,
                end,
                loop
            } ], points, segmentOptions);
            const max = end < start ? end + count : end;
            const completeLoop = !!line._fullLoop && 0 === start && end === count - 1;
            return splitByStyles(line, solidSegments(points, start, max, completeLoop), points, segmentOptions);
        }
        function splitByStyles(line, segments, points, segmentOptions) {
            if (!segmentOptions || !segmentOptions.setContext || !points) return segments;
            return doSplitByStyles(line, segments, points, segmentOptions);
        }
        function doSplitByStyles(line, segments, points, segmentOptions) {
            const chartContext = line._chart.getContext();
            const baseStyle = readStyle(line.options);
            const {_datasetIndex: datasetIndex, options: {spanGaps}} = line;
            const count = points.length;
            const result = [];
            let prevStyle = baseStyle;
            let start = segments[0].start;
            let i = start;
            function addStyle(s, e, l, st) {
                const dir = spanGaps ? -1 : 1;
                if (s === e) return;
                s += count;
                while (points[s % count].skip) s -= dir;
                while (points[e % count].skip) e += dir;
                if (s % count !== e % count) {
                    result.push({
                        start: s % count,
                        end: e % count,
                        loop: l,
                        style: st
                    });
                    prevStyle = st;
                    start = e % count;
                }
            }
            for (const segment of segments) {
                start = spanGaps ? start : segment.start;
                let prev = points[start % count];
                let style;
                for (i = start + 1; i <= segment.end; i++) {
                    const pt = points[i % count];
                    style = readStyle(segmentOptions.setContext(createContext(chartContext, {
                        type: "segment",
                        p0: prev,
                        p1: pt,
                        p0DataIndex: (i - 1) % count,
                        p1DataIndex: i % count,
                        datasetIndex
                    })));
                    if (styleChanged(style, prevStyle)) addStyle(start, i - 1, segment.loop, prevStyle);
                    prev = pt;
                    prevStyle = style;
                }
                if (start < i - 1) addStyle(start, i - 1, segment.loop, prevStyle);
            }
            return result;
        }
        function readStyle(options) {
            return {
                backgroundColor: options.backgroundColor,
                borderCapStyle: options.borderCapStyle,
                borderDash: options.borderDash,
                borderDashOffset: options.borderDashOffset,
                borderJoinStyle: options.borderJoinStyle,
                borderWidth: options.borderWidth,
                borderColor: options.borderColor
            };
        }
        function styleChanged(style, prevStyle) {
            return prevStyle && JSON.stringify(style) !== JSON.stringify(prevStyle);
        }
        /*!
 * Chart.js v3.7.1
 * https://www.chartjs.org
 * (c) 2022 Chart.js Contributors
 * Released under the MIT License
 */
        class Animator {
            constructor() {
                this._request = null;
                this._charts = new Map;
                this._running = false;
                this._lastDate = void 0;
            }
            _notify(chart, anims, date, type) {
                const callbacks = anims.listeners[type];
                const numSteps = anims.duration;
                callbacks.forEach((fn => fn({
                    chart,
                    initial: anims.initial,
                    numSteps,
                    currentStep: Math.min(date - anims.start, numSteps)
                })));
            }
            _refresh() {
                if (this._request) return;
                this._running = true;
                this._request = requestAnimFrame.call(window, (() => {
                    this._update();
                    this._request = null;
                    if (this._running) this._refresh();
                }));
            }
            _update(date = Date.now()) {
                let remaining = 0;
                this._charts.forEach(((anims, chart) => {
                    if (!anims.running || !anims.items.length) return;
                    const items = anims.items;
                    let i = items.length - 1;
                    let draw = false;
                    let item;
                    for (;i >= 0; --i) {
                        item = items[i];
                        if (item._active) {
                            if (item._total > anims.duration) anims.duration = item._total;
                            item.tick(date);
                            draw = true;
                        } else {
                            items[i] = items[items.length - 1];
                            items.pop();
                        }
                    }
                    if (draw) {
                        chart.draw();
                        this._notify(chart, anims, date, "progress");
                    }
                    if (!items.length) {
                        anims.running = false;
                        this._notify(chart, anims, date, "complete");
                        anims.initial = false;
                    }
                    remaining += items.length;
                }));
                this._lastDate = date;
                if (0 === remaining) this._running = false;
            }
            _getAnims(chart) {
                const charts = this._charts;
                let anims = charts.get(chart);
                if (!anims) {
                    anims = {
                        running: false,
                        initial: true,
                        items: [],
                        listeners: {
                            complete: [],
                            progress: []
                        }
                    };
                    charts.set(chart, anims);
                }
                return anims;
            }
            listen(chart, event, cb) {
                this._getAnims(chart).listeners[event].push(cb);
            }
            add(chart, items) {
                if (!items || !items.length) return;
                this._getAnims(chart).items.push(...items);
            }
            has(chart) {
                return this._getAnims(chart).items.length > 0;
            }
            start(chart) {
                const anims = this._charts.get(chart);
                if (!anims) return;
                anims.running = true;
                anims.start = Date.now();
                anims.duration = anims.items.reduce(((acc, cur) => Math.max(acc, cur._duration)), 0);
                this._refresh();
            }
            running(chart) {
                if (!this._running) return false;
                const anims = this._charts.get(chart);
                if (!anims || !anims.running || !anims.items.length) return false;
                return true;
            }
            stop(chart) {
                const anims = this._charts.get(chart);
                if (!anims || !anims.items.length) return;
                const items = anims.items;
                let i = items.length - 1;
                for (;i >= 0; --i) items[i].cancel();
                anims.items = [];
                this._notify(chart, anims, Date.now(), "complete");
            }
            remove(chart) {
                return this._charts.delete(chart);
            }
        }
        var animator = new Animator;
        const transparent = "transparent";
        const interpolators = {
            boolean(from, to, factor) {
                return factor > .5 ? to : from;
            },
            color(from, to, factor) {
                const c0 = color(from || transparent);
                const c1 = c0.valid && color(to || transparent);
                return c1 && c1.valid ? c1.mix(c0, factor).hexString() : to;
            },
            number(from, to, factor) {
                return from + (to - from) * factor;
            }
        };
        class Animation {
            constructor(cfg, target, prop, to) {
                const currentValue = target[prop];
                to = resolve([ cfg.to, to, currentValue, cfg.from ]);
                const from = resolve([ cfg.from, currentValue, to ]);
                this._active = true;
                this._fn = cfg.fn || interpolators[cfg.type || typeof from];
                this._easing = effects[cfg.easing] || effects.linear;
                this._start = Math.floor(Date.now() + (cfg.delay || 0));
                this._duration = this._total = Math.floor(cfg.duration);
                this._loop = !!cfg.loop;
                this._target = target;
                this._prop = prop;
                this._from = from;
                this._to = to;
                this._promises = void 0;
            }
            active() {
                return this._active;
            }
            update(cfg, to, date) {
                if (this._active) {
                    this._notify(false);
                    const currentValue = this._target[this._prop];
                    const elapsed = date - this._start;
                    const remain = this._duration - elapsed;
                    this._start = date;
                    this._duration = Math.floor(Math.max(remain, cfg.duration));
                    this._total += elapsed;
                    this._loop = !!cfg.loop;
                    this._to = resolve([ cfg.to, to, currentValue, cfg.from ]);
                    this._from = resolve([ cfg.from, currentValue, to ]);
                }
            }
            cancel() {
                if (this._active) {
                    this.tick(Date.now());
                    this._active = false;
                    this._notify(false);
                }
            }
            tick(date) {
                const elapsed = date - this._start;
                const duration = this._duration;
                const prop = this._prop;
                const from = this._from;
                const loop = this._loop;
                const to = this._to;
                let factor;
                this._active = from !== to && (loop || elapsed < duration);
                if (!this._active) {
                    this._target[prop] = to;
                    this._notify(true);
                    return;
                }
                if (elapsed < 0) {
                    this._target[prop] = from;
                    return;
                }
                factor = elapsed / duration % 2;
                factor = loop && factor > 1 ? 2 - factor : factor;
                factor = this._easing(Math.min(1, Math.max(0, factor)));
                this._target[prop] = this._fn(from, to, factor);
            }
            wait() {
                const promises = this._promises || (this._promises = []);
                return new Promise(((res, rej) => {
                    promises.push({
                        res,
                        rej
                    });
                }));
            }
            _notify(resolved) {
                const method = resolved ? "res" : "rej";
                const promises = this._promises || [];
                for (let i = 0; i < promises.length; i++) promises[i][method]();
            }
        }
        const numbers = [ "x", "y", "borderWidth", "radius", "tension" ];
        const colors = [ "color", "borderColor", "backgroundColor" ];
        helpers_segment_defaults.set("animation", {
            delay: void 0,
            duration: 1e3,
            easing: "easeOutQuart",
            fn: void 0,
            from: void 0,
            loop: void 0,
            to: void 0,
            type: void 0
        });
        const animationOptions = Object.keys(helpers_segment_defaults.animation);
        helpers_segment_defaults.describe("animation", {
            _fallback: false,
            _indexable: false,
            _scriptable: name => "onProgress" !== name && "onComplete" !== name && "fn" !== name
        });
        helpers_segment_defaults.set("animations", {
            colors: {
                type: "color",
                properties: colors
            },
            numbers: {
                type: "number",
                properties: numbers
            }
        });
        helpers_segment_defaults.describe("animations", {
            _fallback: "animation"
        });
        helpers_segment_defaults.set("transitions", {
            active: {
                animation: {
                    duration: 400
                }
            },
            resize: {
                animation: {
                    duration: 0
                }
            },
            show: {
                animations: {
                    colors: {
                        from: "transparent"
                    },
                    visible: {
                        type: "boolean",
                        duration: 0
                    }
                }
            },
            hide: {
                animations: {
                    colors: {
                        to: "transparent"
                    },
                    visible: {
                        type: "boolean",
                        easing: "linear",
                        fn: v => 0 | v
                    }
                }
            }
        });
        class Animations {
            constructor(chart, config) {
                this._chart = chart;
                this._properties = new Map;
                this.configure(config);
            }
            configure(config) {
                if (!helpers_segment_isObject(config)) return;
                const animatedProps = this._properties;
                Object.getOwnPropertyNames(config).forEach((key => {
                    const cfg = config[key];
                    if (!helpers_segment_isObject(cfg)) return;
                    const resolved = {};
                    for (const option of animationOptions) resolved[option] = cfg[option];
                    (isArray(cfg.properties) && cfg.properties || [ key ]).forEach((prop => {
                        if (prop === key || !animatedProps.has(prop)) animatedProps.set(prop, resolved);
                    }));
                }));
            }
            _animateOptions(target, values) {
                const newOptions = values.options;
                const options = resolveTargetOptions(target, newOptions);
                if (!options) return [];
                const animations = this._createAnimations(options, newOptions);
                if (newOptions.$shared) awaitAll(target.options.$animations, newOptions).then((() => {
                    target.options = newOptions;
                }), (() => {}));
                return animations;
            }
            _createAnimations(target, values) {
                const animatedProps = this._properties;
                const animations = [];
                const running = target.$animations || (target.$animations = {});
                const props = Object.keys(values);
                const date = Date.now();
                let i;
                for (i = props.length - 1; i >= 0; --i) {
                    const prop = props[i];
                    if ("$" === prop.charAt(0)) continue;
                    if ("options" === prop) {
                        animations.push(...this._animateOptions(target, values));
                        continue;
                    }
                    const value = values[prop];
                    let animation = running[prop];
                    const cfg = animatedProps.get(prop);
                    if (animation) if (cfg && animation.active()) {
                        animation.update(cfg, value, date);
                        continue;
                    } else animation.cancel();
                    if (!cfg || !cfg.duration) {
                        target[prop] = value;
                        continue;
                    }
                    running[prop] = animation = new Animation(cfg, target, prop, value);
                    animations.push(animation);
                }
                return animations;
            }
            update(target, values) {
                if (0 === this._properties.size) {
                    Object.assign(target, values);
                    return;
                }
                const animations = this._createAnimations(target, values);
                if (animations.length) {
                    animator.add(this._chart, animations);
                    return true;
                }
            }
        }
        function awaitAll(animations, properties) {
            const running = [];
            const keys = Object.keys(properties);
            for (let i = 0; i < keys.length; i++) {
                const anim = animations[keys[i]];
                if (anim && anim.active()) running.push(anim.wait());
            }
            return Promise.all(running);
        }
        function resolveTargetOptions(target, newOptions) {
            if (!newOptions) return;
            let options = target.options;
            if (!options) {
                target.options = newOptions;
                return;
            }
            if (options.$shared) target.options = options = Object.assign({}, options, {
                $shared: false,
                $animations: {}
            });
            return options;
        }
        function scaleClip(scale, allowedOverflow) {
            const opts = scale && scale.options || {};
            const reverse = opts.reverse;
            const min = void 0 === opts.min ? allowedOverflow : 0;
            const max = void 0 === opts.max ? allowedOverflow : 0;
            return {
                start: reverse ? max : min,
                end: reverse ? min : max
            };
        }
        function defaultClip(xScale, yScale, allowedOverflow) {
            if (false === allowedOverflow) return false;
            const x = scaleClip(xScale, allowedOverflow);
            const y = scaleClip(yScale, allowedOverflow);
            return {
                top: y.end,
                right: x.end,
                bottom: y.start,
                left: x.start
            };
        }
        function toClip(value) {
            let t, r, b, l;
            if (helpers_segment_isObject(value)) {
                t = value.top;
                r = value.right;
                b = value.bottom;
                l = value.left;
            } else t = r = b = l = value;
            return {
                top: t,
                right: r,
                bottom: b,
                left: l,
                disabled: false === value
            };
        }
        function getSortedDatasetIndices(chart, filterVisible) {
            const keys = [];
            const metasets = chart._getSortedDatasetMetas(filterVisible);
            let i, ilen;
            for (i = 0, ilen = metasets.length; i < ilen; ++i) keys.push(metasets[i].index);
            return keys;
        }
        function applyStack(stack, value, dsIndex, options = {}) {
            const keys = stack.keys;
            const singleMode = "single" === options.mode;
            let i, ilen, datasetIndex, otherValue;
            if (null === value) return;
            for (i = 0, ilen = keys.length; i < ilen; ++i) {
                datasetIndex = +keys[i];
                if (datasetIndex === dsIndex) {
                    if (options.all) continue;
                    break;
                }
                otherValue = stack.values[datasetIndex];
                if (isNumberFinite(otherValue) && (singleMode || 0 === value || sign(value) === sign(otherValue))) value += otherValue;
            }
            return value;
        }
        function convertObjectDataToArray(data) {
            const keys = Object.keys(data);
            const adata = new Array(keys.length);
            let i, ilen, key;
            for (i = 0, ilen = keys.length; i < ilen; ++i) {
                key = keys[i];
                adata[i] = {
                    x: key,
                    y: data[key]
                };
            }
            return adata;
        }
        function isStacked(scale, meta) {
            const stacked = scale && scale.options.stacked;
            return stacked || void 0 === stacked && void 0 !== meta.stack;
        }
        function getStackKey(indexScale, valueScale, meta) {
            return `${indexScale.id}.${valueScale.id}.${meta.stack || meta.type}`;
        }
        function getUserBounds(scale) {
            const {min, max, minDefined, maxDefined} = scale.getUserBounds();
            return {
                min: minDefined ? min : Number.NEGATIVE_INFINITY,
                max: maxDefined ? max : Number.POSITIVE_INFINITY
            };
        }
        function getOrCreateStack(stacks, stackKey, indexValue) {
            const subStack = stacks[stackKey] || (stacks[stackKey] = {});
            return subStack[indexValue] || (subStack[indexValue] = {});
        }
        function getLastIndexInStack(stack, vScale, positive, type) {
            for (const meta of vScale.getMatchingVisibleMetas(type).reverse()) {
                const value = stack[meta.index];
                if (positive && value > 0 || !positive && value < 0) return meta.index;
            }
            return null;
        }
        function updateStacks(controller, parsed) {
            const {chart, _cachedMeta: meta} = controller;
            const stacks = chart._stacks || (chart._stacks = {});
            const {iScale, vScale, index: datasetIndex} = meta;
            const iAxis = iScale.axis;
            const vAxis = vScale.axis;
            const key = getStackKey(iScale, vScale, meta);
            const ilen = parsed.length;
            let stack;
            for (let i = 0; i < ilen; ++i) {
                const item = parsed[i];
                const {[iAxis]: index, [vAxis]: value} = item;
                const itemStacks = item._stacks || (item._stacks = {});
                stack = itemStacks[vAxis] = getOrCreateStack(stacks, key, index);
                stack[datasetIndex] = value;
                stack._top = getLastIndexInStack(stack, vScale, true, meta.type);
                stack._bottom = getLastIndexInStack(stack, vScale, false, meta.type);
            }
        }
        function getFirstScaleId(chart, axis) {
            const scales = chart.scales;
            return Object.keys(scales).filter((key => scales[key].axis === axis)).shift();
        }
        function createDatasetContext(parent, index) {
            return createContext(parent, {
                active: false,
                dataset: void 0,
                datasetIndex: index,
                index,
                mode: "default",
                type: "dataset"
            });
        }
        function createDataContext(parent, index, element) {
            return createContext(parent, {
                active: false,
                dataIndex: index,
                parsed: void 0,
                raw: void 0,
                element,
                index,
                mode: "default",
                type: "data"
            });
        }
        function clearStacks(meta, items) {
            const datasetIndex = meta.controller.index;
            const axis = meta.vScale && meta.vScale.axis;
            if (!axis) return;
            items = items || meta._parsed;
            for (const parsed of items) {
                const stacks = parsed._stacks;
                if (!stacks || void 0 === stacks[axis] || void 0 === stacks[axis][datasetIndex]) return;
                delete stacks[axis][datasetIndex];
            }
        }
        const isDirectUpdateMode = mode => "reset" === mode || "none" === mode;
        const cloneIfNotShared = (cached, shared) => shared ? cached : Object.assign({}, cached);
        const createStack = (canStack, meta, chart) => canStack && !meta.hidden && meta._stacked && {
            keys: getSortedDatasetIndices(chart, true),
            values: null
        };
        class DatasetController {
            constructor(chart, datasetIndex) {
                this.chart = chart;
                this._ctx = chart.ctx;
                this.index = datasetIndex;
                this._cachedDataOpts = {};
                this._cachedMeta = this.getMeta();
                this._type = this._cachedMeta.type;
                this.options = void 0;
                this._parsing = false;
                this._data = void 0;
                this._objectData = void 0;
                this._sharedOptions = void 0;
                this._drawStart = void 0;
                this._drawCount = void 0;
                this.enableOptionSharing = false;
                this.$context = void 0;
                this._syncList = [];
                this.initialize();
            }
            initialize() {
                const meta = this._cachedMeta;
                this.configure();
                this.linkScales();
                meta._stacked = isStacked(meta.vScale, meta);
                this.addElements();
            }
            updateIndex(datasetIndex) {
                if (this.index !== datasetIndex) clearStacks(this._cachedMeta);
                this.index = datasetIndex;
            }
            linkScales() {
                const chart = this.chart;
                const meta = this._cachedMeta;
                const dataset = this.getDataset();
                const chooseId = (axis, x, y, r) => "x" === axis ? x : "r" === axis ? r : y;
                const xid = meta.xAxisID = valueOrDefault(dataset.xAxisID, getFirstScaleId(chart, "x"));
                const yid = meta.yAxisID = valueOrDefault(dataset.yAxisID, getFirstScaleId(chart, "y"));
                const rid = meta.rAxisID = valueOrDefault(dataset.rAxisID, getFirstScaleId(chart, "r"));
                const indexAxis = meta.indexAxis;
                const iid = meta.iAxisID = chooseId(indexAxis, xid, yid, rid);
                const vid = meta.vAxisID = chooseId(indexAxis, yid, xid, rid);
                meta.xScale = this.getScaleForId(xid);
                meta.yScale = this.getScaleForId(yid);
                meta.rScale = this.getScaleForId(rid);
                meta.iScale = this.getScaleForId(iid);
                meta.vScale = this.getScaleForId(vid);
            }
            getDataset() {
                return this.chart.data.datasets[this.index];
            }
            getMeta() {
                return this.chart.getDatasetMeta(this.index);
            }
            getScaleForId(scaleID) {
                return this.chart.scales[scaleID];
            }
            _getOtherScale(scale) {
                const meta = this._cachedMeta;
                return scale === meta.iScale ? meta.vScale : meta.iScale;
            }
            reset() {
                this._update("reset");
            }
            _destroy() {
                const meta = this._cachedMeta;
                if (this._data) unlistenArrayEvents(this._data, this);
                if (meta._stacked) clearStacks(meta);
            }
            _dataCheck() {
                const dataset = this.getDataset();
                const data = dataset.data || (dataset.data = []);
                const _data = this._data;
                if (helpers_segment_isObject(data)) this._data = convertObjectDataToArray(data); else if (_data !== data) {
                    if (_data) {
                        unlistenArrayEvents(_data, this);
                        const meta = this._cachedMeta;
                        clearStacks(meta);
                        meta._parsed = [];
                    }
                    if (data && Object.isExtensible(data)) listenArrayEvents(data, this);
                    this._syncList = [];
                    this._data = data;
                }
            }
            addElements() {
                const meta = this._cachedMeta;
                this._dataCheck();
                if (this.datasetElementType) meta.dataset = new this.datasetElementType;
            }
            buildOrUpdateElements(resetNewElements) {
                const meta = this._cachedMeta;
                const dataset = this.getDataset();
                let stackChanged = false;
                this._dataCheck();
                const oldStacked = meta._stacked;
                meta._stacked = isStacked(meta.vScale, meta);
                if (meta.stack !== dataset.stack) {
                    stackChanged = true;
                    clearStacks(meta);
                    meta.stack = dataset.stack;
                }
                this._resyncElements(resetNewElements);
                if (stackChanged || oldStacked !== meta._stacked) updateStacks(this, meta._parsed);
            }
            configure() {
                const config = this.chart.config;
                const scopeKeys = config.datasetScopeKeys(this._type);
                const scopes = config.getOptionScopes(this.getDataset(), scopeKeys, true);
                this.options = config.createResolver(scopes, this.getContext());
                this._parsing = this.options.parsing;
                this._cachedDataOpts = {};
            }
            parse(start, count) {
                const {_cachedMeta: meta, _data: data} = this;
                const {iScale, _stacked} = meta;
                const iAxis = iScale.axis;
                let sorted = 0 === start && count === data.length ? true : meta._sorted;
                let prev = start > 0 && meta._parsed[start - 1];
                let i, cur, parsed;
                if (false === this._parsing) {
                    meta._parsed = data;
                    meta._sorted = true;
                    parsed = data;
                } else {
                    if (isArray(data[start])) parsed = this.parseArrayData(meta, data, start, count); else if (helpers_segment_isObject(data[start])) parsed = this.parseObjectData(meta, data, start, count); else parsed = this.parsePrimitiveData(meta, data, start, count);
                    const isNotInOrderComparedToPrev = () => null === cur[iAxis] || prev && cur[iAxis] < prev[iAxis];
                    for (i = 0; i < count; ++i) {
                        meta._parsed[i + start] = cur = parsed[i];
                        if (sorted) {
                            if (isNotInOrderComparedToPrev()) sorted = false;
                            prev = cur;
                        }
                    }
                    meta._sorted = sorted;
                }
                if (_stacked) updateStacks(this, parsed);
            }
            parsePrimitiveData(meta, data, start, count) {
                const {iScale, vScale} = meta;
                const iAxis = iScale.axis;
                const vAxis = vScale.axis;
                const labels = iScale.getLabels();
                const singleScale = iScale === vScale;
                const parsed = new Array(count);
                let i, ilen, index;
                for (i = 0, ilen = count; i < ilen; ++i) {
                    index = i + start;
                    parsed[i] = {
                        [iAxis]: singleScale || iScale.parse(labels[index], index),
                        [vAxis]: vScale.parse(data[index], index)
                    };
                }
                return parsed;
            }
            parseArrayData(meta, data, start, count) {
                const {xScale, yScale} = meta;
                const parsed = new Array(count);
                let i, ilen, index, item;
                for (i = 0, ilen = count; i < ilen; ++i) {
                    index = i + start;
                    item = data[index];
                    parsed[i] = {
                        x: xScale.parse(item[0], index),
                        y: yScale.parse(item[1], index)
                    };
                }
                return parsed;
            }
            parseObjectData(meta, data, start, count) {
                const {xScale, yScale} = meta;
                const {xAxisKey = "x", yAxisKey = "y"} = this._parsing;
                const parsed = new Array(count);
                let i, ilen, index, item;
                for (i = 0, ilen = count; i < ilen; ++i) {
                    index = i + start;
                    item = data[index];
                    parsed[i] = {
                        x: xScale.parse(resolveObjectKey(item, xAxisKey), index),
                        y: yScale.parse(resolveObjectKey(item, yAxisKey), index)
                    };
                }
                return parsed;
            }
            getParsed(index) {
                return this._cachedMeta._parsed[index];
            }
            getDataElement(index) {
                return this._cachedMeta.data[index];
            }
            applyStack(scale, parsed, mode) {
                const chart = this.chart;
                const meta = this._cachedMeta;
                const value = parsed[scale.axis];
                const stack = {
                    keys: getSortedDatasetIndices(chart, true),
                    values: parsed._stacks[scale.axis]
                };
                return applyStack(stack, value, meta.index, {
                    mode
                });
            }
            updateRangeFromParsed(range, scale, parsed, stack) {
                const parsedValue = parsed[scale.axis];
                let value = null === parsedValue ? NaN : parsedValue;
                const values = stack && parsed._stacks[scale.axis];
                if (stack && values) {
                    stack.values = values;
                    value = applyStack(stack, parsedValue, this._cachedMeta.index);
                }
                range.min = Math.min(range.min, value);
                range.max = Math.max(range.max, value);
            }
            getMinMax(scale, canStack) {
                const meta = this._cachedMeta;
                const _parsed = meta._parsed;
                const sorted = meta._sorted && scale === meta.iScale;
                const ilen = _parsed.length;
                const otherScale = this._getOtherScale(scale);
                const stack = createStack(canStack, meta, this.chart);
                const range = {
                    min: Number.POSITIVE_INFINITY,
                    max: Number.NEGATIVE_INFINITY
                };
                const {min: otherMin, max: otherMax} = getUserBounds(otherScale);
                let i, parsed;
                function _skip() {
                    parsed = _parsed[i];
                    const otherValue = parsed[otherScale.axis];
                    return !isNumberFinite(parsed[scale.axis]) || otherMin > otherValue || otherMax < otherValue;
                }
                for (i = 0; i < ilen; ++i) {
                    if (_skip()) continue;
                    this.updateRangeFromParsed(range, scale, parsed, stack);
                    if (sorted) break;
                }
                if (sorted) for (i = ilen - 1; i >= 0; --i) {
                    if (_skip()) continue;
                    this.updateRangeFromParsed(range, scale, parsed, stack);
                    break;
                }
                return range;
            }
            getAllParsedValues(scale) {
                const parsed = this._cachedMeta._parsed;
                const values = [];
                let i, ilen, value;
                for (i = 0, ilen = parsed.length; i < ilen; ++i) {
                    value = parsed[i][scale.axis];
                    if (isNumberFinite(value)) values.push(value);
                }
                return values;
            }
            getMaxOverflow() {
                return false;
            }
            getLabelAndValue(index) {
                const meta = this._cachedMeta;
                const iScale = meta.iScale;
                const vScale = meta.vScale;
                const parsed = this.getParsed(index);
                return {
                    label: iScale ? "" + iScale.getLabelForValue(parsed[iScale.axis]) : "",
                    value: vScale ? "" + vScale.getLabelForValue(parsed[vScale.axis]) : ""
                };
            }
            _update(mode) {
                const meta = this._cachedMeta;
                this.update(mode || "default");
                meta._clip = toClip(valueOrDefault(this.options.clip, defaultClip(meta.xScale, meta.yScale, this.getMaxOverflow())));
            }
            update(mode) {}
            draw() {
                const ctx = this._ctx;
                const chart = this.chart;
                const meta = this._cachedMeta;
                const elements = meta.data || [];
                const area = chart.chartArea;
                const active = [];
                const start = this._drawStart || 0;
                const count = this._drawCount || elements.length - start;
                const drawActiveElementsOnTop = this.options.drawActiveElementsOnTop;
                let i;
                if (meta.dataset) meta.dataset.draw(ctx, area, start, count);
                for (i = start; i < start + count; ++i) {
                    const element = elements[i];
                    if (element.hidden) continue;
                    if (element.active && drawActiveElementsOnTop) active.push(element); else element.draw(ctx, area);
                }
                for (i = 0; i < active.length; ++i) active[i].draw(ctx, area);
            }
            getStyle(index, active) {
                const mode = active ? "active" : "default";
                return void 0 === index && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(mode) : this.resolveDataElementOptions(index || 0, mode);
            }
            getContext(index, active, mode) {
                const dataset = this.getDataset();
                let context;
                if (index >= 0 && index < this._cachedMeta.data.length) {
                    const element = this._cachedMeta.data[index];
                    context = element.$context || (element.$context = createDataContext(this.getContext(), index, element));
                    context.parsed = this.getParsed(index);
                    context.raw = dataset.data[index];
                    context.index = context.dataIndex = index;
                } else {
                    context = this.$context || (this.$context = createDatasetContext(this.chart.getContext(), this.index));
                    context.dataset = dataset;
                    context.index = context.datasetIndex = this.index;
                }
                context.active = !!active;
                context.mode = mode;
                return context;
            }
            resolveDatasetElementOptions(mode) {
                return this._resolveElementOptions(this.datasetElementType.id, mode);
            }
            resolveDataElementOptions(index, mode) {
                return this._resolveElementOptions(this.dataElementType.id, mode, index);
            }
            _resolveElementOptions(elementType, mode = "default", index) {
                const active = "active" === mode;
                const cache = this._cachedDataOpts;
                const cacheKey = elementType + "-" + mode;
                const cached = cache[cacheKey];
                const sharing = this.enableOptionSharing && defined(index);
                if (cached) return cloneIfNotShared(cached, sharing);
                const config = this.chart.config;
                const scopeKeys = config.datasetElementScopeKeys(this._type, elementType);
                const prefixes = active ? [ `${elementType}Hover`, "hover", elementType, "" ] : [ elementType, "" ];
                const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
                const names = Object.keys(helpers_segment_defaults.elements[elementType]);
                const context = () => this.getContext(index, active);
                const values = config.resolveNamedOptions(scopes, names, context, prefixes);
                if (values.$shared) {
                    values.$shared = sharing;
                    cache[cacheKey] = Object.freeze(cloneIfNotShared(values, sharing));
                }
                return values;
            }
            _resolveAnimations(index, transition, active) {
                const chart = this.chart;
                const cache = this._cachedDataOpts;
                const cacheKey = `animation-${transition}`;
                const cached = cache[cacheKey];
                if (cached) return cached;
                let options;
                if (false !== chart.options.animation) {
                    const config = this.chart.config;
                    const scopeKeys = config.datasetAnimationScopeKeys(this._type, transition);
                    const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
                    options = config.createResolver(scopes, this.getContext(index, active, transition));
                }
                const animations = new Animations(chart, options && options.animations);
                if (options && options._cacheable) cache[cacheKey] = Object.freeze(animations);
                return animations;
            }
            getSharedOptions(options) {
                if (!options.$shared) return;
                return this._sharedOptions || (this._sharedOptions = Object.assign({}, options));
            }
            includeOptions(mode, sharedOptions) {
                return !sharedOptions || isDirectUpdateMode(mode) || this.chart._animationsDisabled;
            }
            updateElement(element, index, properties, mode) {
                if (isDirectUpdateMode(mode)) Object.assign(element, properties); else this._resolveAnimations(index, mode).update(element, properties);
            }
            updateSharedOptions(sharedOptions, mode, newOptions) {
                if (sharedOptions && !isDirectUpdateMode(mode)) this._resolveAnimations(void 0, mode).update(sharedOptions, newOptions);
            }
            _setStyle(element, index, mode, active) {
                element.active = active;
                const options = this.getStyle(index, active);
                this._resolveAnimations(index, mode, active).update(element, {
                    options: !active && this.getSharedOptions(options) || options
                });
            }
            removeHoverStyle(element, datasetIndex, index) {
                this._setStyle(element, index, "active", false);
            }
            setHoverStyle(element, datasetIndex, index) {
                this._setStyle(element, index, "active", true);
            }
            _removeDatasetHoverStyle() {
                const element = this._cachedMeta.dataset;
                if (element) this._setStyle(element, void 0, "active", false);
            }
            _setDatasetHoverStyle() {
                const element = this._cachedMeta.dataset;
                if (element) this._setStyle(element, void 0, "active", true);
            }
            _resyncElements(resetNewElements) {
                const data = this._data;
                const elements = this._cachedMeta.data;
                for (const [method, arg1, arg2] of this._syncList) this[method](arg1, arg2);
                this._syncList = [];
                const numMeta = elements.length;
                const numData = data.length;
                const count = Math.min(numData, numMeta);
                if (count) this.parse(0, count);
                if (numData > numMeta) this._insertElements(numMeta, numData - numMeta, resetNewElements); else if (numData < numMeta) this._removeElements(numData, numMeta - numData);
            }
            _insertElements(start, count, resetNewElements = true) {
                const meta = this._cachedMeta;
                const data = meta.data;
                const end = start + count;
                let i;
                const move = arr => {
                    arr.length += count;
                    for (i = arr.length - 1; i >= end; i--) arr[i] = arr[i - count];
                };
                move(data);
                for (i = start; i < end; ++i) data[i] = new this.dataElementType;
                if (this._parsing) move(meta._parsed);
                this.parse(start, count);
                if (resetNewElements) this.updateElements(data, start, count, "reset");
            }
            updateElements(element, start, count, mode) {}
            _removeElements(start, count) {
                const meta = this._cachedMeta;
                if (this._parsing) {
                    const removed = meta._parsed.splice(start, count);
                    if (meta._stacked) clearStacks(meta, removed);
                }
                meta.data.splice(start, count);
            }
            _sync(args) {
                if (this._parsing) this._syncList.push(args); else {
                    const [method, arg1, arg2] = args;
                    this[method](arg1, arg2);
                }
                this.chart._dataChanges.push([ this.index, ...args ]);
            }
            _onDataPush() {
                const count = arguments.length;
                this._sync([ "_insertElements", this.getDataset().data.length - count, count ]);
            }
            _onDataPop() {
                this._sync([ "_removeElements", this._cachedMeta.data.length - 1, 1 ]);
            }
            _onDataShift() {
                this._sync([ "_removeElements", 0, 1 ]);
            }
            _onDataSplice(start, count) {
                if (count) this._sync([ "_removeElements", start, count ]);
                const newCount = arguments.length - 2;
                if (newCount) this._sync([ "_insertElements", start, newCount ]);
            }
            _onDataUnshift() {
                this._sync([ "_insertElements", 0, arguments.length ]);
            }
        }
        DatasetController.defaults = {};
        DatasetController.prototype.datasetElementType = null;
        DatasetController.prototype.dataElementType = null;
        function getAllScaleValues(scale, type) {
            if (!scale._cache.$bar) {
                const visibleMetas = scale.getMatchingVisibleMetas(type);
                let values = [];
                for (let i = 0, ilen = visibleMetas.length; i < ilen; i++) values = values.concat(visibleMetas[i].controller.getAllParsedValues(scale));
                scale._cache.$bar = _arrayUnique(values.sort(((a, b) => a - b)));
            }
            return scale._cache.$bar;
        }
        function computeMinSampleSize(meta) {
            const scale = meta.iScale;
            const values = getAllScaleValues(scale, meta.type);
            let min = scale._length;
            let i, ilen, curr, prev;
            const updateMinAndPrev = () => {
                if (32767 === curr || -32768 === curr) return;
                if (defined(prev)) min = Math.min(min, Math.abs(curr - prev) || min);
                prev = curr;
            };
            for (i = 0, ilen = values.length; i < ilen; ++i) {
                curr = scale.getPixelForValue(values[i]);
                updateMinAndPrev();
            }
            prev = void 0;
            for (i = 0, ilen = scale.ticks.length; i < ilen; ++i) {
                curr = scale.getPixelForTick(i);
                updateMinAndPrev();
            }
            return min;
        }
        function computeFitCategoryTraits(index, ruler, options, stackCount) {
            const thickness = options.barThickness;
            let size, ratio;
            if (isNullOrUndef(thickness)) {
                size = ruler.min * options.categoryPercentage;
                ratio = options.barPercentage;
            } else {
                size = thickness * stackCount;
                ratio = 1;
            }
            return {
                chunk: size / stackCount,
                ratio,
                start: ruler.pixels[index] - size / 2
            };
        }
        function computeFlexCategoryTraits(index, ruler, options, stackCount) {
            const pixels = ruler.pixels;
            const curr = pixels[index];
            let prev = index > 0 ? pixels[index - 1] : null;
            let next = index < pixels.length - 1 ? pixels[index + 1] : null;
            const percent = options.categoryPercentage;
            if (null === prev) prev = curr - (null === next ? ruler.end - ruler.start : next - curr);
            if (null === next) next = curr + curr - prev;
            const start = curr - (curr - Math.min(prev, next)) / 2 * percent;
            const size = Math.abs(next - prev) / 2 * percent;
            return {
                chunk: size / stackCount,
                ratio: options.barPercentage,
                start
            };
        }
        function parseFloatBar(entry, item, vScale, i) {
            const startValue = vScale.parse(entry[0], i);
            const endValue = vScale.parse(entry[1], i);
            const min = Math.min(startValue, endValue);
            const max = Math.max(startValue, endValue);
            let barStart = min;
            let barEnd = max;
            if (Math.abs(min) > Math.abs(max)) {
                barStart = max;
                barEnd = min;
            }
            item[vScale.axis] = barEnd;
            item._custom = {
                barStart,
                barEnd,
                start: startValue,
                end: endValue,
                min,
                max
            };
        }
        function parseValue(entry, item, vScale, i) {
            if (isArray(entry)) parseFloatBar(entry, item, vScale, i); else item[vScale.axis] = vScale.parse(entry, i);
            return item;
        }
        function parseArrayOrPrimitive(meta, data, start, count) {
            const iScale = meta.iScale;
            const vScale = meta.vScale;
            const labels = iScale.getLabels();
            const singleScale = iScale === vScale;
            const parsed = [];
            let i, ilen, item, entry;
            for (i = start, ilen = start + count; i < ilen; ++i) {
                entry = data[i];
                item = {};
                item[iScale.axis] = singleScale || iScale.parse(labels[i], i);
                parsed.push(parseValue(entry, item, vScale, i));
            }
            return parsed;
        }
        function isFloatBar(custom) {
            return custom && void 0 !== custom.barStart && void 0 !== custom.barEnd;
        }
        function barSign(size, vScale, actualBase) {
            if (0 !== size) return sign(size);
            return (vScale.isHorizontal() ? 1 : -1) * (vScale.min >= actualBase ? 1 : -1);
        }
        function borderProps(properties) {
            let reverse, start, end, top, bottom;
            if (properties.horizontal) {
                reverse = properties.base > properties.x;
                start = "left";
                end = "right";
            } else {
                reverse = properties.base < properties.y;
                start = "bottom";
                end = "top";
            }
            if (reverse) {
                top = "end";
                bottom = "start";
            } else {
                top = "start";
                bottom = "end";
            }
            return {
                start,
                end,
                reverse,
                top,
                bottom
            };
        }
        function setBorderSkipped(properties, options, stack, index) {
            let edge = options.borderSkipped;
            const res = {};
            if (!edge) {
                properties.borderSkipped = res;
                return;
            }
            const {start, end, reverse, top, bottom} = borderProps(properties);
            if ("middle" === edge && stack) {
                properties.enableBorderRadius = true;
                if ((stack._top || 0) === index) edge = top; else if ((stack._bottom || 0) === index) edge = bottom; else {
                    res[parseEdge(bottom, start, end, reverse)] = true;
                    edge = top;
                }
            }
            res[parseEdge(edge, start, end, reverse)] = true;
            properties.borderSkipped = res;
        }
        function parseEdge(edge, a, b, reverse) {
            if (reverse) {
                edge = swap(edge, a, b);
                edge = startEnd(edge, b, a);
            } else edge = startEnd(edge, a, b);
            return edge;
        }
        function swap(orig, v1, v2) {
            return orig === v1 ? v2 : orig === v2 ? v1 : orig;
        }
        function startEnd(v, start, end) {
            return "start" === v ? start : "end" === v ? end : v;
        }
        function setInflateAmount(properties, {inflateAmount}, ratio) {
            properties.inflateAmount = "auto" === inflateAmount ? 1 === ratio ? .33 : 0 : inflateAmount;
        }
        class BarController extends DatasetController {
            parsePrimitiveData(meta, data, start, count) {
                return parseArrayOrPrimitive(meta, data, start, count);
            }
            parseArrayData(meta, data, start, count) {
                return parseArrayOrPrimitive(meta, data, start, count);
            }
            parseObjectData(meta, data, start, count) {
                const {iScale, vScale} = meta;
                const {xAxisKey = "x", yAxisKey = "y"} = this._parsing;
                const iAxisKey = "x" === iScale.axis ? xAxisKey : yAxisKey;
                const vAxisKey = "x" === vScale.axis ? xAxisKey : yAxisKey;
                const parsed = [];
                let i, ilen, item, obj;
                for (i = start, ilen = start + count; i < ilen; ++i) {
                    obj = data[i];
                    item = {};
                    item[iScale.axis] = iScale.parse(resolveObjectKey(obj, iAxisKey), i);
                    parsed.push(parseValue(resolveObjectKey(obj, vAxisKey), item, vScale, i));
                }
                return parsed;
            }
            updateRangeFromParsed(range, scale, parsed, stack) {
                super.updateRangeFromParsed(range, scale, parsed, stack);
                const custom = parsed._custom;
                if (custom && scale === this._cachedMeta.vScale) {
                    range.min = Math.min(range.min, custom.min);
                    range.max = Math.max(range.max, custom.max);
                }
            }
            getMaxOverflow() {
                return 0;
            }
            getLabelAndValue(index) {
                const meta = this._cachedMeta;
                const {iScale, vScale} = meta;
                const parsed = this.getParsed(index);
                const custom = parsed._custom;
                const value = isFloatBar(custom) ? "[" + custom.start + ", " + custom.end + "]" : "" + vScale.getLabelForValue(parsed[vScale.axis]);
                return {
                    label: "" + iScale.getLabelForValue(parsed[iScale.axis]),
                    value
                };
            }
            initialize() {
                this.enableOptionSharing = true;
                super.initialize();
                const meta = this._cachedMeta;
                meta.stack = this.getDataset().stack;
            }
            update(mode) {
                const meta = this._cachedMeta;
                this.updateElements(meta.data, 0, meta.data.length, mode);
            }
            updateElements(bars, start, count, mode) {
                const reset = "reset" === mode;
                const {index, _cachedMeta: {vScale}} = this;
                const base = vScale.getBasePixel();
                const horizontal = vScale.isHorizontal();
                const ruler = this._getRuler();
                const firstOpts = this.resolveDataElementOptions(start, mode);
                const sharedOptions = this.getSharedOptions(firstOpts);
                const includeOptions = this.includeOptions(mode, sharedOptions);
                this.updateSharedOptions(sharedOptions, mode, firstOpts);
                for (let i = start; i < start + count; i++) {
                    const parsed = this.getParsed(i);
                    const vpixels = reset || isNullOrUndef(parsed[vScale.axis]) ? {
                        base,
                        head: base
                    } : this._calculateBarValuePixels(i);
                    const ipixels = this._calculateBarIndexPixels(i, ruler);
                    const stack = (parsed._stacks || {})[vScale.axis];
                    const properties = {
                        horizontal,
                        base: vpixels.base,
                        enableBorderRadius: !stack || isFloatBar(parsed._custom) || index === stack._top || index === stack._bottom,
                        x: horizontal ? vpixels.head : ipixels.center,
                        y: horizontal ? ipixels.center : vpixels.head,
                        height: horizontal ? ipixels.size : Math.abs(vpixels.size),
                        width: horizontal ? Math.abs(vpixels.size) : ipixels.size
                    };
                    if (includeOptions) properties.options = sharedOptions || this.resolveDataElementOptions(i, bars[i].active ? "active" : mode);
                    const options = properties.options || bars[i].options;
                    setBorderSkipped(properties, options, stack, index);
                    setInflateAmount(properties, options, ruler.ratio);
                    this.updateElement(bars[i], i, properties, mode);
                }
            }
            _getStacks(last, dataIndex) {
                const meta = this._cachedMeta;
                const iScale = meta.iScale;
                const metasets = iScale.getMatchingVisibleMetas(this._type);
                const stacked = iScale.options.stacked;
                const ilen = metasets.length;
                const stacks = [];
                let i, item;
                for (i = 0; i < ilen; ++i) {
                    item = metasets[i];
                    if (!item.controller.options.grouped) continue;
                    if ("undefined" !== typeof dataIndex) {
                        const val = item.controller.getParsed(dataIndex)[item.controller._cachedMeta.vScale.axis];
                        if (isNullOrUndef(val) || isNaN(val)) continue;
                    }
                    if (false === stacked || -1 === stacks.indexOf(item.stack) || void 0 === stacked && void 0 === item.stack) stacks.push(item.stack);
                    if (item.index === last) break;
                }
                if (!stacks.length) stacks.push(void 0);
                return stacks;
            }
            _getStackCount(index) {
                return this._getStacks(void 0, index).length;
            }
            _getStackIndex(datasetIndex, name, dataIndex) {
                const stacks = this._getStacks(datasetIndex, dataIndex);
                const index = void 0 !== name ? stacks.indexOf(name) : -1;
                return -1 === index ? stacks.length - 1 : index;
            }
            _getRuler() {
                const opts = this.options;
                const meta = this._cachedMeta;
                const iScale = meta.iScale;
                const pixels = [];
                let i, ilen;
                for (i = 0, ilen = meta.data.length; i < ilen; ++i) pixels.push(iScale.getPixelForValue(this.getParsed(i)[iScale.axis], i));
                const barThickness = opts.barThickness;
                const min = barThickness || computeMinSampleSize(meta);
                return {
                    min,
                    pixels,
                    start: iScale._startPixel,
                    end: iScale._endPixel,
                    stackCount: this._getStackCount(),
                    scale: iScale,
                    grouped: opts.grouped,
                    ratio: barThickness ? 1 : opts.categoryPercentage * opts.barPercentage
                };
            }
            _calculateBarValuePixels(index) {
                const {_cachedMeta: {vScale, _stacked}, options: {base: baseValue, minBarLength}} = this;
                const actualBase = baseValue || 0;
                const parsed = this.getParsed(index);
                const custom = parsed._custom;
                const floating = isFloatBar(custom);
                let value = parsed[vScale.axis];
                let start = 0;
                let length = _stacked ? this.applyStack(vScale, parsed, _stacked) : value;
                let head, size;
                if (length !== value) {
                    start = length - value;
                    length = value;
                }
                if (floating) {
                    value = custom.barStart;
                    length = custom.barEnd - custom.barStart;
                    if (0 !== value && sign(value) !== sign(custom.barEnd)) start = 0;
                    start += value;
                }
                const startValue = !isNullOrUndef(baseValue) && !floating ? baseValue : start;
                let base = vScale.getPixelForValue(startValue);
                if (this.chart.getDataVisibility(index)) head = vScale.getPixelForValue(start + length); else head = base;
                size = head - base;
                if (Math.abs(size) < minBarLength) {
                    size = barSign(size, vScale, actualBase) * minBarLength;
                    if (value === actualBase) base -= size / 2;
                    head = base + size;
                }
                if (base === vScale.getPixelForValue(actualBase)) {
                    const halfGrid = sign(size) * vScale.getLineWidthForValue(actualBase) / 2;
                    base += halfGrid;
                    size -= halfGrid;
                }
                return {
                    size,
                    base,
                    head,
                    center: head + size / 2
                };
            }
            _calculateBarIndexPixels(index, ruler) {
                const scale = ruler.scale;
                const options = this.options;
                const skipNull = options.skipNull;
                const maxBarThickness = valueOrDefault(options.maxBarThickness, 1 / 0);
                let center, size;
                if (ruler.grouped) {
                    const stackCount = skipNull ? this._getStackCount(index) : ruler.stackCount;
                    const range = "flex" === options.barThickness ? computeFlexCategoryTraits(index, ruler, options, stackCount) : computeFitCategoryTraits(index, ruler, options, stackCount);
                    const stackIndex = this._getStackIndex(this.index, this._cachedMeta.stack, skipNull ? index : void 0);
                    center = range.start + range.chunk * stackIndex + range.chunk / 2;
                    size = Math.min(maxBarThickness, range.chunk * range.ratio);
                } else {
                    center = scale.getPixelForValue(this.getParsed(index)[scale.axis], index);
                    size = Math.min(maxBarThickness, ruler.min * ruler.ratio);
                }
                return {
                    base: center - size / 2,
                    head: center + size / 2,
                    center,
                    size
                };
            }
            draw() {
                const meta = this._cachedMeta;
                const vScale = meta.vScale;
                const rects = meta.data;
                const ilen = rects.length;
                let i = 0;
                for (;i < ilen; ++i) if (null !== this.getParsed(i)[vScale.axis]) rects[i].draw(this._ctx);
            }
        }
        BarController.id = "bar";
        BarController.defaults = {
            datasetElementType: false,
            dataElementType: "bar",
            categoryPercentage: .8,
            barPercentage: .9,
            grouped: true,
            animations: {
                numbers: {
                    type: "number",
                    properties: [ "x", "y", "base", "width", "height" ]
                }
            }
        };
        BarController.overrides = {
            scales: {
                _index_: {
                    type: "category",
                    offset: true,
                    grid: {
                        offset: true
                    }
                },
                _value_: {
                    type: "linear",
                    beginAtZero: true
                }
            }
        };
        class BubbleController extends DatasetController {
            initialize() {
                this.enableOptionSharing = true;
                super.initialize();
            }
            parsePrimitiveData(meta, data, start, count) {
                const parsed = super.parsePrimitiveData(meta, data, start, count);
                for (let i = 0; i < parsed.length; i++) parsed[i]._custom = this.resolveDataElementOptions(i + start).radius;
                return parsed;
            }
            parseArrayData(meta, data, start, count) {
                const parsed = super.parseArrayData(meta, data, start, count);
                for (let i = 0; i < parsed.length; i++) {
                    const item = data[start + i];
                    parsed[i]._custom = valueOrDefault(item[2], this.resolveDataElementOptions(i + start).radius);
                }
                return parsed;
            }
            parseObjectData(meta, data, start, count) {
                const parsed = super.parseObjectData(meta, data, start, count);
                for (let i = 0; i < parsed.length; i++) {
                    const item = data[start + i];
                    parsed[i]._custom = valueOrDefault(item && item.r && +item.r, this.resolveDataElementOptions(i + start).radius);
                }
                return parsed;
            }
            getMaxOverflow() {
                const data = this._cachedMeta.data;
                let max = 0;
                for (let i = data.length - 1; i >= 0; --i) max = Math.max(max, data[i].size(this.resolveDataElementOptions(i)) / 2);
                return max > 0 && max;
            }
            getLabelAndValue(index) {
                const meta = this._cachedMeta;
                const {xScale, yScale} = meta;
                const parsed = this.getParsed(index);
                const x = xScale.getLabelForValue(parsed.x);
                const y = yScale.getLabelForValue(parsed.y);
                const r = parsed._custom;
                return {
                    label: meta.label,
                    value: "(" + x + ", " + y + (r ? ", " + r : "") + ")"
                };
            }
            update(mode) {
                const points = this._cachedMeta.data;
                this.updateElements(points, 0, points.length, mode);
            }
            updateElements(points, start, count, mode) {
                const reset = "reset" === mode;
                const {iScale, vScale} = this._cachedMeta;
                const firstOpts = this.resolveDataElementOptions(start, mode);
                const sharedOptions = this.getSharedOptions(firstOpts);
                const includeOptions = this.includeOptions(mode, sharedOptions);
                const iAxis = iScale.axis;
                const vAxis = vScale.axis;
                for (let i = start; i < start + count; i++) {
                    const point = points[i];
                    const parsed = !reset && this.getParsed(i);
                    const properties = {};
                    const iPixel = properties[iAxis] = reset ? iScale.getPixelForDecimal(.5) : iScale.getPixelForValue(parsed[iAxis]);
                    const vPixel = properties[vAxis] = reset ? vScale.getBasePixel() : vScale.getPixelForValue(parsed[vAxis]);
                    properties.skip = isNaN(iPixel) || isNaN(vPixel);
                    if (includeOptions) {
                        properties.options = this.resolveDataElementOptions(i, point.active ? "active" : mode);
                        if (reset) properties.options.radius = 0;
                    }
                    this.updateElement(point, i, properties, mode);
                }
                this.updateSharedOptions(sharedOptions, mode, firstOpts);
            }
            resolveDataElementOptions(index, mode) {
                const parsed = this.getParsed(index);
                let values = super.resolveDataElementOptions(index, mode);
                if (values.$shared) values = Object.assign({}, values, {
                    $shared: false
                });
                const radius = values.radius;
                if ("active" !== mode) values.radius = 0;
                values.radius += valueOrDefault(parsed && parsed._custom, radius);
                return values;
            }
        }
        BubbleController.id = "bubble";
        BubbleController.defaults = {
            datasetElementType: false,
            dataElementType: "point",
            animations: {
                numbers: {
                    type: "number",
                    properties: [ "x", "y", "borderWidth", "radius" ]
                }
            }
        };
        BubbleController.overrides = {
            scales: {
                x: {
                    type: "linear"
                },
                y: {
                    type: "linear"
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        title() {
                            return "";
                        }
                    }
                }
            }
        };
        function getRatioAndOffset(rotation, circumference, cutout) {
            let ratioX = 1;
            let ratioY = 1;
            let offsetX = 0;
            let offsetY = 0;
            if (circumference < TAU) {
                const startAngle = rotation;
                const endAngle = startAngle + circumference;
                const startX = Math.cos(startAngle);
                const startY = Math.sin(startAngle);
                const endX = Math.cos(endAngle);
                const endY = Math.sin(endAngle);
                const calcMax = (angle, a, b) => _angleBetween(angle, startAngle, endAngle, true) ? 1 : Math.max(a, a * cutout, b, b * cutout);
                const calcMin = (angle, a, b) => _angleBetween(angle, startAngle, endAngle, true) ? -1 : Math.min(a, a * cutout, b, b * cutout);
                const maxX = calcMax(0, startX, endX);
                const maxY = calcMax(HALF_PI, startY, endY);
                const minX = calcMin(PI, startX, endX);
                const minY = calcMin(PI + HALF_PI, startY, endY);
                ratioX = (maxX - minX) / 2;
                ratioY = (maxY - minY) / 2;
                offsetX = -(maxX + minX) / 2;
                offsetY = -(maxY + minY) / 2;
            }
            return {
                ratioX,
                ratioY,
                offsetX,
                offsetY
            };
        }
        class DoughnutController extends DatasetController {
            constructor(chart, datasetIndex) {
                super(chart, datasetIndex);
                this.enableOptionSharing = true;
                this.innerRadius = void 0;
                this.outerRadius = void 0;
                this.offsetX = void 0;
                this.offsetY = void 0;
            }
            linkScales() {}
            parse(start, count) {
                const data = this.getDataset().data;
                const meta = this._cachedMeta;
                if (false === this._parsing) meta._parsed = data; else {
                    let getter = i => +data[i];
                    if (helpers_segment_isObject(data[start])) {
                        const {key = "value"} = this._parsing;
                        getter = i => +resolveObjectKey(data[i], key);
                    }
                    let i, ilen;
                    for (i = start, ilen = start + count; i < ilen; ++i) meta._parsed[i] = getter(i);
                }
            }
            _getRotation() {
                return toRadians(this.options.rotation - 90);
            }
            _getCircumference() {
                return toRadians(this.options.circumference);
            }
            _getRotationExtents() {
                let min = TAU;
                let max = -TAU;
                for (let i = 0; i < this.chart.data.datasets.length; ++i) if (this.chart.isDatasetVisible(i)) {
                    const controller = this.chart.getDatasetMeta(i).controller;
                    const rotation = controller._getRotation();
                    const circumference = controller._getCircumference();
                    min = Math.min(min, rotation);
                    max = Math.max(max, rotation + circumference);
                }
                return {
                    rotation: min,
                    circumference: max - min
                };
            }
            update(mode) {
                const chart = this.chart;
                const {chartArea} = chart;
                const meta = this._cachedMeta;
                const arcs = meta.data;
                const spacing = this.getMaxBorderWidth() + this.getMaxOffset(arcs) + this.options.spacing;
                const maxSize = Math.max((Math.min(chartArea.width, chartArea.height) - spacing) / 2, 0);
                const cutout = Math.min(toPercentage(this.options.cutout, maxSize), 1);
                const chartWeight = this._getRingWeight(this.index);
                const {circumference, rotation} = this._getRotationExtents();
                const {ratioX, ratioY, offsetX, offsetY} = getRatioAndOffset(rotation, circumference, cutout);
                const maxWidth = (chartArea.width - spacing) / ratioX;
                const maxHeight = (chartArea.height - spacing) / ratioY;
                const maxRadius = Math.max(Math.min(maxWidth, maxHeight) / 2, 0);
                const outerRadius = toDimension(this.options.radius, maxRadius);
                const innerRadius = Math.max(outerRadius * cutout, 0);
                const radiusLength = (outerRadius - innerRadius) / this._getVisibleDatasetWeightTotal();
                this.offsetX = offsetX * outerRadius;
                this.offsetY = offsetY * outerRadius;
                meta.total = this.calculateTotal();
                this.outerRadius = outerRadius - radiusLength * this._getRingWeightOffset(this.index);
                this.innerRadius = Math.max(this.outerRadius - radiusLength * chartWeight, 0);
                this.updateElements(arcs, 0, arcs.length, mode);
            }
            _circumference(i, reset) {
                const opts = this.options;
                const meta = this._cachedMeta;
                const circumference = this._getCircumference();
                if (reset && opts.animation.animateRotate || !this.chart.getDataVisibility(i) || null === meta._parsed[i] || meta.data[i].hidden) return 0;
                return this.calculateCircumference(meta._parsed[i] * circumference / TAU);
            }
            updateElements(arcs, start, count, mode) {
                const reset = "reset" === mode;
                const chart = this.chart;
                const chartArea = chart.chartArea;
                const opts = chart.options;
                const animationOpts = opts.animation;
                const centerX = (chartArea.left + chartArea.right) / 2;
                const centerY = (chartArea.top + chartArea.bottom) / 2;
                const animateScale = reset && animationOpts.animateScale;
                const innerRadius = animateScale ? 0 : this.innerRadius;
                const outerRadius = animateScale ? 0 : this.outerRadius;
                const firstOpts = this.resolveDataElementOptions(start, mode);
                const sharedOptions = this.getSharedOptions(firstOpts);
                const includeOptions = this.includeOptions(mode, sharedOptions);
                let startAngle = this._getRotation();
                let i;
                for (i = 0; i < start; ++i) startAngle += this._circumference(i, reset);
                for (i = start; i < start + count; ++i) {
                    const circumference = this._circumference(i, reset);
                    const arc = arcs[i];
                    const properties = {
                        x: centerX + this.offsetX,
                        y: centerY + this.offsetY,
                        startAngle,
                        endAngle: startAngle + circumference,
                        circumference,
                        outerRadius,
                        innerRadius
                    };
                    if (includeOptions) properties.options = sharedOptions || this.resolveDataElementOptions(i, arc.active ? "active" : mode);
                    startAngle += circumference;
                    this.updateElement(arc, i, properties, mode);
                }
                this.updateSharedOptions(sharedOptions, mode, firstOpts);
            }
            calculateTotal() {
                const meta = this._cachedMeta;
                const metaData = meta.data;
                let total = 0;
                let i;
                for (i = 0; i < metaData.length; i++) {
                    const value = meta._parsed[i];
                    if (null !== value && !isNaN(value) && this.chart.getDataVisibility(i) && !metaData[i].hidden) total += Math.abs(value);
                }
                return total;
            }
            calculateCircumference(value) {
                const total = this._cachedMeta.total;
                if (total > 0 && !isNaN(value)) return TAU * (Math.abs(value) / total);
                return 0;
            }
            getLabelAndValue(index) {
                const meta = this._cachedMeta;
                const chart = this.chart;
                const labels = chart.data.labels || [];
                const value = formatNumber(meta._parsed[index], chart.options.locale);
                return {
                    label: labels[index] || "",
                    value
                };
            }
            getMaxBorderWidth(arcs) {
                let max = 0;
                const chart = this.chart;
                let i, ilen, meta, controller, options;
                if (!arcs) for (i = 0, ilen = chart.data.datasets.length; i < ilen; ++i) if (chart.isDatasetVisible(i)) {
                    meta = chart.getDatasetMeta(i);
                    arcs = meta.data;
                    controller = meta.controller;
                    break;
                }
                if (!arcs) return 0;
                for (i = 0, ilen = arcs.length; i < ilen; ++i) {
                    options = controller.resolveDataElementOptions(i);
                    if ("inner" !== options.borderAlign) max = Math.max(max, options.borderWidth || 0, options.hoverBorderWidth || 0);
                }
                return max;
            }
            getMaxOffset(arcs) {
                let max = 0;
                for (let i = 0, ilen = arcs.length; i < ilen; ++i) {
                    const options = this.resolveDataElementOptions(i);
                    max = Math.max(max, options.offset || 0, options.hoverOffset || 0);
                }
                return max;
            }
            _getRingWeightOffset(datasetIndex) {
                let ringWeightOffset = 0;
                for (let i = 0; i < datasetIndex; ++i) if (this.chart.isDatasetVisible(i)) ringWeightOffset += this._getRingWeight(i);
                return ringWeightOffset;
            }
            _getRingWeight(datasetIndex) {
                return Math.max(valueOrDefault(this.chart.data.datasets[datasetIndex].weight, 1), 0);
            }
            _getVisibleDatasetWeightTotal() {
                return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
            }
        }
        DoughnutController.id = "doughnut";
        DoughnutController.defaults = {
            datasetElementType: false,
            dataElementType: "arc",
            animation: {
                animateRotate: true,
                animateScale: false
            },
            animations: {
                numbers: {
                    type: "number",
                    properties: [ "circumference", "endAngle", "innerRadius", "outerRadius", "startAngle", "x", "y", "offset", "borderWidth", "spacing" ]
                }
            },
            cutout: "50%",
            rotation: 0,
            circumference: 360,
            radius: "100%",
            spacing: 0,
            indexAxis: "r"
        };
        DoughnutController.descriptors = {
            _scriptable: name => "spacing" !== name,
            _indexable: name => "spacing" !== name
        };
        DoughnutController.overrides = {
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {
                        generateLabels(chart) {
                            const data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                const {labels: {pointStyle}} = chart.legend.options;
                                return data.labels.map(((label, i) => {
                                    const meta = chart.getDatasetMeta(0);
                                    const style = meta.controller.getStyle(i);
                                    return {
                                        text: label,
                                        fillStyle: style.backgroundColor,
                                        strokeStyle: style.borderColor,
                                        lineWidth: style.borderWidth,
                                        pointStyle,
                                        hidden: !chart.getDataVisibility(i),
                                        index: i
                                    };
                                }));
                            }
                            return [];
                        }
                    },
                    onClick(e, legendItem, legend) {
                        legend.chart.toggleDataVisibility(legendItem.index);
                        legend.chart.update();
                    }
                },
                tooltip: {
                    callbacks: {
                        title() {
                            return "";
                        },
                        label(tooltipItem) {
                            let dataLabel = tooltipItem.label;
                            const value = ": " + tooltipItem.formattedValue;
                            if (isArray(dataLabel)) {
                                dataLabel = dataLabel.slice();
                                dataLabel[0] += value;
                            } else dataLabel += value;
                            return dataLabel;
                        }
                    }
                }
            }
        };
        class LineController extends DatasetController {
            initialize() {
                this.enableOptionSharing = true;
                super.initialize();
            }
            update(mode) {
                const meta = this._cachedMeta;
                const {dataset: line, data: points = [], _dataset} = meta;
                const animationsDisabled = this.chart._animationsDisabled;
                let {start, count} = getStartAndCountOfVisiblePoints(meta, points, animationsDisabled);
                this._drawStart = start;
                this._drawCount = count;
                if (scaleRangesChanged(meta)) {
                    start = 0;
                    count = points.length;
                }
                line._chart = this.chart;
                line._datasetIndex = this.index;
                line._decimated = !!_dataset._decimated;
                line.points = points;
                const options = this.resolveDatasetElementOptions(mode);
                if (!this.options.showLine) options.borderWidth = 0;
                options.segment = this.options.segment;
                this.updateElement(line, void 0, {
                    animated: !animationsDisabled,
                    options
                }, mode);
                this.updateElements(points, start, count, mode);
            }
            updateElements(points, start, count, mode) {
                const reset = "reset" === mode;
                const {iScale, vScale, _stacked, _dataset} = this._cachedMeta;
                const firstOpts = this.resolveDataElementOptions(start, mode);
                const sharedOptions = this.getSharedOptions(firstOpts);
                const includeOptions = this.includeOptions(mode, sharedOptions);
                const iAxis = iScale.axis;
                const vAxis = vScale.axis;
                const {spanGaps, segment} = this.options;
                const maxGapLength = isNumber(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
                const directUpdate = this.chart._animationsDisabled || reset || "none" === mode;
                let prevParsed = start > 0 && this.getParsed(start - 1);
                for (let i = start; i < start + count; ++i) {
                    const point = points[i];
                    const parsed = this.getParsed(i);
                    const properties = directUpdate ? point : {};
                    const nullData = isNullOrUndef(parsed[vAxis]);
                    const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i);
                    const vPixel = properties[vAxis] = reset || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? this.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i);
                    properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
                    properties.stop = i > 0 && parsed[iAxis] - prevParsed[iAxis] > maxGapLength;
                    if (segment) {
                        properties.parsed = parsed;
                        properties.raw = _dataset.data[i];
                    }
                    if (includeOptions) properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? "active" : mode);
                    if (!directUpdate) this.updateElement(point, i, properties, mode);
                    prevParsed = parsed;
                }
                this.updateSharedOptions(sharedOptions, mode, firstOpts);
            }
            getMaxOverflow() {
                const meta = this._cachedMeta;
                const dataset = meta.dataset;
                const border = dataset.options && dataset.options.borderWidth || 0;
                const data = meta.data || [];
                if (!data.length) return border;
                const firstPoint = data[0].size(this.resolveDataElementOptions(0));
                const lastPoint = data[data.length - 1].size(this.resolveDataElementOptions(data.length - 1));
                return Math.max(border, firstPoint, lastPoint) / 2;
            }
            draw() {
                const meta = this._cachedMeta;
                meta.dataset.updateControlPoints(this.chart.chartArea, meta.iScale.axis);
                super.draw();
            }
        }
        LineController.id = "line";
        LineController.defaults = {
            datasetElementType: "line",
            dataElementType: "point",
            showLine: true,
            spanGaps: false
        };
        LineController.overrides = {
            scales: {
                _index_: {
                    type: "category"
                },
                _value_: {
                    type: "linear"
                }
            }
        };
        function getStartAndCountOfVisiblePoints(meta, points, animationsDisabled) {
            const pointCount = points.length;
            let start = 0;
            let count = pointCount;
            if (meta._sorted) {
                const {iScale, _parsed} = meta;
                const axis = iScale.axis;
                const {min, max, minDefined, maxDefined} = iScale.getUserBounds();
                if (minDefined) start = _limitValue(Math.min(_lookupByKey(_parsed, iScale.axis, min).lo, animationsDisabled ? pointCount : _lookupByKey(points, axis, iScale.getPixelForValue(min)).lo), 0, pointCount - 1);
                if (maxDefined) count = _limitValue(Math.max(_lookupByKey(_parsed, iScale.axis, max).hi + 1, animationsDisabled ? 0 : _lookupByKey(points, axis, iScale.getPixelForValue(max)).hi + 1), start, pointCount) - start; else count = pointCount - start;
            }
            return {
                start,
                count
            };
        }
        function scaleRangesChanged(meta) {
            const {xScale, yScale, _scaleRanges} = meta;
            const newRanges = {
                xmin: xScale.min,
                xmax: xScale.max,
                ymin: yScale.min,
                ymax: yScale.max
            };
            if (!_scaleRanges) {
                meta._scaleRanges = newRanges;
                return true;
            }
            const changed = _scaleRanges.xmin !== xScale.min || _scaleRanges.xmax !== xScale.max || _scaleRanges.ymin !== yScale.min || _scaleRanges.ymax !== yScale.max;
            Object.assign(_scaleRanges, newRanges);
            return changed;
        }
        class PolarAreaController extends DatasetController {
            constructor(chart, datasetIndex) {
                super(chart, datasetIndex);
                this.innerRadius = void 0;
                this.outerRadius = void 0;
            }
            getLabelAndValue(index) {
                const meta = this._cachedMeta;
                const chart = this.chart;
                const labels = chart.data.labels || [];
                const value = formatNumber(meta._parsed[index].r, chart.options.locale);
                return {
                    label: labels[index] || "",
                    value
                };
            }
            update(mode) {
                const arcs = this._cachedMeta.data;
                this._updateRadius();
                this.updateElements(arcs, 0, arcs.length, mode);
            }
            _updateRadius() {
                const chart = this.chart;
                const chartArea = chart.chartArea;
                const opts = chart.options;
                const minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
                const outerRadius = Math.max(minSize / 2, 0);
                const innerRadius = Math.max(opts.cutoutPercentage ? outerRadius / 100 * opts.cutoutPercentage : 1, 0);
                const radiusLength = (outerRadius - innerRadius) / chart.getVisibleDatasetCount();
                this.outerRadius = outerRadius - radiusLength * this.index;
                this.innerRadius = this.outerRadius - radiusLength;
            }
            updateElements(arcs, start, count, mode) {
                const reset = "reset" === mode;
                const chart = this.chart;
                const dataset = this.getDataset();
                const opts = chart.options;
                const animationOpts = opts.animation;
                const scale = this._cachedMeta.rScale;
                const centerX = scale.xCenter;
                const centerY = scale.yCenter;
                const datasetStartAngle = scale.getIndexAngle(0) - .5 * PI;
                let angle = datasetStartAngle;
                let i;
                const defaultAngle = 360 / this.countVisibleElements();
                for (i = 0; i < start; ++i) angle += this._computeAngle(i, mode, defaultAngle);
                for (i = start; i < start + count; i++) {
                    const arc = arcs[i];
                    let startAngle = angle;
                    let endAngle = angle + this._computeAngle(i, mode, defaultAngle);
                    let outerRadius = chart.getDataVisibility(i) ? scale.getDistanceFromCenterForValue(dataset.data[i]) : 0;
                    angle = endAngle;
                    if (reset) {
                        if (animationOpts.animateScale) outerRadius = 0;
                        if (animationOpts.animateRotate) startAngle = endAngle = datasetStartAngle;
                    }
                    const properties = {
                        x: centerX,
                        y: centerY,
                        innerRadius: 0,
                        outerRadius,
                        startAngle,
                        endAngle,
                        options: this.resolveDataElementOptions(i, arc.active ? "active" : mode)
                    };
                    this.updateElement(arc, i, properties, mode);
                }
            }
            countVisibleElements() {
                const dataset = this.getDataset();
                const meta = this._cachedMeta;
                let count = 0;
                meta.data.forEach(((element, index) => {
                    if (!isNaN(dataset.data[index]) && this.chart.getDataVisibility(index)) count++;
                }));
                return count;
            }
            _computeAngle(index, mode, defaultAngle) {
                return this.chart.getDataVisibility(index) ? toRadians(this.resolveDataElementOptions(index, mode).angle || defaultAngle) : 0;
            }
        }
        PolarAreaController.id = "polarArea";
        PolarAreaController.defaults = {
            dataElementType: "arc",
            animation: {
                animateRotate: true,
                animateScale: true
            },
            animations: {
                numbers: {
                    type: "number",
                    properties: [ "x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius" ]
                }
            },
            indexAxis: "r",
            startAngle: 0
        };
        PolarAreaController.overrides = {
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {
                        generateLabels(chart) {
                            const data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                const {labels: {pointStyle}} = chart.legend.options;
                                return data.labels.map(((label, i) => {
                                    const meta = chart.getDatasetMeta(0);
                                    const style = meta.controller.getStyle(i);
                                    return {
                                        text: label,
                                        fillStyle: style.backgroundColor,
                                        strokeStyle: style.borderColor,
                                        lineWidth: style.borderWidth,
                                        pointStyle,
                                        hidden: !chart.getDataVisibility(i),
                                        index: i
                                    };
                                }));
                            }
                            return [];
                        }
                    },
                    onClick(e, legendItem, legend) {
                        legend.chart.toggleDataVisibility(legendItem.index);
                        legend.chart.update();
                    }
                },
                tooltip: {
                    callbacks: {
                        title() {
                            return "";
                        },
                        label(context) {
                            return context.chart.data.labels[context.dataIndex] + ": " + context.formattedValue;
                        }
                    }
                }
            },
            scales: {
                r: {
                    type: "radialLinear",
                    angleLines: {
                        display: false
                    },
                    beginAtZero: true,
                    grid: {
                        circular: true
                    },
                    pointLabels: {
                        display: false
                    },
                    startAngle: 0
                }
            }
        };
        class PieController extends DoughnutController {}
        PieController.id = "pie";
        PieController.defaults = {
            cutout: 0,
            rotation: 0,
            circumference: 360,
            radius: "100%"
        };
        class RadarController extends DatasetController {
            getLabelAndValue(index) {
                const vScale = this._cachedMeta.vScale;
                const parsed = this.getParsed(index);
                return {
                    label: vScale.getLabels()[index],
                    value: "" + vScale.getLabelForValue(parsed[vScale.axis])
                };
            }
            update(mode) {
                const meta = this._cachedMeta;
                const line = meta.dataset;
                const points = meta.data || [];
                const labels = meta.iScale.getLabels();
                line.points = points;
                if ("resize" !== mode) {
                    const options = this.resolveDatasetElementOptions(mode);
                    if (!this.options.showLine) options.borderWidth = 0;
                    const properties = {
                        _loop: true,
                        _fullLoop: labels.length === points.length,
                        options
                    };
                    this.updateElement(line, void 0, properties, mode);
                }
                this.updateElements(points, 0, points.length, mode);
            }
            updateElements(points, start, count, mode) {
                const dataset = this.getDataset();
                const scale = this._cachedMeta.rScale;
                const reset = "reset" === mode;
                for (let i = start; i < start + count; i++) {
                    const point = points[i];
                    const options = this.resolveDataElementOptions(i, point.active ? "active" : mode);
                    const pointPosition = scale.getPointPositionForValue(i, dataset.data[i]);
                    const x = reset ? scale.xCenter : pointPosition.x;
                    const y = reset ? scale.yCenter : pointPosition.y;
                    const properties = {
                        x,
                        y,
                        angle: pointPosition.angle,
                        skip: isNaN(x) || isNaN(y),
                        options
                    };
                    this.updateElement(point, i, properties, mode);
                }
            }
        }
        RadarController.id = "radar";
        RadarController.defaults = {
            datasetElementType: "line",
            dataElementType: "point",
            indexAxis: "r",
            showLine: true,
            elements: {
                line: {
                    fill: "start"
                }
            }
        };
        RadarController.overrides = {
            aspectRatio: 1,
            scales: {
                r: {
                    type: "radialLinear"
                }
            }
        };
        class ScatterController extends LineController {}
        ScatterController.id = "scatter";
        ScatterController.defaults = {
            showLine: false,
            fill: false
        };
        ScatterController.overrides = {
            interaction: {
                mode: "point"
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        title() {
                            return "";
                        },
                        label(item) {
                            return "(" + item.label + ", " + item.formattedValue + ")";
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: "linear"
                },
                y: {
                    type: "linear"
                }
            }
        };
        function chart_esm_abstract() {
            throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
        }
        class DateAdapter {
            constructor(options) {
                this.options = options || {};
            }
            formats() {
                return chart_esm_abstract();
            }
            parse(value, format) {
                return chart_esm_abstract();
            }
            format(timestamp, format) {
                return chart_esm_abstract();
            }
            add(timestamp, amount, unit) {
                return chart_esm_abstract();
            }
            diff(a, b, unit) {
                return chart_esm_abstract();
            }
            startOf(timestamp, unit, weekday) {
                return chart_esm_abstract();
            }
            endOf(timestamp, unit) {
                return chart_esm_abstract();
            }
        }
        DateAdapter.override = function(members) {
            Object.assign(DateAdapter.prototype, members);
        };
        var adapters = {
            _date: DateAdapter
        };
        function chart_esm_getRelativePosition(e, chart) {
            if ("native" in e) return {
                x: e.x,
                y: e.y
            };
            return getRelativePosition(e, chart);
        }
        function evaluateAllVisibleItems(chart, handler) {
            const metasets = chart.getSortedVisibleDatasetMetas();
            let index, data, element;
            for (let i = 0, ilen = metasets.length; i < ilen; ++i) {
                ({index, data} = metasets[i]);
                for (let j = 0, jlen = data.length; j < jlen; ++j) {
                    element = data[j];
                    if (!element.skip) handler(element, index, j);
                }
            }
        }
        function binarySearch(metaset, axis, value, intersect) {
            const {controller, data, _sorted} = metaset;
            const iScale = controller._cachedMeta.iScale;
            if (iScale && axis === iScale.axis && "r" !== axis && _sorted && data.length) {
                const lookupMethod = iScale._reversePixels ? _rlookupByKey : _lookupByKey;
                if (!intersect) return lookupMethod(data, axis, value); else if (controller._sharedOptions) {
                    const el = data[0];
                    const range = "function" === typeof el.getRange && el.getRange(axis);
                    if (range) {
                        const start = lookupMethod(data, axis, value - range);
                        const end = lookupMethod(data, axis, value + range);
                        return {
                            lo: start.lo,
                            hi: end.hi
                        };
                    }
                }
            }
            return {
                lo: 0,
                hi: data.length - 1
            };
        }
        function optimizedEvaluateItems(chart, axis, position, handler, intersect) {
            const metasets = chart.getSortedVisibleDatasetMetas();
            const value = position[axis];
            for (let i = 0, ilen = metasets.length; i < ilen; ++i) {
                const {index, data} = metasets[i];
                const {lo, hi} = binarySearch(metasets[i], axis, value, intersect);
                for (let j = lo; j <= hi; ++j) {
                    const element = data[j];
                    if (!element.skip) handler(element, index, j);
                }
            }
        }
        function getDistanceMetricForAxis(axis) {
            const useX = -1 !== axis.indexOf("x");
            const useY = -1 !== axis.indexOf("y");
            return function(pt1, pt2) {
                const deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
                const deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
                return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
            };
        }
        function getIntersectItems(chart, position, axis, useFinalPosition) {
            const items = [];
            if (!_isPointInArea(position, chart.chartArea, chart._minPadding)) return items;
            const evaluationFunc = function(element, datasetIndex, index) {
                if (element.inRange(position.x, position.y, useFinalPosition)) items.push({
                    element,
                    datasetIndex,
                    index
                });
            };
            optimizedEvaluateItems(chart, axis, position, evaluationFunc, true);
            return items;
        }
        function getNearestRadialItems(chart, position, axis, useFinalPosition) {
            let items = [];
            function evaluationFunc(element, datasetIndex, index) {
                const {startAngle, endAngle} = element.getProps([ "startAngle", "endAngle" ], useFinalPosition);
                const {angle} = getAngleFromPoint(element, {
                    x: position.x,
                    y: position.y
                });
                if (_angleBetween(angle, startAngle, endAngle)) items.push({
                    element,
                    datasetIndex,
                    index
                });
            }
            optimizedEvaluateItems(chart, axis, position, evaluationFunc);
            return items;
        }
        function getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition) {
            let items = [];
            const distanceMetric = getDistanceMetricForAxis(axis);
            let minDistance = Number.POSITIVE_INFINITY;
            function evaluationFunc(element, datasetIndex, index) {
                const inRange = element.inRange(position.x, position.y, useFinalPosition);
                if (intersect && !inRange) return;
                const center = element.getCenterPoint(useFinalPosition);
                const pointInArea = _isPointInArea(center, chart.chartArea, chart._minPadding);
                if (!pointInArea && !inRange) return;
                const distance = distanceMetric(position, center);
                if (distance < minDistance) {
                    items = [ {
                        element,
                        datasetIndex,
                        index
                    } ];
                    minDistance = distance;
                } else if (distance === minDistance) items.push({
                    element,
                    datasetIndex,
                    index
                });
            }
            optimizedEvaluateItems(chart, axis, position, evaluationFunc);
            return items;
        }
        function getNearestItems(chart, position, axis, intersect, useFinalPosition) {
            if (!_isPointInArea(position, chart.chartArea, chart._minPadding)) return [];
            return "r" === axis && !intersect ? getNearestRadialItems(chart, position, axis, useFinalPosition) : getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition);
        }
        function getAxisItems(chart, e, options, useFinalPosition) {
            const position = chart_esm_getRelativePosition(e, chart);
            const items = [];
            const axis = options.axis;
            const rangeMethod = "x" === axis ? "inXRange" : "inYRange";
            let intersectsItem = false;
            evaluateAllVisibleItems(chart, ((element, datasetIndex, index) => {
                if (element[rangeMethod](position[axis], useFinalPosition)) items.push({
                    element,
                    datasetIndex,
                    index
                });
                if (element.inRange(position.x, position.y, useFinalPosition)) intersectsItem = true;
            }));
            if (options.intersect && !intersectsItem) return [];
            return items;
        }
        var Interaction = {
            modes: {
                index(chart, e, options, useFinalPosition) {
                    const position = chart_esm_getRelativePosition(e, chart);
                    const axis = options.axis || "x";
                    const items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition) : getNearestItems(chart, position, axis, false, useFinalPosition);
                    const elements = [];
                    if (!items.length) return [];
                    chart.getSortedVisibleDatasetMetas().forEach((meta => {
                        const index = items[0].index;
                        const element = meta.data[index];
                        if (element && !element.skip) elements.push({
                            element,
                            datasetIndex: meta.index,
                            index
                        });
                    }));
                    return elements;
                },
                dataset(chart, e, options, useFinalPosition) {
                    const position = chart_esm_getRelativePosition(e, chart);
                    const axis = options.axis || "xy";
                    let items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition) : getNearestItems(chart, position, axis, false, useFinalPosition);
                    if (items.length > 0) {
                        const datasetIndex = items[0].datasetIndex;
                        const data = chart.getDatasetMeta(datasetIndex).data;
                        items = [];
                        for (let i = 0; i < data.length; ++i) items.push({
                            element: data[i],
                            datasetIndex,
                            index: i
                        });
                    }
                    return items;
                },
                point(chart, e, options, useFinalPosition) {
                    const position = chart_esm_getRelativePosition(e, chart);
                    const axis = options.axis || "xy";
                    return getIntersectItems(chart, position, axis, useFinalPosition);
                },
                nearest(chart, e, options, useFinalPosition) {
                    const position = chart_esm_getRelativePosition(e, chart);
                    const axis = options.axis || "xy";
                    return getNearestItems(chart, position, axis, options.intersect, useFinalPosition);
                },
                x(chart, e, options, useFinalPosition) {
                    return getAxisItems(chart, e, {
                        axis: "x",
                        intersect: options.intersect
                    }, useFinalPosition);
                },
                y(chart, e, options, useFinalPosition) {
                    return getAxisItems(chart, e, {
                        axis: "y",
                        intersect: options.intersect
                    }, useFinalPosition);
                }
            }
        };
        const STATIC_POSITIONS = [ "left", "top", "right", "bottom" ];
        function filterByPosition(array, position) {
            return array.filter((v => v.pos === position));
        }
        function filterDynamicPositionByAxis(array, axis) {
            return array.filter((v => -1 === STATIC_POSITIONS.indexOf(v.pos) && v.box.axis === axis));
        }
        function sortByWeight(array, reverse) {
            return array.sort(((a, b) => {
                const v0 = reverse ? b : a;
                const v1 = reverse ? a : b;
                return v0.weight === v1.weight ? v0.index - v1.index : v0.weight - v1.weight;
            }));
        }
        function wrapBoxes(boxes) {
            const layoutBoxes = [];
            let i, ilen, box, pos, stack, stackWeight;
            for (i = 0, ilen = (boxes || []).length; i < ilen; ++i) {
                box = boxes[i];
                ({position: pos, options: {stack, stackWeight = 1}} = box);
                layoutBoxes.push({
                    index: i,
                    box,
                    pos,
                    horizontal: box.isHorizontal(),
                    weight: box.weight,
                    stack: stack && pos + stack,
                    stackWeight
                });
            }
            return layoutBoxes;
        }
        function buildStacks(layouts) {
            const stacks = {};
            for (const wrap of layouts) {
                const {stack, pos, stackWeight} = wrap;
                if (!stack || !STATIC_POSITIONS.includes(pos)) continue;
                const _stack = stacks[stack] || (stacks[stack] = {
                    count: 0,
                    placed: 0,
                    weight: 0,
                    size: 0
                });
                _stack.count++;
                _stack.weight += stackWeight;
            }
            return stacks;
        }
        function setLayoutDims(layouts, params) {
            const stacks = buildStacks(layouts);
            const {vBoxMaxWidth, hBoxMaxHeight} = params;
            let i, ilen, layout;
            for (i = 0, ilen = layouts.length; i < ilen; ++i) {
                layout = layouts[i];
                const {fullSize} = layout.box;
                const stack = stacks[layout.stack];
                const factor = stack && layout.stackWeight / stack.weight;
                if (layout.horizontal) {
                    layout.width = factor ? factor * vBoxMaxWidth : fullSize && params.availableWidth;
                    layout.height = hBoxMaxHeight;
                } else {
                    layout.width = vBoxMaxWidth;
                    layout.height = factor ? factor * hBoxMaxHeight : fullSize && params.availableHeight;
                }
            }
            return stacks;
        }
        function buildLayoutBoxes(boxes) {
            const layoutBoxes = wrapBoxes(boxes);
            const fullSize = sortByWeight(layoutBoxes.filter((wrap => wrap.box.fullSize)), true);
            const left = sortByWeight(filterByPosition(layoutBoxes, "left"), true);
            const right = sortByWeight(filterByPosition(layoutBoxes, "right"));
            const top = sortByWeight(filterByPosition(layoutBoxes, "top"), true);
            const bottom = sortByWeight(filterByPosition(layoutBoxes, "bottom"));
            const centerHorizontal = filterDynamicPositionByAxis(layoutBoxes, "x");
            const centerVertical = filterDynamicPositionByAxis(layoutBoxes, "y");
            return {
                fullSize,
                leftAndTop: left.concat(top),
                rightAndBottom: right.concat(centerVertical).concat(bottom).concat(centerHorizontal),
                chartArea: filterByPosition(layoutBoxes, "chartArea"),
                vertical: left.concat(right).concat(centerVertical),
                horizontal: top.concat(bottom).concat(centerHorizontal)
            };
        }
        function getCombinedMax(maxPadding, chartArea, a, b) {
            return Math.max(maxPadding[a], chartArea[a]) + Math.max(maxPadding[b], chartArea[b]);
        }
        function updateMaxPadding(maxPadding, boxPadding) {
            maxPadding.top = Math.max(maxPadding.top, boxPadding.top);
            maxPadding.left = Math.max(maxPadding.left, boxPadding.left);
            maxPadding.bottom = Math.max(maxPadding.bottom, boxPadding.bottom);
            maxPadding.right = Math.max(maxPadding.right, boxPadding.right);
        }
        function updateDims(chartArea, params, layout, stacks) {
            const {pos, box} = layout;
            const maxPadding = chartArea.maxPadding;
            if (!helpers_segment_isObject(pos)) {
                if (layout.size) chartArea[pos] -= layout.size;
                const stack = stacks[layout.stack] || {
                    size: 0,
                    count: 1
                };
                stack.size = Math.max(stack.size, layout.horizontal ? box.height : box.width);
                layout.size = stack.size / stack.count;
                chartArea[pos] += layout.size;
            }
            if (box.getPadding) updateMaxPadding(maxPadding, box.getPadding());
            const newWidth = Math.max(0, params.outerWidth - getCombinedMax(maxPadding, chartArea, "left", "right"));
            const newHeight = Math.max(0, params.outerHeight - getCombinedMax(maxPadding, chartArea, "top", "bottom"));
            const widthChanged = newWidth !== chartArea.w;
            const heightChanged = newHeight !== chartArea.h;
            chartArea.w = newWidth;
            chartArea.h = newHeight;
            return layout.horizontal ? {
                same: widthChanged,
                other: heightChanged
            } : {
                same: heightChanged,
                other: widthChanged
            };
        }
        function handleMaxPadding(chartArea) {
            const maxPadding = chartArea.maxPadding;
            function updatePos(pos) {
                const change = Math.max(maxPadding[pos] - chartArea[pos], 0);
                chartArea[pos] += change;
                return change;
            }
            chartArea.y += updatePos("top");
            chartArea.x += updatePos("left");
            updatePos("right");
            updatePos("bottom");
        }
        function getMargins(horizontal, chartArea) {
            const maxPadding = chartArea.maxPadding;
            function marginForPositions(positions) {
                const margin = {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                };
                positions.forEach((pos => {
                    margin[pos] = Math.max(chartArea[pos], maxPadding[pos]);
                }));
                return margin;
            }
            return horizontal ? marginForPositions([ "left", "right" ]) : marginForPositions([ "top", "bottom" ]);
        }
        function fitBoxes(boxes, chartArea, params, stacks) {
            const refitBoxes = [];
            let i, ilen, layout, box, refit, changed;
            for (i = 0, ilen = boxes.length, refit = 0; i < ilen; ++i) {
                layout = boxes[i];
                box = layout.box;
                box.update(layout.width || chartArea.w, layout.height || chartArea.h, getMargins(layout.horizontal, chartArea));
                const {same, other} = updateDims(chartArea, params, layout, stacks);
                refit |= same && refitBoxes.length;
                changed = changed || other;
                if (!box.fullSize) refitBoxes.push(layout);
            }
            return refit && fitBoxes(refitBoxes, chartArea, params, stacks) || changed;
        }
        function setBoxDims(box, left, top, width, height) {
            box.top = top;
            box.left = left;
            box.right = left + width;
            box.bottom = top + height;
            box.width = width;
            box.height = height;
        }
        function placeBoxes(boxes, chartArea, params, stacks) {
            const userPadding = params.padding;
            let {x, y} = chartArea;
            for (const layout of boxes) {
                const box = layout.box;
                const stack = stacks[layout.stack] || {
                    count: 1,
                    placed: 0,
                    weight: 1
                };
                const weight = layout.stackWeight / stack.weight || 1;
                if (layout.horizontal) {
                    const width = chartArea.w * weight;
                    const height = stack.size || box.height;
                    if (defined(stack.start)) y = stack.start;
                    if (box.fullSize) setBoxDims(box, userPadding.left, y, params.outerWidth - userPadding.right - userPadding.left, height); else setBoxDims(box, chartArea.left + stack.placed, y, width, height);
                    stack.start = y;
                    stack.placed += width;
                    y = box.bottom;
                } else {
                    const height = chartArea.h * weight;
                    const width = stack.size || box.width;
                    if (defined(stack.start)) x = stack.start;
                    if (box.fullSize) setBoxDims(box, x, userPadding.top, width, params.outerHeight - userPadding.bottom - userPadding.top); else setBoxDims(box, x, chartArea.top + stack.placed, width, height);
                    stack.start = x;
                    stack.placed += height;
                    x = box.right;
                }
            }
            chartArea.x = x;
            chartArea.y = y;
        }
        helpers_segment_defaults.set("layout", {
            autoPadding: true,
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        });
        var layouts = {
            addBox(chart, item) {
                if (!chart.boxes) chart.boxes = [];
                item.fullSize = item.fullSize || false;
                item.position = item.position || "top";
                item.weight = item.weight || 0;
                item._layers = item._layers || function() {
                    return [ {
                        z: 0,
                        draw(chartArea) {
                            item.draw(chartArea);
                        }
                    } ];
                };
                chart.boxes.push(item);
            },
            removeBox(chart, layoutItem) {
                const index = chart.boxes ? chart.boxes.indexOf(layoutItem) : -1;
                if (-1 !== index) chart.boxes.splice(index, 1);
            },
            configure(chart, item, options) {
                item.fullSize = options.fullSize;
                item.position = options.position;
                item.weight = options.weight;
            },
            update(chart, width, height, minPadding) {
                if (!chart) return;
                const padding = toPadding(chart.options.layout.padding);
                const availableWidth = Math.max(width - padding.width, 0);
                const availableHeight = Math.max(height - padding.height, 0);
                const boxes = buildLayoutBoxes(chart.boxes);
                const verticalBoxes = boxes.vertical;
                const horizontalBoxes = boxes.horizontal;
                helpers_segment_each(chart.boxes, (box => {
                    if ("function" === typeof box.beforeLayout) box.beforeLayout();
                }));
                const visibleVerticalBoxCount = verticalBoxes.reduce(((total, wrap) => wrap.box.options && false === wrap.box.options.display ? total : total + 1), 0) || 1;
                const params = Object.freeze({
                    outerWidth: width,
                    outerHeight: height,
                    padding,
                    availableWidth,
                    availableHeight,
                    vBoxMaxWidth: availableWidth / 2 / visibleVerticalBoxCount,
                    hBoxMaxHeight: availableHeight / 2
                });
                const maxPadding = Object.assign({}, padding);
                updateMaxPadding(maxPadding, toPadding(minPadding));
                const chartArea = Object.assign({
                    maxPadding,
                    w: availableWidth,
                    h: availableHeight,
                    x: padding.left,
                    y: padding.top
                }, padding);
                const stacks = setLayoutDims(verticalBoxes.concat(horizontalBoxes), params);
                fitBoxes(boxes.fullSize, chartArea, params, stacks);
                fitBoxes(verticalBoxes, chartArea, params, stacks);
                if (fitBoxes(horizontalBoxes, chartArea, params, stacks)) fitBoxes(verticalBoxes, chartArea, params, stacks);
                handleMaxPadding(chartArea);
                placeBoxes(boxes.leftAndTop, chartArea, params, stacks);
                chartArea.x += chartArea.w;
                chartArea.y += chartArea.h;
                placeBoxes(boxes.rightAndBottom, chartArea, params, stacks);
                chart.chartArea = {
                    left: chartArea.left,
                    top: chartArea.top,
                    right: chartArea.left + chartArea.w,
                    bottom: chartArea.top + chartArea.h,
                    height: chartArea.h,
                    width: chartArea.w
                };
                helpers_segment_each(boxes.chartArea, (layout => {
                    const box = layout.box;
                    Object.assign(box, chart.chartArea);
                    box.update(chartArea.w, chartArea.h, {
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0
                    });
                }));
            }
        };
        class BasePlatform {
            acquireContext(canvas, aspectRatio) {}
            releaseContext(context) {
                return false;
            }
            addEventListener(chart, type, listener) {}
            removeEventListener(chart, type, listener) {}
            getDevicePixelRatio() {
                return 1;
            }
            getMaximumSize(element, width, height, aspectRatio) {
                width = Math.max(0, width || element.width);
                height = height || element.height;
                return {
                    width,
                    height: Math.max(0, aspectRatio ? Math.floor(width / aspectRatio) : height)
                };
            }
            isAttached(canvas) {
                return true;
            }
            updateConfig(config) {}
        }
        class BasicPlatform extends BasePlatform {
            acquireContext(item) {
                return item && item.getContext && item.getContext("2d") || null;
            }
            updateConfig(config) {
                config.options.animation = false;
            }
        }
        const EXPANDO_KEY = "$chartjs";
        const EVENT_TYPES = {
            touchstart: "mousedown",
            touchmove: "mousemove",
            touchend: "mouseup",
            pointerenter: "mouseenter",
            pointerdown: "mousedown",
            pointermove: "mousemove",
            pointerup: "mouseup",
            pointerleave: "mouseout",
            pointerout: "mouseout"
        };
        const isNullOrEmpty = value => null === value || "" === value;
        function initCanvas(canvas, aspectRatio) {
            const style = canvas.style;
            const renderHeight = canvas.getAttribute("height");
            const renderWidth = canvas.getAttribute("width");
            canvas[EXPANDO_KEY] = {
                initial: {
                    height: renderHeight,
                    width: renderWidth,
                    style: {
                        display: style.display,
                        height: style.height,
                        width: style.width
                    }
                }
            };
            style.display = style.display || "block";
            style.boxSizing = style.boxSizing || "border-box";
            if (isNullOrEmpty(renderWidth)) {
                const displayWidth = readUsedSize(canvas, "width");
                if (void 0 !== displayWidth) canvas.width = displayWidth;
            }
            if (isNullOrEmpty(renderHeight)) if ("" === canvas.style.height) canvas.height = canvas.width / (aspectRatio || 2); else {
                const displayHeight = readUsedSize(canvas, "height");
                if (void 0 !== displayHeight) canvas.height = displayHeight;
            }
            return canvas;
        }
        const eventListenerOptions = supportsEventListenerOptions ? {
            passive: true
        } : false;
        function addListener(node, type, listener) {
            node.addEventListener(type, listener, eventListenerOptions);
        }
        function removeListener(chart, type, listener) {
            chart.canvas.removeEventListener(type, listener, eventListenerOptions);
        }
        function fromNativeEvent(event, chart) {
            const type = EVENT_TYPES[event.type] || event.type;
            const {x, y} = getRelativePosition(event, chart);
            return {
                type,
                chart,
                native: event,
                x: void 0 !== x ? x : null,
                y: void 0 !== y ? y : null
            };
        }
        function nodeListContains(nodeList, canvas) {
            for (const node of nodeList) if (node === canvas || node.contains(canvas)) return true;
        }
        function createAttachObserver(chart, type, listener) {
            const canvas = chart.canvas;
            const observer = new MutationObserver((entries => {
                let trigger = false;
                for (const entry of entries) {
                    trigger = trigger || nodeListContains(entry.addedNodes, canvas);
                    trigger = trigger && !nodeListContains(entry.removedNodes, canvas);
                }
                if (trigger) listener();
            }));
            observer.observe(document, {
                childList: true,
                subtree: true
            });
            return observer;
        }
        function createDetachObserver(chart, type, listener) {
            const canvas = chart.canvas;
            const observer = new MutationObserver((entries => {
                let trigger = false;
                for (const entry of entries) {
                    trigger = trigger || nodeListContains(entry.removedNodes, canvas);
                    trigger = trigger && !nodeListContains(entry.addedNodes, canvas);
                }
                if (trigger) listener();
            }));
            observer.observe(document, {
                childList: true,
                subtree: true
            });
            return observer;
        }
        const drpListeningCharts = new Map;
        let oldDevicePixelRatio = 0;
        function onWindowResize() {
            const dpr = window.devicePixelRatio;
            if (dpr === oldDevicePixelRatio) return;
            oldDevicePixelRatio = dpr;
            drpListeningCharts.forEach(((resize, chart) => {
                if (chart.currentDevicePixelRatio !== dpr) resize();
            }));
        }
        function listenDevicePixelRatioChanges(chart, resize) {
            if (!drpListeningCharts.size) window.addEventListener("resize", onWindowResize);
            drpListeningCharts.set(chart, resize);
        }
        function unlistenDevicePixelRatioChanges(chart) {
            drpListeningCharts.delete(chart);
            if (!drpListeningCharts.size) window.removeEventListener("resize", onWindowResize);
        }
        function createResizeObserver(chart, type, listener) {
            const canvas = chart.canvas;
            const container = canvas && _getParentNode(canvas);
            if (!container) return;
            const resize = throttled(((width, height) => {
                const w = container.clientWidth;
                listener(width, height);
                if (w < container.clientWidth) listener();
            }), window);
            const observer = new ResizeObserver((entries => {
                const entry = entries[0];
                const width = entry.contentRect.width;
                const height = entry.contentRect.height;
                if (0 === width && 0 === height) return;
                resize(width, height);
            }));
            observer.observe(container);
            listenDevicePixelRatioChanges(chart, resize);
            return observer;
        }
        function releaseObserver(chart, type, observer) {
            if (observer) observer.disconnect();
            if ("resize" === type) unlistenDevicePixelRatioChanges(chart);
        }
        function createProxyAndListen(chart, type, listener) {
            const canvas = chart.canvas;
            const proxy = throttled((event => {
                if (null !== chart.ctx) listener(fromNativeEvent(event, chart));
            }), chart, (args => {
                const event = args[0];
                return [ event, event.offsetX, event.offsetY ];
            }));
            addListener(canvas, type, proxy);
            return proxy;
        }
        class DomPlatform extends BasePlatform {
            acquireContext(canvas, aspectRatio) {
                const context = canvas && canvas.getContext && canvas.getContext("2d");
                if (context && context.canvas === canvas) {
                    initCanvas(canvas, aspectRatio);
                    return context;
                }
                return null;
            }
            releaseContext(context) {
                const canvas = context.canvas;
                if (!canvas[EXPANDO_KEY]) return false;
                const initial = canvas[EXPANDO_KEY].initial;
                [ "height", "width" ].forEach((prop => {
                    const value = initial[prop];
                    if (isNullOrUndef(value)) canvas.removeAttribute(prop); else canvas.setAttribute(prop, value);
                }));
                const style = initial.style || {};
                Object.keys(style).forEach((key => {
                    canvas.style[key] = style[key];
                }));
                canvas.width = canvas.width;
                delete canvas[EXPANDO_KEY];
                return true;
            }
            addEventListener(chart, type, listener) {
                this.removeEventListener(chart, type);
                const proxies = chart.$proxies || (chart.$proxies = {});
                const handlers = {
                    attach: createAttachObserver,
                    detach: createDetachObserver,
                    resize: createResizeObserver
                };
                const handler = handlers[type] || createProxyAndListen;
                proxies[type] = handler(chart, type, listener);
            }
            removeEventListener(chart, type) {
                const proxies = chart.$proxies || (chart.$proxies = {});
                const proxy = proxies[type];
                if (!proxy) return;
                const handlers = {
                    attach: releaseObserver,
                    detach: releaseObserver,
                    resize: releaseObserver
                };
                const handler = handlers[type] || removeListener;
                handler(chart, type, proxy);
                proxies[type] = void 0;
            }
            getDevicePixelRatio() {
                return window.devicePixelRatio;
            }
            getMaximumSize(canvas, width, height, aspectRatio) {
                return getMaximumSize(canvas, width, height, aspectRatio);
            }
            isAttached(canvas) {
                const container = _getParentNode(canvas);
                return !!(container && container.isConnected);
            }
        }
        function _detectPlatform(canvas) {
            if (!_isDomSupported() || "undefined" !== typeof OffscreenCanvas && canvas instanceof OffscreenCanvas) return BasicPlatform;
            return DomPlatform;
        }
        class Element {
            constructor() {
                this.x = void 0;
                this.y = void 0;
                this.active = false;
                this.options = void 0;
                this.$animations = void 0;
            }
            tooltipPosition(useFinalPosition) {
                const {x, y} = this.getProps([ "x", "y" ], useFinalPosition);
                return {
                    x,
                    y
                };
            }
            hasValue() {
                return isNumber(this.x) && isNumber(this.y);
            }
            getProps(props, final) {
                const anims = this.$animations;
                if (!final || !anims) return this;
                const ret = {};
                props.forEach((prop => {
                    ret[prop] = anims[prop] && anims[prop].active() ? anims[prop]._to : this[prop];
                }));
                return ret;
            }
        }
        Element.defaults = {};
        Element.defaultRoutes = void 0;
        const formatters = {
            values(value) {
                return isArray(value) ? value : "" + value;
            },
            numeric(tickValue, index, ticks) {
                if (0 === tickValue) return "0";
                const locale = this.chart.options.locale;
                let notation;
                let delta = tickValue;
                if (ticks.length > 1) {
                    const maxTick = Math.max(Math.abs(ticks[0].value), Math.abs(ticks[ticks.length - 1].value));
                    if (maxTick < 1e-4 || maxTick > 1e15) notation = "scientific";
                    delta = calculateDelta(tickValue, ticks);
                }
                const logDelta = log10(Math.abs(delta));
                const numDecimal = Math.max(Math.min(-1 * Math.floor(logDelta), 20), 0);
                const options = {
                    notation,
                    minimumFractionDigits: numDecimal,
                    maximumFractionDigits: numDecimal
                };
                Object.assign(options, this.options.ticks.format);
                return formatNumber(tickValue, locale, options);
            },
            logarithmic(tickValue, index, ticks) {
                if (0 === tickValue) return "0";
                const remain = tickValue / Math.pow(10, Math.floor(log10(tickValue)));
                if (1 === remain || 2 === remain || 5 === remain) return formatters.numeric.call(this, tickValue, index, ticks);
                return "";
            }
        };
        function calculateDelta(tickValue, ticks) {
            let delta = ticks.length > 3 ? ticks[2].value - ticks[1].value : ticks[1].value - ticks[0].value;
            if (Math.abs(delta) >= 1 && tickValue !== Math.floor(tickValue)) delta = tickValue - Math.floor(tickValue);
            return delta;
        }
        var Ticks = {
            formatters
        };
        helpers_segment_defaults.set("scale", {
            display: true,
            offset: false,
            reverse: false,
            beginAtZero: false,
            bounds: "ticks",
            grace: 0,
            grid: {
                display: true,
                lineWidth: 1,
                drawBorder: true,
                drawOnChartArea: true,
                drawTicks: true,
                tickLength: 8,
                tickWidth: (_ctx, options) => options.lineWidth,
                tickColor: (_ctx, options) => options.color,
                offset: false,
                borderDash: [],
                borderDashOffset: 0,
                borderWidth: 1
            },
            title: {
                display: false,
                text: "",
                padding: {
                    top: 4,
                    bottom: 4
                }
            },
            ticks: {
                minRotation: 0,
                maxRotation: 50,
                mirror: false,
                textStrokeWidth: 0,
                textStrokeColor: "",
                padding: 3,
                display: true,
                autoSkip: true,
                autoSkipPadding: 3,
                labelOffset: 0,
                callback: Ticks.formatters.values,
                minor: {},
                major: {},
                align: "center",
                crossAlign: "near",
                showLabelBackdrop: false,
                backdropColor: "rgba(255, 255, 255, 0.75)",
                backdropPadding: 2
            }
        });
        helpers_segment_defaults.route("scale.ticks", "color", "", "color");
        helpers_segment_defaults.route("scale.grid", "color", "", "borderColor");
        helpers_segment_defaults.route("scale.grid", "borderColor", "", "borderColor");
        helpers_segment_defaults.route("scale.title", "color", "", "color");
        helpers_segment_defaults.describe("scale", {
            _fallback: false,
            _scriptable: name => !name.startsWith("before") && !name.startsWith("after") && "callback" !== name && "parser" !== name,
            _indexable: name => "borderDash" !== name && "tickBorderDash" !== name
        });
        helpers_segment_defaults.describe("scales", {
            _fallback: "scale"
        });
        helpers_segment_defaults.describe("scale.ticks", {
            _scriptable: name => "backdropPadding" !== name && "callback" !== name,
            _indexable: name => "backdropPadding" !== name
        });
        function autoSkip(scale, ticks) {
            const tickOpts = scale.options.ticks;
            const ticksLimit = tickOpts.maxTicksLimit || determineMaxTicks(scale);
            const majorIndices = tickOpts.major.enabled ? getMajorIndices(ticks) : [];
            const numMajorIndices = majorIndices.length;
            const first = majorIndices[0];
            const last = majorIndices[numMajorIndices - 1];
            const newTicks = [];
            if (numMajorIndices > ticksLimit) {
                skipMajors(ticks, newTicks, majorIndices, numMajorIndices / ticksLimit);
                return newTicks;
            }
            const spacing = calculateSpacing(majorIndices, ticks, ticksLimit);
            if (numMajorIndices > 0) {
                let i, ilen;
                const avgMajorSpacing = numMajorIndices > 1 ? Math.round((last - first) / (numMajorIndices - 1)) : null;
                skip(ticks, newTicks, spacing, isNullOrUndef(avgMajorSpacing) ? 0 : first - avgMajorSpacing, first);
                for (i = 0, ilen = numMajorIndices - 1; i < ilen; i++) skip(ticks, newTicks, spacing, majorIndices[i], majorIndices[i + 1]);
                skip(ticks, newTicks, spacing, last, isNullOrUndef(avgMajorSpacing) ? ticks.length : last + avgMajorSpacing);
                return newTicks;
            }
            skip(ticks, newTicks, spacing);
            return newTicks;
        }
        function determineMaxTicks(scale) {
            const offset = scale.options.offset;
            const tickLength = scale._tickSize();
            const maxScale = scale._length / tickLength + (offset ? 0 : 1);
            const maxChart = scale._maxLength / tickLength;
            return Math.floor(Math.min(maxScale, maxChart));
        }
        function calculateSpacing(majorIndices, ticks, ticksLimit) {
            const evenMajorSpacing = getEvenSpacing(majorIndices);
            const spacing = ticks.length / ticksLimit;
            if (!evenMajorSpacing) return Math.max(spacing, 1);
            const factors = _factorize(evenMajorSpacing);
            for (let i = 0, ilen = factors.length - 1; i < ilen; i++) {
                const factor = factors[i];
                if (factor > spacing) return factor;
            }
            return Math.max(spacing, 1);
        }
        function getMajorIndices(ticks) {
            const result = [];
            let i, ilen;
            for (i = 0, ilen = ticks.length; i < ilen; i++) if (ticks[i].major) result.push(i);
            return result;
        }
        function skipMajors(ticks, newTicks, majorIndices, spacing) {
            let count = 0;
            let next = majorIndices[0];
            let i;
            spacing = Math.ceil(spacing);
            for (i = 0; i < ticks.length; i++) if (i === next) {
                newTicks.push(ticks[i]);
                count++;
                next = majorIndices[count * spacing];
            }
        }
        function skip(ticks, newTicks, spacing, majorStart, majorEnd) {
            const start = valueOrDefault(majorStart, 0);
            const end = Math.min(valueOrDefault(majorEnd, ticks.length), ticks.length);
            let count = 0;
            let length, i, next;
            spacing = Math.ceil(spacing);
            if (majorEnd) {
                length = majorEnd - majorStart;
                spacing = length / Math.floor(length / spacing);
            }
            next = start;
            while (next < 0) {
                count++;
                next = Math.round(start + count * spacing);
            }
            for (i = Math.max(start, 0); i < end; i++) if (i === next) {
                newTicks.push(ticks[i]);
                count++;
                next = Math.round(start + count * spacing);
            }
        }
        function getEvenSpacing(arr) {
            const len = arr.length;
            let i, diff;
            if (len < 2) return false;
            for (diff = arr[0], i = 1; i < len; ++i) if (arr[i] - arr[i - 1] !== diff) return false;
            return diff;
        }
        const reverseAlign = align => "left" === align ? "right" : "right" === align ? "left" : align;
        const offsetFromEdge = (scale, edge, offset) => "top" === edge || "left" === edge ? scale[edge] + offset : scale[edge] - offset;
        function sample(arr, numItems) {
            const result = [];
            const increment = arr.length / numItems;
            const len = arr.length;
            let i = 0;
            for (;i < len; i += increment) result.push(arr[Math.floor(i)]);
            return result;
        }
        function getPixelForGridLine(scale, index, offsetGridLines) {
            const length = scale.ticks.length;
            const validIndex = Math.min(index, length - 1);
            const start = scale._startPixel;
            const end = scale._endPixel;
            const epsilon = 1e-6;
            let lineValue = scale.getPixelForTick(validIndex);
            let offset;
            if (offsetGridLines) {
                if (1 === length) offset = Math.max(lineValue - start, end - lineValue); else if (0 === index) offset = (scale.getPixelForTick(1) - lineValue) / 2; else offset = (lineValue - scale.getPixelForTick(validIndex - 1)) / 2;
                lineValue += validIndex < index ? offset : -offset;
                if (lineValue < start - epsilon || lineValue > end + epsilon) return;
            }
            return lineValue;
        }
        function garbageCollect(caches, length) {
            helpers_segment_each(caches, (cache => {
                const gc = cache.gc;
                const gcLen = gc.length / 2;
                let i;
                if (gcLen > length) {
                    for (i = 0; i < gcLen; ++i) delete cache.data[gc[i]];
                    gc.splice(0, gcLen);
                }
            }));
        }
        function getTickMarkLength(options) {
            return options.drawTicks ? options.tickLength : 0;
        }
        function getTitleHeight(options, fallback) {
            if (!options.display) return 0;
            const font = toFont(options.font, fallback);
            const padding = toPadding(options.padding);
            const lines = isArray(options.text) ? options.text.length : 1;
            return lines * font.lineHeight + padding.height;
        }
        function createScaleContext(parent, scale) {
            return createContext(parent, {
                scale,
                type: "scale"
            });
        }
        function createTickContext(parent, index, tick) {
            return createContext(parent, {
                tick,
                index,
                type: "tick"
            });
        }
        function titleAlign(align, position, reverse) {
            let ret = _toLeftRightCenter(align);
            if (reverse && "right" !== position || !reverse && "right" === position) ret = reverseAlign(ret);
            return ret;
        }
        function titleArgs(scale, offset, position, align) {
            const {top, left, bottom, right, chart} = scale;
            const {chartArea, scales} = chart;
            let rotation = 0;
            let maxWidth, titleX, titleY;
            const height = bottom - top;
            const width = right - left;
            if (scale.isHorizontal()) {
                titleX = _alignStartEnd(align, left, right);
                if (helpers_segment_isObject(position)) {
                    const positionAxisID = Object.keys(position)[0];
                    const value = position[positionAxisID];
                    titleY = scales[positionAxisID].getPixelForValue(value) + height - offset;
                } else if ("center" === position) titleY = (chartArea.bottom + chartArea.top) / 2 + height - offset; else titleY = offsetFromEdge(scale, position, offset);
                maxWidth = right - left;
            } else {
                if (helpers_segment_isObject(position)) {
                    const positionAxisID = Object.keys(position)[0];
                    const value = position[positionAxisID];
                    titleX = scales[positionAxisID].getPixelForValue(value) - width + offset;
                } else if ("center" === position) titleX = (chartArea.left + chartArea.right) / 2 - width + offset; else titleX = offsetFromEdge(scale, position, offset);
                titleY = _alignStartEnd(align, bottom, top);
                rotation = "left" === position ? -HALF_PI : HALF_PI;
            }
            return {
                titleX,
                titleY,
                maxWidth,
                rotation
            };
        }
        class Scale extends Element {
            constructor(cfg) {
                super();
                this.id = cfg.id;
                this.type = cfg.type;
                this.options = void 0;
                this.ctx = cfg.ctx;
                this.chart = cfg.chart;
                this.top = void 0;
                this.bottom = void 0;
                this.left = void 0;
                this.right = void 0;
                this.width = void 0;
                this.height = void 0;
                this._margins = {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                };
                this.maxWidth = void 0;
                this.maxHeight = void 0;
                this.paddingTop = void 0;
                this.paddingBottom = void 0;
                this.paddingLeft = void 0;
                this.paddingRight = void 0;
                this.axis = void 0;
                this.labelRotation = void 0;
                this.min = void 0;
                this.max = void 0;
                this._range = void 0;
                this.ticks = [];
                this._gridLineItems = null;
                this._labelItems = null;
                this._labelSizes = null;
                this._length = 0;
                this._maxLength = 0;
                this._longestTextCache = {};
                this._startPixel = void 0;
                this._endPixel = void 0;
                this._reversePixels = false;
                this._userMax = void 0;
                this._userMin = void 0;
                this._suggestedMax = void 0;
                this._suggestedMin = void 0;
                this._ticksLength = 0;
                this._borderValue = 0;
                this._cache = {};
                this._dataLimitsCached = false;
                this.$context = void 0;
            }
            init(options) {
                this.options = options.setContext(this.getContext());
                this.axis = options.axis;
                this._userMin = this.parse(options.min);
                this._userMax = this.parse(options.max);
                this._suggestedMin = this.parse(options.suggestedMin);
                this._suggestedMax = this.parse(options.suggestedMax);
            }
            parse(raw, index) {
                return raw;
            }
            getUserBounds() {
                let {_userMin, _userMax, _suggestedMin, _suggestedMax} = this;
                _userMin = finiteOrDefault(_userMin, Number.POSITIVE_INFINITY);
                _userMax = finiteOrDefault(_userMax, Number.NEGATIVE_INFINITY);
                _suggestedMin = finiteOrDefault(_suggestedMin, Number.POSITIVE_INFINITY);
                _suggestedMax = finiteOrDefault(_suggestedMax, Number.NEGATIVE_INFINITY);
                return {
                    min: finiteOrDefault(_userMin, _suggestedMin),
                    max: finiteOrDefault(_userMax, _suggestedMax),
                    minDefined: isNumberFinite(_userMin),
                    maxDefined: isNumberFinite(_userMax)
                };
            }
            getMinMax(canStack) {
                let {min, max, minDefined, maxDefined} = this.getUserBounds();
                let range;
                if (minDefined && maxDefined) return {
                    min,
                    max
                };
                const metas = this.getMatchingVisibleMetas();
                for (let i = 0, ilen = metas.length; i < ilen; ++i) {
                    range = metas[i].controller.getMinMax(this, canStack);
                    if (!minDefined) min = Math.min(min, range.min);
                    if (!maxDefined) max = Math.max(max, range.max);
                }
                min = maxDefined && min > max ? max : min;
                max = minDefined && min > max ? min : max;
                return {
                    min: finiteOrDefault(min, finiteOrDefault(max, min)),
                    max: finiteOrDefault(max, finiteOrDefault(min, max))
                };
            }
            getPadding() {
                return {
                    left: this.paddingLeft || 0,
                    top: this.paddingTop || 0,
                    right: this.paddingRight || 0,
                    bottom: this.paddingBottom || 0
                };
            }
            getTicks() {
                return this.ticks;
            }
            getLabels() {
                const data = this.chart.data;
                return this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels || [];
            }
            beforeLayout() {
                this._cache = {};
                this._dataLimitsCached = false;
            }
            beforeUpdate() {
                callback(this.options.beforeUpdate, [ this ]);
            }
            update(maxWidth, maxHeight, margins) {
                const {beginAtZero, grace, ticks: tickOpts} = this.options;
                const sampleSize = tickOpts.sampleSize;
                this.beforeUpdate();
                this.maxWidth = maxWidth;
                this.maxHeight = maxHeight;
                this._margins = margins = Object.assign({
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }, margins);
                this.ticks = null;
                this._labelSizes = null;
                this._gridLineItems = null;
                this._labelItems = null;
                this.beforeSetDimensions();
                this.setDimensions();
                this.afterSetDimensions();
                this._maxLength = this.isHorizontal() ? this.width + margins.left + margins.right : this.height + margins.top + margins.bottom;
                if (!this._dataLimitsCached) {
                    this.beforeDataLimits();
                    this.determineDataLimits();
                    this.afterDataLimits();
                    this._range = _addGrace(this, grace, beginAtZero);
                    this._dataLimitsCached = true;
                }
                this.beforeBuildTicks();
                this.ticks = this.buildTicks() || [];
                this.afterBuildTicks();
                const samplingEnabled = sampleSize < this.ticks.length;
                this._convertTicksToLabels(samplingEnabled ? sample(this.ticks, sampleSize) : this.ticks);
                this.configure();
                this.beforeCalculateLabelRotation();
                this.calculateLabelRotation();
                this.afterCalculateLabelRotation();
                if (tickOpts.display && (tickOpts.autoSkip || "auto" === tickOpts.source)) {
                    this.ticks = autoSkip(this, this.ticks);
                    this._labelSizes = null;
                }
                if (samplingEnabled) this._convertTicksToLabels(this.ticks);
                this.beforeFit();
                this.fit();
                this.afterFit();
                this.afterUpdate();
            }
            configure() {
                let reversePixels = this.options.reverse;
                let startPixel, endPixel;
                if (this.isHorizontal()) {
                    startPixel = this.left;
                    endPixel = this.right;
                } else {
                    startPixel = this.top;
                    endPixel = this.bottom;
                    reversePixels = !reversePixels;
                }
                this._startPixel = startPixel;
                this._endPixel = endPixel;
                this._reversePixels = reversePixels;
                this._length = endPixel - startPixel;
                this._alignToPixels = this.options.alignToPixels;
            }
            afterUpdate() {
                callback(this.options.afterUpdate, [ this ]);
            }
            beforeSetDimensions() {
                callback(this.options.beforeSetDimensions, [ this ]);
            }
            setDimensions() {
                if (this.isHorizontal()) {
                    this.width = this.maxWidth;
                    this.left = 0;
                    this.right = this.width;
                } else {
                    this.height = this.maxHeight;
                    this.top = 0;
                    this.bottom = this.height;
                }
                this.paddingLeft = 0;
                this.paddingTop = 0;
                this.paddingRight = 0;
                this.paddingBottom = 0;
            }
            afterSetDimensions() {
                callback(this.options.afterSetDimensions, [ this ]);
            }
            _callHooks(name) {
                this.chart.notifyPlugins(name, this.getContext());
                callback(this.options[name], [ this ]);
            }
            beforeDataLimits() {
                this._callHooks("beforeDataLimits");
            }
            determineDataLimits() {}
            afterDataLimits() {
                this._callHooks("afterDataLimits");
            }
            beforeBuildTicks() {
                this._callHooks("beforeBuildTicks");
            }
            buildTicks() {
                return [];
            }
            afterBuildTicks() {
                this._callHooks("afterBuildTicks");
            }
            beforeTickToLabelConversion() {
                callback(this.options.beforeTickToLabelConversion, [ this ]);
            }
            generateTickLabels(ticks) {
                const tickOpts = this.options.ticks;
                let i, ilen, tick;
                for (i = 0, ilen = ticks.length; i < ilen; i++) {
                    tick = ticks[i];
                    tick.label = callback(tickOpts.callback, [ tick.value, i, ticks ], this);
                }
            }
            afterTickToLabelConversion() {
                callback(this.options.afterTickToLabelConversion, [ this ]);
            }
            beforeCalculateLabelRotation() {
                callback(this.options.beforeCalculateLabelRotation, [ this ]);
            }
            calculateLabelRotation() {
                const options = this.options;
                const tickOpts = options.ticks;
                const numTicks = this.ticks.length;
                const minRotation = tickOpts.minRotation || 0;
                const maxRotation = tickOpts.maxRotation;
                let labelRotation = minRotation;
                let tickWidth, maxHeight, maxLabelDiagonal;
                if (!this._isVisible() || !tickOpts.display || minRotation >= maxRotation || numTicks <= 1 || !this.isHorizontal()) {
                    this.labelRotation = minRotation;
                    return;
                }
                const labelSizes = this._getLabelSizes();
                const maxLabelWidth = labelSizes.widest.width;
                const maxLabelHeight = labelSizes.highest.height;
                const maxWidth = _limitValue(this.chart.width - maxLabelWidth, 0, this.maxWidth);
                tickWidth = options.offset ? this.maxWidth / numTicks : maxWidth / (numTicks - 1);
                if (maxLabelWidth + 6 > tickWidth) {
                    tickWidth = maxWidth / (numTicks - (options.offset ? .5 : 1));
                    maxHeight = this.maxHeight - getTickMarkLength(options.grid) - tickOpts.padding - getTitleHeight(options.title, this.chart.options.font);
                    maxLabelDiagonal = Math.sqrt(maxLabelWidth * maxLabelWidth + maxLabelHeight * maxLabelHeight);
                    labelRotation = toDegrees(Math.min(Math.asin(_limitValue((labelSizes.highest.height + 6) / tickWidth, -1, 1)), Math.asin(_limitValue(maxHeight / maxLabelDiagonal, -1, 1)) - Math.asin(_limitValue(maxLabelHeight / maxLabelDiagonal, -1, 1))));
                    labelRotation = Math.max(minRotation, Math.min(maxRotation, labelRotation));
                }
                this.labelRotation = labelRotation;
            }
            afterCalculateLabelRotation() {
                callback(this.options.afterCalculateLabelRotation, [ this ]);
            }
            beforeFit() {
                callback(this.options.beforeFit, [ this ]);
            }
            fit() {
                const minSize = {
                    width: 0,
                    height: 0
                };
                const {chart, options: {ticks: tickOpts, title: titleOpts, grid: gridOpts}} = this;
                const display = this._isVisible();
                const isHorizontal = this.isHorizontal();
                if (display) {
                    const titleHeight = getTitleHeight(titleOpts, chart.options.font);
                    if (isHorizontal) {
                        minSize.width = this.maxWidth;
                        minSize.height = getTickMarkLength(gridOpts) + titleHeight;
                    } else {
                        minSize.height = this.maxHeight;
                        minSize.width = getTickMarkLength(gridOpts) + titleHeight;
                    }
                    if (tickOpts.display && this.ticks.length) {
                        const {first, last, widest, highest} = this._getLabelSizes();
                        const tickPadding = 2 * tickOpts.padding;
                        const angleRadians = toRadians(this.labelRotation);
                        const cos = Math.cos(angleRadians);
                        const sin = Math.sin(angleRadians);
                        if (isHorizontal) {
                            const labelHeight = tickOpts.mirror ? 0 : sin * widest.width + cos * highest.height;
                            minSize.height = Math.min(this.maxHeight, minSize.height + labelHeight + tickPadding);
                        } else {
                            const labelWidth = tickOpts.mirror ? 0 : cos * widest.width + sin * highest.height;
                            minSize.width = Math.min(this.maxWidth, minSize.width + labelWidth + tickPadding);
                        }
                        this._calculatePadding(first, last, sin, cos);
                    }
                }
                this._handleMargins();
                if (isHorizontal) {
                    this.width = this._length = chart.width - this._margins.left - this._margins.right;
                    this.height = minSize.height;
                } else {
                    this.width = minSize.width;
                    this.height = this._length = chart.height - this._margins.top - this._margins.bottom;
                }
            }
            _calculatePadding(first, last, sin, cos) {
                const {ticks: {align, padding}, position} = this.options;
                const isRotated = 0 !== this.labelRotation;
                const labelsBelowTicks = "top" !== position && "x" === this.axis;
                if (this.isHorizontal()) {
                    const offsetLeft = this.getPixelForTick(0) - this.left;
                    const offsetRight = this.right - this.getPixelForTick(this.ticks.length - 1);
                    let paddingLeft = 0;
                    let paddingRight = 0;
                    if (isRotated) if (labelsBelowTicks) {
                        paddingLeft = cos * first.width;
                        paddingRight = sin * last.height;
                    } else {
                        paddingLeft = sin * first.height;
                        paddingRight = cos * last.width;
                    } else if ("start" === align) paddingRight = last.width; else if ("end" === align) paddingLeft = first.width; else {
                        paddingLeft = first.width / 2;
                        paddingRight = last.width / 2;
                    }
                    this.paddingLeft = Math.max((paddingLeft - offsetLeft + padding) * this.width / (this.width - offsetLeft), 0);
                    this.paddingRight = Math.max((paddingRight - offsetRight + padding) * this.width / (this.width - offsetRight), 0);
                } else {
                    let paddingTop = last.height / 2;
                    let paddingBottom = first.height / 2;
                    if ("start" === align) {
                        paddingTop = 0;
                        paddingBottom = first.height;
                    } else if ("end" === align) {
                        paddingTop = last.height;
                        paddingBottom = 0;
                    }
                    this.paddingTop = paddingTop + padding;
                    this.paddingBottom = paddingBottom + padding;
                }
            }
            _handleMargins() {
                if (this._margins) {
                    this._margins.left = Math.max(this.paddingLeft, this._margins.left);
                    this._margins.top = Math.max(this.paddingTop, this._margins.top);
                    this._margins.right = Math.max(this.paddingRight, this._margins.right);
                    this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom);
                }
            }
            afterFit() {
                callback(this.options.afterFit, [ this ]);
            }
            isHorizontal() {
                const {axis, position} = this.options;
                return "top" === position || "bottom" === position || "x" === axis;
            }
            isFullSize() {
                return this.options.fullSize;
            }
            _convertTicksToLabels(ticks) {
                this.beforeTickToLabelConversion();
                this.generateTickLabels(ticks);
                let i, ilen;
                for (i = 0, ilen = ticks.length; i < ilen; i++) if (isNullOrUndef(ticks[i].label)) {
                    ticks.splice(i, 1);
                    ilen--;
                    i--;
                }
                this.afterTickToLabelConversion();
            }
            _getLabelSizes() {
                let labelSizes = this._labelSizes;
                if (!labelSizes) {
                    const sampleSize = this.options.ticks.sampleSize;
                    let ticks = this.ticks;
                    if (sampleSize < ticks.length) ticks = sample(ticks, sampleSize);
                    this._labelSizes = labelSizes = this._computeLabelSizes(ticks, ticks.length);
                }
                return labelSizes;
            }
            _computeLabelSizes(ticks, length) {
                const {ctx, _longestTextCache: caches} = this;
                const widths = [];
                const heights = [];
                let widestLabelSize = 0;
                let highestLabelSize = 0;
                let i, j, jlen, label, tickFont, fontString, cache, lineHeight, width, height, nestedLabel;
                for (i = 0; i < length; ++i) {
                    label = ticks[i].label;
                    tickFont = this._resolveTickFontOptions(i);
                    ctx.font = fontString = tickFont.string;
                    cache = caches[fontString] = caches[fontString] || {
                        data: {},
                        gc: []
                    };
                    lineHeight = tickFont.lineHeight;
                    width = height = 0;
                    if (!isNullOrUndef(label) && !isArray(label)) {
                        width = _measureText(ctx, cache.data, cache.gc, width, label);
                        height = lineHeight;
                    } else if (isArray(label)) for (j = 0, jlen = label.length; j < jlen; ++j) {
                        nestedLabel = label[j];
                        if (!isNullOrUndef(nestedLabel) && !isArray(nestedLabel)) {
                            width = _measureText(ctx, cache.data, cache.gc, width, nestedLabel);
                            height += lineHeight;
                        }
                    }
                    widths.push(width);
                    heights.push(height);
                    widestLabelSize = Math.max(width, widestLabelSize);
                    highestLabelSize = Math.max(height, highestLabelSize);
                }
                garbageCollect(caches, length);
                const widest = widths.indexOf(widestLabelSize);
                const highest = heights.indexOf(highestLabelSize);
                const valueAt = idx => ({
                    width: widths[idx] || 0,
                    height: heights[idx] || 0
                });
                return {
                    first: valueAt(0),
                    last: valueAt(length - 1),
                    widest: valueAt(widest),
                    highest: valueAt(highest),
                    widths,
                    heights
                };
            }
            getLabelForValue(value) {
                return value;
            }
            getPixelForValue(value, index) {
                return NaN;
            }
            getValueForPixel(pixel) {}
            getPixelForTick(index) {
                const ticks = this.ticks;
                if (index < 0 || index > ticks.length - 1) return null;
                return this.getPixelForValue(ticks[index].value);
            }
            getPixelForDecimal(decimal) {
                if (this._reversePixels) decimal = 1 - decimal;
                const pixel = this._startPixel + decimal * this._length;
                return _int16Range(this._alignToPixels ? _alignPixel(this.chart, pixel, 0) : pixel);
            }
            getDecimalForPixel(pixel) {
                const decimal = (pixel - this._startPixel) / this._length;
                return this._reversePixels ? 1 - decimal : decimal;
            }
            getBasePixel() {
                return this.getPixelForValue(this.getBaseValue());
            }
            getBaseValue() {
                const {min, max} = this;
                return min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0;
            }
            getContext(index) {
                const ticks = this.ticks || [];
                if (index >= 0 && index < ticks.length) {
                    const tick = ticks[index];
                    return tick.$context || (tick.$context = createTickContext(this.getContext(), index, tick));
                }
                return this.$context || (this.$context = createScaleContext(this.chart.getContext(), this));
            }
            _tickSize() {
                const optionTicks = this.options.ticks;
                const rot = toRadians(this.labelRotation);
                const cos = Math.abs(Math.cos(rot));
                const sin = Math.abs(Math.sin(rot));
                const labelSizes = this._getLabelSizes();
                const padding = optionTicks.autoSkipPadding || 0;
                const w = labelSizes ? labelSizes.widest.width + padding : 0;
                const h = labelSizes ? labelSizes.highest.height + padding : 0;
                return this.isHorizontal() ? h * cos > w * sin ? w / cos : h / sin : h * sin < w * cos ? h / cos : w / sin;
            }
            _isVisible() {
                const display = this.options.display;
                if ("auto" !== display) return !!display;
                return this.getMatchingVisibleMetas().length > 0;
            }
            _computeGridLineItems(chartArea) {
                const axis = this.axis;
                const chart = this.chart;
                const options = this.options;
                const {grid, position} = options;
                const offset = grid.offset;
                const isHorizontal = this.isHorizontal();
                const ticks = this.ticks;
                const ticksLength = ticks.length + (offset ? 1 : 0);
                const tl = getTickMarkLength(grid);
                const items = [];
                const borderOpts = grid.setContext(this.getContext());
                const axisWidth = borderOpts.drawBorder ? borderOpts.borderWidth : 0;
                const axisHalfWidth = axisWidth / 2;
                const alignBorderValue = function(pixel) {
                    return _alignPixel(chart, pixel, axisWidth);
                };
                let borderValue, i, lineValue, alignedLineValue;
                let tx1, ty1, tx2, ty2, x1, y1, x2, y2;
                if ("top" === position) {
                    borderValue = alignBorderValue(this.bottom);
                    ty1 = this.bottom - tl;
                    ty2 = borderValue - axisHalfWidth;
                    y1 = alignBorderValue(chartArea.top) + axisHalfWidth;
                    y2 = chartArea.bottom;
                } else if ("bottom" === position) {
                    borderValue = alignBorderValue(this.top);
                    y1 = chartArea.top;
                    y2 = alignBorderValue(chartArea.bottom) - axisHalfWidth;
                    ty1 = borderValue + axisHalfWidth;
                    ty2 = this.top + tl;
                } else if ("left" === position) {
                    borderValue = alignBorderValue(this.right);
                    tx1 = this.right - tl;
                    tx2 = borderValue - axisHalfWidth;
                    x1 = alignBorderValue(chartArea.left) + axisHalfWidth;
                    x2 = chartArea.right;
                } else if ("right" === position) {
                    borderValue = alignBorderValue(this.left);
                    x1 = chartArea.left;
                    x2 = alignBorderValue(chartArea.right) - axisHalfWidth;
                    tx1 = borderValue + axisHalfWidth;
                    tx2 = this.left + tl;
                } else if ("x" === axis) {
                    if ("center" === position) borderValue = alignBorderValue((chartArea.top + chartArea.bottom) / 2 + .5); else if (helpers_segment_isObject(position)) {
                        const positionAxisID = Object.keys(position)[0];
                        const value = position[positionAxisID];
                        borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
                    }
                    y1 = chartArea.top;
                    y2 = chartArea.bottom;
                    ty1 = borderValue + axisHalfWidth;
                    ty2 = ty1 + tl;
                } else if ("y" === axis) {
                    if ("center" === position) borderValue = alignBorderValue((chartArea.left + chartArea.right) / 2); else if (helpers_segment_isObject(position)) {
                        const positionAxisID = Object.keys(position)[0];
                        const value = position[positionAxisID];
                        borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
                    }
                    tx1 = borderValue - axisHalfWidth;
                    tx2 = tx1 - tl;
                    x1 = chartArea.left;
                    x2 = chartArea.right;
                }
                const limit = valueOrDefault(options.ticks.maxTicksLimit, ticksLength);
                const step = Math.max(1, Math.ceil(ticksLength / limit));
                for (i = 0; i < ticksLength; i += step) {
                    const optsAtIndex = grid.setContext(this.getContext(i));
                    const lineWidth = optsAtIndex.lineWidth;
                    const lineColor = optsAtIndex.color;
                    const borderDash = grid.borderDash || [];
                    const borderDashOffset = optsAtIndex.borderDashOffset;
                    const tickWidth = optsAtIndex.tickWidth;
                    const tickColor = optsAtIndex.tickColor;
                    const tickBorderDash = optsAtIndex.tickBorderDash || [];
                    const tickBorderDashOffset = optsAtIndex.tickBorderDashOffset;
                    lineValue = getPixelForGridLine(this, i, offset);
                    if (void 0 === lineValue) continue;
                    alignedLineValue = _alignPixel(chart, lineValue, lineWidth);
                    if (isHorizontal) tx1 = tx2 = x1 = x2 = alignedLineValue; else ty1 = ty2 = y1 = y2 = alignedLineValue;
                    items.push({
                        tx1,
                        ty1,
                        tx2,
                        ty2,
                        x1,
                        y1,
                        x2,
                        y2,
                        width: lineWidth,
                        color: lineColor,
                        borderDash,
                        borderDashOffset,
                        tickWidth,
                        tickColor,
                        tickBorderDash,
                        tickBorderDashOffset
                    });
                }
                this._ticksLength = ticksLength;
                this._borderValue = borderValue;
                return items;
            }
            _computeLabelItems(chartArea) {
                const axis = this.axis;
                const options = this.options;
                const {position, ticks: optionTicks} = options;
                const isHorizontal = this.isHorizontal();
                const ticks = this.ticks;
                const {align, crossAlign, padding, mirror} = optionTicks;
                const tl = getTickMarkLength(options.grid);
                const tickAndPadding = tl + padding;
                const hTickAndPadding = mirror ? -padding : tickAndPadding;
                const rotation = -toRadians(this.labelRotation);
                const items = [];
                let i, ilen, tick, label, x, y, textAlign, pixel, font, lineHeight, lineCount, textOffset;
                let textBaseline = "middle";
                if ("top" === position) {
                    y = this.bottom - hTickAndPadding;
                    textAlign = this._getXAxisLabelAlignment();
                } else if ("bottom" === position) {
                    y = this.top + hTickAndPadding;
                    textAlign = this._getXAxisLabelAlignment();
                } else if ("left" === position) {
                    const ret = this._getYAxisLabelAlignment(tl);
                    textAlign = ret.textAlign;
                    x = ret.x;
                } else if ("right" === position) {
                    const ret = this._getYAxisLabelAlignment(tl);
                    textAlign = ret.textAlign;
                    x = ret.x;
                } else if ("x" === axis) {
                    if ("center" === position) y = (chartArea.top + chartArea.bottom) / 2 + tickAndPadding; else if (helpers_segment_isObject(position)) {
                        const positionAxisID = Object.keys(position)[0];
                        const value = position[positionAxisID];
                        y = this.chart.scales[positionAxisID].getPixelForValue(value) + tickAndPadding;
                    }
                    textAlign = this._getXAxisLabelAlignment();
                } else if ("y" === axis) {
                    if ("center" === position) x = (chartArea.left + chartArea.right) / 2 - tickAndPadding; else if (helpers_segment_isObject(position)) {
                        const positionAxisID = Object.keys(position)[0];
                        const value = position[positionAxisID];
                        x = this.chart.scales[positionAxisID].getPixelForValue(value);
                    }
                    textAlign = this._getYAxisLabelAlignment(tl).textAlign;
                }
                if ("y" === axis) if ("start" === align) textBaseline = "top"; else if ("end" === align) textBaseline = "bottom";
                const labelSizes = this._getLabelSizes();
                for (i = 0, ilen = ticks.length; i < ilen; ++i) {
                    tick = ticks[i];
                    label = tick.label;
                    const optsAtIndex = optionTicks.setContext(this.getContext(i));
                    pixel = this.getPixelForTick(i) + optionTicks.labelOffset;
                    font = this._resolveTickFontOptions(i);
                    lineHeight = font.lineHeight;
                    lineCount = isArray(label) ? label.length : 1;
                    const halfCount = lineCount / 2;
                    const color = optsAtIndex.color;
                    const strokeColor = optsAtIndex.textStrokeColor;
                    const strokeWidth = optsAtIndex.textStrokeWidth;
                    if (isHorizontal) {
                        x = pixel;
                        if ("top" === position) if ("near" === crossAlign || 0 !== rotation) textOffset = -lineCount * lineHeight + lineHeight / 2; else if ("center" === crossAlign) textOffset = -labelSizes.highest.height / 2 - halfCount * lineHeight + lineHeight; else textOffset = -labelSizes.highest.height + lineHeight / 2; else if ("near" === crossAlign || 0 !== rotation) textOffset = lineHeight / 2; else if ("center" === crossAlign) textOffset = labelSizes.highest.height / 2 - halfCount * lineHeight; else textOffset = labelSizes.highest.height - lineCount * lineHeight;
                        if (mirror) textOffset *= -1;
                    } else {
                        y = pixel;
                        textOffset = (1 - lineCount) * lineHeight / 2;
                    }
                    let backdrop;
                    if (optsAtIndex.showLabelBackdrop) {
                        const labelPadding = toPadding(optsAtIndex.backdropPadding);
                        const height = labelSizes.heights[i];
                        const width = labelSizes.widths[i];
                        let top = y + textOffset - labelPadding.top;
                        let left = x - labelPadding.left;
                        switch (textBaseline) {
                          case "middle":
                            top -= height / 2;
                            break;

                          case "bottom":
                            top -= height;
                            break;
                        }
                        switch (textAlign) {
                          case "center":
                            left -= width / 2;
                            break;

                          case "right":
                            left -= width;
                            break;
                        }
                        backdrop = {
                            left,
                            top,
                            width: width + labelPadding.width,
                            height: height + labelPadding.height,
                            color: optsAtIndex.backdropColor
                        };
                    }
                    items.push({
                        rotation,
                        label,
                        font,
                        color,
                        strokeColor,
                        strokeWidth,
                        textOffset,
                        textAlign,
                        textBaseline,
                        translation: [ x, y ],
                        backdrop
                    });
                }
                return items;
            }
            _getXAxisLabelAlignment() {
                const {position, ticks} = this.options;
                const rotation = -toRadians(this.labelRotation);
                if (rotation) return "top" === position ? "left" : "right";
                let align = "center";
                if ("start" === ticks.align) align = "left"; else if ("end" === ticks.align) align = "right";
                return align;
            }
            _getYAxisLabelAlignment(tl) {
                const {position, ticks: {crossAlign, mirror, padding}} = this.options;
                const labelSizes = this._getLabelSizes();
                const tickAndPadding = tl + padding;
                const widest = labelSizes.widest.width;
                let textAlign;
                let x;
                if ("left" === position) if (mirror) {
                    x = this.right + padding;
                    if ("near" === crossAlign) textAlign = "left"; else if ("center" === crossAlign) {
                        textAlign = "center";
                        x += widest / 2;
                    } else {
                        textAlign = "right";
                        x += widest;
                    }
                } else {
                    x = this.right - tickAndPadding;
                    if ("near" === crossAlign) textAlign = "right"; else if ("center" === crossAlign) {
                        textAlign = "center";
                        x -= widest / 2;
                    } else {
                        textAlign = "left";
                        x = this.left;
                    }
                } else if ("right" === position) if (mirror) {
                    x = this.left + padding;
                    if ("near" === crossAlign) textAlign = "right"; else if ("center" === crossAlign) {
                        textAlign = "center";
                        x -= widest / 2;
                    } else {
                        textAlign = "left";
                        x -= widest;
                    }
                } else {
                    x = this.left + tickAndPadding;
                    if ("near" === crossAlign) textAlign = "left"; else if ("center" === crossAlign) {
                        textAlign = "center";
                        x += widest / 2;
                    } else {
                        textAlign = "right";
                        x = this.right;
                    }
                } else textAlign = "right";
                return {
                    textAlign,
                    x
                };
            }
            _computeLabelArea() {
                if (this.options.ticks.mirror) return;
                const chart = this.chart;
                const position = this.options.position;
                if ("left" === position || "right" === position) return {
                    top: 0,
                    left: this.left,
                    bottom: chart.height,
                    right: this.right
                };
                if ("top" === position || "bottom" === position) return {
                    top: this.top,
                    left: 0,
                    bottom: this.bottom,
                    right: chart.width
                };
            }
            drawBackground() {
                const {ctx, options: {backgroundColor}, left, top, width, height} = this;
                if (backgroundColor) {
                    ctx.save();
                    ctx.fillStyle = backgroundColor;
                    ctx.fillRect(left, top, width, height);
                    ctx.restore();
                }
            }
            getLineWidthForValue(value) {
                const grid = this.options.grid;
                if (!this._isVisible() || !grid.display) return 0;
                const ticks = this.ticks;
                const index = ticks.findIndex((t => t.value === value));
                if (index >= 0) {
                    const opts = grid.setContext(this.getContext(index));
                    return opts.lineWidth;
                }
                return 0;
            }
            drawGrid(chartArea) {
                const grid = this.options.grid;
                const ctx = this.ctx;
                const items = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(chartArea));
                let i, ilen;
                const drawLine = (p1, p2, style) => {
                    if (!style.width || !style.color) return;
                    ctx.save();
                    ctx.lineWidth = style.width;
                    ctx.strokeStyle = style.color;
                    ctx.setLineDash(style.borderDash || []);
                    ctx.lineDashOffset = style.borderDashOffset;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                    ctx.restore();
                };
                if (grid.display) for (i = 0, ilen = items.length; i < ilen; ++i) {
                    const item = items[i];
                    if (grid.drawOnChartArea) drawLine({
                        x: item.x1,
                        y: item.y1
                    }, {
                        x: item.x2,
                        y: item.y2
                    }, item);
                    if (grid.drawTicks) drawLine({
                        x: item.tx1,
                        y: item.ty1
                    }, {
                        x: item.tx2,
                        y: item.ty2
                    }, {
                        color: item.tickColor,
                        width: item.tickWidth,
                        borderDash: item.tickBorderDash,
                        borderDashOffset: item.tickBorderDashOffset
                    });
                }
            }
            drawBorder() {
                const {chart, ctx, options: {grid}} = this;
                const borderOpts = grid.setContext(this.getContext());
                const axisWidth = grid.drawBorder ? borderOpts.borderWidth : 0;
                if (!axisWidth) return;
                const lastLineWidth = grid.setContext(this.getContext(0)).lineWidth;
                const borderValue = this._borderValue;
                let x1, x2, y1, y2;
                if (this.isHorizontal()) {
                    x1 = _alignPixel(chart, this.left, axisWidth) - axisWidth / 2;
                    x2 = _alignPixel(chart, this.right, lastLineWidth) + lastLineWidth / 2;
                    y1 = y2 = borderValue;
                } else {
                    y1 = _alignPixel(chart, this.top, axisWidth) - axisWidth / 2;
                    y2 = _alignPixel(chart, this.bottom, lastLineWidth) + lastLineWidth / 2;
                    x1 = x2 = borderValue;
                }
                ctx.save();
                ctx.lineWidth = borderOpts.borderWidth;
                ctx.strokeStyle = borderOpts.borderColor;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                ctx.restore();
            }
            drawLabels(chartArea) {
                const optionTicks = this.options.ticks;
                if (!optionTicks.display) return;
                const ctx = this.ctx;
                const area = this._computeLabelArea();
                if (area) clipArea(ctx, area);
                const items = this._labelItems || (this._labelItems = this._computeLabelItems(chartArea));
                let i, ilen;
                for (i = 0, ilen = items.length; i < ilen; ++i) {
                    const item = items[i];
                    const tickFont = item.font;
                    const label = item.label;
                    if (item.backdrop) {
                        ctx.fillStyle = item.backdrop.color;
                        ctx.fillRect(item.backdrop.left, item.backdrop.top, item.backdrop.width, item.backdrop.height);
                    }
                    let y = item.textOffset;
                    renderText(ctx, label, 0, y, tickFont, item);
                }
                if (area) unclipArea(ctx);
            }
            drawTitle() {
                const {ctx, options: {position, title, reverse}} = this;
                if (!title.display) return;
                const font = toFont(title.font);
                const padding = toPadding(title.padding);
                const align = title.align;
                let offset = font.lineHeight / 2;
                if ("bottom" === position || "center" === position || helpers_segment_isObject(position)) {
                    offset += padding.bottom;
                    if (isArray(title.text)) offset += font.lineHeight * (title.text.length - 1);
                } else offset += padding.top;
                const {titleX, titleY, maxWidth, rotation} = titleArgs(this, offset, position, align);
                renderText(ctx, title.text, 0, 0, font, {
                    color: title.color,
                    maxWidth,
                    rotation,
                    textAlign: titleAlign(align, position, reverse),
                    textBaseline: "middle",
                    translation: [ titleX, titleY ]
                });
            }
            draw(chartArea) {
                if (!this._isVisible()) return;
                this.drawBackground();
                this.drawGrid(chartArea);
                this.drawBorder();
                this.drawTitle();
                this.drawLabels(chartArea);
            }
            _layers() {
                const opts = this.options;
                const tz = opts.ticks && opts.ticks.z || 0;
                const gz = valueOrDefault(opts.grid && opts.grid.z, -1);
                if (!this._isVisible() || this.draw !== Scale.prototype.draw) return [ {
                    z: tz,
                    draw: chartArea => {
                        this.draw(chartArea);
                    }
                } ];
                return [ {
                    z: gz,
                    draw: chartArea => {
                        this.drawBackground();
                        this.drawGrid(chartArea);
                        this.drawTitle();
                    }
                }, {
                    z: gz + 1,
                    draw: () => {
                        this.drawBorder();
                    }
                }, {
                    z: tz,
                    draw: chartArea => {
                        this.drawLabels(chartArea);
                    }
                } ];
            }
            getMatchingVisibleMetas(type) {
                const metas = this.chart.getSortedVisibleDatasetMetas();
                const axisID = this.axis + "AxisID";
                const result = [];
                let i, ilen;
                for (i = 0, ilen = metas.length; i < ilen; ++i) {
                    const meta = metas[i];
                    if (meta[axisID] === this.id && (!type || meta.type === type)) result.push(meta);
                }
                return result;
            }
            _resolveTickFontOptions(index) {
                const opts = this.options.ticks.setContext(this.getContext(index));
                return toFont(opts.font);
            }
            _maxDigits() {
                const fontSize = this._resolveTickFontOptions(0).lineHeight;
                return (this.isHorizontal() ? this.width : this.height) / fontSize;
            }
        }
        class TypedRegistry {
            constructor(type, scope, override) {
                this.type = type;
                this.scope = scope;
                this.override = override;
                this.items = Object.create(null);
            }
            isForType(type) {
                return Object.prototype.isPrototypeOf.call(this.type.prototype, type.prototype);
            }
            register(item) {
                const proto = Object.getPrototypeOf(item);
                let parentScope;
                if (isIChartComponent(proto)) parentScope = this.register(proto);
                const items = this.items;
                const id = item.id;
                const scope = this.scope + "." + id;
                if (!id) throw new Error("class does not have id: " + item);
                if (id in items) return scope;
                items[id] = item;
                registerDefaults(item, scope, parentScope);
                if (this.override) helpers_segment_defaults.override(item.id, item.overrides);
                return scope;
            }
            get(id) {
                return this.items[id];
            }
            unregister(item) {
                const items = this.items;
                const id = item.id;
                const scope = this.scope;
                if (id in items) delete items[id];
                if (scope && id in helpers_segment_defaults[scope]) {
                    delete helpers_segment_defaults[scope][id];
                    if (this.override) delete overrides[id];
                }
            }
        }
        function registerDefaults(item, scope, parentScope) {
            const itemDefaults = merge(Object.create(null), [ parentScope ? helpers_segment_defaults.get(parentScope) : {}, helpers_segment_defaults.get(scope), item.defaults ]);
            helpers_segment_defaults.set(scope, itemDefaults);
            if (item.defaultRoutes) routeDefaults(scope, item.defaultRoutes);
            if (item.descriptors) helpers_segment_defaults.describe(scope, item.descriptors);
        }
        function routeDefaults(scope, routes) {
            Object.keys(routes).forEach((property => {
                const propertyParts = property.split(".");
                const sourceName = propertyParts.pop();
                const sourceScope = [ scope ].concat(propertyParts).join(".");
                const parts = routes[property].split(".");
                const targetName = parts.pop();
                const targetScope = parts.join(".");
                helpers_segment_defaults.route(sourceScope, sourceName, targetScope, targetName);
            }));
        }
        function isIChartComponent(proto) {
            return "id" in proto && "defaults" in proto;
        }
        class Registry {
            constructor() {
                this.controllers = new TypedRegistry(DatasetController, "datasets", true);
                this.elements = new TypedRegistry(Element, "elements");
                this.plugins = new TypedRegistry(Object, "plugins");
                this.scales = new TypedRegistry(Scale, "scales");
                this._typedRegistries = [ this.controllers, this.scales, this.elements ];
            }
            add(...args) {
                this._each("register", args);
            }
            remove(...args) {
                this._each("unregister", args);
            }
            addControllers(...args) {
                this._each("register", args, this.controllers);
            }
            addElements(...args) {
                this._each("register", args, this.elements);
            }
            addPlugins(...args) {
                this._each("register", args, this.plugins);
            }
            addScales(...args) {
                this._each("register", args, this.scales);
            }
            getController(id) {
                return this._get(id, this.controllers, "controller");
            }
            getElement(id) {
                return this._get(id, this.elements, "element");
            }
            getPlugin(id) {
                return this._get(id, this.plugins, "plugin");
            }
            getScale(id) {
                return this._get(id, this.scales, "scale");
            }
            removeControllers(...args) {
                this._each("unregister", args, this.controllers);
            }
            removeElements(...args) {
                this._each("unregister", args, this.elements);
            }
            removePlugins(...args) {
                this._each("unregister", args, this.plugins);
            }
            removeScales(...args) {
                this._each("unregister", args, this.scales);
            }
            _each(method, args, typedRegistry) {
                [ ...args ].forEach((arg => {
                    const reg = typedRegistry || this._getRegistryForType(arg);
                    if (typedRegistry || reg.isForType(arg) || reg === this.plugins && arg.id) this._exec(method, reg, arg); else helpers_segment_each(arg, (item => {
                        const itemReg = typedRegistry || this._getRegistryForType(item);
                        this._exec(method, itemReg, item);
                    }));
                }));
            }
            _exec(method, registry, component) {
                const camelMethod = _capitalize(method);
                callback(component["before" + camelMethod], [], component);
                registry[method](component);
                callback(component["after" + camelMethod], [], component);
            }
            _getRegistryForType(type) {
                for (let i = 0; i < this._typedRegistries.length; i++) {
                    const reg = this._typedRegistries[i];
                    if (reg.isForType(type)) return reg;
                }
                return this.plugins;
            }
            _get(id, typedRegistry, type) {
                const item = typedRegistry.get(id);
                if (void 0 === item) throw new Error('"' + id + '" is not a registered ' + type + ".");
                return item;
            }
        }
        var registry = new Registry;
        class PluginService {
            constructor() {
                this._init = [];
            }
            notify(chart, hook, args, filter) {
                if ("beforeInit" === hook) {
                    this._init = this._createDescriptors(chart, true);
                    this._notify(this._init, chart, "install");
                }
                const descriptors = filter ? this._descriptors(chart).filter(filter) : this._descriptors(chart);
                const result = this._notify(descriptors, chart, hook, args);
                if ("afterDestroy" === hook) {
                    this._notify(descriptors, chart, "stop");
                    this._notify(this._init, chart, "uninstall");
                }
                return result;
            }
            _notify(descriptors, chart, hook, args) {
                args = args || {};
                for (const descriptor of descriptors) {
                    const plugin = descriptor.plugin;
                    const method = plugin[hook];
                    const params = [ chart, args, descriptor.options ];
                    if (false === callback(method, params, plugin) && args.cancelable) return false;
                }
                return true;
            }
            invalidate() {
                if (!isNullOrUndef(this._cache)) {
                    this._oldCache = this._cache;
                    this._cache = void 0;
                }
            }
            _descriptors(chart) {
                if (this._cache) return this._cache;
                const descriptors = this._cache = this._createDescriptors(chart);
                this._notifyStateChanges(chart);
                return descriptors;
            }
            _createDescriptors(chart, all) {
                const config = chart && chart.config;
                const options = valueOrDefault(config.options && config.options.plugins, {});
                const plugins = allPlugins(config);
                return false === options && !all ? [] : createDescriptors(chart, plugins, options, all);
            }
            _notifyStateChanges(chart) {
                const previousDescriptors = this._oldCache || [];
                const descriptors = this._cache;
                const diff = (a, b) => a.filter((x => !b.some((y => x.plugin.id === y.plugin.id))));
                this._notify(diff(previousDescriptors, descriptors), chart, "stop");
                this._notify(diff(descriptors, previousDescriptors), chart, "start");
            }
        }
        function allPlugins(config) {
            const plugins = [];
            const keys = Object.keys(registry.plugins.items);
            for (let i = 0; i < keys.length; i++) plugins.push(registry.getPlugin(keys[i]));
            const local = config.plugins || [];
            for (let i = 0; i < local.length; i++) {
                const plugin = local[i];
                if (-1 === plugins.indexOf(plugin)) plugins.push(plugin);
            }
            return plugins;
        }
        function getOpts(options, all) {
            if (!all && false === options) return null;
            if (true === options) return {};
            return options;
        }
        function createDescriptors(chart, plugins, options, all) {
            const result = [];
            const context = chart.getContext();
            for (let i = 0; i < plugins.length; i++) {
                const plugin = plugins[i];
                const id = plugin.id;
                const opts = getOpts(options[id], all);
                if (null === opts) continue;
                result.push({
                    plugin,
                    options: pluginOpts(chart.config, plugin, opts, context)
                });
            }
            return result;
        }
        function pluginOpts(config, plugin, opts, context) {
            const keys = config.pluginScopeKeys(plugin);
            const scopes = config.getOptionScopes(opts, keys);
            return config.createResolver(scopes, context, [ "" ], {
                scriptable: false,
                indexable: false,
                allKeys: true
            });
        }
        function getIndexAxis(type, options) {
            const datasetDefaults = helpers_segment_defaults.datasets[type] || {};
            const datasetOptions = (options.datasets || {})[type] || {};
            return datasetOptions.indexAxis || options.indexAxis || datasetDefaults.indexAxis || "x";
        }
        function getAxisFromDefaultScaleID(id, indexAxis) {
            let axis = id;
            if ("_index_" === id) axis = indexAxis; else if ("_value_" === id) axis = "x" === indexAxis ? "y" : "x";
            return axis;
        }
        function getDefaultScaleIDFromAxis(axis, indexAxis) {
            return axis === indexAxis ? "_index_" : "_value_";
        }
        function axisFromPosition(position) {
            if ("top" === position || "bottom" === position) return "x";
            if ("left" === position || "right" === position) return "y";
        }
        function determineAxis(id, scaleOptions) {
            if ("x" === id || "y" === id) return id;
            return scaleOptions.axis || axisFromPosition(scaleOptions.position) || id.charAt(0).toLowerCase();
        }
        function mergeScaleConfig(config, options) {
            const chartDefaults = overrides[config.type] || {
                scales: {}
            };
            const configScales = options.scales || {};
            const chartIndexAxis = getIndexAxis(config.type, options);
            const firstIDs = Object.create(null);
            const scales = Object.create(null);
            Object.keys(configScales).forEach((id => {
                const scaleConf = configScales[id];
                if (!helpers_segment_isObject(scaleConf)) return console.error(`Invalid scale configuration for scale: ${id}`);
                if (scaleConf._proxy) return console.warn(`Ignoring resolver passed as options for scale: ${id}`);
                const axis = determineAxis(id, scaleConf);
                const defaultId = getDefaultScaleIDFromAxis(axis, chartIndexAxis);
                const defaultScaleOptions = chartDefaults.scales || {};
                firstIDs[axis] = firstIDs[axis] || id;
                scales[id] = mergeIf(Object.create(null), [ {
                    axis
                }, scaleConf, defaultScaleOptions[axis], defaultScaleOptions[defaultId] ]);
            }));
            config.data.datasets.forEach((dataset => {
                const type = dataset.type || config.type;
                const indexAxis = dataset.indexAxis || getIndexAxis(type, options);
                const datasetDefaults = overrides[type] || {};
                const defaultScaleOptions = datasetDefaults.scales || {};
                Object.keys(defaultScaleOptions).forEach((defaultID => {
                    const axis = getAxisFromDefaultScaleID(defaultID, indexAxis);
                    const id = dataset[axis + "AxisID"] || firstIDs[axis] || axis;
                    scales[id] = scales[id] || Object.create(null);
                    mergeIf(scales[id], [ {
                        axis
                    }, configScales[id], defaultScaleOptions[defaultID] ]);
                }));
            }));
            Object.keys(scales).forEach((key => {
                const scale = scales[key];
                mergeIf(scale, [ helpers_segment_defaults.scales[scale.type], helpers_segment_defaults.scale ]);
            }));
            return scales;
        }
        function initOptions(config) {
            const options = config.options || (config.options = {});
            options.plugins = valueOrDefault(options.plugins, {});
            options.scales = mergeScaleConfig(config, options);
        }
        function initData(data) {
            data = data || {};
            data.datasets = data.datasets || [];
            data.labels = data.labels || [];
            return data;
        }
        function initConfig(config) {
            config = config || {};
            config.data = initData(config.data);
            initOptions(config);
            return config;
        }
        const keyCache = new Map;
        const keysCached = new Set;
        function cachedKeys(cacheKey, generate) {
            let keys = keyCache.get(cacheKey);
            if (!keys) {
                keys = generate();
                keyCache.set(cacheKey, keys);
                keysCached.add(keys);
            }
            return keys;
        }
        const addIfFound = (set, obj, key) => {
            const opts = resolveObjectKey(obj, key);
            if (void 0 !== opts) set.add(opts);
        };
        class Config {
            constructor(config) {
                this._config = initConfig(config);
                this._scopeCache = new Map;
                this._resolverCache = new Map;
            }
            get platform() {
                return this._config.platform;
            }
            get type() {
                return this._config.type;
            }
            set type(type) {
                this._config.type = type;
            }
            get data() {
                return this._config.data;
            }
            set data(data) {
                this._config.data = initData(data);
            }
            get options() {
                return this._config.options;
            }
            set options(options) {
                this._config.options = options;
            }
            get plugins() {
                return this._config.plugins;
            }
            update() {
                const config = this._config;
                this.clearCache();
                initOptions(config);
            }
            clearCache() {
                this._scopeCache.clear();
                this._resolverCache.clear();
            }
            datasetScopeKeys(datasetType) {
                return cachedKeys(datasetType, (() => [ [ `datasets.${datasetType}`, "" ] ]));
            }
            datasetAnimationScopeKeys(datasetType, transition) {
                return cachedKeys(`${datasetType}.transition.${transition}`, (() => [ [ `datasets.${datasetType}.transitions.${transition}`, `transitions.${transition}` ], [ `datasets.${datasetType}`, "" ] ]));
            }
            datasetElementScopeKeys(datasetType, elementType) {
                return cachedKeys(`${datasetType}-${elementType}`, (() => [ [ `datasets.${datasetType}.elements.${elementType}`, `datasets.${datasetType}`, `elements.${elementType}`, "" ] ]));
            }
            pluginScopeKeys(plugin) {
                const id = plugin.id;
                const type = this.type;
                return cachedKeys(`${type}-plugin-${id}`, (() => [ [ `plugins.${id}`, ...plugin.additionalOptionScopes || [] ] ]));
            }
            _cachedScopes(mainScope, resetCache) {
                const _scopeCache = this._scopeCache;
                let cache = _scopeCache.get(mainScope);
                if (!cache || resetCache) {
                    cache = new Map;
                    _scopeCache.set(mainScope, cache);
                }
                return cache;
            }
            getOptionScopes(mainScope, keyLists, resetCache) {
                const {options, type} = this;
                const cache = this._cachedScopes(mainScope, resetCache);
                const cached = cache.get(keyLists);
                if (cached) return cached;
                const scopes = new Set;
                keyLists.forEach((keys => {
                    if (mainScope) {
                        scopes.add(mainScope);
                        keys.forEach((key => addIfFound(scopes, mainScope, key)));
                    }
                    keys.forEach((key => addIfFound(scopes, options, key)));
                    keys.forEach((key => addIfFound(scopes, overrides[type] || {}, key)));
                    keys.forEach((key => addIfFound(scopes, helpers_segment_defaults, key)));
                    keys.forEach((key => addIfFound(scopes, descriptors, key)));
                }));
                const array = Array.from(scopes);
                if (0 === array.length) array.push(Object.create(null));
                if (keysCached.has(keyLists)) cache.set(keyLists, array);
                return array;
            }
            chartOptionScopes() {
                const {options, type} = this;
                return [ options, overrides[type] || {}, helpers_segment_defaults.datasets[type] || {}, {
                    type
                }, helpers_segment_defaults, descriptors ];
            }
            resolveNamedOptions(scopes, names, context, prefixes = [ "" ]) {
                const result = {
                    $shared: true
                };
                const {resolver, subPrefixes} = getResolver(this._resolverCache, scopes, prefixes);
                let options = resolver;
                if (needContext(resolver, names)) {
                    result.$shared = false;
                    context = isFunction(context) ? context() : context;
                    const subResolver = this.createResolver(scopes, context, subPrefixes);
                    options = _attachContext(resolver, context, subResolver);
                }
                for (const prop of names) result[prop] = options[prop];
                return result;
            }
            createResolver(scopes, context, prefixes = [ "" ], descriptorDefaults) {
                const {resolver} = getResolver(this._resolverCache, scopes, prefixes);
                return helpers_segment_isObject(context) ? _attachContext(resolver, context, void 0, descriptorDefaults) : resolver;
            }
        }
        function getResolver(resolverCache, scopes, prefixes) {
            let cache = resolverCache.get(scopes);
            if (!cache) {
                cache = new Map;
                resolverCache.set(scopes, cache);
            }
            const cacheKey = prefixes.join();
            let cached = cache.get(cacheKey);
            if (!cached) {
                const resolver = _createResolver(scopes, prefixes);
                cached = {
                    resolver,
                    subPrefixes: prefixes.filter((p => !p.toLowerCase().includes("hover")))
                };
                cache.set(cacheKey, cached);
            }
            return cached;
        }
        const hasFunction = value => helpers_segment_isObject(value) && Object.getOwnPropertyNames(value).reduce(((acc, key) => acc || isFunction(value[key])), false);
        function needContext(proxy, names) {
            const {isScriptable, isIndexable} = _descriptors(proxy);
            for (const prop of names) {
                const scriptable = isScriptable(prop);
                const indexable = isIndexable(prop);
                const value = (indexable || scriptable) && proxy[prop];
                if (scriptable && (isFunction(value) || hasFunction(value)) || indexable && isArray(value)) return true;
            }
            return false;
        }
        var version = "3.7.1";
        const KNOWN_POSITIONS = [ "top", "bottom", "left", "right", "chartArea" ];
        function positionIsHorizontal(position, axis) {
            return "top" === position || "bottom" === position || -1 === KNOWN_POSITIONS.indexOf(position) && "x" === axis;
        }
        function compare2Level(l1, l2) {
            return function(a, b) {
                return a[l1] === b[l1] ? a[l2] - b[l2] : a[l1] - b[l1];
            };
        }
        function onAnimationsComplete(context) {
            const chart = context.chart;
            const animationOptions = chart.options.animation;
            chart.notifyPlugins("afterRender");
            callback(animationOptions && animationOptions.onComplete, [ context ], chart);
        }
        function onAnimationProgress(context) {
            const chart = context.chart;
            const animationOptions = chart.options.animation;
            callback(animationOptions && animationOptions.onProgress, [ context ], chart);
        }
        function getCanvas(item) {
            if (_isDomSupported() && "string" === typeof item) item = document.getElementById(item); else if (item && item.length) item = item[0];
            if (item && item.canvas) item = item.canvas;
            return item;
        }
        const instances = {};
        const getChart = key => {
            const canvas = getCanvas(key);
            return Object.values(instances).filter((c => c.canvas === canvas)).pop();
        };
        function moveNumericKeys(obj, start, move) {
            const keys = Object.keys(obj);
            for (const key of keys) {
                const intKey = +key;
                if (intKey >= start) {
                    const value = obj[key];
                    delete obj[key];
                    if (move > 0 || intKey > start) obj[intKey + move] = value;
                }
            }
        }
        function determineLastEvent(e, lastEvent, inChartArea, isClick) {
            if (!inChartArea || "mouseout" === e.type) return null;
            if (isClick) return lastEvent;
            return e;
        }
        class Chart {
            constructor(item, userConfig) {
                const config = this.config = new Config(userConfig);
                const initialCanvas = getCanvas(item);
                const existingChart = getChart(initialCanvas);
                if (existingChart) throw new Error("Canvas is already in use. Chart with ID '" + existingChart.id + "'" + " must be destroyed before the canvas can be reused.");
                const options = config.createResolver(config.chartOptionScopes(), this.getContext());
                this.platform = new (config.platform || _detectPlatform(initialCanvas));
                this.platform.updateConfig(config);
                const context = this.platform.acquireContext(initialCanvas, options.aspectRatio);
                const canvas = context && context.canvas;
                const height = canvas && canvas.height;
                const width = canvas && canvas.width;
                this.id = uid();
                this.ctx = context;
                this.canvas = canvas;
                this.width = width;
                this.height = height;
                this._options = options;
                this._aspectRatio = this.aspectRatio;
                this._layers = [];
                this._metasets = [];
                this._stacks = void 0;
                this.boxes = [];
                this.currentDevicePixelRatio = void 0;
                this.chartArea = void 0;
                this._active = [];
                this._lastEvent = void 0;
                this._listeners = {};
                this._responsiveListeners = void 0;
                this._sortedMetasets = [];
                this.scales = {};
                this._plugins = new PluginService;
                this.$proxies = {};
                this._hiddenIndices = {};
                this.attached = false;
                this._animationsDisabled = void 0;
                this.$context = void 0;
                this._doResize = debounce((mode => this.update(mode)), options.resizeDelay || 0);
                this._dataChanges = [];
                instances[this.id] = this;
                if (!context || !canvas) {
                    console.error("Failed to create chart: can't acquire context from the given item");
                    return;
                }
                animator.listen(this, "complete", onAnimationsComplete);
                animator.listen(this, "progress", onAnimationProgress);
                this._initialize();
                if (this.attached) this.update();
            }
            get aspectRatio() {
                const {options: {aspectRatio, maintainAspectRatio}, width, height, _aspectRatio} = this;
                if (!isNullOrUndef(aspectRatio)) return aspectRatio;
                if (maintainAspectRatio && _aspectRatio) return _aspectRatio;
                return height ? width / height : null;
            }
            get data() {
                return this.config.data;
            }
            set data(data) {
                this.config.data = data;
            }
            get options() {
                return this._options;
            }
            set options(options) {
                this.config.options = options;
            }
            _initialize() {
                this.notifyPlugins("beforeInit");
                if (this.options.responsive) this.resize(); else retinaScale(this, this.options.devicePixelRatio);
                this.bindEvents();
                this.notifyPlugins("afterInit");
                return this;
            }
            clear() {
                clearCanvas(this.canvas, this.ctx);
                return this;
            }
            stop() {
                animator.stop(this);
                return this;
            }
            resize(width, height) {
                if (!animator.running(this)) this._resize(width, height); else this._resizeBeforeDraw = {
                    width,
                    height
                };
            }
            _resize(width, height) {
                const options = this.options;
                const canvas = this.canvas;
                const aspectRatio = options.maintainAspectRatio && this.aspectRatio;
                const newSize = this.platform.getMaximumSize(canvas, width, height, aspectRatio);
                const newRatio = options.devicePixelRatio || this.platform.getDevicePixelRatio();
                const mode = this.width ? "resize" : "attach";
                this.width = newSize.width;
                this.height = newSize.height;
                this._aspectRatio = this.aspectRatio;
                if (!retinaScale(this, newRatio, true)) return;
                this.notifyPlugins("resize", {
                    size: newSize
                });
                callback(options.onResize, [ this, newSize ], this);
                if (this.attached) if (this._doResize(mode)) this.render();
            }
            ensureScalesHaveIDs() {
                const options = this.options;
                const scalesOptions = options.scales || {};
                helpers_segment_each(scalesOptions, ((axisOptions, axisID) => {
                    axisOptions.id = axisID;
                }));
            }
            buildOrUpdateScales() {
                const options = this.options;
                const scaleOpts = options.scales;
                const scales = this.scales;
                const updated = Object.keys(scales).reduce(((obj, id) => {
                    obj[id] = false;
                    return obj;
                }), {});
                let items = [];
                if (scaleOpts) items = items.concat(Object.keys(scaleOpts).map((id => {
                    const scaleOptions = scaleOpts[id];
                    const axis = determineAxis(id, scaleOptions);
                    const isRadial = "r" === axis;
                    const isHorizontal = "x" === axis;
                    return {
                        options: scaleOptions,
                        dposition: isRadial ? "chartArea" : isHorizontal ? "bottom" : "left",
                        dtype: isRadial ? "radialLinear" : isHorizontal ? "category" : "linear"
                    };
                })));
                helpers_segment_each(items, (item => {
                    const scaleOptions = item.options;
                    const id = scaleOptions.id;
                    const axis = determineAxis(id, scaleOptions);
                    const scaleType = valueOrDefault(scaleOptions.type, item.dtype);
                    if (void 0 === scaleOptions.position || positionIsHorizontal(scaleOptions.position, axis) !== positionIsHorizontal(item.dposition)) scaleOptions.position = item.dposition;
                    updated[id] = true;
                    let scale = null;
                    if (id in scales && scales[id].type === scaleType) scale = scales[id]; else {
                        const scaleClass = registry.getScale(scaleType);
                        scale = new scaleClass({
                            id,
                            type: scaleType,
                            ctx: this.ctx,
                            chart: this
                        });
                        scales[scale.id] = scale;
                    }
                    scale.init(scaleOptions, options);
                }));
                helpers_segment_each(updated, ((hasUpdated, id) => {
                    if (!hasUpdated) delete scales[id];
                }));
                helpers_segment_each(scales, (scale => {
                    layouts.configure(this, scale, scale.options);
                    layouts.addBox(this, scale);
                }));
            }
            _updateMetasets() {
                const metasets = this._metasets;
                const numData = this.data.datasets.length;
                const numMeta = metasets.length;
                metasets.sort(((a, b) => a.index - b.index));
                if (numMeta > numData) {
                    for (let i = numData; i < numMeta; ++i) this._destroyDatasetMeta(i);
                    metasets.splice(numData, numMeta - numData);
                }
                this._sortedMetasets = metasets.slice(0).sort(compare2Level("order", "index"));
            }
            _removeUnreferencedMetasets() {
                const {_metasets: metasets, data: {datasets}} = this;
                if (metasets.length > datasets.length) delete this._stacks;
                metasets.forEach(((meta, index) => {
                    if (0 === datasets.filter((x => x === meta._dataset)).length) this._destroyDatasetMeta(index);
                }));
            }
            buildOrUpdateControllers() {
                const newControllers = [];
                const datasets = this.data.datasets;
                let i, ilen;
                this._removeUnreferencedMetasets();
                for (i = 0, ilen = datasets.length; i < ilen; i++) {
                    const dataset = datasets[i];
                    let meta = this.getDatasetMeta(i);
                    const type = dataset.type || this.config.type;
                    if (meta.type && meta.type !== type) {
                        this._destroyDatasetMeta(i);
                        meta = this.getDatasetMeta(i);
                    }
                    meta.type = type;
                    meta.indexAxis = dataset.indexAxis || getIndexAxis(type, this.options);
                    meta.order = dataset.order || 0;
                    meta.index = i;
                    meta.label = "" + dataset.label;
                    meta.visible = this.isDatasetVisible(i);
                    if (meta.controller) {
                        meta.controller.updateIndex(i);
                        meta.controller.linkScales();
                    } else {
                        const ControllerClass = registry.getController(type);
                        const {datasetElementType, dataElementType} = helpers_segment_defaults.datasets[type];
                        Object.assign(ControllerClass.prototype, {
                            dataElementType: registry.getElement(dataElementType),
                            datasetElementType: datasetElementType && registry.getElement(datasetElementType)
                        });
                        meta.controller = new ControllerClass(this, i);
                        newControllers.push(meta.controller);
                    }
                }
                this._updateMetasets();
                return newControllers;
            }
            _resetElements() {
                helpers_segment_each(this.data.datasets, ((dataset, datasetIndex) => {
                    this.getDatasetMeta(datasetIndex).controller.reset();
                }), this);
            }
            reset() {
                this._resetElements();
                this.notifyPlugins("reset");
            }
            update(mode) {
                const config = this.config;
                config.update();
                const options = this._options = config.createResolver(config.chartOptionScopes(), this.getContext());
                const animsDisabled = this._animationsDisabled = !options.animation;
                this._updateScales();
                this._checkEventBindings();
                this._updateHiddenIndices();
                this._plugins.invalidate();
                if (false === this.notifyPlugins("beforeUpdate", {
                    mode,
                    cancelable: true
                })) return;
                const newControllers = this.buildOrUpdateControllers();
                this.notifyPlugins("beforeElementsUpdate");
                let minPadding = 0;
                for (let i = 0, ilen = this.data.datasets.length; i < ilen; i++) {
                    const {controller} = this.getDatasetMeta(i);
                    const reset = !animsDisabled && -1 === newControllers.indexOf(controller);
                    controller.buildOrUpdateElements(reset);
                    minPadding = Math.max(+controller.getMaxOverflow(), minPadding);
                }
                minPadding = this._minPadding = options.layout.autoPadding ? minPadding : 0;
                this._updateLayout(minPadding);
                if (!animsDisabled) helpers_segment_each(newControllers, (controller => {
                    controller.reset();
                }));
                this._updateDatasets(mode);
                this.notifyPlugins("afterUpdate", {
                    mode
                });
                this._layers.sort(compare2Level("z", "_idx"));
                const {_active, _lastEvent} = this;
                if (_lastEvent) this._eventHandler(_lastEvent, true); else if (_active.length) this._updateHoverStyles(_active, _active, true);
                this.render();
            }
            _updateScales() {
                helpers_segment_each(this.scales, (scale => {
                    layouts.removeBox(this, scale);
                }));
                this.ensureScalesHaveIDs();
                this.buildOrUpdateScales();
            }
            _checkEventBindings() {
                const options = this.options;
                const existingEvents = new Set(Object.keys(this._listeners));
                const newEvents = new Set(options.events);
                if (!setsEqual(existingEvents, newEvents) || !!this._responsiveListeners !== options.responsive) {
                    this.unbindEvents();
                    this.bindEvents();
                }
            }
            _updateHiddenIndices() {
                const {_hiddenIndices} = this;
                const changes = this._getUniformDataChanges() || [];
                for (const {method, start, count} of changes) {
                    const move = "_removeElements" === method ? -count : count;
                    moveNumericKeys(_hiddenIndices, start, move);
                }
            }
            _getUniformDataChanges() {
                const _dataChanges = this._dataChanges;
                if (!_dataChanges || !_dataChanges.length) return;
                this._dataChanges = [];
                const datasetCount = this.data.datasets.length;
                const makeSet = idx => new Set(_dataChanges.filter((c => c[0] === idx)).map(((c, i) => i + "," + c.splice(1).join(","))));
                const changeSet = makeSet(0);
                for (let i = 1; i < datasetCount; i++) if (!setsEqual(changeSet, makeSet(i))) return;
                return Array.from(changeSet).map((c => c.split(","))).map((a => ({
                    method: a[1],
                    start: +a[2],
                    count: +a[3]
                })));
            }
            _updateLayout(minPadding) {
                if (false === this.notifyPlugins("beforeLayout", {
                    cancelable: true
                })) return;
                layouts.update(this, this.width, this.height, minPadding);
                const area = this.chartArea;
                const noArea = area.width <= 0 || area.height <= 0;
                this._layers = [];
                helpers_segment_each(this.boxes, (box => {
                    if (noArea && "chartArea" === box.position) return;
                    if (box.configure) box.configure();
                    this._layers.push(...box._layers());
                }), this);
                this._layers.forEach(((item, index) => {
                    item._idx = index;
                }));
                this.notifyPlugins("afterLayout");
            }
            _updateDatasets(mode) {
                if (false === this.notifyPlugins("beforeDatasetsUpdate", {
                    mode,
                    cancelable: true
                })) return;
                for (let i = 0, ilen = this.data.datasets.length; i < ilen; ++i) this.getDatasetMeta(i).controller.configure();
                for (let i = 0, ilen = this.data.datasets.length; i < ilen; ++i) this._updateDataset(i, isFunction(mode) ? mode({
                    datasetIndex: i
                }) : mode);
                this.notifyPlugins("afterDatasetsUpdate", {
                    mode
                });
            }
            _updateDataset(index, mode) {
                const meta = this.getDatasetMeta(index);
                const args = {
                    meta,
                    index,
                    mode,
                    cancelable: true
                };
                if (false === this.notifyPlugins("beforeDatasetUpdate", args)) return;
                meta.controller._update(mode);
                args.cancelable = false;
                this.notifyPlugins("afterDatasetUpdate", args);
            }
            render() {
                if (false === this.notifyPlugins("beforeRender", {
                    cancelable: true
                })) return;
                if (animator.has(this)) {
                    if (this.attached && !animator.running(this)) animator.start(this);
                } else {
                    this.draw();
                    onAnimationsComplete({
                        chart: this
                    });
                }
            }
            draw() {
                let i;
                if (this._resizeBeforeDraw) {
                    const {width, height} = this._resizeBeforeDraw;
                    this._resize(width, height);
                    this._resizeBeforeDraw = null;
                }
                this.clear();
                if (this.width <= 0 || this.height <= 0) return;
                if (false === this.notifyPlugins("beforeDraw", {
                    cancelable: true
                })) return;
                const layers = this._layers;
                for (i = 0; i < layers.length && layers[i].z <= 0; ++i) layers[i].draw(this.chartArea);
                this._drawDatasets();
                for (;i < layers.length; ++i) layers[i].draw(this.chartArea);
                this.notifyPlugins("afterDraw");
            }
            _getSortedDatasetMetas(filterVisible) {
                const metasets = this._sortedMetasets;
                const result = [];
                let i, ilen;
                for (i = 0, ilen = metasets.length; i < ilen; ++i) {
                    const meta = metasets[i];
                    if (!filterVisible || meta.visible) result.push(meta);
                }
                return result;
            }
            getSortedVisibleDatasetMetas() {
                return this._getSortedDatasetMetas(true);
            }
            _drawDatasets() {
                if (false === this.notifyPlugins("beforeDatasetsDraw", {
                    cancelable: true
                })) return;
                const metasets = this.getSortedVisibleDatasetMetas();
                for (let i = metasets.length - 1; i >= 0; --i) this._drawDataset(metasets[i]);
                this.notifyPlugins("afterDatasetsDraw");
            }
            _drawDataset(meta) {
                const ctx = this.ctx;
                const clip = meta._clip;
                const useClip = !clip.disabled;
                const area = this.chartArea;
                const args = {
                    meta,
                    index: meta.index,
                    cancelable: true
                };
                if (false === this.notifyPlugins("beforeDatasetDraw", args)) return;
                if (useClip) clipArea(ctx, {
                    left: false === clip.left ? 0 : area.left - clip.left,
                    right: false === clip.right ? this.width : area.right + clip.right,
                    top: false === clip.top ? 0 : area.top - clip.top,
                    bottom: false === clip.bottom ? this.height : area.bottom + clip.bottom
                });
                meta.controller.draw();
                if (useClip) unclipArea(ctx);
                args.cancelable = false;
                this.notifyPlugins("afterDatasetDraw", args);
            }
            getElementsAtEventForMode(e, mode, options, useFinalPosition) {
                const method = Interaction.modes[mode];
                if ("function" === typeof method) return method(this, e, options, useFinalPosition);
                return [];
            }
            getDatasetMeta(datasetIndex) {
                const dataset = this.data.datasets[datasetIndex];
                const metasets = this._metasets;
                let meta = metasets.filter((x => x && x._dataset === dataset)).pop();
                if (!meta) {
                    meta = {
                        type: null,
                        data: [],
                        dataset: null,
                        controller: null,
                        hidden: null,
                        xAxisID: null,
                        yAxisID: null,
                        order: dataset && dataset.order || 0,
                        index: datasetIndex,
                        _dataset: dataset,
                        _parsed: [],
                        _sorted: false
                    };
                    metasets.push(meta);
                }
                return meta;
            }
            getContext() {
                return this.$context || (this.$context = createContext(null, {
                    chart: this,
                    type: "chart"
                }));
            }
            getVisibleDatasetCount() {
                return this.getSortedVisibleDatasetMetas().length;
            }
            isDatasetVisible(datasetIndex) {
                const dataset = this.data.datasets[datasetIndex];
                if (!dataset) return false;
                const meta = this.getDatasetMeta(datasetIndex);
                return "boolean" === typeof meta.hidden ? !meta.hidden : !dataset.hidden;
            }
            setDatasetVisibility(datasetIndex, visible) {
                const meta = this.getDatasetMeta(datasetIndex);
                meta.hidden = !visible;
            }
            toggleDataVisibility(index) {
                this._hiddenIndices[index] = !this._hiddenIndices[index];
            }
            getDataVisibility(index) {
                return !this._hiddenIndices[index];
            }
            _updateVisibility(datasetIndex, dataIndex, visible) {
                const mode = visible ? "show" : "hide";
                const meta = this.getDatasetMeta(datasetIndex);
                const anims = meta.controller._resolveAnimations(void 0, mode);
                if (defined(dataIndex)) {
                    meta.data[dataIndex].hidden = !visible;
                    this.update();
                } else {
                    this.setDatasetVisibility(datasetIndex, visible);
                    anims.update(meta, {
                        visible
                    });
                    this.update((ctx => ctx.datasetIndex === datasetIndex ? mode : void 0));
                }
            }
            hide(datasetIndex, dataIndex) {
                this._updateVisibility(datasetIndex, dataIndex, false);
            }
            show(datasetIndex, dataIndex) {
                this._updateVisibility(datasetIndex, dataIndex, true);
            }
            _destroyDatasetMeta(datasetIndex) {
                const meta = this._metasets[datasetIndex];
                if (meta && meta.controller) meta.controller._destroy();
                delete this._metasets[datasetIndex];
            }
            _stop() {
                let i, ilen;
                this.stop();
                animator.remove(this);
                for (i = 0, ilen = this.data.datasets.length; i < ilen; ++i) this._destroyDatasetMeta(i);
            }
            destroy() {
                this.notifyPlugins("beforeDestroy");
                const {canvas, ctx} = this;
                this._stop();
                this.config.clearCache();
                if (canvas) {
                    this.unbindEvents();
                    clearCanvas(canvas, ctx);
                    this.platform.releaseContext(ctx);
                    this.canvas = null;
                    this.ctx = null;
                }
                this.notifyPlugins("destroy");
                delete instances[this.id];
                this.notifyPlugins("afterDestroy");
            }
            toBase64Image(...args) {
                return this.canvas.toDataURL(...args);
            }
            bindEvents() {
                this.bindUserEvents();
                if (this.options.responsive) this.bindResponsiveEvents(); else this.attached = true;
            }
            bindUserEvents() {
                const listeners = this._listeners;
                const platform = this.platform;
                const _add = (type, listener) => {
                    platform.addEventListener(this, type, listener);
                    listeners[type] = listener;
                };
                const listener = (e, x, y) => {
                    e.offsetX = x;
                    e.offsetY = y;
                    this._eventHandler(e);
                };
                helpers_segment_each(this.options.events, (type => _add(type, listener)));
            }
            bindResponsiveEvents() {
                if (!this._responsiveListeners) this._responsiveListeners = {};
                const listeners = this._responsiveListeners;
                const platform = this.platform;
                const _add = (type, listener) => {
                    platform.addEventListener(this, type, listener);
                    listeners[type] = listener;
                };
                const _remove = (type, listener) => {
                    if (listeners[type]) {
                        platform.removeEventListener(this, type, listener);
                        delete listeners[type];
                    }
                };
                const listener = (width, height) => {
                    if (this.canvas) this.resize(width, height);
                };
                let detached;
                const attached = () => {
                    _remove("attach", attached);
                    this.attached = true;
                    this.resize();
                    _add("resize", listener);
                    _add("detach", detached);
                };
                detached = () => {
                    this.attached = false;
                    _remove("resize", listener);
                    this._stop();
                    this._resize(0, 0);
                    _add("attach", attached);
                };
                if (platform.isAttached(this.canvas)) attached(); else detached();
            }
            unbindEvents() {
                helpers_segment_each(this._listeners, ((listener, type) => {
                    this.platform.removeEventListener(this, type, listener);
                }));
                this._listeners = {};
                helpers_segment_each(this._responsiveListeners, ((listener, type) => {
                    this.platform.removeEventListener(this, type, listener);
                }));
                this._responsiveListeners = void 0;
            }
            updateHoverStyle(items, mode, enabled) {
                const prefix = enabled ? "set" : "remove";
                let meta, item, i, ilen;
                if ("dataset" === mode) {
                    meta = this.getDatasetMeta(items[0].datasetIndex);
                    meta.controller["_" + prefix + "DatasetHoverStyle"]();
                }
                for (i = 0, ilen = items.length; i < ilen; ++i) {
                    item = items[i];
                    const controller = item && this.getDatasetMeta(item.datasetIndex).controller;
                    if (controller) controller[prefix + "HoverStyle"](item.element, item.datasetIndex, item.index);
                }
            }
            getActiveElements() {
                return this._active || [];
            }
            setActiveElements(activeElements) {
                const lastActive = this._active || [];
                const active = activeElements.map((({datasetIndex, index}) => {
                    const meta = this.getDatasetMeta(datasetIndex);
                    if (!meta) throw new Error("No dataset found at index " + datasetIndex);
                    return {
                        datasetIndex,
                        element: meta.data[index],
                        index
                    };
                }));
                const changed = !_elementsEqual(active, lastActive);
                if (changed) {
                    this._active = active;
                    this._lastEvent = null;
                    this._updateHoverStyles(active, lastActive);
                }
            }
            notifyPlugins(hook, args, filter) {
                return this._plugins.notify(this, hook, args, filter);
            }
            _updateHoverStyles(active, lastActive, replay) {
                const hoverOptions = this.options.hover;
                const diff = (a, b) => a.filter((x => !b.some((y => x.datasetIndex === y.datasetIndex && x.index === y.index))));
                const deactivated = diff(lastActive, active);
                const activated = replay ? active : diff(active, lastActive);
                if (deactivated.length) this.updateHoverStyle(deactivated, hoverOptions.mode, false);
                if (activated.length && hoverOptions.mode) this.updateHoverStyle(activated, hoverOptions.mode, true);
            }
            _eventHandler(e, replay) {
                const args = {
                    event: e,
                    replay,
                    cancelable: true,
                    inChartArea: _isPointInArea(e, this.chartArea, this._minPadding)
                };
                const eventFilter = plugin => (plugin.options.events || this.options.events).includes(e.native.type);
                if (false === this.notifyPlugins("beforeEvent", args, eventFilter)) return;
                const changed = this._handleEvent(e, replay, args.inChartArea);
                args.cancelable = false;
                this.notifyPlugins("afterEvent", args, eventFilter);
                if (changed || args.changed) this.render();
                return this;
            }
            _handleEvent(e, replay, inChartArea) {
                const {_active: lastActive = [], options} = this;
                const useFinalPosition = replay;
                const active = this._getActiveElements(e, lastActive, inChartArea, useFinalPosition);
                const isClick = _isClickEvent(e);
                const lastEvent = determineLastEvent(e, this._lastEvent, inChartArea, isClick);
                if (inChartArea) {
                    this._lastEvent = null;
                    callback(options.onHover, [ e, active, this ], this);
                    if (isClick) callback(options.onClick, [ e, active, this ], this);
                }
                const changed = !_elementsEqual(active, lastActive);
                if (changed || replay) {
                    this._active = active;
                    this._updateHoverStyles(active, lastActive, replay);
                }
                this._lastEvent = lastEvent;
                return changed;
            }
            _getActiveElements(e, lastActive, inChartArea, useFinalPosition) {
                if ("mouseout" === e.type) return [];
                if (!inChartArea) return lastActive;
                const hoverOptions = this.options.hover;
                return this.getElementsAtEventForMode(e, hoverOptions.mode, hoverOptions, useFinalPosition);
            }
        }
        const invalidatePlugins = () => helpers_segment_each(Chart.instances, (chart => chart._plugins.invalidate()));
        const enumerable = true;
        Object.defineProperties(Chart, {
            defaults: {
                enumerable,
                value: helpers_segment_defaults
            },
            instances: {
                enumerable,
                value: instances
            },
            overrides: {
                enumerable,
                value: overrides
            },
            registry: {
                enumerable,
                value: registry
            },
            version: {
                enumerable,
                value: version
            },
            getChart: {
                enumerable,
                value: getChart
            },
            register: {
                enumerable,
                value: (...items) => {
                    registry.add(...items);
                    invalidatePlugins();
                }
            },
            unregister: {
                enumerable,
                value: (...items) => {
                    registry.remove(...items);
                    invalidatePlugins();
                }
            }
        });
        function clipArc(ctx, element, endAngle) {
            const {startAngle, pixelMargin, x, y, outerRadius, innerRadius} = element;
            let angleMargin = pixelMargin / outerRadius;
            ctx.beginPath();
            ctx.arc(x, y, outerRadius, startAngle - angleMargin, endAngle + angleMargin);
            if (innerRadius > pixelMargin) {
                angleMargin = pixelMargin / innerRadius;
                ctx.arc(x, y, innerRadius, endAngle + angleMargin, startAngle - angleMargin, true);
            } else ctx.arc(x, y, pixelMargin, endAngle + HALF_PI, startAngle - HALF_PI);
            ctx.closePath();
            ctx.clip();
        }
        function toRadiusCorners(value) {
            return _readValueToProps(value, [ "outerStart", "outerEnd", "innerStart", "innerEnd" ]);
        }
        function parseBorderRadius$1(arc, innerRadius, outerRadius, angleDelta) {
            const o = toRadiusCorners(arc.options.borderRadius);
            const halfThickness = (outerRadius - innerRadius) / 2;
            const innerLimit = Math.min(halfThickness, angleDelta * innerRadius / 2);
            const computeOuterLimit = val => {
                const outerArcLimit = (outerRadius - Math.min(halfThickness, val)) * angleDelta / 2;
                return _limitValue(val, 0, Math.min(halfThickness, outerArcLimit));
            };
            return {
                outerStart: computeOuterLimit(o.outerStart),
                outerEnd: computeOuterLimit(o.outerEnd),
                innerStart: _limitValue(o.innerStart, 0, innerLimit),
                innerEnd: _limitValue(o.innerEnd, 0, innerLimit)
            };
        }
        function rThetaToXY(r, theta, x, y) {
            return {
                x: x + r * Math.cos(theta),
                y: y + r * Math.sin(theta)
            };
        }
        function pathArc(ctx, element, offset, spacing, end) {
            const {x, y, startAngle: start, pixelMargin, innerRadius: innerR} = element;
            const outerRadius = Math.max(element.outerRadius + spacing + offset - pixelMargin, 0);
            const innerRadius = innerR > 0 ? innerR + spacing + offset + pixelMargin : 0;
            let spacingOffset = 0;
            const alpha = end - start;
            if (spacing) {
                const noSpacingInnerRadius = innerR > 0 ? innerR - spacing : 0;
                const noSpacingOuterRadius = outerRadius > 0 ? outerRadius - spacing : 0;
                const avNogSpacingRadius = (noSpacingInnerRadius + noSpacingOuterRadius) / 2;
                const adjustedAngle = 0 !== avNogSpacingRadius ? alpha * avNogSpacingRadius / (avNogSpacingRadius + spacing) : alpha;
                spacingOffset = (alpha - adjustedAngle) / 2;
            }
            const beta = Math.max(.001, alpha * outerRadius - offset / PI) / outerRadius;
            const angleOffset = (alpha - beta) / 2;
            const startAngle = start + angleOffset + spacingOffset;
            const endAngle = end - angleOffset - spacingOffset;
            const {outerStart, outerEnd, innerStart, innerEnd} = parseBorderRadius$1(element, innerRadius, outerRadius, endAngle - startAngle);
            const outerStartAdjustedRadius = outerRadius - outerStart;
            const outerEndAdjustedRadius = outerRadius - outerEnd;
            const outerStartAdjustedAngle = startAngle + outerStart / outerStartAdjustedRadius;
            const outerEndAdjustedAngle = endAngle - outerEnd / outerEndAdjustedRadius;
            const innerStartAdjustedRadius = innerRadius + innerStart;
            const innerEndAdjustedRadius = innerRadius + innerEnd;
            const innerStartAdjustedAngle = startAngle + innerStart / innerStartAdjustedRadius;
            const innerEndAdjustedAngle = endAngle - innerEnd / innerEndAdjustedRadius;
            ctx.beginPath();
            ctx.arc(x, y, outerRadius, outerStartAdjustedAngle, outerEndAdjustedAngle);
            if (outerEnd > 0) {
                const pCenter = rThetaToXY(outerEndAdjustedRadius, outerEndAdjustedAngle, x, y);
                ctx.arc(pCenter.x, pCenter.y, outerEnd, outerEndAdjustedAngle, endAngle + HALF_PI);
            }
            const p4 = rThetaToXY(innerEndAdjustedRadius, endAngle, x, y);
            ctx.lineTo(p4.x, p4.y);
            if (innerEnd > 0) {
                const pCenter = rThetaToXY(innerEndAdjustedRadius, innerEndAdjustedAngle, x, y);
                ctx.arc(pCenter.x, pCenter.y, innerEnd, endAngle + HALF_PI, innerEndAdjustedAngle + Math.PI);
            }
            ctx.arc(x, y, innerRadius, endAngle - innerEnd / innerRadius, startAngle + innerStart / innerRadius, true);
            if (innerStart > 0) {
                const pCenter = rThetaToXY(innerStartAdjustedRadius, innerStartAdjustedAngle, x, y);
                ctx.arc(pCenter.x, pCenter.y, innerStart, innerStartAdjustedAngle + Math.PI, startAngle - HALF_PI);
            }
            const p8 = rThetaToXY(outerStartAdjustedRadius, startAngle, x, y);
            ctx.lineTo(p8.x, p8.y);
            if (outerStart > 0) {
                const pCenter = rThetaToXY(outerStartAdjustedRadius, outerStartAdjustedAngle, x, y);
                ctx.arc(pCenter.x, pCenter.y, outerStart, startAngle - HALF_PI, outerStartAdjustedAngle);
            }
            ctx.closePath();
        }
        function drawArc(ctx, element, offset, spacing) {
            const {fullCircles, startAngle, circumference} = element;
            let endAngle = element.endAngle;
            if (fullCircles) {
                pathArc(ctx, element, offset, spacing, startAngle + TAU);
                for (let i = 0; i < fullCircles; ++i) ctx.fill();
                if (!isNaN(circumference)) {
                    endAngle = startAngle + circumference % TAU;
                    if (circumference % TAU === 0) endAngle += TAU;
                }
            }
            pathArc(ctx, element, offset, spacing, endAngle);
            ctx.fill();
            return endAngle;
        }
        function drawFullCircleBorders(ctx, element, inner) {
            const {x, y, startAngle, pixelMargin, fullCircles} = element;
            const outerRadius = Math.max(element.outerRadius - pixelMargin, 0);
            const innerRadius = element.innerRadius + pixelMargin;
            let i;
            if (inner) clipArc(ctx, element, startAngle + TAU);
            ctx.beginPath();
            ctx.arc(x, y, innerRadius, startAngle + TAU, startAngle, true);
            for (i = 0; i < fullCircles; ++i) ctx.stroke();
            ctx.beginPath();
            ctx.arc(x, y, outerRadius, startAngle, startAngle + TAU);
            for (i = 0; i < fullCircles; ++i) ctx.stroke();
        }
        function drawBorder(ctx, element, offset, spacing, endAngle) {
            const {options} = element;
            const {borderWidth, borderJoinStyle} = options;
            const inner = "inner" === options.borderAlign;
            if (!borderWidth) return;
            if (inner) {
                ctx.lineWidth = 2 * borderWidth;
                ctx.lineJoin = borderJoinStyle || "round";
            } else {
                ctx.lineWidth = borderWidth;
                ctx.lineJoin = borderJoinStyle || "bevel";
            }
            if (element.fullCircles) drawFullCircleBorders(ctx, element, inner);
            if (inner) clipArc(ctx, element, endAngle);
            pathArc(ctx, element, offset, spacing, endAngle);
            ctx.stroke();
        }
        class ArcElement extends Element {
            constructor(cfg) {
                super();
                this.options = void 0;
                this.circumference = void 0;
                this.startAngle = void 0;
                this.endAngle = void 0;
                this.innerRadius = void 0;
                this.outerRadius = void 0;
                this.pixelMargin = 0;
                this.fullCircles = 0;
                if (cfg) Object.assign(this, cfg);
            }
            inRange(chartX, chartY, useFinalPosition) {
                const point = this.getProps([ "x", "y" ], useFinalPosition);
                const {angle, distance} = getAngleFromPoint(point, {
                    x: chartX,
                    y: chartY
                });
                const {startAngle, endAngle, innerRadius, outerRadius, circumference} = this.getProps([ "startAngle", "endAngle", "innerRadius", "outerRadius", "circumference" ], useFinalPosition);
                const rAdjust = this.options.spacing / 2;
                const _circumference = valueOrDefault(circumference, endAngle - startAngle);
                const betweenAngles = _circumference >= TAU || _angleBetween(angle, startAngle, endAngle);
                const withinRadius = _isBetween(distance, innerRadius + rAdjust, outerRadius + rAdjust);
                return betweenAngles && withinRadius;
            }
            getCenterPoint(useFinalPosition) {
                const {x, y, startAngle, endAngle, innerRadius, outerRadius} = this.getProps([ "x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius", "circumference" ], useFinalPosition);
                const {offset, spacing} = this.options;
                const halfAngle = (startAngle + endAngle) / 2;
                const halfRadius = (innerRadius + outerRadius + spacing + offset) / 2;
                return {
                    x: x + Math.cos(halfAngle) * halfRadius,
                    y: y + Math.sin(halfAngle) * halfRadius
                };
            }
            tooltipPosition(useFinalPosition) {
                return this.getCenterPoint(useFinalPosition);
            }
            draw(ctx) {
                const {options, circumference} = this;
                const offset = (options.offset || 0) / 2;
                const spacing = (options.spacing || 0) / 2;
                this.pixelMargin = "inner" === options.borderAlign ? .33 : 0;
                this.fullCircles = circumference > TAU ? Math.floor(circumference / TAU) : 0;
                if (0 === circumference || this.innerRadius < 0 || this.outerRadius < 0) return;
                ctx.save();
                let radiusOffset = 0;
                if (offset) {
                    radiusOffset = offset / 2;
                    const halfAngle = (this.startAngle + this.endAngle) / 2;
                    ctx.translate(Math.cos(halfAngle) * radiusOffset, Math.sin(halfAngle) * radiusOffset);
                    if (this.circumference >= PI) radiusOffset = offset;
                }
                ctx.fillStyle = options.backgroundColor;
                ctx.strokeStyle = options.borderColor;
                const endAngle = drawArc(ctx, this, radiusOffset, spacing);
                drawBorder(ctx, this, radiusOffset, spacing, endAngle);
                ctx.restore();
            }
        }
        ArcElement.id = "arc";
        ArcElement.defaults = {
            borderAlign: "center",
            borderColor: "#fff",
            borderJoinStyle: void 0,
            borderRadius: 0,
            borderWidth: 2,
            offset: 0,
            spacing: 0,
            angle: void 0
        };
        ArcElement.defaultRoutes = {
            backgroundColor: "backgroundColor"
        };
        function setStyle(ctx, options, style = options) {
            ctx.lineCap = valueOrDefault(style.borderCapStyle, options.borderCapStyle);
            ctx.setLineDash(valueOrDefault(style.borderDash, options.borderDash));
            ctx.lineDashOffset = valueOrDefault(style.borderDashOffset, options.borderDashOffset);
            ctx.lineJoin = valueOrDefault(style.borderJoinStyle, options.borderJoinStyle);
            ctx.lineWidth = valueOrDefault(style.borderWidth, options.borderWidth);
            ctx.strokeStyle = valueOrDefault(style.borderColor, options.borderColor);
        }
        function lineTo(ctx, previous, target) {
            ctx.lineTo(target.x, target.y);
        }
        function getLineMethod(options) {
            if (options.stepped) return _steppedLineTo;
            if (options.tension || "monotone" === options.cubicInterpolationMode) return _bezierCurveTo;
            return lineTo;
        }
        function pathVars(points, segment, params = {}) {
            const count = points.length;
            const {start: paramsStart = 0, end: paramsEnd = count - 1} = params;
            const {start: segmentStart, end: segmentEnd} = segment;
            const start = Math.max(paramsStart, segmentStart);
            const end = Math.min(paramsEnd, segmentEnd);
            const outside = paramsStart < segmentStart && paramsEnd < segmentStart || paramsStart > segmentEnd && paramsEnd > segmentEnd;
            return {
                count,
                start,
                loop: segment.loop,
                ilen: end < start && !outside ? count + end - start : end - start
            };
        }
        function pathSegment(ctx, line, segment, params) {
            const {points, options} = line;
            const {count, start, loop, ilen} = pathVars(points, segment, params);
            const lineMethod = getLineMethod(options);
            let {move = true, reverse} = params || {};
            let i, point, prev;
            for (i = 0; i <= ilen; ++i) {
                point = points[(start + (reverse ? ilen - i : i)) % count];
                if (point.skip) continue; else if (move) {
                    ctx.moveTo(point.x, point.y);
                    move = false;
                } else lineMethod(ctx, prev, point, reverse, options.stepped);
                prev = point;
            }
            if (loop) {
                point = points[(start + (reverse ? ilen : 0)) % count];
                lineMethod(ctx, prev, point, reverse, options.stepped);
            }
            return !!loop;
        }
        function fastPathSegment(ctx, line, segment, params) {
            const points = line.points;
            const {count, start, ilen} = pathVars(points, segment, params);
            const {move = true, reverse} = params || {};
            let avgX = 0;
            let countX = 0;
            let i, point, prevX, minY, maxY, lastY;
            const pointIndex = index => (start + (reverse ? ilen - index : index)) % count;
            const drawX = () => {
                if (minY !== maxY) {
                    ctx.lineTo(avgX, maxY);
                    ctx.lineTo(avgX, minY);
                    ctx.lineTo(avgX, lastY);
                }
            };
            if (move) {
                point = points[pointIndex(0)];
                ctx.moveTo(point.x, point.y);
            }
            for (i = 0; i <= ilen; ++i) {
                point = points[pointIndex(i)];
                if (point.skip) continue;
                const x = point.x;
                const y = point.y;
                const truncX = 0 | x;
                if (truncX === prevX) {
                    if (y < minY) minY = y; else if (y > maxY) maxY = y;
                    avgX = (countX * avgX + x) / ++countX;
                } else {
                    drawX();
                    ctx.lineTo(x, y);
                    prevX = truncX;
                    countX = 0;
                    minY = maxY = y;
                }
                lastY = y;
            }
            drawX();
        }
        function _getSegmentMethod(line) {
            const opts = line.options;
            const borderDash = opts.borderDash && opts.borderDash.length;
            const useFastPath = !line._decimated && !line._loop && !opts.tension && "monotone" !== opts.cubicInterpolationMode && !opts.stepped && !borderDash;
            return useFastPath ? fastPathSegment : pathSegment;
        }
        function _getInterpolationMethod(options) {
            if (options.stepped) return _steppedInterpolation;
            if (options.tension || "monotone" === options.cubicInterpolationMode) return _bezierInterpolation;
            return _pointInLine;
        }
        function strokePathWithCache(ctx, line, start, count) {
            let path = line._path;
            if (!path) {
                path = line._path = new Path2D;
                if (line.path(path, start, count)) path.closePath();
            }
            setStyle(ctx, line.options);
            ctx.stroke(path);
        }
        function strokePathDirect(ctx, line, start, count) {
            const {segments, options} = line;
            const segmentMethod = _getSegmentMethod(line);
            for (const segment of segments) {
                setStyle(ctx, options, segment.style);
                ctx.beginPath();
                if (segmentMethod(ctx, line, segment, {
                    start,
                    end: start + count - 1
                })) ctx.closePath();
                ctx.stroke();
            }
        }
        const usePath2D = "function" === typeof Path2D;
        function draw(ctx, line, start, count) {
            if (usePath2D && !line.options.segment) strokePathWithCache(ctx, line, start, count); else strokePathDirect(ctx, line, start, count);
        }
        class LineElement extends Element {
            constructor(cfg) {
                super();
                this.animated = true;
                this.options = void 0;
                this._chart = void 0;
                this._loop = void 0;
                this._fullLoop = void 0;
                this._path = void 0;
                this._points = void 0;
                this._segments = void 0;
                this._decimated = false;
                this._pointsUpdated = false;
                this._datasetIndex = void 0;
                if (cfg) Object.assign(this, cfg);
            }
            updateControlPoints(chartArea, indexAxis) {
                const options = this.options;
                if ((options.tension || "monotone" === options.cubicInterpolationMode) && !options.stepped && !this._pointsUpdated) {
                    const loop = options.spanGaps ? this._loop : this._fullLoop;
                    _updateBezierControlPoints(this._points, options, chartArea, loop, indexAxis);
                    this._pointsUpdated = true;
                }
            }
            set points(points) {
                this._points = points;
                delete this._segments;
                delete this._path;
                this._pointsUpdated = false;
            }
            get points() {
                return this._points;
            }
            get segments() {
                return this._segments || (this._segments = _computeSegments(this, this.options.segment));
            }
            first() {
                const segments = this.segments;
                const points = this.points;
                return segments.length && points[segments[0].start];
            }
            last() {
                const segments = this.segments;
                const points = this.points;
                const count = segments.length;
                return count && points[segments[count - 1].end];
            }
            interpolate(point, property) {
                const options = this.options;
                const value = point[property];
                const points = this.points;
                const segments = _boundSegments(this, {
                    property,
                    start: value,
                    end: value
                });
                if (!segments.length) return;
                const result = [];
                const _interpolate = _getInterpolationMethod(options);
                let i, ilen;
                for (i = 0, ilen = segments.length; i < ilen; ++i) {
                    const {start, end} = segments[i];
                    const p1 = points[start];
                    const p2 = points[end];
                    if (p1 === p2) {
                        result.push(p1);
                        continue;
                    }
                    const t = Math.abs((value - p1[property]) / (p2[property] - p1[property]));
                    const interpolated = _interpolate(p1, p2, t, options.stepped);
                    interpolated[property] = point[property];
                    result.push(interpolated);
                }
                return 1 === result.length ? result[0] : result;
            }
            pathSegment(ctx, segment, params) {
                const segmentMethod = _getSegmentMethod(this);
                return segmentMethod(ctx, this, segment, params);
            }
            path(ctx, start, count) {
                const segments = this.segments;
                const segmentMethod = _getSegmentMethod(this);
                let loop = this._loop;
                start = start || 0;
                count = count || this.points.length - start;
                for (const segment of segments) loop &= segmentMethod(ctx, this, segment, {
                    start,
                    end: start + count - 1
                });
                return !!loop;
            }
            draw(ctx, chartArea, start, count) {
                const options = this.options || {};
                const points = this.points || [];
                if (points.length && options.borderWidth) {
                    ctx.save();
                    draw(ctx, this, start, count);
                    ctx.restore();
                }
                if (this.animated) {
                    this._pointsUpdated = false;
                    this._path = void 0;
                }
            }
        }
        LineElement.id = "line";
        LineElement.defaults = {
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            borderWidth: 3,
            capBezierPoints: true,
            cubicInterpolationMode: "default",
            fill: false,
            spanGaps: false,
            stepped: false,
            tension: 0
        };
        LineElement.defaultRoutes = {
            backgroundColor: "backgroundColor",
            borderColor: "borderColor"
        };
        LineElement.descriptors = {
            _scriptable: true,
            _indexable: name => "borderDash" !== name && "fill" !== name
        };
        function inRange$1(el, pos, axis, useFinalPosition) {
            const options = el.options;
            const {[axis]: value} = el.getProps([ axis ], useFinalPosition);
            return Math.abs(pos - value) < options.radius + options.hitRadius;
        }
        class PointElement extends Element {
            constructor(cfg) {
                super();
                this.options = void 0;
                this.parsed = void 0;
                this.skip = void 0;
                this.stop = void 0;
                if (cfg) Object.assign(this, cfg);
            }
            inRange(mouseX, mouseY, useFinalPosition) {
                const options = this.options;
                const {x, y} = this.getProps([ "x", "y" ], useFinalPosition);
                return Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2) < Math.pow(options.hitRadius + options.radius, 2);
            }
            inXRange(mouseX, useFinalPosition) {
                return inRange$1(this, mouseX, "x", useFinalPosition);
            }
            inYRange(mouseY, useFinalPosition) {
                return inRange$1(this, mouseY, "y", useFinalPosition);
            }
            getCenterPoint(useFinalPosition) {
                const {x, y} = this.getProps([ "x", "y" ], useFinalPosition);
                return {
                    x,
                    y
                };
            }
            size(options) {
                options = options || this.options || {};
                let radius = options.radius || 0;
                radius = Math.max(radius, radius && options.hoverRadius || 0);
                const borderWidth = radius && options.borderWidth || 0;
                return 2 * (radius + borderWidth);
            }
            draw(ctx, area) {
                const options = this.options;
                if (this.skip || options.radius < .1 || !_isPointInArea(this, area, this.size(options) / 2)) return;
                ctx.strokeStyle = options.borderColor;
                ctx.lineWidth = options.borderWidth;
                ctx.fillStyle = options.backgroundColor;
                drawPoint(ctx, options, this.x, this.y);
            }
            getRange() {
                const options = this.options || {};
                return options.radius + options.hitRadius;
            }
        }
        PointElement.id = "point";
        PointElement.defaults = {
            borderWidth: 1,
            hitRadius: 1,
            hoverBorderWidth: 1,
            hoverRadius: 4,
            pointStyle: "circle",
            radius: 3,
            rotation: 0
        };
        PointElement.defaultRoutes = {
            backgroundColor: "backgroundColor",
            borderColor: "borderColor"
        };
        function getBarBounds(bar, useFinalPosition) {
            const {x, y, base, width, height} = bar.getProps([ "x", "y", "base", "width", "height" ], useFinalPosition);
            let left, right, top, bottom, half;
            if (bar.horizontal) {
                half = height / 2;
                left = Math.min(x, base);
                right = Math.max(x, base);
                top = y - half;
                bottom = y + half;
            } else {
                half = width / 2;
                left = x - half;
                right = x + half;
                top = Math.min(y, base);
                bottom = Math.max(y, base);
            }
            return {
                left,
                top,
                right,
                bottom
            };
        }
        function skipOrLimit(skip, value, min, max) {
            return skip ? 0 : _limitValue(value, min, max);
        }
        function parseBorderWidth(bar, maxW, maxH) {
            const value = bar.options.borderWidth;
            const skip = bar.borderSkipped;
            const o = toTRBL(value);
            return {
                t: skipOrLimit(skip.top, o.top, 0, maxH),
                r: skipOrLimit(skip.right, o.right, 0, maxW),
                b: skipOrLimit(skip.bottom, o.bottom, 0, maxH),
                l: skipOrLimit(skip.left, o.left, 0, maxW)
            };
        }
        function parseBorderRadius(bar, maxW, maxH) {
            const {enableBorderRadius} = bar.getProps([ "enableBorderRadius" ]);
            const value = bar.options.borderRadius;
            const o = toTRBLCorners(value);
            const maxR = Math.min(maxW, maxH);
            const skip = bar.borderSkipped;
            const enableBorder = enableBorderRadius || helpers_segment_isObject(value);
            return {
                topLeft: skipOrLimit(!enableBorder || skip.top || skip.left, o.topLeft, 0, maxR),
                topRight: skipOrLimit(!enableBorder || skip.top || skip.right, o.topRight, 0, maxR),
                bottomLeft: skipOrLimit(!enableBorder || skip.bottom || skip.left, o.bottomLeft, 0, maxR),
                bottomRight: skipOrLimit(!enableBorder || skip.bottom || skip.right, o.bottomRight, 0, maxR)
            };
        }
        function boundingRects(bar) {
            const bounds = getBarBounds(bar);
            const width = bounds.right - bounds.left;
            const height = bounds.bottom - bounds.top;
            const border = parseBorderWidth(bar, width / 2, height / 2);
            const radius = parseBorderRadius(bar, width / 2, height / 2);
            return {
                outer: {
                    x: bounds.left,
                    y: bounds.top,
                    w: width,
                    h: height,
                    radius
                },
                inner: {
                    x: bounds.left + border.l,
                    y: bounds.top + border.t,
                    w: width - border.l - border.r,
                    h: height - border.t - border.b,
                    radius: {
                        topLeft: Math.max(0, radius.topLeft - Math.max(border.t, border.l)),
                        topRight: Math.max(0, radius.topRight - Math.max(border.t, border.r)),
                        bottomLeft: Math.max(0, radius.bottomLeft - Math.max(border.b, border.l)),
                        bottomRight: Math.max(0, radius.bottomRight - Math.max(border.b, border.r))
                    }
                }
            };
        }
        function inRange(bar, x, y, useFinalPosition) {
            const skipX = null === x;
            const skipY = null === y;
            const skipBoth = skipX && skipY;
            const bounds = bar && !skipBoth && getBarBounds(bar, useFinalPosition);
            return bounds && (skipX || _isBetween(x, bounds.left, bounds.right)) && (skipY || _isBetween(y, bounds.top, bounds.bottom));
        }
        function hasRadius(radius) {
            return radius.topLeft || radius.topRight || radius.bottomLeft || radius.bottomRight;
        }
        function addNormalRectPath(ctx, rect) {
            ctx.rect(rect.x, rect.y, rect.w, rect.h);
        }
        function inflateRect(rect, amount, refRect = {}) {
            const x = rect.x !== refRect.x ? -amount : 0;
            const y = rect.y !== refRect.y ? -amount : 0;
            const w = (rect.x + rect.w !== refRect.x + refRect.w ? amount : 0) - x;
            const h = (rect.y + rect.h !== refRect.y + refRect.h ? amount : 0) - y;
            return {
                x: rect.x + x,
                y: rect.y + y,
                w: rect.w + w,
                h: rect.h + h,
                radius: rect.radius
            };
        }
        class BarElement extends Element {
            constructor(cfg) {
                super();
                this.options = void 0;
                this.horizontal = void 0;
                this.base = void 0;
                this.width = void 0;
                this.height = void 0;
                this.inflateAmount = void 0;
                if (cfg) Object.assign(this, cfg);
            }
            draw(ctx) {
                const {inflateAmount, options: {borderColor, backgroundColor}} = this;
                const {inner, outer} = boundingRects(this);
                const addRectPath = hasRadius(outer.radius) ? addRoundedRectPath : addNormalRectPath;
                ctx.save();
                if (outer.w !== inner.w || outer.h !== inner.h) {
                    ctx.beginPath();
                    addRectPath(ctx, inflateRect(outer, inflateAmount, inner));
                    ctx.clip();
                    addRectPath(ctx, inflateRect(inner, -inflateAmount, outer));
                    ctx.fillStyle = borderColor;
                    ctx.fill("evenodd");
                }
                ctx.beginPath();
                addRectPath(ctx, inflateRect(inner, inflateAmount));
                ctx.fillStyle = backgroundColor;
                ctx.fill();
                ctx.restore();
            }
            inRange(mouseX, mouseY, useFinalPosition) {
                return inRange(this, mouseX, mouseY, useFinalPosition);
            }
            inXRange(mouseX, useFinalPosition) {
                return inRange(this, mouseX, null, useFinalPosition);
            }
            inYRange(mouseY, useFinalPosition) {
                return inRange(this, null, mouseY, useFinalPosition);
            }
            getCenterPoint(useFinalPosition) {
                const {x, y, base, horizontal} = this.getProps([ "x", "y", "base", "horizontal" ], useFinalPosition);
                return {
                    x: horizontal ? (x + base) / 2 : x,
                    y: horizontal ? y : (y + base) / 2
                };
            }
            getRange(axis) {
                return "x" === axis ? this.width / 2 : this.height / 2;
            }
        }
        BarElement.id = "bar";
        BarElement.defaults = {
            borderSkipped: "start",
            borderWidth: 0,
            borderRadius: 0,
            inflateAmount: "auto",
            pointStyle: void 0
        };
        BarElement.defaultRoutes = {
            backgroundColor: "backgroundColor",
            borderColor: "borderColor"
        };
        function lttbDecimation(data, start, count, availableWidth, options) {
            const samples = options.samples || availableWidth;
            if (samples >= count) return data.slice(start, start + count);
            const decimated = [];
            const bucketWidth = (count - 2) / (samples - 2);
            let sampledIndex = 0;
            const endIndex = start + count - 1;
            let a = start;
            let i, maxAreaPoint, maxArea, area, nextA;
            decimated[sampledIndex++] = data[a];
            for (i = 0; i < samples - 2; i++) {
                let avgX = 0;
                let avgY = 0;
                let j;
                const avgRangeStart = Math.floor((i + 1) * bucketWidth) + 1 + start;
                const avgRangeEnd = Math.min(Math.floor((i + 2) * bucketWidth) + 1, count) + start;
                const avgRangeLength = avgRangeEnd - avgRangeStart;
                for (j = avgRangeStart; j < avgRangeEnd; j++) {
                    avgX += data[j].x;
                    avgY += data[j].y;
                }
                avgX /= avgRangeLength;
                avgY /= avgRangeLength;
                const rangeOffs = Math.floor(i * bucketWidth) + 1 + start;
                const rangeTo = Math.min(Math.floor((i + 1) * bucketWidth) + 1, count) + start;
                const {x: pointAx, y: pointAy} = data[a];
                maxArea = area = -1;
                for (j = rangeOffs; j < rangeTo; j++) {
                    area = .5 * Math.abs((pointAx - avgX) * (data[j].y - pointAy) - (pointAx - data[j].x) * (avgY - pointAy));
                    if (area > maxArea) {
                        maxArea = area;
                        maxAreaPoint = data[j];
                        nextA = j;
                    }
                }
                decimated[sampledIndex++] = maxAreaPoint;
                a = nextA;
            }
            decimated[sampledIndex++] = data[endIndex];
            return decimated;
        }
        function minMaxDecimation(data, start, count, availableWidth) {
            let avgX = 0;
            let countX = 0;
            let i, point, x, y, prevX, minIndex, maxIndex, startIndex, minY, maxY;
            const decimated = [];
            const endIndex = start + count - 1;
            const xMin = data[start].x;
            const xMax = data[endIndex].x;
            const dx = xMax - xMin;
            for (i = start; i < start + count; ++i) {
                point = data[i];
                x = (point.x - xMin) / dx * availableWidth;
                y = point.y;
                const truncX = 0 | x;
                if (truncX === prevX) {
                    if (y < minY) {
                        minY = y;
                        minIndex = i;
                    } else if (y > maxY) {
                        maxY = y;
                        maxIndex = i;
                    }
                    avgX = (countX * avgX + point.x) / ++countX;
                } else {
                    const lastIndex = i - 1;
                    if (!isNullOrUndef(minIndex) && !isNullOrUndef(maxIndex)) {
                        const intermediateIndex1 = Math.min(minIndex, maxIndex);
                        const intermediateIndex2 = Math.max(minIndex, maxIndex);
                        if (intermediateIndex1 !== startIndex && intermediateIndex1 !== lastIndex) decimated.push({
                            ...data[intermediateIndex1],
                            x: avgX
                        });
                        if (intermediateIndex2 !== startIndex && intermediateIndex2 !== lastIndex) decimated.push({
                            ...data[intermediateIndex2],
                            x: avgX
                        });
                    }
                    if (i > 0 && lastIndex !== startIndex) decimated.push(data[lastIndex]);
                    decimated.push(point);
                    prevX = truncX;
                    countX = 0;
                    minY = maxY = y;
                    minIndex = maxIndex = startIndex = i;
                }
            }
            return decimated;
        }
        function cleanDecimatedDataset(dataset) {
            if (dataset._decimated) {
                const data = dataset._data;
                delete dataset._decimated;
                delete dataset._data;
                Object.defineProperty(dataset, "data", {
                    value: data
                });
            }
        }
        function cleanDecimatedData(chart) {
            chart.data.datasets.forEach((dataset => {
                cleanDecimatedDataset(dataset);
            }));
        }
        function getStartAndCountOfVisiblePointsSimplified(meta, points) {
            const pointCount = points.length;
            let start = 0;
            let count;
            const {iScale} = meta;
            const {min, max, minDefined, maxDefined} = iScale.getUserBounds();
            if (minDefined) start = _limitValue(_lookupByKey(points, iScale.axis, min).lo, 0, pointCount - 1);
            if (maxDefined) count = _limitValue(_lookupByKey(points, iScale.axis, max).hi + 1, start, pointCount) - start; else count = pointCount - start;
            return {
                start,
                count
            };
        }
        var plugin_decimation = {
            id: "decimation",
            defaults: {
                algorithm: "min-max",
                enabled: false
            },
            beforeElementsUpdate: (chart, args, options) => {
                if (!options.enabled) {
                    cleanDecimatedData(chart);
                    return;
                }
                const availableWidth = chart.width;
                chart.data.datasets.forEach(((dataset, datasetIndex) => {
                    const {_data, indexAxis} = dataset;
                    const meta = chart.getDatasetMeta(datasetIndex);
                    const data = _data || dataset.data;
                    if ("y" === resolve([ indexAxis, chart.options.indexAxis ])) return;
                    if ("line" !== meta.type) return;
                    const xAxis = chart.scales[meta.xAxisID];
                    if ("linear" !== xAxis.type && "time" !== xAxis.type) return;
                    if (chart.options.parsing) return;
                    let {start, count} = getStartAndCountOfVisiblePointsSimplified(meta, data);
                    const threshold = options.threshold || 4 * availableWidth;
                    if (count <= threshold) {
                        cleanDecimatedDataset(dataset);
                        return;
                    }
                    if (isNullOrUndef(_data)) {
                        dataset._data = data;
                        delete dataset.data;
                        Object.defineProperty(dataset, "data", {
                            configurable: true,
                            enumerable: true,
                            get: function() {
                                return this._decimated;
                            },
                            set: function(d) {
                                this._data = d;
                            }
                        });
                    }
                    let decimated;
                    switch (options.algorithm) {
                      case "lttb":
                        decimated = lttbDecimation(data, start, count, availableWidth, options);
                        break;

                      case "min-max":
                        decimated = minMaxDecimation(data, start, count, availableWidth);
                        break;

                      default:
                        throw new Error(`Unsupported decimation algorithm '${options.algorithm}'`);
                    }
                    dataset._decimated = decimated;
                }));
            },
            destroy(chart) {
                cleanDecimatedData(chart);
            }
        };
        function getLineByIndex(chart, index) {
            const meta = chart.getDatasetMeta(index);
            const visible = meta && chart.isDatasetVisible(index);
            return visible ? meta.dataset : null;
        }
        function parseFillOption(line) {
            const options = line.options;
            const fillOption = options.fill;
            let fill = valueOrDefault(fillOption && fillOption.target, fillOption);
            if (void 0 === fill) fill = !!options.backgroundColor;
            if (false === fill || null === fill) return false;
            if (true === fill) return "origin";
            return fill;
        }
        function decodeFill(line, index, count) {
            const fill = parseFillOption(line);
            if (helpers_segment_isObject(fill)) return isNaN(fill.value) ? false : fill;
            let target = parseFloat(fill);
            if (isNumberFinite(target) && Math.floor(target) === target) {
                if ("-" === fill[0] || "+" === fill[0]) target = index + target;
                if (target === index || target < 0 || target >= count) return false;
                return target;
            }
            return [ "origin", "start", "end", "stack", "shape" ].indexOf(fill) >= 0 && fill;
        }
        function computeLinearBoundary(source) {
            const {scale = {}, fill} = source;
            let target = null;
            let horizontal;
            if ("start" === fill) target = scale.bottom; else if ("end" === fill) target = scale.top; else if (helpers_segment_isObject(fill)) target = scale.getPixelForValue(fill.value); else if (scale.getBasePixel) target = scale.getBasePixel();
            if (isNumberFinite(target)) {
                horizontal = scale.isHorizontal();
                return {
                    x: horizontal ? target : null,
                    y: horizontal ? null : target
                };
            }
            return null;
        }
        class simpleArc {
            constructor(opts) {
                this.x = opts.x;
                this.y = opts.y;
                this.radius = opts.radius;
            }
            pathSegment(ctx, bounds, opts) {
                const {x, y, radius} = this;
                bounds = bounds || {
                    start: 0,
                    end: TAU
                };
                ctx.arc(x, y, radius, bounds.end, bounds.start, true);
                return !opts.bounds;
            }
            interpolate(point) {
                const {x, y, radius} = this;
                const angle = point.angle;
                return {
                    x: x + Math.cos(angle) * radius,
                    y: y + Math.sin(angle) * radius,
                    angle
                };
            }
        }
        function computeCircularBoundary(source) {
            const {scale, fill} = source;
            const options = scale.options;
            const length = scale.getLabels().length;
            const target = [];
            const start = options.reverse ? scale.max : scale.min;
            const end = options.reverse ? scale.min : scale.max;
            let i, center, value;
            if ("start" === fill) value = start; else if ("end" === fill) value = end; else if (helpers_segment_isObject(fill)) value = fill.value; else value = scale.getBaseValue();
            if (options.grid.circular) {
                center = scale.getPointPositionForValue(0, start);
                return new simpleArc({
                    x: center.x,
                    y: center.y,
                    radius: scale.getDistanceFromCenterForValue(value)
                });
            }
            for (i = 0; i < length; ++i) target.push(scale.getPointPositionForValue(i, value));
            return target;
        }
        function computeBoundary(source) {
            const scale = source.scale || {};
            if (scale.getPointPositionForValue) return computeCircularBoundary(source);
            return computeLinearBoundary(source);
        }
        function findSegmentEnd(start, end, points) {
            for (;end > start; end--) {
                const point = points[end];
                if (!isNaN(point.x) && !isNaN(point.y)) break;
            }
            return end;
        }
        function pointsFromSegments(boundary, line) {
            const {x = null, y = null} = boundary || {};
            const linePoints = line.points;
            const points = [];
            line.segments.forEach((({start, end}) => {
                end = findSegmentEnd(start, end, linePoints);
                const first = linePoints[start];
                const last = linePoints[end];
                if (null !== y) {
                    points.push({
                        x: first.x,
                        y
                    });
                    points.push({
                        x: last.x,
                        y
                    });
                } else if (null !== x) {
                    points.push({
                        x,
                        y: first.y
                    });
                    points.push({
                        x,
                        y: last.y
                    });
                }
            }));
            return points;
        }
        function buildStackLine(source) {
            const {scale, index, line} = source;
            const points = [];
            const segments = line.segments;
            const sourcePoints = line.points;
            const linesBelow = getLinesBelow(scale, index);
            linesBelow.push(createBoundaryLine({
                x: null,
                y: scale.bottom
            }, line));
            for (let i = 0; i < segments.length; i++) {
                const segment = segments[i];
                for (let j = segment.start; j <= segment.end; j++) addPointsBelow(points, sourcePoints[j], linesBelow);
            }
            return new LineElement({
                points,
                options: {}
            });
        }
        function getLinesBelow(scale, index) {
            const below = [];
            const metas = scale.getMatchingVisibleMetas("line");
            for (let i = 0; i < metas.length; i++) {
                const meta = metas[i];
                if (meta.index === index) break;
                if (!meta.hidden) below.unshift(meta.dataset);
            }
            return below;
        }
        function addPointsBelow(points, sourcePoint, linesBelow) {
            const postponed = [];
            for (let j = 0; j < linesBelow.length; j++) {
                const line = linesBelow[j];
                const {first, last, point} = findPoint(line, sourcePoint, "x");
                if (!point || first && last) continue;
                if (first) postponed.unshift(point); else {
                    points.push(point);
                    if (!last) break;
                }
            }
            points.push(...postponed);
        }
        function findPoint(line, sourcePoint, property) {
            const point = line.interpolate(sourcePoint, property);
            if (!point) return {};
            const pointValue = point[property];
            const segments = line.segments;
            const linePoints = line.points;
            let first = false;
            let last = false;
            for (let i = 0; i < segments.length; i++) {
                const segment = segments[i];
                const firstValue = linePoints[segment.start][property];
                const lastValue = linePoints[segment.end][property];
                if (_isBetween(pointValue, firstValue, lastValue)) {
                    first = pointValue === firstValue;
                    last = pointValue === lastValue;
                    break;
                }
            }
            return {
                first,
                last,
                point
            };
        }
        function getTarget(source) {
            const {chart, fill, line} = source;
            if (isNumberFinite(fill)) return getLineByIndex(chart, fill);
            if ("stack" === fill) return buildStackLine(source);
            if ("shape" === fill) return true;
            const boundary = computeBoundary(source);
            if (boundary instanceof simpleArc) return boundary;
            return createBoundaryLine(boundary, line);
        }
        function createBoundaryLine(boundary, line) {
            let points = [];
            let _loop = false;
            if (isArray(boundary)) {
                _loop = true;
                points = boundary;
            } else points = pointsFromSegments(boundary, line);
            return points.length ? new LineElement({
                points,
                options: {
                    tension: 0
                },
                _loop,
                _fullLoop: _loop
            }) : null;
        }
        function resolveTarget(sources, index, propagate) {
            const source = sources[index];
            let fill = source.fill;
            const visited = [ index ];
            let target;
            if (!propagate) return fill;
            while (false !== fill && -1 === visited.indexOf(fill)) {
                if (!isNumberFinite(fill)) return fill;
                target = sources[fill];
                if (!target) return false;
                if (target.visible) return fill;
                visited.push(fill);
                fill = target.fill;
            }
            return false;
        }
        function _clip(ctx, target, clipY) {
            const {segments, points} = target;
            let first = true;
            let lineLoop = false;
            ctx.beginPath();
            for (const segment of segments) {
                const {start, end} = segment;
                const firstPoint = points[start];
                const lastPoint = points[findSegmentEnd(start, end, points)];
                if (first) {
                    ctx.moveTo(firstPoint.x, firstPoint.y);
                    first = false;
                } else {
                    ctx.lineTo(firstPoint.x, clipY);
                    ctx.lineTo(firstPoint.x, firstPoint.y);
                }
                lineLoop = !!target.pathSegment(ctx, segment, {
                    move: lineLoop
                });
                if (lineLoop) ctx.closePath(); else ctx.lineTo(lastPoint.x, clipY);
            }
            ctx.lineTo(target.first().x, clipY);
            ctx.closePath();
            ctx.clip();
        }
        function getBounds(property, first, last, loop) {
            if (loop) return;
            let start = first[property];
            let end = last[property];
            if ("angle" === property) {
                start = _normalizeAngle(start);
                end = _normalizeAngle(end);
            }
            return {
                property,
                start,
                end
            };
        }
        function _getEdge(a, b, prop, fn) {
            if (a && b) return fn(a[prop], b[prop]);
            return a ? a[prop] : b ? b[prop] : 0;
        }
        function _segments(line, target, property) {
            const segments = line.segments;
            const points = line.points;
            const tpoints = target.points;
            const parts = [];
            for (const segment of segments) {
                let {start, end} = segment;
                end = findSegmentEnd(start, end, points);
                const bounds = getBounds(property, points[start], points[end], segment.loop);
                if (!target.segments) {
                    parts.push({
                        source: segment,
                        target: bounds,
                        start: points[start],
                        end: points[end]
                    });
                    continue;
                }
                const targetSegments = _boundSegments(target, bounds);
                for (const tgt of targetSegments) {
                    const subBounds = getBounds(property, tpoints[tgt.start], tpoints[tgt.end], tgt.loop);
                    const fillSources = _boundSegment(segment, points, subBounds);
                    for (const fillSource of fillSources) parts.push({
                        source: fillSource,
                        target: tgt,
                        start: {
                            [property]: _getEdge(bounds, subBounds, "start", Math.max)
                        },
                        end: {
                            [property]: _getEdge(bounds, subBounds, "end", Math.min)
                        }
                    });
                }
            }
            return parts;
        }
        function clipBounds(ctx, scale, bounds) {
            const {top, bottom} = scale.chart.chartArea;
            const {property, start, end} = bounds || {};
            if ("x" === property) {
                ctx.beginPath();
                ctx.rect(start, top, end - start, bottom - top);
                ctx.clip();
            }
        }
        function interpolatedLineTo(ctx, target, point, property) {
            const interpolatedPoint = target.interpolate(point, property);
            if (interpolatedPoint) ctx.lineTo(interpolatedPoint.x, interpolatedPoint.y);
        }
        function _fill(ctx, cfg) {
            const {line, target, property, color, scale} = cfg;
            const segments = _segments(line, target, property);
            for (const {source: src, target: tgt, start, end} of segments) {
                const {style: {backgroundColor = color} = {}} = src;
                const notShape = true !== target;
                ctx.save();
                ctx.fillStyle = backgroundColor;
                clipBounds(ctx, scale, notShape && getBounds(property, start, end));
                ctx.beginPath();
                const lineLoop = !!line.pathSegment(ctx, src);
                let loop;
                if (notShape) {
                    if (lineLoop) ctx.closePath(); else interpolatedLineTo(ctx, target, end, property);
                    const targetLoop = !!target.pathSegment(ctx, tgt, {
                        move: lineLoop,
                        reverse: true
                    });
                    loop = lineLoop && targetLoop;
                    if (!loop) interpolatedLineTo(ctx, target, start, property);
                }
                ctx.closePath();
                ctx.fill(loop ? "evenodd" : "nonzero");
                ctx.restore();
            }
        }
        function doFill(ctx, cfg) {
            const {line, target, above, below, area, scale} = cfg;
            const property = line._loop ? "angle" : cfg.axis;
            ctx.save();
            if ("x" === property && below !== above) {
                _clip(ctx, target, area.top);
                _fill(ctx, {
                    line,
                    target,
                    color: above,
                    scale,
                    property
                });
                ctx.restore();
                ctx.save();
                _clip(ctx, target, area.bottom);
            }
            _fill(ctx, {
                line,
                target,
                color: below,
                scale,
                property
            });
            ctx.restore();
        }
        function drawfill(ctx, source, area) {
            const target = getTarget(source);
            const {line, scale, axis} = source;
            const lineOpts = line.options;
            const fillOption = lineOpts.fill;
            const color = lineOpts.backgroundColor;
            const {above = color, below = color} = fillOption || {};
            if (target && line.points.length) {
                clipArea(ctx, area);
                doFill(ctx, {
                    line,
                    target,
                    above,
                    below,
                    area,
                    scale,
                    axis
                });
                unclipArea(ctx);
            }
        }
        var plugin_filler = {
            id: "filler",
            afterDatasetsUpdate(chart, _args, options) {
                const count = (chart.data.datasets || []).length;
                const sources = [];
                let meta, i, line, source;
                for (i = 0; i < count; ++i) {
                    meta = chart.getDatasetMeta(i);
                    line = meta.dataset;
                    source = null;
                    if (line && line.options && line instanceof LineElement) source = {
                        visible: chart.isDatasetVisible(i),
                        index: i,
                        fill: decodeFill(line, i, count),
                        chart,
                        axis: meta.controller.options.indexAxis,
                        scale: meta.vScale,
                        line
                    };
                    meta.$filler = source;
                    sources.push(source);
                }
                for (i = 0; i < count; ++i) {
                    source = sources[i];
                    if (!source || false === source.fill) continue;
                    source.fill = resolveTarget(sources, i, options.propagate);
                }
            },
            beforeDraw(chart, _args, options) {
                const draw = "beforeDraw" === options.drawTime;
                const metasets = chart.getSortedVisibleDatasetMetas();
                const area = chart.chartArea;
                for (let i = metasets.length - 1; i >= 0; --i) {
                    const source = metasets[i].$filler;
                    if (!source) continue;
                    source.line.updateControlPoints(area, source.axis);
                    if (draw) drawfill(chart.ctx, source, area);
                }
            },
            beforeDatasetsDraw(chart, _args, options) {
                if ("beforeDatasetsDraw" !== options.drawTime) return;
                const metasets = chart.getSortedVisibleDatasetMetas();
                for (let i = metasets.length - 1; i >= 0; --i) {
                    const source = metasets[i].$filler;
                    if (source) drawfill(chart.ctx, source, chart.chartArea);
                }
            },
            beforeDatasetDraw(chart, args, options) {
                const source = args.meta.$filler;
                if (!source || false === source.fill || "beforeDatasetDraw" !== options.drawTime) return;
                drawfill(chart.ctx, source, chart.chartArea);
            },
            defaults: {
                propagate: true,
                drawTime: "beforeDatasetDraw"
            }
        };
        const getBoxSize = (labelOpts, fontSize) => {
            let {boxHeight = fontSize, boxWidth = fontSize} = labelOpts;
            if (labelOpts.usePointStyle) {
                boxHeight = Math.min(boxHeight, fontSize);
                boxWidth = Math.min(boxWidth, fontSize);
            }
            return {
                boxWidth,
                boxHeight,
                itemHeight: Math.max(fontSize, boxHeight)
            };
        };
        const itemsEqual = (a, b) => null !== a && null !== b && a.datasetIndex === b.datasetIndex && a.index === b.index;
        class Legend extends Element {
            constructor(config) {
                super();
                this._added = false;
                this.legendHitBoxes = [];
                this._hoveredItem = null;
                this.doughnutMode = false;
                this.chart = config.chart;
                this.options = config.options;
                this.ctx = config.ctx;
                this.legendItems = void 0;
                this.columnSizes = void 0;
                this.lineWidths = void 0;
                this.maxHeight = void 0;
                this.maxWidth = void 0;
                this.top = void 0;
                this.bottom = void 0;
                this.left = void 0;
                this.right = void 0;
                this.height = void 0;
                this.width = void 0;
                this._margins = void 0;
                this.position = void 0;
                this.weight = void 0;
                this.fullSize = void 0;
            }
            update(maxWidth, maxHeight, margins) {
                this.maxWidth = maxWidth;
                this.maxHeight = maxHeight;
                this._margins = margins;
                this.setDimensions();
                this.buildLabels();
                this.fit();
            }
            setDimensions() {
                if (this.isHorizontal()) {
                    this.width = this.maxWidth;
                    this.left = this._margins.left;
                    this.right = this.width;
                } else {
                    this.height = this.maxHeight;
                    this.top = this._margins.top;
                    this.bottom = this.height;
                }
            }
            buildLabels() {
                const labelOpts = this.options.labels || {};
                let legendItems = callback(labelOpts.generateLabels, [ this.chart ], this) || [];
                if (labelOpts.filter) legendItems = legendItems.filter((item => labelOpts.filter(item, this.chart.data)));
                if (labelOpts.sort) legendItems = legendItems.sort(((a, b) => labelOpts.sort(a, b, this.chart.data)));
                if (this.options.reverse) legendItems.reverse();
                this.legendItems = legendItems;
            }
            fit() {
                const {options, ctx} = this;
                if (!options.display) {
                    this.width = this.height = 0;
                    return;
                }
                const labelOpts = options.labels;
                const labelFont = toFont(labelOpts.font);
                const fontSize = labelFont.size;
                const titleHeight = this._computeTitleHeight();
                const {boxWidth, itemHeight} = getBoxSize(labelOpts, fontSize);
                let width, height;
                ctx.font = labelFont.string;
                if (this.isHorizontal()) {
                    width = this.maxWidth;
                    height = this._fitRows(titleHeight, fontSize, boxWidth, itemHeight) + 10;
                } else {
                    height = this.maxHeight;
                    width = this._fitCols(titleHeight, fontSize, boxWidth, itemHeight) + 10;
                }
                this.width = Math.min(width, options.maxWidth || this.maxWidth);
                this.height = Math.min(height, options.maxHeight || this.maxHeight);
            }
            _fitRows(titleHeight, fontSize, boxWidth, itemHeight) {
                const {ctx, maxWidth, options: {labels: {padding}}} = this;
                const hitboxes = this.legendHitBoxes = [];
                const lineWidths = this.lineWidths = [ 0 ];
                const lineHeight = itemHeight + padding;
                let totalHeight = titleHeight;
                ctx.textAlign = "left";
                ctx.textBaseline = "middle";
                let row = -1;
                let top = -lineHeight;
                this.legendItems.forEach(((legendItem, i) => {
                    const itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
                    if (0 === i || lineWidths[lineWidths.length - 1] + itemWidth + 2 * padding > maxWidth) {
                        totalHeight += lineHeight;
                        lineWidths[lineWidths.length - (i > 0 ? 0 : 1)] = 0;
                        top += lineHeight;
                        row++;
                    }
                    hitboxes[i] = {
                        left: 0,
                        top,
                        row,
                        width: itemWidth,
                        height: itemHeight
                    };
                    lineWidths[lineWidths.length - 1] += itemWidth + padding;
                }));
                return totalHeight;
            }
            _fitCols(titleHeight, fontSize, boxWidth, itemHeight) {
                const {ctx, maxHeight, options: {labels: {padding}}} = this;
                const hitboxes = this.legendHitBoxes = [];
                const columnSizes = this.columnSizes = [];
                const heightLimit = maxHeight - titleHeight;
                let totalWidth = padding;
                let currentColWidth = 0;
                let currentColHeight = 0;
                let left = 0;
                let col = 0;
                this.legendItems.forEach(((legendItem, i) => {
                    const itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
                    if (i > 0 && currentColHeight + itemHeight + 2 * padding > heightLimit) {
                        totalWidth += currentColWidth + padding;
                        columnSizes.push({
                            width: currentColWidth,
                            height: currentColHeight
                        });
                        left += currentColWidth + padding;
                        col++;
                        currentColWidth = currentColHeight = 0;
                    }
                    hitboxes[i] = {
                        left,
                        top: currentColHeight,
                        col,
                        width: itemWidth,
                        height: itemHeight
                    };
                    currentColWidth = Math.max(currentColWidth, itemWidth);
                    currentColHeight += itemHeight + padding;
                }));
                totalWidth += currentColWidth;
                columnSizes.push({
                    width: currentColWidth,
                    height: currentColHeight
                });
                return totalWidth;
            }
            adjustHitBoxes() {
                if (!this.options.display) return;
                const titleHeight = this._computeTitleHeight();
                const {legendHitBoxes: hitboxes, options: {align, labels: {padding}, rtl}} = this;
                const rtlHelper = getRtlAdapter(rtl, this.left, this.width);
                if (this.isHorizontal()) {
                    let row = 0;
                    let left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
                    for (const hitbox of hitboxes) {
                        if (row !== hitbox.row) {
                            row = hitbox.row;
                            left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
                        }
                        hitbox.top += this.top + titleHeight + padding;
                        hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(left), hitbox.width);
                        left += hitbox.width + padding;
                    }
                } else {
                    let col = 0;
                    let top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
                    for (const hitbox of hitboxes) {
                        if (hitbox.col !== col) {
                            col = hitbox.col;
                            top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
                        }
                        hitbox.top = top;
                        hitbox.left += this.left + padding;
                        hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(hitbox.left), hitbox.width);
                        top += hitbox.height + padding;
                    }
                }
            }
            isHorizontal() {
                return "top" === this.options.position || "bottom" === this.options.position;
            }
            draw() {
                if (this.options.display) {
                    const ctx = this.ctx;
                    clipArea(ctx, this);
                    this._draw();
                    unclipArea(ctx);
                }
            }
            _draw() {
                const {options: opts, columnSizes, lineWidths, ctx} = this;
                const {align, labels: labelOpts} = opts;
                const defaultColor = helpers_segment_defaults.color;
                const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
                const labelFont = toFont(labelOpts.font);
                const {color: fontColor, padding} = labelOpts;
                const fontSize = labelFont.size;
                const halfFontSize = fontSize / 2;
                let cursor;
                this.drawTitle();
                ctx.textAlign = rtlHelper.textAlign("left");
                ctx.textBaseline = "middle";
                ctx.lineWidth = .5;
                ctx.font = labelFont.string;
                const {boxWidth, boxHeight, itemHeight} = getBoxSize(labelOpts, fontSize);
                const drawLegendBox = function(x, y, legendItem) {
                    if (isNaN(boxWidth) || boxWidth <= 0 || isNaN(boxHeight) || boxHeight < 0) return;
                    ctx.save();
                    const lineWidth = valueOrDefault(legendItem.lineWidth, 1);
                    ctx.fillStyle = valueOrDefault(legendItem.fillStyle, defaultColor);
                    ctx.lineCap = valueOrDefault(legendItem.lineCap, "butt");
                    ctx.lineDashOffset = valueOrDefault(legendItem.lineDashOffset, 0);
                    ctx.lineJoin = valueOrDefault(legendItem.lineJoin, "miter");
                    ctx.lineWidth = lineWidth;
                    ctx.strokeStyle = valueOrDefault(legendItem.strokeStyle, defaultColor);
                    ctx.setLineDash(valueOrDefault(legendItem.lineDash, []));
                    if (labelOpts.usePointStyle) {
                        const drawOptions = {
                            radius: boxWidth * Math.SQRT2 / 2,
                            pointStyle: legendItem.pointStyle,
                            rotation: legendItem.rotation,
                            borderWidth: lineWidth
                        };
                        const centerX = rtlHelper.xPlus(x, boxWidth / 2);
                        const centerY = y + halfFontSize;
                        drawPoint(ctx, drawOptions, centerX, centerY);
                    } else {
                        const yBoxTop = y + Math.max((fontSize - boxHeight) / 2, 0);
                        const xBoxLeft = rtlHelper.leftForLtr(x, boxWidth);
                        const borderRadius = toTRBLCorners(legendItem.borderRadius);
                        ctx.beginPath();
                        if (Object.values(borderRadius).some((v => 0 !== v))) addRoundedRectPath(ctx, {
                            x: xBoxLeft,
                            y: yBoxTop,
                            w: boxWidth,
                            h: boxHeight,
                            radius: borderRadius
                        }); else ctx.rect(xBoxLeft, yBoxTop, boxWidth, boxHeight);
                        ctx.fill();
                        if (0 !== lineWidth) ctx.stroke();
                    }
                    ctx.restore();
                };
                const fillText = function(x, y, legendItem) {
                    renderText(ctx, legendItem.text, x, y + itemHeight / 2, labelFont, {
                        strikethrough: legendItem.hidden,
                        textAlign: rtlHelper.textAlign(legendItem.textAlign)
                    });
                };
                const isHorizontal = this.isHorizontal();
                const titleHeight = this._computeTitleHeight();
                if (isHorizontal) cursor = {
                    x: _alignStartEnd(align, this.left + padding, this.right - lineWidths[0]),
                    y: this.top + padding + titleHeight,
                    line: 0
                }; else cursor = {
                    x: this.left + padding,
                    y: _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[0].height),
                    line: 0
                };
                overrideTextDirection(this.ctx, opts.textDirection);
                const lineHeight = itemHeight + padding;
                this.legendItems.forEach(((legendItem, i) => {
                    ctx.strokeStyle = legendItem.fontColor || fontColor;
                    ctx.fillStyle = legendItem.fontColor || fontColor;
                    const textWidth = ctx.measureText(legendItem.text).width;
                    const textAlign = rtlHelper.textAlign(legendItem.textAlign || (legendItem.textAlign = labelOpts.textAlign));
                    const width = boxWidth + halfFontSize + textWidth;
                    let x = cursor.x;
                    let y = cursor.y;
                    rtlHelper.setWidth(this.width);
                    if (isHorizontal) {
                        if (i > 0 && x + width + padding > this.right) {
                            y = cursor.y += lineHeight;
                            cursor.line++;
                            x = cursor.x = _alignStartEnd(align, this.left + padding, this.right - lineWidths[cursor.line]);
                        }
                    } else if (i > 0 && y + lineHeight > this.bottom) {
                        x = cursor.x = x + columnSizes[cursor.line].width + padding;
                        cursor.line++;
                        y = cursor.y = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[cursor.line].height);
                    }
                    const realX = rtlHelper.x(x);
                    drawLegendBox(realX, y, legendItem);
                    x = _textX(textAlign, x + boxWidth + halfFontSize, isHorizontal ? x + width : this.right, opts.rtl);
                    fillText(rtlHelper.x(x), y, legendItem);
                    if (isHorizontal) cursor.x += width + padding; else cursor.y += lineHeight;
                }));
                restoreTextDirection(this.ctx, opts.textDirection);
            }
            drawTitle() {
                const opts = this.options;
                const titleOpts = opts.title;
                const titleFont = toFont(titleOpts.font);
                const titlePadding = toPadding(titleOpts.padding);
                if (!titleOpts.display) return;
                const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
                const ctx = this.ctx;
                const position = titleOpts.position;
                const halfFontSize = titleFont.size / 2;
                const topPaddingPlusHalfFontSize = titlePadding.top + halfFontSize;
                let y;
                let left = this.left;
                let maxWidth = this.width;
                if (this.isHorizontal()) {
                    maxWidth = Math.max(...this.lineWidths);
                    y = this.top + topPaddingPlusHalfFontSize;
                    left = _alignStartEnd(opts.align, left, this.right - maxWidth);
                } else {
                    const maxHeight = this.columnSizes.reduce(((acc, size) => Math.max(acc, size.height)), 0);
                    y = topPaddingPlusHalfFontSize + _alignStartEnd(opts.align, this.top, this.bottom - maxHeight - opts.labels.padding - this._computeTitleHeight());
                }
                const x = _alignStartEnd(position, left, left + maxWidth);
                ctx.textAlign = rtlHelper.textAlign(_toLeftRightCenter(position));
                ctx.textBaseline = "middle";
                ctx.strokeStyle = titleOpts.color;
                ctx.fillStyle = titleOpts.color;
                ctx.font = titleFont.string;
                renderText(ctx, titleOpts.text, x, y, titleFont);
            }
            _computeTitleHeight() {
                const titleOpts = this.options.title;
                const titleFont = toFont(titleOpts.font);
                const titlePadding = toPadding(titleOpts.padding);
                return titleOpts.display ? titleFont.lineHeight + titlePadding.height : 0;
            }
            _getLegendItemAt(x, y) {
                let i, hitBox, lh;
                if (_isBetween(x, this.left, this.right) && _isBetween(y, this.top, this.bottom)) {
                    lh = this.legendHitBoxes;
                    for (i = 0; i < lh.length; ++i) {
                        hitBox = lh[i];
                        if (_isBetween(x, hitBox.left, hitBox.left + hitBox.width) && _isBetween(y, hitBox.top, hitBox.top + hitBox.height)) return this.legendItems[i];
                    }
                }
                return null;
            }
            handleEvent(e) {
                const opts = this.options;
                if (!isListened(e.type, opts)) return;
                const hoveredItem = this._getLegendItemAt(e.x, e.y);
                if ("mousemove" === e.type) {
                    const previous = this._hoveredItem;
                    const sameItem = itemsEqual(previous, hoveredItem);
                    if (previous && !sameItem) callback(opts.onLeave, [ e, previous, this ], this);
                    this._hoveredItem = hoveredItem;
                    if (hoveredItem && !sameItem) callback(opts.onHover, [ e, hoveredItem, this ], this);
                } else if (hoveredItem) callback(opts.onClick, [ e, hoveredItem, this ], this);
            }
        }
        function isListened(type, opts) {
            if ("mousemove" === type && (opts.onHover || opts.onLeave)) return true;
            if (opts.onClick && ("click" === type || "mouseup" === type)) return true;
            return false;
        }
        var plugin_legend = {
            id: "legend",
            _element: Legend,
            start(chart, _args, options) {
                const legend = chart.legend = new Legend({
                    ctx: chart.ctx,
                    options,
                    chart
                });
                layouts.configure(chart, legend, options);
                layouts.addBox(chart, legend);
            },
            stop(chart) {
                layouts.removeBox(chart, chart.legend);
                delete chart.legend;
            },
            beforeUpdate(chart, _args, options) {
                const legend = chart.legend;
                layouts.configure(chart, legend, options);
                legend.options = options;
            },
            afterUpdate(chart) {
                const legend = chart.legend;
                legend.buildLabels();
                legend.adjustHitBoxes();
            },
            afterEvent(chart, args) {
                if (!args.replay) chart.legend.handleEvent(args.event);
            },
            defaults: {
                display: true,
                position: "top",
                align: "center",
                fullSize: true,
                reverse: false,
                weight: 1e3,
                onClick(e, legendItem, legend) {
                    const index = legendItem.datasetIndex;
                    const ci = legend.chart;
                    if (ci.isDatasetVisible(index)) {
                        ci.hide(index);
                        legendItem.hidden = true;
                    } else {
                        ci.show(index);
                        legendItem.hidden = false;
                    }
                },
                onHover: null,
                onLeave: null,
                labels: {
                    color: ctx => ctx.chart.options.color,
                    boxWidth: 40,
                    padding: 10,
                    generateLabels(chart) {
                        const datasets = chart.data.datasets;
                        const {labels: {usePointStyle, pointStyle, textAlign, color}} = chart.legend.options;
                        return chart._getSortedDatasetMetas().map((meta => {
                            const style = meta.controller.getStyle(usePointStyle ? 0 : void 0);
                            const borderWidth = toPadding(style.borderWidth);
                            return {
                                text: datasets[meta.index].label,
                                fillStyle: style.backgroundColor,
                                fontColor: color,
                                hidden: !meta.visible,
                                lineCap: style.borderCapStyle,
                                lineDash: style.borderDash,
                                lineDashOffset: style.borderDashOffset,
                                lineJoin: style.borderJoinStyle,
                                lineWidth: (borderWidth.width + borderWidth.height) / 4,
                                strokeStyle: style.borderColor,
                                pointStyle: pointStyle || style.pointStyle,
                                rotation: style.rotation,
                                textAlign: textAlign || style.textAlign,
                                borderRadius: 0,
                                datasetIndex: meta.index
                            };
                        }), this);
                    }
                },
                title: {
                    color: ctx => ctx.chart.options.color,
                    display: false,
                    position: "center",
                    text: ""
                }
            },
            descriptors: {
                _scriptable: name => !name.startsWith("on"),
                labels: {
                    _scriptable: name => ![ "generateLabels", "filter", "sort" ].includes(name)
                }
            }
        };
        class Title extends Element {
            constructor(config) {
                super();
                this.chart = config.chart;
                this.options = config.options;
                this.ctx = config.ctx;
                this._padding = void 0;
                this.top = void 0;
                this.bottom = void 0;
                this.left = void 0;
                this.right = void 0;
                this.width = void 0;
                this.height = void 0;
                this.position = void 0;
                this.weight = void 0;
                this.fullSize = void 0;
            }
            update(maxWidth, maxHeight) {
                const opts = this.options;
                this.left = 0;
                this.top = 0;
                if (!opts.display) {
                    this.width = this.height = this.right = this.bottom = 0;
                    return;
                }
                this.width = this.right = maxWidth;
                this.height = this.bottom = maxHeight;
                const lineCount = isArray(opts.text) ? opts.text.length : 1;
                this._padding = toPadding(opts.padding);
                const textSize = lineCount * toFont(opts.font).lineHeight + this._padding.height;
                if (this.isHorizontal()) this.height = textSize; else this.width = textSize;
            }
            isHorizontal() {
                const pos = this.options.position;
                return "top" === pos || "bottom" === pos;
            }
            _drawArgs(offset) {
                const {top, left, bottom, right, options} = this;
                const align = options.align;
                let rotation = 0;
                let maxWidth, titleX, titleY;
                if (this.isHorizontal()) {
                    titleX = _alignStartEnd(align, left, right);
                    titleY = top + offset;
                    maxWidth = right - left;
                } else {
                    if ("left" === options.position) {
                        titleX = left + offset;
                        titleY = _alignStartEnd(align, bottom, top);
                        rotation = -.5 * PI;
                    } else {
                        titleX = right - offset;
                        titleY = _alignStartEnd(align, top, bottom);
                        rotation = .5 * PI;
                    }
                    maxWidth = bottom - top;
                }
                return {
                    titleX,
                    titleY,
                    maxWidth,
                    rotation
                };
            }
            draw() {
                const ctx = this.ctx;
                const opts = this.options;
                if (!opts.display) return;
                const fontOpts = toFont(opts.font);
                const lineHeight = fontOpts.lineHeight;
                const offset = lineHeight / 2 + this._padding.top;
                const {titleX, titleY, maxWidth, rotation} = this._drawArgs(offset);
                renderText(ctx, opts.text, 0, 0, fontOpts, {
                    color: opts.color,
                    maxWidth,
                    rotation,
                    textAlign: _toLeftRightCenter(opts.align),
                    textBaseline: "middle",
                    translation: [ titleX, titleY ]
                });
            }
        }
        function createTitle(chart, titleOpts) {
            const title = new Title({
                ctx: chart.ctx,
                options: titleOpts,
                chart
            });
            layouts.configure(chart, title, titleOpts);
            layouts.addBox(chart, title);
            chart.titleBlock = title;
        }
        var plugin_title = {
            id: "title",
            _element: Title,
            start(chart, _args, options) {
                createTitle(chart, options);
            },
            stop(chart) {
                const titleBlock = chart.titleBlock;
                layouts.removeBox(chart, titleBlock);
                delete chart.titleBlock;
            },
            beforeUpdate(chart, _args, options) {
                const title = chart.titleBlock;
                layouts.configure(chart, title, options);
                title.options = options;
            },
            defaults: {
                align: "center",
                display: false,
                font: {
                    weight: "bold"
                },
                fullSize: true,
                padding: 10,
                position: "top",
                text: "",
                weight: 2e3
            },
            defaultRoutes: {
                color: "color"
            },
            descriptors: {
                _scriptable: true,
                _indexable: false
            }
        };
        const chart_esm_map = new WeakMap;
        var plugin_subtitle = {
            id: "subtitle",
            start(chart, _args, options) {
                const title = new Title({
                    ctx: chart.ctx,
                    options,
                    chart
                });
                layouts.configure(chart, title, options);
                layouts.addBox(chart, title);
                chart_esm_map.set(chart, title);
            },
            stop(chart) {
                layouts.removeBox(chart, chart_esm_map.get(chart));
                chart_esm_map.delete(chart);
            },
            beforeUpdate(chart, _args, options) {
                const title = chart_esm_map.get(chart);
                layouts.configure(chart, title, options);
                title.options = options;
            },
            defaults: {
                align: "center",
                display: false,
                font: {
                    weight: "normal"
                },
                fullSize: true,
                padding: 0,
                position: "top",
                text: "",
                weight: 1500
            },
            defaultRoutes: {
                color: "color"
            },
            descriptors: {
                _scriptable: true,
                _indexable: false
            }
        };
        const positioners = {
            average(items) {
                if (!items.length) return false;
                let i, len;
                let x = 0;
                let y = 0;
                let count = 0;
                for (i = 0, len = items.length; i < len; ++i) {
                    const el = items[i].element;
                    if (el && el.hasValue()) {
                        const pos = el.tooltipPosition();
                        x += pos.x;
                        y += pos.y;
                        ++count;
                    }
                }
                return {
                    x: x / count,
                    y: y / count
                };
            },
            nearest(items, eventPosition) {
                if (!items.length) return false;
                let x = eventPosition.x;
                let y = eventPosition.y;
                let minDistance = Number.POSITIVE_INFINITY;
                let i, len, nearestElement;
                for (i = 0, len = items.length; i < len; ++i) {
                    const el = items[i].element;
                    if (el && el.hasValue()) {
                        const center = el.getCenterPoint();
                        const d = distanceBetweenPoints(eventPosition, center);
                        if (d < minDistance) {
                            minDistance = d;
                            nearestElement = el;
                        }
                    }
                }
                if (nearestElement) {
                    const tp = nearestElement.tooltipPosition();
                    x = tp.x;
                    y = tp.y;
                }
                return {
                    x,
                    y
                };
            }
        };
        function pushOrConcat(base, toPush) {
            if (toPush) if (isArray(toPush)) Array.prototype.push.apply(base, toPush); else base.push(toPush);
            return base;
        }
        function splitNewlines(str) {
            if (("string" === typeof str || str instanceof String) && str.indexOf("\n") > -1) return str.split("\n");
            return str;
        }
        function createTooltipItem(chart, item) {
            const {element, datasetIndex, index} = item;
            const controller = chart.getDatasetMeta(datasetIndex).controller;
            const {label, value} = controller.getLabelAndValue(index);
            return {
                chart,
                label,
                parsed: controller.getParsed(index),
                raw: chart.data.datasets[datasetIndex].data[index],
                formattedValue: value,
                dataset: controller.getDataset(),
                dataIndex: index,
                datasetIndex,
                element
            };
        }
        function getTooltipSize(tooltip, options) {
            const ctx = tooltip.chart.ctx;
            const {body, footer, title} = tooltip;
            const {boxWidth, boxHeight} = options;
            const bodyFont = toFont(options.bodyFont);
            const titleFont = toFont(options.titleFont);
            const footerFont = toFont(options.footerFont);
            const titleLineCount = title.length;
            const footerLineCount = footer.length;
            const bodyLineItemCount = body.length;
            const padding = toPadding(options.padding);
            let height = padding.height;
            let width = 0;
            let combinedBodyLength = body.reduce(((count, bodyItem) => count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length), 0);
            combinedBodyLength += tooltip.beforeBody.length + tooltip.afterBody.length;
            if (titleLineCount) height += titleLineCount * titleFont.lineHeight + (titleLineCount - 1) * options.titleSpacing + options.titleMarginBottom;
            if (combinedBodyLength) {
                const bodyLineHeight = options.displayColors ? Math.max(boxHeight, bodyFont.lineHeight) : bodyFont.lineHeight;
                height += bodyLineItemCount * bodyLineHeight + (combinedBodyLength - bodyLineItemCount) * bodyFont.lineHeight + (combinedBodyLength - 1) * options.bodySpacing;
            }
            if (footerLineCount) height += options.footerMarginTop + footerLineCount * footerFont.lineHeight + (footerLineCount - 1) * options.footerSpacing;
            let widthPadding = 0;
            const maxLineWidth = function(line) {
                width = Math.max(width, ctx.measureText(line).width + widthPadding);
            };
            ctx.save();
            ctx.font = titleFont.string;
            helpers_segment_each(tooltip.title, maxLineWidth);
            ctx.font = bodyFont.string;
            helpers_segment_each(tooltip.beforeBody.concat(tooltip.afterBody), maxLineWidth);
            widthPadding = options.displayColors ? boxWidth + 2 + options.boxPadding : 0;
            helpers_segment_each(body, (bodyItem => {
                helpers_segment_each(bodyItem.before, maxLineWidth);
                helpers_segment_each(bodyItem.lines, maxLineWidth);
                helpers_segment_each(bodyItem.after, maxLineWidth);
            }));
            widthPadding = 0;
            ctx.font = footerFont.string;
            helpers_segment_each(tooltip.footer, maxLineWidth);
            ctx.restore();
            width += padding.width;
            return {
                width,
                height
            };
        }
        function determineYAlign(chart, size) {
            const {y, height} = size;
            if (y < height / 2) return "top"; else if (y > chart.height - height / 2) return "bottom";
            return "center";
        }
        function doesNotFitWithAlign(xAlign, chart, options, size) {
            const {x, width} = size;
            const caret = options.caretSize + options.caretPadding;
            if ("left" === xAlign && x + width + caret > chart.width) return true;
            if ("right" === xAlign && x - width - caret < 0) return true;
        }
        function determineXAlign(chart, options, size, yAlign) {
            const {x, width} = size;
            const {width: chartWidth, chartArea: {left, right}} = chart;
            let xAlign = "center";
            if ("center" === yAlign) xAlign = x <= (left + right) / 2 ? "left" : "right"; else if (x <= width / 2) xAlign = "left"; else if (x >= chartWidth - width / 2) xAlign = "right";
            if (doesNotFitWithAlign(xAlign, chart, options, size)) xAlign = "center";
            return xAlign;
        }
        function determineAlignment(chart, options, size) {
            const yAlign = size.yAlign || options.yAlign || determineYAlign(chart, size);
            return {
                xAlign: size.xAlign || options.xAlign || determineXAlign(chart, options, size, yAlign),
                yAlign
            };
        }
        function alignX(size, xAlign) {
            let {x, width} = size;
            if ("right" === xAlign) x -= width; else if ("center" === xAlign) x -= width / 2;
            return x;
        }
        function alignY(size, yAlign, paddingAndSize) {
            let {y, height} = size;
            if ("top" === yAlign) y += paddingAndSize; else if ("bottom" === yAlign) y -= height + paddingAndSize; else y -= height / 2;
            return y;
        }
        function getBackgroundPoint(options, size, alignment, chart) {
            const {caretSize, caretPadding, cornerRadius} = options;
            const {xAlign, yAlign} = alignment;
            const paddingAndSize = caretSize + caretPadding;
            const {topLeft, topRight, bottomLeft, bottomRight} = toTRBLCorners(cornerRadius);
            let x = alignX(size, xAlign);
            const y = alignY(size, yAlign, paddingAndSize);
            if ("center" === yAlign) {
                if ("left" === xAlign) x += paddingAndSize; else if ("right" === xAlign) x -= paddingAndSize;
            } else if ("left" === xAlign) x -= Math.max(topLeft, bottomLeft) + caretSize; else if ("right" === xAlign) x += Math.max(topRight, bottomRight) + caretSize;
            return {
                x: _limitValue(x, 0, chart.width - size.width),
                y: _limitValue(y, 0, chart.height - size.height)
            };
        }
        function getAlignedX(tooltip, align, options) {
            const padding = toPadding(options.padding);
            return "center" === align ? tooltip.x + tooltip.width / 2 : "right" === align ? tooltip.x + tooltip.width - padding.right : tooltip.x + padding.left;
        }
        function getBeforeAfterBodyLines(callback) {
            return pushOrConcat([], splitNewlines(callback));
        }
        function createTooltipContext(parent, tooltip, tooltipItems) {
            return createContext(parent, {
                tooltip,
                tooltipItems,
                type: "tooltip"
            });
        }
        function overrideCallbacks(callbacks, context) {
            const override = context && context.dataset && context.dataset.tooltip && context.dataset.tooltip.callbacks;
            return override ? callbacks.override(override) : callbacks;
        }
        class Tooltip extends Element {
            constructor(config) {
                super();
                this.opacity = 0;
                this._active = [];
                this._eventPosition = void 0;
                this._size = void 0;
                this._cachedAnimations = void 0;
                this._tooltipItems = [];
                this.$animations = void 0;
                this.$context = void 0;
                this.chart = config.chart || config._chart;
                this._chart = this.chart;
                this.options = config.options;
                this.dataPoints = void 0;
                this.title = void 0;
                this.beforeBody = void 0;
                this.body = void 0;
                this.afterBody = void 0;
                this.footer = void 0;
                this.xAlign = void 0;
                this.yAlign = void 0;
                this.x = void 0;
                this.y = void 0;
                this.height = void 0;
                this.width = void 0;
                this.caretX = void 0;
                this.caretY = void 0;
                this.labelColors = void 0;
                this.labelPointStyles = void 0;
                this.labelTextColors = void 0;
            }
            initialize(options) {
                this.options = options;
                this._cachedAnimations = void 0;
                this.$context = void 0;
            }
            _resolveAnimations() {
                const cached = this._cachedAnimations;
                if (cached) return cached;
                const chart = this.chart;
                const options = this.options.setContext(this.getContext());
                const opts = options.enabled && chart.options.animation && options.animations;
                const animations = new Animations(this.chart, opts);
                if (opts._cacheable) this._cachedAnimations = Object.freeze(animations);
                return animations;
            }
            getContext() {
                return this.$context || (this.$context = createTooltipContext(this.chart.getContext(), this, this._tooltipItems));
            }
            getTitle(context, options) {
                const {callbacks} = options;
                const beforeTitle = callbacks.beforeTitle.apply(this, [ context ]);
                const title = callbacks.title.apply(this, [ context ]);
                const afterTitle = callbacks.afterTitle.apply(this, [ context ]);
                let lines = [];
                lines = pushOrConcat(lines, splitNewlines(beforeTitle));
                lines = pushOrConcat(lines, splitNewlines(title));
                lines = pushOrConcat(lines, splitNewlines(afterTitle));
                return lines;
            }
            getBeforeBody(tooltipItems, options) {
                return getBeforeAfterBodyLines(options.callbacks.beforeBody.apply(this, [ tooltipItems ]));
            }
            getBody(tooltipItems, options) {
                const {callbacks} = options;
                const bodyItems = [];
                helpers_segment_each(tooltipItems, (context => {
                    const bodyItem = {
                        before: [],
                        lines: [],
                        after: []
                    };
                    const scoped = overrideCallbacks(callbacks, context);
                    pushOrConcat(bodyItem.before, splitNewlines(scoped.beforeLabel.call(this, context)));
                    pushOrConcat(bodyItem.lines, scoped.label.call(this, context));
                    pushOrConcat(bodyItem.after, splitNewlines(scoped.afterLabel.call(this, context)));
                    bodyItems.push(bodyItem);
                }));
                return bodyItems;
            }
            getAfterBody(tooltipItems, options) {
                return getBeforeAfterBodyLines(options.callbacks.afterBody.apply(this, [ tooltipItems ]));
            }
            getFooter(tooltipItems, options) {
                const {callbacks} = options;
                const beforeFooter = callbacks.beforeFooter.apply(this, [ tooltipItems ]);
                const footer = callbacks.footer.apply(this, [ tooltipItems ]);
                const afterFooter = callbacks.afterFooter.apply(this, [ tooltipItems ]);
                let lines = [];
                lines = pushOrConcat(lines, splitNewlines(beforeFooter));
                lines = pushOrConcat(lines, splitNewlines(footer));
                lines = pushOrConcat(lines, splitNewlines(afterFooter));
                return lines;
            }
            _createItems(options) {
                const active = this._active;
                const data = this.chart.data;
                const labelColors = [];
                const labelPointStyles = [];
                const labelTextColors = [];
                let tooltipItems = [];
                let i, len;
                for (i = 0, len = active.length; i < len; ++i) tooltipItems.push(createTooltipItem(this.chart, active[i]));
                if (options.filter) tooltipItems = tooltipItems.filter(((element, index, array) => options.filter(element, index, array, data)));
                if (options.itemSort) tooltipItems = tooltipItems.sort(((a, b) => options.itemSort(a, b, data)));
                helpers_segment_each(tooltipItems, (context => {
                    const scoped = overrideCallbacks(options.callbacks, context);
                    labelColors.push(scoped.labelColor.call(this, context));
                    labelPointStyles.push(scoped.labelPointStyle.call(this, context));
                    labelTextColors.push(scoped.labelTextColor.call(this, context));
                }));
                this.labelColors = labelColors;
                this.labelPointStyles = labelPointStyles;
                this.labelTextColors = labelTextColors;
                this.dataPoints = tooltipItems;
                return tooltipItems;
            }
            update(changed, replay) {
                const options = this.options.setContext(this.getContext());
                const active = this._active;
                let properties;
                let tooltipItems = [];
                if (!active.length) {
                    if (0 !== this.opacity) properties = {
                        opacity: 0
                    };
                } else {
                    const position = positioners[options.position].call(this, active, this._eventPosition);
                    tooltipItems = this._createItems(options);
                    this.title = this.getTitle(tooltipItems, options);
                    this.beforeBody = this.getBeforeBody(tooltipItems, options);
                    this.body = this.getBody(tooltipItems, options);
                    this.afterBody = this.getAfterBody(tooltipItems, options);
                    this.footer = this.getFooter(tooltipItems, options);
                    const size = this._size = getTooltipSize(this, options);
                    const positionAndSize = Object.assign({}, position, size);
                    const alignment = determineAlignment(this.chart, options, positionAndSize);
                    const backgroundPoint = getBackgroundPoint(options, positionAndSize, alignment, this.chart);
                    this.xAlign = alignment.xAlign;
                    this.yAlign = alignment.yAlign;
                    properties = {
                        opacity: 1,
                        x: backgroundPoint.x,
                        y: backgroundPoint.y,
                        width: size.width,
                        height: size.height,
                        caretX: position.x,
                        caretY: position.y
                    };
                }
                this._tooltipItems = tooltipItems;
                this.$context = void 0;
                if (properties) this._resolveAnimations().update(this, properties);
                if (changed && options.external) options.external.call(this, {
                    chart: this.chart,
                    tooltip: this,
                    replay
                });
            }
            drawCaret(tooltipPoint, ctx, size, options) {
                const caretPosition = this.getCaretPosition(tooltipPoint, size, options);
                ctx.lineTo(caretPosition.x1, caretPosition.y1);
                ctx.lineTo(caretPosition.x2, caretPosition.y2);
                ctx.lineTo(caretPosition.x3, caretPosition.y3);
            }
            getCaretPosition(tooltipPoint, size, options) {
                const {xAlign, yAlign} = this;
                const {caretSize, cornerRadius} = options;
                const {topLeft, topRight, bottomLeft, bottomRight} = toTRBLCorners(cornerRadius);
                const {x: ptX, y: ptY} = tooltipPoint;
                const {width, height} = size;
                let x1, x2, x3, y1, y2, y3;
                if ("center" === yAlign) {
                    y2 = ptY + height / 2;
                    if ("left" === xAlign) {
                        x1 = ptX;
                        x2 = x1 - caretSize;
                        y1 = y2 + caretSize;
                        y3 = y2 - caretSize;
                    } else {
                        x1 = ptX + width;
                        x2 = x1 + caretSize;
                        y1 = y2 - caretSize;
                        y3 = y2 + caretSize;
                    }
                    x3 = x1;
                } else {
                    if ("left" === xAlign) x2 = ptX + Math.max(topLeft, bottomLeft) + caretSize; else if ("right" === xAlign) x2 = ptX + width - Math.max(topRight, bottomRight) - caretSize; else x2 = this.caretX;
                    if ("top" === yAlign) {
                        y1 = ptY;
                        y2 = y1 - caretSize;
                        x1 = x2 - caretSize;
                        x3 = x2 + caretSize;
                    } else {
                        y1 = ptY + height;
                        y2 = y1 + caretSize;
                        x1 = x2 + caretSize;
                        x3 = x2 - caretSize;
                    }
                    y3 = y1;
                }
                return {
                    x1,
                    x2,
                    x3,
                    y1,
                    y2,
                    y3
                };
            }
            drawTitle(pt, ctx, options) {
                const title = this.title;
                const length = title.length;
                let titleFont, titleSpacing, i;
                if (length) {
                    const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
                    pt.x = getAlignedX(this, options.titleAlign, options);
                    ctx.textAlign = rtlHelper.textAlign(options.titleAlign);
                    ctx.textBaseline = "middle";
                    titleFont = toFont(options.titleFont);
                    titleSpacing = options.titleSpacing;
                    ctx.fillStyle = options.titleColor;
                    ctx.font = titleFont.string;
                    for (i = 0; i < length; ++i) {
                        ctx.fillText(title[i], rtlHelper.x(pt.x), pt.y + titleFont.lineHeight / 2);
                        pt.y += titleFont.lineHeight + titleSpacing;
                        if (i + 1 === length) pt.y += options.titleMarginBottom - titleSpacing;
                    }
                }
            }
            _drawColorBox(ctx, pt, i, rtlHelper, options) {
                const labelColors = this.labelColors[i];
                const labelPointStyle = this.labelPointStyles[i];
                const {boxHeight, boxWidth, boxPadding} = options;
                const bodyFont = toFont(options.bodyFont);
                const colorX = getAlignedX(this, "left", options);
                const rtlColorX = rtlHelper.x(colorX);
                const yOffSet = boxHeight < bodyFont.lineHeight ? (bodyFont.lineHeight - boxHeight) / 2 : 0;
                const colorY = pt.y + yOffSet;
                if (options.usePointStyle) {
                    const drawOptions = {
                        radius: Math.min(boxWidth, boxHeight) / 2,
                        pointStyle: labelPointStyle.pointStyle,
                        rotation: labelPointStyle.rotation,
                        borderWidth: 1
                    };
                    const centerX = rtlHelper.leftForLtr(rtlColorX, boxWidth) + boxWidth / 2;
                    const centerY = colorY + boxHeight / 2;
                    ctx.strokeStyle = options.multiKeyBackground;
                    ctx.fillStyle = options.multiKeyBackground;
                    drawPoint(ctx, drawOptions, centerX, centerY);
                    ctx.strokeStyle = labelColors.borderColor;
                    ctx.fillStyle = labelColors.backgroundColor;
                    drawPoint(ctx, drawOptions, centerX, centerY);
                } else {
                    ctx.lineWidth = labelColors.borderWidth || 1;
                    ctx.strokeStyle = labelColors.borderColor;
                    ctx.setLineDash(labelColors.borderDash || []);
                    ctx.lineDashOffset = labelColors.borderDashOffset || 0;
                    const outerX = rtlHelper.leftForLtr(rtlColorX, boxWidth - boxPadding);
                    const innerX = rtlHelper.leftForLtr(rtlHelper.xPlus(rtlColorX, 1), boxWidth - boxPadding - 2);
                    const borderRadius = toTRBLCorners(labelColors.borderRadius);
                    if (Object.values(borderRadius).some((v => 0 !== v))) {
                        ctx.beginPath();
                        ctx.fillStyle = options.multiKeyBackground;
                        addRoundedRectPath(ctx, {
                            x: outerX,
                            y: colorY,
                            w: boxWidth,
                            h: boxHeight,
                            radius: borderRadius
                        });
                        ctx.fill();
                        ctx.stroke();
                        ctx.fillStyle = labelColors.backgroundColor;
                        ctx.beginPath();
                        addRoundedRectPath(ctx, {
                            x: innerX,
                            y: colorY + 1,
                            w: boxWidth - 2,
                            h: boxHeight - 2,
                            radius: borderRadius
                        });
                        ctx.fill();
                    } else {
                        ctx.fillStyle = options.multiKeyBackground;
                        ctx.fillRect(outerX, colorY, boxWidth, boxHeight);
                        ctx.strokeRect(outerX, colorY, boxWidth, boxHeight);
                        ctx.fillStyle = labelColors.backgroundColor;
                        ctx.fillRect(innerX, colorY + 1, boxWidth - 2, boxHeight - 2);
                    }
                }
                ctx.fillStyle = this.labelTextColors[i];
            }
            drawBody(pt, ctx, options) {
                const {body} = this;
                const {bodySpacing, bodyAlign, displayColors, boxHeight, boxWidth, boxPadding} = options;
                const bodyFont = toFont(options.bodyFont);
                let bodyLineHeight = bodyFont.lineHeight;
                let xLinePadding = 0;
                const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
                const fillLineOfText = function(line) {
                    ctx.fillText(line, rtlHelper.x(pt.x + xLinePadding), pt.y + bodyLineHeight / 2);
                    pt.y += bodyLineHeight + bodySpacing;
                };
                const bodyAlignForCalculation = rtlHelper.textAlign(bodyAlign);
                let bodyItem, textColor, lines, i, j, ilen, jlen;
                ctx.textAlign = bodyAlign;
                ctx.textBaseline = "middle";
                ctx.font = bodyFont.string;
                pt.x = getAlignedX(this, bodyAlignForCalculation, options);
                ctx.fillStyle = options.bodyColor;
                helpers_segment_each(this.beforeBody, fillLineOfText);
                xLinePadding = displayColors && "right" !== bodyAlignForCalculation ? "center" === bodyAlign ? boxWidth / 2 + boxPadding : boxWidth + 2 + boxPadding : 0;
                for (i = 0, ilen = body.length; i < ilen; ++i) {
                    bodyItem = body[i];
                    textColor = this.labelTextColors[i];
                    ctx.fillStyle = textColor;
                    helpers_segment_each(bodyItem.before, fillLineOfText);
                    lines = bodyItem.lines;
                    if (displayColors && lines.length) {
                        this._drawColorBox(ctx, pt, i, rtlHelper, options);
                        bodyLineHeight = Math.max(bodyFont.lineHeight, boxHeight);
                    }
                    for (j = 0, jlen = lines.length; j < jlen; ++j) {
                        fillLineOfText(lines[j]);
                        bodyLineHeight = bodyFont.lineHeight;
                    }
                    helpers_segment_each(bodyItem.after, fillLineOfText);
                }
                xLinePadding = 0;
                bodyLineHeight = bodyFont.lineHeight;
                helpers_segment_each(this.afterBody, fillLineOfText);
                pt.y -= bodySpacing;
            }
            drawFooter(pt, ctx, options) {
                const footer = this.footer;
                const length = footer.length;
                let footerFont, i;
                if (length) {
                    const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
                    pt.x = getAlignedX(this, options.footerAlign, options);
                    pt.y += options.footerMarginTop;
                    ctx.textAlign = rtlHelper.textAlign(options.footerAlign);
                    ctx.textBaseline = "middle";
                    footerFont = toFont(options.footerFont);
                    ctx.fillStyle = options.footerColor;
                    ctx.font = footerFont.string;
                    for (i = 0; i < length; ++i) {
                        ctx.fillText(footer[i], rtlHelper.x(pt.x), pt.y + footerFont.lineHeight / 2);
                        pt.y += footerFont.lineHeight + options.footerSpacing;
                    }
                }
            }
            drawBackground(pt, ctx, tooltipSize, options) {
                const {xAlign, yAlign} = this;
                const {x, y} = pt;
                const {width, height} = tooltipSize;
                const {topLeft, topRight, bottomLeft, bottomRight} = toTRBLCorners(options.cornerRadius);
                ctx.fillStyle = options.backgroundColor;
                ctx.strokeStyle = options.borderColor;
                ctx.lineWidth = options.borderWidth;
                ctx.beginPath();
                ctx.moveTo(x + topLeft, y);
                if ("top" === yAlign) this.drawCaret(pt, ctx, tooltipSize, options);
                ctx.lineTo(x + width - topRight, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + topRight);
                if ("center" === yAlign && "right" === xAlign) this.drawCaret(pt, ctx, tooltipSize, options);
                ctx.lineTo(x + width, y + height - bottomRight);
                ctx.quadraticCurveTo(x + width, y + height, x + width - bottomRight, y + height);
                if ("bottom" === yAlign) this.drawCaret(pt, ctx, tooltipSize, options);
                ctx.lineTo(x + bottomLeft, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - bottomLeft);
                if ("center" === yAlign && "left" === xAlign) this.drawCaret(pt, ctx, tooltipSize, options);
                ctx.lineTo(x, y + topLeft);
                ctx.quadraticCurveTo(x, y, x + topLeft, y);
                ctx.closePath();
                ctx.fill();
                if (options.borderWidth > 0) ctx.stroke();
            }
            _updateAnimationTarget(options) {
                const chart = this.chart;
                const anims = this.$animations;
                const animX = anims && anims.x;
                const animY = anims && anims.y;
                if (animX || animY) {
                    const position = positioners[options.position].call(this, this._active, this._eventPosition);
                    if (!position) return;
                    const size = this._size = getTooltipSize(this, options);
                    const positionAndSize = Object.assign({}, position, this._size);
                    const alignment = determineAlignment(chart, options, positionAndSize);
                    const point = getBackgroundPoint(options, positionAndSize, alignment, chart);
                    if (animX._to !== point.x || animY._to !== point.y) {
                        this.xAlign = alignment.xAlign;
                        this.yAlign = alignment.yAlign;
                        this.width = size.width;
                        this.height = size.height;
                        this.caretX = position.x;
                        this.caretY = position.y;
                        this._resolveAnimations().update(this, point);
                    }
                }
            }
            draw(ctx) {
                const options = this.options.setContext(this.getContext());
                let opacity = this.opacity;
                if (!opacity) return;
                this._updateAnimationTarget(options);
                const tooltipSize = {
                    width: this.width,
                    height: this.height
                };
                const pt = {
                    x: this.x,
                    y: this.y
                };
                opacity = Math.abs(opacity) < .001 ? 0 : opacity;
                const padding = toPadding(options.padding);
                const hasTooltipContent = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
                if (options.enabled && hasTooltipContent) {
                    ctx.save();
                    ctx.globalAlpha = opacity;
                    this.drawBackground(pt, ctx, tooltipSize, options);
                    overrideTextDirection(ctx, options.textDirection);
                    pt.y += padding.top;
                    this.drawTitle(pt, ctx, options);
                    this.drawBody(pt, ctx, options);
                    this.drawFooter(pt, ctx, options);
                    restoreTextDirection(ctx, options.textDirection);
                    ctx.restore();
                }
            }
            getActiveElements() {
                return this._active || [];
            }
            setActiveElements(activeElements, eventPosition) {
                const lastActive = this._active;
                const active = activeElements.map((({datasetIndex, index}) => {
                    const meta = this.chart.getDatasetMeta(datasetIndex);
                    if (!meta) throw new Error("Cannot find a dataset at index " + datasetIndex);
                    return {
                        datasetIndex,
                        element: meta.data[index],
                        index
                    };
                }));
                const changed = !_elementsEqual(lastActive, active);
                const positionChanged = this._positionChanged(active, eventPosition);
                if (changed || positionChanged) {
                    this._active = active;
                    this._eventPosition = eventPosition;
                    this._ignoreReplayEvents = true;
                    this.update(true);
                }
            }
            handleEvent(e, replay, inChartArea = true) {
                if (replay && this._ignoreReplayEvents) return false;
                this._ignoreReplayEvents = false;
                const options = this.options;
                const lastActive = this._active || [];
                const active = this._getActiveElements(e, lastActive, replay, inChartArea);
                const positionChanged = this._positionChanged(active, e);
                const changed = replay || !_elementsEqual(active, lastActive) || positionChanged;
                if (changed) {
                    this._active = active;
                    if (options.enabled || options.external) {
                        this._eventPosition = {
                            x: e.x,
                            y: e.y
                        };
                        this.update(true, replay);
                    }
                }
                return changed;
            }
            _getActiveElements(e, lastActive, replay, inChartArea) {
                const options = this.options;
                if ("mouseout" === e.type) return [];
                if (!inChartArea) return lastActive;
                const active = this.chart.getElementsAtEventForMode(e, options.mode, options, replay);
                if (options.reverse) active.reverse();
                return active;
            }
            _positionChanged(active, e) {
                const {caretX, caretY, options} = this;
                const position = positioners[options.position].call(this, active, e);
                return false !== position && (caretX !== position.x || caretY !== position.y);
            }
        }
        Tooltip.positioners = positioners;
        var plugin_tooltip = {
            id: "tooltip",
            _element: Tooltip,
            positioners,
            afterInit(chart, _args, options) {
                if (options) chart.tooltip = new Tooltip({
                    chart,
                    options
                });
            },
            beforeUpdate(chart, _args, options) {
                if (chart.tooltip) chart.tooltip.initialize(options);
            },
            reset(chart, _args, options) {
                if (chart.tooltip) chart.tooltip.initialize(options);
            },
            afterDraw(chart) {
                const tooltip = chart.tooltip;
                const args = {
                    tooltip
                };
                if (false === chart.notifyPlugins("beforeTooltipDraw", args)) return;
                if (tooltip) tooltip.draw(chart.ctx);
                chart.notifyPlugins("afterTooltipDraw", args);
            },
            afterEvent(chart, args) {
                if (chart.tooltip) {
                    const useFinalPosition = args.replay;
                    if (chart.tooltip.handleEvent(args.event, useFinalPosition, args.inChartArea)) args.changed = true;
                }
            },
            defaults: {
                enabled: true,
                external: null,
                position: "average",
                backgroundColor: "rgba(0,0,0,0.8)",
                titleColor: "#fff",
                titleFont: {
                    weight: "bold"
                },
                titleSpacing: 2,
                titleMarginBottom: 6,
                titleAlign: "left",
                bodyColor: "#fff",
                bodySpacing: 2,
                bodyFont: {},
                bodyAlign: "left",
                footerColor: "#fff",
                footerSpacing: 2,
                footerMarginTop: 6,
                footerFont: {
                    weight: "bold"
                },
                footerAlign: "left",
                padding: 6,
                caretPadding: 2,
                caretSize: 5,
                cornerRadius: 6,
                boxHeight: (ctx, opts) => opts.bodyFont.size,
                boxWidth: (ctx, opts) => opts.bodyFont.size,
                multiKeyBackground: "#fff",
                displayColors: true,
                boxPadding: 0,
                borderColor: "rgba(0,0,0,0)",
                borderWidth: 0,
                animation: {
                    duration: 400,
                    easing: "easeOutQuart"
                },
                animations: {
                    numbers: {
                        type: "number",
                        properties: [ "x", "y", "width", "height", "caretX", "caretY" ]
                    },
                    opacity: {
                        easing: "linear",
                        duration: 200
                    }
                },
                callbacks: {
                    beforeTitle: noop,
                    title(tooltipItems) {
                        if (tooltipItems.length > 0) {
                            const item = tooltipItems[0];
                            const labels = item.chart.data.labels;
                            const labelCount = labels ? labels.length : 0;
                            if (this && this.options && "dataset" === this.options.mode) return item.dataset.label || ""; else if (item.label) return item.label; else if (labelCount > 0 && item.dataIndex < labelCount) return labels[item.dataIndex];
                        }
                        return "";
                    },
                    afterTitle: noop,
                    beforeBody: noop,
                    beforeLabel: noop,
                    label(tooltipItem) {
                        if (this && this.options && "dataset" === this.options.mode) return tooltipItem.label + ": " + tooltipItem.formattedValue || tooltipItem.formattedValue;
                        let label = tooltipItem.dataset.label || "";
                        if (label) label += ": ";
                        const value = tooltipItem.formattedValue;
                        if (!isNullOrUndef(value)) label += value;
                        return label;
                    },
                    labelColor(tooltipItem) {
                        const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
                        const options = meta.controller.getStyle(tooltipItem.dataIndex);
                        return {
                            borderColor: options.borderColor,
                            backgroundColor: options.backgroundColor,
                            borderWidth: options.borderWidth,
                            borderDash: options.borderDash,
                            borderDashOffset: options.borderDashOffset,
                            borderRadius: 0
                        };
                    },
                    labelTextColor() {
                        return this.options.bodyColor;
                    },
                    labelPointStyle(tooltipItem) {
                        const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
                        const options = meta.controller.getStyle(tooltipItem.dataIndex);
                        return {
                            pointStyle: options.pointStyle,
                            rotation: options.rotation
                        };
                    },
                    afterLabel: noop,
                    afterBody: noop,
                    beforeFooter: noop,
                    footer: noop,
                    afterFooter: noop
                }
            },
            defaultRoutes: {
                bodyFont: "font",
                footerFont: "font",
                titleFont: "font"
            },
            descriptors: {
                _scriptable: name => "filter" !== name && "itemSort" !== name && "external" !== name,
                _indexable: false,
                callbacks: {
                    _scriptable: false,
                    _indexable: false
                },
                animation: {
                    _fallback: false
                },
                animations: {
                    _fallback: "animation"
                }
            },
            additionalOptionScopes: [ "interaction" ]
        };
        const addIfString = (labels, raw, index, addedLabels) => {
            if ("string" === typeof raw) {
                index = labels.push(raw) - 1;
                addedLabels.unshift({
                    index,
                    label: raw
                });
            } else if (isNaN(raw)) index = null;
            return index;
        };
        function findOrAddLabel(labels, raw, index, addedLabels) {
            const first = labels.indexOf(raw);
            if (-1 === first) return addIfString(labels, raw, index, addedLabels);
            const last = labels.lastIndexOf(raw);
            return first !== last ? index : first;
        }
        const validIndex = (index, max) => null === index ? null : _limitValue(Math.round(index), 0, max);
        class CategoryScale extends Scale {
            constructor(cfg) {
                super(cfg);
                this._startValue = void 0;
                this._valueRange = 0;
                this._addedLabels = [];
            }
            init(scaleOptions) {
                const added = this._addedLabels;
                if (added.length) {
                    const labels = this.getLabels();
                    for (const {index, label} of added) if (labels[index] === label) labels.splice(index, 1);
                    this._addedLabels = [];
                }
                super.init(scaleOptions);
            }
            parse(raw, index) {
                if (isNullOrUndef(raw)) return null;
                const labels = this.getLabels();
                index = isFinite(index) && labels[index] === raw ? index : findOrAddLabel(labels, raw, valueOrDefault(index, raw), this._addedLabels);
                return validIndex(index, labels.length - 1);
            }
            determineDataLimits() {
                const {minDefined, maxDefined} = this.getUserBounds();
                let {min, max} = this.getMinMax(true);
                if ("ticks" === this.options.bounds) {
                    if (!minDefined) min = 0;
                    if (!maxDefined) max = this.getLabels().length - 1;
                }
                this.min = min;
                this.max = max;
            }
            buildTicks() {
                const min = this.min;
                const max = this.max;
                const offset = this.options.offset;
                const ticks = [];
                let labels = this.getLabels();
                labels = 0 === min && max === labels.length - 1 ? labels : labels.slice(min, max + 1);
                this._valueRange = Math.max(labels.length - (offset ? 0 : 1), 1);
                this._startValue = this.min - (offset ? .5 : 0);
                for (let value = min; value <= max; value++) ticks.push({
                    value
                });
                return ticks;
            }
            getLabelForValue(value) {
                const labels = this.getLabels();
                if (value >= 0 && value < labels.length) return labels[value];
                return value;
            }
            configure() {
                super.configure();
                if (!this.isHorizontal()) this._reversePixels = !this._reversePixels;
            }
            getPixelForValue(value) {
                if ("number" !== typeof value) value = this.parse(value);
                return null === value ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
            }
            getPixelForTick(index) {
                const ticks = this.ticks;
                if (index < 0 || index > ticks.length - 1) return null;
                return this.getPixelForValue(ticks[index].value);
            }
            getValueForPixel(pixel) {
                return Math.round(this._startValue + this.getDecimalForPixel(pixel) * this._valueRange);
            }
            getBasePixel() {
                return this.bottom;
            }
        }
        CategoryScale.id = "category";
        CategoryScale.defaults = {
            ticks: {
                callback: CategoryScale.prototype.getLabelForValue
            }
        };
        function generateTicks$1(generationOptions, dataRange) {
            const ticks = [];
            const MIN_SPACING = 1e-14;
            const {bounds, step, min, max, precision, count, maxTicks, maxDigits, includeBounds} = generationOptions;
            const unit = step || 1;
            const maxSpaces = maxTicks - 1;
            const {min: rmin, max: rmax} = dataRange;
            const minDefined = !isNullOrUndef(min);
            const maxDefined = !isNullOrUndef(max);
            const countDefined = !isNullOrUndef(count);
            const minSpacing = (rmax - rmin) / (maxDigits + 1);
            let spacing = niceNum((rmax - rmin) / maxSpaces / unit) * unit;
            let factor, niceMin, niceMax, numSpaces;
            if (spacing < MIN_SPACING && !minDefined && !maxDefined) return [ {
                value: rmin
            }, {
                value: rmax
            } ];
            numSpaces = Math.ceil(rmax / spacing) - Math.floor(rmin / spacing);
            if (numSpaces > maxSpaces) spacing = niceNum(numSpaces * spacing / maxSpaces / unit) * unit;
            if (!isNullOrUndef(precision)) {
                factor = Math.pow(10, precision);
                spacing = Math.ceil(spacing * factor) / factor;
            }
            if ("ticks" === bounds) {
                niceMin = Math.floor(rmin / spacing) * spacing;
                niceMax = Math.ceil(rmax / spacing) * spacing;
            } else {
                niceMin = rmin;
                niceMax = rmax;
            }
            if (minDefined && maxDefined && step && almostWhole((max - min) / step, spacing / 1e3)) {
                numSpaces = Math.round(Math.min((max - min) / spacing, maxTicks));
                spacing = (max - min) / numSpaces;
                niceMin = min;
                niceMax = max;
            } else if (countDefined) {
                niceMin = minDefined ? min : niceMin;
                niceMax = maxDefined ? max : niceMax;
                numSpaces = count - 1;
                spacing = (niceMax - niceMin) / numSpaces;
            } else {
                numSpaces = (niceMax - niceMin) / spacing;
                if (almostEquals(numSpaces, Math.round(numSpaces), spacing / 1e3)) numSpaces = Math.round(numSpaces); else numSpaces = Math.ceil(numSpaces);
            }
            const decimalPlaces = Math.max(_decimalPlaces(spacing), _decimalPlaces(niceMin));
            factor = Math.pow(10, isNullOrUndef(precision) ? decimalPlaces : precision);
            niceMin = Math.round(niceMin * factor) / factor;
            niceMax = Math.round(niceMax * factor) / factor;
            let j = 0;
            if (minDefined) if (includeBounds && niceMin !== min) {
                ticks.push({
                    value: min
                });
                if (niceMin < min) j++;
                if (almostEquals(Math.round((niceMin + j * spacing) * factor) / factor, min, relativeLabelSize(min, minSpacing, generationOptions))) j++;
            } else if (niceMin < min) j++;
            for (;j < numSpaces; ++j) ticks.push({
                value: Math.round((niceMin + j * spacing) * factor) / factor
            });
            if (maxDefined && includeBounds && niceMax !== max) if (ticks.length && almostEquals(ticks[ticks.length - 1].value, max, relativeLabelSize(max, minSpacing, generationOptions))) ticks[ticks.length - 1].value = max; else ticks.push({
                value: max
            }); else if (!maxDefined || niceMax === max) ticks.push({
                value: niceMax
            });
            return ticks;
        }
        function relativeLabelSize(value, minSpacing, {horizontal, minRotation}) {
            const rad = toRadians(minRotation);
            const ratio = (horizontal ? Math.sin(rad) : Math.cos(rad)) || .001;
            const length = .75 * minSpacing * ("" + value).length;
            return Math.min(minSpacing / ratio, length);
        }
        class LinearScaleBase extends Scale {
            constructor(cfg) {
                super(cfg);
                this.start = void 0;
                this.end = void 0;
                this._startValue = void 0;
                this._endValue = void 0;
                this._valueRange = 0;
            }
            parse(raw, index) {
                if (isNullOrUndef(raw)) return null;
                if (("number" === typeof raw || raw instanceof Number) && !isFinite(+raw)) return null;
                return +raw;
            }
            handleTickRangeOptions() {
                const {beginAtZero} = this.options;
                const {minDefined, maxDefined} = this.getUserBounds();
                let {min, max} = this;
                const setMin = v => min = minDefined ? min : v;
                const setMax = v => max = maxDefined ? max : v;
                if (beginAtZero) {
                    const minSign = sign(min);
                    const maxSign = sign(max);
                    if (minSign < 0 && maxSign < 0) setMax(0); else if (minSign > 0 && maxSign > 0) setMin(0);
                }
                if (min === max) {
                    let offset = 1;
                    if (max >= Number.MAX_SAFE_INTEGER || min <= Number.MIN_SAFE_INTEGER) offset = Math.abs(.05 * max);
                    setMax(max + offset);
                    if (!beginAtZero) setMin(min - offset);
                }
                this.min = min;
                this.max = max;
            }
            getTickLimit() {
                const tickOpts = this.options.ticks;
                let {maxTicksLimit, stepSize} = tickOpts;
                let maxTicks;
                if (stepSize) {
                    maxTicks = Math.ceil(this.max / stepSize) - Math.floor(this.min / stepSize) + 1;
                    if (maxTicks > 1e3) {
                        console.warn(`scales.${this.id}.ticks.stepSize: ${stepSize} would result generating up to ${maxTicks} ticks. Limiting to 1000.`);
                        maxTicks = 1e3;
                    }
                } else {
                    maxTicks = this.computeTickLimit();
                    maxTicksLimit = maxTicksLimit || 11;
                }
                if (maxTicksLimit) maxTicks = Math.min(maxTicksLimit, maxTicks);
                return maxTicks;
            }
            computeTickLimit() {
                return Number.POSITIVE_INFINITY;
            }
            buildTicks() {
                const opts = this.options;
                const tickOpts = opts.ticks;
                let maxTicks = this.getTickLimit();
                maxTicks = Math.max(2, maxTicks);
                const numericGeneratorOptions = {
                    maxTicks,
                    bounds: opts.bounds,
                    min: opts.min,
                    max: opts.max,
                    precision: tickOpts.precision,
                    step: tickOpts.stepSize,
                    count: tickOpts.count,
                    maxDigits: this._maxDigits(),
                    horizontal: this.isHorizontal(),
                    minRotation: tickOpts.minRotation || 0,
                    includeBounds: false !== tickOpts.includeBounds
                };
                const dataRange = this._range || this;
                const ticks = generateTicks$1(numericGeneratorOptions, dataRange);
                if ("ticks" === opts.bounds) _setMinAndMaxByKey(ticks, this, "value");
                if (opts.reverse) {
                    ticks.reverse();
                    this.start = this.max;
                    this.end = this.min;
                } else {
                    this.start = this.min;
                    this.end = this.max;
                }
                return ticks;
            }
            configure() {
                const ticks = this.ticks;
                let start = this.min;
                let end = this.max;
                super.configure();
                if (this.options.offset && ticks.length) {
                    const offset = (end - start) / Math.max(ticks.length - 1, 1) / 2;
                    start -= offset;
                    end += offset;
                }
                this._startValue = start;
                this._endValue = end;
                this._valueRange = end - start;
            }
            getLabelForValue(value) {
                return formatNumber(value, this.chart.options.locale, this.options.ticks.format);
            }
        }
        class LinearScale extends LinearScaleBase {
            determineDataLimits() {
                const {min, max} = this.getMinMax(true);
                this.min = isNumberFinite(min) ? min : 0;
                this.max = isNumberFinite(max) ? max : 1;
                this.handleTickRangeOptions();
            }
            computeTickLimit() {
                const horizontal = this.isHorizontal();
                const length = horizontal ? this.width : this.height;
                const minRotation = toRadians(this.options.ticks.minRotation);
                const ratio = (horizontal ? Math.sin(minRotation) : Math.cos(minRotation)) || .001;
                const tickFont = this._resolveTickFontOptions(0);
                return Math.ceil(length / Math.min(40, tickFont.lineHeight / ratio));
            }
            getPixelForValue(value) {
                return null === value ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
            }
            getValueForPixel(pixel) {
                return this._startValue + this.getDecimalForPixel(pixel) * this._valueRange;
            }
        }
        LinearScale.id = "linear";
        LinearScale.defaults = {
            ticks: {
                callback: Ticks.formatters.numeric
            }
        };
        function isMajor(tickVal) {
            const remain = tickVal / Math.pow(10, Math.floor(log10(tickVal)));
            return 1 === remain;
        }
        function generateTicks(generationOptions, dataRange) {
            const endExp = Math.floor(log10(dataRange.max));
            const endSignificand = Math.ceil(dataRange.max / Math.pow(10, endExp));
            const ticks = [];
            let tickVal = finiteOrDefault(generationOptions.min, Math.pow(10, Math.floor(log10(dataRange.min))));
            let exp = Math.floor(log10(tickVal));
            let significand = Math.floor(tickVal / Math.pow(10, exp));
            let precision = exp < 0 ? Math.pow(10, Math.abs(exp)) : 1;
            do {
                ticks.push({
                    value: tickVal,
                    major: isMajor(tickVal)
                });
                ++significand;
                if (10 === significand) {
                    significand = 1;
                    ++exp;
                    precision = exp >= 0 ? 1 : precision;
                }
                tickVal = Math.round(significand * Math.pow(10, exp) * precision) / precision;
            } while (exp < endExp || exp === endExp && significand < endSignificand);
            const lastTick = finiteOrDefault(generationOptions.max, tickVal);
            ticks.push({
                value: lastTick,
                major: isMajor(tickVal)
            });
            return ticks;
        }
        class LogarithmicScale extends Scale {
            constructor(cfg) {
                super(cfg);
                this.start = void 0;
                this.end = void 0;
                this._startValue = void 0;
                this._valueRange = 0;
            }
            parse(raw, index) {
                const value = LinearScaleBase.prototype.parse.apply(this, [ raw, index ]);
                if (0 === value) {
                    this._zero = true;
                    return;
                }
                return isNumberFinite(value) && value > 0 ? value : null;
            }
            determineDataLimits() {
                const {min, max} = this.getMinMax(true);
                this.min = isNumberFinite(min) ? Math.max(0, min) : null;
                this.max = isNumberFinite(max) ? Math.max(0, max) : null;
                if (this.options.beginAtZero) this._zero = true;
                this.handleTickRangeOptions();
            }
            handleTickRangeOptions() {
                const {minDefined, maxDefined} = this.getUserBounds();
                let min = this.min;
                let max = this.max;
                const setMin = v => min = minDefined ? min : v;
                const setMax = v => max = maxDefined ? max : v;
                const exp = (v, m) => Math.pow(10, Math.floor(log10(v)) + m);
                if (min === max) if (min <= 0) {
                    setMin(1);
                    setMax(10);
                } else {
                    setMin(exp(min, -1));
                    setMax(exp(max, +1));
                }
                if (min <= 0) setMin(exp(max, -1));
                if (max <= 0) setMax(exp(min, +1));
                if (this._zero && this.min !== this._suggestedMin && min === exp(this.min, 0)) setMin(exp(min, -1));
                this.min = min;
                this.max = max;
            }
            buildTicks() {
                const opts = this.options;
                const generationOptions = {
                    min: this._userMin,
                    max: this._userMax
                };
                const ticks = generateTicks(generationOptions, this);
                if ("ticks" === opts.bounds) _setMinAndMaxByKey(ticks, this, "value");
                if (opts.reverse) {
                    ticks.reverse();
                    this.start = this.max;
                    this.end = this.min;
                } else {
                    this.start = this.min;
                    this.end = this.max;
                }
                return ticks;
            }
            getLabelForValue(value) {
                return void 0 === value ? "0" : formatNumber(value, this.chart.options.locale, this.options.ticks.format);
            }
            configure() {
                const start = this.min;
                super.configure();
                this._startValue = log10(start);
                this._valueRange = log10(this.max) - log10(start);
            }
            getPixelForValue(value) {
                if (void 0 === value || 0 === value) value = this.min;
                if (null === value || isNaN(value)) return NaN;
                return this.getPixelForDecimal(value === this.min ? 0 : (log10(value) - this._startValue) / this._valueRange);
            }
            getValueForPixel(pixel) {
                const decimal = this.getDecimalForPixel(pixel);
                return Math.pow(10, this._startValue + decimal * this._valueRange);
            }
        }
        LogarithmicScale.id = "logarithmic";
        LogarithmicScale.defaults = {
            ticks: {
                callback: Ticks.formatters.logarithmic,
                major: {
                    enabled: true
                }
            }
        };
        function getTickBackdropHeight(opts) {
            const tickOpts = opts.ticks;
            if (tickOpts.display && opts.display) {
                const padding = toPadding(tickOpts.backdropPadding);
                return valueOrDefault(tickOpts.font && tickOpts.font.size, helpers_segment_defaults.font.size) + padding.height;
            }
            return 0;
        }
        function measureLabelSize(ctx, font, label) {
            label = isArray(label) ? label : [ label ];
            return {
                w: _longestText(ctx, font.string, label),
                h: label.length * font.lineHeight
            };
        }
        function determineLimits(angle, pos, size, min, max) {
            if (angle === min || angle === max) return {
                start: pos - size / 2,
                end: pos + size / 2
            }; else if (angle < min || angle > max) return {
                start: pos - size,
                end: pos
            };
            return {
                start: pos,
                end: pos + size
            };
        }
        function fitWithPointLabels(scale) {
            const orig = {
                l: scale.left + scale._padding.left,
                r: scale.right - scale._padding.right,
                t: scale.top + scale._padding.top,
                b: scale.bottom - scale._padding.bottom
            };
            const limits = Object.assign({}, orig);
            const labelSizes = [];
            const padding = [];
            const valueCount = scale._pointLabels.length;
            const pointLabelOpts = scale.options.pointLabels;
            const additionalAngle = pointLabelOpts.centerPointLabels ? PI / valueCount : 0;
            for (let i = 0; i < valueCount; i++) {
                const opts = pointLabelOpts.setContext(scale.getPointLabelContext(i));
                padding[i] = opts.padding;
                const pointPosition = scale.getPointPosition(i, scale.drawingArea + padding[i], additionalAngle);
                const plFont = toFont(opts.font);
                const textSize = measureLabelSize(scale.ctx, plFont, scale._pointLabels[i]);
                labelSizes[i] = textSize;
                const angleRadians = _normalizeAngle(scale.getIndexAngle(i) + additionalAngle);
                const angle = Math.round(toDegrees(angleRadians));
                const hLimits = determineLimits(angle, pointPosition.x, textSize.w, 0, 180);
                const vLimits = determineLimits(angle, pointPosition.y, textSize.h, 90, 270);
                updateLimits(limits, orig, angleRadians, hLimits, vLimits);
            }
            scale.setCenterPoint(orig.l - limits.l, limits.r - orig.r, orig.t - limits.t, limits.b - orig.b);
            scale._pointLabelItems = buildPointLabelItems(scale, labelSizes, padding);
        }
        function updateLimits(limits, orig, angle, hLimits, vLimits) {
            const sin = Math.abs(Math.sin(angle));
            const cos = Math.abs(Math.cos(angle));
            let x = 0;
            let y = 0;
            if (hLimits.start < orig.l) {
                x = (orig.l - hLimits.start) / sin;
                limits.l = Math.min(limits.l, orig.l - x);
            } else if (hLimits.end > orig.r) {
                x = (hLimits.end - orig.r) / sin;
                limits.r = Math.max(limits.r, orig.r + x);
            }
            if (vLimits.start < orig.t) {
                y = (orig.t - vLimits.start) / cos;
                limits.t = Math.min(limits.t, orig.t - y);
            } else if (vLimits.end > orig.b) {
                y = (vLimits.end - orig.b) / cos;
                limits.b = Math.max(limits.b, orig.b + y);
            }
        }
        function buildPointLabelItems(scale, labelSizes, padding) {
            const items = [];
            const valueCount = scale._pointLabels.length;
            const opts = scale.options;
            const extra = getTickBackdropHeight(opts) / 2;
            const outerDistance = scale.drawingArea;
            const additionalAngle = opts.pointLabels.centerPointLabels ? PI / valueCount : 0;
            for (let i = 0; i < valueCount; i++) {
                const pointLabelPosition = scale.getPointPosition(i, outerDistance + extra + padding[i], additionalAngle);
                const angle = Math.round(toDegrees(_normalizeAngle(pointLabelPosition.angle + HALF_PI)));
                const size = labelSizes[i];
                const y = yForAngle(pointLabelPosition.y, size.h, angle);
                const textAlign = getTextAlignForAngle(angle);
                const left = leftForTextAlign(pointLabelPosition.x, size.w, textAlign);
                items.push({
                    x: pointLabelPosition.x,
                    y,
                    textAlign,
                    left,
                    top: y,
                    right: left + size.w,
                    bottom: y + size.h
                });
            }
            return items;
        }
        function getTextAlignForAngle(angle) {
            if (0 === angle || 180 === angle) return "center"; else if (angle < 180) return "left";
            return "right";
        }
        function leftForTextAlign(x, w, align) {
            if ("right" === align) x -= w; else if ("center" === align) x -= w / 2;
            return x;
        }
        function yForAngle(y, h, angle) {
            if (90 === angle || 270 === angle) y -= h / 2; else if (angle > 270 || angle < 90) y -= h;
            return y;
        }
        function drawPointLabels(scale, labelCount) {
            const {ctx, options: {pointLabels}} = scale;
            for (let i = labelCount - 1; i >= 0; i--) {
                const optsAtIndex = pointLabels.setContext(scale.getPointLabelContext(i));
                const plFont = toFont(optsAtIndex.font);
                const {x, y, textAlign, left, top, right, bottom} = scale._pointLabelItems[i];
                const {backdropColor} = optsAtIndex;
                if (!isNullOrUndef(backdropColor)) {
                    const padding = toPadding(optsAtIndex.backdropPadding);
                    ctx.fillStyle = backdropColor;
                    ctx.fillRect(left - padding.left, top - padding.top, right - left + padding.width, bottom - top + padding.height);
                }
                renderText(ctx, scale._pointLabels[i], x, y + plFont.lineHeight / 2, plFont, {
                    color: optsAtIndex.color,
                    textAlign,
                    textBaseline: "middle"
                });
            }
        }
        function pathRadiusLine(scale, radius, circular, labelCount) {
            const {ctx} = scale;
            if (circular) ctx.arc(scale.xCenter, scale.yCenter, radius, 0, TAU); else {
                let pointPosition = scale.getPointPosition(0, radius);
                ctx.moveTo(pointPosition.x, pointPosition.y);
                for (let i = 1; i < labelCount; i++) {
                    pointPosition = scale.getPointPosition(i, radius);
                    ctx.lineTo(pointPosition.x, pointPosition.y);
                }
            }
        }
        function drawRadiusLine(scale, gridLineOpts, radius, labelCount) {
            const ctx = scale.ctx;
            const circular = gridLineOpts.circular;
            const {color, lineWidth} = gridLineOpts;
            if (!circular && !labelCount || !color || !lineWidth || radius < 0) return;
            ctx.save();
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            ctx.setLineDash(gridLineOpts.borderDash);
            ctx.lineDashOffset = gridLineOpts.borderDashOffset;
            ctx.beginPath();
            pathRadiusLine(scale, radius, circular, labelCount);
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        }
        function createPointLabelContext(parent, index, label) {
            return createContext(parent, {
                label,
                index,
                type: "pointLabel"
            });
        }
        class RadialLinearScale extends LinearScaleBase {
            constructor(cfg) {
                super(cfg);
                this.xCenter = void 0;
                this.yCenter = void 0;
                this.drawingArea = void 0;
                this._pointLabels = [];
                this._pointLabelItems = [];
            }
            setDimensions() {
                const padding = this._padding = toPadding(getTickBackdropHeight(this.options) / 2);
                const w = this.width = this.maxWidth - padding.width;
                const h = this.height = this.maxHeight - padding.height;
                this.xCenter = Math.floor(this.left + w / 2 + padding.left);
                this.yCenter = Math.floor(this.top + h / 2 + padding.top);
                this.drawingArea = Math.floor(Math.min(w, h) / 2);
            }
            determineDataLimits() {
                const {min, max} = this.getMinMax(false);
                this.min = isNumberFinite(min) && !isNaN(min) ? min : 0;
                this.max = isNumberFinite(max) && !isNaN(max) ? max : 0;
                this.handleTickRangeOptions();
            }
            computeTickLimit() {
                return Math.ceil(this.drawingArea / getTickBackdropHeight(this.options));
            }
            generateTickLabels(ticks) {
                LinearScaleBase.prototype.generateTickLabels.call(this, ticks);
                this._pointLabels = this.getLabels().map(((value, index) => {
                    const label = callback(this.options.pointLabels.callback, [ value, index ], this);
                    return label || 0 === label ? label : "";
                })).filter(((v, i) => this.chart.getDataVisibility(i)));
            }
            fit() {
                const opts = this.options;
                if (opts.display && opts.pointLabels.display) fitWithPointLabels(this); else this.setCenterPoint(0, 0, 0, 0);
            }
            setCenterPoint(leftMovement, rightMovement, topMovement, bottomMovement) {
                this.xCenter += Math.floor((leftMovement - rightMovement) / 2);
                this.yCenter += Math.floor((topMovement - bottomMovement) / 2);
                this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(leftMovement, rightMovement, topMovement, bottomMovement));
            }
            getIndexAngle(index) {
                const angleMultiplier = TAU / (this._pointLabels.length || 1);
                const startAngle = this.options.startAngle || 0;
                return _normalizeAngle(index * angleMultiplier + toRadians(startAngle));
            }
            getDistanceFromCenterForValue(value) {
                if (isNullOrUndef(value)) return NaN;
                const scalingFactor = this.drawingArea / (this.max - this.min);
                if (this.options.reverse) return (this.max - value) * scalingFactor;
                return (value - this.min) * scalingFactor;
            }
            getValueForDistanceFromCenter(distance) {
                if (isNullOrUndef(distance)) return NaN;
                const scaledDistance = distance / (this.drawingArea / (this.max - this.min));
                return this.options.reverse ? this.max - scaledDistance : this.min + scaledDistance;
            }
            getPointLabelContext(index) {
                const pointLabels = this._pointLabels || [];
                if (index >= 0 && index < pointLabels.length) {
                    const pointLabel = pointLabels[index];
                    return createPointLabelContext(this.getContext(), index, pointLabel);
                }
            }
            getPointPosition(index, distanceFromCenter, additionalAngle = 0) {
                const angle = this.getIndexAngle(index) - HALF_PI + additionalAngle;
                return {
                    x: Math.cos(angle) * distanceFromCenter + this.xCenter,
                    y: Math.sin(angle) * distanceFromCenter + this.yCenter,
                    angle
                };
            }
            getPointPositionForValue(index, value) {
                return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
            }
            getBasePosition(index) {
                return this.getPointPositionForValue(index || 0, this.getBaseValue());
            }
            getPointLabelPosition(index) {
                const {left, top, right, bottom} = this._pointLabelItems[index];
                return {
                    left,
                    top,
                    right,
                    bottom
                };
            }
            drawBackground() {
                const {backgroundColor, grid: {circular}} = this.options;
                if (backgroundColor) {
                    const ctx = this.ctx;
                    ctx.save();
                    ctx.beginPath();
                    pathRadiusLine(this, this.getDistanceFromCenterForValue(this._endValue), circular, this._pointLabels.length);
                    ctx.closePath();
                    ctx.fillStyle = backgroundColor;
                    ctx.fill();
                    ctx.restore();
                }
            }
            drawGrid() {
                const ctx = this.ctx;
                const opts = this.options;
                const {angleLines, grid} = opts;
                const labelCount = this._pointLabels.length;
                let i, offset, position;
                if (opts.pointLabels.display) drawPointLabels(this, labelCount);
                if (grid.display) this.ticks.forEach(((tick, index) => {
                    if (0 !== index) {
                        offset = this.getDistanceFromCenterForValue(tick.value);
                        const optsAtIndex = grid.setContext(this.getContext(index - 1));
                        drawRadiusLine(this, optsAtIndex, offset, labelCount);
                    }
                }));
                if (angleLines.display) {
                    ctx.save();
                    for (i = labelCount - 1; i >= 0; i--) {
                        const optsAtIndex = angleLines.setContext(this.getPointLabelContext(i));
                        const {color, lineWidth} = optsAtIndex;
                        if (!lineWidth || !color) continue;
                        ctx.lineWidth = lineWidth;
                        ctx.strokeStyle = color;
                        ctx.setLineDash(optsAtIndex.borderDash);
                        ctx.lineDashOffset = optsAtIndex.borderDashOffset;
                        offset = this.getDistanceFromCenterForValue(opts.ticks.reverse ? this.min : this.max);
                        position = this.getPointPosition(i, offset);
                        ctx.beginPath();
                        ctx.moveTo(this.xCenter, this.yCenter);
                        ctx.lineTo(position.x, position.y);
                        ctx.stroke();
                    }
                    ctx.restore();
                }
            }
            drawBorder() {}
            drawLabels() {
                const ctx = this.ctx;
                const opts = this.options;
                const tickOpts = opts.ticks;
                if (!tickOpts.display) return;
                const startAngle = this.getIndexAngle(0);
                let offset, width;
                ctx.save();
                ctx.translate(this.xCenter, this.yCenter);
                ctx.rotate(startAngle);
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                this.ticks.forEach(((tick, index) => {
                    if (0 === index && !opts.reverse) return;
                    const optsAtIndex = tickOpts.setContext(this.getContext(index));
                    const tickFont = toFont(optsAtIndex.font);
                    offset = this.getDistanceFromCenterForValue(this.ticks[index].value);
                    if (optsAtIndex.showLabelBackdrop) {
                        ctx.font = tickFont.string;
                        width = ctx.measureText(tick.label).width;
                        ctx.fillStyle = optsAtIndex.backdropColor;
                        const padding = toPadding(optsAtIndex.backdropPadding);
                        ctx.fillRect(-width / 2 - padding.left, -offset - tickFont.size / 2 - padding.top, width + padding.width, tickFont.size + padding.height);
                    }
                    renderText(ctx, tick.label, 0, -offset, tickFont, {
                        color: optsAtIndex.color
                    });
                }));
                ctx.restore();
            }
            drawTitle() {}
        }
        RadialLinearScale.id = "radialLinear";
        RadialLinearScale.defaults = {
            display: true,
            animate: true,
            position: "chartArea",
            angleLines: {
                display: true,
                lineWidth: 1,
                borderDash: [],
                borderDashOffset: 0
            },
            grid: {
                circular: false
            },
            startAngle: 0,
            ticks: {
                showLabelBackdrop: true,
                callback: Ticks.formatters.numeric
            },
            pointLabels: {
                backdropColor: void 0,
                backdropPadding: 2,
                display: true,
                font: {
                    size: 10
                },
                callback(label) {
                    return label;
                },
                padding: 5,
                centerPointLabels: false
            }
        };
        RadialLinearScale.defaultRoutes = {
            "angleLines.color": "borderColor",
            "pointLabels.color": "color",
            "ticks.color": "color"
        };
        RadialLinearScale.descriptors = {
            angleLines: {
                _fallback: "grid"
            }
        };
        const INTERVALS = {
            millisecond: {
                common: true,
                size: 1,
                steps: 1e3
            },
            second: {
                common: true,
                size: 1e3,
                steps: 60
            },
            minute: {
                common: true,
                size: 6e4,
                steps: 60
            },
            hour: {
                common: true,
                size: 36e5,
                steps: 24
            },
            day: {
                common: true,
                size: 864e5,
                steps: 30
            },
            week: {
                common: false,
                size: 6048e5,
                steps: 4
            },
            month: {
                common: true,
                size: 2628e6,
                steps: 12
            },
            quarter: {
                common: false,
                size: 7884e6,
                steps: 4
            },
            year: {
                common: true,
                size: 3154e7
            }
        };
        const UNITS = Object.keys(INTERVALS);
        function sorter(a, b) {
            return a - b;
        }
        function parse(scale, input) {
            if (isNullOrUndef(input)) return null;
            const adapter = scale._adapter;
            const {parser, round, isoWeekday} = scale._parseOpts;
            let value = input;
            if ("function" === typeof parser) value = parser(value);
            if (!isNumberFinite(value)) value = "string" === typeof parser ? adapter.parse(value, parser) : adapter.parse(value);
            if (null === value) return null;
            if (round) value = "week" === round && (isNumber(isoWeekday) || true === isoWeekday) ? adapter.startOf(value, "isoWeek", isoWeekday) : adapter.startOf(value, round);
            return +value;
        }
        function determineUnitForAutoTicks(minUnit, min, max, capacity) {
            const ilen = UNITS.length;
            for (let i = UNITS.indexOf(minUnit); i < ilen - 1; ++i) {
                const interval = INTERVALS[UNITS[i]];
                const factor = interval.steps ? interval.steps : Number.MAX_SAFE_INTEGER;
                if (interval.common && Math.ceil((max - min) / (factor * interval.size)) <= capacity) return UNITS[i];
            }
            return UNITS[ilen - 1];
        }
        function determineUnitForFormatting(scale, numTicks, minUnit, min, max) {
            for (let i = UNITS.length - 1; i >= UNITS.indexOf(minUnit); i--) {
                const unit = UNITS[i];
                if (INTERVALS[unit].common && scale._adapter.diff(max, min, unit) >= numTicks - 1) return unit;
            }
            return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
        }
        function determineMajorUnit(unit) {
            for (let i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i) if (INTERVALS[UNITS[i]].common) return UNITS[i];
        }
        function addTick(ticks, time, timestamps) {
            if (!timestamps) ticks[time] = true; else if (timestamps.length) {
                const {lo, hi} = _lookup(timestamps, time);
                const timestamp = timestamps[lo] >= time ? timestamps[lo] : timestamps[hi];
                ticks[timestamp] = true;
            }
        }
        function setMajorTicks(scale, ticks, map, majorUnit) {
            const adapter = scale._adapter;
            const first = +adapter.startOf(ticks[0].value, majorUnit);
            const last = ticks[ticks.length - 1].value;
            let major, index;
            for (major = first; major <= last; major = +adapter.add(major, 1, majorUnit)) {
                index = map[major];
                if (index >= 0) ticks[index].major = true;
            }
            return ticks;
        }
        function ticksFromTimestamps(scale, values, majorUnit) {
            const ticks = [];
            const map = {};
            const ilen = values.length;
            let i, value;
            for (i = 0; i < ilen; ++i) {
                value = values[i];
                map[value] = i;
                ticks.push({
                    value,
                    major: false
                });
            }
            return 0 === ilen || !majorUnit ? ticks : setMajorTicks(scale, ticks, map, majorUnit);
        }
        class TimeScale extends Scale {
            constructor(props) {
                super(props);
                this._cache = {
                    data: [],
                    labels: [],
                    all: []
                };
                this._unit = "day";
                this._majorUnit = void 0;
                this._offsets = {};
                this._normalized = false;
                this._parseOpts = void 0;
            }
            init(scaleOpts, opts) {
                const time = scaleOpts.time || (scaleOpts.time = {});
                const adapter = this._adapter = new adapters._date(scaleOpts.adapters.date);
                mergeIf(time.displayFormats, adapter.formats());
                this._parseOpts = {
                    parser: time.parser,
                    round: time.round,
                    isoWeekday: time.isoWeekday
                };
                super.init(scaleOpts);
                this._normalized = opts.normalized;
            }
            parse(raw, index) {
                if (void 0 === raw) return null;
                return parse(this, raw);
            }
            beforeLayout() {
                super.beforeLayout();
                this._cache = {
                    data: [],
                    labels: [],
                    all: []
                };
            }
            determineDataLimits() {
                const options = this.options;
                const adapter = this._adapter;
                const unit = options.time.unit || "day";
                let {min, max, minDefined, maxDefined} = this.getUserBounds();
                function _applyBounds(bounds) {
                    if (!minDefined && !isNaN(bounds.min)) min = Math.min(min, bounds.min);
                    if (!maxDefined && !isNaN(bounds.max)) max = Math.max(max, bounds.max);
                }
                if (!minDefined || !maxDefined) {
                    _applyBounds(this._getLabelBounds());
                    if ("ticks" !== options.bounds || "labels" !== options.ticks.source) _applyBounds(this.getMinMax(false));
                }
                min = isNumberFinite(min) && !isNaN(min) ? min : +adapter.startOf(Date.now(), unit);
                max = isNumberFinite(max) && !isNaN(max) ? max : +adapter.endOf(Date.now(), unit) + 1;
                this.min = Math.min(min, max - 1);
                this.max = Math.max(min + 1, max);
            }
            _getLabelBounds() {
                const arr = this.getLabelTimestamps();
                let min = Number.POSITIVE_INFINITY;
                let max = Number.NEGATIVE_INFINITY;
                if (arr.length) {
                    min = arr[0];
                    max = arr[arr.length - 1];
                }
                return {
                    min,
                    max
                };
            }
            buildTicks() {
                const options = this.options;
                const timeOpts = options.time;
                const tickOpts = options.ticks;
                const timestamps = "labels" === tickOpts.source ? this.getLabelTimestamps() : this._generate();
                if ("ticks" === options.bounds && timestamps.length) {
                    this.min = this._userMin || timestamps[0];
                    this.max = this._userMax || timestamps[timestamps.length - 1];
                }
                const min = this.min;
                const max = this.max;
                const ticks = _filterBetween(timestamps, min, max);
                this._unit = timeOpts.unit || (tickOpts.autoSkip ? determineUnitForAutoTicks(timeOpts.minUnit, this.min, this.max, this._getLabelCapacity(min)) : determineUnitForFormatting(this, ticks.length, timeOpts.minUnit, this.min, this.max));
                this._majorUnit = !tickOpts.major.enabled || "year" === this._unit ? void 0 : determineMajorUnit(this._unit);
                this.initOffsets(timestamps);
                if (options.reverse) ticks.reverse();
                return ticksFromTimestamps(this, ticks, this._majorUnit);
            }
            initOffsets(timestamps) {
                let start = 0;
                let end = 0;
                let first, last;
                if (this.options.offset && timestamps.length) {
                    first = this.getDecimalForValue(timestamps[0]);
                    if (1 === timestamps.length) start = 1 - first; else start = (this.getDecimalForValue(timestamps[1]) - first) / 2;
                    last = this.getDecimalForValue(timestamps[timestamps.length - 1]);
                    if (1 === timestamps.length) end = last; else end = (last - this.getDecimalForValue(timestamps[timestamps.length - 2])) / 2;
                }
                const limit = timestamps.length < 3 ? .5 : .25;
                start = _limitValue(start, 0, limit);
                end = _limitValue(end, 0, limit);
                this._offsets = {
                    start,
                    end,
                    factor: 1 / (start + 1 + end)
                };
            }
            _generate() {
                const adapter = this._adapter;
                const min = this.min;
                const max = this.max;
                const options = this.options;
                const timeOpts = options.time;
                const minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, this._getLabelCapacity(min));
                const stepSize = valueOrDefault(timeOpts.stepSize, 1);
                const weekday = "week" === minor ? timeOpts.isoWeekday : false;
                const hasWeekday = isNumber(weekday) || true === weekday;
                const ticks = {};
                let first = min;
                let time, count;
                if (hasWeekday) first = +adapter.startOf(first, "isoWeek", weekday);
                first = +adapter.startOf(first, hasWeekday ? "day" : minor);
                if (adapter.diff(max, min, minor) > 1e5 * stepSize) throw new Error(min + " and " + max + " are too far apart with stepSize of " + stepSize + " " + minor);
                const timestamps = "data" === options.ticks.source && this.getDataTimestamps();
                for (time = first, count = 0; time < max; time = +adapter.add(time, stepSize, minor), 
                count++) addTick(ticks, time, timestamps);
                if (time === max || "ticks" === options.bounds || 1 === count) addTick(ticks, time, timestamps);
                return Object.keys(ticks).sort(((a, b) => a - b)).map((x => +x));
            }
            getLabelForValue(value) {
                const adapter = this._adapter;
                const timeOpts = this.options.time;
                if (timeOpts.tooltipFormat) return adapter.format(value, timeOpts.tooltipFormat);
                return adapter.format(value, timeOpts.displayFormats.datetime);
            }
            _tickFormatFunction(time, index, ticks, format) {
                const options = this.options;
                const formats = options.time.displayFormats;
                const unit = this._unit;
                const majorUnit = this._majorUnit;
                const minorFormat = unit && formats[unit];
                const majorFormat = majorUnit && formats[majorUnit];
                const tick = ticks[index];
                const major = majorUnit && majorFormat && tick && tick.major;
                const label = this._adapter.format(time, format || (major ? majorFormat : minorFormat));
                const formatter = options.ticks.callback;
                return formatter ? callback(formatter, [ label, index, ticks ], this) : label;
            }
            generateTickLabels(ticks) {
                let i, ilen, tick;
                for (i = 0, ilen = ticks.length; i < ilen; ++i) {
                    tick = ticks[i];
                    tick.label = this._tickFormatFunction(tick.value, i, ticks);
                }
            }
            getDecimalForValue(value) {
                return null === value ? NaN : (value - this.min) / (this.max - this.min);
            }
            getPixelForValue(value) {
                const offsets = this._offsets;
                const pos = this.getDecimalForValue(value);
                return this.getPixelForDecimal((offsets.start + pos) * offsets.factor);
            }
            getValueForPixel(pixel) {
                const offsets = this._offsets;
                const pos = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
                return this.min + pos * (this.max - this.min);
            }
            _getLabelSize(label) {
                const ticksOpts = this.options.ticks;
                const tickLabelWidth = this.ctx.measureText(label).width;
                const angle = toRadians(this.isHorizontal() ? ticksOpts.maxRotation : ticksOpts.minRotation);
                const cosRotation = Math.cos(angle);
                const sinRotation = Math.sin(angle);
                const tickFontSize = this._resolveTickFontOptions(0).size;
                return {
                    w: tickLabelWidth * cosRotation + tickFontSize * sinRotation,
                    h: tickLabelWidth * sinRotation + tickFontSize * cosRotation
                };
            }
            _getLabelCapacity(exampleTime) {
                const timeOpts = this.options.time;
                const displayFormats = timeOpts.displayFormats;
                const format = displayFormats[timeOpts.unit] || displayFormats.millisecond;
                const exampleLabel = this._tickFormatFunction(exampleTime, 0, ticksFromTimestamps(this, [ exampleTime ], this._majorUnit), format);
                const size = this._getLabelSize(exampleLabel);
                const capacity = Math.floor(this.isHorizontal() ? this.width / size.w : this.height / size.h) - 1;
                return capacity > 0 ? capacity : 1;
            }
            getDataTimestamps() {
                let timestamps = this._cache.data || [];
                let i, ilen;
                if (timestamps.length) return timestamps;
                const metas = this.getMatchingVisibleMetas();
                if (this._normalized && metas.length) return this._cache.data = metas[0].controller.getAllParsedValues(this);
                for (i = 0, ilen = metas.length; i < ilen; ++i) timestamps = timestamps.concat(metas[i].controller.getAllParsedValues(this));
                return this._cache.data = this.normalize(timestamps);
            }
            getLabelTimestamps() {
                const timestamps = this._cache.labels || [];
                let i, ilen;
                if (timestamps.length) return timestamps;
                const labels = this.getLabels();
                for (i = 0, ilen = labels.length; i < ilen; ++i) timestamps.push(parse(this, labels[i]));
                return this._cache.labels = this._normalized ? timestamps : this.normalize(timestamps);
            }
            normalize(values) {
                return _arrayUnique(values.sort(sorter));
            }
        }
        TimeScale.id = "time";
        TimeScale.defaults = {
            bounds: "data",
            adapters: {},
            time: {
                parser: false,
                unit: false,
                round: false,
                isoWeekday: false,
                minUnit: "millisecond",
                displayFormats: {}
            },
            ticks: {
                source: "auto",
                major: {
                    enabled: false
                }
            }
        };
        function interpolate(table, val, reverse) {
            let lo = 0;
            let hi = table.length - 1;
            let prevSource, nextSource, prevTarget, nextTarget;
            if (reverse) {
                if (val >= table[lo].pos && val <= table[hi].pos) ({lo, hi} = _lookupByKey(table, "pos", val));
                ({pos: prevSource, time: prevTarget} = table[lo]);
                ({pos: nextSource, time: nextTarget} = table[hi]);
            } else {
                if (val >= table[lo].time && val <= table[hi].time) ({lo, hi} = _lookupByKey(table, "time", val));
                ({time: prevSource, pos: prevTarget} = table[lo]);
                ({time: nextSource, pos: nextTarget} = table[hi]);
            }
            const span = nextSource - prevSource;
            return span ? prevTarget + (nextTarget - prevTarget) * (val - prevSource) / span : prevTarget;
        }
        class TimeSeriesScale extends TimeScale {
            constructor(props) {
                super(props);
                this._table = [];
                this._minPos = void 0;
                this._tableRange = void 0;
            }
            initOffsets() {
                const timestamps = this._getTimestampsForTable();
                const table = this._table = this.buildLookupTable(timestamps);
                this._minPos = interpolate(table, this.min);
                this._tableRange = interpolate(table, this.max) - this._minPos;
                super.initOffsets(timestamps);
            }
            buildLookupTable(timestamps) {
                const {min, max} = this;
                const items = [];
                const table = [];
                let i, ilen, prev, curr, next;
                for (i = 0, ilen = timestamps.length; i < ilen; ++i) {
                    curr = timestamps[i];
                    if (curr >= min && curr <= max) items.push(curr);
                }
                if (items.length < 2) return [ {
                    time: min,
                    pos: 0
                }, {
                    time: max,
                    pos: 1
                } ];
                for (i = 0, ilen = items.length; i < ilen; ++i) {
                    next = items[i + 1];
                    prev = items[i - 1];
                    curr = items[i];
                    if (Math.round((next + prev) / 2) !== curr) table.push({
                        time: curr,
                        pos: i / (ilen - 1)
                    });
                }
                return table;
            }
            _getTimestampsForTable() {
                let timestamps = this._cache.all || [];
                if (timestamps.length) return timestamps;
                const data = this.getDataTimestamps();
                const label = this.getLabelTimestamps();
                if (data.length && label.length) timestamps = this.normalize(data.concat(label)); else timestamps = data.length ? data : label;
                timestamps = this._cache.all = timestamps;
                return timestamps;
            }
            getDecimalForValue(value) {
                return (interpolate(this._table, value) - this._minPos) / this._tableRange;
            }
            getValueForPixel(pixel) {
                const offsets = this._offsets;
                const decimal = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
                return interpolate(this._table, decimal * this._tableRange + this._minPos, true);
            }
        }
        TimeSeriesScale.id = "timeseries";
        TimeSeriesScale.defaults = TimeScale.defaults;
        /*!
 * chartjs-plugin-datalabels v2.0.0
 * https://chartjs-plugin-datalabels.netlify.app
 * (c) 2017-2021 chartjs-plugin-datalabels contributors
 * Released under the MIT license
 */
        var devicePixelRatio = function() {
            if ("undefined" !== typeof window) {
                if (window.devicePixelRatio) return window.devicePixelRatio;
                var screen = window.screen;
                if (screen) return (screen.deviceXDPI || 1) / (screen.logicalXDPI || 1);
            }
            return 1;
        }();
        var utils = {
            toTextLines: function(inputs) {
                var lines = [];
                var input;
                inputs = [].concat(inputs);
                while (inputs.length) {
                    input = inputs.pop();
                    if ("string" === typeof input) lines.unshift.apply(lines, input.split("\n")); else if (Array.isArray(input)) inputs.push.apply(inputs, input); else if (!isNullOrUndef(inputs)) lines.unshift("" + input);
                }
                return lines;
            },
            textSize: function(ctx, lines, font) {
                var items = [].concat(lines);
                var ilen = items.length;
                var prev = ctx.font;
                var width = 0;
                var i;
                ctx.font = font.string;
                for (i = 0; i < ilen; ++i) width = Math.max(ctx.measureText(items[i]).width, width);
                ctx.font = prev;
                return {
                    height: ilen * font.lineHeight,
                    width
                };
            },
            bound: function(min, value, max) {
                return Math.max(min, Math.min(value, max));
            },
            arrayDiff: function(a0, a1) {
                var prev = a0.slice();
                var updates = [];
                var i, j, ilen, v;
                for (i = 0, ilen = a1.length; i < ilen; ++i) {
                    v = a1[i];
                    j = prev.indexOf(v);
                    if (-1 === j) updates.push([ v, 1 ]); else prev.splice(j, 1);
                }
                for (i = 0, ilen = prev.length; i < ilen; ++i) updates.push([ prev[i], -1 ]);
                return updates;
            },
            rasterize: function(v) {
                return Math.round(v * devicePixelRatio) / devicePixelRatio;
            }
        };
        function orient(point, origin) {
            var x0 = origin.x;
            var y0 = origin.y;
            if (null === x0) return {
                x: 0,
                y: -1
            };
            if (null === y0) return {
                x: 1,
                y: 0
            };
            var dx = point.x - x0;
            var dy = point.y - y0;
            var ln = Math.sqrt(dx * dx + dy * dy);
            return {
                x: ln ? dx / ln : 0,
                y: ln ? dy / ln : -1
            };
        }
        function aligned(x, y, vx, vy, align) {
            switch (align) {
              case "center":
                vx = vy = 0;
                break;

              case "bottom":
                vx = 0;
                vy = 1;
                break;

              case "right":
                vx = 1;
                vy = 0;
                break;

              case "left":
                vx = -1;
                vy = 0;
                break;

              case "top":
                vx = 0;
                vy = -1;
                break;

              case "start":
                vx = -vx;
                vy = -vy;
                break;

              case "end":
                break;

              default:
                align *= Math.PI / 180;
                vx = Math.cos(align);
                vy = Math.sin(align);
                break;
            }
            return {
                x,
                y,
                vx,
                vy
            };
        }
        var R_INSIDE = 0;
        var R_LEFT = 1;
        var R_RIGHT = 2;
        var R_BOTTOM = 4;
        var R_TOP = 8;
        function region(x, y, rect) {
            var res = R_INSIDE;
            if (x < rect.left) res |= R_LEFT; else if (x > rect.right) res |= R_RIGHT;
            if (y < rect.top) res |= R_TOP; else if (y > rect.bottom) res |= R_BOTTOM;
            return res;
        }
        function clipped(segment, area) {
            var x0 = segment.x0;
            var y0 = segment.y0;
            var x1 = segment.x1;
            var y1 = segment.y1;
            var r0 = region(x0, y0, area);
            var r1 = region(x1, y1, area);
            var r, x, y;
            while (true) {
                if (!(r0 | r1) || r0 & r1) break;
                r = r0 || r1;
                if (r & R_TOP) {
                    x = x0 + (x1 - x0) * (area.top - y0) / (y1 - y0);
                    y = area.top;
                } else if (r & R_BOTTOM) {
                    x = x0 + (x1 - x0) * (area.bottom - y0) / (y1 - y0);
                    y = area.bottom;
                } else if (r & R_RIGHT) {
                    y = y0 + (y1 - y0) * (area.right - x0) / (x1 - x0);
                    x = area.right;
                } else if (r & R_LEFT) {
                    y = y0 + (y1 - y0) * (area.left - x0) / (x1 - x0);
                    x = area.left;
                }
                if (r === r0) {
                    x0 = x;
                    y0 = y;
                    r0 = region(x0, y0, area);
                } else {
                    x1 = x;
                    y1 = y;
                    r1 = region(x1, y1, area);
                }
            }
            return {
                x0,
                x1,
                y0,
                y1
            };
        }
        function compute$1(range, config) {
            var anchor = config.anchor;
            var segment = range;
            var x, y;
            if (config.clamp) segment = clipped(segment, config.area);
            if ("start" === anchor) {
                x = segment.x0;
                y = segment.y0;
            } else if ("end" === anchor) {
                x = segment.x1;
                y = segment.y1;
            } else {
                x = (segment.x0 + segment.x1) / 2;
                y = (segment.y0 + segment.y1) / 2;
            }
            return aligned(x, y, range.vx, range.vy, config.align);
        }
        var chartjs_plugin_datalabels_esm_positioners = {
            arc: function(el, config) {
                var angle = (el.startAngle + el.endAngle) / 2;
                var vx = Math.cos(angle);
                var vy = Math.sin(angle);
                var r0 = el.innerRadius;
                var r1 = el.outerRadius;
                return compute$1({
                    x0: el.x + vx * r0,
                    y0: el.y + vy * r0,
                    x1: el.x + vx * r1,
                    y1: el.y + vy * r1,
                    vx,
                    vy
                }, config);
            },
            point: function(el, config) {
                var v = orient(el, config.origin);
                var rx = v.x * el.options.radius;
                var ry = v.y * el.options.radius;
                return compute$1({
                    x0: el.x - rx,
                    y0: el.y - ry,
                    x1: el.x + rx,
                    y1: el.y + ry,
                    vx: v.x,
                    vy: v.y
                }, config);
            },
            bar: function(el, config) {
                var v = orient(el, config.origin);
                var x = el.x;
                var y = el.y;
                var sx = 0;
                var sy = 0;
                if (el.horizontal) {
                    x = Math.min(el.x, el.base);
                    sx = Math.abs(el.base - el.x);
                } else {
                    y = Math.min(el.y, el.base);
                    sy = Math.abs(el.base - el.y);
                }
                return compute$1({
                    x0: x,
                    y0: y + sy,
                    x1: x + sx,
                    y1: y,
                    vx: v.x,
                    vy: v.y
                }, config);
            },
            fallback: function(el, config) {
                var v = orient(el, config.origin);
                return compute$1({
                    x0: el.x,
                    y0: el.y,
                    x1: el.x,
                    y1: el.y,
                    vx: v.x,
                    vy: v.y
                }, config);
            }
        };
        var rasterize = utils.rasterize;
        function chartjs_plugin_datalabels_esm_boundingRects(model) {
            var borderWidth = model.borderWidth || 0;
            var padding = model.padding;
            var th = model.size.height;
            var tw = model.size.width;
            var tx = -tw / 2;
            var ty = -th / 2;
            return {
                frame: {
                    x: tx - padding.left - borderWidth,
                    y: ty - padding.top - borderWidth,
                    w: tw + padding.width + 2 * borderWidth,
                    h: th + padding.height + 2 * borderWidth
                },
                text: {
                    x: tx,
                    y: ty,
                    w: tw,
                    h: th
                }
            };
        }
        function getScaleOrigin(el, context) {
            var scale = context.chart.getDatasetMeta(context.datasetIndex).vScale;
            if (!scale) return null;
            if (void 0 !== scale.xCenter && void 0 !== scale.yCenter) return {
                x: scale.xCenter,
                y: scale.yCenter
            };
            var pixel = scale.getBasePixel();
            return el.horizontal ? {
                x: pixel,
                y: null
            } : {
                x: null,
                y: pixel
            };
        }
        function getPositioner(el) {
            if (el instanceof ArcElement) return chartjs_plugin_datalabels_esm_positioners.arc;
            if (el instanceof PointElement) return chartjs_plugin_datalabels_esm_positioners.point;
            if (el instanceof BarElement) return chartjs_plugin_datalabels_esm_positioners.bar;
            return chartjs_plugin_datalabels_esm_positioners.fallback;
        }
        function drawRoundedRect(ctx, x, y, w, h, radius) {
            var HALF_PI = Math.PI / 2;
            if (radius) {
                var r = Math.min(radius, h / 2, w / 2);
                var left = x + r;
                var top = y + r;
                var right = x + w - r;
                var bottom = y + h - r;
                ctx.moveTo(x, top);
                if (left < right && top < bottom) {
                    ctx.arc(left, top, r, -Math.PI, -HALF_PI);
                    ctx.arc(right, top, r, -HALF_PI, 0);
                    ctx.arc(right, bottom, r, 0, HALF_PI);
                    ctx.arc(left, bottom, r, HALF_PI, Math.PI);
                } else if (left < right) {
                    ctx.moveTo(left, y);
                    ctx.arc(right, top, r, -HALF_PI, HALF_PI);
                    ctx.arc(left, top, r, HALF_PI, Math.PI + HALF_PI);
                } else if (top < bottom) {
                    ctx.arc(left, top, r, -Math.PI, 0);
                    ctx.arc(left, bottom, r, 0, Math.PI);
                } else ctx.arc(left, top, r, -Math.PI, Math.PI);
                ctx.closePath();
                ctx.moveTo(x, y);
            } else ctx.rect(x, y, w, h);
        }
        function drawFrame(ctx, rect, model) {
            var bgColor = model.backgroundColor;
            var borderColor = model.borderColor;
            var borderWidth = model.borderWidth;
            if (!bgColor && (!borderColor || !borderWidth)) return;
            ctx.beginPath();
            drawRoundedRect(ctx, rasterize(rect.x) + borderWidth / 2, rasterize(rect.y) + borderWidth / 2, rasterize(rect.w) - borderWidth, rasterize(rect.h) - borderWidth, model.borderRadius);
            ctx.closePath();
            if (bgColor) {
                ctx.fillStyle = bgColor;
                ctx.fill();
            }
            if (borderColor && borderWidth) {
                ctx.strokeStyle = borderColor;
                ctx.lineWidth = borderWidth;
                ctx.lineJoin = "miter";
                ctx.stroke();
            }
        }
        function textGeometry(rect, align, font) {
            var h = font.lineHeight;
            var w = rect.w;
            var x = rect.x;
            var y = rect.y + h / 2;
            if ("center" === align) x += w / 2; else if ("end" === align || "right" === align) x += w;
            return {
                h,
                w,
                x,
                y
            };
        }
        function drawTextLine(ctx, text, cfg) {
            var shadow = ctx.shadowBlur;
            var stroked = cfg.stroked;
            var x = rasterize(cfg.x);
            var y = rasterize(cfg.y);
            var w = rasterize(cfg.w);
            if (stroked) ctx.strokeText(text, x, y, w);
            if (cfg.filled) {
                if (shadow && stroked) ctx.shadowBlur = 0;
                ctx.fillText(text, x, y, w);
                if (shadow && stroked) ctx.shadowBlur = shadow;
            }
        }
        function drawText(ctx, lines, rect, model) {
            var align = model.textAlign;
            var color = model.color;
            var filled = !!color;
            var font = model.font;
            var ilen = lines.length;
            var strokeColor = model.textStrokeColor;
            var strokeWidth = model.textStrokeWidth;
            var stroked = strokeColor && strokeWidth;
            var i;
            if (!ilen || !filled && !stroked) return;
            rect = textGeometry(rect, align, font);
            ctx.font = font.string;
            ctx.textAlign = align;
            ctx.textBaseline = "middle";
            ctx.shadowBlur = model.textShadowBlur;
            ctx.shadowColor = model.textShadowColor;
            if (filled) ctx.fillStyle = color;
            if (stroked) {
                ctx.lineJoin = "round";
                ctx.lineWidth = strokeWidth;
                ctx.strokeStyle = strokeColor;
            }
            for (i = 0, ilen = lines.length; i < ilen; ++i) drawTextLine(ctx, lines[i], {
                stroked,
                filled,
                w: rect.w,
                x: rect.x,
                y: rect.y + rect.h * i
            });
        }
        var Label = function(config, ctx, el, index) {
            var me = this;
            me._config = config;
            me._index = index;
            me._model = null;
            me._rects = null;
            me._ctx = ctx;
            me._el = el;
        };
        merge(Label.prototype, {
            _modelize: function(display, lines, config, context) {
                var me = this;
                var index = me._index;
                var font = toFont(resolve([ config.font, {} ], context, index));
                var color = resolve([ config.color, helpers_segment_defaults.color ], context, index);
                return {
                    align: resolve([ config.align, "center" ], context, index),
                    anchor: resolve([ config.anchor, "center" ], context, index),
                    area: context.chart.chartArea,
                    backgroundColor: resolve([ config.backgroundColor, null ], context, index),
                    borderColor: resolve([ config.borderColor, null ], context, index),
                    borderRadius: resolve([ config.borderRadius, 0 ], context, index),
                    borderWidth: resolve([ config.borderWidth, 0 ], context, index),
                    clamp: resolve([ config.clamp, false ], context, index),
                    clip: resolve([ config.clip, false ], context, index),
                    color,
                    display,
                    font,
                    lines,
                    offset: resolve([ config.offset, 0 ], context, index),
                    opacity: resolve([ config.opacity, 1 ], context, index),
                    origin: getScaleOrigin(me._el, context),
                    padding: toPadding(resolve([ config.padding, 0 ], context, index)),
                    positioner: getPositioner(me._el),
                    rotation: resolve([ config.rotation, 0 ], context, index) * (Math.PI / 180),
                    size: utils.textSize(me._ctx, lines, font),
                    textAlign: resolve([ config.textAlign, "start" ], context, index),
                    textShadowBlur: resolve([ config.textShadowBlur, 0 ], context, index),
                    textShadowColor: resolve([ config.textShadowColor, color ], context, index),
                    textStrokeColor: resolve([ config.textStrokeColor, color ], context, index),
                    textStrokeWidth: resolve([ config.textStrokeWidth, 0 ], context, index)
                };
            },
            update: function(context) {
                var me = this;
                var model = null;
                var rects = null;
                var index = me._index;
                var config = me._config;
                var value, label, lines;
                var display = resolve([ config.display, true ], context, index);
                if (display) {
                    value = context.dataset.data[index];
                    label = valueOrDefault(callback(config.formatter, [ value, context ]), value);
                    lines = isNullOrUndef(label) ? [] : utils.toTextLines(label);
                    if (lines.length) {
                        model = me._modelize(display, lines, config, context);
                        rects = chartjs_plugin_datalabels_esm_boundingRects(model);
                    }
                }
                me._model = model;
                me._rects = rects;
            },
            geometry: function() {
                return this._rects ? this._rects.frame : {};
            },
            rotation: function() {
                return this._model ? this._model.rotation : 0;
            },
            visible: function() {
                return this._model && this._model.opacity;
            },
            model: function() {
                return this._model;
            },
            draw: function(chart, center) {
                var me = this;
                var ctx = chart.ctx;
                var model = me._model;
                var rects = me._rects;
                var area;
                if (!this.visible()) return;
                ctx.save();
                if (model.clip) {
                    area = model.area;
                    ctx.beginPath();
                    ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
                    ctx.clip();
                }
                ctx.globalAlpha = utils.bound(0, model.opacity, 1);
                ctx.translate(rasterize(center.x), rasterize(center.y));
                ctx.rotate(model.rotation);
                drawFrame(ctx, rects.frame, model);
                drawText(ctx, model.lines, rects.text, model);
                ctx.restore();
            }
        });
        var MIN_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991;
        var MAX_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
        function rotated(point, center, angle) {
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);
            var cx = center.x;
            var cy = center.y;
            return {
                x: cx + cos * (point.x - cx) - sin * (point.y - cy),
                y: cy + sin * (point.x - cx) + cos * (point.y - cy)
            };
        }
        function projected(points, axis) {
            var min = MAX_INTEGER;
            var max = MIN_INTEGER;
            var origin = axis.origin;
            var i, pt, vx, vy, dp;
            for (i = 0; i < points.length; ++i) {
                pt = points[i];
                vx = pt.x - origin.x;
                vy = pt.y - origin.y;
                dp = axis.vx * vx + axis.vy * vy;
                min = Math.min(min, dp);
                max = Math.max(max, dp);
            }
            return {
                min,
                max
            };
        }
        function toAxis(p0, p1) {
            var vx = p1.x - p0.x;
            var vy = p1.y - p0.y;
            var ln = Math.sqrt(vx * vx + vy * vy);
            return {
                vx: (p1.x - p0.x) / ln,
                vy: (p1.y - p0.y) / ln,
                origin: p0,
                ln
            };
        }
        var HitBox = function() {
            this._rotation = 0;
            this._rect = {
                x: 0,
                y: 0,
                w: 0,
                h: 0
            };
        };
        merge(HitBox.prototype, {
            center: function() {
                var r = this._rect;
                return {
                    x: r.x + r.w / 2,
                    y: r.y + r.h / 2
                };
            },
            update: function(center, rect, rotation) {
                this._rotation = rotation;
                this._rect = {
                    x: rect.x + center.x,
                    y: rect.y + center.y,
                    w: rect.w,
                    h: rect.h
                };
            },
            contains: function(point) {
                var me = this;
                var margin = 1;
                var rect = me._rect;
                point = rotated(point, me.center(), -me._rotation);
                return !(point.x < rect.x - margin || point.y < rect.y - margin || point.x > rect.x + rect.w + 2 * margin || point.y > rect.y + rect.h + 2 * margin);
            },
            intersects: function(other) {
                var r0 = this._points();
                var r1 = other._points();
                var axes = [ toAxis(r0[0], r0[1]), toAxis(r0[0], r0[3]) ];
                var i, pr0, pr1;
                if (this._rotation !== other._rotation) axes.push(toAxis(r1[0], r1[1]), toAxis(r1[0], r1[3]));
                for (i = 0; i < axes.length; ++i) {
                    pr0 = projected(r0, axes[i]);
                    pr1 = projected(r1, axes[i]);
                    if (pr0.max < pr1.min || pr1.max < pr0.min) return false;
                }
                return true;
            },
            _points: function() {
                var me = this;
                var rect = me._rect;
                var angle = me._rotation;
                var center = me.center();
                return [ rotated({
                    x: rect.x,
                    y: rect.y
                }, center, angle), rotated({
                    x: rect.x + rect.w,
                    y: rect.y
                }, center, angle), rotated({
                    x: rect.x + rect.w,
                    y: rect.y + rect.h
                }, center, angle), rotated({
                    x: rect.x,
                    y: rect.y + rect.h
                }, center, angle) ];
            }
        });
        function coordinates(el, model, geometry) {
            var point = model.positioner(el, model);
            var vx = point.vx;
            var vy = point.vy;
            if (!vx && !vy) return {
                x: point.x,
                y: point.y
            };
            var w = geometry.w;
            var h = geometry.h;
            var rotation = model.rotation;
            var dx = Math.abs(w / 2 * Math.cos(rotation)) + Math.abs(h / 2 * Math.sin(rotation));
            var dy = Math.abs(w / 2 * Math.sin(rotation)) + Math.abs(h / 2 * Math.cos(rotation));
            var vs = 1 / Math.max(Math.abs(vx), Math.abs(vy));
            dx *= vx * vs;
            dy *= vy * vs;
            dx += model.offset * vx;
            dy += model.offset * vy;
            return {
                x: point.x + dx,
                y: point.y + dy
            };
        }
        function collide(labels, collider) {
            var i, j, s0, s1;
            for (i = labels.length - 1; i >= 0; --i) {
                s0 = labels[i].$layout;
                for (j = i - 1; j >= 0 && s0._visible; --j) {
                    s1 = labels[j].$layout;
                    if (s1._visible && s0._box.intersects(s1._box)) collider(s0, s1);
                }
            }
            return labels;
        }
        function compute(labels) {
            var i, ilen, label, state, geometry, center, proxy;
            for (i = 0, ilen = labels.length; i < ilen; ++i) {
                label = labels[i];
                state = label.$layout;
                if (state._visible) {
                    proxy = new Proxy(label._el, {
                        get: (el, p) => el.getProps([ p ], true)[p]
                    });
                    geometry = label.geometry();
                    center = coordinates(proxy, label.model(), geometry);
                    state._box.update(center, geometry, label.rotation());
                }
            }
            return collide(labels, (function(s0, s1) {
                var h0 = s0._hidable;
                var h1 = s1._hidable;
                if (h0 && h1 || h1) s1._visible = false; else if (h0) s0._visible = false;
            }));
        }
        var layout = {
            prepare: function(datasets) {
                var labels = [];
                var i, j, ilen, jlen, label;
                for (i = 0, ilen = datasets.length; i < ilen; ++i) for (j = 0, jlen = datasets[i].length; j < jlen; ++j) {
                    label = datasets[i][j];
                    labels.push(label);
                    label.$layout = {
                        _box: new HitBox,
                        _hidable: false,
                        _visible: true,
                        _set: i,
                        _idx: j
                    };
                }
                labels.sort((function(a, b) {
                    var sa = a.$layout;
                    var sb = b.$layout;
                    return sa._idx === sb._idx ? sb._set - sa._set : sb._idx - sa._idx;
                }));
                this.update(labels);
                return labels;
            },
            update: function(labels) {
                var dirty = false;
                var i, ilen, label, model, state;
                for (i = 0, ilen = labels.length; i < ilen; ++i) {
                    label = labels[i];
                    model = label.model();
                    state = label.$layout;
                    state._hidable = model && "auto" === model.display;
                    state._visible = label.visible();
                    dirty |= state._hidable;
                }
                if (dirty) compute(labels);
            },
            lookup: function(labels, point) {
                var i, state;
                for (i = labels.length - 1; i >= 0; --i) {
                    state = labels[i].$layout;
                    if (state && state._visible && state._box.contains(point)) return labels[i];
                }
                return null;
            },
            draw: function(chart, labels) {
                var i, ilen, label, state, geometry, center;
                for (i = 0, ilen = labels.length; i < ilen; ++i) {
                    label = labels[i];
                    state = label.$layout;
                    if (state._visible) {
                        geometry = label.geometry();
                        center = coordinates(label._el, label.model(), geometry);
                        state._box.update(center, geometry, label.rotation());
                        label.draw(chart, center);
                    }
                }
            }
        };
        var formatter = function(value) {
            if (isNullOrUndef(value)) return null;
            var label = value;
            var keys, klen, k;
            if (helpers_segment_isObject(value)) if (!isNullOrUndef(value.label)) label = value.label; else if (!isNullOrUndef(value.r)) label = value.r; else {
                label = "";
                keys = Object.keys(value);
                for (k = 0, klen = keys.length; k < klen; ++k) label += (0 !== k ? ", " : "") + keys[k] + ": " + value[keys[k]];
            }
            return "" + label;
        };
        var chartjs_plugin_datalabels_esm_defaults = {
            align: "center",
            anchor: "center",
            backgroundColor: null,
            borderColor: null,
            borderRadius: 0,
            borderWidth: 0,
            clamp: false,
            clip: false,
            color: void 0,
            display: true,
            font: {
                family: void 0,
                lineHeight: 1.2,
                size: void 0,
                style: void 0,
                weight: null
            },
            formatter,
            labels: void 0,
            listeners: {},
            offset: 4,
            opacity: 1,
            padding: {
                top: 4,
                right: 4,
                bottom: 4,
                left: 4
            },
            rotation: 0,
            textAlign: "start",
            textStrokeColor: void 0,
            textStrokeWidth: 0,
            textShadowBlur: 0,
            textShadowColor: void 0
        };
        var chartjs_plugin_datalabels_esm_EXPANDO_KEY = "$datalabels";
        var DEFAULT_KEY = "$default";
        function configure(dataset, options) {
            var override = dataset.datalabels;
            var listeners = {};
            var configs = [];
            var labels, keys;
            if (false === override) return null;
            if (true === override) override = {};
            options = merge({}, [ options, override ]);
            labels = options.labels || {};
            keys = Object.keys(labels);
            delete options.labels;
            if (keys.length) keys.forEach((function(key) {
                if (labels[key]) configs.push(merge({}, [ options, labels[key], {
                    _key: key
                } ]));
            })); else configs.push(options);
            listeners = configs.reduce((function(target, config) {
                helpers_segment_each(config.listeners || {}, (function(fn, event) {
                    target[event] = target[event] || {};
                    target[event][config._key || DEFAULT_KEY] = fn;
                }));
                delete config.listeners;
                return target;
            }), {});
            return {
                labels: configs,
                listeners
            };
        }
        function dispatchEvent(chart, listeners, label) {
            if (!listeners) return;
            var context = label.$context;
            var groups = label.$groups;
            var callback$1;
            if (!listeners[groups._set]) return;
            callback$1 = listeners[groups._set][groups._key];
            if (!callback$1) return;
            if (true === callback(callback$1, [ context ])) {
                chart[chartjs_plugin_datalabels_esm_EXPANDO_KEY]._dirty = true;
                label.update(context);
            }
        }
        function dispatchMoveEvents(chart, listeners, previous, label) {
            var enter, leave;
            if (!previous && !label) return;
            if (!previous) enter = true; else if (!label) leave = true; else if (previous !== label) leave = enter = true;
            if (leave) dispatchEvent(chart, listeners.leave, previous);
            if (enter) dispatchEvent(chart, listeners.enter, label);
        }
        function handleMoveEvents(chart, event) {
            var expando = chart[chartjs_plugin_datalabels_esm_EXPANDO_KEY];
            var listeners = expando._listeners;
            var previous, label;
            if (!listeners.enter && !listeners.leave) return;
            if ("mousemove" === event.type) label = layout.lookup(expando._labels, event); else if ("mouseout" !== event.type) return;
            previous = expando._hovered;
            expando._hovered = label;
            dispatchMoveEvents(chart, listeners, previous, label);
        }
        function handleClickEvents(chart, event) {
            var expando = chart[chartjs_plugin_datalabels_esm_EXPANDO_KEY];
            var handlers = expando._listeners.click;
            var label = handlers && layout.lookup(expando._labels, event);
            if (label) dispatchEvent(chart, handlers, label);
        }
        var chartjs_plugin_datalabels_esm_plugin = {
            id: "datalabels",
            defaults: chartjs_plugin_datalabels_esm_defaults,
            beforeInit: function(chart) {
                chart[chartjs_plugin_datalabels_esm_EXPANDO_KEY] = {
                    _actives: []
                };
            },
            beforeUpdate: function(chart) {
                var expando = chart[chartjs_plugin_datalabels_esm_EXPANDO_KEY];
                expando._listened = false;
                expando._listeners = {};
                expando._datasets = [];
                expando._labels = [];
            },
            afterDatasetUpdate: function(chart, args, options) {
                var datasetIndex = args.index;
                var expando = chart[chartjs_plugin_datalabels_esm_EXPANDO_KEY];
                var labels = expando._datasets[datasetIndex] = [];
                var visible = chart.isDatasetVisible(datasetIndex);
                var dataset = chart.data.datasets[datasetIndex];
                var config = configure(dataset, options);
                var elements = args.meta.data || [];
                var ctx = chart.ctx;
                var i, j, ilen, jlen, cfg, key, el, label;
                ctx.save();
                for (i = 0, ilen = elements.length; i < ilen; ++i) {
                    el = elements[i];
                    el[chartjs_plugin_datalabels_esm_EXPANDO_KEY] = [];
                    if (visible && el && chart.getDataVisibility(i) && !el.skip) for (j = 0, jlen = config.labels.length; j < jlen; ++j) {
                        cfg = config.labels[j];
                        key = cfg._key;
                        label = new Label(cfg, ctx, el, i);
                        label.$groups = {
                            _set: datasetIndex,
                            _key: key || DEFAULT_KEY
                        };
                        label.$context = {
                            active: false,
                            chart,
                            dataIndex: i,
                            dataset,
                            datasetIndex
                        };
                        label.update(label.$context);
                        el[chartjs_plugin_datalabels_esm_EXPANDO_KEY].push(label);
                        labels.push(label);
                    }
                }
                ctx.restore();
                merge(expando._listeners, config.listeners, {
                    merger: function(event, target, source) {
                        target[event] = target[event] || {};
                        target[event][args.index] = source[event];
                        expando._listened = true;
                    }
                });
            },
            afterUpdate: function(chart, options) {
                chart[chartjs_plugin_datalabels_esm_EXPANDO_KEY]._labels = layout.prepare(chart[chartjs_plugin_datalabels_esm_EXPANDO_KEY]._datasets, options);
            },
            afterDatasetsDraw: function(chart) {
                layout.draw(chart, chart[chartjs_plugin_datalabels_esm_EXPANDO_KEY]._labels);
            },
            beforeEvent: function(chart, args) {
                if (chart[chartjs_plugin_datalabels_esm_EXPANDO_KEY]._listened) {
                    var event = args.event;
                    switch (event.type) {
                      case "mousemove":
                      case "mouseout":
                        handleMoveEvents(chart, event);
                        break;

                      case "click":
                        handleClickEvents(chart, event);
                        break;
                    }
                }
            },
            afterEvent: function(chart) {
                var expando = chart[chartjs_plugin_datalabels_esm_EXPANDO_KEY];
                var previous = expando._actives;
                var actives = expando._actives = chart.getActiveElements();
                var updates = utils.arrayDiff(previous, actives);
                var i, ilen, j, jlen, update, label, labels;
                for (i = 0, ilen = updates.length; i < ilen; ++i) {
                    update = updates[i];
                    if (update[1]) {
                        labels = update[0].element[chartjs_plugin_datalabels_esm_EXPANDO_KEY] || [];
                        for (j = 0, jlen = labels.length; j < jlen; ++j) {
                            label = labels[j];
                            label.$context.active = 1 === update[1];
                            label.update(label.$context);
                        }
                    }
                }
                if (expando._dirty || updates.length) {
                    layout.update(expando._labels);
                    chart.render();
                }
                delete expando._dirty;
            }
        };
        const chartjs_plugin_datalabels_esm = chartjs_plugin_datalabels_esm_plugin;
        /*!
 * chartjs-plugin-deferred v2.0.0
 * https://chartjs-plugin-deferred.netlify.app
 * (c) 2016-2022 chartjs-plugin-deferred contributors
 * Released under the MIT license
 */
        var STUB_KEY = "$chartjs_deferred";
        var MODEL_KEY = "$deferred";
        function defer(fn, delay) {
            if (delay) window.setTimeout(fn, delay); else requestAnimFrame.call(window, fn);
        }
        function computeOffset(value, base) {
            var number = parseInt(value, 10);
            if (isNaN(number)) return 0; else if ("string" === typeof value && -1 !== value.indexOf("%")) return number / 100 * base;
            return number;
        }
        function chartInViewport(chart) {
            var options = chart[MODEL_KEY].options;
            var canvas = chart.canvas;
            if (!canvas || null === canvas.offsetParent) return false;
            var rect = canvas.getBoundingClientRect();
            var dy = computeOffset(options.yOffset || 0, rect.height);
            var dx = computeOffset(options.xOffset || 0, rect.width);
            return rect.right - dx >= 0 && rect.bottom - dy >= 0 && rect.left + dx <= window.innerWidth && rect.top + dy <= window.innerHeight;
        }
        function chartjs_plugin_deferred_esm_onScroll(event) {
            var node = event.target;
            var stub = node[STUB_KEY];
            if (stub.ticking) return;
            stub.ticking = true;
            defer((function() {
                var charts = stub.charts.slice();
                var ilen = charts.length;
                var chart, i;
                for (i = 0; i < ilen; ++i) {
                    chart = charts[i];
                    if (chartInViewport(chart)) {
                        unwatch(chart);
                        chart[MODEL_KEY].appeared = true;
                        chart.update();
                    }
                }
                stub.ticking = false;
            }));
        }
        function isScrollable(node) {
            var type = node.nodeType;
            if (type === Node.ELEMENT_NODE) {
                var overflowX = getStyle(node, "overflow-x");
                var overflowY = getStyle(node, "overflow-y");
                return "auto" === overflowX || "scroll" === overflowX || "auto" === overflowY || "scroll" === overflowY;
            }
            return node.nodeType === Node.DOCUMENT_NODE;
        }
        function watch(chart) {
            var canvas = chart.canvas;
            var parent = canvas.parentElement;
            var stub, charts;
            while (parent) {
                if (isScrollable(parent)) {
                    stub = parent[STUB_KEY] || (parent[STUB_KEY] = {});
                    charts = stub.charts || (stub.charts = []);
                    if (0 === charts.length) parent.addEventListener("scroll", chartjs_plugin_deferred_esm_onScroll);
                    charts.push(chart);
                    chart[MODEL_KEY].elements.push(parent);
                }
                parent = parent.parentElement || parent.ownerDocument;
            }
        }
        function unwatch(chart) {
            chart[MODEL_KEY].elements.forEach((function(element) {
                var charts = element[STUB_KEY].charts;
                charts.splice(charts.indexOf(chart), 1);
                if (!charts.length) {
                    element.removeEventListener("scroll", chartjs_plugin_deferred_esm_onScroll);
                    delete element[STUB_KEY];
                }
            }));
            chart[MODEL_KEY].elements = [];
        }
        var chartjs_plugin_deferred_esm_plugin = {
            id: "deferred",
            defaults: {
                xOffset: 0,
                yOffset: 0,
                delay: 0
            },
            beforeInit: function(chart, _, options) {
                chart[MODEL_KEY] = {
                    options,
                    appeared: false,
                    delayed: false,
                    loaded: false,
                    elements: []
                };
                watch(chart);
            },
            beforeDatasetsUpdate: function(chart, _, options) {
                var model = chart[MODEL_KEY];
                if (!model.loaded) {
                    if (!model.appeared && !chartInViewport(chart)) return false;
                    model.appeared = true;
                    model.loaded = true;
                    unwatch(chart);
                    if (options.delay > 0) {
                        model.delayed = true;
                        defer((function() {
                            if (chart.ctx) {
                                model.delayed = false;
                                chart.update();
                            }
                        }), options.delay);
                        return false;
                    }
                }
                if (model.delayed) return false;
            },
            destroy: function(chart) {
                unwatch(chart);
            }
        };
        Chart.register(chartjs_plugin_datalabels_esm, ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale, plugin_decimation, plugin_filler, plugin_legend, plugin_title, plugin_tooltip, plugin_subtitle, chartjs_plugin_deferred_esm_plugin);
        const ctx = document.getElementById("myChart").getContext("2d");
        const chart_data = {
            labels: [ "19%", "5%", "6%", "30%", "10%", "15%", "15%" ],
            datasets: [ {
                label: "Tokenomics",
                data: [ 68.4, 18, 21.6, 108, 36, 54, 60 ],
                backgroundColor: [ "#4e00ff", "#ff850b", "#663090", "#1dbee1", "#133d81", "#ff0000", "#0096f2" ],
                hoverOffset: 4,
                cutout: "80%"
            } ]
        };
        const config = {
            type: "doughnut",
            data: chart_data,
            options: {
                borderWidth: 0,
                plugins: {
                    datalabels: {
                        color: "#000000",
                        opacity: .7,
                        font: {
                            size: 15,
                            weight: 600,
                            family: "SFProDisplay"
                        }
                    },
                    legend: {
                        display: false
                    },
                    deferred: {
                        xOffset: 150,
                        yOffset: "50%",
                        delay: 500
                    }
                }
            }
        };
        const myChart = new Chart(ctx, config);
        myChart.render();
        new IntersectionObserver((function(entries) {
            if (true === entries[0].isIntersecting) {
                myChart.updateSeries([ 0 ], false);
                myChart.updateSeries([ 75 ], true);
            }
        }), {
            threshold: [ .2 ]
        });
        var wow = __webpack_require__(541);
        var wow_wow = new wow.WOW({
            live: false
        });
        wow_wow.init();
        let addWindowScrollEvent = false;
        function headerScroll() {
            addWindowScrollEvent = true;
            const header = document.querySelector("header.header");
            const headerShow = header.hasAttribute("data-scroll-show");
            const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
            const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
            let scrollDirection = 0;
            let timer;
            document.addEventListener("windowScroll", (function(e) {
                const scrollTop = window.scrollY;
                clearTimeout(timer);
                if (scrollTop >= startPoint) {
                    !header.classList.contains("_header-scroll") ? header.classList.add("_header-scroll") : null;
                    if (headerShow) {
                        if (scrollTop > scrollDirection) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null; else !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                        timer = setTimeout((() => {
                            !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                        }), headerShowTimer);
                    }
                } else {
                    header.classList.contains("_header-scroll") ? header.classList.remove("_header-scroll") : null;
                    if (headerShow) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null;
                }
                scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
            }));
        }
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        function DynamicAdapt(type) {
            this.type = type;
        }
        DynamicAdapt.prototype.init = function() {
            const _this = this;
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = document.querySelectorAll("[data-da]");
            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(dataArray[0].trim());
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }
            this.arraySort(this.оbjects);
            this.mediaQueries = Array.prototype.map.call(this.оbjects, (function(item) {
                return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
            }), this);
            this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, (function(item, index, self) {
                return Array.prototype.indexOf.call(self, item) === index;
            }));
            for (let i = 0; i < this.mediaQueries.length; i++) {
                const media = this.mediaQueries[i];
                const mediaSplit = String.prototype.split.call(media, ",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = Array.prototype.filter.call(this.оbjects, (function(item) {
                    return item.breakpoint === mediaBreakpoint;
                }));
                matchMedia.addListener((function() {
                    _this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }
        };
        DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
            if (matchMedia.matches) for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            } else for (let i = оbjects.length - 1; i >= 0; i--) {
                const оbject = оbjects[i];
                if (оbject.element.classList.contains(this.daClassname)) this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        };
        DynamicAdapt.prototype.moveTo = function(place, element, destination) {
            element.classList.add(this.daClassname);
            if ("last" === place || place >= destination.children.length) {
                destination.insertAdjacentElement("beforeend", element);
                return;
            }
            if ("first" === place) {
                destination.insertAdjacentElement("afterbegin", element);
                return;
            }
            destination.children[place].insertAdjacentElement("beforebegin", element);
        };
        DynamicAdapt.prototype.moveBack = function(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (void 0 !== parent.children[index]) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
        };
        DynamicAdapt.prototype.indexInParent = function(parent, element) {
            const array = Array.prototype.slice.call(parent.children);
            return Array.prototype.indexOf.call(array, element);
        };
        DynamicAdapt.prototype.arraySort = function(arr) {
            if ("min" === this.type) Array.prototype.sort.call(arr, (function(a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if ("first" === a.place || "last" === b.place) return -1;
                    if ("last" === a.place || "first" === b.place) return 1;
                    return a.place - b.place;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                Array.prototype.sort.call(arr, (function(a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if ("first" === a.place || "last" === b.place) return 1;
                        if ("last" === a.place || "first" === b.place) return -1;
                        return b.place - a.place;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        };
        const da = new DynamicAdapt("max");
        da.init();
        let scrollLast = 0;
        const defaultOffSet = 250;
        const headerElement = document.querySelector(".header");
        const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
        const containHide = () => headerElement.classList.contains("_hide");
        window.addEventListener("scroll", (() => {
            if (scrollPosition() > scrollLast && !containHide() && defaultOffSet <= scrollPosition()) headerElement.classList.add("_hide"); else if (scrollPosition() < scrollLast && containHide()) headerElement.classList.remove("_hide");
            scrollLast = scrollPosition();
        }));
        const spans = document.querySelectorAll("[data-color]");
        const spansWidth = document.querySelectorAll(".chart-skills__item span");
        if (spans) for (let index = 0; index < spans.length; index++) {
            const span = spans[index];
            const colorSpan = span.dataset.color;
            spans[index].style.backgroundColor = `${colorSpan}`;
        }
        if (spansWidth) for (let index = 0; index < spansWidth.length; index++) {
            const span = spansWidth[index];
            const number = +span.textContent.replace("%", "");
            const spanWidth = 300 * number / 100;
            spans[index].style.width = `${spanWidth}px`;
        }
        window["FLS"] = true;
        isWebp();
        menuInit();
        spollers();
        headerScroll();
    })();
})();