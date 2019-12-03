var map; // create map variable
var directionMap; // create directions map variable
var infowindow; // create infowindow variable for the map
var blueMarker;
var userLocation;


function mapOptions() { // style options for all maps
    return {
        disableDefaultUI: true,
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#523735"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#c9b2a6"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#dcd2be"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ae9e90"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#93817c"
                    }
                ]
            },
            {
                "featureType": "poi.attraction",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.government",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#a5b076"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#447530"
                    }
                ]
            },
            {
                "featureType": "poi.place_of_worship",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.school",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#fdfcf8"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f8c967"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#e9bc62"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e98d58"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#db8555"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#806b63"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8f7d77"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#b9d3c2"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#92998d"
                    }
                ]
            }
        ]
    }
}



function getRadius() { // get sort method from options
    console.log($("#er-radius").val())
    return $("#er-radius").val();
}

function getCuisine() { // get cuisine type from options
    var cuisine = $("#er-cuisine").children("option:selected").val()
    if (cuisine != '') {
        return ` AND (${cuisine})`;
    } else {
        return '';
    }
}

function getVehicle() {
    return $("input[name='er-travel']:checked").val()
}

function getVeg() { // get veg options from settings
    var vegOptions = '';
    var vegan = '';
    var gluten = '';
    if ($("#vegan").is(":checked")) {
        vegan = ` AND (vegan)`;
    }
    if ($("#gluten").is(":checked")) {
        gluten = ` AND (gluten-free)`;
    }
    vegOptions = vegan + gluten;
    return vegOptions;
}

function getOpen() { // get only open option from settings
    if ($("#open-now").is(":checked")) {
        return true;
    }
}

function checkGeo(callback) { // get current location
    navigator.geolocation.getCurrentPosition(function (position) {
        currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        callback(currentPosition);
    },
        function (error) {
            callback('NOGEO') // if location denied show error
        }
    )
};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), mapOptions()); // Create the map.
};

function geoSearch(currentPosition, location, searchInput) {
    if (currentPosition != 'NOGEO') {
        location = currentPosition;
    }
    switchSection('map');
    var service = new google.maps.places.PlacesService(map); // Connect to the places api
    service.nearbySearch( // Perform a nearby search
        {
            location: location,
            radius: getRadius(),
            type: ['restaurant'],
            keyword: ['vegetarian' + getVeg() + getCuisine()],
            openNow: getOpen(),
        },
        function (results, status, pagination) {
            processResults(results, status, pagination, currentPosition, searchInput);
        }
    );
}

function checkSearchInput(searchInput) {
    if (searchInput == '') { // Nothing entered? error
        logErrors('NOINPUT', 'place');
    } else {
        geoCode(searchInput);
    };
}

function geoCode(searchInput) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': searchInput }, function (results, status) {
        if (status === 'OK') {
            console.log(results[0].geometry.location);
            geoSearch('NOGEO', results[0].geometry.location, searchInput);
        } else {
            logErrors('NOINPUT', 'place');
        }
    })
}




function manualSearch(searchInput) {
    switchSection('map');

    var service = new google.maps.places.PlacesService(map); // connect to the places api
    service.textSearch( // Perform the manual search
        {
            query: searchInput + ' AND vegetarian' + getCuisine() + getVeg(),
            type: ['restaurant'],
            openNow: getOpen()
        },
        function (results, status, pagination) {
            processResults(results, status, pagination, 'NOGEO', searchInput);
        }
    );

}

function manualGeoSearch(searchInput, location) {
    switchSection('map');
    var service = new google.maps.places.PlacesService(map); // connect to the places api
    console.log(location);
    console.log(getRadius());
    service.textSearch( // Perform the manual search
        {
            query: ' AND vegetarian' + getCuisine() + getVeg(),
            type: ['restaurant'],
            openNow: getOpen(),
            location: location,
            radius: getRadius()
        },
        function (results, status, pagination) {
            processResults(results, status, pagination, 'NOGEO', searchInput);
        }
    );
}


function restaurantDetails(place_id) { // get restaurant details
    // scoll to top of the page
    $('#er-details-section').animate({ scrollTop: 0 }, 'slow');
    var requestDetails = { // generate search argument
        placeId: place_id,
        fields: ['reviews', 'opening_hours', 'website', 'adr_address', 'formatted_address', 'geometry', 'icon', 'name', 'permanently_closed', 'photos', 'place_id', 'plus_code', 'type', 'url', 'utc_offset', 'vicinity']
    };
    service = new google.maps.places.PlacesService(map); // connect to the api
    service.getDetails(requestDetails, showRestaurantDetails); // get details an push to callback
}

function createMarkers(places, currentPosition) { // plot markers to the map
    console.log('jaja')
    var bounds = new google.maps.LatLngBounds();
    infowindow = new google.maps.InfoWindow({ // create empty infowindow
        content: ''
    });

    for (let index = 0, place; place = places[index]; index++) { // cycle through places
        let marker = new google.maps.Marker({ // create marker
            map: map,
            position: place.geometry.location

        });
        let imageUri;
        if (place.hasOwnProperty('photos')) { // check if a photo is available
            imageUri = place.photos[0].getUrl({ "maxWidth": 100 }); // get url for infowindow photo
        } else imageUri = '';

        let starRating = (place.rating * 20).toFixed(); // generate starrating width
        if (place.price_level != NaN) { // check if there is a pricelevel available
            var priceLevel = (place.price_level * 15).toFixed(); // generate pricelevel width
        } else {
            var priceLevel = '0'; // if no price is available the food is free ;-)
        }
        // generate the content of the infowindow
        var infoContent = `
                        <div class="er-infowindow-details" onclick="restaurantDetails('${place.place_id}')">
                            <h5>${place.name}</h5>            
                            <img src="${imageUri}">
                            <div class="er-review-details">
                                <div class="er-reviewdetails-container" style="width:${starRating}px">
                                </div>
                            </div>`

        // attach the infowindow to a click on the marker
        google.maps.event.addListener(marker, 'click', (function (marker, infoContent, infowindow) {
            return function () {
                infowindow.close()
                infowindow.setContent(infoContent);
                infowindow.open(map, marker);
                map.setCenter(place.geometry.location);
            };
        })(marker, infoContent, infowindow));
        // link the info window to a click on the corresponding list item
        $("#" + place.place_id).click(function () { // click-event for list-item
            $("#" + place.place_id).next().slideToggle(); // make listitem collapsible
            $("#" + place.place_id).toggleClass("active"); // highlight list item
            infowindow.close();
            infowindow.setContent(place.name);
            infowindow.open(map, marker);
            map.setCenter(place.geometry.location);
        })
        bounds.extend(place.geometry.location); // add this place to the bounds
    };
    map.fitBounds(bounds); // fit markers on the map

    if (currentPosition != 'NOGEO') {
        var currentMarker = new google.maps.Marker({ // place blue marker on current position
            map: map,
            icon: { url: "http://maps.google.com/mapfiles/ms/icons/blue-pushpin.png" },
            position: currentPosition
        });
    }
};



function initDirectionMap(placeId) {

    directionMap = '';
    switchSection('directions'); // show direction map
    checkGeo(function (currentPosition) { // get current location
        if (currentPosition != 'NOGEO') {
            directionMap = new google.maps.Map(document.getElementById('direction-map'), mapOptions()); // create map
            return calcRoute(placeId, currentPosition); // on succes plot route
        } else {
            return console.log('directions via browser');
        }
    });
}



function calcRoute(placeId, currentPosition) { // plot route on the map
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var mapCenter = currentPosition; // center map around user
    directionsRenderer.setMap(directionMap); // plot to map
    var start = `{ location: ${currentPosition} }`; // start at your position
    var end = `{ place_id: "${placeId}" } `; // Use place id for end point
    var request = {
        origin: currentPosition,
        destination: { 'placeId': placeId },
        travelMode: getVehicle() // get transportion method from settings panel
    };

    directionsService.route(request, function (result, status) {
        if (status !== 'OK') {
            logErrors(status, 'route'); // show error on screen
            return;
        }
        //       console.log(result.routes[0].legs[0]); // direction instructions for later implementation 
        directionsRenderer.setDirections(result);
    });

    blueMarker = new google.maps.Marker({ // place blue marker on current position
        map: directionMap,
        icon: { url: "http://maps.google.com/mapfiles/ms/icons/blue-pushpin.png" },
        position: currentPosition
    });

    $("#er-location-update").click(function () { // connect location update button
        checkGeo(function (currentPosition) { // get location
            blueMarker.setPosition(currentPosition) //  set blue marker to current position
        })
    })
}







