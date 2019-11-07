function restaurantDetails(place_id) {
    showDetails();
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

                <td class="er-cell-rating">
                    ${restaurant.rating}
                </td>
                <td class="er-cell-price">
 
                    <div>
                        <i class="fa fa-money er-list-icon"></i>
                    </div>
                    <div>
                        ${restaurant.rating}
                    </div>
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
                        <i class="fa fa-eye er-details-icon"></i>
                    </div>
                    <div>    
                        <i class="fa fa-map er-details-icon"></i>
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
                       
                ${listItems.join("\n")}      
            
            
        </div>
    `
}

var map; // create map variable

// get current location
function checkGeo() {
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        var currentLat = position.coords.latitude;
        var currentLong = position.coords.longitude;
        var currentLoc = `{lat: ${currentLat}, lng: ${currentLong}}`;
        initMap(currentLat, currentLong);
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
            collapse(); // assign the collapse function to classes

            console.log(results);
            createMarkers(results); // create the markers on the map
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
            collapse(); // assign the collapse function to classes
            console.log(results)
            createMarkers(results);
            moreButton.disabled = !pagination.hasNextPage;
            getNextPage = pagination.hasNextPage && function () {
                pagination.nextPage();
            };
        });
}


checkGeo();
// jsonMap();

function initMap(currentLat, currentLong) {
    // Get input from input field

    // Create the map.
    map = new google.maps.Map(document.getElementById('map'), {
        styles: [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{ color: '#263c3f' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#6b9a76' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#38414e' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#212a37' }]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9ca5b3' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{ color: '#746855' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#1f2835' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#f3d19c' }]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{ color: '#2f3948' }]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#17263c' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#515c6d' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#17263c' }]
            }
        ]
    });

    if (typeof currentLat !== 'undefined' && typeof currentLong !== 'undefined') {
        GeoSearch(currentLat, currentLong)
    } else {
        manualSearch();
    }
};


function jsonMap() {

    $.when(
        $.get(`assets/data/leiden.json`)
    ).then(
        // make variable of data
        function (response) {
            var searchResults = response;



            // push searchResults to div
            $.when(
                $("#er-search-results").html(showResults(searchResults))
            ).then(
                collapse()
            )
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


    // Create the map.
    map = new google.maps.Map(document.getElementById('map'), {

        zoom: 12,
        styles: [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{ color: '#263c3f' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#6b9a76' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#38414e' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#212a37' }]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9ca5b3' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{ color: '#746855' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#1f2835' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#f3d19c' }]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{ color: '#2f3948' }]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#17263c' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#515c6d' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#17263c' }]
            }
        ]
    });

    // Create the places service.
    var service = new google.maps.places.PlacesService(map);
    var getNextPage = null;
    var moreButton = document.getElementById('more');
    moreButton.onclick = function () {
        moreButton.disabled = true;
        if (getNextPage) getNextPage();
    };

    // Perform a nearby search.

    createMarkers(searchResults);
    moreButton.disabled = !pagination.hasNextPage;
    getNextPage = pagination.hasNextPage && function () {
        pagination.nextPage();

    }
}

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


// jsonMap();
