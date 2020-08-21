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