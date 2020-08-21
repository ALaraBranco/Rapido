var ReorderValidation = function() { };

document.addEventListener("DOMContentLoaded", function (event) {
    var trigger = document.getElementById('WarningWindowModalTrigger');
    if(trigger != null){
        trigger.parentNode.classList.add("u-no-margin");
    }
});

ReorderValidation.prototype.toggleWarningWindowModal = function () {
    var modalTrigger = document.getElementById('WarningWindowModalTrigger');
    if (modalTrigger != null) {
        var state = modalTrigger.checked;
        modalTrigger.checked = !state;
        var modalContainer = document.getElementById('ModalContainer');
        if(modalContainer) {
            var containerClass = modalContainer.className;
            modalContainer.className = !state ? containerClass.concat(" u-flex") : containerClass.replace("u-flex", "");
        }
    }
};

ReorderValidation.prototype.ReorderValidation = function(event,reorderValidationPage, reorderUrl, orderId){
    event.preventDefault();
    Request.Fetch().post(reorderValidationPage+"?orderId="+orderId, null, reorderValidation, null, true);
    
    function reorderValidation(result){
        if(result != null) {
            if (result.reorder === "True") {
                Request.Fetch().post(reorderUrl, null, reloadPage, reloadPage, false);
                
                function reloadPage() {
                    window.location.href = window.location.href;
                }
            } else {
                var warningMessage = document.getElementById("warningMessage");
                if (warningMessage) {
                    warningMessage.innerHTML = result.message;
                    ReorderValidation.prototype.toggleWarningWindowModal();
                }
            }
        }
    }
};
