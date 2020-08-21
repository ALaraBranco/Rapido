function ThirdPartyShipping() {
}

ThirdPartyShipping.prototype.Wrapper = document.querySelector("[id*=Block__RizzoThirdPartyShipping]");
ThirdPartyShipping.prototype.NewOrderShippingAgent = document.getElementById("newOrderShippingAgent");
ThirdPartyShipping.prototype.OrderShippingAgent = document.getElementById("OrderShippingAgent");
ThirdPartyShipping.prototype.OrderShippingAgentService = document.getElementById("OrderShippingAgentService");
ThirdPartyShipping.prototype.OrderShippingAccountNumber = document.getElementById("OrderShippingAccountNumber");

ThirdPartyShipping.prototype.UpdateMethods = function (optionValue, selectedCarrierId) {
    var cssHidden = "u-hidden";
    var methodOptions = this.OrderShippingAgentService.querySelectorAll("option");
    // Update Methods according to selected Carrier
    for (var index = 0; index < methodOptions.length; index++) {
        var carrierId = methodOptions[index].getAttribute("data-carrier-id");
        if (carrierId === selectedCarrierId || index===0) {
            methodOptions[index].removeAttribute("disabled");
            methodOptions[index].classList.remove(cssHidden);  // Enable this line in Rapido
        } else {
            methodOptions[index].setAttribute("disabled", "disabled");
            methodOptions[index].classList.add(cssHidden);  // Enable this line in Rapido
        }
    }
    if (optionValue) {
        this.OrderShippingAgentService.querySelector('option[value="' + optionValue + '"]').selected = true;
    } else {
        this.OrderShippingAgentService[this.OrderShippingAgentService.selectedIndex].selected = false;
        this.OrderShippingAgentService[0].selected = true;
        this.OrderShippingAgentService[0].setAttribute("value","");
    }
};
ThirdPartyShipping.prototype.CheckShippingFields = function (optionValue, carrierId, methodId, accountNumber) {
    var cssHiddenValidate = "u-hidden-validate";
    var OrderShippingAgentPNClassList = this.OrderShippingAgent.parentNode.closest(".form__field-group.u-full-width.dw-mod").classList;
    var newOrderShippingAgentPNClassList = this.NewOrderShippingAgent.parentNode.closest(".form__field-group").classList;
    var shippingAccountNumberPNClassList = this.OrderShippingAccountNumber.parentNode.closest(".form__field-group").classList;
    var orderShippingAgentServiceClassList = this.OrderShippingAgentService.parentNode.closest(".form__field-group").classList;

    if (optionValue !== "ownCarrierSelectedAddNew" || !optionValue) {
        //this.NewOrderShippingAgent.removeAttribute("required");
        newOrderShippingAgentPNClassList.add(cssHiddenValidate);
        if (accountNumber !== "" || !optionValue){
            shippingAccountNumberPNClassList.add(cssHiddenValidate);
        }
        else {
            shippingAccountNumberPNClassList.remove(cssHiddenValidate);
        }
        if (methodId !== "" || !optionValue){
            orderShippingAgentServiceClassList.add(cssHiddenValidate);
        }
        else {
            orderShippingAgentServiceClassList.remove(cssHiddenValidate);
        }
    } else {
        OrderShippingAgentPNClassList.remove(cssHiddenValidate);
        newOrderShippingAgentPNClassList.remove(cssHiddenValidate);
        shippingAccountNumberPNClassList.remove(cssHiddenValidate);
        orderShippingAgentServiceClassList.remove(cssHiddenValidate);
    }
};
ThirdPartyShipping.prototype.Init = function () {
    // Show/hide New Carrier fields and Info section
    if (this.Wrapper != null) {
        var userIsLoggedIn = this.Wrapper.classList.contains("loggedIn");
        var shippingMethod = this.Wrapper.getAttribute("id").split("-");
        var selectedShippingMethod = document.querySelector("[name='EcomCartShippingmethodID']:checked");
        var selectedShippingMethodValue = selectedShippingMethod != null ? selectedShippingMethod.getAttribute("value") : "";

        if (selectedShippingMethodValue !== shippingMethod[1]) {
            this.Wrapper.remove();
        }
        if ((shippingMethod.count <=2 && !userIsLoggedIn) || this.Wrapper.childElementCount === 0) {
            document.querySelector("#EcomCartShippingmethodID_" + shippingMethod[1]).parentNode.remove();
            this.Wrapper.remove();
        } else {

            var providerId = this.NewOrderShippingAgent[this.NewOrderShippingAgent.selectedIndex].getAttribute("data-account-provider");
            var methodId = this.OrderShippingAgent != null ? this.OrderShippingAgent[this.OrderShippingAgent.selectedIndex].getAttribute("data-account-method") : "";
            var accountNumber = this.OrderShippingAgent != null ? this.OrderShippingAgent[this.OrderShippingAgent.selectedIndex].getAttribute("data-account-number") : "";

            if (this.OrderShippingAgent != null) {
                this.CheckShippingFields(this.OrderShippingAgent[this.OrderShippingAgent.selectedIndex].getAttribute("value"), providerId, methodId, accountNumber);

                this.OrderShippingAgent.addEventListener("change", function () {
                    var providerId = this[this.selectedIndex].getAttribute("data-account-provider");
                    var methodId = this[this.selectedIndex].getAttribute("data-account-method");
                    var accountNumber = this[this.selectedIndex].getAttribute("data-account-number");
                    // Update Provider order custom field
                    if (providerId != null && providerId.length>0)
                        thirdPartyShipping.NewOrderShippingAgent.querySelector('option[value="' + providerId + '"]').selected = true;
                    // Update Method order custom field
                    thirdPartyShipping.UpdateMethods(methodId, providerId);
                    // Update Account Number order custom field
                    thirdPartyShipping.OrderShippingAccountNumber.value = accountNumber;
                    thirdPartyShipping.CheckShippingFields(this[this.selectedIndex].getAttribute("value"), providerId, methodId, accountNumber);
                });
            }

            this.NewOrderShippingAgent.addEventListener("change", function () {
                var providerId = this[this.selectedIndex].value;
                var methodId = this.OrderShippingAgent != null ? thirdPartyShipping.OrderShippingAgent[thirdPartyShipping.OrderShippingAgent.selectedIndex].getAttribute("data-account-method") : "";
                thirdPartyShipping.UpdateMethods(methodId, providerId);
            });

            thirdPartyShipping.UpdateMethods("", "");
        }
    }

}
var thirdPartyShipping = new ThirdPartyShipping();
document.addEventListener("DOMContentLoaded", function () {
    if (thirdPartyShipping.Wrapper != null) {
        thirdPartyShipping.Init();
    }
});