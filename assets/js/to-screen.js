function showResults(restaurants, currentPosition, searchInput) { // push searchresults to the screen
    let listItems = restaurants.map(function (restaurant) { // Create list-item per restaurant
        return `
                <div class="er-list"  id="${restaurant.place_id}"> 
                    <table class="er-list-table">
                        <tr>
                            <td class="er-cell-image">
                                <div class="er-round-image">
                                    <img src="${getFirstPhoto(restaurant)}" alt="Restaurant photo" class="er-list-image">
                                </div>    
                            </td>
                            <td class="er-cell-name">
                                <div class="er-list-name">
                                    <h3>${restaurant.name}</h3>
                                    <p class="er-distance">${getDistance(currentPosition, restaurant)}</p>
                                    <p class="er-address">${getAddress(restaurant)}</p>
                                </div>                    
                            </td>
                            <td class="er-cell-rating">
                                <p>Rating :</p>    
                                <div class="er-rating-list">
                                    <div class="er-rating-container" style="width:${getStarRating(restaurant)}%">                                        
                                    </div>
                                </div>
                                <p>price :</p> 
                                <div class="er-price-list">
                                   
                                    <div class="er-price-container" style="width:${getPriceLevel(restaurant)}%">                                        
                                    </div>
                                </div>                    
                            </td>
                            <td class="er-cell-open">
                                <i aria-hidden="true" class="fa fa-clock er-clock er-list-icon"></i><br><br>
                                <span class="sr-only">Open / closed</span>
                                ${getOpenNow(restaurant)}
                            </td>          
                        </tr>
                    </table>
                </div>  
                <div class="er-list-collapse">
                    <table class="er-list-table">
                        <tr>
                            <td class="er-collapse-details" >
                            <div onclick="restaurantDetails('${restaurant.place_id}')">
                                <button>
                                    <i aria-hidden="true" class="fa fa-info"></i>
                                    <span class="sr-only">View restaurant details</span>
                                </button>
                            </div>
                            <div onclick="initDirectionMap('${restaurant.place_id}')">    
                                <button>
                                    <i aria-hidden="true" class="fas fa-directions"></i>
                                    <span class="sr-only">Get directions</span>
                                </button>
                            </div>
                                </td>
                            <td class="er-collapse-image">
                                <img src="${getFirstPhoto(restaurant)}" alt="Restaurant photo">
                            </td>
                        </tr>
                    </table>                        
                </div>
            </div>
            `;
    });
    // Put items together
    return `
            <div class="er-item-list">
                <div class="er-search-argument">
                    ${searchDescription(currentPosition, searchInput)}
                </div>
                ${listItems.join("\n")}           
            </div>
            `;
}

function showRestaurantDetails(place, status) { // push restaurant details to the screen
    $("#er-details").html(`
            <div class="er-details-title" onclick="switchSection('details')">
                <h2>${place.name}</h2>
            </div>

            <div id="er-details-main">
                <div class="er-reviews-mainwrap">
                    <table class="er-reviews-table">
                        <tr>
                            <td class="er-cell-third er-review-photo">
                                ${latestReviewPhoto(place)}
                                <div class="er-review-details">
                                    ${latestRating(place)}
                                </div>
                            </td>
                            <td class="er-cell-2third-right">
                                <div class="er-review-text">
                                    ${latestReview(place)}
                                </div>   
                            </td>
                        </tr>
                    </table>
                </div>
            
                <div class="er-reviews-mainwrap">
                    <table class="er-details-table">
                        <tr>
                            <td class="er-cell-third er-details-address">
                                ${fullAddress(place)}
                            </td>
                            <td class="er-cell-2third-right er-details-icons">
                                ${webSite(place)}                             
                                <button onclick="showPhotos()">
                                    <i aria-hidden="true" class="fas fa-camera-retro"></i>
                                    <span class="sr-only">Show restaurant photos</span>
                                </button>
                                <button onclick="showReviews()">
                                    <i aria-hidden="true" class="fas fa-comment"></i>
                                    <span class="sr-only">Show restaurant reviews</span>
                                </button> 
                                <button onclick="initDirectionMap('${place.place_id}')">
                                    <i aria-hidden="true" class="fas fa-directions"></i>
                                    <span class="sr-only">Get directions</span>
                                </button>                            
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="er-details-opening">
                        ${openingHours(place)}
                </div>
            
                <div class="er-reviews-mainwrap">
                </div>
            </div>
        <div id="er-details-reviews">
            <div class="er-details-title" onclick="switchSection('details')">
                <h2>↓</h2>
            </div>
            ${reviewList(place)}
        </div>
        <div id="er-details-photos">
            <div class="er-details-title" onclick="switchSection('details')">
                <h2>↓</h2>
            </div>
            ${photoList(place)} 
        </div>
            `);

    switchSection('details'); // show the details page
    setBackground(place);
    stopWaitScreen(); // hide preloader
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

function autoComplete() {
    var sessionToken = new google.maps.places.AutocompleteSessionToken();
    var options = {
        types: ['cities'],
        sessionToken: sessionToken
    };
    var input = document.getElementById('er-search-input');
    new google.maps.places.Autocomplete(input);
    var geocoder = new google.maps.Geocoder();
}

function enterFullscreen() {
    if (document.documentElement.fullscreenEnabled = true) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
            document.documentElement.msRequestFullscreen();
        }
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozExitFullScreen) { /* Firefox */
        document.mozExitFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
}

function logErrors(status, source) {
    stopWaitScreen(); // hide preloader
    switchSection('error');
    console.log(status, source);
    if (source == 'route') { // errors specific to the directions api
        if ((status == 'MAX_ROUTE_LENGTH_EXCEEDED') || (status == 'ZERO_RESULTS') || (status == 'INVALID_REQUEST')) {
            return $("#er-error").html(`Sorry, but that's<br>way too far<br>to get something<br>to eat<br><br>Consider to try<br>something local ;-)<br>↓<br><button onclick="checkGeo(geoSearch)"><i aria-hidden="true" class="fab fa-sith"></i><span class="sr-only">Do a new search around you</span></button>`);
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