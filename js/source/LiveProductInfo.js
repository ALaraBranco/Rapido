Handlebars.registerHelper('getLiveProductInfo', function (containerId) {
    var ajaxContainerElement = document.getElementById(containerId);
    var jsonFeed = ajaxContainerElement.getAttribute('data-json-feed');
    jsonFeed = jsonFeed.concat(jsonFeed.indexOf("?") ? "&" : "?", "getproductinfo=true");
    HandlebarsBolt.UpdateContent(ajaxContainerElement.id, jsonFeed, false, ajaxContainerElement.getAttribute('data-template'), ajaxContainerElement.getAttribute('data-preloader'));
});