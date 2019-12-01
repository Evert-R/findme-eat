function switchSection(goTo) {
    // Get all screen elements
    const front = $("#er-front-section");
    const results = $("#er-results-section");
    const details = $("#er-details-section")
    const resultsMap = $("#er-map-section");
    const dirMap = $("#er-direction-section");
    const error = $("#er-error-section");
    const settings = $(".er-header-settings");
    const searchSwitch = $("#er-search-switch");
    const detailSwitch = $("#er-details-switch");
    const mapSwitch = $("#er-map-switch");
    const dirSwitch = $("#er-direction-switch");
    const various = $("#er-various-section");

    settings.slideUp(); // allways close settings when switching

    function hideAll() { // hide all sections
        front.slideUp(0);
        results.slideUp(0);
        details.slideUp(0);
        various.slideUp(0);
        resultsMap.slideUp(0);
        dirMap.slideUp(0);
        error.slideUp(0);
    }

    function showAll() { // show all sections
        front.slideUp(0);
        results.slideDown(0);
        various.slideUp(0);
        resultsMap.slideDown(0);
        dirMap.slideUp(0);
        error.slideUp(0);
    }

    if (goTo == 'front') {
        hideAll();
        front.slideDown();
        // reset all header buttons 
        searchSwitch.slideUp(0);
        mapSwitch.slideUp(0);
        detailSwitch.slideUp(0);
        dirSwitch.slideUp(0);
        $('#er-exit-switch').slideUp(0);
    } else if (goTo == 'results') {
        front.slideUp();
        if ((window.innerWidth < 768) || ((window.innerWidth > 768) && (window.innerWidth < 992) && (window.innerWidth < innerHeight))) { // target mobile & tablet-portait
            hideAll();
            searchSwitch.slideDown(0);
            results.removeClass('col-md-6').slideDown(0);
        } else if (window.innerWidth > 768 && window.innerWidth < 1200) {
            details.slideUp(0);
            results.slideDown(0);
            searchSwitch.slideDown(0);
        } else if (window.innerWidth > 1200) {
            showAll();
        }
    } else if (goTo == 'details') {
        if ((window.innerWidth < 768) || ((window.innerWidth > 768) && (window.innerWidth < 992) && (window.innerWidth < innerHeight))) { // target mobile & tablet-portait
            hideAll();
            detailSwitch.slideDown(0);
            details.removeClass('col-md-6').slideDown(0);
        } else if (window.innerWidth > 768 && window.innerWidth < 1200) {
            results.slideUp(0);
            details.slideDown(0);
            detailSwitch.slideDown(0);
        } else if (window.innerWidth > 1200) {
            showAll();
            details.slideDown(0);
        }

        $('#er-details-reviews').slideUp(1000);
        $('#er-details-photos').slideUp(1000);
        $('#er-details-main').slideDown(1000);
    } else if (goTo == 'map') {
        if ((window.innerWidth < 768) || ((window.innerWidth > 768) && (window.innerWidth < 992) && (window.innerWidth < innerHeight))) { // target mobile & tablet-portait
            hideAll();
            mapSwitch.slideDown(0);
            resultsMap.removeClass('col-md-6').slideDown(0);
        } else if (window.innerWidth > 768 && window.innerWidth < 1200) {
            dirMap.slideUp(0);
            resultsMap.slideDown(0);
            mapSwitch.slideDown(0);
        } else if (window.innerWidth > 1200) {
            showAll();
            dirMap.slideUp(0);
            mapSwitch.slideDown(0);
        }
    } else if (goTo == 'directions') {
        dirSwitch.slideDown(0);
        if ((window.innerWidth < 768) || ((window.innerWidth > 768) && (window.innerWidth < 992) && (window.innerWidth < innerHeight))) { // target mobile & tablet-portait
            hideAll();
            dirMap.slideDown(0);
            dirMap.removeClass('col-md-6');
        } else if (window.innerWidth > 768 && window.innerWidth < 1200) {
            resultsMap.slideUp(0);
            dirMap.slideDown(0);
        } else if (window.innerWidth > 1200) {
            showAll();
            resultsMap.slideUp(0);
            dirMap.slideDown(0);
        }
    } else if (goTo == 'error') {
        hideAll();
        error.slideDown();
    } else if (goTo == 'hide') {
        front.slideUp(0);
        results.slideUp(0);
        details.slideUp(0);
        $("#er-various-section").slideUp(0);
        resultsMap.slideUp(0);
        dirMap.slideUp(0);
        error.slideUp(0);
    } else if (goTo == 'show') {
        front.slideUp(0);
        results.slideDown(0);
    }

}




function showPhotos() { // show photos on details section
    $('#er-details-main').slideUp(1000);
    $('#er-details-photos').slideDown(1000);
    $('#er-details-reviews').slideUp(1000);
}

function showReviews() { // show reviews on details page
    $('#er-details-main').slideUp(1000);
    $('#er-details-photos').slideUp(1000);
    $('#er-details-reviews').slideDown(1000);
}



function slideList() { // slide all searchresults to startposition
    $(".er-list-collapse").each(function () { // loop through list
        $(this).slideUp(500); // slide to startposition 
    })
};


window.onload = function () {
    $(".er-header-expand").click(function () { // make headersettings fold out with click        
        $(".er-header-settings").slideToggle();
    });


    $("#er-search-button").click(function () { // manual search input
        checkSearchInput($("#er-search-input").val());
    })


    // add click events to header items
    $("#er-search-switch").click(function () {
        switchSection('results');
    });

    $("#er-details-switch").click(function () {
        switchSection('details');
    });

    $("#er-map-switch").click(function () {
        switchSection('map');
    });

    $("#er-direction-switch").click(function () {
        switchSection('directions');
    });

    // attach geo search buttons
    $("#er-location-front").click(function () {
        checkGeo(geoSearch);
    });
    $("#er-menu-location").click(function () {
        checkGeo(geoSearch);
    });

    $("#er-fullscreen-switch").click(function () {
        $(".er-header-settings").slideUp();
        $("#er-exit-switch").slideDown(0);
        $("#er-fullscreen-switch").slideUp(0);
        enterFullscreen();
    })

    $("#er-exit-switch").click(function () {
        $(".er-header-settings").slideUp();
        $("#er-exit-switch").slideUp(0);
        $("#er-fullscreen-switch").slideDown(0);
        exitFullscreen();
    })

    $("#er-radius").change(function () { // watch the radius slider and update value
        console.log(this.value);
        $("#er-radius-value").html(this.value);
    })

    // implement little joke
    $("#vegetarian").click(function () {
        alert("Sorry, we don't find meat ;-)");
        $('#vegetarian').prop('checked', true);
    });
}

// to start screen
switchSection('front');