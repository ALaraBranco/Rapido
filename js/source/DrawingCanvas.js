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