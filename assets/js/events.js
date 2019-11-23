function hideAll() {
    $("#er-front-section").slideUp();
    $("#er-list-section").slideUp();
    $("#er-details-section").slideUp();
    $("#er-contact-section").slideUp();
    $("#er-map-section").slideUp();
    $("#er-direction-section").slideUp();
    $("#er-error-section").slideUp();
}


function showMap() {
    if (window.innerWidth < 576) {
        hideAll();
        $("#er-map-section").slideDown();
    } else if (window.innerWidth > 576 && window.innerWidth < 768) {
        hideAll();
        $("#er-map-section").slideDown();
        $("#er-list-section").slideDown();
    }
};

function showDirections() {
    hideAll();
    $("#er-direction-section").slideDown();
};

function showList(callback) {
    if (window.innerWidth < 576) {
        hideAll();
        $("#er-list-section").slideDown();
    } else if (window.innerWidth > 576 && window.innerWidth < 768) {
        hideAll();
        $("#er-map-section").slideDown();
        $("#er-list-section").slideDown();
    }
};

function showFront() {
    hideAll();
    $("#er-front-section").slideDown();
};

function showDetails() {
    hideAll();
    $("#er-details-section").slideDown();
};

function showContact() {
    hideAll();
    $("#er-contact-section").slideDown();

};
function showError() {
    hideAll();
    $("#er-error-section").slideDown();
};


function slideList() { // make listitems collapsible
    $(".er-slide-item").each(function () { // loop through list
        $(this).next().slideUp(); // slide to startposition
        $(this).click(function () { // make click event
            $(this).toggleClass("active"); // highlight list item
            $(this).next().slideToggle(); // slide the info div
        })
    });
};

window.onload = function () {
    $(".er-header-settings").slideUp(); // headersettings to startposition
    $(".er-header-expand").click(function () { // make headersettings fold out with click        
        $(".er-header-settings").slideToggle();
    });


    console.log(window.innerWidth);
    if (window.innerWidth > 0) {
        document.getElementById("er-map-switch").addEventListener("click", function () {
            showMap();
        });

        document.getElementById("er-search-switch").addEventListener("click", function () {
            showList();
        });

        document.getElementById("er-details-switch").addEventListener("click", function () {
            showDetails();
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