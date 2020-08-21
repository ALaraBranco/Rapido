var QuotesCart = function () { }

QuotesCart.prototype.InitQuotesCart = function () {
    //why init for only first?
    this.cartId = window.cartId;

    //why init for only first?
    var miniCart = document.getElementsByClassName('js-mini-cart')[0];

    this.cartId = miniCart ? miniCart.getAttribute('data-cart-id') : window.cartId;
    this.showType = miniCart ? (miniCart.getAttribute('data-show-type') || "dropdown") : "none";
    this.miniCartId = miniCart ? miniCart.id : null;
    this.cartLink = miniCart ? miniCart.getAttribute('data-cart-page-link') : null;

    window.onscroll = function () { Cart.toggleFloatingVisibility() };
}
document.addEventListener("DOMContentLoaded", function (event) {
    QuotesCart.InitQuotesCart();
});

QuotesCart.prototype.AddToQuotesCart = function () {
    var args = Array.prototype.slice.call(arguments);

    if (arguments.length === 2) {
        this.AddToQuotesCartByObject.apply(this, args);
    } else {
        this.AddToQuotesCartByProperties.apply(this, args);
    }
}

QuotesCart.prototype.AddToQuotesCartByProperties = function (e, productId, quantity, unitElement, variantElement, buyForPoints) {
    e.preventDefault();
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
    this.AddToQuotesCartByObject(e, cartItem);
}
var updateDelay;

QuotesCart.prototype.ChangeQuantity = function (cartOrderlinesFeedPageId, orderLineId, quantity, stock, orderContextId) {
    let self = this;
    quantity = StockValidation.prototype.ValidateStock(null, quantity, stock);
    let comment = document.getElementById('EcomOrderCustomerComment');
    let accept = document.getElementById('EcomOrderCustomerAccepted');
    let customerComment = comment ? '&EcomOrderCustomerComment=' + comment.value : "";
    let customerAccepted = accept ? ('&EcomOrderCustomerAccepted=' + (accept.checked ? true : '')) : "";
    clearTimeout(updateDelay);
    updateDelay = setTimeout(function () {
        self.UpdateQuotesCart(null,
            '/Default.aspx?ID=' + cartOrderlinesFeedPageId,
            '&OrderContext=' + orderContextId + '&CartCmd=UpdateOrderlines&QuantityOrderLine' + orderLineId + '=' + quantity + customerComment + customerAccepted + '&redirect=false',
            true);
    }, 800);
}

QuotesCart.prototype.AddToQuotesCartByObject = function (e, cartItem) {
    e.preventDefault();
    //quotes here

    var quantity = StockValidation.prototype.ValidateStock(cartItem);
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
    url += "&Quantity=" + quantity;
    url += "&redirect=false";
    url += "&OrderContext="+cartItem.OrderContext;
    url += "&getproductinfo=true"; // force LiveIntegration to get product live price from ERP if lazy load is active in settings. When inactive, the Live Integration call is not triggered.
    url += "&ProductID=" + cartItem.id;
    if (cartItem.unitId) {
        url += "&UnitID=" + cartItem.unitId;
    }
    if (cartItem.variantId) {
        url += "&VariantID=" + cartItem.variantId;
    }

    this.UpdateQuotesCart('miniCart', url, cartItem.buyForPoints ? "cartcmd=addWithPoints" : "cartcmd=add", false, cartItem);
}

QuotesCart.prototype.UpdateQuotesCart = function (containerId, url, command, preloader, cartItem) {
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
    
    var queryParams = new QueryArray(url);
    queryParams.combineWithParams(command);
    Request.Fetch().get(queryParams.getFullUrl(), updateSuccess, updateFailed);

    function updateSuccess(data) {
        if (preloader) {
            var overlayNode = document.getElementById('CartOverlay');
            overlayNode.parentNode.removeChild(overlayNode);
        }
        if (cartItem != null) {
            //add
            var event = new CustomEvent('AddToQuotesCart', { 'detail': cartItem });
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
var QuotesCart = new QuotesCart();
