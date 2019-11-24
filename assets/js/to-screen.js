function restaurantDetails(place_id) { // get restaurant details and plot to screen
    showDetails();
    $('html, body').animate({ scrollTop: 0 }, 'slow'); // scoll to top of the page
    var requestDetails = {
        placeId: place_id,
        fields: ['reviews', 'adr_address', 'formatted_address', 'geometry', 'icon', 'name', 'permanently_closed', 'photos', 'place_id', 'plus_code', 'type', 'url', 'utc_offset', 'vicinity']
    };

    service = new google.maps.places.PlacesService(map);
    service.getDetails(requestDetails, callback);

    function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log(place);
            // create list of photos
            let photoItems = place.photos.map(function (photo) {
                imageUri = photo.getUrl({ "maxWidth": 600, "maxHeight": 600 });
                return `<div class="col-12 er-details-photo"><img src="${imageUri}"></div>`
            });
            let backGround = "url('" + place.photos[0].getUrl({ "maxWidth": 600, "maxHeight": 600 }) + ")";
            $("#er-details-section").css("background-image", backGround);
            // create place type list
            let placeTypes = place.types.map(function (placeType) {
                return `<div>${placeType}</div>`
            });
            // create adress array
            let fullAddress = place.adr_address.split(",");
            // create review section
            let reviewList = place.reviews.map(function (review) {
                return `<p>${review.author_name}</p>
                        <p>${review.rating}</p>
                        <p>${review.text}</p>
                        <p>${review.relative_time_description}</p>
                        <img src="${review.profile_photo_url}">
                        <p>${review.author_url}</p>
                        <p>${review.author_name}</p>
                        <p>${review.rating}</p>
                `
            });
            // push details to screen
            $("#er-details").html(`
            <h2>${place.name}</h2>
            <table class="er-list-table">
                <tr>
                    <td class="er-cell-2third er-details-address">
                        ${fullAddress.join("<br>")}
                    </td>
                    <td class="er-cell-third er-details-icons">
                        <div onclick="initDirectionMap('${place.place_id}')">    
                            <button><i class="fas fa-directions"></i></button>
                        </div>
                    </td>
                </tr>
            </table>

            <div class="details-collapsible er-details-icons">                    
                <button><i class="fas fa-directions"></i></button>
            </div>
            <div class="er-details-collapse">
                ${reviewList.join("\n")}  
            </div> 
            <div class="details-collapsible er-details-icons">                    
                <button><i class="fas fa-directions"></i></button>
            </div>
            <div class="row er-details-collapse er-details-photos">
                ${photoItems.join("\n")} 
            </div>     
            `);
        } else {
            showErrors(status);
        };
    }
}

function showResults(restaurants) {
    if (restaurants.length == 0) {
        return `<h2>Nothing to show</h2>`;
    }

    let listItems = restaurants.map(function (restaurant) {


        //let imageUri = "";
        if (restaurant.photos[0] != undefined) {
            var imageUri = restaurant.photos[0].getUrl({ "maxWidth": 600, "maxHeight": 600 });
        }
        // generate detail link

        // generate open icon
        if (restaurant.opening_hours.open_now == true) {
            var openNow = `<i class="fa fa-check er-list-icon er-open"></i>`
        } else {
            var openNow = `<i class="fa fa-times-circle er-list-icon er-closed"></i>`
        };
        // generate extra detail click from the place_id
        let starRating = (restaurant.rating * 15).toFixed();
        if (restaurant.price_level != NaN) {
            var priceLevel = (restaurant.price_level * 15).toFixed();
        } else {
            var priceLevel = '0';
        }
        let infoWindow = restaurant.geometry.location;

        console.log(priceLevel);
        var expandId = restaurant.place_id.replace(/[^0-9a-z]/gi, ''); //remove unwanted characters

        // generate html list items
        return `<div class="er-list"  id="${restaurant.place_id}"> 
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
                    <div class="er-rating-container" style="width:${starRating}%">
                        <img src="assets/images/Rating-Star-PNG-Transparent-Image.png">
                    </div>
                    <div class="er-rating-container" style="width:${priceLevel}%">
                        <img src="assets/images/price.png">
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
                        <button><i class="fa fa-info"></i></button>
                    </div>
                    <div onclick="initDirectionMap('${restaurant.place_id}')">    
                        <button><i class="fas fa-directions"></i></button>
                    </div>
                        </td>
                    <td class="er-collapse-image">
                        <img src="${imageUri}">
                    </td>
                </tr>
            </table>
                   
        </div>
         
                   
            
        </div>`
    });

    return `
        <div class="er-item-list">
            ${listItems.join("\n")}           
        </div>
    `
}

function logErrors(status) {
    showError();
    console.log(status);
    if (status == 'ZERO_RESULTS') {
        $("#er-error").html(`Sorry, Nothing found.<br><br>Try adjusting your settings.`)
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