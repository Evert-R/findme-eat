function processResults(results, status, pagination, currentPosition, searchInput) {


    // assign the more button
    var getNextPage = null;
    var moreButton = document.getElementById('more');
    moreButton.onclick = function () {
        console.log()
        moreButton.disabled = true;
        if (getNextPage) getNextPage();
    };
    console.log(status);
    if (status !== 'OK') {
        logErrors(status, 'place'); // push error to page
        return;
    }
    // get the generated resultslist and push to screen
    if (results == undefined) {
        return logErrors('UNKNOWN_ERROR');
    } else {
        $("#er-search-results").html(showResults(results, currentPosition, searchInput));
        console.log(results);
        createMarkers(results) // Plot the markers on the map
        if ((window.innerWidth < 768) || ((window.innerWidth < 992) && (window.innerWidth < innerHeight))) { //on single page devices 
            setTimeout(function () { // wait a bit to show the mapresults
                switchSection('results');
                slideList(); // then show list
            }, 2000);
        } else { // on other devices
            switchSection('results'); // show directly
            slideList(); // then show list                
        }
        // next page assignment
        moreButton.disabled = !pagination.hasNextPage;
        getNextPage = pagination.hasNextPage && function () {
            pagination.nextPage();
        };
    }
}