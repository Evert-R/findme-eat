function showResults(restaurants) {
    if (restaurants.length == 0) {
        return `<h2>Nothing to show</h2>`;
    }

    let listItems = restaurants.map(function (restaurant) {
        // let imageUri = "";
        imageUri = restaurant.photos[0].getUrl({ "maxWidth": 600, "maxHeight": 600 });



        // generate open icon
        if (restaurant.opening_hours.open_now == true) {
            var openNow = `<i class="fa fa-check er-list-icon er-open"></i>`
        } else {
            var openNow = `<i class="fa fa-times-circle er-list-icon er-closed"></i>`
        };
        // generate extra detail click from the place_id

        var expandId = restaurant.place_id.replace(/[^0-9a-z]/gi, ''); //remove unanted characters
        // if (restaurant.place_id) {
        //     var expandDetails = `onclick="$(${expandId}).removeClass('d-none');"`;
        // } else {
        //     var expandDetails = ``;
        //  };

        // generat html list items
        return `<div class="collapsible"> 
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
                    <i class="fa fa-money er-list-icon"></i>
                </td>
                <td class="er-cell-open">
                    ${openNow}
                </td>          
            </tr>
        </table>
        </div>     

        <div class="er-list-details">
           
                <img src="${imageUri}" class="er-list-image">
          
                <div class="er-detail-name" id="${expandId}">
                    ${restaurant.formatted_address}                    
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