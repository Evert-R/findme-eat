function hideAll() { // hide all sections
    $(".er-header-settings").slideUp();
    $("#er-front-section").slideUp(0);
    $("#er-list-section").slideUp(0);
    $("#er-details-section").slideUp(0);
    $("#er-various-section").slideUp(0);
    $("#er-map-section").slideUp(0);
    $("#er-direction-section").slideUp(0);
    $("#er-error-section").slideUp(0);
}

function showAll() { // show all sections
    $(".er-header-settings").slideUp();
    $("#er-front-section").slideUp(0);
    $("#er-list-section").slideDown(0);

    $("#er-various-section").slideUp(0);
    $("#er-map-section").slideDown(0);
    $("#er-direction-section").slideUp(0);
    $("#er-error-section").slideUp(0);
}

function showList(callback) { // show search results
    $(".er-header-settings").slideUp();
    if ((window.innerWidth < 768) || ((window.innerWidth < 992) && (window.innerWidth < innerHeight))) { // target single page devices
        hideAll();
        $("#er-list-section").slideDown(0);
        $("#er-search-switch").slideDown(0);
        $("#er-list-section").removeClass('col-md-6');
    } else if (window.innerWidth > 576 && window.innerWidth < 1200) {
        $("#er-details-section").slideUp(0);
        $("#er-list-section").slideDown(0);
        $("#er-search-switch").slideDown(0);
    } else if (window.innerWidth > 1200) {
        showAll();
    }

};

function showMap() {
    $(".er-header-settings").slideUp();
    if ((window.innerWidth < 768) || ((window.innerWidth < 992) && (window.innerWidth < innerHeight))) { // target single page devices
        hideAll();
        $("#er-map-section").slideDown(0);
        $("#er-map-switch").slideDown(0);
        $("#er-map-section").removeClass('col-md-6');
    } else if (window.innerWidth > 768 && window.innerWidth < 1200) {
        $("#er-direction-section").slideUp(0);
        $("#er-map-section").slideDown(0);
        $("#er-map-switch").slideDown(0);
    } else if (window.innerWidth > 1200) {
        showAll();
        $("#er-direction-section").slideUp(0);
        $("#er-map-switch").slideDown(0);
    }
};

function showDetails() {
    $(".er-header-settings").slideUp();
    if ((window.innerWidth < 768) || (window.innerWidth < 992 && window.innerWidth < innerHeight)) { // target single page devices
        hideAll();
        $("#er-details-section").slideDown(0);
        $("#er-details-switch").slideDown(0);
        $("#er-details-section").removeClass('col-md-6');
    } else if (window.innerWidth > 768 && window.innerWidth < 1200) {
        $("#er-list-section").slideUp(0);
        $("#er-details-section").slideDown(0);
        $("#er-details-switch").slideDown(0);
    } else if (window.innerWidth > 1200) {
        showAll();
        $("#er-details-section").slideDown(0);
    }
    $('#er-details-reviews').slideUp(1000);
    $('#er-details-photos').slideUp(1000);
    $('#er-details-main').slideDown(1000);
};

function showDirections() {
    $(".er-header-settings").slideUp();
    $("#er-direction-switch").slideDown(0);
    if ((window.innerWidth < 768) || ((window.innerWidth < 992) && (window.innerWidth < innerHeight))) { // target single page devices
        hideAll();
        $("#er-direction-section").slideDown(0);
        $("#er-direction-section").removeClass('col-md-6');
    } else if (window.innerWidth > 768 && window.innerWidth < 1200) {
        $("#er-map-section").slideUp(0);
        $("#er-direction-section").slideDown(0);
    } else if (window.innerWidth > 1200) {
        showAll();
        $("#er-map-section").slideUp(0);
        $("#er-direction-section").slideDown(0);
    }
};

function showFront() {
    $(".er-header-settings").slideUp();
    hideAll();
    $("#er-front-section").slideDown();
    $("#er-search-switch").slideUp(0);
    $("#er-map-switch").slideUp(0);
    $("#er-details-switch").slideUp(0);
    $("#er-direction-switch").slideUp(0);
};

function showVarious() {
    $(".er-header-settings").slideUp();
    $("#er-various-section").slideDown(0);
    if ((window.innerWidth < 768) || ((window.innerWidth < 992) && (window.innerWidth < innerHeight))) { // target single page devices
        hideAll();
        $("#er-various-section").slideDown(0);
        $("#er-various-section").removeClass('col-md-6');
    } else if (window.innerWidth > 768 && window.innerWidth < 768) {
        hideAll();
        $("#er-map-section").slideDown(0);
        $("#er-direction-section").slideDown(0);
    }
    $("#er-various-section").slideDown(0);
};

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

function showError() { // show the error section
    hideAll();
    $("#er-error-section").slideDown();
};

function slideList() { // slide all searchresults to startposition
    $(".er-list-collapse").each(function () { // loop through list
        $(this).slideUp(500); // slide to startposition 
    })
};


window.onload = function () {
    $(".er-header-settings").slideUp(); // headersettings to startposition
    $(".er-header-expand").click(function () { // make headersettings fold out with click        
        $(".er-header-settings").slideToggle();
    });

    $("#er-radius").change(function () { // watch the radius slider and update value
        console.log(this.value);
        $("#er-radius-value").html(this.value);
    })

    // add click events to header items
    document.getElementById("er-search-switch").addEventListener("click", function () {
        showList();
    });

    document.getElementById("er-details-switch").addEventListener("click", function () {
        showDetails();
    });
    document.getElementById("er-map-switch").addEventListener("click", function () {
        showMap();
    });

    document.getElementById("er-direction-switch").addEventListener("click", function () {
        showDirections();
    });

    document.getElementById("er-location-front").addEventListener("click", function () {
        checkGeo(geoSearch);
    });
    document.getElementById("er-menu-location").addEventListener("click", function () {
        checkGeo(geoSearch);
    });
    document.getElementById("vegetarian").addEventListener("click", function () {
        alert("Sorry, we don't find meat ;-)");
        $('#vegetarian').prop('checked', true);
    });
}




showFront();