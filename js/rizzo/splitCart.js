function SplitCart () {
    var submitForm = false;
}

document.addEventListener("DOMContentLoaded", function (event) {
    document.addEventListener("contentLoaded", function (event) {
        var checkoutButtons = document.getElementsByClassName("checkout__buttons");
           
        if (document.getElementById("OutOfStock") != null) {
            toggleButtonsState(checkoutButtons, "none");
        }else{
            toggleButtonsState(checkoutButtons, "inline");
        }
    });
    
    function toggleButtonsState (checkoutButtons, state){
        if (checkoutButtons.length > 0) {
            for (var i = 0; i < checkoutButtons.length; i++) {
                checkoutButtons[i].style.display = state;
            }
        }
    }
});

SplitCart.prototype.ValidateStock = function(event, button, splitCartPage, cartPage) {
    if(!SplitCart.submitForm) {
        Request.Fetch().post(splitCartPage + "?action=validate", null, ValidateStockSuccess, null, true);

        function ValidateStockSuccess(response) {
            if (response) {
                SplitCart.submitForm = false;
                window.location.href = cartPage + "?CartV2.GotoStep0=true";
            } else {                
                if (button != null) {
                    SplitCart.submitForm = true;
                    button.click();                    
                }
            }
        }

        event.preventDefault();
    }
};

SplitCart.prototype.RemoveOutOfStockProducts = function(splitCartPage) {
    Request.Fetch().post(splitCartPage + "?action=remove");
    window.location.href = window.location.href;
};