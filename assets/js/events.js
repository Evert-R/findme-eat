function showMap() {
    document.getElementById("er-list-section").classList.add("d-none");
    document.getElementById("er-details-section").classList.add("d-none");
    document.getElementById("er-contact-section").classList.add("d-none");
    //    document.getElementById("er-map-section").classList.remove("d-none");
};

function showList() {
    document.getElementById("er-list-section").classList.remove("d-none");
    document.getElementById("er-details-section").classList.add("d-none");
    document.getElementById("er-contact-section").classList.add("d-none");
    //    document.getElementById("er-map-section").classList.add("d-none");
};

function showDetails() {
    document.getElementById("er-list-section").classList.add("d-none");
    document.getElementById("er-details-section").classList.remove("d-none");
    document.getElementById("er-contact-section").classList.add("d-none");
    //   document.getElementById("er-map-section").classList.add("d-none");
};

function showContact() {
    document.getElementById("er-list-section").classList.add("d-none");
    document.getElementById("er-details-section").classList.add("d-none");
    document.getElementById("er-contact-section").classList.remove("d-none");
    //   document.getElementById("er-map-section").classList.add("d-none");
};



// make list items collapsible, based on an example from
// https://www.w3schools.com/howto/howto_js_collapsible.asp
function collapse() {
    var coll = document.getElementsByClassName("collapsible");

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

    document.getElementById("er-map-switch").addEventListener("click", function () {
        showMap();
    });

    document.getElementById("er-search-switch").addEventListener("click", function () {
        showList();
    });

    document.getElementById("er-details-switch").addEventListener("click", function () {
        showDetails();
    });

    //document.getElementById("er-map-switch").addEventListener("click", function() {
    //    showMap();
    //});


}