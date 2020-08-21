var Filter = function () { }

Filter.prototype.FilterItems = function (e) {
    var currentFilter = e.currentTarget;
    var searchString  = currentFilter.value.toLowerCase();
    var filterItems   = currentFilter.closest(".js-filter").querySelectorAll('[data-filter-value]');

    filterItems.forEach(function (filterItem) {
        var filterItemValue = filterItem.getAttribute("data-filter-value").toLowerCase();
        filterItem.classList.toggle("u-hidden", filterItemValue.indexOf(searchString) == -1);
    });
}

var Filter = new Filter();