function showResults(restaurants) {
    if (restaurants.length == 0) {
        return `<h2>Nothing to show</h2>`;
    }
    var listItems = restaurants.map(function(restaurant) {
      return `
        <li>
            ${restaurant.name}
        </li>
      `  
    });
    return `
        <div class="er-item-list">
            <ul>
                ${listItems}
            </ul>
        </div>

    `
}


function getData(event) {

    $("#er-search-results").html("");

    var searchInput = $("#er-search-input").val();
    if (!searchInput) {
        $("#er-search-input").attr("placeholder", `Wich city are you in ?`);
        return;
    }
    // read dataSet
    $.when(
        $.get(`assets/data/Datafiniti_Vegetarian_and_Vegan_Restaurants.json`)

    ).then(
        // make variable of data and push to div
        function (response) {
            var dataSet = response;
            var searchResults = [];

            for (i = 0; i < dataSet.length; i++) {
                if (dataSet[i].city == searchInput) {
                    searchResults.push(dataSet[i]);
                    console.log(`${dataSet[i]["name"]}`);
                }
                
            }
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


