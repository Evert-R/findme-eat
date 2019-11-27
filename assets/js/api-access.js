var map; // create map variable
var directionMap; // create directions map variable

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

function initMap(currentLat, currentLong) {
    hideAll();
    $(".er-header-settings").slideUp();
    showList();
    showMap(); //show map so the markers can fit the bounds    
    map = new google.maps.Map(document.getElementById('map'), mapOptions()); // Create the map.
};

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

function checkGeo(callback, directions) { // get current location
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position.coords.latitude, position.coords.longitude)
        callback(position.coords.latitude, position.coords.longitude);
    },
        function (error) { // if location denied show error
            if (error.code == error.PERMISSION_DENIED && directions == undefined) {
                logErrors('NOGEO')
            } else { // if we wanted directions do a browser search in new tab
                console.log('directions via browser')
            }
        }
    )
};

function geoSearch(currentLat, currentLong) {
    // assign the more button
    var getNextPage = null;
    var moreButton = document.getElementById('more');
    moreButton.onclick = function () {
        console.log()
        moreButton.disabled = true;
        if (getNextPage) getNextPage();
    };

    initMap();
    // Create the places service
    var service = new google.maps.places.PlacesService(map);
    // Perform a nearby search.
    service.nearbySearch(
        {
            location: { lat: currentLat, lng: currentLong },
            radius: getRadius(),
            type: ['restaurant'],
            keyword: ['vegetarian' + getVeg() + getCuisine()],
            openNow: getOpen(),
            //          rankBy: google.maps.places.RankBy.DISTANCE
        },
        function (results, status, pagination) {
            console.log(status);
            if (status !== 'OK') {
                logErrors(status);
                return;
            }
            // push results to screen
            $("#er-search-results").html(showResults(results));
            console.log(results)
            createMarkers(results) // Plot markers on the map
            if (window.innerWidth < 576) {
                setTimeout(function () { // wait a bit to show the mapresults
                    showList(slideList()); // then show list
                }, 2000);
            } else {
                showList(slideList());
            }
            // next page assignment
            moreButton.disabled = !pagination.hasNextPage;
            getNextPage = pagination.hasNextPage && function () {
                pagination.nextPage();
            };

        });
}



function manualSearch() {
    // assign the more button
    var getNextPage = null;
    var moreButton = document.getElementById('more');
    moreButton.onclick = function () {
        moreButton.disabled = true;
        if (getNextPage) getNextPage();
    };

    initMap();
    // Create the places service :
    var service = new google.maps.places.PlacesService(map);
    //get search input
    var searchInput = document.getElementById("er-search-input").value;

    if (searchInput == '') { // Nothing entered? error
        logErrors('NOINPUT');
        return;
    };
    // Perform the manual search :
    service.textSearch(
        {
            query: searchInput + ' AND vegetarian' + getCuisine() + getVeg(),
            type: ['restaurant'],
            openNow: getOpen()
        },
        function (results, status, pagination) {
            if (status !== 'OK') {
                logErrors(status);
                return;
            }
            // push results to screen
            $("#er-search-results").html(showResults(results)); // push details to screen
            console.log(results);
            createMarkers(results) // Plot markers on the map
            if (window.innerWidth < 576) {
                setTimeout(function () { // wait a bit to show the mapresults
                    showList(slideList()); // then show list
                }, 2000);
            } else {
                showList(slideList());
            }
            // next page assignment
            moreButton.disabled = !pagination.hasNextPage;
            getNextPage = pagination.hasNextPage && function () {
                pagination.nextPage();
            };
        }
    );
};

var infowindow;

function createMarkers(places) { // plot markers to the map
    var bounds = new google.maps.LatLngBounds();
    infowindow = new google.maps.InfoWindow({
        content: ''
    });

    for (let index = 0, place; place = places[index]; index++) {
        let image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };
        let marker = new google.maps.Marker({
            map: map,
            //  label: place.name,
            position: place.geometry.location

        });
        if (place.photos[0] != undefined) {
            var imageUri = place.photos[0].getUrl({ "maxWidth": 100 });
        }

        let starRating = (place.rating * 15).toFixed();
        if (place.price_level != NaN) {
            var priceLevel = (place.price_level * 15).toFixed();
        } else {
            var priceLevel = '0';
        }

        var infoContent = `<div class="er-infowindow-details" onclick="restaurantDetails('${place.place_id}')">
        <h5>${place.name}</h5>
            
                <img src="${imageUri}">
                <div class="er-review-rating" style="width:${starRating}px">
                <img src="assets/images/Rating-Star-PNG-Transparent-Image.png">
                           
            </div>`
        console.log(infoContent);
        //   create infowwindow content

        google.maps.event.addListener(marker, 'click', (function (marker, infoContent, infowindow) {
            return function () {
                infowindow.close()
                infowindow.setContent(infoContent);
                infowindow.open(map, marker);
                map.setCenter(place.geometry.location);
            };
        })(marker, infoContent, infowindow));

        $("#" + place.place_id).click(function () { // click-event for list-item
            $("#" + place.place_id).next().slideToggle(); // make listitem collapsible
            $("#" + place.place_id).toggleClass("active"); // highlight list item
            infowindow.close();
            infowindow.setContent(place.name);
            infowindow.open(map, marker);
            map.setCenter(place.geometry.location);
        })



        bounds.extend(place.geometry.location);
    };
    map.fitBounds(bounds);
};


var id;
function initDirectionMap(placeId) {
    showDirections();
    navigator.geolocation.clearWatch(id);
    checkGeo(function (currentLat, currentLong) { // get current location

        calcRoute(placeId, currentLat, currentLong); // on succes plot route
    });
}



function calcRoute(placeId, currentLat, currentLong) {
    console.log('bey');
    var directionMap = new google.maps.Map(document.getElementById('direction-map'), mapOptions());

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var mapCenter = new google.maps.LatLng(currentLat, currentLong);
    directionsRenderer.setMap(directionMap);
    var start = `{ location: { lat: ${currentLat}, lng: ${currentLong}
    }
} `;
    var end = `{ place_id: "${placeId}" } `;
    var request = {
        origin: { lat: currentLat, lng: currentLong },
        destination: { 'placeId': placeId },
        travelMode: getVehicle()
    };
    function moveMarker(currentLat, currentLong) {
        marker.setPosition(currentLat, currentLong);
    }
    directionsService.route(request, function (result, status) {
        if (status !== 'OK') {
            logErrors(status);
            return;
        }
        console.log(result.routes[0].legs[0]); // direction instructions 
        directionsRenderer.setDirections(result);
    });
    var marker = new google.maps.Marker({ // place blue marker on current position
        map: directionMap,
        icon: { url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" },
        position: { lat: currentLat, lng: currentLong }
    });
    // change blue marker everytime the users moves
    //   navigator.geolocation.watchPosition((function (position) {
    //       id = marker.setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
    //   }));
}







