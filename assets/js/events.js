function showMap() {
    let content = document.getElementById("er-map-section");
    document.getElementById("er-front-section").style.maxHeight = "0";
    document.getElementById("er-list-section").style.maxHeight = "0";
    document.getElementById("er-details-section").style.maxHeight = "0";
    document.getElementById("er-contact-section").style.maxHeight = "0";
    content.style.maxHeight = content.scrollHeight + "px";
    document.getElementById("er-direction-section").style.maxHeight = "0";
    document.getElementById("er-error-section").style.maxHeight = "0";
};

function showDirections() {
    let content = document.getElementById("er-direction-section");
    document.getElementById("er-front-section").style.maxHeight = "0";
    document.getElementById("er-list-section").style.maxHeight = "0";
    document.getElementById("er-details-section").style.maxHeight = "0";
    document.getElementById("er-contact-section").style.maxHeight = "0";
    document.getElementById("er-map-section").style.maxHeight = "0";
    content.style.maxHeight = content.scrollHeight + "px";
    document.getElementById("er-error-section").style.maxHeight = "0";
};

function showList(callback) {
    let content = document.getElementById("er-list-section");
    document.getElementById("er-front-section").style.maxHeight = "0";
    content.style.maxHeight = content.scrollHeight + "px";
    document.getElementById("er-details-section").style.maxHeight = "0";
    document.getElementById("er-contact-section").style.maxHeight = "0";
    document.getElementById("er-map-section").style.maxHeight = "0";
    document.getElementById("er-direction-section").style.maxHeight = "0";
    document.getElementById("er-error-section").style.maxHeight = "0";
};

function showFront() {
    let content = document.getElementById("er-front-section");
    content.style.maxHeight = content.scrollHeight + "px";
    document.getElementById("er-list-section").style.maxHeight = "0";
    document.getElementById("er-details-section").style.maxHeight = "0";
    document.getElementById("er-contact-section").style.maxHeight = "0";
    document.getElementById("er-map-section").style.maxHeight = "0";
    document.getElementById("er-direction-section").style.maxHeight = "0";
    document.getElementById("er-error-section").style.maxHeight = "0";
};

function showDetails() {
    let content = document.getElementById("er-details-section");
    document.getElementById("er-front-section").style.maxHeight = "0";
    document.getElementById("er-list-section").style.maxHeight = "0";
    content.style.maxHeight = "unset";
    document.getElementById("er-contact-section").style.maxHeight = "0";
    document.getElementById("er-map-section").style.maxHeight = "0";
    document.getElementById("er-direction-section").style.maxHeight = "0";
    document.getElementById("er-error-section").style.maxHeight = "0";
};

function showContact() {
    let content = document.getElementById("er-contact-section");
    document.getElementById("er-front-section").style.maxHeight = "0";
    document.getElementById("er-list-section").style.maxHeight = "0";
    document.getElementById("er-details-section").style.maxHeight = "0";
    content.style.maxHeight = content.scrollHeight + "px";
    document.getElementById("er-map-section").style.maxHeight = "0";
    document.getElementById("er-direction-section").style.maxHeight = "0";
    document.getElementById("er-error-section").style.maxHeight = "0";
};
function showError() {
    let content = document.getElementById("er-error-section");
    document.getElementById("er-front-section").style.maxHeight = "0";
    document.getElementById("er-list-section").style.maxHeight = "0";
    document.getElementById("er-details-section").style.maxHeight = "0";
    document.getElementById("er-contact-section").style.maxHeight = "0";
    document.getElementById("er-map-section").style.maxHeight = "0";
    document.getElementById("er-direction-section").style.maxHeight = "0";
    content.style.maxHeight = content.scrollHeight + "px";
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
    document.getElementById("er-map-switch").addEventListener("click", function () {
        showMap();
    });

    document.getElementById("er-search-switch").addEventListener("click", function () {
        showList();
    });

    document.getElementById("er-details-switch").addEventListener("click", function () {
        showDetails();
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