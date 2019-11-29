function showResults(restaurants, currentPosition, searchType) { // push searchresults to the screen

    if (restaurants == undefined) {
        logErrors('UNKNOWN_ERROR');
    }
    // prepare variables to display above the list
    if ($("#vegan").is(":checked")) {
        var veg = ` and vegan`;
    } else {
        var veg = '';
    }

    let cuisine = $("#er-cuisine").children("option:selected").val();

    let searchArgument; // will be displayed above the list
    if (searchType == 'geo') {
        searchArgument = `We searched for vegetarian ${veg} ${cuisine} restaurants<br>in a ${getRadius()} meter radius around you`
    } else {
        searchArgument = `We searched for vegetarian ${veg} ${cuisine}<br>restaurants in ${searchType}`
    }

    let listItems = restaurants.map(function (restaurant) { // Create list-item per restaurant
        // Prepare variables for display in the list items
        if (restaurant.photos[0] != undefined) { // if photo exists get url
            var imageUri = restaurant.photos[0].getUrl({ "maxWidth": 600, "maxHeight": 600 });
        }
        // generate open icon
        if (restaurant.hasOwnProperty('opening_hours')) { // check if opening hours are present
            if (restaurant.opening_hours.open_now == true) { // set open now
                var openNow = `<i aria-hidden="true" class="fa fa-check er-list-icon er-open"></i><span class="sr-only">Open Now</span>`
            } else { // set closed now
                var openNow = `<i aria-hidden="true" class="fa fa-times-circle er-list-icon er-closed"></i><span class="sr-only">Closed Now</span>`
            }
        } else { // leave blank
            var openNow = ``;
        }
        // Generate rating width 
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
            distance = google.maps.geometry.spherical.computeDistanceBetween(currentPosition, restaurant.geometry.location).toFixed() + ` meters`;
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
                                    <p class="er-address">${restaurant.vicinity}</p>
                                </div>                    
                            </td>
                            <td class="er-cell-rating">
                                <p>Rating :</p>    
                                <div class="er-rating-list">
                                    <div class="er-rating-container" style="width:${starRating}%">                                        
                                    </div>
                                </div>
                                <p>price range :</p> 
                                <div class="er-price-list">
                                   
                                    <div class="er-price-container" style="width:${priceLevel}%">                                        
                                    </div>
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
        // Prepare variables
        let photoItems = place.photos.map(function (photo) { // create list of photos
            imageUri = photo.getUrl({ "maxWidth": 600, "maxHeight": 600 });
            return `<div class="col-12 er-details-photo"><img src="${imageUri}" alt="Restaurant photo"></div>`
        });
        // use first photo for the details page background
        let backGround = "url('" + place.photos[0].getUrl({ "maxWidth": 600, "maxHeight": 600 }) + ")";
        $("#er-details-section").css("background-image", backGround);

        // create place type list
        let placeTypes = place.types.map(function (placeType) {
            return `<div>${placeType}</div>`
        });

        let fullAddress = place.adr_address.split(","); // create adress array
        let latestRating = (place.reviews[0].rating * 20).toFixed(); // generate latest rating width
        // prepare latest review excerpt
        let latestReview = place.reviews[0].text.slice(0, 160) + `.....<p class="er-read-more" onclick="showReviews()">read more</p>`;
        //  let mainPhoto = place.photos[1].getUrl({ "maxWidth": 600, "maxHeight": 600 });

        // create review section
        let reviewList = place.reviews.map(function (review, index) { // cycle through reviews
            let starRating = (review.rating * 20).toFixed(); // prepare star rating width
            if (index % 2 == 0) { // mirror reviews based on even/uneven
                // return the reviews
                return `
                    <div class="er-reviews-wrapper">
                        <table class="er-reviews-table">
                            <tr>
                                <td class="er-cell-2third">
                                    <p class="er-reviews-name">${review.author_name}</p>
                                </td>
                                <td class="er-cell-third er-review-photo">
                                    <img src="${review.profile_photo_url}" alt="Reviewers profile picture">
                                </td>

                            </tr>
                        </table>    
                        <table class="er-reviews-table">    
                            <tr>
                                <td class="er-cell-2third">
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
                                    <td class="er-cell-2third">
                                       <p class="er-reviews-name">${review.author_name}</p>
                                    </td>
                                    <td class="er-cell-third er-review-photo">
                                            <img src="${review.profile_photo_url}" alt="Reviewers profile picture">
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
                                        <td class="er-cell-2third">
                                            <div class="er-review-text">
                                                <div>${review.text}</div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                        </div>    
                                `}
        });

        // push details to screen
        $("#er-details").html(`
            <div class="er-details-title" onclick="showDetails()">
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
                        <td class="er-cell-2third">
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
                        <td class="er-cell-2third er-details-icons">                               
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
            <div class="er-reviews-mainwrap">
                <div class="col-12 er-details-photo">
                    </div>
                </div>
            </div>
            <div id="er-details-reviews">
                <div class="er-details-title" onclick="showDetails()">
                    <h2>↓</h2>
                </div>
                    ${reviewList.join("\n")}
                </div>
                <div id="er-details-photos">
                <div class="er-details-title" onclick="showDetails()">
                    <h2>↓</h2>
                </div>
                    ${photoItems.join("\n")} 
                </div>
            `);
    } else {
        showErrors(status); // if there was a api error goto error section
    };
    showDetails(); // show the details page
}


function logErrors(status) {
    showError();
    console.log(status);
    if (status == 'ZERO_RESULTS') {
        $("#er-error").html(`Sorry, Nothing found.<br><br>Try adjusting your settings.<br>Then Try again<br>↓<br><button onclick="checkGeo(geoSearch)"><i aria-hidden="true" class="fab fa-sith"></i><span class="sr-only">Do a new search around you</span></button><br>or search in another city<br>↓`)
    } else if (status == 'INVALID_REQUEST') {
        $("#er-error").html(`Sorry, we don't understand.<br><br>Try a different place.`)
    } else if (status == 'OVER_QUERY_LIMIT') {
        $("#er-error").html(`Sorry, too many queries.<br><br>Please, come back a bit later.`)
    } else if (status == 'REQUEST_DENIED') {
        $("#er-error").html(`Sorry, The server denied the request.<br><br>Please, come back a bit later.`)
    } else if (status == 'UNKNOWN_ERROR') {
        $("#er-error").html(`Sorry, We don't know what happened here.<br><br>Please, come back a bit later.`)
    } else if (status == 'MAX_ROUTE_LENGTH_EXCEEDED') {
        $("#er-error").html(`Sorry, but that's way too far<br><br>to get something to eat.`)
    } else if (status == 'NOT_FOUND') {
        $("#er-error").html(`Sorry, we can't<br><br>calculate your route.`)
    } else if (status == 'INVALID_REQUEST') {
        $("#er-error").html(`Sorry, we can't<br><br>calculate your route.`)
    } else if (status == 'NOINPUT') {
        $("#er-error").html(`Where do you<br>want to eat ?`)
    } else if (status == 'NOGEO') {
        $("#er-error").html(`We can't see<br>where you are<br>Please do a<br>manual search`)
    }
};