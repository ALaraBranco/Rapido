var StockValidation = function () { };

StockValidation.prototype.ValidateStock = function(cartItem, quantity, stock) {
    stock = cartItem != null ? parseInt(cartItem.productInfo.stock) - parseInt(cartItem.productInfo.quantityInCart) : parseInt(stock);
    quantity = cartItem != null ? parseInt(cartItem.quantity) : parseInt(quantity);

    if(cartItem != null) {
        Request.Fetch().get('/Default.aspx?ID=' + cartItem.productInfo.cartPageId, getCartDataSuccess, null, true);

        function getCartDataSuccess(response) {
            var orderLines = response[0].OrderLines.length === 0 ? response[0].OrderLinesOutOfStock : response[0].OrderLines;
            if (orderLines.length !== 0) {
                for (var i = 0; i < orderLines.length; i++) {
                    var orderLine = orderLines[i];
                    if (orderLine.id === cartItem.id && (orderLine.unitname === cartItem.productInfo.unitName || cartItem.productInfo.unitName == null) && orderLine.variantId === cartItem.variantId) {
                        StockValidation.prototype.DisableAddToCartButton(cartItem.id, cartItem.productInfo.productId, cartItem.unitId, orderLine.quantity + quantity, stock);
                        return;
                    }
                }
            }
            StockValidation.prototype.DisableAddToCartButton(cartItem.id, cartItem.productInfo.productId, cartItem.unitId, quantity, stock);            
        }
    }

    if (stock < quantity) {
        if (stock <= 0) {
            return 0;
        }
        return stock;
    }
    return quantity;
};

StockValidation.prototype.DisableAddToCartButton = function(productId, productOrder, unitId, quantity, stock) {
    productId = productOrder != null ? productOrder : unitId !== "" ? unitId : productId;
    var button = document.getElementById("CartButton_" + productId);
    if (button != null && quantity >= stock) {
        setTimeout(function () {
            var buttonClass = button.className;
            button.className = buttonClass.concat(" disabled js-stay-disabled");
        }, 1500);
    }    
};