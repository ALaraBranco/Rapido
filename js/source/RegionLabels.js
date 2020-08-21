var RegionLabels = function () { };
document.addEventListener("DOMContentLoaded", function (event) {
    var countryFields = document.querySelectorAll("#UserManagement_Form_Country, #EcomOrderCustomerCountry, #EcomOrderDeliveryCountry");

    for (var i = 0; i < countryFields.length; i++) {
        regionLabels.Update(countryFields[i]);
        countryFields[i].addEventListener("change", function () {
            regionLabels.Update(this);
        });
    }
});
RegionLabels.prototype.GetCountryByCode = function (country) {
    for (var i = 0; i < regions.length; i++) {
        if (regions[i].Country === country) {
            return regions[i];
        }
    }
    return null;
};
RegionLabels.prototype.Update = function (source) {
    var regionLabel = document.querySelector("label[for=" + source.id.replace("Country", "Region") + "]");
    if (regionLabel === null) { regionLabel = document.querySelector("label[for=" + source.id.replace("Country", "State") + "]"); }
    if (regionLabel !== null) {
        var selectedCountry = source.options[source.selectedIndex].value;
        var country = regionLabels.GetCountryByCode(selectedCountry);
        if (country === null) {
            
            country = regionLabels.GetCountryByCode("default");
        }
        regionLabel.innerHTML = country.Region;
    }
};
var regionLabels = new RegionLabels();