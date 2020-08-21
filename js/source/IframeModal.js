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