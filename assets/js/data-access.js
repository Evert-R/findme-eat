function showResults(restaurants) {
    if (restaurants.length == 0) {
        return `<h2>Nothing to show</h2>`;
    }
    //  restaurants.sort((a, b) => (a.name > b.name) ? 1 : -1);

    var listItems = restaurants.map(function (restaurant) {
        return `<tr>
            <td>
                ${restaurant.name}
            </td>
            <td>
                ${restaurant.address}
            </td>
            <td>
                ${restaurant.cuisines}
            </td>           
        </tr>`
    });

    return `
        <div class="er-item-list">
            <table>            
                ${listItems.join("\n")}      
            </table>
        </div>
    `
}



function getData(event) {
    // empty div
    $("#er-search-results").html("");
    // read input
    var searchInput = $("#er-search-input").val();
    // if empty display message
    if (!searchInput) {
        $("#er-search-input").attr("placeholder", `Wich city are you in ?`);
        return;
    }
    // read dataSet
    $.when(
        $.get(`assets/data/Datafiniti_Vegetarian_and_Vegan_Restaurants.json`)
    ).then(
        // make variable of data
        function (response) {
            var dataSet = response;
            // sort by name to filter easy, cause there are a lot of doubles in the dataset
            dataSet.sort((a, b) => (a.name > b.name) ? 1 : -1);
            // create array for the subset
            var searchResults = new Array;
            // check if input matches city, check for double names
            // problem to fix : dataSet[0] is passed over, cause of the i-1 check
            for (i = 1; i < dataSet.length; i++) {
                if (dataSet[i].city.toLowerCase() == searchInput.toLowerCase() && dataSet[i].name != dataSet[i - 1].name) {
                    // push restaurant to searchResults
                    searchResults.push(dataSet[i]);
                }
            }
            // push searchResults to div
            console.log(searchResults[0]);
            $("#er-search-results").html(showResults(searchResults));
        },

        // error handling
        function (errorResponse) {
            if (errorResponse.status === 404) {
                $("#er-api-data").html(
                    `<h2>No info found for leiden</h2>`);
            } else if (errorResponse.status === 403) {
                var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset') * 1000);
                $("#er-api-data").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`);
            } else {
                console.log(errorResponse);
                $("#er-api-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}


