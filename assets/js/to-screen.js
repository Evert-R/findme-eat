function showResults(restaurants, currentPosition, searchInput) { // push searchresults to the screen
    // prepare variables to display above the list
    if ($("#vegan").is(":checked")) {
        var veg = ` and vegan`;
    } else {
        var veg = '';
    }
    let cuisine = $("#er-cuisine").children("option:selected").val();
    let searchArgument; // will be displayed above the list
    //  prepare search argument
    if (currentPosition != 'NOGEO') {
        searchArgument = `We searched for vegetarian ${veg} ${cuisine} restaurants in a ${getRadius()} meter radius around you`
    } else {
        searchArgument = `We searched for vegetarian ${veg} ${cuisine}restaurants in ${searchInput}`
    }

    let listItems = restaurants.map(function (restaurant) { // Create list-item per restaurant
        // Prepare variables for display in the list items
        if (restaurant.hasOwnProperty('photos')) { // if photo exists get url
            var imageUri = restaurant.photos[0].getUrl({ "maxWidth": 600, "maxHeight": 600 });
        } else {
            var imageUri = 'assets/images/Restaurant-icon.png';
        }

        // generate open/closed icon
        if (restaurant.hasOwnProperty('opening_hours')) { // check if opening hours are present (turned off november 2020)
            if (restaurant.opening_hours.open_now == true) { // set open now
                var openNow = `<i aria-hidden="true" class="fa fa-check er-list-icon er-open"></i><span class="sr-only">Open Now</span>`
            } else { // set closed now
                var openNow = `<i aria-hidden="true" class="fa fa-times-circle er-list-icon er-closed"></i><span class="sr-only">Closed Now</span>`
            }
        } else { // leave blank
            var openNow = ``;
        }
        // prepare adress 
        if (restaurant.hasOwnProperty('vicinity')) {
            var address = '<i aria-hidden="true" class="fa fa-globe er-clock er-list-icon"></i><span class="sr-only">Adress of restaurant</span> ' + restaurant.vicinity
        } else if (restaurant.hasOwnProperty('formatted_address')) {
            var address = '<i aria-hidden="true" class="fa fa-globe er-clock er-list-icon"></i><span class="sr-only">Adress of restaurant</span> ' + restaurant.formatted_address
        } else {
            var address = ''
        }

        // Generate rating width for stars
        let starRating = (restaurant.rating * 20).toFixed();
        // generate price level width
        if (restaurant.price_level != NaN) {
            var priceLevel = (restaurant.price_level * 20).toFixed();
        } else {
            var priceLevel = '0';
        }

        // calculate the distance to the restaurant
        let distance;
        if (currentPosition != 'NOGEO') {
            distance = (google.maps.geometry.spherical.computeDistanceBetween(currentPosition, restaurant.geometry.location) / 1000).toFixed(2) + ` km  <i aria-hidden="true" class="fa fa-plane er-clock er-list-icon"></i><span class="sr-only">distance to restaurant</span>`;
        } else {
            distance = ''
        };

        // generate html list items
        return `
                <div class="er-list"  id="${restaurant.place_id}"> 
                    <table class="er-list-table">
                        <tr>
                            <td class="er-cell-image">
                                <div class="er-round-image">
                                    <img src="${imageUri}" alt="Restaurant photo" class="er-list-image">
                                </div>    
                            </td>
                            <td class="er-cell-name">
                                <div class="er-list-name">
                                    <h3>${restaurant.name}</h3>
                                    <p class="er-distance">${distance}</p>
                                    <p class="er-address">${address}</p>
                                </div>                    
                            </td>
                            <td class="er-cell-rating">
                                <p>Rating :</p>    
                                <div class="er-rating-list">
                                    <div class="er-rating-container" style="width:${starRating}%">                                        
                                    </div>
                                </div>
                                <p>price :</p> 
                                <div class="er-price-list">
                                   
                                    <div class="er-price-container" style="width:${priceLevel}%">                                        
                                    </div>
                                </div>                    
                            </td>
                            <td class="er-cell-open">
                                <i aria-hidden="true" class="fa fa-clock er-clock er-list-icon"></i><br><br>
                                <span class="sr-only">Open / closed</span>
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
                                <img src="${imageUri}" alt="Restaurant photo">
                            </td>
                        </tr>
                    </table>                        
                </div>
            </div>
            `});
    // Put items together
    return `
            <div class="er-item-list">
                <div class="er-search-argument">
                    ${searchArgument}
                </div>
                ${listItems.join("\n")}           
            </div>
            `
}

function showRestaurantDetails(place, status) { // push restaurant details to the screen

    if (status == google.maps.places.PlacesServiceStatus.OK) { // check if error

        // Prepare variables for detail page

        if (place.hasOwnProperty('photos')) {
            let items = place.photos.map(function (photo) { // create list of photos
                imageUri = photo.getUrl({ "maxWidth": 600, "maxHeight": 600 });
                return `<div class="col-12 er-details-photo"><img src="${imageUri}" alt="Restaurant photo"></div>`
            });
            var photoItems = items.join("\n");
            // use first photo for the details page background
            var backGround = "url('" + place.photos[0].getUrl({ "maxWidth": 600, "maxHeight": 600 }) + ")";
            $("#er-details-section").css("background-image", backGround);
        } else photoItems = '';

        // create list of opening hours
        if (place.hasOwnProperty('opening_hours')) {
            let hours = place.opening_hours.weekday_text.map(function (hours) {
                return `<p>${hours}</p>`
            });
            var openingHours = hours.join("\n");
        } else {
            var openingHours = '';
        }

        if (place.hasOwnProperty('adr_address')) {
            var fullAddress = place.adr_address.split(","); // create adress array
        }
        if (place.hasOwnProperty('website')) {
            var webSite = `<a href="${place.website}" target="blank">
                                <button>
                                    <i aria-hidden="true" class="fas fa-globe"></i>                         
                                    <span class="sr-only">Goto the website</span>
                                </button>
                            </a>`
        } else {
            var webSite = '';
        }

        if (place.hasOwnProperty('reviews')) {
            var latestRating = (place.reviews[0].rating * 20).toFixed(); // generate latest rating width
            // prepare latest review excerpt
            var latestReview = place.reviews[0].text.slice(0, 160) + `.....<p class="er-read-more" onclick="showReviews()">read more</p>`;
            // create review section
            var reviews = place.reviews.map(function (review, index) { // cycle through reviews
                let starRating = (review.rating * 20).toFixed(); // prepare star rating width
                if (index % 2 == 0) { // mirror reviews based on even/uneven
                    // return the reviews
                    return `
                    <div class="er-reviews-wrapper">
                        <table class="er-reviews-table">
                            <tr>
                                <td class="er-cell-2third-left">
                                    <p class="er-reviews-name">${review.author_name}</p>
                                </td>
                                <td class="er-cell-third er-review-photo">
                                    <img src="${review.profile_photo_url}" alt="Reviewers profile picture">
                                </td>

                            </tr>
                        </table>    
                        <table class="er-reviews-table">    
                            <tr>
                                <td class="er-cell-2third-left">
                                    <div class="er-review-text">
                                        <div>${review.text}</div>
                                    </div>
                                </td>
                                <td class="er-cell-third">
                                    <div class="er-review-details">
                                        <div class="er-reviewdetails-container" style="width:${starRating}px">                                            
                                        </div>
                                    </div>
                                    <p>${review.relative_time_description}</p>   
                                </td>
                            </tr>
                        </table>
                    </div>
                        `} else {
                    return `
                     <div class="er-reviews-wrapper">
                        <table class="er-reviews-table">
                                <tr>
                                    <td class="er-cell-third er-review-photo">
                                        <img src="${review.profile_photo_url}" alt="Reviewers profile picture">
                                    </td>
                                    <td class="er-cell-2third-right">
                                       <p class="er-reviews-name">${review.author_name}</p>
                                    </td>
                                </tr>
                                </table>    
                        <table class="er-reviews-table">    
                                    <tr>                                        
                                        <td class="er-cell-third">
                                            <div class="er-review-details">
                                                <div class="er-reviewdetails-container" style="width:${starRating}px">                                            
                                            </div>
                                        </div>
                                            <p>${review.relative_time_description}</p>   
                                        </td>
                                        <td class="er-cell-2third-right">
                                            <div class="er-review-text">
                                                <div>${review.text}</div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                        </div>    
                                `}
            });
            var reviewList = reviews.join("\n");
        } else {
            reviewList = '';
        }

        // push details to screen
        $("#er-details").html(`
            <div class="er-details-title" onclick="switchSection('details')">
                <h2>${place.name}</h2>
            </div>

            <div id="er-details-main">
                <div class="er-reviews-mainwrap">
                <table class="er-reviews-table">
                    <tr>
                        <td class="er-cell-third er-review-photo">
                            <img src="${place.reviews[0].profile_photo_url}" alt="Reviewers profile picture">
                            <div class="er-review-details">
                                <div class="er-reviewdetails-container" style="width:${latestRating}px">
                                </div>
                            </div>
                        </td>
                        <td class="er-cell-2third-right">
                            <div class="er-review-text">
                                <div>${latestReview}</div>
                            </div>   
                        </td>
                    </tr>
                </table>
            </div>
            <div class="er-reviews-mainwrap">
                <table class="er-details-table">
                    <tr>
                        <td class="er-cell-third er-details-address">
                            ${fullAddress.join("<br>")}
                        </td>
                        <td class="er-cell-2third-right er-details-icons">
                            ${webSite}                             
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
                    ${openingHours}
               </div>
            <div class="er-reviews-mainwrap">
                <div class="col-12 er-details-photo">
                    </div>
                </div>
            </div>
            <div id="er-details-reviews">
                <div class="er-details-title" onclick="switchSection('details')">
                    <h2>↓</h2>
                </div>
                    ${reviewList}
                </div>
                <div id="er-details-photos">
                <div class="er-details-title" onclick="switchSection('details')">
                    <h2>↓</h2>
                </div>
                    ${photoItems} 
                </div>
            `);
    } else {
        showErrors(status); // if there was a api error goto error section
    };
    switchSection('details'); // show the details page
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
    switchSection('error');
    console.log(status, source);
    if (source == 'route') { // errors specific to the directions api
        if ((status == 'MAX_ROUTE_LENGTH_EXCEEDED') || (status == 'ZERO_RESULTS') || (status == 'INVALID_REQUEST')) {
            return $("#er-error").html(`Sorry, but that's<br>way too far<br>to get something<br>to eat<br><br>Consider to try<br>something local ;-)<br>↓<br><button onclick="checkGeo(geoSearch)"><i aria-hidden="true" class="fab fa-sith"></i><span class="sr-only">Do a new search around you</span></button>`)
        }
    } else if (source == 'place') { // errors specific to the places api
        if (status == 'ZERO_RESULTS') {
            return $("#er-error").html(`Sorry, Nothing found.<br><br>Try adjusting your settings.<br>Then Try again<br>↓<br><button onclick="checkGeo(geoSearch)"><i aria-hidden="true" class="fab fa-sith"></i><span class="sr-only">Do a new search around you</span></button><br>or search in another city<br>↓`)
        } else if (status == 'INVALID_REQUEST') {
            return $("#er-error").html(`Sorry, we don't understand.<br><br>Try a different place.`)
        }
    }
    if (status == 'OVER_QUERY_LIMIT') { // general error codes
        return $("#er-error").html(`Sorry, too many queries.<br><br>Please, come back a bit later.`)
    } else if (status == 'REQUEST_DENIED') {
        return $("#er-error").html(`Sorry, The server denied the request.<br><br>Please, come back a bit later.`)
    } else if (status == 'NOINPUT') {
        return $("#er-error").html(`Sorry, we didn't get that<br>Where do you<br>want to eat ?<br><br>You can also<br>do a search around you<br>↓<br><button onclick="checkGeo(geoSearch)"><i aria-hidden="true" class="fab fa-sith"></i><span class="sr-only">Do a new search around you</span></button><br>or search in another city<br>↓`)
    } else if (status == 'NOGEO') {
        return $("#er-error").html(`We can't see<br>where you are<br>Please do a<br>manual search`)
    } else {
        return $("#er-error").html(`Sorry, We don't know what happened here.<br><br>Please, come back a bit later.`)
    }
};