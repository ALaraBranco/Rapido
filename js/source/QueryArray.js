function QueryArray(queryStr) {
    this.queryArray = {};

    if (typeof queryStr != "string" || queryStr == "") {
        return;
    }
    var queryParams = "";

    if (queryStr.indexOf('=') == -1) {         //site.com
        this.path = queryStr.replace("?", ""); //site.com?
        return;
    }

    if (queryStr.indexOf('?') != -1) {         //site.com?a=1  or  ?a=1
        var arr = queryStr.split('?');
        this.path = arr[0];
        queryParams = arr[1];
    } else {
        queryParams = queryStr;                //a=1
    }

    var queryArr = queryParams.split("&");
    for (index in queryArr) {
        if (queryArr[index] != "") {
            var keyValue = queryArr[index].split("=");
            this.setValue(decodeURIComponent(keyValue[0]), decodeURIComponent(keyValue[1]));
        }
    }
}

QueryArray.prototype.setPath = function(path, saveQueryParams) {
    if (path.indexOf('?') == -1) {
        this.path = path;
        return;
    }
    var arr = path.split('?');
    this.path = arr[0];
        
    if (saveQueryParams) {
        this.combineWithParams(arr[1]);
    }
}

QueryArray.prototype.combineWithParams = function (str) {
    if (str == null || str.trim() == "") {
        return;
    }
    var newParams = new QueryArray(str);
    var queryArr = newParams.queryArray;
    for (var key in queryArr) {
        if (newParams.hasParam(key)) {
            this.setValue(key, queryArr[key]);
        }
    }
}

QueryArray.prototype.getQueryString = function() {
    var arr = [];
    //fix because ID should be always first in query
    if (this.hasParam("ID")) {
        arr.push("ID" + "=" + this.getValue("ID"));
    }
    for (var key in this.queryArray) {
        if (key.toLowerCase() != "id" && this.hasParam(key) && this.queryArray[key].toString().trim() != "") {
            arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(this.queryArray[key]));
        }
    }
    return arr.length > 0 ? "?" + arr.join("&") : "";
}

QueryArray.prototype.getFullUrl = function () {
    return this.path + this.getQueryString();
}

QueryArray.prototype.copy = function() {
    return new QueryArray(this.getFullUrl());
}

QueryArray.prototype.getValue = function(key) {
    return this.queryArray[key];
}

QueryArray.prototype.setValue = function(key, newValue, setIfExist) {
    if (!setIfExist || this.hasParam(key)) {
        this.queryArray[key] = newValue;
    }
}

QueryArray.prototype.hasParam = function(key) {
    return this.queryArray.hasOwnProperty(key);
}

QueryArray.prototype.remove = function(key) {
    delete this.queryArray[key];
}

//static

QueryArray.setParameterInCurrentURL = function(key, newValue, setIfExist) {
    var queryParams = new QueryArray(window.location.href);
    if (newValue == "" || newValue == null) {
        queryParams.remove(key);
    } else {
        queryParams.setValue(key, newValue, setIfExist);
    }
    window.location.href = queryParams.getFullUrl();
}

QueryArray.setParametersInCurrentURL = function (parameters) {
    var queryParams = new QueryArray(window.location.href);
    for (var key in parameters) {
        var newValue = parameters[key];

        if (newValue == "" || newValue == null) {
            queryParams.remove(key);
        } else {
            queryParams.setValue(key, newValue);
        }
    }

    window.location.href = queryParams.getFullUrl();
}

QueryArray.getParameterFromCurrentURL = function (key) {
    var queryParams = new QueryArray(window.location.href);
    return queryParams.getValue(key);
}