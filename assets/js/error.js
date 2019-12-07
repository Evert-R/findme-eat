function logErrors(status, source) {
    stopWaitScreen(); // hide preloader
    switchSection('error');
    console.log(status, source);
    if (source == 'route') { // errors specific to the directions api
        if ((status == 'MAX_ROUTE_LENGTH_EXCEEDED') || (status == 'ZERO_RESULTS') || (status == 'INVALID_REQUEST')) {
            return $("#er-error").html(`Sorry, but that's<br>way too far<br>to get something<br>to eat<br><br>Consider to try<br>something local ;-)<br>↓<br><button onclick="checkGeo(geoSearch)"><i aria-hidden="true" class="fab fa-sith"></i><span class="sr-only">Do a new search around you</span></button>`);
        } else if (status == 'NOGEO') {
            return $("#er-error").html(`Sorry<br>We can't see<br>where you are<br><br>Please<br>turn on your location<br>and try again`);
        }
    } else if (source == 'place') { // errors specific to the places api
        if (status == 'ZERO_RESULTS') {
            return $("#er-error").html(`Sorry, Nothing found.<br><br>Try adjusting your settings.<br>Then Try again<br>↓<br><button onclick="checkGeo(geoSearch)"><i aria-hidden="true" class="fab fa-sith"></i><span class="sr-only">Do a new search around you</span></button><br>or search in another city<br>↓`);
        } else if (status == 'INVALID_REQUEST') {
            return $("#er-error").html(`Sorry, we don't understand.<br><br>Try a different place.`);
        }
    }
    if (status == 'OVER_QUERY_LIMIT') { // general error codes
        return $("#er-error").html(`Sorry, too many queries.<br><br>Please, come back a bit later.`);
    } else if (status == 'REQUEST_DENIED') {
        return $("#er-error").html(`Sorry, The server denied the request.<br><br>Please, come back a bit later.`);
    } else if (status == 'NOINPUT') {
        return $("#er-error").html(`Sorry, we didn't get that<br>Where do you<br>want to eat ?<br><br>You can also<br>do a search around you<br>↓<br><button onclick="checkGeo(geoSearch)"><i aria-hidden="true" class="fab fa-sith"></i><span class="sr-only">Do a new search around you</span></button><br>or search in another city<br>↓`);
    } else if (status == 'NOGEO') {
        return $("#er-error").html(`We can't see<br>where you are<br>Please do a<br>manual search`);
    } else {
        return $("#er-error").html(`Sorry, We don't know what happened here.<br><br>Please, come back a bit later.`);
    }
}