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
    return $("#er-radius").val()
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

function initMap(currentPosition) {
    $(".er-header-settings").slideUp(); // close settings panel
    showMap(); //show map so the markers can fit the bounds    
    map = new google.maps.Map(document.getElementById('map'), mapOptions()); // Create the map.
};

function geoSearch(currentPosition) {

    if (currentPosition == 'NOGEO') { // check if lcoation is known
        return logErrors('NOGEO')
    }

    // assign the more button
    var getNextPage = null;
    var moreButton = document.getElementById('more');
    moreButton.onclick = function () {
        console.log()
        moreButton.disabled = true;
        if (getNextPage) getNextPage();
    };
    initMap(); // create the map 
    var service = new google.maps.places.PlacesService(map); // Connect to the places api
    service.nearbySearch( // Perform a nearby search
        {
            location: currentPosition,
            radius: getRadius(),
            type: ['restaurant'],
            keyword: ['vegetarian' + getVeg() + getCuisine()],
            openNow: getOpen(),
        },
        function (results, status, pagination) {
            console.log(status);
            if (status !== 'OK') {
                logErrors(status, 'place'); // push error to page
                return;
            }
            // get the generated resultslist and push to screen
            $("#er-search-results").html(showResults(results, currentPosition, 'geo'));
            console.log(results);
            createMarkers(results) // Plot the markers on the map
            if ((window.innerWidth < 768) || ((window.innerWidth < 992) && (window.innerWidth < innerHeight))) { //on single page devices 
                setTimeout(function () { // wait a bit to show the mapresults
                    showList(slideList()); // then show list
                }, 2000);
            } else { // on other devices
                showList(slideList()); // push directly
            }
            // next page assignment
            moreButton.disabled = !pagination.hasNextPage;
            getNextPage = pagination.hasNextPage && function () {
                pagination.nextPage();
            };
        });
}

function checkSearchInput(searchInput) {
    if (searchInput == '') { // Nothing entered? error
        logErrors('NOINPUT');
    } else {
        return searchInput;
    };
}


function manualSearch() {
    // assign the more button
    var getNextPage = null;
    var moreButton = document.getElementById('more');
    moreButton.onclick = function () {
        moreButton.disabled = true;
        if (getNextPage) getNextPage();
    };
    searchInput = checkSearchInput($("#er-search-input").val());


    initMap(); // create the map
    var service = new google.maps.places.PlacesService(map); // connect to the places api
    service.textSearch( // Perform the manual search
        {
            query: searchInput + ' AND vegetarian' + getCuisine() + getVeg(),
            type: ['restaurant'],
            openNow: getOpen()
        },
        function (results, status, pagination) {
            if (status !== 'OK') {
                logErrors(status, 'place');
                return;
            }
            // get the generated resultslist and push to screen

            checkGeo(function (currentPosition) {
                $("#er-search-results").html(showResults(results, currentPosition, searchInput)); // push details to screen


                console.log(results);
                createMarkers(results) // Plot the markers on the map
                if ((window.innerWidth < 768) || ((window.innerWidth < 992) && (window.innerWidth < innerHeight))) { //on single page devices 
                    setTimeout(function () { // wait a bit to show the mapresults
                        showList(slideList()); // then show list
                    }, 2000);
                } else { // on other devices
                    showList(slideList()); // push directly
                }
            })
            // next page assignment
            moreButton.disabled = !pagination.hasNextPage;
            getNextPage = pagination.hasNextPage && function () {
                pagination.nextPage();
            };
        }
    );
};

function restaurantDetails(place_id) { // get restaurant details
    // scoll to top of the page
    $('#er-details-section').animate({ scrollTop: 0 }, 'slow');
    var requestDetails = { // generate search argument
        placeId: place_id,
        fields: ['reviews', 'adr_address', 'formatted_address', 'geometry', 'icon', 'name', 'permanently_closed', 'photos', 'place_id', 'plus_code', 'type', 'url', 'utc_offset', 'vicinity']
    };
    service = new google.maps.places.PlacesService(map); // connect to the api
    service.getDetails(requestDetails, showRestaurantDetails); // get details an push to callback
}

function createMarkers(places) { // plot markers to the map
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

        let starRating = (place.rating * 15).toFixed(); // generate starrating width
        if (place.price_level != NaN) { // check if there is a pricelevel available
            var priceLevel = (place.price_level * 15).toFixed(); // generate pricelevel width
        } else {
            var priceLevel = '0'; // if no price is available the food is free ;-)
        }
        // generate the content of the infowindow
        var infoContent = `<div class="er-infowindow-details" onclick="restaurantDetails('${place.place_id}')">
        <h5>${place.name}</h5>            
                <img src="${imageUri}">
                <div class="er-reviewdetails-container" style="width:${starRating}px">
                <img src="assets/images/Rating-Star-PNG-Transparent-Image.png">                           
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
};


var userLocation;
function initDirectionMap(placeId) {
    showDirections(); // show direction map
    navigator.geolocation.clearWatch(userLocation); // un-attach the geo watcher
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
        icon: { url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" },
        position: currentPosition
    });
    moveMarker(currentPosition);
    // change blue marker everytime the users moves
    //  navigator.geolocation.watchPosition((function (position) {
    //      userLocation = blueMarker.setPosition(currentPosition);
    //  }));
}

function moveMarker(currentPosition) { // generate a marker based on users position
    blueMarker.setPosition(currentPosition);
}







