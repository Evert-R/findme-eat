function showResults(restaurants) {
    if (restaurants.length == 0) {
        return `<h2>Nothing to show</h2>`;
    }

    let listItems = restaurants.map(function (restaurant) {
        return `<tr>
            <td>
                ${restaurant.name}
            </td>
            <td>
                ${restaurant.formatted_address}
            </td>
            <td>
                ${restaurant.rating}
            </td>           
        </tr>`
    });

    return `
        <div class="er-item-list">
            <table>            
                ${listItems.join("\n")}      
            </table>
        </div>
    `
}

var map;

function initMap() {
    // Get input from input field
    let searchInput = document.getElementById("er-search-input").value;
    // Create the map.
    map = new google.maps.Map(document.getElementById('map'), {

        zoom: 17
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

    service.textSearch(
        { query: searchInput + ' vegetarian', type: ['restaurant'] },
        function (results, status, pagination) {
            if (status !== 'OK') return;
            $("#er-search-results").html(showResults(results));
            console.log(results);
            createMarkers(results);
            moreButton.disabled = !pagination.hasNextPage;
            getNextPage = pagination.hasNextPage && function () {
                pagination.nextPage();
            };
        });
}


function jsonMap() {

    $.when(
        $.get(`assets/data/leiden.json`)
    ).then(
        // make variable of data
        function (response) {
            var searchResults = response;



            // push searchResults to div
            $("#er-search-results").html(showResults(searchResults));


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

        zoom: 17
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
    }
    map.fitBounds(bounds);
}

jsonMap();