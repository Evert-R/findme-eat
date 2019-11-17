function restaurantDetails(place_id) {
    showDetails();
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    var requestDetails = {
        placeId: place_id,
        fields: ['address_components', 'adr_address', 'formatted_address', 'geometry', 'icon', 'name', 'permanently_closed', 'photos', 'place_id', 'plus_code', 'type', 'url', 'utc_offset', 'vicinity']
    };

    service = new google.maps.places.PlacesService(map);
    service.getDetails(requestDetails, callback);

    function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {

            console.log(place);
            let photoItems = place.photos.map(function (photo) {
                imageUri = photo.getUrl({ "maxWidth": 600, "maxHeight": 600 });
                return `<div class="er-details-photo"><img src="${imageUri}"></div>`
            });

            let placeTypes = place.types.map(function (placeType) {

                return `<div>${placeType}</div>`
            });
            let fullAddress = place.adr_address.split(",");

            console.log(fullAddress);
            $("#er-details-section").html(`
            <h2>${place.name}</h2>
            <table class="er-list-table">
                <tr>
                    <td class="er-details-address">
                        ${fullAddress.join("<br>")}
                    </td>
                    <td class="er-details-icons">
                        <div onclick="initDirectionMap('${place.place_id}')">    
                            <button><i class="fas fa-directions"></i></button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="">
            
                            ${placeTypes.join("\n")}
                     
                    </td>
                </tr>
                <tr>
                    <td class="">

                    </td>
                </tr>
            </table>
            <div class="er-details-photos">
                ${photoItems.join("\n")} 
            </div>
            
            <div class="er-details-photos">${photoItems.join("\n")}</div>   
            <div>${place.address_components.long_name}</div>
            <div>${place.adr_address}</div>
            <div>${place.formatted_address}</div>
            <div>${place.geometry.location}</div>
            <div>${place.icon}</div>
            <div>${place.name}</div>
            <div>${place.permanently_closed}</div>
            <div>${place.photos}</div>
            <div>${place.place_id}</div>
            <div>${place.plus_code}</div>
            <div>${place.type}</div>
            <div>${place.url}</div>
            <div>${place.utc_offset}</div>
            <div>${place.vicinity}</div>
            <div>${photoItems}</div>        
            `);
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


        console.log(priceLevel);
        var expandId = restaurant.place_id.replace(/[^0-9a-z]/gi, ''); //remove unwanted characters

        // generate html list items
        return `<div class="er-list collapsible"> 
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