function logErrors(status, source) { // error handling based on source
    stopWaitScreen(); // hide preloader
    switchSection('error');
    if (source == 'route') { // errors specific to the directions api
        if ((status == 'MAX_ROUTE_LENGTH_EXCEEDED') || (status == 'ZERO_RESULTS') || (status == 'INVALID_REQUEST')) {
            return $("#er-error").html(`Sorry, but that's<br>way too far<br>to get something<br>to eat<br><br>Consider trying<br>something local ;-)<br>↓<br><div class="er-geo-button" id="er-geo-error" onclick="checkGeo(geoSearch)"><i aria-hidden="true" class="fab fa-sith"></i><span class="sr-only">Do a new search around you</span></div>`);
        } else if (status == 'NOGEO') {
            return $("#er-error").html(`Sorry<br>We can't see<br>where you are<br><br>Please<br>turn on your location<br>and try again`);
        }
    } else if (source == 'place') { // errors specific to the places api
        if (status == 'ZERO_RESULTS') {
            return $("#er-error").html(`Sorry, Nothing found.<br><br>Try adjusting your settings.<br>Then Try again<br>↓<br><div class="er-geo-button" id="er-geo-error" onclick="checkGeo(geoSearch)"><i aria-hidden="true" class="fab fa-sith"></i><span class="sr-only">Do a new search around you</span></div><br>or search in another city<br>↓`);
        } else if (status == 'INVALID_REQUEST') {
            return $("#er-error").html(`Sorry, we don't understand.<br><br>Try a different place.`);
        }
    }
    if (status == 'OVER_QUERY_LIMIT') { // general error codes
        return $("#er-error").html(`Sorry, too many queries.<br><br>Please, come back a bit later.`);
    } else if (status == 'REQUEST_DENIED') {
        return $("#er-error").html(`Sorry, The server denied the request.<br><br>Please, come back a bit later.`);
    } else if (status == 'NOINPUT') {
        return $("#er-error").html(`Sorry, we didn't get that<br><br>Click here<br>to search your Area<br>↓<br><div class="er-geo-button" id="er-geo-error" onclick="checkGeo(geoSearch)"><i aria-hidden="true" class="fab fa-sith"></i><span class="sr-only">Do a new search around you</span></div><br>or search Worldwide<br>↓`);
    } else if (status == 'NOGEO') {
        return $("#er-error").html(`We can't see<br>where you are<br>Please do a<br>manual search`);
    } else {
        return $("#er-error").html(`Sorry, We don't know what happened here.<br><br>Please, come back a bit later.`);
    }
}