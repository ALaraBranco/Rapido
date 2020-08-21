// Multiple Markers
var markersArray = new Array();

var Maps = function () { }

Maps.prototype.Init = function (options) {
    if (typeof options === 'undefined') {
        console.log('Maps init have no data');
        return;
    }

    if (document.getElementById(options.containerId) && !document.getElementById(options.containerId).hasAttribute('data-initialized')) {
        if (options.locationsList) {
            if (options.locationsList.length > 0) {
                var map;
                var bounds = new google.maps.LatLngBounds();
                var mapOptions = {
                    mapTypeId: 'roadmap'
                };

                // Display a map on the page
                map = new google.maps.Map(document.getElementById(options.containerId), mapOptions);
                map.setTilt(45);

                var markers = new Array();
                var infoWindowContent = [];

                for (var i = 0; i < options.locationsList.length; i++) {
                    var latitude = options.locationsList[i].latitude && options.locationsList[i].latitude != "0" ? options.locationsList[i].latitude.replace(",", ".") : "";
                    var longitude = options.locationsList[i].longitude && options.locationsList[i].longitude != "0" ? options.locationsList[i].longitude.replace(",", ".") : "";
                    var locationArray = [options.locationsList[i].company, latitude, longitude];
                    var locationCallback = options.selectionCallback ? '<button class="btn btn--primary dw-mod" onclick="' + options.selectionCallback + '()">' + options.buttonText + '</button>' : "";
                    var locationDetails = options.locationsList[i].address ? '<p>' + options.locationsList[i].address + '</p>' + '<p>' + options.locationsList[i].zip + ' ' + options.locationsList[i].city + ' ' + options.locationsList[i].country + options.locationsList[i].description + '</p>' : "<p>" + options.locationsList[i].description + "</p>";
                    var locationInfo = ['<div class="map-container__canvas__location-info">' + '<h5>' + options.locationsList[i].company + '</h5>' + locationDetails + locationCallback + '</div>'];
                    markers.push(locationArray);
                    infoWindowContent.push(locationInfo);
                }

                // Display multiple markers on a map
                var infoWindow = new google.maps.InfoWindow(), marker, i;

                //Make it possible to use the geocoder to look up addresses
                var geocoder = new google.maps.Geocoder();

                // Loop through our array of markers & place each one on the map
                for (var i = 0; i < markers.length; i++) {
                    var rawMarkerInfo = markers[i];
                    var latitude = rawMarkerInfo[1];
                    var longitude = rawMarkerInfo[2];
                    var currentIndex = i;
                    var position;

                    if (latitude == "") {
                        var address = options.locationsList[currentIndex].address + ", " + options.locationsList[currentIndex].city + ", " + options.locationsList[currentIndex].country;
                        var title = rawMarkerInfo[0];

                        geocoder.geocode({ 'address': address }, function (results, status) {
                            if (status == 'OK') {
                                position = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());

                                marker = new google.maps.Marker({
                                    position: position,
                                    map: map,
                                    title: title
                                });

                                // Allow each marker to have an info window
                                google.maps.event.addListener(marker, 'click', (function (marker, idx) {
                                    var j = idx;
                                    return function () {
                                        infoWindow.setContent(infoWindowContent[j][0]);
                                        infoWindow.open(map, marker);

                                        if (options.markerCallback) {
                                            options.markerCallback(options.locationsList[j]);
                                        }

                                        var event = new CustomEvent('mapMarkerOnClick', { 'detail': { 'data': options.locationsList[j] } });
                                        document.dispatchEvent(event);
                                    }
                                })(marker, currentIndex));

                                markersArray.push(marker);
                                bounds.extend(position);

                                map.fitBounds(bounds);
                            } else {
                                console.log('Geocode was not successful for the following reason: ' + status);
                            }
                        });
                    } else {
                        position = new google.maps.LatLng(latitude, longitude);

                        marker = new google.maps.Marker({
                            position: position,
                            map: map,
                            title: title
                        });

                        // Allow each marker to have an info window
                        google.maps.event.addListener(marker, 'click', (function (marker, idx) {
                            var j = idx;
                            return function () {
                                infoWindow.setContent(infoWindowContent[j][0]);
                                infoWindow.open(map, marker);

                                if (options.markerCallback) {
                                    options.markerCallback(options.locationsList[j]);
                                }

                                var event = new CustomEvent('mapMarkerOnClick', { 'detail': { 'data': options.locationsList[j] } });
                                document.dispatchEvent(event);
                            }
                        })(marker, currentIndex));

                        markersArray.push(marker);
                        bounds.extend(position);

                        map.fitBounds(bounds);
                    }
                }

                // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
                var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
                    if (markers.length == 1) {
                        map.setZoom(10);
                    }

                    google.maps.event.removeListener(boundsListener);
                });

                document.getElementById(options.containerId).setAttribute("data-initialized", "True");
            }
        }
    }
}


Maps.prototype.OpenInfo = function (markerId) {
    google.maps.event.trigger(markersArray[markerId], 'click');

    var event = new CustomEvent('mapOpenInfo', { 'detail': { 'markerId': markerId } });
    document.dispatchEvent(event);
}

var Maps = new Maps();
