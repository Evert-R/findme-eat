function showResults(restaurants) {
    if (restaurants.length == 0) {
        return `<h2>Nothing to show</h2>`;
    }

    let listItems = restaurants.map(function (restaurant) {
        return `<tr>
            <td>
                ${restaurant.name}
            </td>
            <td>
                ${restaurant.formatted_address}
            </td>
            <td>
                ${restaurant.rating}
            </td>           
        </tr>`
    });

    return `
        <div class="er-item-list">
        <button id="sorting">Sort</button>
            <table>            
                ${listItems.join("\n")}      
            </table>
        </div>
    `
}

function getInput() { // get the search argument from the input field
    let searchInput = document.getElementById("er-search-input").value;

    if (!searchInput) { // check if nothing was entered
        $("#er-search-input").attr("placeholder", `You have to give me something!`);
        return;
    };
    // make search argument safe for url use
    let uri = encodeURI(searchInput);
    // create the uri to query the
    let apiLink = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant+vegetarian+${uri}&key=AIzaSyBvX8IlqhZmWM6jK2aL0sDwuKgYPIHqpKE`;
    getData(apiLink);
}

function getData(uri) {
    // empty div
    $("#er-search-results").html("");
    $.when(
    //         $.get(uri)
        $.get('assets/data/newYork.json') // test without api access
    ).then(
        // make variable of data and push to div
        function (response) {
            let searchResults = response;

            $("#er-search-results").html(showResults(searchResults.results));
            console.log(searchResults);
        },
        // error handling
        function (errorResponse) {
            if (errorResponse.status === 404) {
                $("#er-api-data").html(
                    `<h2>No info found for leiden</h2>`);
            } else if (errorResponse.status === 403) {
                let resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset') * 1000);
                $("#er-api-data").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`);
            } else {
                console.log(errorResponse);
                $("#er-api-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}



