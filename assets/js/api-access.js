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
                ${restaurant.address1}
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


function getData(event) {
    // empty div
    $("#er-search-results").html("");
    // read input
    var searchInput = document.getElementById("er-search-input").value;
    //   var searchInput = $("#er-search-input").val();
    // if empty display message
    if (!searchInput) {
        $("#er-search-input").attr("placeholder", `Wich city are you in ?`);
        return;
    }
    // read dataSet

    let uri = `https://www.vegguide.org/search/by-address/${searchInput}/`;

    let h = new Headers();
    h.append('Accept', 'application/json', 'User-Agent', 'CodeStudent');

    let req = new Request(uri, {
        method: 'GET',
        headers: h,
        mode: 'cors'
    });

    fetch(req)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('BAD HTTP stuff');
            }
        })
        .then((jsonData) => {
            $("#er-search-results").html(showResults(jsonData.entries));
            console.log(jsonData.entries);
        })
        .catch((err) => {
            console.log('ERROR:', err.message);
        });
}


