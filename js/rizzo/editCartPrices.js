var EditCart = function() { };

EditCart.prototype.EditProductPrice = function(editCartPage, price, productId, variantId){ 
    if(document.getElementById('Price_'+productId).checkValidity()) {
        Request.Fetch().post(editCartPage + "?price=" + price + "&productId=" + productId + "&variantId=" + variantId, null, priceChanged, null, true);        
    }

    function priceChanged() {
        window.location.href = window.location.href;
    }
};

EditCart.prototype.DisplayInfo = function(id){
    var lowestPrice = document.getElementById('lowestPrice_' + id);
    if(lowestPrice != null) {
        lowestPrice.classList.toggle("u-hidden");
    }
};