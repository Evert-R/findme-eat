function switchSection(goTo) { // Navigation system
    // Get all screen elements
    const front = $("#er-front-section");
    const results = $("#er-results-section");
    const details = $("#er-details-section");
    const resultsMap = $("#er-map-section");
    const dirMap = $("#er-direction-section");
    const error = $("#er-error-section");
    const settings = $(".er-header-settings");
    const searchSwitch = $("#er-search-switch");
    const detailSwitch = $("#er-details-switch");
    const mapSwitch = $("#er-map-switch");
    const dirSwitch = $("#er-direction-switch");
    const about = $("#er-about-section");

    settings.slideUp(); // allways close settings when switching

    function hideAll() { // hide all sections
        front.slideUp(0);
        results.slideUp(0);
        details.slideUp(0);
        about.slideUp(0);
        resultsMap.slideUp(0);
        dirMap.slideUp(0);
        error.slideUp(0);
    }

    function showAll() { // show all sections
        front.slideUp(0);
        results.slideDown(0);
        dirMap.slideUp(0); // direction map shares position with resultsmap
        details.slideDown(0);
        about.slideUp(0);
        resultsMap.slideDown(0);
    }

    // switch sections based on screen width 
    if (goTo == 'front') { // Show front page
        hideAll();
        front.slideDown();
        // remove all header buttons 
        searchSwitch.slideUp(0);
        mapSwitch.slideUp(0);
        detailSwitch.slideUp(0);
        dirSwitch.slideUp(0);
        $('#er-exit-switch').slideUp(0); // hide exit fullscreen button
    } else if (goTo == 'results') { // show results section 
        front.slideUp(0);
        error.slideUp(0);
        // single page devices / tablets in portrait mode > 992
        if ((window.innerWidth < 768) || ((window.innerWidth > 768) && (window.innerWidth < 992) && (window.innerWidth < innerHeight))) { // target mobile & tablet-portait
            hideAll();
            searchSwitch.slideDown(0); // show result section switch
            results.removeClass('col-md-6').slideDown(0); // correction for portrait mode
        } else if (window.innerWidth > 768 && window.innerWidth < 1200) {
            details.slideUp(0);
            results.slideDown(0);
            searchSwitch.slideDown(0); // show result section switch
        } else if (window.innerWidth > 1200) {
            showAll();
        }
    } else if (goTo == 'details') {
        error.slideUp(0);
        if ((window.innerWidth < 768) || ((window.innerWidth > 768) && (window.innerWidth < 992) && (window.innerWidth < innerHeight))) { // target mobile & tablet-portait
            hideAll();
            detailSwitch.slideDown(0); // show detail section switch
            details.removeClass('col-md-6').slideDown(0); // correction for portrait mode
        } else if (window.innerWidth > 768 && window.innerWidth < 1200) {
            results.slideUp(0);
            details.slideDown(0);
            detailSwitch.slideDown(0); // show detail section switch
        } else if (window.innerWidth > 1200) {
            showAll();
            details.slideDown(0);
        }
        $('#er-details-reviews').slideUp(1000);
        $('#er-details-photos').slideUp(1000);
        $('#er-details-main').slideDown(1000);
    } else if (goTo == 'about') {
        error.slideUp(0);
        if ((window.innerWidth < 768) || ((window.innerWidth > 768) && (window.innerWidth < 992) && (window.innerWidth < innerHeight))) { // target mobile & tablet-portait
            hideAll();
            about.removeClass('col-md-6').slideDown(0); // correction for portrait mode
        } else if (window.innerWidth > 768 && window.innerWidth < 1200) {
            results.slideUp(0);
            about.slideDown(0);

        } else if (window.innerWidth > 1200) {
            showAll();
            about.slideDown(0);
        }
    } else if (goTo == 'map') {
        error.slideUp(0);
        mapSwitch.slideDown(0);  // show map section switch
        if ((window.innerWidth < 768) || ((window.innerWidth > 768) && (window.innerWidth < 992) && (window.innerWidth < innerHeight))) { // target mobile & tablet-portait
            hideAll();
            resultsMap.removeClass('col-md-6').slideDown(0); // correction for portrait mode
        } else if (window.innerWidth > 768 && window.innerWidth < 1200) {
            dirMap.slideUp(0);
            resultsMap.slideDown(0);
        } else if (window.innerWidth > 1200) {
            showAll();
            dirMap.slideUp(0);
        }
    } else if (goTo == 'directions') {
        error.slideUp(0);
        dirSwitch.slideDown(0); // show direction section switch
        if ((window.innerWidth < 768) || ((window.innerWidth > 768) && (window.innerWidth < 992) && (window.innerWidth < innerHeight))) { // target mobile & tablet-portait
            hideAll();
            dirMap.slideDown(0);
            dirMap.removeClass('col-md-6'); // correction for portrait mode
        } else if (window.innerWidth > 768 && window.innerWidth < 1200) {
            resultsMap.slideUp(0);
            dirMap.slideDown(0);
        } else if (window.innerWidth > 1200) {
            showAll();
            resultsMap.slideUp(0);
            dirMap.slideDown(0);
        }
    } else if (goTo == 'error') {
        if ((window.innerWidth < 768) || ((window.innerWidth > 768) && (window.innerWidth < 992) && (window.innerWidth < innerHeight))) { // target mobile & tablet-portait
            hideAll();
            error.removeClass('col-md-6'); // correction for portrait mode
        } else if (window.innerWidth > 768 && window.innerWidth < 1200) {
            front.slideUp(0);
            results.slideUp(0);
            details.slideUp(0);
        } else if (window.innerWidth > 1200) {
            front.slideUp(0);
            details.slideUp(0);
        }
        error.slideDown();
    }
}

// attach the infowindow to a click on the marker
function infoWindowClick(marker, infoContent, infowindow, place) {
    google.maps.event.addListener(marker, 'click', (function (marker, infoContent, infowindow) {
        return function () {
            infowindow.close();
            infowindow.setContent(infoContent);
            infowindow.open(map, marker);
            map.setCenter(place.geometry.location);
        };
    })(marker, infoContent, infowindow));
}

// link the info window to a click on the corresponding list item
function connectListInfoWindow(place, infowindow, marker) {
    $("#" + place.place_id).click(function () { // click-event for list-item
        $("#" + place.place_id).next().slideToggle(); // make listitem collapsible
        $("#" + place.place_id).toggleClass("active"); // highlight list item
        infowindow.close();
        infowindow.setContent(place.name);
        infowindow.open(map, marker);
        map.setCenter(place.geometry.location);
    });
}

function autoComplete() {
    var input = document.getElementById('er-search-input');
    new google.maps.places.Autocomplete(input);
}

function showPhotos() { // show photos on details page
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
    });
}

function startWaitScreen() { // show the preloader animation
    $("#er-wait-screen").removeClass("d-none");
}

function stopWaitScreen() { // hide the preloader animation
    $("#er-wait-screen").addClass("d-none");
}

startWaitScreen(); // show preloader while page loads
window.onload = function () { // then attach events to dom elements
    this.stopWaitScreen();

    $(".er-header-expand").click(function () { // make headersettings fold out with click        
        $(".er-header-settings").slideToggle();
    });

    $("#er-search-button").click(function () { // manual search input
        checkSearchInput($("#er-search-input").val());
    });

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

    $("#er-about-switch").click(function () {
        $('#er-drop-down').removeClass('er-up');
        switchSection('about');
    });

    // add click event to geo search buttons
    $("#er-location-front").click(function () {
        checkGeo(geoSearch);
    });
    $("#er-menu-location").click(function () {
        $('#er-drop-down').removeClass('er-up');
        checkGeo(geoSearch);
    });

    // add click event to fullscreen buttons
    $("#er-fullscreen-switch").click(function () {
        $(".er-header-settings").slideUp();
        $('#er-drop-down').removeClass('er-up');
        $("#er-exit-switch").slideDown(0);
        $("#er-fullscreen-switch").slideUp(0);
        enterFullscreen();
    });

    $("#er-exit-switch").click(function () {
        $(".er-header-settings").slideUp();
        $('#er-drop-down').removeClass('er-up');
        $("#er-exit-switch").slideUp(0);
        $("#er-fullscreen-switch").slideDown(0);
        exitFullscreen();
    });

    $("#er-radius").change(function () { // watch the radius slider and update value
        $("#er-radius-value").html((this.value / 1000).toFixed(2));
    });

    // implement little joke
    $("#vegetarian").click(function () {
        alert("Sorry, we don't find meat ;-)");
        $('#vegetarian').prop('checked', true);
    });

    $("#er-title").click(function () { // attach page title 
        switchSection('front');
    });

    // make dropdown arrow rotate
    $('.er-header-switch').click(function () {
        $('#er-drop-down').toggleClass('er-up');
    })

    // Slide up options panel when clicked outside menu

    $('.er-content').click(function () {
        $(".er-header-settings").slideUp();
        $('#er-drop-down').removeClass('er-up');
    })

    $('footer').click(function () {
        $(".er-header-settings").slideUp();
        $('#er-drop-down').removeClass('er-up');
    })


    initMap(); // initialize the map
    google.maps.event.addDomListener(window, 'load', autoComplete); // start autocomplete 
    autoComplete(); // attach autocomplete to searchbar
    switchSection('front'); // goto to start screen
};