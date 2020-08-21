/*!
  hey, [be]Lazy.js - v1.8.2 - 2016.10.25
  A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
(function (q, m) { "function" === typeof define && define.amd ? define(m) : "object" === typeof exports ? module.exports = m() : q.Blazy = m() })(this, function () { function q(b) { var c = b._util; c.elements = E(b.options); c.count = c.elements.length; c.destroyed && (c.destroyed = !1, b.options.container && l(b.options.container, function (a) { n(a, "scroll", c.validateT) }), n(window, "resize", c.saveViewportOffsetT), n(window, "resize", c.validateT), n(window, "scroll", c.validateT)); m(b) } function m(b) { for (var c = b._util, a = 0; a < c.count; a++) { var d = c.elements[a], e; a: { var g = d; e = b.options; var p = g.getBoundingClientRect(); if (e.container && y && (g = g.closest(e.containerClass))) { g = g.getBoundingClientRect(); e = r(g, f) ? r(p, { top: g.top - e.offset, right: g.right + e.offset, bottom: g.bottom + e.offset, left: g.left - e.offset }) : !1; break a } e = r(p, f) } if (e || t(d, b.options.successClass)) b.load(d), c.elements.splice(a, 1), c.count-- , a-- } 0 === c.count && b.destroy() } function r(b, c) { return b.right >= c.left && b.bottom >= c.top && b.left <= c.right && b.top <= c.bottom } function z(b, c, a) { if (!t(b, a.successClass) && (c || a.loadInvisible || 0 < b.offsetWidth && 0 < b.offsetHeight)) if (c = b.getAttribute(u) || b.getAttribute(a.src)) { c = c.split(a.separator); var d = c[A && 1 < c.length ? 1 : 0], e = b.getAttribute(a.srcset), g = "img" === b.nodeName.toLowerCase(), p = (c = b.parentNode) && "picture" === c.nodeName.toLowerCase(); if (g || void 0 === b.src) { var h = new Image, w = function () { a.error && a.error(b, "invalid"); v(b, a.errorClass); k(h, "error", w); k(h, "load", f) }, f = function () { g ? p || B(b, d, e) : b.style.backgroundImage = 'url("' + d + '")'; x(b, a); k(h, "load", f); k(h, "error", w) }; p && (h = b, l(c.getElementsByTagName("source"), function (b) { var c = a.srcset, e = b.getAttribute(c); e && (b.setAttribute("srcset", e), b.removeAttribute(c)) })); n(h, "error", w); n(h, "load", f); B(h, d, e) } else b.src = d, x(b, a) } else "video" === b.nodeName.toLowerCase() ? (l(b.getElementsByTagName("source"), function (b) { var c = a.src, e = b.getAttribute(c); e && (b.setAttribute("src", e), b.removeAttribute(c)) }), b.load(), x(b, a)) : (a.error && a.error(b, "missing"), v(b, a.errorClass)) } function x(b, c) { v(b, c.successClass); c.success && c.success(b); b.removeAttribute(c.src); b.removeAttribute(c.srcset); l(c.breakpoints, function (a) { b.removeAttribute(a.src) }) } function B(b, c, a) { a && b.setAttribute("srcset", a); b.src = c } function t(b, c) { return -1 !== (" " + b.className + " ").indexOf(" " + c + " ") } function v(b, c) { t(b, c) || (b.className += " " + c) } function E(b) { var c = []; b = b.root.querySelectorAll(b.selector); for (var a = b.length; a--; c.unshift(b[a])); return c } function C(b) { f.bottom = (window.innerHeight || document.documentElement.clientHeight) + b; f.right = (window.innerWidth || document.documentElement.clientWidth) + b } function n(b, c, a) { b.attachEvent ? b.attachEvent && b.attachEvent("on" + c, a) : b.addEventListener(c, a, { capture: !1, passive: !0 }) } function k(b, c, a) { b.detachEvent ? b.detachEvent && b.detachEvent("on" + c, a) : b.removeEventListener(c, a, { capture: !1, passive: !0 }) } function l(b, c) { if (b && c) for (var a = b.length, d = 0; d < a && !1 !== c(b[d], d); d++); } function D(b, c, a) { var d = 0; return function () { var e = +new Date; e - d < c || (d = e, b.apply(a, arguments)) } } var u, f, A, y; return function (b) { if (!document.querySelectorAll) { var c = document.createStyleSheet(); document.querySelectorAll = function (a, b, d, h, f) { f = document.all; b = []; a = a.replace(/\[for\b/gi, "[htmlFor").split(","); for (d = a.length; d--;) { c.addRule(a[d], "k:v"); for (h = f.length; h--;) f[h].currentStyle.k && b.push(f[h]); c.removeRule(0) } return b } } var a = this, d = a._util = {}; d.elements = []; d.destroyed = !0; a.options = b || {}; a.options.error = a.options.error || !1; a.options.offset = a.options.offset || 100; a.options.root = a.options.root || document; a.options.success = a.options.success || !1; a.options.selector = a.options.selector || ".b-lazy"; a.options.separator = a.options.separator || "|"; a.options.containerClass = a.options.container; a.options.container = a.options.containerClass ? document.querySelectorAll(a.options.containerClass) : !1; a.options.errorClass = a.options.errorClass || "b-error"; a.options.breakpoints = a.options.breakpoints || !1; a.options.loadInvisible = a.options.loadInvisible || !1; a.options.successClass = a.options.successClass || "b-loaded"; a.options.validateDelay = a.options.validateDelay || 25; a.options.saveViewportOffsetDelay = a.options.saveViewportOffsetDelay || 50; a.options.srcset = a.options.srcset || "data-srcset"; a.options.src = u = a.options.src || "data-src"; y = Element.prototype.closest; A = 1 < window.devicePixelRatio; f = {}; f.top = 0 - a.options.offset; f.left = 0 - a.options.offset; a.revalidate = function () { q(a) }; a.load = function (a, b) { var c = this.options; void 0 === a.length ? z(a, b, c) : l(a, function (a) { z(a, b, c) }) }; a.destroy = function () { var a = this._util; this.options.container && l(this.options.container, function (b) { k(b, "scroll", a.validateT) }); k(window, "scroll", a.validateT); k(window, "resize", a.validateT); k(window, "resize", a.saveViewportOffsetT); a.count = 0; a.elements.length = 0; a.destroyed = !0 }; d.validateT = D(function () { m(a) }, a.options.validateDelay, a); d.saveViewportOffsetT = D(function () { C(a.options.offset) }, a.options.saveViewportOffsetDelay, a); C(a.options.offset); l(a.options.breakpoints, function (a) { if (a.width >= window.screen.width) return u = a.src, !1 }); setTimeout(function () { q(a) }) } });


//Our initializer
var bLazy = new Blazy({
    breakpoints: [{
        width: 640 // Max-width
        , loadInvisible: true
        , src: 'data-src-small'
    },
    {
        width: 990 // Max-width
        , loadInvisible: true
        , src: 'data-src-medium'
    },
    {
        width: 1920 // Max-width
        , loadInvisible: true
        , src: 'data-src-large'
    }],
    success: function (e) {
        var thisImage = e;
        var mainFilter = thisImage.closest(".js-main-image-filter");

        if (mainFilter != null && thisImage.clientWidth > 1) {
            mainFilter.style.width = thisImage.clientWidth + "px";
        }

        if (thisImage.hasAttribute("data-secondary-image-src")) {
            if (thisImage.getAttribute("data-secondary-image-src") != "") {
                thisImage.onmouseover = function () {
                    thisImage.setAttribute("data-src", thisImage.src);
                    thisImage.src = thisImage.getAttribute("data-secondary-image-src");
                };
                thisImage.onmouseout = function () {
                    thisImage.src = thisImage.getAttribute("data-src");
                };
            }
        }
    }
});
var Buttons = function () { }

Buttons.prototype.LockButton = function (e, lockScreen) {
    var isFieldsValid = true;
    var clickedButton = e.currentTarget;
  
    if (clickedButton.type == "submit") {
        var form = document.forms[clickedButton.closest("form").name];
        isFieldsValid = [].slice.call(form.elements).every(function (field) {
            return field.validity.valid;
        });
    } 

    //Secure that there is time for a form time to submit
    if (!isFieldsValid) {
        return false;
    }

    setTimeout(function () {
        if (lockScreen) {
            var overlayElement = document.createElement('div');
            overlayElement.className = "preloader-overlay";
            overlayElement.setAttribute('id', "ButtonOverlay");
            var overlayElementIcon = document.createElement('div');
            overlayElementIcon.className = "preloader-overlay__icon dw-mod";
            overlayElementIcon.style.top = window.pageYOffset + "px";
            overlayElement.appendChild(overlayElementIcon);

            document.getElementById('content').parentNode.insertBefore(overlayElement, document.getElementById('content'));
        } else {
            var clickedButtonText = clickedButton.innerHTML;
            var clickedButtonWidth = clickedButton.offsetWidth;
            clickedButton.classList.add("disabled");
            clickedButton.disabled = true;
            clickedButton.innerHTML = "<i class=\"fas fa-circle-notch fa-spin\"></i>";
            clickedButton.style.width = clickedButtonWidth + "px";

            var event = new CustomEvent('buttonIsLocked');
            document.dispatchEvent(event);
            clickedButton.dispatchEvent(event);
        }
    }, 50);
}

var Buttons = new Buttons();
function CarouselModule(selector, options) {
    const self = this;
    const defaults = {
        direction: "horizontal",
        slidesInView: 1,
        slidesPerClick: 1,
        slideTime: 0,
        hideControls: false,
        hideControlsForMobile: true,
        dots: false,
        prevBtn: "carousel-prev-btn dw-mod",
        nextBtn: "carousel-next-btn dw-mod",
        showPreloader: true,
        preloaderSize: 3,
        enableSwiping: true,
        showCounter: false
    };

    //for default carousels
    selector = document.querySelectorAll(selector || ".js-carousel-container");
    if (!selector.length) {
        return;
    }

    this.settings = Object.assign({}, defaults, options);
    this.selector = selector;

    if (this.settings.showPreloader) {
        this.selector.forEach(function (carousel) {
            let preloaderOverlay = document.createElement("div");
            preloaderOverlay.className = "js-remove-after-load carousel__preloader-overlay";
            let preloader = document.createElement("div");
            preloader.className = "fas fa-" + this.settings.preloaderSize + "x fa-circle-notch fa-spin carousel__preloader";
            preloaderOverlay.appendChild(preloader);
            carousel.insertBefore(preloaderOverlay, carousel.childNodes[0] || null);
        }, this);
    }

    window.addEventListener("load", function () {
        self.Init();
    });
}

//options parameter will be depricated in next major version
CarouselModule.prototype.Init = function (options) {
    const self = this;
    this.carousels = {};
    this.selector.forEach(function (carousel) {
        let key = carousel.id;
        this.carousels[key] = {
            data: {
                currentTarget: carousel
            },
            settings: this.settings
        };

        /* support previous carousel's data-attributes
        ** it will also depricated in next major version */
        let carouselDataElement = carousel.querySelector('.js-carousel-data');
        let settingsFromAttributes = {};
        if (carouselDataElement) {
            settingsFromAttributes = {
                direction: carouselDataElement.getAttribute("data-direction") || "horizontal",
                slidesInView: parseInt(carouselDataElement.getAttribute("data-slides-in-view")) || 5,
                slidesPerClick: parseInt(carouselDataElement.getAttribute("data-slides-per-click")) || 1,
                slideTime: parseInt(carouselDataElement.getAttribute("data-carousel-slide-time")) || 0,
                dots: carouselDataElement.getAttribute("data-enable-dots") == "true",
                hideControls: true
            }
            this.carousels[key].settings = Object.assign({}, this.carousels[key].settings, settingsFromAttributes, options);
        }
        /* ------- */

        let data = this.carousels[key].data;
        let settings = this.carousels[key].settings;

        data.slidesList = carousel.querySelector('.js-carousel-slides');
        if (data.slidesList == null) {
            data.slidesList = carousel.firstElementChild;
        }
        data.totalSlides = data.slidesList.childElementCount;
        data.slidesLeft = data.totalSlides - settings.slidesInView + settings.slidesPerClick;
        data.currentSlide = 0;
        if (settings.direction == "vertical") {
            //set classes - this should be done before slide height calculation
            carousel.classList.add('carousel--vertical');
            [].slice.call(data.slidesList.children).forEach(function (slide) {
                slide.classList.add('carousel__slide--vertical');
            });

            data.slidesList.classList.remove("carousel__container--hidden");

            data.slideHeight = data.slidesList.offsetHeight / data.totalSlides;
            carousel.style.height = settings.slidesInView * data.slideHeight + "px";

            data.slidesList.style.top = 0;
            data.slidesList.style.height = 100 * (data.totalSlides / settings.slidesInView) + "%";
            
            [].slice.call(data.slidesList.children).forEach(function (slide) {
                slide.style.height = (100 / data.totalSlides) + "%";
            });
        } else {
            carousel.classList.add('carousel--horizontal');
            data.slidesList.style.left = 0;
            data.slidesList.style.width = 100 * (data.totalSlides / settings.slidesInView) + "%";
            [].slice.call(data.slidesList.children).forEach(function (slide) {
                slide.style.width = (100 / data.totalSlides) + "%";
                slide.classList.add('carousel__slide--horizontal');
            });
        }
        carousel.classList.remove("carousel--hidden");
        data.slidesList.classList.remove("carousel__container--hidden");

        if (data.totalSlides > 1 && settings.slideTime > 0) {
            //init autoSlideTimer
            data.autoSlideTimer = setInterval(function () {
                self.GetNextSlide(key);
            }, settings.slideTime * 1000);
        }

        var isTouchDevice = function () {
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        };
        let isTouch = isTouchDevice();

        //create controls-block
        data.controls = document.createElement("div");
        data.controls.className = "js-carousel-controls";
        data.currentTarget.appendChild(data.controls);

        //prev & next btns
        if (!settings.hideControls && data.totalSlides > 1 && data.totalSlides > settings.slidesInView && !(isTouch && settings.hideControlsForMobile && settings.slidesInView == 1)) {
            let prevBtn = document.createElement("div");
            prevBtn.className = settings.prevBtn;
            prevBtn.addEventListener('click', function () {
                self.GetPreviousSlide(key, true);
            });
            data.controls.appendChild(prevBtn);

            let nextBtn = document.createElement("div");
            nextBtn.className = settings.nextBtn;
            nextBtn.addEventListener('click', function () {
                self.GetNextSlide(key, true);
            });
            data.controls.appendChild(nextBtn);
        }

        //slide & zoom
        let startDragPoint = 0;
        let endDragPoint = 0;
        let startDragPosition = 0;
        const dragTreshold = 20; //%
        //let startDistance = 0;
        //let endDistance = 0;
        let zoom = 1;
        let isSwiping = false;
        let firstMove = false;
        let fingers = 0;
        let interaction = null;
        let startTouches = null;
        let endTouches = null;

        var getDistance = function (touches) {
            return Math.hypot(touches[0].pageX - touches[1].pageX, touches[0].pageY - touches[1].pageY);
        };

        var setInteraction = function (newInteraction, event) {
            if (interaction !== newInteraction) {

                if (interaction && !newInteraction) {
                    switch (interaction) {
                        case "zoom":
                            handleZoomEnd(event);
                            break;
                        case 'drag':
                            handleDragEnd(event);
                            break;
                    }
                }

                switch (newInteraction) {
                    case 'zoom':
                        handleZoomStart(event);
                        break;
                    case 'drag':
                        handleDragStart(event);
                        break;
                }
            }
            interaction = newInteraction;
        };

        var updateInteraction = function updateInteraction(event) {
            if (fingers === 2) {
                setInteraction('zoom', event);
            } else if (fingers === 1) {
                setInteraction('drag', event);
            } else {
                setInteraction(null, event);
            }
        };

        var setDragPoint = function (event) {
            return isTouch ? {
                x: event.changedTouches[0].clientX,
                y: event.changedTouches[0].clientY
            } : {
                x: event.clientX,
                y: event.clientY
            };
        }

        var handleDragStart = function (event) {
            startDragPoint = setDragPoint(event);
            startDragPosition = {
                left: data.slidesList.style.left,
                top: data.slidesList.style.top
            };
        };

        var handleDrag = function (event) {
            endDragPoint = setDragPoint(event);
            if (settings.direction == "horizontal") {
                data.slidesList.style.left = parseInt(startDragPosition.left) + -(startDragPoint.x - endDragPoint.x) / (carousel.offsetWidth / 100) + "%";
            } else {
                data.slidesList.style.top = parseInt(startDragPosition.top) + -(startDragPoint.y - endDragPoint.y) / (carousel.offsetHeight / 100) + "%";
            }
        };

        var handleDragEnd = function (event) {
            endDragPoint = setDragPoint(event);
            let dif = 0;
            if (settings.direction == "horizontal") {
                dif = (startDragPoint.x - endDragPoint.x) / (carousel.offsetWidth / 100);
            } else {
                dif = (startDragPoint.y - endDragPoint.y) / (carousel.offsetHeight / 100);
            }
            if (Math.abs(dif) > dragTreshold) {
                if (dif > 0) {
                    self.GetNextSlide(key, true);
                } else {
                    self.GetPreviousSlide(key, true);
                }
            } else {
                if (settings.direction == "horizontal") {
                    data.slidesList.style.left = startDragPosition.left;
                } else {
                    data.slidesList.style.top = startDragPosition.top;
                }
            }
        };

        var handleZoomStart = function (event) {
            //startDistance = getDistance(event.touches);
        };

        var handleZoom = function (event) {
            /*endDistance = getDistance(event.touches);
            document.getElementById('console').innerText = endDistance;
            zoom = zoom + (endDistance - startDistance) / 1000;
            if (zoom < 1) {
                zoom = 1;
            }
            event.target.style.transform = "scale(" + zoom + ")";*/
        };

        var handleZoomEnd = function (event) { };

        var onTouchStart = function (event) {
            if (event.target.closest('.js-carousel-controls')) {
                return;
            }
            firstMove = true;
            fingers = event.touches.length;
        };

        var onTouchMove = function (event) {
            if (firstMove) {
                updateInteraction(event);
                if (interaction) {
                    event.stopPropagation();
                    event.preventDefault();
                }
            } else {
                switch (interaction) {
                    case 'zoom':
                        handleZoom(event);
                        break;
                    case 'drag':
                        handleDrag(event);
                        break;
                }
                if (interaction) {
                    event.stopPropagation();
                    event.preventDefault();
                }
            }

            firstMove = false;
        };

        var onTouchEnd = function (event) {
            fingers = event.touches.length;
            updateInteraction(event);
        };

        var onMouseDown = function (event) {
            isSwiping = true;
            handleDragStart(event);
        };

        var onMouseMove = function (event) {
            if (isSwiping) {
                handleDrag(event);
                event.preventDefault();
            }
        };

        var onMouseUp = function (event) {
            if (isSwiping) {
                handleDragEnd(event);
                isSwiping = false;
            }
        };

        if (settings.enableSwiping && settings.slidesInView == 1 && data.totalSlides > 1) {
            if (isTouch) {
                carousel.addEventListener("touchstart", onTouchStart);
                carousel.addEventListener("touchmove", onTouchMove);
                carousel.addEventListener("touchend", onTouchEnd);
            } else {
                carousel.addEventListener("mousedown", onMouseDown);
                carousel.addEventListener("mousemove", onMouseMove);
                carousel.addEventListener("mouseup", onMouseUp);
                carousel.addEventListener("mouseleave", onMouseUp);
            }
        }

        if (settings.dots) {
            this.InitDots(key);
        }

        if (settings.showCounter) {
            data.counter = document.createElement('div');
            data.counter.className = 'carousel__counter';
            data.controls.appendChild(data.counter);
            this.RefreshCounter(key);
        }

        if (bLazy != null) {
            bLazy.revalidate();
        }

        let event = new CustomEvent('initSlideShow', { 'detail': Object.assign({key: key}, data, settings) });

        carousel.dispatchEvent(event);
        document.dispatchEvent(event);
    }, this);
}

CarouselModule.prototype.RefreshCounter = function(key) {
    let data = this.carousels[key].data;
    if (data.counter) {
        data.counter.innerText = (parseInt(data.currentSlide) + 1) + ' / ' + data.totalSlides;
    }
}

CarouselModule.prototype.GetPreviousSlide = function (key, stopAutoSliding) {
    let settings = this.carousels[key].settings;
    let data = this.carousels[key].data;

    if (stopAutoSliding) {
        clearTimeout(data.autoSlideTimer);
    }
    data.currentSlide = (data.currentSlide + data.slidesLeft - settings.slidesPerClick) % data.slidesLeft;
    this.ShiftSlide(key);
}

CarouselModule.prototype.GetNextSlide = function (key, stopAutoSliding) {
    let settings = this.carousels[key].settings;
    let data = this.carousels[key].data;

    if (stopAutoSliding) {
        clearTimeout(data.autoSlideTimer);
    }
    data.currentSlide = (data.currentSlide + settings.slidesPerClick) % data.slidesLeft;
    this.ShiftSlide(key);
}

CarouselModule.prototype.GoToSlide = function (key, number) {
    if (this.carousels == null) {
        return;
    }
    let data = this.carousels[key].data;

    clearTimeout(data.autoSlideTimer);
    data.currentSlide = parseInt(number);
    this.ShiftSlide(key);
}

//this function should be private
CarouselModule.prototype.ShiftSlide = function (key) {
    let settings = this.carousels[key].settings;
    let data = this.carousels[key].data;

    if (settings.direction == "vertical") {
        data.slidesList.style.top = -(data.currentSlide * (100 / settings.slidesInView)) + "%";
    } else {
        data.slidesList.style.left = -(data.currentSlide * (100 / settings.slidesInView)) + "%";
    }

    let currentSlideElement = data.slidesList.getElementsByClassName("js-carousel-slide")[data.currentSlide];

    if (settings.dots) {
        data.currentTarget.querySelectorAll('.js-carousel-dot').forEach(function (dot, index) {
            dot.classList.toggle('carousel__dot--active', index == data.currentSlide);
        });
    }

    this.RefreshCounter(key);

    let event = new CustomEvent('shiftSlide', { 'detail': Object.assign({key: key}, data, settings) });

    if (bLazy != null) {
        bLazy.revalidate();
    }

    data.currentTarget.dispatchEvent(event);
    document.dispatchEvent(event);
}

CarouselModule.prototype.InitDots = function (key) {
    const self = this;
    let settings = this.carousels[key].settings;
    let data = this.carousels[key].data;

    let dots = document.createElement("div");
    dots.className = "carousel__dots";
    for (let i = 0; i < data.totalSlides; i++) {
        let dot = document.createElement("div");
        dot.className = "carousel__dot js-carousel-dot";
        if (i == data.currentSlide) {
            dot.classList.add('carousel__dot--active');
        }
        dot.addEventListener('click', function () {
            self.GoToSlide(key, i);
        });
        dots.appendChild(dot);
    }
    data.controls.appendChild(dots);
}

window.addEventListener("load", function () {
    document.querySelectorAll(".js-remove-after-load").forEach(function (el) {
        el.remove();
    });
});

var Carousel = new CarouselModule();
const BUTTON_MODE_REMOVE = "remove";
const BUTTON_MODE_ADD = "add";

function DownloadCart(options) {
    const self = this;
    const defaults = {
        addButtonText: "Add",
        removeButtonText: "Remove",
        removeIcon: "fa-minus",
        addIcon: "fa-plus"
        //cartPageId
        //contextId
    };

    this.settings = Object.assign({}, defaults, options);
    this.Init();
}

DownloadCart.prototype.Init = function () {
    const self = this;
    let settings = this.settings;

    document.addEventListener("DOMContentLoaded", function (event) {
        self.AddEventsToButtons(document);

        //Make it work with Ajax loaded content
        document.addEventListener("contentLoaded", function (event) {
            self.AddEventsToButtons(document.getElementById(event.detail.containerId));
        }, false);

        //Make it work with updating templates
        document.addEventListener("updateTemplate", function (event) {
            self.AddEventsToButtons(document.getElementById(event.detail.containerId));
        }, false);
    });
}

DownloadCart.prototype.AddEventsToButtons = function (container) {
    const self = this;
    let settings = this.settings;

    let buttons = container.querySelectorAll(".js-add-to-downloads");
    if (!buttons.length) {
        return;
    }

    this.GetOrderLines(function (orderLines) {
        buttons.forEach(function (button) {
            let productItem = self.GetProductItemFromButton(button);
            let orderLine = orderLines.length > 0 ? self.GetOrderLineId(productItem, orderLines) : null;

            if (orderLine != null) {
                self.SwitchButtonMode(button, BUTTON_MODE_REMOVE, function () {
                    self.RemoveFromDownloadCart(orderLine.orderLineId, button);
                });
            } else {
                self.SwitchButtonMode(button, BUTTON_MODE_ADD, function () {
                    self.AddToDownloadCart(productItem, button);
                });
            }
        });
    });
}

DownloadCart.prototype.EnableButton = function (button) {
    button.removeChild(button.querySelector(".btn-spinner"));
    button.classList.remove("u-position-relative");
    for (let i = 0; i < button.children.length; i++) {
        button.children[i].classList.remove("u-visibility-hidden");
    };
    button.classList.remove("disabled");
    button.disabled = false;
}

DownloadCart.prototype.DisableButton = function (button) {
    button.classList.add("u-position-relative");

    for (let i = 0; i < button.children.length; i++) {
        button.children[i].classList.add("u-visibility-hidden");
    };

    button.classList.add("disabled");
    button.disabled = true;
    let spinner = document.createElement("i");
    spinner.className = "fas fa-circle-notch fa-spin btn-spinner";

    button.appendChild(spinner);
}

DownloadCart.prototype.GetOrderLineId = function (productItem, orderLines) {
    return orderLines.find(function(orderline, index, array){
        return orderline.id == productItem.productId;
    });
}

DownloadCart.prototype.AddToDownloadCart = function (productItem, button, onSuccessHandler) {
    const self = this;
    let settings = this.settings;

    let url = "/Default.aspx?ID=" + settings.cartPageId + "&Quantity=1&redirect=false&CartCmd=add&ProductID=" + productItem.productId;
    if (settings.contextId) {
        url += "&OrderContext=" + settings.contextId;
    }

    this.DisableButton(button);

    Request.Fetch().get(url,
        function (result) {
            if (onSuccessHandler) {
                onSuccessHandler(result);
            } else {
                //default
                self.SwitchButtonMode(button, BUTTON_MODE_REMOVE, function () {
                    self.RemoveFromDownloadCart(self.GetOrderLineId(productItem, result[0].OrderLines), button)
                });
                self.EnableButton(button);
            }
        },
        function () {
            console.error("DownloadCart: Error in AddToDownloadCart request");
        }
    );
}

DownloadCart.prototype.SwitchButtonMode = function (button, mode, onclick) {
    if (button.getAttribute("data-mode") == mode) {
        return;
    }

    let settings = this.settings;

    let iconElement = button.getElementsByClassName("js-button-icon")[0];
    iconElement.classList.toggle(settings.addIcon, mode == BUTTON_MODE_ADD);
    iconElement.classList.toggle(settings.removeIcon, mode == BUTTON_MODE_REMOVE);

    let span = button.getElementsByClassName("js-button-text")[0];
    if (span != null) {
        span.innerText = (mode == BUTTON_MODE_REMOVE ? settings.removeButtonText : settings.addButtonText);
    }

    button.title = (mode == BUTTON_MODE_REMOVE ? settings.removeButtonText : settings.addButtonText);
    button.setAttribute("data-mode", mode);
    button.onclick = onclick;
}

DownloadCart.prototype.GetProductItemFromButton = function (button) {
    return {
        productId: button.getAttribute("data-product-id")
    };
}

DownloadCart.prototype.RemoveFromDownloadCart = function (orderLineId, button, onSuccessHandler) {
    const self = this;
    let settings = this.settings;

    let url = "/Default.aspx?ID=" + settings.cartPageId + "&redirect=false&CartCmd=DelOrderLine&key=" + orderLineId;
    if (settings.contextId) {
        url += "&OrderContext=" + settings.contextId;
    }

    this.DisableButton(button);

    Request.Fetch().get(url,
        function (result) {
            if (onSuccessHandler) {
                onSuccessHandler(result);
            } else {
                //default
                self.SwitchButtonMode(button, BUTTON_MODE_ADD, function () {
                    self.AddToDownloadCart(self.GetProductItemFromButton(button), button)
                });
                self.EnableButton(button);
            }
        },
        function () {
            console.error("DownloadCart: Error in RemoveFromDownloadCart request");
        }
    );
}

DownloadCart.prototype.EmptyCart = function (callBack) {
    let settings = this.settings;

    let url = "/Default.aspx?ID=" + settings.cartPageId + "&cartcmd=emptycart";
    if (settings.contextId) {
        url += "&OrderContext=" + settings.contextId;
    }

    Request.Fetch().get(url,
        function (result) {
            if (callBack != null) {
                callBack(result);
            }
        },
        function (result) {
            console.error("DownloadCart: Error in Empty cart request request");
        },
        false
    );
}

DownloadCart.prototype.GetOrderLines = function (onSuccess) {
    let settings = this.settings;

    let url = "/Default.aspx?ID=" + settings.cartPageId;

    if (settings.contextId) {
        url += "&OrderContext=" + settings.contextId;
    }

    Request.Fetch().get(url,
        function (result) {
            onSuccess(result[0].OrderLines);
        }, function (result) {
            console.error("DownloadCart: Error in GetOrderLines request");
        }
    );
}
function DrawingCanvas(settings) {
    this.canvas = settings.canvas;
    this.clearBtn = settings.clearBtn;
    this.startText = settings.startText;

    this.context = this.canvas.getContext("2d");
    this.points = [];

    //short links
    let canvas = this.canvas;
    let context = this.context;
    let self = this;

    let isDrawing = false;
    let isTouch = isTouchDevice();

    function isTouchDevice() {
        let prefixes = " -webkit- -moz- -o- -ms- ".split(" ");
        let matchQuery = function (query) {
            return window.matchMedia(query).matches;
        }
        if (("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch) {
            return true;
        }
        // include the 'heartz' as a way to have a non matching MQ to help terminate the join
        // https://git.io/vznFH
        let query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("");
        return matchQuery(query);
    }

    function makeCanvasFitToParentSize() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        self.Redraw();
    }

    function getMousePosition(e) {
        let rect = canvas.getBoundingClientRect();
        return isTouch ? {
            x: e.changedTouches[0].clientX - rect.left,
            y: e.changedTouches[0].clientY - rect.top
        } : {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    function init() {
        //init
        makeCanvasFitToParentSize();
        self.DrawStartText();

        let startEvent = isTouch ? "touchstart" : "mousedown";
        let moveEvent = isTouch ? "touchmove" : "mousemove";
        let endEvent = isTouch ? "touchend" : "mouseup";

        //start
        canvas.addEventListener(startEvent, function (e) {
            e.stopPropagation();
            e.preventDefault();
            isDrawing = true;
            self.points.push(getMousePosition(e));
            self.Redraw();
        });
        //move
        canvas.addEventListener(moveEvent, function (e) {
            if (isDrawing) {
                let point = getMousePosition(e);
                point.isDragging = true;
                self.points.push(point);
                self.Redraw();
            }
        });
        //end
        canvas.addEventListener(endEvent, function (e) {
            isDrawing = false;

            let event = new CustomEvent("endCanvasDrawing", { "detail": { "points": self.points } });
            canvas.dispatchEvent(event);
        });
        //resize
        window.addEventListener("resize", makeCanvasFitToParentSize, false);
    }

    init();
}

DrawingCanvas.prototype.Redraw = function () {
    //short links
    let canvas = this.canvas;
    let context = this.context;
    let points = this.points;

    context.clearRect(0, 0, canvas.width, canvas.height); // Clears the canvas

    context.strokeStyle = "#000000";
    context.lineJoin = "round";
    context.lineWidth = 3;

    for (let i = 0; i < points.length; i++) {
        context.beginPath();
        if (points[i].isDragging) {
            context.moveTo(points[i - 1].x, points[i - 1].y);
        } else {
            context.moveTo(points[i].x - 1, points[i].y);
        }
        context.lineTo(points[i].x, points[i].y);
        context.closePath();
        context.stroke();
    }
}

DrawingCanvas.prototype.DrawStartText = function () {
    //short links
    let canvas = this.canvas;
    let context = this.context;

    context.textAlign = "center";
    context.font = "15px Arial";
    context.fillStyle = "#aaa";
    if (this.startText) {
        context.fillText(this.startText, canvas.width / 2, canvas.height / 2);
    }
}

DrawingCanvas.prototype.Clear = function () {
    this.points = [];
    this.Redraw();
    this.DrawStartText();
    let event = new CustomEvent("endCanvasDrawing", { "detail": { "points": this.points } });
    this.canvas.dispatchEvent(event);
}

DrawingCanvas.prototype.DrawPoints = function (points) {
    this.points = points;
    this.Redraw();
}
var Expand = function () { }

document.addEventListener("DOMContentLoaded", function (event) {
    if (RememberState == null) {
        Expand.initExpandTriggers();
    }

    //Make it work with Ajax loaded content
    var ajaxContainer = document.getElementsByClassName("js-handlebars-root");
    if (ajaxContainer.length > 0) {
        for (var i = 0; i < ajaxContainer.length; i++) {
            ajaxContainer[i].addEventListener('contentLoaded', function (e) {
                Expand.initExpandTriggers();
            }, false);
        }
    }
});

if (RememberState != null) {
    document.addEventListener("rememberStatesSet", function () {
        Expand.initExpandTriggers();
    });
}

Expand.prototype.initExpandTriggers = function () {
    document.querySelectorAll("[data-expand]").forEach(function (trigger) {
        var change = function () {
            var expandBlocks = document.querySelectorAll("[data-trigger=" + trigger.getAttribute("data-expand") + "]");
            expandBlocks.forEach(function (block) {
                if (block.classList.contains("js-expand-hide")) {
                    block.classList.toggle("expandable--collapsed", trigger.checked);
                } else {
                    block.classList.toggle("expandable--collapsed", !trigger.checked);
                }
            });
        };
        trigger.addEventListener('change', change);
        change(); //sync with start values
    });
}

Expand.prototype.triggerOnChange = function (element) {
    if ("createEvent" in document) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        element.dispatchEvent(evt);
    } else {
        element.fireEvent("onchange");
    }
}

Expand.prototype.changeTriggerValue = function (trigger, value) {
    trigger.checked = value;
    this.triggerOnChange(trigger);
}

var Expand = new Expand();
var Facets = function () { }

Facets.prototype.Init = function (selectedFacetsListId, containerId) {
    this.selectedFacets = document.querySelectorAll("#" + selectedFacetsListId + " [data-check]");
    this.container = document.getElementById(containerId);
    this.facetsQueryList = [];
    this.facetsToRemove = [];
    this.facetsToAdd = [];
    this.selectedFacets.forEach(function (facet) {
        var name = facet.getAttribute("name");
        var value = facet.getAttribute("value");
        this.facetsQueryList.push({ name: name, value: value });
    }, this);
}
//now this.facetsQueryList contains all preselected facets

Facets.prototype.UpdateFacets = function (facet) {
    var name = facet.getAttribute("name");
    var value = facet.getAttribute("value");
    if (facet.checked || facet.getAttribute("data-check") == "") {
        if (!this.facetsQueryList.hasOwnProperty(name)) {
            this.facetsQueryList[name] = [];
        }
        this.facetsQueryList[name].push(value);
        facet.setAttribute("data-check", "checked");
        facet.classList.add("checked");
        this.facetsToAdd.push({name: name, value: value});
    } else {
        this.facetsQueryList.splice(this.facetsQueryList.indexOf({ name: name, value: value }), 1);
        facet.setAttribute("data-check", "");
        facet.classList.remove("checked");
        this.facetsToRemove.push({ name: name, value: value });
    }
    this.Synchronize();
}

Facets.prototype.ResetFacets = function () {
    this.facetsQueryList.forEach(function (facet) {
        this.facetsToRemove.push({ name: facet.name, value: facet.value });
    }, this);
    this.Synchronize();
}

//Synchronize virtual facets state with real DOM and URL
Facets.prototype.Synchronize = function () {
    var queryParams = new QueryArray(this.container.getAttribute("data-json-feed"));
    var browserParams = new QueryArray(window.location.href);

    //sync adding
    this.facetsToAdd.forEach(function (facet) {
        if (queryParams.hasParam(facet.name) && queryParams.getValue(facet.name).trim() != "") {
            facet.value = queryParams.getValue(facet.name) + "," + facet.value;
        }
        queryParams.setValue(facet.name, facet.value);
        browserParams.setValue(facet.name, facet.value);
    });
    this.facetsToAdd = [];

    //sync removing
    this.facetsToRemove.forEach(function (facet) {
        if (queryParams.hasParam(facet.name)) {
            var commaArray = queryParams.getValue(facet.name).split("],[");
            
            if (commaArray.length > 1) {
                commaArray[0] = commaArray[0].substring(1); // delete first [
                commaArray[commaArray.length - 1] = commaArray[commaArray.length - 1].slice(0, -1); //delete last ]
                commaArray = commaArray.map(function (el) { return '[' + el + ']' });

                var i = commaArray.indexOf(facet.value);
                if (i != -1) {
                    commaArray.splice(i, 1);
                    queryParams.setValue(facet.name, commaArray.join(","));
                    browserParams.setValue(facet.name, commaArray.join(","));
                }
            } else {
                if (queryParams.getValue(facet.name) == facet.value) {
                    queryParams.remove(facet.name);
                    browserParams.remove(facet.name);
                }
            }
        }
    });
    this.facetsToRemove = [];
        
    //update container
    HandlebarsBolt.UpdateContent(this.container.getAttribute("id"), queryParams.getFullUrl(), false, this.container.getAttribute("data-template"), "overlay");
    //update url
    history.pushState(null, null, browserParams.getFullUrl());
}

var Facets = new Facets();
const FileUpload = {
    setValueToFakeInput: function (realInput) {
        let fakeInput = realInput.parentElement.querySelector(".js-fake-input");
        let noFilesText = realInput.getAttribute("data-no-files-text");
        let manyFilesText = realInput.getAttribute("data-many-files-text");
        if (realInput.files.length == 0) {
            fakeInput.innerText = noFilesText;
        } else if (realInput.files.length <= 3) {
            fakeInput.innerText = [].slice.call(realInput.files).map(function (file) {
                return file.name;
            }).join(", ");
        } else {
            fakeInput.innerText = realInput.files.length + " " + manyFilesText;
        }
    }
}
var Filter = function () { }

Filter.prototype.FilterItems = function (e) {
    var currentFilter = e.currentTarget;
    var searchString  = currentFilter.value.toLowerCase();
    var filterItems   = currentFilter.closest(".js-filter").querySelectorAll('[data-filter-value]');

    filterItems.forEach(function (filterItem) {
        var filterItemValue = filterItem.getAttribute("data-filter-value").toLowerCase();
        filterItem.classList.toggle("u-hidden", filterItemValue.indexOf(searchString) == -1);
    });
}

var Filter = new Filter();
/* flatpickr v4.5.7,, @license MIT */
!function (e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).flatpickr = t() }(this, function () { "use strict"; var e = function () { return (e = Object.assign || function (e) { for (var t, n = 1, a = arguments.length; n < a; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]); return e }).apply(this, arguments) }, t = ["onChange", "onClose", "onDayCreate", "onDestroy", "onKeyDown", "onMonthChange", "onOpen", "onParseConfig", "onReady", "onValueUpdate", "onYearChange", "onPreCalendarPosition"], n = { _disable: [], _enable: [], allowInput: !1, altFormat: "F j, Y", altInput: !1, altInputClass: "form-control input", animate: "object" == typeof window && -1 === window.navigator.userAgent.indexOf("MSIE"), ariaDateFormat: "F j, Y", clickOpens: !0, closeOnSelect: !0, conjunction: ", ", dateFormat: "Y-m-d", defaultHour: 12, defaultMinute: 0, defaultSeconds: 0, disable: [], disableMobile: !1, enable: [], enableSeconds: !1, enableTime: !1, errorHandler: function (e) { return "undefined" != typeof console && console.warn(e) }, getWeek: function (e) { var t = new Date(e.getTime()); t.setHours(0, 0, 0, 0), t.setDate(t.getDate() + 3 - (t.getDay() + 6) % 7); var n = new Date(t.getFullYear(), 0, 4); return 1 + Math.round(((t.getTime() - n.getTime()) / 864e5 - 3 + (n.getDay() + 6) % 7) / 7) }, hourIncrement: 1, ignoredFocusElements: [], inline: !1, locale: "default", minuteIncrement: 5, mode: "single", nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>", noCalendar: !1, now: new Date, onChange: [], onClose: [], onDayCreate: [], onDestroy: [], onKeyDown: [], onMonthChange: [], onOpen: [], onParseConfig: [], onReady: [], onValueUpdate: [], onYearChange: [], onPreCalendarPosition: [], plugins: [], position: "auto", positionElement: void 0, prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>", shorthandCurrentMonth: !1, showMonths: 1, static: !1, time_24hr: !1, weekNumbers: !1, wrap: !1 }, a = { weekdays: { shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], longhand: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }, months: { shorthand: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], longhand: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] }, daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], firstDayOfWeek: 0, ordinal: function (e) { var t = e % 100; if (t > 3 && t < 21) return "th"; switch (t % 10) { case 1: return "st"; case 2: return "nd"; case 3: return "rd"; default: return "th" } }, rangeSeparator: " to ", weekAbbreviation: "Wk", scrollTitle: "Scroll to increment", toggleTitle: "Click to toggle", amPM: ["AM", "PM"], yearAriaLabel: "Year" }, i = function (e) { return ("0" + e).slice(-2) }, o = function (e) { return !0 === e ? 1 : 0 }; function r(e, t, n) { var a; return void 0 === n && (n = !1), function () { var i = this, o = arguments; null !== a && clearTimeout(a), a = window.setTimeout(function () { a = null, n || e.apply(i, o) }, t), n && !a && e.apply(i, o) } } var l = function (e) { return e instanceof Array ? e : [e] }; function c(e, t, n) { if (!0 === n) return e.classList.add(t); e.classList.remove(t) } function d(e, t, n) { var a = window.document.createElement(e); return t = t || "", n = n || "", a.className = t, void 0 !== n && (a.textContent = n), a } function s(e) { for (; e.firstChild;) e.removeChild(e.firstChild) } function u(e, t) { var n = d("div", "numInputWrapper"), a = d("input", "numInput " + e), i = d("span", "arrowUp"), o = d("span", "arrowDown"); if (-1 === navigator.userAgent.indexOf("MSIE 9.0") ? a.type = "number" : (a.type = "text", a.pattern = "\\d*"), void 0 !== t) for (var r in t) a.setAttribute(r, t[r]); return n.appendChild(a), n.appendChild(i), n.appendChild(o), n } var f = function () { }, m = function (e, t, n) { return n.months[t ? "shorthand" : "longhand"][e] }, g = { D: f, F: function (e, t, n) { e.setMonth(n.months.longhand.indexOf(t)) }, G: function (e, t) { e.setHours(parseFloat(t)) }, H: function (e, t) { e.setHours(parseFloat(t)) }, J: function (e, t) { e.setDate(parseFloat(t)) }, K: function (e, t, n) { e.setHours(e.getHours() % 12 + 12 * o(new RegExp(n.amPM[1], "i").test(t))) }, M: function (e, t, n) { e.setMonth(n.months.shorthand.indexOf(t)) }, S: function (e, t) { e.setSeconds(parseFloat(t)) }, U: function (e, t) { return new Date(1e3 * parseFloat(t)) }, W: function (e, t) { var n = parseInt(t); return new Date(e.getFullYear(), 0, 2 + 7 * (n - 1), 0, 0, 0, 0) }, Y: function (e, t) { e.setFullYear(parseFloat(t)) }, Z: function (e, t) { return new Date(t) }, d: function (e, t) { e.setDate(parseFloat(t)) }, h: function (e, t) { e.setHours(parseFloat(t)) }, i: function (e, t) { e.setMinutes(parseFloat(t)) }, j: function (e, t) { e.setDate(parseFloat(t)) }, l: f, m: function (e, t) { e.setMonth(parseFloat(t) - 1) }, n: function (e, t) { e.setMonth(parseFloat(t) - 1) }, s: function (e, t) { e.setSeconds(parseFloat(t)) }, u: function (e, t) { return new Date(parseFloat(t)) }, w: f, y: function (e, t) { e.setFullYear(2e3 + parseFloat(t)) } }, p = { D: "(\\w+)", F: "(\\w+)", G: "(\\d\\d|\\d)", H: "(\\d\\d|\\d)", J: "(\\d\\d|\\d)\\w+", K: "", M: "(\\w+)", S: "(\\d\\d|\\d)", U: "(.+)", W: "(\\d\\d|\\d)", Y: "(\\d{4})", Z: "(.+)", d: "(\\d\\d|\\d)", h: "(\\d\\d|\\d)", i: "(\\d\\d|\\d)", j: "(\\d\\d|\\d)", l: "(\\w+)", m: "(\\d\\d|\\d)", n: "(\\d\\d|\\d)", s: "(\\d\\d|\\d)", u: "(.+)", w: "(\\d\\d|\\d)", y: "(\\d{2})" }, h = { Z: function (e) { return e.toISOString() }, D: function (e, t, n) { return t.weekdays.shorthand[h.w(e, t, n)] }, F: function (e, t, n) { return m(h.n(e, t, n) - 1, !1, t) }, G: function (e, t, n) { return i(h.h(e, t, n)) }, H: function (e) { return i(e.getHours()) }, J: function (e, t) { return void 0 !== t.ordinal ? e.getDate() + t.ordinal(e.getDate()) : e.getDate() }, K: function (e, t) { return t.amPM[o(e.getHours() > 11)] }, M: function (e, t) { return m(e.getMonth(), !0, t) }, S: function (e) { return i(e.getSeconds()) }, U: function (e) { return e.getTime() / 1e3 }, W: function (e, t, n) { return n.getWeek(e) }, Y: function (e) { return e.getFullYear() }, d: function (e) { return i(e.getDate()) }, h: function (e) { return e.getHours() % 12 ? e.getHours() % 12 : 12 }, i: function (e) { return i(e.getMinutes()) }, j: function (e) { return e.getDate() }, l: function (e, t) { return t.weekdays.longhand[e.getDay()] }, m: function (e) { return i(e.getMonth() + 1) }, n: function (e) { return e.getMonth() + 1 }, s: function (e) { return e.getSeconds() }, u: function (e) { return e.getTime() }, w: function (e) { return e.getDay() }, y: function (e) { return String(e.getFullYear()).substring(2) } }, v = function (e) { var t = e.config, i = void 0 === t ? n : t, o = e.l10n, r = void 0 === o ? a : o; return function (e, t, n) { var a = n || r; return void 0 !== i.formatDate ? i.formatDate(e, t, a) : t.split("").map(function (t, n, o) { return h[t] && "\\" !== o[n - 1] ? h[t](e, a, i) : "\\" !== t ? t : "" }).join("") } }, D = function (e) { var t = e.config, i = void 0 === t ? n : t, o = e.l10n, r = void 0 === o ? a : o; return function (e, t, a, o) { if (0 === e || e) { var l, c = o || r, d = e; if (e instanceof Date) l = new Date(e.getTime()); else if ("string" != typeof e && void 0 !== e.toFixed) l = new Date(e); else if ("string" == typeof e) { var s = t || (i || n).dateFormat, u = String(e).trim(); if ("today" === u) l = new Date, a = !0; else if (/Z$/.test(u) || /GMT$/.test(u)) l = new Date(e); else if (i && i.parseDate) l = i.parseDate(e, s); else { l = i && i.noCalendar ? new Date((new Date).setHours(0, 0, 0, 0)) : new Date((new Date).getFullYear(), 0, 1, 0, 0, 0, 0); for (var f = void 0, m = [], h = 0, v = 0, D = ""; h < s.length; h++) { var w = s[h], b = "\\" === w, y = "\\" === s[h - 1] || b; if (p[w] && !y) { D += p[w]; var C = new RegExp(D).exec(e); C && (f = !0) && m["Y" !== w ? "push" : "unshift"]({ fn: g[w], val: C[++v] }) } else b || (D += "."); m.forEach(function (e) { var t = e.fn, n = e.val; return l = t(l, n, c) || l }) } l = f ? l : void 0 } } if (l instanceof Date && !isNaN(l.getTime())) return !0 === a && l.setHours(0, 0, 0, 0), l; i.errorHandler(new Error("Invalid date provided: " + d)) } } }; function w(e, t, n) { return void 0 === n && (n = !0), !1 !== n ? new Date(e.getTime()).setHours(0, 0, 0, 0) - new Date(t.getTime()).setHours(0, 0, 0, 0) : e.getTime() - t.getTime() } var b = function (e, t, n) { return e > Math.min(t, n) && e < Math.max(t, n) }, y = { DAY: 864e5 }; "function" != typeof Object.assign && (Object.assign = function (e) { for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n]; if (!e) throw TypeError("Cannot convert undefined or null to object"); for (var a = function (t) { t && Object.keys(t).forEach(function (n) { return e[n] = t[n] }) }, i = 0, o = t; i < o.length; i++) { a(o[i]) } return e }); var C = 300; function M(n, f) { var g = { config: e({}, E.defaultConfig), l10n: a }; function h(e) { return e.bind(g) } function M() { var e = g.config; !1 === e.weekNumbers && 1 === e.showMonths || !0 !== e.noCalendar && window.requestAnimationFrame(function () { if (void 0 !== g.calendarContainer && (g.calendarContainer.style.visibility = "hidden", g.calendarContainer.style.display = "block"), void 0 !== g.daysContainer) { var t = (g.days.offsetWidth + 1) * e.showMonths; g.daysContainer.style.width = t + "px", g.calendarContainer.style.width = t + (void 0 !== g.weekWrapper ? g.weekWrapper.offsetWidth : 0) + "px", g.calendarContainer.style.removeProperty("visibility"), g.calendarContainer.style.removeProperty("display") } }) } function x(e) { 0 === g.selectedDates.length && ne(), void 0 !== e && "blur" !== e.type && function (e) { e.preventDefault(); var t = "keydown" === e.type, n = e.target; void 0 !== g.amPM && e.target === g.amPM && (g.amPM.textContent = g.l10n.amPM[o(g.amPM.textContent === g.l10n.amPM[0])]); var a = parseFloat(n.getAttribute("min")), r = parseFloat(n.getAttribute("max")), l = parseFloat(n.getAttribute("step")), c = parseInt(n.value, 10), d = e.delta || (t ? 38 === e.which ? 1 : -1 : 0), s = c + l * d; if (void 0 !== n.value && 2 === n.value.length) { var u = n === g.hourElement, f = n === g.minuteElement; s < a ? (s = r + s + o(!u) + (o(u) && o(!g.amPM)), f && Y(void 0, -1, g.hourElement)) : s > r && (s = n === g.hourElement ? s - r - o(!g.amPM) : a, f && Y(void 0, 1, g.hourElement)), g.amPM && u && (1 === l ? s + c === 23 : Math.abs(s - c) > l) && (g.amPM.textContent = g.l10n.amPM[o(g.amPM.textContent === g.l10n.amPM[0])]), n.value = i(s) } }(e); var t = g._input.value; T(), ve(), g._input.value !== t && g._debouncedChange() } function T() { if (void 0 !== g.hourElement && void 0 !== g.minuteElement) { var e, t, n = (parseInt(g.hourElement.value.slice(-2), 10) || 0) % 24, a = (parseInt(g.minuteElement.value, 10) || 0) % 60, i = void 0 !== g.secondElement ? (parseInt(g.secondElement.value, 10) || 0) % 60 : 0; void 0 !== g.amPM && (e = n, t = g.amPM.textContent, n = e % 12 + 12 * o(t === g.l10n.amPM[1])); var r = void 0 !== g.config.minTime || g.config.minDate && g.minDateHasTime && g.latestSelectedDateObj && 0 === w(g.latestSelectedDateObj, g.config.minDate, !0); if (void 0 !== g.config.maxTime || g.config.maxDate && g.maxDateHasTime && g.latestSelectedDateObj && 0 === w(g.latestSelectedDateObj, g.config.maxDate, !0)) { var l = void 0 !== g.config.maxTime ? g.config.maxTime : g.config.maxDate; (n = Math.min(n, l.getHours())) === l.getHours() && (a = Math.min(a, l.getMinutes())), a === l.getMinutes() && (i = Math.min(i, l.getSeconds())) } if (r) { var c = void 0 !== g.config.minTime ? g.config.minTime : g.config.minDate; (n = Math.max(n, c.getHours())) === c.getHours() && (a = Math.max(a, c.getMinutes())), a === c.getMinutes() && (i = Math.max(i, c.getSeconds())) } O(n, a, i) } } function k(e) { var t = e || g.latestSelectedDateObj; t && O(t.getHours(), t.getMinutes(), t.getSeconds()) } function I() { var e = g.config.defaultHour, t = g.config.defaultMinute, n = g.config.defaultSeconds; if (void 0 !== g.config.minDate) { var a = g.config.minDate.getHours(), i = g.config.minDate.getMinutes(); (e = Math.max(e, a)) === a && (t = Math.max(i, t)), e === a && t === i && (n = g.config.minDate.getSeconds()) } if (void 0 !== g.config.maxDate) { var o = g.config.maxDate.getHours(), r = g.config.maxDate.getMinutes(); (e = Math.min(e, o)) === o && (t = Math.min(r, t)), e === o && t === r && (n = g.config.maxDate.getSeconds()) } O(e, t, n) } function O(e, t, n) { void 0 !== g.latestSelectedDateObj && g.latestSelectedDateObj.setHours(e % 24, t, n || 0, 0), g.hourElement && g.minuteElement && !g.isMobile && (g.hourElement.value = i(g.config.time_24hr ? e : (12 + e) % 12 + 12 * o(e % 12 == 0)), g.minuteElement.value = i(t), void 0 !== g.amPM && (g.amPM.textContent = g.l10n.amPM[o(e >= 12)]), void 0 !== g.secondElement && (g.secondElement.value = i(n))) } function S(e) { var t = parseInt(e.target.value) + (e.delta || 0); (t / 1e3 > 1 || "Enter" === e.key && !/[^\d]/.test(t.toString())) && V(t) } function _(e, t, n, a) { return t instanceof Array ? t.forEach(function (t) { return _(e, t, n, a) }) : e instanceof Array ? e.forEach(function (e) { return _(e, t, n, a) }) : (e.addEventListener(t, n, a), void g._handlers.push({ element: e, event: t, handler: n, options: a })) } function N(e) { return function (t) { 1 === t.which && e(t) } } function F() { fe("onChange") } function P(e) { var t = void 0 !== e ? g.parseDate(e) : g.latestSelectedDateObj || (g.config.minDate && g.config.minDate > g.now ? g.config.minDate : g.config.maxDate && g.config.maxDate < g.now ? g.config.maxDate : g.now); try { void 0 !== t && (g.currentYear = t.getFullYear(), g.currentMonth = t.getMonth()) } catch (e) { e.message = "Invalid date supplied: " + t, g.config.errorHandler(e) } g.redraw() } function A(e) { ~e.target.className.indexOf("arrow") && Y(e, e.target.classList.contains("arrowUp") ? 1 : -1) } function Y(e, t, n) { var a = e && e.target, i = n || a && a.parentNode && a.parentNode.firstChild, o = me("increment"); o.delta = t, i && i.dispatchEvent(o) } function j(e, t, n, a) { var i = Z(t, !0), o = d("span", "flatpickr-day " + e, t.getDate().toString()); return o.dateObj = t, o.$i = a, o.setAttribute("aria-label", g.formatDate(t, g.config.ariaDateFormat)), -1 === e.indexOf("hidden") && 0 === w(t, g.now) && (g.todayDateElem = o, o.classList.add("today"), o.setAttribute("aria-current", "date")), i ? (o.tabIndex = -1, ge(t) && (o.classList.add("selected"), g.selectedDateElem = o, "range" === g.config.mode && (c(o, "startRange", g.selectedDates[0] && 0 === w(t, g.selectedDates[0], !0)), c(o, "endRange", g.selectedDates[1] && 0 === w(t, g.selectedDates[1], !0)), "nextMonthDay" === e && o.classList.add("inRange")))) : o.classList.add("disabled"), "range" === g.config.mode && function (e) { return !("range" !== g.config.mode || g.selectedDates.length < 2) && w(e, g.selectedDates[0]) >= 0 && w(e, g.selectedDates[1]) <= 0 }(t) && !ge(t) && o.classList.add("inRange"), g.weekNumbers && 1 === g.config.showMonths && "prevMonthDay" !== e && n % 7 == 1 && g.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + g.config.getWeek(t) + "</span>"), fe("onDayCreate", o), o } function H(e) { e.focus(), "range" === g.config.mode && ee(e) } function L(e) { for (var t = e > 0 ? 0 : g.config.showMonths - 1, n = e > 0 ? g.config.showMonths : -1, a = t; a != n; a += e) for (var i = g.daysContainer.children[a], o = e > 0 ? 0 : i.children.length - 1, r = e > 0 ? i.children.length : -1, l = o; l != r; l += e) { var c = i.children[l]; if (-1 === c.className.indexOf("hidden") && Z(c.dateObj)) return c } } function W(e, t) { var n = Q(document.activeElement || document.body), a = void 0 !== e ? e : n ? document.activeElement : void 0 !== g.selectedDateElem && Q(g.selectedDateElem) ? g.selectedDateElem : void 0 !== g.todayDateElem && Q(g.todayDateElem) ? g.todayDateElem : L(t > 0 ? 1 : -1); return void 0 === a ? g._input.focus() : n ? void function (e, t) { for (var n = -1 === e.className.indexOf("Month") ? e.dateObj.getMonth() : g.currentMonth, a = t > 0 ? g.config.showMonths : -1, i = t > 0 ? 1 : -1, o = n - g.currentMonth; o != a; o += i) for (var r = g.daysContainer.children[o], l = n - g.currentMonth === o ? e.$i + t : t < 0 ? r.children.length - 1 : 0, c = r.children.length, d = l; d >= 0 && d < c && d != (t > 0 ? c : -1) ; d += i) { var s = r.children[d]; if (-1 === s.className.indexOf("hidden") && Z(s.dateObj) && Math.abs(e.$i - d) >= Math.abs(t)) return H(s) } g.changeMonth(i), W(L(i), 0) }(a, t) : H(a) } function R(e, t) { for (var n = (new Date(e, t, 1).getDay() - g.l10n.firstDayOfWeek + 7) % 7, a = g.utils.getDaysInMonth((t - 1 + 12) % 12), i = g.utils.getDaysInMonth(t), o = window.document.createDocumentFragment(), r = g.config.showMonths > 1, l = r ? "prevMonthDay hidden" : "prevMonthDay", c = r ? "nextMonthDay hidden" : "nextMonthDay", s = a + 1 - n, u = 0; s <= a; s++, u++) o.appendChild(j(l, new Date(e, t - 1, s), s, u)); for (s = 1; s <= i; s++, u++) o.appendChild(j("", new Date(e, t, s), s, u)); for (var f = i + 1; f <= 42 - n && (1 === g.config.showMonths || u % 7 != 0) ; f++, u++) o.appendChild(j(c, new Date(e, t + 1, f % i), f, u)); var m = d("div", "dayContainer"); return m.appendChild(o), m } function B() { if (void 0 !== g.daysContainer) { s(g.daysContainer), g.weekNumbers && s(g.weekNumbers); for (var e = document.createDocumentFragment(), t = 0; t < g.config.showMonths; t++) { var n = new Date(g.currentYear, g.currentMonth, 1); n.setMonth(g.currentMonth + t), e.appendChild(R(n.getFullYear(), n.getMonth())) } g.daysContainer.appendChild(e), g.days = g.daysContainer.firstChild, "range" === g.config.mode && 1 === g.selectedDates.length && ee() } } function K() { var e = d("div", "flatpickr-month"), t = window.document.createDocumentFragment(), n = d("span", "cur-month"), a = u("cur-year", { tabindex: "-1" }), i = a.getElementsByTagName("input")[0]; i.setAttribute("aria-label", g.l10n.yearAriaLabel), g.config.minDate && i.setAttribute("min", g.config.minDate.getFullYear().toString()), g.config.maxDate && (i.setAttribute("max", g.config.maxDate.getFullYear().toString()), i.disabled = !!g.config.minDate && g.config.minDate.getFullYear() === g.config.maxDate.getFullYear()); var o = d("div", "flatpickr-current-month"); return o.appendChild(n), o.appendChild(a), t.appendChild(o), e.appendChild(t), { container: e, yearElement: i, monthElement: n } } function J() { s(g.monthNav), g.monthNav.appendChild(g.prevMonthNav), g.config.showMonths && (g.yearElements = [], g.monthElements = []); for (var e = g.config.showMonths; e--;) { var t = K(); g.yearElements.push(t.yearElement), g.monthElements.push(t.monthElement), g.monthNav.appendChild(t.container) } g.monthNav.appendChild(g.nextMonthNav) } function U() { g.weekdayContainer ? s(g.weekdayContainer) : g.weekdayContainer = d("div", "flatpickr-weekdays"); for (var e = g.config.showMonths; e--;) { var t = d("div", "flatpickr-weekdaycontainer"); g.weekdayContainer.appendChild(t) } return q(), g.weekdayContainer } function q() { var e = g.l10n.firstDayOfWeek, t = g.l10n.weekdays.shorthand.slice(); e > 0 && e < t.length && (t = t.splice(e, t.length).concat(t.splice(0, e))); for (var n = g.config.showMonths; n--;) g.weekdayContainer.children[n].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + t.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      " } function $(e, t) { void 0 === t && (t = !0); var n = t ? e : e - g.currentMonth; n < 0 && !0 === g._hidePrevMonthArrow || n > 0 && !0 === g._hideNextMonthArrow || (g.currentMonth += n, (g.currentMonth < 0 || g.currentMonth > 11) && (g.currentYear += g.currentMonth > 11 ? 1 : -1, g.currentMonth = (g.currentMonth + 12) % 12, fe("onYearChange")), B(), fe("onMonthChange"), pe()) } function z(e) { return !(!g.config.appendTo || !g.config.appendTo.contains(e)) || g.calendarContainer.contains(e) } function G(e) { if (g.isOpen && !g.config.inline) { var t = "function" == typeof (r = e).composedPath ? r.composedPath()[0] : r.target, n = z(t), a = t === g.input || t === g.altInput || g.element.contains(t) || e.path && e.path.indexOf && (~e.path.indexOf(g.input) || ~e.path.indexOf(g.altInput)), i = "blur" === e.type ? a && e.relatedTarget && !z(e.relatedTarget) : !a && !n && !z(e.relatedTarget), o = !g.config.ignoredFocusElements.some(function (e) { return e.contains(t) }); i && o && (g.close(), "range" === g.config.mode && 1 === g.selectedDates.length && (g.clear(!1), g.redraw())) } var r } function V(e) { if (!(!e || g.config.minDate && e < g.config.minDate.getFullYear() || g.config.maxDate && e > g.config.maxDate.getFullYear())) { var t = e, n = g.currentYear !== t; g.currentYear = t || g.currentYear, g.config.maxDate && g.currentYear === g.config.maxDate.getFullYear() ? g.currentMonth = Math.min(g.config.maxDate.getMonth(), g.currentMonth) : g.config.minDate && g.currentYear === g.config.minDate.getFullYear() && (g.currentMonth = Math.max(g.config.minDate.getMonth(), g.currentMonth)), n && (g.redraw(), fe("onYearChange")) } } function Z(e, t) { void 0 === t && (t = !0); var n = g.parseDate(e, void 0, t); if (g.config.minDate && n && w(n, g.config.minDate, void 0 !== t ? t : !g.minDateHasTime) < 0 || g.config.maxDate && n && w(n, g.config.maxDate, void 0 !== t ? t : !g.maxDateHasTime) > 0) return !1; if (0 === g.config.enable.length && 0 === g.config.disable.length) return !0; if (void 0 === n) return !1; for (var a = g.config.enable.length > 0, i = a ? g.config.enable : g.config.disable, o = 0, r = void 0; o < i.length; o++) { if ("function" == typeof (r = i[o]) && r(n)) return a; if (r instanceof Date && void 0 !== n && r.getTime() === n.getTime()) return a; if ("string" == typeof r && void 0 !== n) { var l = g.parseDate(r, void 0, !0); return l && l.getTime() === n.getTime() ? a : !a } if ("object" == typeof r && void 0 !== n && r.from && r.to && n.getTime() >= r.from.getTime() && n.getTime() <= r.to.getTime()) return a } return !a } function Q(e) { return void 0 !== g.daysContainer && (-1 === e.className.indexOf("hidden") && g.daysContainer.contains(e)) } function X(e) { var t = e.target === g._input, n = g.config.allowInput, a = g.isOpen && (!n || !t), i = g.config.inline && t && !n; if (13 === e.keyCode && t) { if (n) return g.setDate(g._input.value, !0, e.target === g.altInput ? g.config.altFormat : g.config.dateFormat), e.target.blur(); g.open() } else if (z(e.target) || a || i) { var o = !!g.timeContainer && g.timeContainer.contains(e.target); switch (e.keyCode) { case 13: o ? (x(), le()) : ce(e); break; case 27: e.preventDefault(), le(); break; case 8: case 46: t && !g.config.allowInput && (e.preventDefault(), g.clear()); break; case 37: case 39: if (o) g.hourElement && g.hourElement.focus(); else if (e.preventDefault(), void 0 !== g.daysContainer && (!1 === n || document.activeElement && Q(document.activeElement))) { var r = 39 === e.keyCode ? 1 : -1; e.ctrlKey ? (e.stopPropagation(), $(r), W(L(1), 0)) : W(void 0, r) } break; case 38: case 40: e.preventDefault(); var l = 40 === e.keyCode ? 1 : -1; g.daysContainer && void 0 !== e.target.$i || e.target === g.input ? e.ctrlKey ? (e.stopPropagation(), V(g.currentYear - l), W(L(1), 0)) : o || W(void 0, 7 * l) : g.config.enableTime && (!o && g.hourElement && g.hourElement.focus(), x(e), g._debouncedChange()); break; case 9: if (o) { var c = [g.hourElement, g.minuteElement, g.secondElement, g.amPM].filter(function (e) { return e }), d = c.indexOf(e.target); if (-1 !== d) { var s = c[d + (e.shiftKey ? -1 : 1)]; void 0 !== s ? (e.preventDefault(), s.focus()) : e.shiftKey && (e.preventDefault(), g._input.focus()) } } } } if (void 0 !== g.amPM && e.target === g.amPM) switch (e.key) { case g.l10n.amPM[0].charAt(0): case g.l10n.amPM[0].charAt(0).toLowerCase(): g.amPM.textContent = g.l10n.amPM[0], T(), ve(); break; case g.l10n.amPM[1].charAt(0): case g.l10n.amPM[1].charAt(0).toLowerCase(): g.amPM.textContent = g.l10n.amPM[1], T(), ve() } fe("onKeyDown", e) } function ee(e) { if (1 === g.selectedDates.length && (!e || e.classList.contains("flatpickr-day") && !e.classList.contains("disabled"))) { for (var t = e ? e.dateObj.getTime() : g.days.firstElementChild.dateObj.getTime(), n = g.parseDate(g.selectedDates[0], void 0, !0).getTime(), a = Math.min(t, g.selectedDates[0].getTime()), i = Math.max(t, g.selectedDates[0].getTime()), o = g.daysContainer.lastChild.lastChild.dateObj.getTime(), r = !1, l = 0, c = 0, d = a; d < o; d += y.DAY) Z(new Date(d), !0) || (r = r || d > a && d < i, d < n && (!l || d > l) ? l = d : d > n && (!c || d < c) && (c = d)); for (var s = 0; s < g.config.showMonths; s++) for (var u = g.daysContainer.children[s], f = g.daysContainer.children[s - 1], m = function (a, i) { var o = u.children[a], d = o.dateObj.getTime(), m = l > 0 && d < l || c > 0 && d > c; return m ? (o.classList.add("notAllowed"), ["inRange", "startRange", "endRange"].forEach(function (e) { o.classList.remove(e) }), "continue") : r && !m ? "continue" : (["startRange", "inRange", "endRange", "notAllowed"].forEach(function (e) { o.classList.remove(e) }), void (void 0 !== e && (e.classList.add(t < g.selectedDates[0].getTime() ? "startRange" : "endRange"), !u.contains(e) && s > 0 && f && f.lastChild.dateObj.getTime() >= d || (n < t && d === n ? o.classList.add("startRange") : n > t && d === n && o.classList.add("endRange"), d >= l && (0 === c || d <= c) && b(d, n, t) && o.classList.add("inRange"))))) }, p = 0, h = u.children.length; p < h; p++) m(p) } } function te() { !g.isOpen || g.config.static || g.config.inline || oe() } function ne() { g.setDate(void 0 !== g.config.minDate ? new Date(g.config.minDate.getTime()) : new Date, !1), I(), ve() } function ae(e) { return function (t) { var n = g.config["_" + e + "Date"] = g.parseDate(t, g.config.dateFormat), a = g.config["_" + ("min" === e ? "max" : "min") + "Date"]; void 0 !== n && (g["min" === e ? "minDateHasTime" : "maxDateHasTime"] = n.getHours() > 0 || n.getMinutes() > 0 || n.getSeconds() > 0), g.selectedDates && (g.selectedDates = g.selectedDates.filter(function (e) { return Z(e) }), g.selectedDates.length || "min" !== e || k(n), ve()), g.daysContainer && (re(), void 0 !== n ? g.currentYearElement[e] = n.getFullYear().toString() : g.currentYearElement.removeAttribute(e), g.currentYearElement.disabled = !!a && void 0 !== n && a.getFullYear() === n.getFullYear()) } } function ie() { "object" != typeof g.config.locale && void 0 === E.l10ns[g.config.locale] && g.config.errorHandler(new Error("flatpickr: invalid locale " + g.config.locale)), g.l10n = e({}, E.l10ns.default, "object" == typeof g.config.locale ? g.config.locale : "default" !== g.config.locale ? E.l10ns[g.config.locale] : void 0), p.K = "(" + g.l10n.amPM[0] + "|" + g.l10n.amPM[1] + "|" + g.l10n.amPM[0].toLowerCase() + "|" + g.l10n.amPM[1].toLowerCase() + ")", g.formatDate = v(g), g.parseDate = D({ config: g.config, l10n: g.l10n }) } function oe(e) { if (void 0 !== g.calendarContainer) { fe("onPreCalendarPosition"); var t = e || g._positionElement, n = Array.prototype.reduce.call(g.calendarContainer.children, function (e, t) { return e + t.offsetHeight }, 0), a = g.calendarContainer.offsetWidth, i = g.config.position.split(" "), o = i[0], r = i.length > 1 ? i[1] : null, l = t.getBoundingClientRect(), d = window.innerHeight - l.bottom, s = "above" === o || "below" !== o && d < n && l.top > n, u = window.pageYOffset + l.top + (s ? -n - 2 : t.offsetHeight + 2); if (c(g.calendarContainer, "arrowTop", !s), c(g.calendarContainer, "arrowBottom", s), !g.config.inline) { var f = window.pageXOffset + l.left - (null != r && "center" === r ? (a - l.width) / 2 : 0), m = window.document.body.offsetWidth - l.right, p = f + a > window.document.body.offsetWidth, h = m + a > window.document.body.offsetWidth; if (c(g.calendarContainer, "rightMost", p), !g.config.static) if (g.calendarContainer.style.top = u + "px", p) if (h) { var v = document.styleSheets[0]; if (void 0 === v) return; var D = window.document.body.offsetWidth, w = Math.max(0, D / 2 - a / 2), b = v.cssRules.length, y = "{left:" + l.left + "px;right:auto;}"; c(g.calendarContainer, "rightMost", !1), c(g.calendarContainer, "centerMost", !0), v.insertRule(".flatpickr-calendar.centerMost:before,.flatpickr-calendar.centerMost:after" + y, b), g.calendarContainer.style.left = w + "px", g.calendarContainer.style.right = "auto" } else g.calendarContainer.style.left = "auto", g.calendarContainer.style.right = m + "px"; else g.calendarContainer.style.left = f + "px", g.calendarContainer.style.right = "auto" } } } function re() { g.config.noCalendar || g.isMobile || (pe(), B()) } function le() { g._input.focus(), -1 !== window.navigator.userAgent.indexOf("MSIE") || void 0 !== navigator.msMaxTouchPoints ? setTimeout(g.close, 0) : g.close() } function ce(e) { e.preventDefault(), e.stopPropagation(); var t = function e(t, n) { return n(t) ? t : t.parentNode ? e(t.parentNode, n) : void 0 }(e.target, function (e) { return e.classList && e.classList.contains("flatpickr-day") && !e.classList.contains("disabled") && !e.classList.contains("notAllowed") }); if (void 0 !== t) { var n = t, a = g.latestSelectedDateObj = new Date(n.dateObj.getTime()), i = (a.getMonth() < g.currentMonth || a.getMonth() > g.currentMonth + g.config.showMonths - 1) && "range" !== g.config.mode; if (g.selectedDateElem = n, "single" === g.config.mode) g.selectedDates = [a]; else if ("multiple" === g.config.mode) { var o = ge(a); o ? g.selectedDates.splice(parseInt(o), 1) : g.selectedDates.push(a) } else "range" === g.config.mode && (2 === g.selectedDates.length && g.clear(!1, !1), g.latestSelectedDateObj = a, g.selectedDates.push(a), 0 !== w(a, g.selectedDates[0], !0) && g.selectedDates.sort(function (e, t) { return e.getTime() - t.getTime() })); if (T(), i) { var r = g.currentYear !== a.getFullYear(); g.currentYear = a.getFullYear(), g.currentMonth = a.getMonth(), r && fe("onYearChange"), fe("onMonthChange") } if (pe(), B(), ve(), g.config.enableTime && setTimeout(function () { return g.showTimeInput = !0 }, 50), i || "range" === g.config.mode || 1 !== g.config.showMonths ? void 0 !== g.selectedDateElem && void 0 === g.hourElement && g.selectedDateElem && g.selectedDateElem.focus() : H(n), void 0 !== g.hourElement && void 0 !== g.hourElement && g.hourElement.focus(), g.config.closeOnSelect) { var l = "single" === g.config.mode && !g.config.enableTime, c = "range" === g.config.mode && 2 === g.selectedDates.length && !g.config.enableTime; (l || c) && le() } F() } } g.parseDate = D({ config: g.config, l10n: g.l10n }), g._handlers = [], g._bind = _, g._setHoursFromDate = k, g._positionCalendar = oe, g.changeMonth = $, g.changeYear = V, g.clear = function (e, t) { void 0 === e && (e = !0); void 0 === t && (t = !0); g.input.value = "", void 0 !== g.altInput && (g.altInput.value = ""); void 0 !== g.mobileInput && (g.mobileInput.value = ""); g.selectedDates = [], g.latestSelectedDateObj = void 0, !0 === t && (g.currentYear = g._initialDate.getFullYear(), g.currentMonth = g._initialDate.getMonth()); g.showTimeInput = !1, !0 === g.config.enableTime && I(); g.redraw(), e && fe("onChange") }, g.close = function () { g.isOpen = !1, g.isMobile || (void 0 !== g.calendarContainer && g.calendarContainer.classList.remove("open"), void 0 !== g._input && g._input.classList.remove("active")); fe("onClose") }, g._createElement = d, g.destroy = function () { void 0 !== g.config && fe("onDestroy"); for (var e = g._handlers.length; e--;) { var t = g._handlers[e]; t.element.removeEventListener(t.event, t.handler, t.options) } if (g._handlers = [], g.mobileInput) g.mobileInput.parentNode && g.mobileInput.parentNode.removeChild(g.mobileInput), g.mobileInput = void 0; else if (g.calendarContainer && g.calendarContainer.parentNode) if (g.config.static && g.calendarContainer.parentNode) { var n = g.calendarContainer.parentNode; if (n.lastChild && n.removeChild(n.lastChild), n.parentNode) { for (; n.firstChild;) n.parentNode.insertBefore(n.firstChild, n); n.parentNode.removeChild(n) } } else g.calendarContainer.parentNode.removeChild(g.calendarContainer); g.altInput && (g.input.type = "text", g.altInput.parentNode && g.altInput.parentNode.removeChild(g.altInput), delete g.altInput); g.input && (g.input.type = g.input._type, g.input.classList.remove("flatpickr-input"), g.input.removeAttribute("readonly"), g.input.value = "");["_showTimeInput", "latestSelectedDateObj", "_hideNextMonthArrow", "_hidePrevMonthArrow", "__hideNextMonthArrow", "__hidePrevMonthArrow", "isMobile", "isOpen", "selectedDateElem", "minDateHasTime", "maxDateHasTime", "days", "daysContainer", "_input", "_positionElement", "innerContainer", "rContainer", "monthNav", "todayDateElem", "calendarContainer", "weekdayContainer", "prevMonthNav", "nextMonthNav", "currentMonthElement", "currentYearElement", "navigationCurrentMonth", "selectedDateElem", "config"].forEach(function (e) { try { delete g[e] } catch (e) { } }) }, g.isEnabled = Z, g.jumpToDate = P, g.open = function (e, t) { void 0 === t && (t = g._positionElement); if (!0 === g.isMobile) return e && (e.preventDefault(), e.target && e.target.blur()), void 0 !== g.mobileInput && (g.mobileInput.focus(), g.mobileInput.click()), void fe("onOpen"); if (g._input.disabled || g.config.inline) return; var n = g.isOpen; g.isOpen = !0, n || (g.calendarContainer.classList.add("open"), g._input.classList.add("active"), fe("onOpen"), oe(t)); !0 === g.config.enableTime && !0 === g.config.noCalendar && (0 === g.selectedDates.length && ne(), !1 !== g.config.allowInput || void 0 !== e && g.timeContainer.contains(e.relatedTarget) || setTimeout(function () { return g.hourElement.select() }, 50)) }, g.redraw = re, g.set = function (e, n) { null !== e && "object" == typeof e ? Object.assign(g.config, e) : (g.config[e] = n, void 0 !== de[e] ? de[e].forEach(function (e) { return e() }) : t.indexOf(e) > -1 && (g.config[e] = l(n))); g.redraw(), ve(!1) }, g.setDate = function (e, t, n) { void 0 === t && (t = !1); void 0 === n && (n = g.config.dateFormat); if (0 !== e && !e || e instanceof Array && 0 === e.length) return g.clear(t); se(e, n), g.showTimeInput = g.selectedDates.length > 0, g.latestSelectedDateObj = g.selectedDates[0], g.redraw(), P(), k(), ve(t), t && fe("onChange") }, g.toggle = function (e) { if (!0 === g.isOpen) return g.close(); g.open(e) }; var de = { locale: [ie, q], showMonths: [J, M, U] }; function se(e, t) { var n = []; if (e instanceof Array) n = e.map(function (e) { return g.parseDate(e, t) }); else if (e instanceof Date || "number" == typeof e) n = [g.parseDate(e, t)]; else if ("string" == typeof e) switch (g.config.mode) { case "single": case "time": n = [g.parseDate(e, t)]; break; case "multiple": n = e.split(g.config.conjunction).map(function (e) { return g.parseDate(e, t) }); break; case "range": n = e.split(g.l10n.rangeSeparator).map(function (e) { return g.parseDate(e, t) }) } else g.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(e))); g.selectedDates = n.filter(function (e) { return e instanceof Date && Z(e, !1) }), "range" === g.config.mode && g.selectedDates.sort(function (e, t) { return e.getTime() - t.getTime() }) } function ue(e) { return e.slice().map(function (e) { return "string" == typeof e || "number" == typeof e || e instanceof Date ? g.parseDate(e, void 0, !0) : e && "object" == typeof e && e.from && e.to ? { from: g.parseDate(e.from, void 0), to: g.parseDate(e.to, void 0) } : e }).filter(function (e) { return e }) } function fe(e, t) { if (void 0 !== g.config) { var n = g.config[e]; if (void 0 !== n && n.length > 0) for (var a = 0; n[a] && a < n.length; a++) n[a](g.selectedDates, g.input.value, g, t); "onChange" === e && (g.input.dispatchEvent(me("change")), g.input.dispatchEvent(me("input"))) } } function me(e) { var t = document.createEvent("Event"); return t.initEvent(e, !0, !0), t } function ge(e) { for (var t = 0; t < g.selectedDates.length; t++) if (0 === w(g.selectedDates[t], e)) return "" + t; return !1 } function pe() { g.config.noCalendar || g.isMobile || !g.monthNav || (g.yearElements.forEach(function (e, t) { var n = new Date(g.currentYear, g.currentMonth, 1); n.setMonth(g.currentMonth + t), g.monthElements[t].textContent = m(n.getMonth(), g.config.shorthandCurrentMonth, g.l10n) + " ", e.value = n.getFullYear().toString() }), g._hidePrevMonthArrow = void 0 !== g.config.minDate && (g.currentYear === g.config.minDate.getFullYear() ? g.currentMonth <= g.config.minDate.getMonth() : g.currentYear < g.config.minDate.getFullYear()), g._hideNextMonthArrow = void 0 !== g.config.maxDate && (g.currentYear === g.config.maxDate.getFullYear() ? g.currentMonth + 1 > g.config.maxDate.getMonth() : g.currentYear > g.config.maxDate.getFullYear())) } function he(e) { return g.selectedDates.map(function (t) { return g.formatDate(t, e) }).filter(function (e, t, n) { return "range" !== g.config.mode || g.config.enableTime || n.indexOf(e) === t }).join("range" !== g.config.mode ? g.config.conjunction : g.l10n.rangeSeparator) } function ve(e) { if (void 0 === e && (e = !0), 0 === g.selectedDates.length) return g.clear(e); void 0 !== g.mobileInput && g.mobileFormatStr && (g.mobileInput.value = void 0 !== g.latestSelectedDateObj ? g.formatDate(g.latestSelectedDateObj, g.mobileFormatStr) : ""), g.input.value = he(g.config.dateFormat), void 0 !== g.altInput && (g.altInput.value = he(g.config.altFormat)), !1 !== e && fe("onValueUpdate") } function De(e) { e.preventDefault(); var t = g.prevMonthNav.contains(e.target), n = g.nextMonthNav.contains(e.target); t || n ? $(t ? -1 : 1) : g.yearElements.indexOf(e.target) >= 0 ? e.target.select() : e.target.classList.contains("arrowUp") ? g.changeYear(g.currentYear + 1) : e.target.classList.contains("arrowDown") && g.changeYear(g.currentYear - 1) } return function () { g.element = g.input = n, g.isOpen = !1, function () { var a = ["wrap", "weekNumbers", "allowInput", "clickOpens", "time_24hr", "enableTime", "noCalendar", "altInput", "shorthandCurrentMonth", "inline", "static", "enableSeconds", "disableMobile"], i = e({}, f, JSON.parse(JSON.stringify(n.dataset || {}))), o = {}; g.config.parseDate = i.parseDate, g.config.formatDate = i.formatDate, Object.defineProperty(g.config, "enable", { get: function () { return g.config._enable }, set: function (e) { g.config._enable = ue(e) } }), Object.defineProperty(g.config, "disable", { get: function () { return g.config._disable }, set: function (e) { g.config._disable = ue(e) } }); var r = "time" === i.mode; i.dateFormat || !i.enableTime && !r || (o.dateFormat = i.noCalendar || r ? "H:i" + (i.enableSeconds ? ":S" : "") : E.defaultConfig.dateFormat + " H:i" + (i.enableSeconds ? ":S" : "")), i.altInput && (i.enableTime || r) && !i.altFormat && (o.altFormat = i.noCalendar || r ? "h:i" + (i.enableSeconds ? ":S K" : " K") : E.defaultConfig.altFormat + " h:i" + (i.enableSeconds ? ":S" : "") + " K"), Object.defineProperty(g.config, "minDate", { get: function () { return g.config._minDate }, set: ae("min") }), Object.defineProperty(g.config, "maxDate", { get: function () { return g.config._maxDate }, set: ae("max") }); var c = function (e) { return function (t) { g.config["min" === e ? "_minTime" : "_maxTime"] = g.parseDate(t, "H:i") } }; Object.defineProperty(g.config, "minTime", { get: function () { return g.config._minTime }, set: c("min") }), Object.defineProperty(g.config, "maxTime", { get: function () { return g.config._maxTime }, set: c("max") }), "time" === i.mode && (g.config.noCalendar = !0, g.config.enableTime = !0), Object.assign(g.config, o, i); for (var d = 0; d < a.length; d++) g.config[a[d]] = !0 === g.config[a[d]] || "true" === g.config[a[d]]; t.filter(function (e) { return void 0 !== g.config[e] }).forEach(function (e) { g.config[e] = l(g.config[e] || []).map(h) }), g.isMobile = !g.config.disableMobile && !g.config.inline && "single" === g.config.mode && !g.config.disable.length && !g.config.enable.length && !g.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); for (var d = 0; d < g.config.plugins.length; d++) { var s = g.config.plugins[d](g) || {}; for (var u in s) t.indexOf(u) > -1 ? g.config[u] = l(s[u]).map(h).concat(g.config[u]) : void 0 === i[u] && (g.config[u] = s[u]) } fe("onParseConfig") }(), ie(), g.input = g.config.wrap ? n.querySelector("[data-input]") : n, g.input ? (g.input._type = g.input.type, g.input.type = "text", g.input.classList.add("flatpickr-input"), g._input = g.input, g.config.altInput && (g.altInput = d(g.input.nodeName, g.input.className + " " + g.config.altInputClass), g._input = g.altInput, g.altInput.placeholder = g.input.placeholder, g.altInput.disabled = g.input.disabled, g.altInput.required = g.input.required, g.altInput.tabIndex = g.input.tabIndex, g.altInput.type = "text", g.input.setAttribute("type", "hidden"), !g.config.static && g.input.parentNode && g.input.parentNode.insertBefore(g.altInput, g.input.nextSibling)), g.config.allowInput || g._input.setAttribute("readonly", "readonly"), g._positionElement = g.config.positionElement || g._input) : g.config.errorHandler(new Error("Invalid input element specified")), function () { g.selectedDates = [], g.now = g.parseDate(g.config.now) || new Date; var e = g.config.defaultDate || ("INPUT" !== g.input.nodeName && "TEXTAREA" !== g.input.nodeName || !g.input.placeholder || g.input.value !== g.input.placeholder ? g.input.value : null); e && se(e, g.config.dateFormat), g._initialDate = g.selectedDates.length > 0 ? g.selectedDates[0] : g.config.minDate && g.config.minDate.getTime() > g.now.getTime() ? g.config.minDate : g.config.maxDate && g.config.maxDate.getTime() < g.now.getTime() ? g.config.maxDate : g.now, g.currentYear = g._initialDate.getFullYear(), g.currentMonth = g._initialDate.getMonth(), g.selectedDates.length > 0 && (g.latestSelectedDateObj = g.selectedDates[0]), void 0 !== g.config.minTime && (g.config.minTime = g.parseDate(g.config.minTime, "H:i")), void 0 !== g.config.maxTime && (g.config.maxTime = g.parseDate(g.config.maxTime, "H:i")), g.minDateHasTime = !!g.config.minDate && (g.config.minDate.getHours() > 0 || g.config.minDate.getMinutes() > 0 || g.config.minDate.getSeconds() > 0), g.maxDateHasTime = !!g.config.maxDate && (g.config.maxDate.getHours() > 0 || g.config.maxDate.getMinutes() > 0 || g.config.maxDate.getSeconds() > 0), Object.defineProperty(g, "showTimeInput", { get: function () { return g._showTimeInput }, set: function (e) { g._showTimeInput = e, g.calendarContainer && c(g.calendarContainer, "showTimeInput", e), g.isOpen && oe() } }) }(), g.utils = { getDaysInMonth: function (e, t) { return void 0 === e && (e = g.currentMonth), void 0 === t && (t = g.currentYear), 1 === e && (t % 4 == 0 && t % 100 != 0 || t % 400 == 0) ? 29 : g.l10n.daysInMonth[e] } }, g.isMobile || function () { var e = window.document.createDocumentFragment(); if (g.calendarContainer = d("div", "flatpickr-calendar"), g.calendarContainer.tabIndex = -1, !g.config.noCalendar) { if (e.appendChild((g.monthNav = d("div", "flatpickr-months"), g.yearElements = [], g.monthElements = [], g.prevMonthNav = d("span", "flatpickr-prev-month"), g.prevMonthNav.innerHTML = g.config.prevArrow, g.nextMonthNav = d("span", "flatpickr-next-month"), g.nextMonthNav.innerHTML = g.config.nextArrow, J(), Object.defineProperty(g, "_hidePrevMonthArrow", { get: function () { return g.__hidePrevMonthArrow }, set: function (e) { g.__hidePrevMonthArrow !== e && (c(g.prevMonthNav, "disabled", e), g.__hidePrevMonthArrow = e) } }), Object.defineProperty(g, "_hideNextMonthArrow", { get: function () { return g.__hideNextMonthArrow }, set: function (e) { g.__hideNextMonthArrow !== e && (c(g.nextMonthNav, "disabled", e), g.__hideNextMonthArrow = e) } }), g.currentYearElement = g.yearElements[0], pe(), g.monthNav)), g.innerContainer = d("div", "flatpickr-innerContainer"), g.config.weekNumbers) { var t = function () { g.calendarContainer.classList.add("hasWeeks"); var e = d("div", "flatpickr-weekwrapper"); e.appendChild(d("span", "flatpickr-weekday", g.l10n.weekAbbreviation)); var t = d("div", "flatpickr-weeks"); return e.appendChild(t), { weekWrapper: e, weekNumbers: t } }(), n = t.weekWrapper, a = t.weekNumbers; g.innerContainer.appendChild(n), g.weekNumbers = a, g.weekWrapper = n } g.rContainer = d("div", "flatpickr-rContainer"), g.rContainer.appendChild(U()), g.daysContainer || (g.daysContainer = d("div", "flatpickr-days"), g.daysContainer.tabIndex = -1), B(), g.rContainer.appendChild(g.daysContainer), g.innerContainer.appendChild(g.rContainer), e.appendChild(g.innerContainer) } g.config.enableTime && e.appendChild(function () { g.calendarContainer.classList.add("hasTime"), g.config.noCalendar && g.calendarContainer.classList.add("noCalendar"), g.timeContainer = d("div", "flatpickr-time"), g.timeContainer.tabIndex = -1; var e = d("span", "flatpickr-time-separator", ":"), t = u("flatpickr-hour"); g.hourElement = t.getElementsByTagName("input")[0]; var n = u("flatpickr-minute"); if (g.minuteElement = n.getElementsByTagName("input")[0], g.hourElement.tabIndex = g.minuteElement.tabIndex = -1, g.hourElement.value = i(g.latestSelectedDateObj ? g.latestSelectedDateObj.getHours() : g.config.time_24hr ? g.config.defaultHour : function (e) { switch (e % 24) { case 0: case 12: return 12; default: return e % 12 } }(g.config.defaultHour)), g.minuteElement.value = i(g.latestSelectedDateObj ? g.latestSelectedDateObj.getMinutes() : g.config.defaultMinute), g.hourElement.setAttribute("step", g.config.hourIncrement.toString()), g.minuteElement.setAttribute("step", g.config.minuteIncrement.toString()), g.hourElement.setAttribute("min", g.config.time_24hr ? "0" : "1"), g.hourElement.setAttribute("max", g.config.time_24hr ? "23" : "12"), g.minuteElement.setAttribute("min", "0"), g.minuteElement.setAttribute("max", "59"), g.timeContainer.appendChild(t), g.timeContainer.appendChild(e), g.timeContainer.appendChild(n), g.config.time_24hr && g.timeContainer.classList.add("time24hr"), g.config.enableSeconds) { g.timeContainer.classList.add("hasSeconds"); var a = u("flatpickr-second"); g.secondElement = a.getElementsByTagName("input")[0], g.secondElement.value = i(g.latestSelectedDateObj ? g.latestSelectedDateObj.getSeconds() : g.config.defaultSeconds), g.secondElement.setAttribute("step", g.minuteElement.getAttribute("step")), g.secondElement.setAttribute("min", "0"), g.secondElement.setAttribute("max", "59"), g.timeContainer.appendChild(d("span", "flatpickr-time-separator", ":")), g.timeContainer.appendChild(a) } return g.config.time_24hr || (g.amPM = d("span", "flatpickr-am-pm", g.l10n.amPM[o((g.latestSelectedDateObj ? g.hourElement.value : g.config.defaultHour) > 11)]), g.amPM.title = g.l10n.toggleTitle, g.amPM.tabIndex = -1, g.timeContainer.appendChild(g.amPM)), g.timeContainer }()), c(g.calendarContainer, "rangeMode", "range" === g.config.mode), c(g.calendarContainer, "animate", !0 === g.config.animate), c(g.calendarContainer, "multiMonth", g.config.showMonths > 1), g.calendarContainer.appendChild(e); var r = void 0 !== g.config.appendTo && void 0 !== g.config.appendTo.nodeType; if ((g.config.inline || g.config.static) && (g.calendarContainer.classList.add(g.config.inline ? "inline" : "static"), g.config.inline && (!r && g.element.parentNode ? g.element.parentNode.insertBefore(g.calendarContainer, g._input.nextSibling) : void 0 !== g.config.appendTo && g.config.appendTo.appendChild(g.calendarContainer)), g.config.static)) { var l = d("div", "flatpickr-wrapper"); g.element.parentNode && g.element.parentNode.insertBefore(l, g.element), l.appendChild(g.element), g.altInput && l.appendChild(g.altInput), l.appendChild(g.calendarContainer) } g.config.static || g.config.inline || (void 0 !== g.config.appendTo ? g.config.appendTo : window.document.body).appendChild(g.calendarContainer) }(), function () { if (g.config.wrap && ["open", "close", "toggle", "clear"].forEach(function (e) { Array.prototype.forEach.call(g.element.querySelectorAll("[data-" + e + "]"), function (t) { return _(t, "click", g[e]) }) }), g.isMobile) !function () { var e = g.config.enableTime ? g.config.noCalendar ? "time" : "datetime-local" : "date"; g.mobileInput = d("input", g.input.className + " flatpickr-mobile"), g.mobileInput.step = g.input.getAttribute("step") || "any", g.mobileInput.tabIndex = 1, g.mobileInput.type = e, g.mobileInput.disabled = g.input.disabled, g.mobileInput.required = g.input.required, g.mobileInput.placeholder = g.input.placeholder, g.mobileFormatStr = "datetime-local" === e ? "Y-m-d\\TH:i:S" : "date" === e ? "Y-m-d" : "H:i:S", g.selectedDates.length > 0 && (g.mobileInput.defaultValue = g.mobileInput.value = g.formatDate(g.selectedDates[0], g.mobileFormatStr)), g.config.minDate && (g.mobileInput.min = g.formatDate(g.config.minDate, "Y-m-d")), g.config.maxDate && (g.mobileInput.max = g.formatDate(g.config.maxDate, "Y-m-d")), g.input.type = "hidden", void 0 !== g.altInput && (g.altInput.type = "hidden"); try { g.input.parentNode && g.input.parentNode.insertBefore(g.mobileInput, g.input.nextSibling) } catch (e) { } _(g.mobileInput, "change", function (e) { g.setDate(e.target.value, !1, g.mobileFormatStr), fe("onChange"), fe("onClose") }) }(); else { var e = r(te, 50); g._debouncedChange = r(F, C), g.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent) && _(g.daysContainer, "mouseover", function (e) { "range" === g.config.mode && ee(e.target) }), _(window.document.body, "keydown", X), g.config.static || _(g._input, "keydown", X), g.config.inline || g.config.static || _(window, "resize", e), void 0 !== window.ontouchstart ? _(window.document, "click", G) : _(window.document, "mousedown", N(G)), _(window.document, "focus", G, { capture: !0 }), !0 === g.config.clickOpens && (_(g._input, "focus", g.open), _(g._input, "mousedown", N(g.open))), void 0 !== g.daysContainer && (_(g.monthNav, "mousedown", N(De)), _(g.monthNav, ["keyup", "increment"], S), _(g.daysContainer, "mousedown", N(ce))), void 0 !== g.timeContainer && void 0 !== g.minuteElement && void 0 !== g.hourElement && (_(g.timeContainer, ["increment"], x), _(g.timeContainer, "blur", x, { capture: !0 }), _(g.timeContainer, "mousedown", N(A)), _([g.hourElement, g.minuteElement], ["focus", "click"], function (e) { return e.target.select() }), void 0 !== g.secondElement && _(g.secondElement, "focus", function () { return g.secondElement && g.secondElement.select() }), void 0 !== g.amPM && _(g.amPM, "mousedown", N(function (e) { x(e), F() }))) } }(), (g.selectedDates.length || g.config.noCalendar) && (g.config.enableTime && k(g.config.noCalendar ? g.latestSelectedDateObj || g.config.minDate : void 0), ve(!1)), M(), g.showTimeInput = g.selectedDates.length > 0 || g.config.noCalendar; var a = /^((?!chrome|android).)*safari/i.test(navigator.userAgent); !g.isMobile && a && oe(), fe("onReady") }(), g } function x(e, t) { for (var n = Array.prototype.slice.call(e).filter(function (e) { return e instanceof HTMLElement }), a = [], i = 0; i < n.length; i++) { var o = n[i]; try { if (null !== o.getAttribute("data-fp-omit")) continue; void 0 !== o._flatpickr && (o._flatpickr.destroy(), o._flatpickr = void 0), o._flatpickr = M(o, t || {}), a.push(o._flatpickr) } catch (e) { console.error(e) } } return 1 === a.length ? a[0] : a } "undefined" != typeof HTMLElement && (HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (e) { return x(this, e) }, HTMLElement.prototype.flatpickr = function (e) { return x([this], e) }); var E = function (e, t) { return "string" == typeof e ? x(window.document.querySelectorAll(e), t) : e instanceof Node ? x([e], t) : x(e, t) }; return E.defaultConfig = n, E.l10ns = { en: e({}, a), default: e({}, a) }, E.localize = function (t) { E.l10ns.default = e({}, E.l10ns.default, t) }, E.setDefaults = function (t) { E.defaultConfig = e({}, E.defaultConfig, t) }, E.parseDate = D({}), E.formatDate = v({}), E.compareDates = w, "undefined" != typeof jQuery && (jQuery.fn.flatpickr = function (e) { return x(this, e) }), Date.prototype.fp_incr = function (e) { return new Date(this.getFullYear(), this.getMonth(), this.getDate() + ("string" == typeof e ? parseInt(e, 10) : e)) }, "undefined" != typeof window && (window.flatpickr = E), E });
var Gallery = function () { }

Gallery.prototype.Init = function () {
    //get all images need to be added to galleries
    var imagesNodes = document.querySelectorAll('.js-gallery');
    var thisGallery = this;
    this.images = {};
    //create virtual galleries
    imagesNodes.forEach(function (image) {
        var dataFor = image.getAttribute('data-for');
        if (!thisGallery.images.hasOwnProperty(dataFor)) {
            thisGallery.images[dataFor] = [];
        }
        thisGallery.images[dataFor].push(image);
    });
    //active prev/next buttons
    for (var key in thisGallery.images) {
        if (thisGallery.images.hasOwnProperty(key) && thisGallery.images[key].length > 1) {
            var prevBtn = document.getElementById(key + '_prev');
            var nextBtn = document.getElementById(key + '_next');
            if (prevBtn) {
                prevBtn.classList.remove('u-hidden');
            }
            if (nextBtn) {
                nextBtn.classList.remove('u-hidden');
            }
        }
    }
}

Gallery.prototype.openImage = function (thumb) {
    var key = thumb.getAttribute('data-for');
    var gallery = this.images[key];
    this.current = gallery.indexOf(thumb);
    this.setCurrentImage(key);
}

Gallery.prototype.openImageByNum = function (thumb) {
    var key = thumb.getAttribute('data-for');
    var number = parseInt(thumb.getAttribute('data-number'));
    this.current = number;
    this.setCurrentImage(key);
}

Gallery.prototype.nextImage = function (key) {
    var gallery = this.images[key];
    this.current = (this.current + 1) % gallery.length;
    this.setCurrentImage(key);
}

Gallery.prototype.prevImage = function (key) {
    var gallery = this.images[key];
    this.current = (this.current + gallery.length - 1) % gallery.length;
    this.setCurrentImage(key);
}

Gallery.prototype.setCurrentImage = function (key) {
    var gallery = this.images[key];
    //thumbs
    if (gallery[this.current].classList.contains('js-thumb')) {
        var active = document.querySelector('.js-thumb.js-thumb--active[data-for=' + key + ']');
        if (active) {
            active.classList.remove('thumb-list__item--active');
            active.classList.remove('js-thumb--active');
        }
        gallery[this.current].classList.add('thumb-list__item--active');
        gallery[this.current].classList.add('js-thumb--active');
    }
    //counter
    var counter = document.getElementById(key + '_counter');
    if (counter) {
        counter.innerText = parseInt(this.current) + 1 + ' / ' + gallery.length;
    }
    document.getElementById(key).setAttribute("data-number", this.current);
    document.getElementById(key).src = gallery[this.current].getAttribute('data-image');
}

var Gallery = new Gallery();

document.addEventListener("DOMContentLoaded", function (event) {
    Gallery.Init();
});
//HandlebarsBolt requires handlebars-v4.0.11 !

var HandlebarsBolt = function () { }
var handlebarsBoltCache = {};
var handlebarsDebug = window.location.search.indexOf('debug=true') >= 0 ? true : false;

const consoleStyles = {
    fail: "color: #612525; background-color: #f5bfbf; padding: 3px; font-weight: bold;",
    success: "color: #25612d; background-color: #bff5c6; padding: 3px; font-weight: bold;"
};

//Auto initialize the script templates and auto render the templates
document.addEventListener("DOMContentLoaded", function (event) {
    //Register templates
    var scriptTemplate = document.getElementsByTagName("script");

    for (var i = 0; i < scriptTemplate.length; i++) {
        var scriptTemplateElement = scriptTemplate[i];

        if (scriptTemplateElement.getAttribute("type") == "text/x-template") {
            Handlebars.registerPartial(scriptTemplateElement.id, scriptTemplateElement.innerHTML);
        }
    }

    //Initialize ajax elements
    var ajaxContainer = document.getElementsByClassName("js-handlebars-root");

    for (var i = 0; i < ajaxContainer.length; i++) {
        var ajaxContainerElement = ajaxContainer[i];

        if (!ajaxContainerElement.getAttribute('data-json-feed')) {
            console.log("Ajax element: Please specify json feed via data attribute: data-json-feed");
        }

        if (!ajaxContainerElement.hasAttribute('data-init-onload') || !ajaxContainerElement.getAttribute('data-init-onload')) {
            HandlebarsBolt.UpdateContent(ajaxContainerElement.id, ajaxContainerElement.getAttribute('data-json-feed'), false, ajaxContainerElement.getAttribute('data-template'), ajaxContainerElement.getAttribute('data-preloader'));
        }
    }

    window.addEventListener('popstate', function (event) {
        location.reload();
    });
});

//Update the ajax loaded content using Handlebars to render the template
HandlebarsBolt.prototype.UpdateContent = function (containerId, url, updateUrl, templateId, preloader, addContent) {
    if (document.getElementById(containerId)) {
        var container = document.getElementById(containerId);

        if (url == null) {
            url = container.getAttribute("data-json-feed");
        } else {
            container.setAttribute("data-json-feed", url);
        }

        url = url.replace("?debug=true", "");
        url = url.replace("&debug=true", "");

        preloader = container.hasAttribute("data-preloader") ? container.getAttribute("data-preloader") : preloader;

        //Add a preloader until the template has been rendered (optional)
        if (preloader == "minimal") {
            if (addContent != true) {
                HandlebarsBolt.CleanContainer(containerId);
            }
            var preloaderElement = document.createElement('i');
            preloaderElement.className = "fas fa-circle-notch fa-spin preloader";
            preloaderElement.setAttribute('id', (container.getAttribute('id') + "_preloader"));
            container.appendChild(preloaderElement);
        } else if (preloader == "overlay") {
            var overlayElement = document.createElement('div');
            overlayElement.className = "preloader-overlay";
            overlayElement.setAttribute('id', "overlay");
            var overlayElementIcon = document.createElement('div');
            overlayElementIcon.className = "preloader-overlay__icon dw-mod";
            overlayElementIcon.style.top = window.pageYOffset + "px";
            overlayElement.appendChild(overlayElementIcon);

            if (document.getElementById("content")) {
                document.getElementById("content").parentNode.insertBefore(overlayElement, document.getElementById("content"));
            }
        }

        container.classList.remove("u-hidden");

        //Render a pre-render template, if specified, until the real template is ready
        if (container.hasAttribute('data-pre-render-template') && !container.hasChildNodes()) {
            var preRenderElement = document.createElement('div');
            preRenderElement.innerHTML = document.getElementById(container.getAttribute('data-pre-render-template')).innerHTML;

            var newElementNodes = preRenderElement.childNodes;
            for (var item = 1; item < newElementNodes.length; item++) {
                container.appendChild(newElementNodes[item]);
            }
        }

        //Check if there is requested a template by the data attribute
        if (templateId) {
            container.setAttribute("data-template", templateId);
        } else {
            if (container) {
                templateId = container.getAttribute("data-template");
            } else {
                console.log("The container: " + containerId + " is missing");
            }
        }

        //Save a template setting cookie for later use
        var cookieId = container.getAttribute("id") + "Template=";
        if (document.cookie.indexOf(cookieId) != -1) {
            document.cookie.replace(cookieId, templateId)
        } else {
            document.cookie = cookieId + templateId;
        }

        //Make the script template ready using Handlebars
        var scriptTemplate = document.getElementById(templateId).innerHTML;
        var template = Handlebars.compile(scriptTemplate);

        Request.Fetch().get(url, updateSuccess, updateFailed);

        function updateSuccess(data) {
            var compiledHtml = template(data);

            if (!addContent) {
                HandlebarsBolt.CreateCache(data);

                container.innerHTML = compiledHtml;
            } else {
                HandlebarsBolt.CreateCache(data);
                HandlebarsBolt.AddToCache(data, containerId);

                container.insertAdjacentHTML('beforeend', compiledHtml);
            }

            HandlebarsBolt.RevalidateImages();
            HandlebarsBolt.RemovePreloaders(containerId);

            var event = new CustomEvent('contentLoaded', { 'detail': { 'containerId': containerId, "url": url, "templateId": templateId, "addContent": addContent, "data": data } });
            document.dispatchEvent(event);
            container.dispatchEvent(event);
        }

        function updateFailed(data) {
            HandlebarsBolt.CleanContainer(containerId);
            HandlebarsBolt.RevalidateImages();
            HandlebarsBolt.RemovePreloaders(containerId);

            var event = new CustomEvent('contentLoaded', { 'detail': { 'containerId': containerId, "url": url, "templateId": templateId, "addContent": addContent, "data": data } });
            document.dispatchEvent(event);
            container.dispatchEvent(event);

            return false;
        }
    } else {
        console.log("Element could not be found: " + containerId);
    }
}

//Add content to an already used container
HandlebarsBolt.prototype.AddContent = function (containerId, url, updateUrl) {
    HandlebarsBolt.UpdateContent(containerId, url, updateUrl, null, "minimal", true);
}

//Render the template using a JSON data object, instead of getting it using a server request
HandlebarsBolt.prototype.CreateItemsFromJson = function (data, containerId, templateId) {
    var container = document.getElementById(containerId);

    if (templateId) {
        container.setAttribute("data-template", templateId);
    } else {
        if (container) {
            templateId = container.getAttribute("data-template");
        } else {
            console.log("The container: " + containerId + " is missing");
        }
    }

    var scriptTemplate = document.getElementById(templateId).innerHTML;
    var template = Handlebars.compile(scriptTemplate);

    HandlebarsBolt.CreateCache(data);

    var compiledHtml = template(data);
    container.innerHTML = compiledHtml;

    var event = new CustomEvent('itemsCreatedFromJson', { 'detail': { 'containerId': containerId, "templateId": templateId, "data": data } });
    container.dispatchEvent(event);

    HandlebarsBolt.RevalidateImages();
}

//Remove the preloaders
HandlebarsBolt.prototype.RemovePreloaders = function (containerId) {
    var container = document.getElementById(containerId);
    if (document.body.contains(container)) {
        if (container.getAttribute('data-preloader') == 'overlay') {
            if (document.getElementById('overlay')) {
                document.getElementById('overlay').parentNode.removeChild(document.getElementById('overlay'));
            }
        } else {
            if (document.getElementById(container.getAttribute('id') + "_preloader")) {
                container.removeChild(document.getElementById(container.getAttribute('id') + "_preloader"));
            }
        }

        var event = new CustomEvent('removePreloaders');
        container.dispatchEvent(event);
    }
}

//Clean the container for either all the elements or the preloader
HandlebarsBolt.prototype.CleanContainer = function (containerId) {
    HandlebarsBolt.RemovePreloaders();

    if (document.getElementById(containerId)) {
        while (document.getElementById(containerId).firstChild) document.getElementById(containerId).removeChild(document.getElementById(containerId).firstChild);
        document.getElementById(containerId).classList.add("u-hidden");
    }

    var event = new CustomEvent('cleanContainer');
    document.dispatchEvent(event);
}

//Update the template (Used for shifting views - Remember to work with the cookie, if you wish to use the update after page reload)
HandlebarsBolt.prototype.UpdateTemplate = function (containerId, templateId) {
    var container = document.getElementById(containerId);

    var scriptTemplate = document.getElementById(templateId).innerHTML;
    var template = Handlebars.compile(scriptTemplate);
    var dataFromCache = HandlebarsBolt.FindDataInCache(containerId);
    var compiledHtml = template(dataFromCache);

    container.setAttribute("data-template", templateId);

    var expiryTime = new Date();
    expiryTime.setTime(expiryTime.getTime() + (24 * 3600 * 1000));
    document.cookie = containerId + "Template=" + templateId + "; path=/; expires=" + expiryTime;

    container.innerHTML = compiledHtml;

    HandlebarsBolt.RevalidateImages();

    var event = new CustomEvent('updateTemplate', { 'detail': { 'containerId': containerId, "templateId": templateId, "data": dataFromCache } });
    container.dispatchEvent(event);
    document.dispatchEvent(event);
}

//If using bLazy to render images, revalidate when the template is fully rendered
HandlebarsBolt.prototype.RevalidateImages = function () {
    if (bLazy != null) {
        setTimeout(function () {
            bLazy.revalidate();
        }, 100);
    }
}

//Create a full data cache for reuse and fast template shifting
HandlebarsBolt.prototype.CreateCache = function (data, count, level) {
    if (Array.isArray(data) && data.length == 0) {
        return;
    }

    if (!count) {
        count = 0;
    }

    if (!level) {
        level = 0;
        if (handlebarsDebug) {
            console.info("%cHandlebarsBolt: Start caching", consoleStyles.success, data);
        }
    }

    if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
            HandlebarsBolt.CreateCacheObject(data[i], count, level);
        }
    } else {
        HandlebarsBolt.CreateCacheObject(data, count, level);
    }

    if (level == 0 && handlebarsDebug) {
        console.info("%cHandlebarsBolt: End caching", consoleStyles.success);
        console.log("Hint: You can type 'handlebarsBoltCache' in console to see current cache")
        console.log("");
    }
}

//Make the cache for each object
HandlebarsBolt.prototype.CreateCacheObject = function (data, count, level) {
    for (var property in data) {
        var obj = data[property];
        if (typeof obj == 'object' && obj && !(Array.isArray(obj) && obj.length == 0)) {
            //Make the ID unique for each sub object
            var uniqueId = data.id ? property + data.id : count == 0 ? property : property + count;
            var uniqueNumber = new Date().getTime();

            //Fix for multiple instances of the same element (Fx. multiple mini carts), while supporting different views (Fx. a product list) 
            if (document.getElementById(uniqueId)) {
                if (!document.getElementById(uniqueId).hasAttribute('data-save-cookie')) {
                    uniqueId = uniqueId + uniqueNumber;
                }
            }

            if (handlebarsBoltCache.hasOwnProperty(uniqueId)) {
                if (level == 0) {
                    HandlebarsBolt.MergeDeep(handlebarsBoltCache[uniqueId], obj);
                    if (handlebarsDebug) {
                        console.info("  Cache added: %s", uniqueId, obj);
                    }
                }
            } else {
                handlebarsBoltCache[uniqueId] = obj;
                if (level == 0 && handlebarsDebug) {
                    console.info("  Cache created: %s", uniqueId, obj);
                }
            }

            if (obj) {
                HandlebarsBolt.CreateCache(obj, count, level + 1);
            }

            count++;
        }
    }
}

HandlebarsBolt.prototype.MergeDeep = function(target, source) {
    for (var key in source) {
        if (source[key] && typeof source[key] === 'object' && target[key] != null) {
            HandlebarsBolt.MergeDeep(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    if (Array.isArray(target) && Array.isArray(source)) {
        target.splice(source.length, target.length);
    }
}

//Create a full data cache for reuse and fast template shifting
HandlebarsBolt.prototype.AddToCache = function (data, id) {
    if (handlebarsBoltCache[id]) {
        for (var i = 0; i < data.length; i++) {
            handlebarsBoltCache[id].push(data[i]);
        }
    } else {
        if (handlebarsDebug) {
            console.log("The handlebars bolt cache id: " + id + " does not exist. It may not be needed. You should handle the error, if you need it.");
        }
    }
}

//Create data in the cache object (Must be validated Json)
HandlebarsBolt.prototype.SetDataInCache = function (id, data) {
    handlebarsBoltCache[id] = data;
}

//Get a single cached data object by ID
HandlebarsBolt.prototype.FindDataInCache = function (id) {
    if (handlebarsBoltCache.hasOwnProperty(id)) {
        if (handlebarsDebug) {
            console.info("%cHandlebarsBolt: Data with key " + id + " was found in cache", consoleStyles.success, handlebarsBoltCache[id]);
        }
        return handlebarsBoltCache[id];
    } else {
        if (handlebarsDebug) {
            console.info("%cHandlebarsBolt: Data with key " + id + " not found in cache", consoleStyles.fail);
        }
        return null;
    }
}

//Parse to find the chosen cookie
HandlebarsBolt.prototype.GetCookie = function (name) {
    var pattern = RegExp(name + "=.[^;]*"),
        matched = document.cookie.match(pattern);

    if (matched) {
        var cookie = matched[0].split('=')
        return cookie[1]
    }
    return false
}

//Conditional helper for Handlebars
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

Handlebars.registerHelper('ToggleVisibility', function (parameter, options) {
    if (parameter != null && parameter != "")
        return options.fn(this);
    else
        return options.inverse(this);
});

Handlebars.registerHelper('toJSON', function(object){
    return new Handlebars.SafeString(JSON.stringify(object).replace(/\"/g, '\''));
});

HandlebarsBolt.prototype.UpdateQueryParameters = function (containerId, queryParams, updateUrl) {
    var container = document.getElementById(containerId);
    var feedQueryParams = new QueryArray(container.getAttribute("data-json-feed"));
    for (var key in queryParams) {
        feedQueryParams.setValue(key, queryParams[key]);
    }
    HandlebarsBolt.UpdateContent(containerId, feedQueryParams.getFullUrl(), false, container.getAttribute("data-template"), "overlay");
    if (updateUrl) {
        var browserQueryParams = new QueryArray(window.location.href);
        for (var key in queryParams) {
            browserQueryParams.setValue(key, queryParams[key]);
        }
        history.pushState(null, null, browserQueryParams.getFullUrl());
    }
}


//Auto initialization
var HandlebarsBolt = new HandlebarsBolt();

Handlebars.registerHelper('facebookPixelSearch', function (name, productNumber, price, currency, searchString) {
    fbq('track', 'Search', {
        content_name: name,
        content_category: 'Products',
        content_ids: [ productNumber ],
        value: price,
        currency: currency,
        search_string: searchString
    });
});

Handlebars.registerHelper('googleEnchantImpression', function (list, currency, googleImpression) {
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'ecommerce': {
                'currencyCode': currency,
                'impressions': [{
                    'name': googleImpression.name,  // Name or ID is required.
                    'id': googleImpression.id,
                    'price': googleImpression.price,
                    'brand': googleImpression.brand,
                    'category': googleImpression.category,
                    'variant': googleImpression.variant,
                    'list': list,
                    'position': googleImpression.position
                }]
            }
        });
    }
});

function googleEnchantImpressionClick(googleImpression) {
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': 'productClick',
            'ecommerce': {
                'click': {
                    'actionField': { 'list': googleImpression.list },      // Optional list property.
                    'products': [{
                        'name': googleImpression.name,    // Name or ID is required.
                        'id': googleImpression.id,
                        'price': googleImpression.price,
                        'brand': googleImpression.brand,
                        'category': googleImpression.category,
                        'variant': googleImpression.variant,
                        'position': googleImpression.position
                    }]
                }
            },
            'eventCallback': function () {
                document.location = googleImpression.url
            }
        });
    }
};

Handlebars.registerHelper('googleEnchantImpressionDetails', function (googleImpression) {
    // Measure a view of product details. This example assumes the detail view occurs on pageload,
    // and also tracks a standard pageview of the details page.
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'ecommerce': {
                'detail': {
                    'actionField': {},    // 'detail' actions have an optional list property.
                    'products': [{
                        'name': googleImpression.name,    // Name or ID is required.
                        'id': googleImpression.id,
                        'price': googleImpression.price,
                        'brand': googleImpression.brand,
                        'category': googleImpression.category,
                        'variant': googleImpression.variant
                    }]
                }
            }
        });
    }
});

var googleEnchantImpressionEmptyCart = function () { };

Handlebars.registerHelper('googleEnchantImpressionEmptyCart', function (orderlines) {
    googleEnchantImpressionEmptyCart = function () {
        var products = [];
        orderlines.forEach(function (orderline) {
            products.push(orderline.googleImpression);
        });
        // Measure the removal of a product from a shopping cart.
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'removeFromCart',
                'ecommerce': {
                    'remove': { // 'remove' actionFieldObject measures.
                        'products': products
                    }
                }
            });
        }
    }
});

Handlebars.registerHelper('convertStickerPositionToClassName', function (position) {
    return ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'custom'][position];
});
function IframeModal(options) {
    const self = this;

    //init elements
    this.elements = {
        modal: document.getElementById(options.modalId),
        buttons: {}
    };
    const elements = this.elements;
    if (elements.modal == null) {
        return null;
    }
    elements.iframe = elements.modal.getElementsByTagName('iframe')[0];
    [].slice.call(elements.modal.querySelectorAll('.modal__footer .btn')).forEach(function (btn) {
        elements.buttons[btn.id] = btn;
    });
    elements.trigger = document.getElementById(options.modalId + "Trigger");
    
    //init settings
    const defaults = {
        forceInit: true
    };

    this.settings = Object.assign({}, defaults, options);
    
    if (this.settings.forceInit) {
        self.Init();
    } else {
        document.addEventListener("DOMContentLoaded", function () {
            self.Init();
        });
    }
}

IframeModal.prototype.Init = function () {
    const elements = this.elements;
    elements.loader = document.createElement("div");
    elements.loader.className = "modal__loader";
    let spinner = document.createElement("i");
    spinner.className = "fa-4x fa-circle-notch fa-spin fas u-color-light";
    elements.loader.appendChild(spinner);
    elements.iframe.parentElement.appendChild(elements.loader);
    elements.iframe.classList.add('u-hidden');
    elements.iframe.onload = this.ShowIframe.bind(this);

    //close modal
    elements.trigger.addEventListener("change", function () {
        if (!this.checked) {
            //enable document scroll
            document.body.classList.remove("u-overflow-hidden");
            document.documentElement.classList.remove("u-overflow-hidden");

            elements.iframe.classList.add("u-hidden");
            elements.loader.classList.remove("u-hidden");
            //disable buttons
            for (var buttonName in elements.buttons) {
                let button = elements.buttons[buttonName];
                button.setAttribute("disabled", true);
                button.classList.add("disabled");
            }
        }
    });
}

IframeModal.prototype.ShowIframe = function () {
    const elements = this.elements;
    const iframe = elements.iframe;

    if (iframe.src != "about:blank") {
        elements.loader.classList.add("u-hidden");
        iframe.classList.remove("u-hidden");
        iframe.contentWindow.bLazy.revalidate();
        //enable buttons
        for (let buttonName in elements.buttons) {
            let button = elements.buttons[buttonName];
            button.removeAttribute("disabled");
            button.classList.remove("disabled");
        }
    }
}

IframeModal.prototype.InitIframeLoading = function (iframeSrc) {
    const elements = this.elements;
    const settings = this.settings;

    window.scroll(0, 0);
    //disable document scroll
    document.body.classList.add("u-overflow-hidden");
    document.documentElement.classList.add("u-overflow-hidden");

    elements.trigger.checked = true;
    elements.iframe.setAttribute("src", iframeSrc);
}

/*****
//    Custom method for order iframe modals in Customer Center.
//    Need 'linkPrefix', 'printBtn' and 'downloadBtn' properties passed in constructor as options.
//    'printBtn' and 'downloadBtn' params are optional
******/
IframeModal.prototype.ShowOrderModal = function (orderId, printLink) {
    const elements = this.elements;
    const settings = this.settings;

    let orderLink = settings.linkPrefix + orderId;

    if (printLink && elements.buttons[settings.printBtnId]) {
        elements.buttons[settings.printBtnId].setAttribute("href", printLink);
    }
    if (elements.buttons[settings.downloadBtnId]) {
        elements.buttons[settings.downloadBtnId].setAttribute("href", orderLink + "&pdf=true");
    }
    this.InitIframeLoading(orderLink);
};
Handlebars.registerHelper('getLiveProductInfo', function (containerId) {
    var ajaxContainerElement = document.getElementById(containerId);
    var jsonFeed = ajaxContainerElement.getAttribute('data-json-feed');
    jsonFeed = jsonFeed.concat(jsonFeed.indexOf("?") ? "&" : "?", "getproductinfo=true");
    HandlebarsBolt.UpdateContent(ajaxContainerElement.id, jsonFeed, false, ajaxContainerElement.getAttribute('data-template'), ajaxContainerElement.getAttribute('data-preloader'));
});
var LoadMore = function () { }

LoadMore.prototype.Next = function (selected, options) {
    if (typeof options === 'undefined') {
        options = {};
    }

    var pagesize = parseInt(selected.getAttribute("data-page-size"));
    var queryParams = new QueryArray(window.location.search);
    var containerId = selected.getAttribute("data-container");
    var container = document.getElementById(containerId);
    var currentPage = selected.getAttribute("data-current");
    var totalPages = selected.getAttribute("data-total");

    queryParams.setValue("feedType", "productsOnly");
    queryParams.setPath(selected.getAttribute("data-feed-url"), true);
    queryParams.setValue("pagesize", pagesize, true);

    currentPage++;

    selected.setAttribute("data-current", currentPage);

    queryParams.setValue("pagenum", currentPage);
    queryParams.setValue("redirect", "false");

    if (currentPage <= totalPages) {

        HandlebarsBolt.AddContent(containerId, queryParams.getFullUrl());

        queryParams = new QueryArray(window.location.href);

        if (queryParams.hasParam("pagesize")) {
            pagesize += parseInt(queryParams.getValue("pagesize"));
        } else {
            pagesize *= 2;
        }

        queryParams.setValue("pagesize", pagesize);

        history.pushState(null, null, queryParams.getFullUrl());
    }

    if (currentPage == totalPages) {
        selected.classList.add('u-hidden');
    }

    options = Object.assign(options, {
        'currentPage': currentPage,
        'totalPages': totalPages,
        'url': queryParams.getFullUrl(),
        'container': containerId
    });

    var event = new CustomEvent('loadMore', { 'detail': options });
    document.dispatchEvent(event);
    container.dispatchEvent(event);
}

var LoadMore = new LoadMore();
// Multiple Markers
var markersArray = new Array();

var Maps = function () { }

Maps.prototype.Init = function (options) {
    if (typeof options === 'undefined') {
        console.log('Maps init have no data');
        return;
    }

    if (document.getElementById(options.containerId) && !document.getElementById(options.containerId).hasAttribute('data-initialized')) {
        if (options.locationsList) {
            if (options.locationsList.length > 0) {
                var map;
                var bounds = new google.maps.LatLngBounds();
                var mapOptions = {
                    mapTypeId: 'roadmap'
                };

                // Display a map on the page
                map = new google.maps.Map(document.getElementById(options.containerId), mapOptions);
                map.setTilt(45);

                var markers = new Array();
                var infoWindowContent = [];

                for (var i = 0; i < options.locationsList.length; i++) {
                    var latitude = options.locationsList[i].latitude && options.locationsList[i].latitude != "0" ? options.locationsList[i].latitude.replace(",", ".") : "";
                    var longitude = options.locationsList[i].longitude && options.locationsList[i].longitude != "0" ? options.locationsList[i].longitude.replace(",", ".") : "";
                    var locationArray = [options.locationsList[i].company, latitude, longitude];
                    var locationCallback = options.selectionCallback ? '<button class="btn btn--primary dw-mod" onclick="' + options.selectionCallback + '()">' + options.buttonText + '</button>' : "";
                    var locationDetails = options.locationsList[i].address ? '<p>' + options.locationsList[i].address + '</p>' + '<p>' + options.locationsList[i].zip + ' ' + options.locationsList[i].city + ' ' + options.locationsList[i].country + options.locationsList[i].description + '</p>' : "<p>" + options.locationsList[i].description + "</p>";
                    var locationInfo = ['<div class="map-container__canvas__location-info">' + '<h5>' + options.locationsList[i].company + '</h5>' + locationDetails + locationCallback + '</div>'];
                    markers.push(locationArray);
                    infoWindowContent.push(locationInfo);
                }

                // Display multiple markers on a map
                var infoWindow = new google.maps.InfoWindow(), marker, i;

                //Make it possible to use the geocoder to look up addresses
                var geocoder = new google.maps.Geocoder();

                // Loop through our array of markers & place each one on the map
                for (var i = 0; i < markers.length; i++) {
                    var rawMarkerInfo = markers[i];
                    var latitude = rawMarkerInfo[1];
                    var longitude = rawMarkerInfo[2];
                    var currentIndex = i;
                    var position;

                    if (latitude == "") {
                        var address = options.locationsList[currentIndex].address + ", " + options.locationsList[currentIndex].city + ", " + options.locationsList[currentIndex].country;
                        var title = rawMarkerInfo[0];

                        geocoder.geocode({ 'address': address }, function (results, status) {
                            if (status == 'OK') {
                                position = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());

                                marker = new google.maps.Marker({
                                    position: position,
                                    map: map,
                                    title: title
                                });

                                // Allow each marker to have an info window
                                google.maps.event.addListener(marker, 'click', (function (marker, idx) {
                                    var j = idx;
                                    return function () {
                                        infoWindow.setContent(infoWindowContent[j][0]);
                                        infoWindow.open(map, marker);

                                        if (options.markerCallback) {
                                            options.markerCallback(options.locationsList[j]);
                                        }

                                        var event = new CustomEvent('mapMarkerOnClick', { 'detail': { 'data': options.locationsList[j] } });
                                        document.dispatchEvent(event);
                                    }
                                })(marker, currentIndex));

                                markersArray.push(marker);
                                bounds.extend(position);

                                map.fitBounds(bounds);
                            } else {
                                console.log('Geocode was not successful for the following reason: ' + status);
                            }
                        });
                    } else {
                        position = new google.maps.LatLng(latitude, longitude);

                        marker = new google.maps.Marker({
                            position: position,
                            map: map,
                            title: title
                        });

                        // Allow each marker to have an info window
                        google.maps.event.addListener(marker, 'click', (function (marker, idx) {
                            var j = idx;
                            return function () {
                                infoWindow.setContent(infoWindowContent[j][0]);
                                infoWindow.open(map, marker);

                                if (options.markerCallback) {
                                    options.markerCallback(options.locationsList[j]);
                                }

                                var event = new CustomEvent('mapMarkerOnClick', { 'detail': { 'data': options.locationsList[j] } });
                                document.dispatchEvent(event);
                            }
                        })(marker, currentIndex));

                        markersArray.push(marker);
                        bounds.extend(position);

                        map.fitBounds(bounds);
                    }
                }

                // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
                var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
                    if (markers.length == 1) {
                        map.setZoom(10);
                    }

                    google.maps.event.removeListener(boundsListener);
                });

                document.getElementById(options.containerId).setAttribute("data-initialized", "True");
            }
        }
    }
}


Maps.prototype.OpenInfo = function (markerId) {
    google.maps.event.trigger(markersArray[markerId], 'click');

    var event = new CustomEvent('mapOpenInfo', { 'detail': { 'markerId': markerId } });
    document.dispatchEvent(event);
}

var Maps = new Maps();

var MatchVariants = function () { }

//Public method: Handle option click when using HTML select
MatchVariants.prototype.SelectOnChange = function (e) {
    if (document.getElementById(e.currentTarget.value)) {
        MatchVariants.SelectThis(document.getElementById(e.currentTarget.value));
    }
}


//Public method: Handle option click (Adds/Removes a selection in the selections list)
MatchVariants.prototype.SelectThis = function (e) {
    var clickedOption = e.currentTarget != null ? e.currentTarget : e;
    var clickedOptionId = clickedOption.getAttribute("data-variant-id");
    var currentVariantsBlock = clickedOption.closest(".js-variants");
    var selectionCompleteCommand = currentVariantsBlock.getAttribute("data-selection-complete");
    var selectionsList = currentVariantsBlock.getAttribute("data-variant-selections") ? currentVariantsBlock.getAttribute("data-variant-selections").split(",") : [];
    var allOptions = currentVariantsBlock.querySelectorAll(".js-variant-option");
    var allOptionsTotal = allOptions.length;

    if (!clickedOption.classList.contains("checked")) {
        selectionsList.push(clickedOptionId);

        //If there already is a selection in the variant group, remove it
        var selectionGroup = currentVariantsBlock.querySelector("[data-variant-id='" + clickedOptionId + "']").getAttribute("data-variant-group");

        for (var optionItem = 0; optionItem < allOptionsTotal; optionItem++) {
            var availableOptionId = allOptions[optionItem].getAttribute("data-variant-id");

            if (availableOptionId != clickedOptionId) {
                if (allOptions[optionItem].getAttribute("data-variant-group") == selectionGroup) {
                    MatchVariants.RemoveItem(selectionsList, availableOptionId);
                }
            }
        }
    } else {
        MatchVariants.RemoveItem(selectionsList, clickedOptionId);
    }

    //Save the new variant selections
    currentVariantsBlock.setAttribute("data-variant-selections", selectionsList);

    //Call the update
    MatchVariants.Update(clickedOption.closest(".js-variants"), selectionCompleteCommand);
}

//Private method, may in rare cases be used public: Update all variant selections and states
MatchVariants.prototype.Update = function (currentVariantsBlock, selectionCompleteCommand) {
    var selectionCompleteCommand = selectionCompleteCommand != null ? selectionCompleteCommand : "DoNotning";
    var selectedOptions = currentVariantsBlock.getAttribute("data-variant-selections") ? currentVariantsBlock.getAttribute("data-variant-selections").split(",") : [];
    var allOptions = currentVariantsBlock.querySelectorAll(".js-variant-option"); 
    var totalVariantgroups = currentVariantsBlock.getAttribute("data-total-variant-groups");

    //Clean all previous renderings (selections + disabled)
    MatchVariants.CleanVariantOptions(allOptions);

    if (selectedOptions.length > 0) {
        var reg = new RegExp("\'", 'g');
        var variantOptionsByGroup = JSON.parse(currentVariantsBlock.getAttribute("data-variants").replace(reg, "\""));
        var variantCombinations = JSON.parse(currentVariantsBlock.getAttribute("data-combinations").replace(reg, "\""));

        if (totalVariantgroups > 1) {
           var optionsToHide = MatchVariants.GetOptionsToHide(variantOptionsByGroup, variantCombinations, selectedOptions);
            for (var optionItem = 0; optionItem < optionsToHide.length; optionItem++) {
                var optionElement = currentVariantsBlock.querySelector("[data-variant-id='" + optionsToHide[optionItem] + "']")
                MatchVariants.ExcludeVariantOption(optionElement);
            }
        } 
    }

    //Set the selections
    for (var selection = 0; selection < selectedOptions.length; selection++) {
        MatchVariants.SetVariantSelection(currentVariantsBlock.querySelector("[data-variant-id='" + selectedOptions[selection] + "']"));
    }

    //Check if a full selection is made, the do the action
    var selectionsCount = selectedOptions.length;
    if (selectionsCount == totalVariantgroups) {
        MatchVariants.SelectionComplete(currentVariantsBlock, selectionCompleteCommand);
    } else {
        MatchVariants.SelectionNotComplete(currentVariantsBlock);
    }
}

//Public method: Clean all options for bot selections and states 
MatchVariants.prototype.CleanVariantOptions = function (allOptions) {
    for (var option = 0; option < allOptions.length; option++) {
        allOptions[option].classList.remove("disabled"); //RENDER
        allOptions[option].classList.remove("checked");  //RENDER
        allOptions[option].disabled = false;
    }
}

//Public method: Render a selection on an option 
MatchVariants.prototype.SetVariantSelection = function (selectedOption) {
    selectedOption.classList.add("checked"); //RENDER
}

//Public method: Render an disabled state on an option 
MatchVariants.prototype.ExcludeVariantOption = function (option) {
    option.classList.add("disabled");  //RENDER
    option.disabled = true;
}

//Public method: What to do, while the selection is not complete  
MatchVariants.prototype.SelectionNotComplete = function (currentVariantsBlock) {
    var cartButtons = currentVariantsBlock.closest(".js-product").querySelectorAll(".js-cart-btn");
    var favoriteButton = currentVariantsBlock.closest(".js-product").querySelector(".js-favorite-btn");
    var helpText = currentVariantsBlock.querySelector(".js-help-text");

    //Disable the cart button
    cartButtons.forEach(function (button) {
        button.disabled = true;
        button.classList.add('disabled'); //RENDER
    });

    //Disable the favorite button
    if (favoriteButton) {
        favoriteButton.disabled = true;
        favoriteButton.classList.add('disabled'); //RENDER
    }

    //Render help text
    if (helpText) {
        helpText.classList.remove('u-visibility-hidden'); //RENDER
    }
}

//Public method: Toggle what to do when all the selections are complete. Often, refresh the page or get new data.
MatchVariants.prototype.SelectionComplete = function (currentVariantsBlock, selectionCompleteCommand) {
    var selectionsList = currentVariantsBlock.getAttribute("data-variant-selections") ? currentVariantsBlock.getAttribute("data-variant-selections").split(",") : [];
    var cartButtons = currentVariantsBlock.closest(".js-product").querySelectorAll(".js-cart-btn");
    var favoriteButton = currentVariantsBlock.closest(".js-product").querySelector(".js-favorite-btn");
    var helpText = currentVariantsBlock.querySelector(".js-help-text");

    //Dynamicweb does only support black magic sorting on the variant keys (The order MUST follow the variant groups sort)
    selectionsList = MatchVariants.SelectionListSort(currentVariantsBlock);

    var pageId = currentVariantsBlock.getAttribute("data-page-id");
    var productId = currentVariantsBlock.getAttribute("data-product-id");

    switch (selectionCompleteCommand) {
        case "UpdatePage":
            var groupId = currentVariantsBlock.getAttribute("data-group-id");
            var cleanLink = "/Default.aspx?ID=" + pageId + "&GroupID=" + groupId + "&ProductID=" + productId + "&VariantID=" + selectionsList.join(".");
            window.location = cleanLink;
            break;
        case "UpdateData":
            var cleanLink = "/Default.aspx?ID=" + pageId + "&ProductID=" + productId + "&VariantID=" + selectionsList.join(".");
            var feedUrl = cleanLink + "&feed=true&redirect=false";
            feedUrl += currentVariantsBlock.getAttribute("data-live-price") == "true" ? "&getproductinfo=true" : "";
            var productContainer = currentVariantsBlock.closest(".js-product");
            HandlebarsBolt.UpdateContent(productContainer.id, feedUrl);

            productContainer.addEventListener('contentLoaded', function (e) {
                MatchVariants.Update(productContainer.querySelector(".js-variants"), "DoNothing");
            }, false);
            
            break;
    }

    cartButtons.forEach(function (button) {
        if (!button.classList.contains("js-stay-disabled")) {
            button.disabled = false;
            button.classList.remove('disabled'); //RENDER
        }
    });

    if (favoriteButton) {
        favoriteButton.disabled = false;
        favoriteButton.classList.remove('disabled'); //RENDER
    }

    if (helpText) {
        helpText.classList.add('u-visibility-hidden'); //RENDER
    }
}

//Private method: Sort the selections by the group they are in (That is how Dynamicweb needs them)
MatchVariants.prototype.SelectionListSort = function (variantsContainer) {
    var currentVariantsBlock = variantsContainer;
    var selectionsList = currentVariantsBlock.getAttribute("data-variant-selections") ? currentVariantsBlock.getAttribute("data-variant-selections").split(",") : [];
    var selectionsListTotal = selectionsList.length;
    var sortedSelectionsList = [];
    var allOptions = currentVariantsBlock.querySelectorAll(".js-variant-option");
    var allOptionsTotal = allOptions.length;

    for (var optionItem = 0; optionItem < allOptionsTotal; optionItem++) {
        var optionId = allOptions[optionItem].getAttribute("data-variant-id");

        for (var selectionItem = 0; selectionItem < selectionsListTotal; selectionItem++) {
            var selectionId = selectionsList[selectionItem];

            if (optionId == selectionId) {
                sortedSelectionsList.push(selectionId);
            }
        }
    }

    return sortedSelectionsList;
}

//Private method: Return an array of all the variant options that should be hidden, after the selections is made
MatchVariants.prototype.GetOptionsToHide = function(variantOptionsByGroup, variantCombinations, selectedOptions) {
    var selectedOptionsCount = selectedOptions.length;
    var variantCombinationsCount = variantCombinations.length;
    var optionsToHide = [];

    //For each group, hide all variantoptions that are not valid for current selection
    for (var groupIndex = 0; groupIndex < variantOptionsByGroup.length; groupIndex++) {
        var optionsToHideForThisGroup = variantOptionsByGroup[groupIndex];//Create list with all options in the group and remove options as they are matched as still possible
        var groupSelectedOption = MatchVariants.FindSelectedGroupOption(selectedOptionsCount, selectedOptions, optionsToHideForThisGroup);

        //Investigate which combinations is possible
        for (var combinationIndex = 0; combinationIndex < variantCombinationsCount; combinationIndex++) {
            var variantCombination = variantCombinations[combinationIndex]; //Array of variant options
            var showOptionsOfCombination = MatchVariants.IsValidSelection(variantCombination, selectedOptionsCount, selectedOptions, groupSelectedOption);

            //If all selections are part of a final combination, then build an array of still available options
            if (showOptionsOfCombination) {
                MatchVariants.ShowVariantCombinationOptions(variantCombination, optionsToHideForThisGroup);
            }
        }
        //Build the array of options to hide by adding the hidden options from the current group
        optionsToHide = optionsToHide.concat(optionsToHideForThisGroup);
    }
    return optionsToHide;
}

//Private method: Loops through all combinationOptions to see if the whole of the combination is valid as per the selected options
MatchVariants.prototype.IsValidSelection = function(combinationOptions, selectedCount, selectedOptions, groupSelectedOption) {
    var count = 0;
    var optionCount = combinationOptions.length;
    //Check if the selections are ALL part of the full combination (Final product) 
    for (var selectionIndex = 0; selectionIndex < selectedCount; selectionIndex++) {
        var selectedOption = selectedOptions[selectionIndex];
        if (selectedOption == groupSelectedOption) { //Match current group as a wildcard. Fx. VO11.VO21.VO31 should match as VO11.?.VO31 for the second variantgroup 
            count++;
        } else {
            for (var optionIndex = 0; optionIndex < optionCount; optionIndex++) {
                var combinationOption = combinationOptions[optionIndex];
                if (selectedOption == combinationOption) {
                    count++;
                }
            }
        }
    }
    return (selectedCount == count);
}

//Private method: Find the first option of the group that is part of the selection
MatchVariants.prototype.FindSelectedGroupOption = function(selectedCount, selectedOptions, groupOptions) {
    var optionsTotal = groupOptions.length;
    var selectedGroupOption = "";
    for (var selectionIndex = 0; selectionIndex < selectedCount; selectionIndex++) {
        var selectedOption = selectedOptions[selectionIndex];
        for (var variantIndex = 0; variantIndex < optionsTotal; variantIndex++) {
            if (selectedOption == groupOptions[variantIndex]) {
                selectedGroupOption = selectedOptions[selectionIndex];
            }
        }
    }
    return selectedGroupOption;
}

//Private method: Ensure that all options of the specified combination is shown (by removing them from optionsToHideForThisGroup)
MatchVariants.prototype.ShowVariantCombinationOptions = function(combinationOptions, optionsToHideForThisGroup) {
    var combinationOptionsCount = combinationOptions.length;
    for (var optionIndex = 0; optionIndex < combinationOptionsCount; optionIndex++) {
        var optionToShow = combinationOptions[optionIndex];
        MatchVariants.RemoveItem(optionsToHideForThisGroup, optionToShow);
    }
}

//Private method: Remove an specified item from an array
MatchVariants.prototype.RemoveItem = function (array, item) {
    for (var i in array) {
        if (array[i] == item) {
            array.splice(i, 1);
            break;
        }
    }
}

var MatchVariants = new MatchVariants();
//IE Polyfill for CustomEvents
(function () {
    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

//Polyfill for Closest()
if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest =
    function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) { };
        } while ((i < 0) && (el = el.parentElement));
        return el;
    };
}

//get index of element
if (window.Element && !Element.prototype.index) {
    Element.prototype.index = function () {
        var index = 0;
        var node = this;
        while ((node = node.previousElementSibling)) {
            index++;
        }
        return index;
    }
}

//Polyfill for forEach()
// (en): http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function (searchElement, fromIndex) {

            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            // 1. Let O be ? ToObject(this value).
            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If len is 0, return false.
            if (len === 0) {
                return false;
            }

            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0;

            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }

            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                // b. If SameValueZero(searchElement, elementK) is true, return true.
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
                // c. Increase k by 1. 
                k++;
            }

            // 8. Return false
            return false;
        }
    });
}

// Create Element.remove() function if not exist
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

//fix for e.srcElement in firefox and e.target in IE
//https://stackoverflow.com/questions/13602039/e-srcelement-is-undefined-in-firefox
function getTarget(obj) {
    var targ;
    var e = obj;
    if (e.target) {
        targ = e.target;
    } else if (e.srcElement) {
        targ = e.srcElement;
    }
    if (targ.nodeType == 3) {
        // defeat Safari bug
        targ = targ.parentNode;
    }
    return targ;
}

if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) { // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}

!(function () {
    'use strict';
    var testElement = document.createElement('_');
    testElement.className = 'c1';

    // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
    // support the second argument.

    testElement.classList.toggle('c1', true);

    if (!testElement.classList.contains('c1')) {
        var _toggle = DOMTokenList.prototype.toggle;

        DOMTokenList.prototype.toggle = function (token, force) {
            if (1 in arguments && !this.contains(token) === !force) {
                return force;
            }
            return _toggle.call(this, token);
        };
    }
    testElement = null;
}());
function QueryArray(queryStr) {
    this.queryArray = {};

    if (typeof queryStr != "string" || queryStr == "") {
        return;
    }
    var queryParams = "";

    if (queryStr.indexOf('=') == -1) {         //site.com
        this.path = queryStr.replace("?", ""); //site.com?
        return;
    }

    if (queryStr.indexOf('?') != -1) {         //site.com?a=1  or  ?a=1
        var arr = queryStr.split('?');
        this.path = arr[0];
        queryParams = arr[1];
    } else {
        queryParams = queryStr;                //a=1
    }

    var queryArr = queryParams.split("&");
    for (index in queryArr) {
        if (queryArr[index] != "") {
            var keyValue = queryArr[index].split("=");
            this.setValue(decodeURIComponent(keyValue[0]), decodeURIComponent(keyValue[1]));
        }
    }
}

QueryArray.prototype.setPath = function(path, saveQueryParams) {
    if (path.indexOf('?') == -1) {
        this.path = path;
        return;
    }
    var arr = path.split('?');
    this.path = arr[0];
        
    if (saveQueryParams) {
        this.combineWithParams(arr[1]);
    }
}

QueryArray.prototype.combineWithParams = function (str) {
    if (str == null || str.trim() == "") {
        return;
    }
    var newParams = new QueryArray(str);
    var queryArr = newParams.queryArray;
    for (var key in queryArr) {
        if (newParams.hasParam(key)) {
            this.setValue(key, queryArr[key]);
        }
    }
}

QueryArray.prototype.getQueryString = function() {
    var arr = [];
    //fix because ID should be always first in query
    if (this.hasParam("ID")) {
        arr.push("ID" + "=" + this.getValue("ID"));
    }
    for (var key in this.queryArray) {
        if (key.toLowerCase() != "id" && this.hasParam(key) && this.queryArray[key].toString().trim() != "") {
            arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(this.queryArray[key]));
        }
    }
    return arr.length > 0 ? "?" + arr.join("&") : "";
}

QueryArray.prototype.getFullUrl = function () {
    return this.path + this.getQueryString();
}

QueryArray.prototype.copy = function() {
    return new QueryArray(this.getFullUrl());
}

QueryArray.prototype.getValue = function(key) {
    return this.queryArray[key];
}

QueryArray.prototype.setValue = function(key, newValue, setIfExist) {
    if (!setIfExist || this.hasParam(key)) {
        this.queryArray[key] = newValue;
    }
}

QueryArray.prototype.hasParam = function(key) {
    return this.queryArray.hasOwnProperty(key);
}

QueryArray.prototype.remove = function(key) {
    delete this.queryArray[key];
}

//static

QueryArray.setParameterInCurrentURL = function(key, newValue, setIfExist) {
    var queryParams = new QueryArray(window.location.href);
    if (newValue == "" || newValue == null) {
        queryParams.remove(key);
    } else {
        queryParams.setValue(key, newValue, setIfExist);
    }
    window.location.href = queryParams.getFullUrl();
}

QueryArray.setParametersInCurrentURL = function (parameters) {
    var queryParams = new QueryArray(window.location.href);
    for (var key in parameters) {
        var newValue = parameters[key];

        if (newValue == "" || newValue == null) {
            queryParams.remove(key);
        } else {
            queryParams.setValue(key, newValue);
        }
    }

    window.location.href = queryParams.getFullUrl();
}

QueryArray.getParameterFromCurrentURL = function (key) {
    var queryParams = new QueryArray(window.location.href);
    return queryParams.getValue(key);
}
//The RapidoHook is a simple wrapper for the Javascript event listeners. They exist to make the methods strong and simplify the code when you use it for extending. 
//You are still free to just use the classic event listeneres, as you are used to.


var RapidoHook = function () { }

//The base event wrapper method
RapidoHook.prototype.event = function (callback, callbackType, eventName, targetElement) {
    targetElement = targetElement != null ? targetElement : document;

    if (callbackType != "attach" && callbackType != "detach" && callbackType != null) {
        console.log("RapidoHook: The type must be either \"attach\" or \"detach\"");
    }

    if (!targetElement) {
        console.log("RapidoHook: The target element does not exist. The fallback is the \"document\" element.");
    } 

    if (!eventName) {
        console.log("RapidoHook: You must specify an event name");
        return;
    }

    if (callbackType == null || callbackType == "attach") {
        targetElement.addEventListener(eventName, function (e) {
            callback(e);
        }, false);
    }

    if (callbackType == "detach") {
        targetElement.removeEventListener(eventName, function (e) {
            callback(e);
        }, false);
    }
}


//Available hooks that you could use

//Buttons.js
RapidoHook.prototype.buttonIsLocked = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'buttonIsLocked', targetElement);
}

//Carousel.js
RapidoHook.prototype.initSlideShow = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'initSlideShow', targetElement);
}

RapidoHook.prototype.shiftSlide = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'shiftSlide', targetElement);
}

//Cart.js
RapidoHook.prototype.addToCart = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'addToCart', targetElement);
}

RapidoHook.prototype.emptyCart = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'emptyCart', targetElement);
}

RapidoHook.prototype.cartUpdated = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'cartUpdated', targetElement);
}

//Facets.js
RapidoHook.prototype.updateFacets = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'updateFacets', targetElement);
}

RapidoHook.prototype.resetFacets = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'resetFacets', targetElement);
}

//LoadMore.js
RapidoHook.prototype.loadMore = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'loadMore', targetElement);
}

//Maps.js
RapidoHook.prototype.mapMarkerOnClick = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'mapMarkerOnClick', targetElement);
}

RapidoHook.prototype.mapOpenInfo = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'mapOpenInfo', targetElement);
}

//Scroll.js
RapidoHook.prototype.saveScrollPosition = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'saveScrollPosition', targetElement);
}

RapidoHook.prototype.setScrollPosition = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'setScrollPosition', targetElement);
}

RapidoHook.prototype.savePagePosition = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'savePagePosition', targetElement);
}

//HandlebarsBolt.js (Targeted to specific Rapido elements)
RapidoHook.prototype.contentLoaded = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'contentLoaded', targetElement);
}

RapidoHook.prototype.itemsCreatedFromJson = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'itemsCreatedFromJson', targetElement);
}

RapidoHook.prototype.removePreloaders = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'removePreloaders', targetElement);
}

RapidoHook.prototype.updateTemplate = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'updateTemplate', targetElement);
}

RapidoHook.prototype.productListLoaded = function (callback, callbackType) {
    RapidoHook.event(callback, callbackType, 'contentLoaded', document.getElementById("productList"));
}

RapidoHook.prototype.productListUpdated = function (callback, callbackType) {
    RapidoHook.event(callback, callbackType, 'contentLoaded', document.getElementById("ProductsContainer"));
}

RapidoHook.prototype.productListViewChange = function (callback, callbackType) {
    RapidoHook.event(callback, callbackType, 'updateTemplate', document.getElementById("ProductsContainer"));
}

RapidoHook.prototype.miniCartLoaded = function (callback, callbackType) {
    RapidoHook.event(callback, callbackType, 'contentLoaded', document.getElementById("miniCart"));
}

RapidoHook.prototype.cartLoaded = function (callback, callbackType) {
    RapidoHook.event(callback, callbackType, 'contentLoaded', document.getElementById("Cart"));
}

RapidoHook.prototype.customProductListLoaded = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'contentLoaded', targetElement);
}

RapidoHook.prototype.customProductListUpdated = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'contentLoaded', targetElement);
}

RapidoHook.prototype.customProductListViewChange = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'updateTemplate', targetElement);
}

RapidoHook.prototype.customMiniCartLoaded = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'contentLoaded', targetElement);
}

RapidoHook.prototype.customCartLoaded = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'contentLoaded', targetElement);
}

//ImageList.js
RapidoHook.prototype.imageListLoadImage = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'imageListLoadImage', targetElement);
}

RapidoHook.prototype.imageListOpenImage = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'imageListOpenImage', targetElement);
}

RapidoHook.prototype.imageListPreviousImage = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'imageListPreviousImage', targetElement);
}

RapidoHook.prototype.imageListNextImage = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'imageListNextImage', targetElement);
}

//Variants.js
RapidoHook.prototype.variantsUpdate = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'variantsUpdate', targetElement);
}

RapidoHook.prototype.variantsSelectionComplete = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'variantsSelectionComplete', targetElement);
}

//Wireframe.js
RapidoHook.prototype.wireframeInit = function (callback, callbackType, targetElement) {
    RapidoHook.event(callback, callbackType, 'wireframeInit', targetElement);
}


var RapidoHook = new RapidoHook();

var RegionLabels = function () { };
document.addEventListener("DOMContentLoaded", function (event) {
    var countryFields = document.querySelectorAll("#UserManagement_Form_Country, #EcomOrderCustomerCountry, #EcomOrderDeliveryCountry");

    for (var i = 0; i < countryFields.length; i++) {
        regionLabels.Update(countryFields[i]);
        countryFields[i].addEventListener("change", function () {
            regionLabels.Update(this);
        });
    }
});
RegionLabels.prototype.GetCountryByCode = function (country) {
    for (var i = 0; i < regions.length; i++) {
        if (regions[i].Country === country) {
            return regions[i];
        }
    }
    return null;
};
RegionLabels.prototype.Update = function (source) {
    var regionLabel = document.querySelector("label[for=" + source.id.replace("Country", "Region") + "]");
    if (regionLabel === null) { regionLabel = document.querySelector("label[for=" + source.id.replace("Country", "State") + "]"); }
    if (regionLabel !== null) {
        var selectedCountry = source.options[source.selectedIndex].value;
        var country = regionLabels.GetCountryByCode(selectedCountry);
        if (country === null) {
            
            country = regionLabels.GetCountryByCode("default");
        }
        regionLabel.innerHTML = country.Region;
    }
};
var regionLabels = new RegionLabels();
function RememberState () { }
var loadedRememberStateElements = [];
var observer = new MutationObserver(function (mutations) { });
var config = { attributes: true, childList: false, characterData: false }

document.addEventListener("DOMContentLoaded", function (event) {
    RememberState.GetState();

    //Make it work with Ajax loaded content
    var ajaxContainer = document.getElementsByClassName("js-handlebars-root");
    if (ajaxContainer.length > 0) {
        for (var i = 0; i < ajaxContainer.length; i++) {
            ajaxContainer[i].addEventListener('contentLoaded', function (e) {
                let refresh = false;
                this.querySelectorAll(".js-remember-state").forEach(function (el) {
                    let index = loadedRememberStateElements.indexOf(el.id);
                    if (index > -1) {
                        loadedRememberStateElements.splice(index, 1);
                    }
                    refresh = true;
                });
                if (refresh) {
                    RememberState.GetState();
                }
            }, false);
        }
    }

    var params = RememberState.getSearchParameters();
    for (property in params) {
        var element = document.getElementById(property);
        if (element && (element.type === 'checkbox')) {
            element.checked = params[property];
            element.setAttribute("data-loaded", true);
        }
    }
});

RememberState.prototype.SaveState = function () {
    var rememberStateElements = document.getElementsByClassName("js-remember-state");

    for (var elm = 0; elm < rememberStateElements.length; elm++) {
        var target = rememberStateElements[elm];

        if (!RememberState.ElementExists(target.id)) {

            //Save cookie when an attribute changes on the element
            observer = new MutationObserver(function (mutations) {
                var stateCookie = "StateCookie_" + mutations[0].target.id + "=[{";

                if (target.getAttribute("type") != "checkbox") {
                    var count = 0;

                    mutations.forEach(function (mutation) {
                        stateCookie += '"' + mutation.attributeName + '": "' + mutation.target.getAttribute(mutation.attributeName) + '"';
                        if (count != mutations.length - 1) {
                            stateCookie += ",";
                        }
                        count++;
                    });
                } else {
                    stateCookie += '"checked": "' + mutations[0].target.checked + '"';
                }

                stateCookie += "}]";

                document.cookie = stateCookie;
            });

            if (target.getAttribute("type") == "checkbox") {
                target.addEventListener('click', function (e) {
                    e.target.setAttribute('checked', e.target.checked);
                });
            }

            observer.observe(target, config);
            loadedRememberStateElements.push(target.id);
        }
    }
}

RememberState.prototype.GetState = function () {
    var rememberStateElements = document.getElementsByClassName("js-remember-state");

    for (var elm = 0; elm < rememberStateElements.length; elm++) {
        var target = rememberStateElements[elm];

        //Get the cookie and set the saved attributes
        var resultCookie = RememberState.GetCookie("StateCookie_" + target.id);

        if (resultCookie) {
            resultCookie = JSON.parse(resultCookie);

            for (var crumb = 0; crumb < resultCookie.length; crumb++) {
                for (property in resultCookie[crumb]) {
                    target.setAttribute(property, resultCookie[crumb][property]);

                    if (property == "checked") {
                        if (resultCookie[crumb][property] == "false") {
                            target.removeAttribute("checked");
                        } else {
                            target.checked = true;
                        }
                    }
                }
            }
        }

        target.setAttribute("data-loaded", true);
    }

    var event = new CustomEvent('rememberStatesSet');
    document.dispatchEvent(event);

    //Set up remember state again after the last state is set
    RememberState.SaveState();
}

//Parse to find the chosen cookie
RememberState.prototype.ElementExists = function (elementId) {
    return loadedRememberStateElements.includes(elementId);
}

//Parse to find the chosen cookie
RememberState.prototype.GetCookie = function (name) {
    var pattern = RegExp(name + "=.[^;]*"),
        matched = document.cookie.match(pattern);

    if (matched) {
        var cookie = matched[0].split('=')
        return cookie[1]
    }
    return false
}


//Set simple checkbox state by url parameter (js-remember-state class not required)
RememberState.prototype.getSearchParameters = function() {
    var paramstring = window.location.search.substr(1);
    return paramstring != null && paramstring != "" ? RememberState.transformToAssocArray(paramstring) : {};
}

RememberState.prototype.transformToAssocArray = function (paramstring) {
    var params = {};
    var paramsarray = paramstring.split("&");
    for (var i = 0; i < paramsarray.length; i++) {
        var tmparray = paramsarray[i].split("=");
        params[tmparray[0]] = tmparray[1];
    }
    return params;
}

var RememberState = new RememberState();
var requestDebug = window.location.search.indexOf('debug=true') >= 0 ? true : false;

function Request() { }

Request.prototype.newRequest = function (url, method, data, successCallback, errorCallback, returnJson) {
    if (returnJson == null) {
        returnJson = true;
    }

    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        const self = this;
        function error(message) {
            console.warn(message);

            if (typeof errorCallback == "function") {
                errorCallback(this.response);
            }
        }

        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var data;

            if (this.responseType === 'json') {
                data = this.response.message.trim();
            } else {
                data = this.response.trim();
            }

            if (requestDebug) {
                console.info("%cData: ", consoleStyles.success, data);
            }

            if (returnJson) {
                if (data == "") {
                    console.warn(url + ": Response is empty");
                    data = {};
                } else if (data.indexOf("<") == 0) {
                    error.call(self, url + ": URL returned HTML instead of JSON");
                    return;
                } else {
                    try {
                        data = JSON.parse(data);
                    } catch (e) {
                        error.call(self, url + ": Could not parse the JSON data");
                        return;
                    }
                }
            }

            if (typeof successCallback == "function") {
                successCallback(data);
            }
        } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
            error.call(self, url + ": XMLHttpRequest failed");
        }
    };

    xhr.setRequestHeader('cache-control', 'no-cache, must-revalidate, post-check=0, pre-check=0');
    xhr.setRequestHeader('cache-control', 'max-age=0');
    xhr.setRequestHeader('expires', '0');
    xhr.setRequestHeader('expires', 'Tue, 01 Jan 1980 1:00:00 GMT');
    xhr.setRequestHeader('pragma', 'no-cache');

    if (data) {
        let formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
        xhr.send(formData);
    } else {
        xhr.send();
    }
};

Request.prototype.Fetch = function () {
    var self = this;

    return {
        get: function (url, successCallback, errorCallback, returnJson) {
            self.newRequest(url, "GET", null, successCallback, errorCallback, returnJson);
        },

        post: function (url, data, successCallback, errorCallback, returnJson) {
            self.newRequest(url, "POST", data, successCallback, errorCallback, returnJson);
        }
    };
};

var Request = new Request();

var Scroll = function () { }

document.addEventListener("DOMContentLoaded", function (event) {
    var productList = document.getElementById("productList");

    if (productList && productList.classList.contains("js-handlebars-root")) {
        productList.addEventListener('contentLoaded', function (e) {
            setTimeout(function () {
                var scrollPos = Scroll.getURLParameter("ScrollPos");
                window.scroll(0, scrollPos);
            }, 1000);
        }, false);
    } else {
        var ajaxContainer = document.getElementsByClassName("js-handlebars-root");
        if (ajaxContainer.length > 0) {
            for (var i = 0; i < ajaxContainer.length; i++) {
                ajaxContainer[i].addEventListener('contentLoaded', function (e) {
                    Scroll.SetPosition();
                    Scroll.SetPagePosition();
                }, false);
            }
        }
    }

    Scroll.SetPagePosition();
});

Scroll.prototype.SavePosition = function (e) { 
    e.preventDefault();

    var url = window.location.href;

    var seperator = "?";
    if (url.indexOf("?") != -1) {
        seperator = "&";
    }

    var scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

    if (Scroll.getURLParameter("ScrollPos")) {
        url = url.replace(/\bScrollPos=[^&#]+/g, "ScrollPos=" + Math.round(scrollPos));
    } else {
        url = window.location + seperator + "ScrollPos=" + Math.round(scrollPos);
    }
    
    history.replaceState(null, null, url);

    var event = new CustomEvent('saveScrollPosition', { 'detail': { 'scrollPos': scrollPos } });
    document.dispatchEvent(event);

    window.location.href = e.currentTarget.getAttribute("href");
}

Scroll.prototype.SetPosition = function () {
    var scrollPos = Scroll.getURLParameter("ScrollPos");

    if (scrollPos != null) {
        setTimeout(function () {
            window.scroll(0, scrollPos);
        }, 500);

        var event = new CustomEvent('setScrollPosition', { 'detail': { 'scrollPos': scrollPos } });
        document.dispatchEvent(event);

        if (bLazy != null) {
            bLazy.revalidate();
        }
    }
}

Scroll.prototype.SetPagePosition = function () {
    var topElement = document.getElementById("Top");
    var topHeight = topElement ? topElement.clientHeight : "90";
    var fullHeightItems = document.querySelectorAll('.screen-height');
    fullHeightItems.forEach(function (filterItem) {
        filterItem.style.minHeight = topElement.classList.contains('top-container--sticky') ? 'calc(100vh - ' + topHeight + 'px)' : '100vh';
    });

    var page = document.getElementById("Page");

    if (page.classList.contains("js-page-pos")) {
        var scrollDelay = 1;

        if (/Edge\/\d./i.test(navigator.userAgent)) {
            scrollDelay = 500;
        }

        var event = new CustomEvent('savePagePosition', { 'detail': { 'scrollPos': topHeight } });

        if (topHeight > 0) {
            page.style.marginTop = topHeight + "px";
            document.dispatchEvent(event);
        } else {
            setTimeout(function () {
                topHeight = topElement.clientHeight;
                page.style.marginTop = topHeight + "px";
                document.dispatchEvent(event);
            }, scrollDelay);
        }
    }
}

Scroll.prototype.getURLParameter = function (name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}


var Scroll = new Scroll();

var Search = function () { }

function debounce(method, delay) {
    var timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            method();
        }, delay);
    };
}

Search.prototype.Init = function () {
    var searchElements = document.querySelectorAll(".js-typeahead");
    var nodesArray = [].slice.call(searchElements);
    nodesArray.forEach(function (searchElement) {
        const groupsBtn = searchElement.querySelector(".js-typeahead-groups-btn"),
            groupsContent = searchElement.querySelector(".js-typeahead-groups-content"),
            searchField = searchElement.querySelector(".js-typeahead-search-field"),
            searchContent = searchElement.querySelector(".js-typeahead-search-content"),
            secondSearchContent = searchElement.querySelector(".js-typeahead-additional-search-content"),
            enterBtn = searchElement.querySelector(".js-typeahead-enter-btn"),
            options = {
                pageSize: searchElement.getAttribute("data-page-size"),
                searchParameterName: searchElement.getAttribute("data-search-parameter-name") || "Search",
                searchFeedId: searchElement.getAttribute("data-search-feed-id"),
                searchSecondFeedId: searchElement.getAttribute("data-search-second-feed-id"),
                listId: searchElement.getAttribute("data-list-id"),
                resultPageId: searchElement.getAttribute("data-result-page-id"),
                searchType: searchElement.getAttribute("data-search-type") || "product-search",
                groupsPageId: searchElement.getAttribute("data-groups-page-id"),
                searchTemplate: searchContent.getAttribute("data-template"),
                saveSelectedResult: searchContent.getAttribute("data-save-selected-result"),
                addFirstResultOnEnter: searchElement.getAttribute("data-add-first-on-enter"),
                livePrice: searchElement.getAttribute("data-live-price") || "false"
            };
        var selectionPosition = -1;
        var listSelectionPosition = 0;

        if (groupsBtn) {
            groupsBtn.onclick = function () {
                HandlebarsBolt.UpdateContent(groupsContent.getAttribute("id"), '/Default.aspx?ID=' + options.groupsPageId + '&feedType=' + 'productGroups' + '&redirect=false');
            }
        }

        searchField.onkeyup = debounce(function () {
            var query = searchField.value;
            selectionPosition = -1
            listSelectionPosition = 0;

            if (groupsBtn && groupsBtn.getAttribute("data-group-id") != "all" && groupsBtn.getAttribute("data-group-id") != "") {
                query += "&GroupID=" + groupsBtn.getAttribute("data-group-id");
            }

            if (query.length > 0) {
                updateContent(
                    searchContent.getAttribute("id"),
                    query,
                    options.searchFeedId,
                    (options.searchType == "combined-search" ? "product-search" : options.searchType),
                    options.searchType == "combined-search"
                );
                if (options.searchSecondFeedId) {
                    updateContent(secondSearchContent.getAttribute("id"), query, options.searchSecondFeedId, "content-search", true);
                }
                document.getElementsByTagName('body')[0].addEventListener('keydown', keyPress, false);
            } else {
                HandlebarsBolt.CleanContainer(searchContent.getAttribute("id"));
                if (options.searchSecondFeedId) {
                    HandlebarsBolt.CleanContainer(secondSearchContent.getAttribute("id"));
                }
            }
        }, 500);

        function updateContent(id, query, feedId, searchType, combinedFlag) {
            HandlebarsBolt.UpdateContent(
                id,
                '/Default.aspx?ID=' + feedId +
                '&pagesize=' + options.pageSize +
                '&' + options.searchParameterName + '=' + query +
                (searchType == "product-search" ?
                    '&feedType=productsOnly' +
                    '&redirect=false' +
                    '&DoNotShowVariantsAsSingleProducts=True' : '') +
                (combinedFlag ?
                    '&searchType=combined' : '') +
                (options.listId ? '&ListID=' + options.listId : '') +
                (options.searchTemplate ? '&Template=' + options.searchTemplate : ''));
        }

        function clickedOutside(e) {
            if (searchContent.contains(e.target)) {
                document.getElementsByTagName('body')[0].removeEventListener('keydown', keyPress, false);
                return;
            }

            if (e.target != searchField && !e.target.classList.contains("js-ignore-click-outside")) {
                HandlebarsBolt.CleanContainer(searchContent.getAttribute("id"));
                if (options.searchSecondFeedId) {
                    HandlebarsBolt.CleanContainer(secondSearchContent.getAttribute("id"));
                }
            }

            if (groupsBtn && e.target != groupsBtn && !groupsContent.contains(e.target)) {
                HandlebarsBolt.CleanContainer(groupsContent.getAttribute("id"));
            }

            document.getElementsByTagName('body')[0].removeEventListener('keydown', keyPress, false);
        }

        function keyPress(e) {
            const KEY_CODE = {
                LEFT: 37,
                TOP: 38,
                RIGHT: 39,
                BOTTOM: 40,
                ENTER: 13
            };

            var searchContainer = searchContent;
            var secondSearchContainer;

            if (options.searchType == "combined-search") {
                searchContainer = searchContent.querySelector("ul");
                secondSearchContainer = secondSearchContent.querySelector("ul");

                if (!searchContainer || !secondSearchContainer) {
                    return;
                }
            }

            var lists = [searchContainer, secondSearchContainer];

            if ([KEY_CODE.LEFT, KEY_CODE.TOP, KEY_CODE.RIGHT, KEY_CODE.BOTTOM].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }

            if (options.searchType == "combined-search" && e.keyCode == KEY_CODE.RIGHT && selectionPosition > -1 && listSelectionPosition == 0) {
                listSelectionPosition = 1;
                selectionPosition = 0;
            }

            if (options.searchType == "combined-search" && e.keyCode == KEY_CODE.LEFT && selectionPosition > -1 && listSelectionPosition == 1) {
                listSelectionPosition = 0;
                selectionPosition = 0;
            }

            if (e.keyCode == KEY_CODE.BOTTOM && selectionPosition < lists[listSelectionPosition].childElementCount - 1) {
                selectionPosition++;
                searchField.blur();
            }

            if (e.keyCode == KEY_CODE.TOP && selectionPosition > 0) {
                selectionPosition--;
                searchField.blur();
            }

            if (lists[listSelectionPosition].childElementCount <= 0) {
                return;
            }

            var selectedElement = lists[listSelectionPosition].children[selectionPosition];

            if (e.keyCode == KEY_CODE.TOP || e.keyCode == KEY_CODE.BOTTOM) {
                var previousSelectedElement = lists[listSelectionPosition].querySelector("li.active");
                selectElement(previousSelectedElement, selectedElement);
            }

            if (options.searchType == "combined-search" && (e.keyCode == KEY_CODE.LEFT || e.keyCode == KEY_CODE.RIGHT) && selectedElement) {
                var previousSelectedElement = lists[!listSelectionPosition - 0].querySelector(".dropdown__item.active"); //!listSelectionPosition - 0 => 1 if 0, 0 if 1
                selectElement(previousSelectedElement, selectedElement);
            }

            if (e.keyCode == KEY_CODE.ENTER) {
                if (selectedElement) {
                    document.getElementsByTagName('body')[0].removeEventListener('keydown', keyPress, false);
                    if (selectedElement.onclick) {
                        selectedElement.onclick();
                    }
                    getLinkBySelection(selectedElement);
                } else {
                    let resultItems = lists[listSelectionPosition].querySelectorAll("li:not(.js-no-result):not(.dropdown__item--not-selectable)");
                    let isHereOnlyOneResult = resultItems.length == 1;
                    if (options.addFirstResultOnEnter || isHereOnlyOneResult) {
                        let firstItem = resultItems[0];
                        if (firstItem.onclick) {
                            firstItem.onclick();
                        } else {
                            getLinkBySelection(lists[listSelectionPosition].children[0])
                        }
                    } else {
                        showSearchResults();
                    }
                }
            }
        }

        function selectElement(previousSelectedElement, selectedElement) {
            if (selectedElement.tagName != "LI" || selectedElement.classList.contains('js-no-result')) {
                return;
            }
            var productInfo = selectedElement.dataset.productInfo;

            if (productInfo != null) {
                Search.UpdateFieldValue(selectedElement, JSON.parse(productInfo), false);
            }

            if (previousSelectedElement) {
                previousSelectedElement.classList.remove("active");
            }

            if (selectedElement) {
                selectedElement.classList.add("active");
                if (selectedElement.querySelector(".js-typeahead-name")) {
                    searchField.value = selectedElement.querySelector(".js-typeahead-name").innerText;
                }
                if (options.saveSelectedResult && selectedElement.querySelector(".js-typeahead-result")) {
                    searchField.setAttribute("data-result", selectedElement.querySelector(".js-typeahead-result").innerText);
                }
            }
        }

        function getLinkBySelection(selectedElement) {
            var jslink = selectedElement.querySelector(".js-typeahead-link");
            if (jslink) {
                if (jslink.onclick) {
                    jslink.onclick();
                }
                window.location.href = jslink.getAttribute("href");
            }
        }

        function showSearchResults() {
            if (options.resultPageId) {
                window.location.href = '/Default.aspx?ID=' + options.resultPageId +
                    '&Search=' + searchField.value +
                    (options.listId ? '&ListID=' + options.listId : '');
            }
        }

        if (enterBtn) {
            enterBtn.onclick = showSearchResults;
        }

        document.getElementsByTagName('body')[0].addEventListener('click', clickedOutside, true);
    });
}

Search.prototype.UpdateGroupSelection = function (selectedElement) {
    let groupsContent = selectedElement.parentNode,
        groupsBtn = groupsContent.parentNode.querySelector(".js-typeahead-groups-btn");

    groupsBtn.setAttribute("data-group-id", selectedElement.getAttribute("data-group-id"));
    groupsBtn.innerHTML = selectedElement.innerText;

    HandlebarsBolt.CleanContainer(groupsContent.getAttribute("id"));
}

Search.prototype.UpdateFieldValue = function (selectedElement, productInfo, hideSearchResults, actionBtnId) {
    hideSearchResults = hideSearchResults != null ? hideSearchResults : true;
    if (selectedElement == null) {
        return;
    }

    let searchContent = selectedElement.parentNode;
    let searchField = searchContent.parentNode.querySelector(".js-typeahead-search-field");

    if (selectedElement.querySelector(".js-typeahead-name")) {
        searchField.value = selectedElement.querySelector(".js-typeahead-name").innerText;
    }
    if (selectedElement.querySelector(".js-typeahead-result")) {
        searchField.setAttribute("data-result", selectedElement.querySelector(".js-typeahead-result").innerText);
    }
    if (typeof (productInfo) != "undefined") {
        //for express search
        searchField.setAttribute("data-product-info", JSON.stringify(productInfo));
        let actionBtn = document.getElementById(actionBtnId);
        if (actionBtn) {
            actionBtn.disabled = false;
            actionBtn.classList.remove("disabled");
        }
    }

    if (hideSearchResults) {
        HandlebarsBolt.CleanContainer(searchContent.getAttribute("id"));
    }
}

Search.prototype.ResetExpressSearch = function () {
    let searchField = document.getElementById("ExpressBuyProductSearchField");
    let quantityField = document.getElementById("ExpressBuyProductCount");
    let buyButton = document.getElementById("ExpressBuyProductButton");

    if (searchField && quantityField) {
        searchField.value = "";
        searchField.removeAttribute("data-result");
        searchField.removeAttribute("data-product-info");
        quantityField.value = "1";
        searchField.focus();
    }

    setTimeout(function () {
        buyButton.disabled = true;
    }, 1000);
}

var miniSearchTimeOut;

Search.prototype.ShowMiniSearch = function (trigger) {
    clearTimeout(miniSearchTimeOut);
    trigger.classList.add('is-dropdown--active');
    trigger.classList.add('menu__item--active');
    document.getElementById('headerSearch').focus();
    trigger.onmouseleave = function () {
        miniSearchTimeOut = setTimeout(function () {
            trigger.classList.remove('is-dropdown--active');
            trigger.classList.remove('menu__item--active');
        }, 1000);
    };
}

var Search = new Search();

document.addEventListener("DOMContentLoaded", Search.Init);
function openTab(tabBlockId, tabTrigger) {
    var block = document.getElementById(tabBlockId);
    tabsName = block.getAttribute("data-tabs");
    document.querySelectorAll(".js-tab__trigger[data-tabs=" + tabsName + "]").forEach(function(trigger) {
        trigger.classList.remove("tab__trigger--active");
    });
    document.querySelectorAll(".js-tab__block[data-tabs=" + tabsName + "]").forEach(function (tab) {
        tab.classList.remove("tab__block--active");
    });
    tabTrigger.classList.add("tab__trigger--active");
    block.classList.add("tab__block--active");
}
//This code based on instructions from https://developers.google.com/youtube/iframe_api_reference

document.addEventListener("DOMContentLoaded", function () {
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.

});

function onYouTubeIframeAPIReady() {
    document.querySelectorAll('.js-youtube-video').forEach(function (el) {
        var videoId = el.getAttribute('data-video');
        var elId = el.getAttribute('id');
        var autoPlay = el.getAttribute('data-auto-play') != null ? el.getAttribute('data-auto-play') : 1;
        var controls = el.getAttribute('data-enable-controls') != null ? el.getAttribute('data-enable-controls') : 0;
        var mute = autoPlay = 1 ? 1 : 0;


        player = new YT.Player(elId, {
            videoId: videoId,
            playerVars: {
                autoplay: 0,
                controls: controls,
                loop: 1,
                playlist: videoId,
                playsinline: 1,
                showinfo: 0,
                disablekb: 1,
                modestbranding: 1,
                mute: mute,
                rel: 0
            },
            events: {
                'onReady': onPlayerReady,
                'onError': onError
            }
        });
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

function onError(event) {
    event.target.a.style.display = "none";
}
var Wireframe = function () { }

var wireframeConfig = {
    cssFilesToRemove: ["rapidoCss", "igniteCss"],
    hasTemplateEngine: true,
    paragraphContainerClass: "paragraph-container",
    backgroundImageContainers: ["paragraph-container", "multiple-paragraphs-container", "layered-image", "center-container--with-background-image", "background-image", "carousel__slide"],
    mediaContainers: ["google-map", "map-container", "video-wrapper", "video-background__container", "dynamicweb-map__wrap"],
    hiddenClass: "u-hidden",
    visuallyHiddenClass: "u-visually-hidden",
    wireImageClass: "wire-image",
    wireBackgroundImageClass: "wire-image-lines",
    wireGrayscaleClass: "wire-grayscale",
    lightBoxImageClass: "lightbox__image",
    elementsWithColorClasses: ["u-color-warning"],
    replacementColorClass: "u-color-light-gray",
    elementsWithBackgroundColorClasses: ["u-color-warning--bg", "receipt__header"],
    replacementBackgroundColorClass: "u-color-light-gray--bg"
};

Wireframe.prototype.GetConfiguration = function () {
    if (typeof WireframeConfig == 'object') {
        wireframeConfig = WireframeConfig.Configuration();
    }
}

var _wireframeMode = false;

Wireframe.prototype.Init = function (wireframeMode) {
    _wireframeMode = wireframeMode;

    if (!wireframeMode) {
        return;
    }

    document.body.classList.add(wireframeConfig.hiddenClass);

    //Render as Wireframe
    document.addEventListener("DOMContentLoaded", function (event) {
        Wireframe.GetConfiguration();

        Wireframe.WireImages();

        for (var i = 0; i < wireframeConfig.cssFilesToRemove.length; i++) {
            document.getElementById(wireframeConfig.cssFilesToRemove[i]).setAttribute("href", "");
        }
        document.body.classList.remove(wireframeConfig.hiddenClass);
    });

    document.addEventListener('contentLoaded', function (event) {
        Wireframe.WireImages();
    });

    document.addEventListener('addToCart', function (event) {
        Wireframe.WireImages();
    });

    document.addEventListener('showLastAddedProduct', function (event) {
        Wireframe.WireImages();
    });

    if (wireframeConfig.hasTemplateEngine) {
        var ajaxContainer = document.getElementsByClassName("js-handlebars-root");
        for (var i = 0; i < ajaxContainer.length; i++) {
            ajaxContainer[i].addEventListener('contentLoaded', function (e) {
                Wireframe.WireImages();
            }, false);
        }

        document.addEventListener('updateTemplate', function (e) {
            Wireframe.WireImages();
        }, false);
    }

    var event = new CustomEvent('wireframeInit');
    document.dispatchEvent(event);

}

//Render all images as 'abstract' symbolized images
Wireframe.prototype.WireImages = function () {
    if (!_wireframeMode) {
        return;
    }

    var imgElements = document.getElementsByTagName("IMG");

    for (var i = 0; i < imgElements.length; i++) {
        var imageElement = imgElements[i];

        if (!imageElement.classList.contains(wireframeConfig.hiddenClass) && !imageElement.classList.contains(wireframeConfig.lightBoxImageClass)) {
            var imageWireframe = document.createElement("DIV");
            imageWireframe.classList.add(wireframeConfig.wireImageClass);
            imageElement.parentElement.insertBefore(imageWireframe, imageElement.parentNode.firstChild);
        }

        if (imageElement.classList.contains(wireframeConfig.lightBoxImageClass)) {
            imageElement.classList.add(wireframeConfig.visuallyHiddenClass);
        }

        imageElement.classList.add(wireframeConfig.hiddenClass);
        imageElement.classList.remove("b-lazy");
    }

    for (var i = 0; i < wireframeConfig.backgroundImageContainers.length; i++) {
        var imgBgElements = document.getElementsByClassName(wireframeConfig.backgroundImageContainers[i]);

        for (var elm = 0; elm < imgBgElements.length; elm++) {
            var imgBgElement = imgBgElements[elm];

            if (imgBgElement.style.backgroundImage != "") {
                imgBgElement.setAttribute("style", "");
                imgBgElement.classList.add(wireframeConfig.wireBackgroundImageClass);
            }
        }
    }

    var imgBgElements = document.getElementsByClassName(wireframeConfig.paragraphContainerClass);

    for (var i = 0; i < imgBgElements.length; i++) {
        var imgBgElement = imgBgElements[i];

        if (imgBgElement.getAttribute("style") != "") {
            imgBgElement.setAttribute("style", "");
            imgBgElement.classList.add(wireframeConfig.wireBackgroundImageClass);
        }
    }

    for (var i = 0; i < wireframeConfig.mediaContainers.length; i++) {
        var mediaElement = document.getElementsByClassName(wireframeConfig.mediaContainers[i]);

        for (var elm = 0; elm < mediaElement.length; elm++) {
            mediaElement[elm].classList.add(wireframeConfig.wireGrayscaleClass);
        }
    }

    for (var i = 0; i < wireframeConfig.elementsWithColorClasses.length; i++) {
        var colorElement = document.querySelectorAll("." + wireframeConfig.elementsWithColorClasses[i]);
        var colorClass = wireframeConfig.elementsWithColorClasses[i];

        for (var elm = 0; elm < colorElement.length; elm++) {
            var warningElement = colorElement[elm];

            warningElement.classList.remove(colorClass);
            warningElement.classList.add(wireframeConfig.replacementColorClass);
        }
    }

    for (var i = 0; i < wireframeConfig.elementsWithBackgroundColorClasses.length; i++) {
        var colorElement = document.querySelectorAll("." + wireframeConfig.elementsWithBackgroundColorClasses[i]);
        var colorClass = wireframeConfig.elementsWithBackgroundColorClasses[i];

        for (var elm = 0; elm < colorElement.length; elm++) {
            var warningElement = colorElement[elm];

            console.log(elm); //??

            warningElement.classList.remove(colorClass);
            warningElement.classList.add(wireframeConfig.replacementBackgroundColorClass);
        }
    }

    var responsiveImages = document.getElementsByClassName("responsive-image");

    for (var i = 0; i < responsiveImages.length; i++) {
        responsiveImages[i].classList.remove("responsive-image--1-1");
        responsiveImages[i].classList.remove("responsive-image--16-9");
        responsiveImages[i].classList.remove("responsive-image--4-3");
    }
}

var Wireframe = new Wireframe();
var WireframeConfig = function () { }

WireframeConfig.prototype.Configuration = function () {
    var wireframeConfigObject = {
        cssFilesToRemove: ["rapidoCss", "igniteCss"],
        hasTemplateEngine: true,
        backgroundImageContainers: ["paragraph-container", "multiple-paragraphs-container", "layered-image", "center-container--with-background-image", "background-image", "carousel__slide"],
        mediaContainers: ["google-map", "map-container", "video-wrapper", "video-background__container", "dynamicweb-map__wrap"],
        hiddenClass: "u-hidden",
        visuallyHiddenClass: "u-visually-hidden",
        wireImageClass: "wire-image",
        wireBackgroundImageClass: "wire-image-lines",
        wireGrayscaleClass: "wire-grayscale",
        lightBoxImageClass: "lightbox__image",
        elementsWithColorClasses: ["u-color-warning"],
        replacementColorClass: "u-color-light-gray",
        elementsWithBackgroundColorClasses: ["u-color-warning--bg", "receipt__header"],
        replacementBackgroundColorClass: "u-color-light-gray--bg"
    };

  return wireframeConfigObject;
}

var WireframeConfig = new WireframeConfig();