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

function showRestaurantDetails(place) { // push restaurant details to the screen
    return `
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
                                <button onclick="showPhotos()" id="er-photo-list">
                                    <i aria-hidden="true" class="fas fa-camera-retro"></i>
                                    <span class="sr-only">Show restaurant photos</span>
                                </button>
                                <button onclick="showReviews()" id="er-review-list">
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
            `;
}

function moreButton(pagination) { // more results button
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