function processResults(results, currentPosition, searchInput) {
    // get the generated resultslist and push to screen
    if (results == undefined) { // extra failsafe
        return logErrors('UNKNOWN_ERROR');
    } else {
        $("#er-search-results").html(showResults(results, currentPosition, searchInput));
        createMarkers(results, currentPosition); // Plot the markers on the map
        if ((window.innerWidth < 768) || ((window.innerWidth < 992) && (window.innerWidth < innerHeight))) { //on single page devices 
            setTimeout(function () { // wait a bit to show the mapresults
                switchSection('results');
                stopWaitScreen(); // hide preloader
                slideList(); // then show list
            }, 2000);
        } else { // on other devices
            switchSection('results'); // show directly
            slideList(); // then show list
            stopWaitScreen(); // hide preloader
        }

    }
}

function moreButton(pagination) {
    // assign the more button
    var getNextPage = null;
    var moreButton = document.getElementById('more');
    moreButton.onclick = function () {
        moreButton.disabled = true;
        if (getNextPage) getNextPage();
    };
    // next page assignment
    moreButton.disabled = !pagination.hasNextPage;
    getNextPage = pagination.hasNextPage && function () {
        pagination.nextPage();
    };
}

function checkSearchInput(searchInput) {
    if (searchInput == '') { // Nothing entered? -> error screen
        logErrors('NOINPUT', 'place');
    } else {
        geoCode(searchInput); // 
    }
}

function geoCode(searchInput) { // convert region/ciry name to coordinates
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': searchInput }, function (results, status) {
        if (status === 'OK') { // do geo search from coordinastes without known current position          
            geoSearch('NOGEO', results[0].geometry.location, searchInput);
        } else { // if nothing is found -> error page
            logErrors('NOINPUT', 'place');
        }
    });
}

function searchDescription(currentPosition, searchInput) {
    // search description above the results list
    let veg = '';
    let cuisine = '';
    let open = ' ';
    if (getVeg() == true) {
        veg = ` and vegan `;
    }
    if (getOpen() == true) {
        open = ` wich are currently open `
    }
    //  prepare search argument
    if (currentPosition != 'NOGEO') {
        return `We searched for vegetarian ${veg} ${getCuisine()} restaurants${open}in a ${getRadius()} meter radius around you`;
    } else {
        return `We searched for vegetarian ${veg} ${getCuisine()} restaurants${open}in ${searchInput} in a ${getRadius()} meter radius`;
    }
}

function getFirstPhoto(restaurant) {
    if (restaurant.hasOwnProperty('photos')) { // if photo exists get url
        return restaurant.photos[0].getUrl({ "maxWidth": 600, "maxHeight": 600 });
    } else {
        return 'assets/images/Restaurant-icon.png';
    }
}

function getOpenNow(restaurant) { // generate open/closed icon
    if (restaurant.hasOwnProperty('opening_hours')) { // check if opening hours are present (turned off november 2020)        
        if (restaurant.opening_hours.open_now == true) { // set open now
            return `<i aria-hidden="true" class="fa fa-check er-list-icon er-open"></i><span class="sr-only">Open Now</span>`;
        } else { // set closed now
            return `<i aria-hidden="true" class="fa fa-times-circle er-list-icon er-closed"></i><span class="sr-only">Closed Now</span>`;
        }
    } else { // leave blank
        return ``;
    }
}
function getAddress(restaurant) { // generate address string 
    if (restaurant.hasOwnProperty('vicinity')) {
        return '<i aria-hidden="true" class="fa fa-globe er-clock er-list-icon"></i><span class="sr-only">Adress of restaurant</span> ' + restaurant.vicinity;
    } else if (restaurant.hasOwnProperty('formatted_address')) {
        return '<i aria-hidden="true" class="fa fa-globe er-clock er-list-icon"></i><span class="sr-only">Adress of restaurant</span> ' + restaurant.formatted_address;
    } else {
        return '';
    }
}

function getStarRating(restaurant) {
    return (restaurant.rating * 20).toFixed();
}

function getPriceLevel(restaurant) {
    if (isNaN(restaurant.price_level) == false) {
        return (restaurant.price_level * 20).toFixed();
    } else {
        return 0;
    }
}

function getDistance(currentPosition, restaurant) {
    if (currentPosition != 'NOGEO') {
        return (google.maps.geometry.spherical.computeDistanceBetween(currentPosition, restaurant.geometry.location) / 1000).toFixed(2) + ` km  <i aria-hidden="true" class="fa fa-plane er-clock er-list-icon"></i><span class="sr-only">distance to restaurant</span>`;
    } else {
        return '';
    }
}