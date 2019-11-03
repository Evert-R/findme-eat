function showMap() {
    document.getElementById("er-search-section").classList.add("d-none");
    document.getElementById("er-details-section").classList.add("d-none");
    document.getElementById("er-contact-section").classList.add("d-none");
    document.getElementById("er-map-section").classList.remove("d-none");
};

function showSearch() {
    document.getElementById("er-search-section").classList.remove("d-none");
    document.getElementById("er-details-section").classList.add("d-none");
    document.getElementById("er-contact-section").classList.add("d-none");
    document.getElementById("er-map-section").classList.add("d-none");
};

function showDetails() {
    document.getElementById("er-search-section").classList.add("d-none");
    document.getElementById("er-details-section").classList.remove("d-none");
    document.getElementById("er-contact-section").classList.add("d-none");
    document.getElementById("er-map-section").classList.add("d-none");
};

function showContact() {
    document.getElementById("er-search-section").classList.add("d-none");
    document.getElementById("er-details-section").classList.add("d-none");
    document.getElementById("er-contact-section").classList.remove("d-none");
    document.getElementById("er-map-section").classList.add("d-none");
};


window.onload = function() {

document.getElementById("er-map-switch").addEventListener("click", function() {
    showMap();
});

document.getElementById("er-search-switch").addEventListener("click", function() {
    showSearch();
});

document.getElementById("er-details-switch").addEventListener("click", function() {
    showDetails();
});

//document.getElementById("er-map-switch").addEventListener("click", function() {
//    showMap();
//});


}