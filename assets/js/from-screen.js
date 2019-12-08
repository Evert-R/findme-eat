function getRadius() { // get search radius from settings
    return $("#er-radius").val();
}

function getCuisine() { // get cuisine type from settings
    return $("#er-cuisine").children("option:selected").val();
}

function getVehicle() { // get transport type from settings
    return $("input[name='er-travel']:checked").val();
}

function getVeg() { // get veg options from settings
    if ($("#vegan").is(":checked")) {
        return true;
    }
}

function getOpen() { // get only open option from settings
    if ($("#open-now").is(":checked")) {
        return true;
    }
}

function getKeyWord() { // return search keyword from settings panel
    let veg = '';
    let cuisine = '';
    if (getVeg() == true) {
        veg = ` AND (vegan)`;
    }
    if (getCuisine() != '') {
        cuisine = ` AND (${getCuisine()})`;
    }
    return veg + cuisine;
}

function sendMail(contactForm) { // contact form handling 
    startWaitScreen();
    emailjs.send("gmx", "evert", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "user_message": contactForm.usermessage.value
    })
        .then(
            function (response) {
                stopWaitScreen();
                $("#er-contact-response").html(`<p>Your message has been send<br>Thanks for contacting us!</p>`);
            },
            function (error) {
                stopWaitScreen();
                $("#er-contact-response").html(`<p>We couldn't send your message<br>Please try again later.</p>`);
            }
        );
    return false;  // To block from loading a new page
}