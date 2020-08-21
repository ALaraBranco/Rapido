
var Search = function () { }

function debounce(method, delay) {
    var timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            method();
        }, delay);
    };
}

Search.prototype.Init = function () {
    var searchElements = document.querySelectorAll(".js-typeahead");
    var nodesArray = [].slice.call(searchElements);
    nodesArray.forEach(function (searchElement) {
        const groupsBtn = searchElement.querySelector(".js-typeahead-groups-btn"),
            groupsContent = searchElement.querySelector(".js-typeahead-groups-content"),
            searchField = searchElement.querySelector(".js-typeahead-search-field"),
            searchContent = searchElement.querySelector(".js-typeahead-search-content"),
            secondSearchContent = searchElement.querySelector(".js-typeahead-additional-search-content"),
            enterBtn = searchElement.querySelector(".js-typeahead-enter-btn"),
            options = {
                pageSize: searchElement.getAttribute("data-page-size"),
                searchParameterName: searchElement.getAttribute("data-search-parameter-name") || "Search",
                searchFeedId: searchElement.getAttribute("data-search-feed-id"),
                searchSecondFeedId: searchElement.getAttribute("data-search-second-feed-id"),
                listId: searchElement.getAttribute("data-list-id"),
                resultPageId: searchElement.getAttribute("data-result-page-id"),
                searchType: searchElement.getAttribute("data-search-type") || "product-search",
                groupsPageId: searchElement.getAttribute("data-groups-page-id"),
                searchTemplate: searchContent.getAttribute("data-template"),
                saveSelectedResult: searchContent.getAttribute("data-save-selected-result"),
                addFirstResultOnEnter: searchElement.getAttribute("data-add-first-on-enter"),
                livePrice: searchElement.getAttribute("data-live-price") || "false"
            };
        var selectionPosition = -1;
        var listSelectionPosition = 0;

        if (groupsBtn) {
            groupsBtn.onclick = function () {
                HandlebarsBolt.UpdateContent(groupsContent.getAttribute("id"), '/Default.aspx?ID=' + options.groupsPageId + '&feedType=' + 'productGroups' + '&redirect=false');
            }
        }

        searchField.onkeyup = debounce(function () {
            var query = searchField.value;
            selectionPosition = -1
            listSelectionPosition = 0;

            if (groupsBtn && groupsBtn.getAttribute("data-group-id") != "all" && groupsBtn.getAttribute("data-group-id") != "") {
                query += "&GroupID=" + groupsBtn.getAttribute("data-group-id");
            }

            if (query.length > 0) {
                updateContent(
                    searchContent.getAttribute("id"),
                    query,
                    options.searchFeedId,
                    (options.searchType == "combined-search" ? "product-search" : options.searchType),
                    options.searchType == "combined-search"
                );
                if (options.searchSecondFeedId) {
                    updateContent(secondSearchContent.getAttribute("id"), query, options.searchSecondFeedId, "content-search", true);
                }
                document.getElementsByTagName('body')[0].addEventListener('keydown', keyPress, false);
            } else {
                HandlebarsBolt.CleanContainer(searchContent.getAttribute("id"));
                if (options.searchSecondFeedId) {
                    HandlebarsBolt.CleanContainer(secondSearchContent.getAttribute("id"));
                }
            }
        }, 500);

        function updateContent(id, query, feedId, searchType, combinedFlag) {
            HandlebarsBolt.UpdateContent(
                id,
                '/Default.aspx?ID=' + feedId +
                '&pagesize=' + options.pageSize +
                '&' + options.searchParameterName + '=' + query +
                (searchType == "product-search" ?
                    '&feedType=productsOnly' +
                    '&redirect=false' +
                    '&DoNotShowVariantsAsSingleProducts=True' : '') +
                (combinedFlag ?
                    '&searchType=combined' : '') +
                (options.listId ? '&ListID=' + options.listId : '') +
                (options.searchTemplate ? '&Template=' + options.searchTemplate : ''));
        }

        function clickedOutside(e) {
            if (searchContent.contains(e.target)) {
                document.getElementsByTagName('body')[0].removeEventListener('keydown', keyPress, false);
                return;
            }

            if (e.target != searchField && !e.target.classList.contains("js-ignore-click-outside")) {
                HandlebarsBolt.CleanContainer(searchContent.getAttribute("id"));
                if (options.searchSecondFeedId) {
                    HandlebarsBolt.CleanContainer(secondSearchContent.getAttribute("id"));
                }
            }

            if (groupsBtn && e.target != groupsBtn && !groupsContent.contains(e.target)) {
                HandlebarsBolt.CleanContainer(groupsContent.getAttribute("id"));
            }

            document.getElementsByTagName('body')[0].removeEventListener('keydown', keyPress, false);
        }

        function keyPress(e) {
            const KEY_CODE = {
                LEFT: 37,
                TOP: 38,
                RIGHT: 39,
                BOTTOM: 40,
                ENTER: 13
            };

            var searchContainer = searchContent;
            var secondSearchContainer;

            if (options.searchType == "combined-search") {
                searchContainer = searchContent.querySelector("ul");
                secondSearchContainer = secondSearchContent.querySelector("ul");

                if (!searchContainer || !secondSearchContainer) {
                    return;
                }
            }

            var lists = [searchContainer, secondSearchContainer];

            if ([KEY_CODE.LEFT, KEY_CODE.TOP, KEY_CODE.RIGHT, KEY_CODE.BOTTOM].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }

            if (options.searchType == "combined-search" && e.keyCode == KEY_CODE.RIGHT && selectionPosition > -1 && listSelectionPosition == 0) {
                listSelectionPosition = 1;
                selectionPosition = 0;
            }

            if (options.searchType == "combined-search" && e.keyCode == KEY_CODE.LEFT && selectionPosition > -1 && listSelectionPosition == 1) {
                listSelectionPosition = 0;
                selectionPosition = 0;
            }

            if (e.keyCode == KEY_CODE.BOTTOM && selectionPosition < lists[listSelectionPosition].childElementCount - 1) {
                selectionPosition++;
                searchField.blur();
            }

            if (e.keyCode == KEY_CODE.TOP && selectionPosition > 0) {
                selectionPosition--;
                searchField.blur();
            }

            if (lists[listSelectionPosition].childElementCount <= 0) {
                return;
            }

            var selectedElement = lists[listSelectionPosition].children[selectionPosition];

            if (e.keyCode == KEY_CODE.TOP || e.keyCode == KEY_CODE.BOTTOM) {
                var previousSelectedElement = lists[listSelectionPosition].querySelector("li.active");
                selectElement(previousSelectedElement, selectedElement);
            }

            if (options.searchType == "combined-search" && (e.keyCode == KEY_CODE.LEFT || e.keyCode == KEY_CODE.RIGHT) && selectedElement) {
                var previousSelectedElement = lists[!listSelectionPosition - 0].querySelector(".dropdown__item.active"); //!listSelectionPosition - 0 => 1 if 0, 0 if 1
                selectElement(previousSelectedElement, selectedElement);
            }

            if (e.keyCode == KEY_CODE.ENTER) {
                if (selectedElement) {
                    document.getElementsByTagName('body')[0].removeEventListener('keydown', keyPress, false);
                    if (selectedElement.onclick) {
                        selectedElement.onclick();
                    }
                    getLinkBySelection(selectedElement);
                } else {
                    let resultItems = lists[listSelectionPosition].querySelectorAll("li:not(.js-no-result):not(.dropdown__item--not-selectable)");
                    let isHereOnlyOneResult = resultItems.length == 1;
                    if (options.addFirstResultOnEnter || isHereOnlyOneResult) {
                        let firstItem = resultItems[0];
                        if (firstItem.onclick) {
                            firstItem.onclick();
                        } else {
                            getLinkBySelection(lists[listSelectionPosition].children[0])
                        }
                    } else {
                        showSearchResults();
                    }
                }
            }
        }

        function selectElement(previousSelectedElement, selectedElement) {
            if (selectedElement.tagName != "LI" || selectedElement.classList.contains('js-no-result')) {
                return;
            }
            var productInfo = selectedElement.dataset.productInfo;

            if (productInfo != null) {
                Search.UpdateFieldValue(selectedElement, JSON.parse(productInfo), false);
            }

            if (previousSelectedElement) {
                previousSelectedElement.classList.remove("active");
            }

            if (selectedElement) {
                selectedElement.classList.add("active");
                if (selectedElement.querySelector(".js-typeahead-name")) {
                    searchField.value = selectedElement.querySelector(".js-typeahead-name").innerText;
                }
                if (options.saveSelectedResult && selectedElement.querySelector(".js-typeahead-result")) {
                    searchField.setAttribute("data-result", selectedElement.querySelector(".js-typeahead-result").innerText);
                }
            }
        }

        function getLinkBySelection(selectedElement) {
            var jslink = selectedElement.querySelector(".js-typeahead-link");
            if (jslink) {
                if (jslink.onclick) {
                    jslink.onclick();
                }
                window.location.href = jslink.getAttribute("href");
            }
        }

        function showSearchResults() {
            if (options.resultPageId) {
                window.location.href = '/Default.aspx?ID=' + options.resultPageId +
                    '&Search=' + searchField.value +
                    (options.listId ? '&ListID=' + options.listId : '');
            }
        }

        if (enterBtn) {
            enterBtn.onclick = showSearchResults;
        }

        document.getElementsByTagName('body')[0].addEventListener('click', clickedOutside, true);
    });
}

Search.prototype.UpdateGroupSelection = function (selectedElement) {
    let groupsContent = selectedElement.parentNode,
        groupsBtn = groupsContent.parentNode.querySelector(".js-typeahead-groups-btn");

    groupsBtn.setAttribute("data-group-id", selectedElement.getAttribute("data-group-id"));
    groupsBtn.innerHTML = selectedElement.innerText;

    HandlebarsBolt.CleanContainer(groupsContent.getAttribute("id"));
}

Search.prototype.UpdateFieldValue = function (selectedElement, productInfo, hideSearchResults, actionBtnId) {
    hideSearchResults = hideSearchResults != null ? hideSearchResults : true;
    if (selectedElement == null) {
        return;
    }

    let searchContent = selectedElement.parentNode;
    let searchField = searchContent.parentNode.querySelector(".js-typeahead-search-field");

    if (selectedElement.querySelector(".js-typeahead-name")) {
        searchField.value = selectedElement.querySelector(".js-typeahead-name").innerText;
    }
    if (selectedElement.querySelector(".js-typeahead-result")) {
        searchField.setAttribute("data-result", selectedElement.querySelector(".js-typeahead-result").innerText);
    }
    if (typeof (productInfo) != "undefined") {
        //for express search
        searchField.setAttribute("data-product-info", JSON.stringify(productInfo));
        let actionBtn = document.getElementById(actionBtnId);
        if (actionBtn) {
            actionBtn.disabled = false;
            actionBtn.classList.remove("disabled");
        }
    }

    if (hideSearchResults) {
        HandlebarsBolt.CleanContainer(searchContent.getAttribute("id"));
    }
}

Search.prototype.ResetExpressSearch = function () {
    let searchField = document.getElementById("ExpressBuyProductSearchField");
    let quantityField = document.getElementById("ExpressBuyProductCount");
    let buyButton = document.getElementById("ExpressBuyProductButton");

    if (searchField && quantityField) {
        searchField.value = "";
        searchField.removeAttribute("data-result");
        searchField.removeAttribute("data-product-info");
        quantityField.value = "1";
        searchField.focus();
    }

    setTimeout(function () {
        buyButton.disabled = true;
    }, 1000);
}

var miniSearchTimeOut;

Search.prototype.ShowMiniSearch = function (trigger) {
    clearTimeout(miniSearchTimeOut);
    trigger.classList.add('is-dropdown--active');
    trigger.classList.add('menu__item--active');
    document.getElementById('headerSearch').focus();
    trigger.onmouseleave = function () {
        miniSearchTimeOut = setTimeout(function () {
            trigger.classList.remove('is-dropdown--active');
            trigger.classList.remove('menu__item--active');
        }, 1000);
    };
}

var Search = new Search();

document.addEventListener("DOMContentLoaded", Search.Init);