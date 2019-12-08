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

function processDetails(place) { // get detail result and push to screen
    if (place == undefined) { // extra failsafe
        return logErrors('UNKNOWN_ERROR');
    } else {
        $("#er-details").html(showRestaurantDetails(place)); // Push details to screen
        switchSection('details'); // show the details page
        setBackground(place); // set details page background
        stopWaitScreen(); // hide preloader
    }
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
            geoSearch('MANUAL', results[0].geometry.location, searchInput);
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

function getInfoWindowPhoto(place) {
    if (place.hasOwnProperty('photos')) { // check if a photo is available
        let imageUri = place.photos[0].getUrl({ "maxWidth": 100 }); // get url for infowindow photo
        return `<img src="${imageUri}"></img>`;
    } else {
        return '';
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
    if (currentPosition != 'MANUAL') {
        return (google.maps.geometry.spherical.computeDistanceBetween(currentPosition, restaurant.geometry.location) / 1000).toFixed(2) + ` km  <i aria-hidden="true" class="fa fa-walking er-clock er-list-icon"></i><span class="sr-only">distance to restaurant</span>`;
    } else {
        return '';
    }
}

function setBackground(place) { // use first photo as background for details page
    if (place.hasOwnProperty('photos')) {
        let backGround = "url('" + place.photos[0].getUrl({ "maxWidth": 600, "maxHeight": 600 }) + ")";
        $("#er-details-section").css("background-image", backGround);
    }
}

function photoList(place) { // prepare photolist for details page
    if (place.hasOwnProperty('photos')) {
        let items = place.photos.map(function (photo) { // create list of photos
            let imageUri = photo.getUrl({ "maxWidth": 600, "maxHeight": 600 });
            return `<div class="col-12 er-details-photo"><img src="${imageUri}" alt="Restaurant photo"></div>`;
        });
        return items.join("\n");
    } else {
        $("#er-photo-list").slideUp(0); // hide photo button
        return '';
    }
}

function openingHours(place) { // prepare opening hours for details page
    if (place.hasOwnProperty('opening_hours')) {
        let hours = place.opening_hours.weekday_text.map(function (hours) {
            return `<p>${hours}</p>`;
        });
        return hours.join("\n");
    } else {
        return 'Opening hours : Unknown';
    }
}

function fullAddress(place) { // prepare full address for details page    
    if (place.hasOwnProperty('adr_address')) {
        let address = place.adr_address.split(","); // create adress array
        return address.join("<br>");
    } else {
        return '';
    }
}

function webSite(place) {
    // Prepare Website icon/link
    if (place.hasOwnProperty('website')) {
        return `<a href="${place.website}" target="blank">
                                    <button>
                                        <i aria-hidden="true" class="fas fa-globe"></i>                         
                                        <span class="sr-only">Goto the website</span>
                                    </button>
                                </a>`;
    } else {
        return '';
    }
}

function latestRating(place) { // generate latest review rating width
    if (place.hasOwnProperty('reviews')) {
        return `<div class="er-reviewdetails-container" style="width:${(place.reviews[0].rating * 20).toFixed()}px">
        </div>`;
    } else {
        return '';
    }
}

function latestReviewPhoto(place) {
    if (place.hasOwnProperty('reviews')) {
        return `<img src="${place.reviews[0].profile_photo_url}" alt="Reviewers profile picture">`;
    } else {
        return '';
    }
}


function latestReview(place) { // prepare latest review excerpt for details page
    if (place.hasOwnProperty('reviews')) {

        return `<div>${place.reviews[0].text.slice(0, 160)}.....<p class="er-read-more" onclick="showReviews()">read more</p></div>`;
    } else {
        return '';
    }
}

function reviewList(place) { // prepare review list for details page
    if (place.hasOwnProperty('reviews')) {
        // create review section
        let reviews = place.reviews.map(function (review, index) { // cycle through reviews
            let starRating = (review.rating * 20).toFixed(); // prepare star rating width
            if (index % 2 == 0) { // mirror reviews based on even/uneven index               
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
                       `;
            } else {
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
                               `;
            }
        });
        return reviews.join("\n");
    } else {
        $("#er-review-list").slideUp(0); // hide review button
        return '';
    }
}

