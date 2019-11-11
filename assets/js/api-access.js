function restaurantDetails(place_id) {
    showDetails();
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    var requestDetails = {
        placeId: place_id,
        fields: ['address_components', 'adr_address', 'formatted_address', 'geometry', 'icon', 'name', 'permanently_closed', 'photos', 'place_id', 'plus_code', 'type', 'url', 'utc_offset', 'vicinity']
    };

    service = new google.maps.places.PlacesService(map);
    service.getDetails(requestDetails, callback);

    function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {

            console.log(place);
            let photoItems = place.photos.map(function (photo) {
                imageUri = photo.getUrl({ "maxWidth": 600, "maxHeight": 600 });
                return `<div><img src="${imageUri}"></div>`
            });

            let placeTypes = place.types.map(function (placeType) {

                return `<div>${placeType}</div>`
            });

            $("#er-details-section").html(`
            <table class="er-list-table">
                <tr>
                    <td class="er-details-name">
                    <h2>${place.name}</h2>
                    </td>
                </tr>
                <tr>
                    <td class="er-details-adress">
                    ${place.address_components[1].long_name}
                    ${place.address_components[0].long_name}<br>
                    ${place.address_components[6].long_name}
                    ${place.address_components[3].long_name}<br>
                    ${place.address_components[5].long_name}<br>
                    </td>
                    <td class="er-details-photo">
                        
                    </td>
                </tr>
                <tr>
                    <td class="er-details-photos">
                        ${placeTypes.join("\n")} 
                    </td>
                </tr>
                <tr>
                    <td class="er-details-photos">
                        ${photoItems.join("\n")} 
                    </td>
                </tr>
            </table>
            
            <div class="er-details-photos">${photoItems.join("\n")}</div>   
            <div>${place.address_components.long_name}</div>
            <div>${place.adr_address}</div>
            <div>${place.formatted_address}</div>
            <div>${place.geometry.location}</div>
            <div>${place.icon}</div>
            <div>${place.name}</div>
            <div>${place.permanently_closed}</div>
            <div>${place.photos}</div>
            <div>${place.place_id}</div>
            <div>${place.plus_code}</div>
            <div>${place.type}</div>
            <div>${place.url}</div>
            <div>${place.utc_offset}</div>
            <div>${place.vicinity}</div>
            <div>${photoItems}</div>        
            `);
        };
    }
}

function showResults(restaurants) {
    if (restaurants.length == 0) {
        return `<h2>Nothing to show</h2>`;
    }

    let listItems = restaurants.map(function (restaurant) {


        //let imageUri = "";
        imageUri = restaurant.photos[0].getUrl({ "maxWidth": 600, "maxHeight": 600 });
        // generate detail link

        // generate open icon
        if (restaurant.opening_hours.open_now == true) {
            var openNow = `<i class="fa fa-check er-list-icon er-open"></i>`
        } else {
            var openNow = `<i class="fa fa-times-circle er-list-icon er-closed"></i>`
        };
        // generate extra detail click from the place_id
        let svgRating = ((restaurant.rating - 3) * 35);
        let svgPrice = ((restaurant.price_level) * 14);
        var expandId = restaurant.place_id.replace(/[^0-9a-z]/gi, ''); //remove unwanted characters

        // generate html list items
        return `<div class="er-list collapsible"> 
            <table class="er-list-table">
            <tr>
                <td class="er-cell-image">
                    <img src="${imageUri}" class="er-list-image">
                </td>
                <td class="er-cell-name">
                    <div class="er-list-name">
                        <h3>${restaurant.name}</h3>
                    </div>                    
                </td>


                <td class="er-cell-svg">
                    Rating:
                    <svg>
                        <rect width="150" height="8"  style="fill:grey"/>
                        <rect width="${svgRating}" height="8"  style="fill:green"/>
                                                                 
                    </svg>
                    Price:
                    <svg>
                        <rect width="150" height="8"  style="fill:grey"/>
                        <rect width="${svgPrice}" height="8" style="fill:red"/>
                    </svg>  
                </td>
                <td class="er-cell-open">
                    ${openNow}
                </td>          
            </tr>
        </table>
        </div>     

        <div class="er-list-collapse">
            <table class="er-list-table">
                <tr>
                    <td class="er-collapse-details" >
                    <div onclick="restaurantDetails('${restaurant.place_id}')">
                        <button><i class="fa fa-info"></i></button>
                    </div>
                    <div onclick="initDirectionMap('${restaurant.place_id}')">    
                        <button><i class="fas fa-directions"></i></button>
                    </div>
                        </td>
                    <td class="er-collapse-image">
                        <img src="${imageUri}">
                    </td>
                </tr>
            </table>
                   
        </div>
         
                   
            
        </div>`
    });

    return `
        <div class="er-item-list">
        <table class="er-list-table">
        <tr>
            <th class="er-cell-image">
              
            </th>
            <th class="er-cell-topname">
                    <p class="er-table-top">Name :</p>            
            </th>


            <th class="er-cell-svg">
            <p class="er-table-top">Rating/price:</p>
            </td>
            <th class="er-cell-open">
            <p class="er-table-top">Open?</p>
            </td>          
        </tr>
    </table>
                       
                ${listItems.join("\n")}      
            
            
        </div>
    `
}



// get current location
function checkGeo(callback) {
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        var currentLat = position.coords.latitude;
        var currentLong = position.coords.longitude;


        callback(position.coords.latitude, position.coords.longitude);

    });
};

function manualSearch() {
    var searchInput = document.getElementById("er-search-input").value;
    // Create the places service.
    var service = new google.maps.places.PlacesService(map);
    var getNextPage = null;
    var moreButton = document.getElementById('more');
    moreButton.onclick = function () {
        moreButton.disabled = true;
        if (getNextPage) getNextPage();
    };
    service.textSearch(
        { query: searchInput + ' vegetarian', type: ['restaurant'] },
        function (results, status, pagination) {
            if (status !== 'OK') return;
            // Do something with the results
            $("#er-search-results").html(showResults(results)); // push details to screen


            console.log(results);
            createMarkers(results) // Plot markers on the map
            setTimeout(function () { // wait a bit to show the mapresults
                showList(collapse('collapsible')); // then show list

            }, 2500);



            moreButton.disabled = !pagination.hasNextPage;
            getNextPage = pagination.hasNextPage && function () {
                pagination.nextPage();
            };
        }
    );
};

function GeoSearch(currentLat, currentLong) {
    // Create the places service.
    var service = new google.maps.places.PlacesService(map);
    var getNextPage = null;
    var moreButton = document.getElementById('more');
    moreButton.onclick = function () {
        moreButton.disabled = true;
        if (getNextPage) getNextPage();
    };
    // Perform a nearby search.
    console.log(currentLat);
    service.nearbySearch(
        { location: { lat: currentLat, lng: currentLong }, radius: 500, type: ['restaurant'], keyword: ['vegetarian'] },
        function (results, status, pagination) {
            if (status !== 'OK') return;
            // Do something with the results
            $("#er-search-results").html(showResults(results)); // push details to screen

            console.log(results)
            createMarkers(results) // Plot markers on the map


            setTimeout(function () { // wait a bit to show the mapresults
                showList(collapse('collapsible')); // then show list

            }, 2500);




            // show the list with results
            moreButton.disabled = !pagination.hasNextPage;
            getNextPage = pagination.hasNextPage && function () {
                pagination.nextPage();
            };

        });
}




// jsonMap();

function initMap(currentLat, currentLong) {
    // Get input from input field
    showMap(); //show map so the markers can fit the bounds
    // Create the map.
    map = new google.maps.Map(document.getElementById('map'), {
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
    });

    if (typeof currentLat !== 'undefined' && typeof currentLong !== 'undefined') {
        GeoSearch(currentLat, currentLong)
    } else {
        manualSearch();
    }
};

function createMarkers(places) {
    var bounds = new google.maps.LatLngBounds();


    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
        });
        bounds.extend(place.geometry.location);
    };

    map.fitBounds(bounds);
};

function initDirectionMap(placeId) {
    checkGeo(function (currentLat, currentLong) {
        if (typeof currentLat !== 'undefined' && typeof currentLong !== 'undefined') {
            calcRoute(placeId, currentLat, currentLong);
        } else {
            showList();
        }

    });



    console.log(placeId);

}

function calcRoute(placeId, currentLat, currentLong) {



    showDirections();
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(currentLat, currentLong);
    var mapOptions = {
        zoom: 7,
        center: chicago,
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
    var directionMap = new google.maps.Map(document.getElementById('direction-map'), mapOptions);
    directionsRenderer.setMap(directionMap);
    console.log(placeId);

    var start = `{location: {lat:${currentLat}, lng:${currentLong}}}`;
    var end = `{place_id: "${placeId}"}`;
    var request = {
        origin: { lat: currentLat, lng: currentLong },
        destination: { 'placeId': placeId },
        travelMode: 'DRIVING'
    };
    console.log(request);
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections(result);
        } else {
            console.log(status)
        }
    });
}




var map; // create map variable

// checkGeo(initMap); // check location, if present do geo search
// jsonMap();


function jsonMap() {

    $.when(
        $.get(`assets/data/leiden.json`)
    ).then(
        // make variable of data
        function (response) {
            var searchResults = response;



            // push searchResults to div

            $("#er-search-results").html(showResults(searchResults))


            collapse()

        },
        // error handling
        function (errorResponse) {
            if (errorResponse.status === 404) {
                $("#er-api-data").html(
                    `<h2>No info found for leiden</h2>`);


            } else if (errorResponse.status === 403) {
                var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset') * 1000);
                $("#er-api-data").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`);
            } else {
                console.log(errorResponse);
                $("#er-api-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            };

        });

};