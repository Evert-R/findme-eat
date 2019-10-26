function getData(event) {

    $("#er-api-dat").html("");
// read missingData file
    $.when(
        $.get(`assets/data/Datafiniti_Vegetarian_and_Vegan_Restaurants.json`)

    ).then(
        // make variable of data and push to div
        function (response) {
            var regionData = response;
            
            $("#er-api-data").html(`${regionData[1]["city"]}`);
            console.log(regionData[1]["city"]);
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

getData();
