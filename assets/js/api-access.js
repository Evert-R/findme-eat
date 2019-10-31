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
                ${restaurant.id}
            </td>
            <td>
                ${restaurant.cuisines}
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

function getInput() {
    if (!searchInput) {
        $("#er-search-input").attr("placeholder", `Wich city are you in ?`);
        return;
    };
    var searchInput = document.getElementById("er-search-input").value;
    getCity(searchInput);
}

function getCity(searchInput) {
    //  var apiLink = 'https://developers.zomato.com/api/v2.1/cities?lat=40.662787&lon=-73.940520';
    var searchInput = document.getElementById("er-search-input").value;
    var apiLink = `https://developers.zomato.com/api/v2.1/cities?q=${searchInput}`;
    getData(apiLink);
}

function getData(apiLink) {
    // empty div
    $("#er-search-results").html("");
    // read input

    //   var searchInput = $("#er-search-input").val();
    // if empty display message

    // read dataSet
    fetch(apiLink,
        { method: 'GET', headers: { 'Content-Type': 'application/json', 'user-key': 'a892fb6764d90fa8100b688ab57b2d2a' } }
    )
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('BAD HTTP stuff');
            }
        })
        .then((jsonData) => {
            $("#er-search-results").html(showResults(jsonData.location_suggestions));
            console.log(jsonData.location_suggestions);
        })
        .catch((err) => {
            console.log('ERROR:', err.message);
        });
}



