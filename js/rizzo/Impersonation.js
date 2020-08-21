function Impersonation () { }
Impersonation.prototype.SetDefaultAccount = function(element) {
    Request.newRequest(element.getAttribute("href"), "GET", null, Impersonation.ReloadCurrentResults, null, false);
};
Impersonation.prototype.ReloadCurrentResults = function(data){
    var searchUsersResultsHeader = document.getElementById("searchUsersResultsHeader");

    if(searchUsersResultsHeader != null)
    {
        HandlebarsBolt.UpdateContent('searchUsersResultsHeader', searchUsersResultsHeader.getAttribute("data-json-feed"))
    }
};
Impersonation.prototype.SelectAccount = function(element) {
    var searchUsersResultsHeader = document.getElementById("searchUsersResultsHeader");

    if(searchUsersResultsHeader != null)
    {
        Request.newRequest(searchUsersResultsHeader.getAttribute("data-stop-impersonation"), "GET", null, Impersonation.StopImpersonationSuccess(element.getAttribute("href")), null, false);
    }
    else{
        Impersonation.StopImpersonationSuccess(element.getAttribute("href"));
    }
};
Impersonation.prototype.StopImpersonationSuccess = function(href) {
    window.location.href = href;
};
var Impersonation = new Impersonation();