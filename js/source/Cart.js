var Cart = function () { }

Cart.prototype.InitMiniCart = function () {
    //why init for only first?
    var miniCart = document.getElementsByClassName('js-mini-cart')[0];

    this.cartId = miniCart ? miniCart.getAttribute('data-cart-id') : window.cartId;
    this.showType = miniCart ? (miniCart.getAttribute('data-show-type') || "dropdown") : "none";
    this.miniCartId = miniCart ? miniCart.id : null;
    this.cartLink = miniCart ? miniCart.getAttribute('data-cart-page-link') : null;

    window.onscroll = function () { Cart.toggleFloatingVisibility() };
}

document.addEventListener("DOMContentLoaded", function (event) {
    Cart.InitMiniCart();
});

Cart.prototype.toggleFloatingVisibility = function (e) {
    if (document.getElementById("FloatingMiniCart")) {
        var topHeight = document.getElementById("Top").clientHeight;
        var floatingMiniCart = document.getElementById("FloatingMiniCart");

        if (document.body.scrollTop > topHeight || document.documentElement.scrollTop > topHeight) {
            floatingMiniCart.classList.remove("u-hidden");
        } else {
            floatingMiniCart.classList.add("u-hidden");
        }
    }
}

Cart.prototype.EmptyCart = function(e) {
    e.preventDefault();

    var url = "/Default.aspx?ID=" + this.cartId;
    Cart.UpdateCart('miniCart', url, "cartcmd=emptycart&redirect=false", true);
    var event = new CustomEvent('emptyCart');
    document.dispatchEvent(event);
}

Cart.prototype.AddToCart = function () {
    var args = Array.prototype.slice.call(arguments);

    if (arguments.length === 2) {
        this.AddToCartByObject.apply(this, args);
    } else {
        this.AddToCartByProperties.apply(this, args);
    }
}

Cart.prototype.AddToCartByProperties = function (e, productId, quantity, unitElement, variantElement, buyForPoints) {
    var cartItem = {
        id: productId
    };
    if (unitElement && document.getElementById(unitElement)) {
        cartItem.unitId = document.getElementById(unitElement).value;
    }
    if (variantElement && document.getElementById(variantElement)) {
        cartItem.variantId = document.getElementById(variantElement).value;
    }
    if (buyForPoints) {
        cartItem.buyForPoints = buyForPoints;
    }
    if (quantity) {
        cartItem.quantity = quantity;
    }
    this.AddToCartByObject(e, cartItem);
}

Cart.prototype.AddToCartByObject = function (e, cartItem) {
    e.preventDefault();
    if (cartItem.quantity <= 0) {
        return;
    }

    var clickedButton = e.currentTarget;
    var clickedButtonText = clickedButton.innerHTML;
    var clickedButtonWidth = clickedButton.offsetWidth;
    var clickedButtonStyleWidth = clickedButton.style.width;

    clickedButton.classList.add("disabled");
    clickedButton.disabled = true;
    clickedButton.innerHTML = "<i class=\"fas fa-circle-notch fa-spin\"></i>";
    clickedButton.style.width = clickedButtonWidth + "px";

    setTimeout(function () {
        clickedButton.classList.remove("disabled");
        clickedButton.disabled = false;
        clickedButton.innerHTML = clickedButtonText;
        clickedButton.style.width = clickedButtonStyleWidth;
    }, 1000);

    var url = "/Default.aspx?ID=" + this.cartId;
    url += "&Quantity=" + cartItem.quantity;
    url += "&redirect=false";
    url += "&getproductinfo=true"; // force LiveIntegration to get product live price from ERP if lazy load is active in settings. When inactive, the Live Integration call is not triggered.
    url += "&ProductID=" + cartItem.id;
    if (cartItem.unitId) {
        url += "&UnitID=" + cartItem.unitId;
    }
    if (cartItem.variantId) {
        url += "&VariantID=" + cartItem.variantId;
    }

    this.UpdateCart('miniCart', url, cartItem.buyForPoints ? "cartcmd=addWithPoints" : "cartcmd=add", false, cartItem);
}

Cart.prototype.UpdateCart = function (containerId, url, command, preloader, cartItem) {
    const self = this;

    if (preloader) {
        var overlayElement = document.createElement('div');
        overlayElement.className = "preloader-overlay";
        overlayElement.setAttribute('id', "CartOverlay");
        var overlayElementIcon = document.createElement('div');
        overlayElementIcon.className = "preloader-overlay__icon dw-mod";
        overlayElementIcon.style.top = window.pageYOffset + "px";
        overlayElement.appendChild(overlayElementIcon);

        document.getElementById('content').parentNode.insertBefore(overlayElement, document.getElementById('content'));
    }

    var miniCartButtons = document.getElementsByClassName("js-mini-cart-button");
    for (var i = 0; i < miniCartButtons.length; i++) {
        var cartButton = document.getElementsByClassName("js-mini-cart-button")[i];
        cartButton.classList.add("mini-cart-update");
    }

    var queryParams = new QueryArray(url);
    queryParams.combineWithParams(command);
    queryParams.setValue("feedtype", "Counter");

    Request.Fetch().get(queryParams.getFullUrl(), updateSuccess, updateFailed);

    function updateSuccess(data) {
        if (preloader) {
            var overlayNode = document.getElementById('CartOverlay');
            overlayNode.parentNode.removeChild(overlayNode);
        }

        if (document.getElementById(containerId) && containerId != "miniCart") {
            HandlebarsBolt.UpdateContent(containerId, url);
        }

        var miniCartCounters = document.getElementsByClassName("js-mini-cart-counter");

        for (var i = 0; i < miniCartCounters.length; i++) {
            var cartCounter = miniCartCounters[i];

            if (cartCounter) {
                cartCounter.innerHTML = "";
                var miniCartButtons = document.getElementsByClassName("js-mini-cart-button");
                for (var i = 0; i < miniCartButtons.length; i++) {
                    var cartButton = document.getElementsByClassName("js-mini-cart-button")[i];
                    cartButton.classList.remove("mini-cart-update");
                }

                HandlebarsBolt.CreateItemsFromJson(data, cartCounter.getAttribute("id"));
            }
        }

        if (self.miniCartId) {
            let isMiniCartVisible = self.IsMiniCartVisible(self.miniCartId);

            if (data[0].numberofproducts == 0) {
                if (isMiniCartVisible) {
                    if (self.showType == "dropdown" && document.getElementById(containerId)) {
                        document.getElementById(containerId).style.display = "none";
                    } else {
                        let trigger = document.getElementById("miniCartTrigger");
                        if (trigger) {
                            trigger.checked = false
                            trigger.classList.remove('js-active');
                        }
                    }
                }
            } else if (isMiniCartVisible) {
                self.UpdateMiniCartContainer(self.miniCartId, url);
            }
        }

        if (cartItem != null) {
            //add
            var event = new CustomEvent('addToCart', { 'detail': cartItem });
            document.dispatchEvent(event);
        }

        var event = new CustomEvent('cartUpdated', { 'detail': { "command": command, "containerId": containerId, "url": url, "preloader": preloader, "data": data } });
        document.dispatchEvent(event);
    }

    function updateFailed(data) {
        location.reload();

        var event = new CustomEvent('cartUpdated', { 'detail': { "command": command, "containerId": containerId, "url": url, "preloader": preloader, "data": data } });
        document.dispatchEvent(event);
    }
}

var hideTimeOut;
Cart.prototype.HideMiniCart = function (containerId, triggerId) {
    const self = this;
    let trigger = document.getElementById(triggerId);
    hideTimeOut = setTimeout(function () {
        if (self.showType == "dropdown" && document.getElementById(containerId)) {
            document.getElementById(containerId).style.display = "none";
        } else if (trigger) {
            trigger.checked = false;
        }
        if (trigger) {
            trigger.classList.remove('js-active');
        }
    }, self.showType == "dropdown" ? 1000 : 2000);
}

Cart.prototype.ShowMiniCart = function (containerId, triggerId) {
    var trigger = document.getElementById(triggerId);
    const self = this;
    if (this.showType == "dropdown") {
        document.getElementById(containerId).style.display = "block";
        if (trigger) {
            trigger.onmouseleave = function (e) {
                clearTimeout(hideTimeOut);
                self.HideMiniCart(containerId, triggerId);
            };
        }
    } else {
        trigger.checked = true;
    }
}

Cart.prototype.UpdateMiniCartContainer = function (containerId, url) {
    const container = document.getElementById(containerId);
    if (container.classList.contains('js-handlebars-root')) {
        HandlebarsBolt.UpdateContent(containerId, url);
    } else {
        HandlebarsBolt.UpdateContent(container.querySelector('.js-handlebars-root').id, url);
    }
}

Cart.prototype.IsMiniCartVisible = function (containerId) {
    const container = document.getElementById(containerId);
    if (this.showType == "dropdown") {
        return container.offsetWidth > 0 && container.offsetHeight > 0;
    } else if (this.showType != "none") {
        return container.previousElementSibling.checked;
    }
}

Cart.prototype.UpdateMiniCart = function (triggerId, containerId, counterId, url) {
    let trigger = document.getElementById(triggerId);
    let cartIsEmpty = parseInt(document.querySelector('#' + counterId + ' .js-mini-cart-counter-content').getAttribute("data-count")) == 0;

    if (this.showType == "dropdown" && trigger && trigger.classList.contains('js-active')) {
        clearTimeout(hideTimeOut);
        return;
    }

    if (!cartIsEmpty) {
        this.UpdateMiniCartContainer(containerId, url);
    } else if (this.showType != "dropdown") {
        location.href = this.cartLink;
    }

    if (!cartIsEmpty) {
        this.ShowMiniCart(containerId, triggerId);
        if (this.showType == "dropdown" && trigger) {
            trigger.classList.add('js-active');
        }
    }
}

Cart.prototype.EnableCheckoutButton = function () {
    var stepButtonId = document.getElementById("CartV2.GotoStep3") ? "CartV2.GotoStep3" : "CartV2.GotoStep1";
    var stepButton = document.getElementById(stepButtonId);

    if (document.getElementById("EcomOrderCustomerAccepted").checked) {
        stepButton.disabled = false;
        stepButton.classList.remove('disabled');
    } else {
        stepButton.disabled = true;
        stepButton.classList.add('disabled');
    }
}

Cart.prototype.DeselectRadioGroup = function (radioGroupName) {
    var radioList = document.getElementsByName(radioGroupName);
    for (var i = 0; i < radioList.length; i++) {
        if (radioList[i].checked) radioList[i].checked = false;
    }
}

Cart.prototype.SubmitCart = function () {
    document.getElementById('OrderSubmit').submit();
}

Cart.prototype.SelectParcelShop = function (locationData) {
    document.getElementById(locationData.fieldPrefix + "ParcelShopNumber_" + locationData.number).checked = true;
}

Cart.prototype.BuyForPoints = function (pageId, cartOrderlinesFeedPageId, orderLineId, productID, variantID) {
    let self = this;
    Request.Fetch().post('/Default.aspx?ID=' + pageId + '&ProductID=' + productID + '&VariantID=' + variantID + '&CartCmd=addWithPoints&redirect=false', null, updateSuccess, null, false);
    function updateSuccess() {
        self.UpdateCart(null, '/Default.aspx?ID=' + cartOrderlinesFeedPageId, 'CartCmd=decorderline&key=' + orderLineId + '&redirect=false', true);
    }
}

var updateDelay;
Cart.prototype.ChangeQuantity = function (cartOrderlinesFeedPageId, orderLineId, quantity) {
    let self = this;
    quantity = '&QuantityOrderLine' + orderLineId + '=' + quantity;
    let comment = document.getElementById('EcomOrderCustomerComment');
    let accept = document.getElementById('EcomOrderCustomerAccepted');
    let customerComment = comment ? '&EcomOrderCustomerComment=' + comment.value : "";
    let customerAccepted = accept ? ('&EcomOrderCustomerAccepted=' + (accept.checked ? true : '')) : "";

    clearTimeout(updateDelay);
    updateDelay = setTimeout(function () {
        self.UpdateCart(null,
            '/Default.aspx?ID=' + cartOrderlinesFeedPageId,
            '&CartCmd=UpdateOrderlines' + quantity + customerComment + customerAccepted + '&redirect=false',
            true);
    }, 800);
}

Cart.prototype.ShowLastAddedProductModal = function (lastAddedProduct) {
    if (document.getElementById('LastAddedProductModal')) {
        if (lastAddedProduct.productInfo && lastAddedProduct.productInfo.image) {
            lastAddedProduct.productInfo.image = "/Admin/Public/GetImage.ashx?width=70&height=70&crop=5&Compression=75&image=" + lastAddedProduct.productInfo.image;
        }
        HandlebarsBolt.CreateItemsFromJson(lastAddedProduct, 'LastAddedProductModal');
        document.getElementById('LastAddedProductModalTrigger').checked = true;
        var event = new CustomEvent('showLastAddedProduct');
        document.dispatchEvent(event);
    }
}

Cart.prototype.ToggleMiniCart = function (triggerId, containerId, counterId, miniCartFeedPageId) {
    this.UpdateMiniCart(triggerId, containerId, counterId, '/Default.aspx?ID=' + miniCartFeedPageId + '&feedType=MiniCart');
    this.HideMiniCart(containerId, triggerId);
}

var Cart = new Cart();