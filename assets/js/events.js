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
    hideAll();
    $("#er-map-section").slideDown();
};

function showDirections() {
    hideAll();
    $("#er-direction-section").slideDown();
};

function showList(callback) {
    hideAll();
    $("#er-list-section").slideDown();
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



// make list items collapsible, based on an example from
// https://www.w3schools.com/howto/howto_js_collapsible.asp
function collapse(collapsGroup) {
    var coll = document.getElementsByClassName(collapsGroup);
    var i;
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            console.log(this.nextElementSibling);
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
};


window.onload = function () {
    collapse('header-collapsible');
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