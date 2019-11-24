function hideAll() {
    $("#er-front-section").slideUp(0);
    $("#er-list-section").slideUp(0);
    $("#er-details-section").slideUp(0);
    $("#er-various-section").slideUp(0);
    $("#er-map-section").slideUp(0);
    $("#er-direction-section").slideUp(0);
    $("#er-error-section").slideUp(0);
}

function showList(callback) {
    if (window.innerWidth < 576) {
        hideAll();

    } else if (window.innerWidth > 576 && window.innerWidth < 768) {
        $("#er-details-section").slideUp(0);
    }
    $("#er-list-section").slideDown(0);
    $("#er-search-switch").slideDown(0);
};

function showMap() {
    if (window.innerWidth < 576) {
        hideAll();
    } else if (window.innerWidth > 576 && window.innerWidth < 768) {
        hideAll();
        $("#er-list-section").slideDown(0);
    }
    $("#er-map-section").slideDown(0);
    $("#er-map-switch").slideDown(0);
};

function showDetails() {
    $("#er-details-switch").slideDown(0);
    if (window.innerWidth < 576) {
        hideAll();
    } else if (window.innerWidth > 576 && window.innerWidth < 768) {
        $("#er-list-section").slideUp(0);
    }
    $('#er-details-reviews').slideUp(0);
    $('#er-details-photos').slideUp(0);
    $("#er-details-section").slideDown(0);
    $('#er-details-main').slideDown(150);
};

function showDirections() {

    $("#er-direction-switch").slideDown(0);
    if (window.innerWidth < 576) {
        hideAll();
    } else if (window.innerWidth > 576 && window.innerWidth < 768) {
        $("#er-map-section").slideUp(0);
    }
    $("#er-direction-section").slideDown(0);
};

function showFront() {
    hideAll();

    $("#er-front-section").slideDown();
    $("#er-search-switch").slideUp(0);
    $("#er-map-switch").slideUp(0);
    $("#er-details-switch").slideUp(0);
    $("#er-direction-switch").slideUp(0);
};

function showVarious() {
    $("#er-various-section").slideDown(0);
    if (window.innerWidth < 576) {
        hideAll();
        $("#er-various-section").slideDown(0);
    } else if (window.innerWidth > 576 && window.innerWidth < 768) {
        hideAll();
        $("#er-map-section").slideDown(0);
        $("#er-direction-section").slideDown(0);
    }
    $("#er-various-section").slideDown(0);
};

function showPhotos() {
    $('#er-details-main').slideUp(1000);
    $('#er-details-photos').slideDown(1000);
    $('#er-details-reviews').slideUp(1000);
}

function showReviews() {

    $('#er-details-main').slideUp(1000);
    $('#er-details-photos').slideUp(1000);
    $('#er-details-reviews').slideDown(1000);
}


function showError() {
    hideAll();
    $("#er-error-section").slideDown();
};



function slideList() { // make listitems collapsible
    $(".er-list-collapse").each(function () { // loop through list
        $(this).slideUp(); // slide to startposition 
    })
};


window.onload = function () {
    $(".er-header-settings").slideUp(); // headersettings to startposition
    $(".er-header-expand").click(function () { // make headersettings fold out with click        
        $(".er-header-settings").slideToggle();
    });


    console.log(window.innerWidth);
    if (window.innerWidth > 0) {


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

    };
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