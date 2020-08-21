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