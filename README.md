# Milestone-two

### Deployed version 
[https://evert-r.github.io/milestone-two](https://evert-r.github.io/milestone-two)

## UX
### For who this website is created 
- This website is created for the non-profit organisation 'Geen eieren voor je geld'. Wich in dutch literally means 'No eggs for your money', but is an old saying and means that you get good value for your money. This organisation wants to promote a vegetarian/vegan lifestyle by providing vegan-cooking workshops, and now via the development of this new web-app.

### At who this website is targeted
- Vegatarians, vegans and other interested people from all over the world.

### What does the organisation wants to achieve with this website
- They want to make it easy to find vegetarian/vegan restaurants wherever you are in the world, with one push of a button. Although there already is a very good vegetarian/vegan restaurant search website/app, wich uses its own database, they still feel this project will contribute something important. It may not be as precise as a well maintained database, if someone mentions the word vegetarian in the reviews it will be found, but this web-based app will allways work everywhere in the world, because it's using the google places api as an engine.  

### User stories
1. As a user who is visiting a new region I want to be able to search for a vegetarian restaurant with one press of a button, using a mobile device
2. As a user who is planning to eat in another city or region I want to be able to do a search in another regon or city, using a mobile or desktop device
3. As a user who searches for a restaurant I want to be able to set the radius of the area to search in
4. As a user who is vegan I want to be able to search for 'vegan only' places
5. As a user who is deciding on a restaurant I want to be able to see the price-range, ratings and wether the place is open or not straight in the search results
6. As a user who searches locally I also want to be able to see how far away restaurant is from me in the search results. I also want to be able to see where I am on the resultsmap 
7. As a user who found a place I want to be able to request some details, like the address and website of the restaurant. I also want to be able to read some reviews and see some more photos of the restaurant
8. As a user who found a place to eat I want to be able to get directions to it on a seperate map
9. As a user who is getting directions I want to be able to choose wich method of travelling I prefer before plotting the route
10. As a user who is travelling to the restaurant I want to be able to see where I am on the directions map, and update my location every once ion a while


### Mock-ups
The mock-ups for this project are in the UXD folder wich you will find in the root of this project.
- [Wireframe](UXD/wireframe.jpg)
- [Javascript flowchart](UXD/flowchart.jpg)

### Concept
This webpage will let you make a search for restaurants in a specified radius (max 10km) around you, or in a specific destination of choice. It presents you the rating, pricelevel, address, wether the place is open or not, the last few reviews and pictures of the place. Finally it calculates your route to the selected restaurant, based on your method of transportation, and plots this on a map. On the map you can also see a blue pin with your own location, wich you can update with a button, to see if you are getting close.
The main focus will be on mobile devices as its main purpose is to be used on the road, but this web-based app will also work on all desktop devices.
 
### Basic features
- Geographical search
- Manual search (other cities and regions)
- Select radius for both searches
- Select only open restaurants
- Select vegan only restaurants
- view the results in a list
- view the distance to a restaurant
- view the results on a map
- See your own location within the results on the map
- Click on a place on the map to see the name/picture/raing of the restaurant
- Get detailed information on a selected place
- View address details
- View the opening hours
- view the last five reviews
- view all available photos
- Get directions from your location
- Select vehicle for directions
- Update your location on the directions map
- Switch to full screen mode
- Single column view for mobile devices
- dual or triple column view for desktop devices
- Auto adjust to one column for tablets in portrait mode

### Optional Features to be implemented later

- Route description

### Code description
- ```api-access.js```
    - Functions to access the google places api
- ```events.js```
    - DOM click-events and Navigation system
- ```to-screen.js```
    - Push search results and details to their respective pages
- ```from-screen.js```
    - Get DOM values from the screen
- ```process.js```
    - Process results for display on the screen
- ```error.js```
    - Process errors and push to the screen



### Technologies Used
- [VSCode](https://code.visualstudio.com)
    - Code Editor
- [Xampp](https://www.apachefriends.org)
    - Local deploymemt
- [Git bash](https://gitforwindows.org)
    - Version control from windows
- [Font-Awesome](https://fontawesome.com)
    - Icons
- [Bootstrap](https://getbootstrap.com)
    - Responsive grid
- [Google Fonts](https://fonts.google.com)
    - Fonts (Source code pro/Allerta Stencil)
- [Autoprefixer](https://autoprefixer.github.io)
    - CSS prefixes for different browsers 
- [Online-convert](https://image.online-convert.com/convert-to-ico)
    - Convert jpg image to ico for favicon
- [Photoshop CS6](https://www.adobe.com/products/cs6.html)
    - Image editing 

## Testing

### Known Issues
- During development is was announced that the 'open_now' key in the nearby search of the 'google maps places api' is deprecated from November 2019 and will be turned of in November 2020. This only affects the notification in the resultslist, not the 'Open now' option in the settings panel.
As it will require a different and more expensive approach: a place detail search for every found restaurant, this will be handled in the next version (octobre 2020). For now a failsafe is implemented: if the key doesn't exist it will simply not show the open or closed sign. You can allways search for restaurants that are open now via the settings. 

### Found & fixed issues

- While adjusting my radius for a search I discovered the radius that was displayed as default was different from the standard radius used for searching
    - Adjusted the html code to display the correct radius
    - Also changed the units to kilometers to be more consistent

- While letting other people try the page on their mobile phone I found out that people were clkicking the map and resultslist before it was completely loaded
    - Implemented a pre-loader animation so users can see that the page is busy loading

- While getting directions with my location turned off I got the same error message as if I was trying to do a geographical search
    - Made the error handling source dependent
     
- While testing very remote regions I discovered that sometimes certain keys, like reviews / photos and addresses, were not present in the place object and then the api server would either produce an error or the page would show a broken image or undefined parameter on screen.
    - Build in failsafes to first test for availabilty and in that case produce an empty string or a standard image. 

- While testing with manual searches I discovered it did not allways point to the right region when using a query.
    - Added the geocoding library to convert city/region names into coordinates so a nearby search can be used. With this method the radius parameter in the settings panel now also works for this kind of searches 

- While testing 'on location' in Amsterdam I found out it was impossible to see where you are on the results-map.
    - Added a blue pin so you can see where you are in the resultsmap.

- While testing error messages on wider screens I discovered the lay-out of the page broke when wanted to switch back to my resultslist anmd the map.
    - Let the error section use the details-sections' position on the bigger screen modes.

### Tools
- [w3c Markup Validation](https://validator.w3.org)
    - HTML validation: No errors
- [w3c CSS Validation](https://jigsaw.w3.org/css-validator)
    - CSS validation: No errors
- [Chrome development tools](https://developers.google.com/web/tools/chrome-devtools)
    - Css / responsive behaviour
- [JSHint](https://jshint.com)
    - Javascript code: No errors

### Devices
- Huawei p20 pro
- iphone 7
- iphone 11 pro
- Samsung Galaxy tab Pro (SM-T325)

### Users

### Test stories
- Opened the page
- Pushed the ```geographical search button``` on the front screen
    - Found restaurants in a 4 kilometer radius around me
- Pushed the ```settings icon``` in the header
- Selected 10km on the ```radius slider```
- Pushed the ```geographical search-button``` next to it
    - Found more restaurants in a wider area
- Selected ```vegan``` in the settings menu
- Pushed the ```geographical search-button```
    - Found less restaurants that met the criteria    
- Selected ```Greek cuisine``` in the settings menu
- Pushed the ```geographical search-button```
    - Found only 3 restaurants
- Selected ```Open now``` from the settings menu
- Pushed the ```geographical search-button```
    - Got the message that nothing was found and I had to adjust my settings
- Clicked ```Find me-eat . . .``` in the header
    - Was taken back to the front page and my settings were reset

- Turned off my location
- Opened the page
- Pushed the ```geographical search-button``` on the front screen
    - Got the message that my location is unknown and I have to make a manual search

- Opened the page
- Started typing in the ```search bar```
    - An autocomplete window above the search bar showed
- Selected ```Bandung City, west java```
    - Found restaurants
- Selected ```10km``` on the radius slider
- Pushed the searchbutton in the footer
    - Found more restaurants in a wider area
- Selected ```vegan``` in the settings menu
- Pushed the ```search-button``` in the footer
    - Found less restaurants that met the criteria    
- Selected ```Greek cuisine``` in the settings menu
- Pushed the ```search-button``` in the footer
    - Found only 1 restaurants
- Selected ```Open now``` from the settings menu
- Pushed the ```search-button``` in the footer
    - Got the message that nothing was found and I had to adjust my settings

- Opened the page
- Pushed the ```geographical search-button``` on the front screen
    - Found restaurants in a 4 kilometer radius around me
- Clicked on a restaurant in the list
    - A bigger picure folded out
- Clicked on the ```i```
    - Taken to the details page
    - Got the address, latest review, and opening hours
- Clicked on the ```camera```
    - Got 10 pictures of the restaurant
- Clicked on the ```restaurant name```
    - Went back to the details page
- Clicked the ```reviews button```
    - Got the 5 latest reviews
- Clicked on the ```restaurant name```
    - Went back to the details page
- Clicked on the ```globe```
    - Was taken to the website of the restaurant in a new tab
- Clicked the direction arrow
    - Got directions from my location
- Selected ```by bike``` from the settings menu
- Clicked the ```list icon``` in the header
- Clicked the ```direction arrow``` in the list
    - Got different directions
- Selected ```by car``` from the settings menu
- Clicked the ```list icon``` in the header
- Clicked the ```direction arrow``` in the list
    - Got different directions
- Moved to another location (physically)
- Clicked on the ```pin button``` on the direction map
    - Saw the blue pin move to my new location
- Turned of my location
- Did another direction search
    - Got a message that my location is unknown and I can't get directions

- Opened the page
- Started typing in the ```search bar```
    - An autocomplete window above the search bar showed
- Selected ```Bandung City, west java```
    - Found restaurants
    - Saw that a restaurant with no images of its own had the standard image in the list
- Opened its detail page
    - Saw that there was no ```globe button``` for the website
- Clicked on the ```camera```
    - Saw no photos
- Clicked to get directions
    - Got a message that this is way too far to get something to eat

- Opened the page
- Hit the ```search button``` in the footer
    - Got the message that I wasn't understood and had to make a new manual of geographical search
- Entered some random numbers and characters in the ```search bar```
    - Got the message that I wasn't understood and had to make a new manual of geographical search

- Opened the page
- Made a geographical search
    - The list icon and map icon appeared in the header 
- Pushed the ```map button```
    - Was taken to the map
- Clicked on a found ```restaurant```
    - Saw an information window with a picure and the rating of the restaurant
- Clicked the ```info-window```
    - Was taken to the details page of that restaurant
    - The details icon in the header appeared
- Clicked the ```directions button```
    - Was taken to the direction map
    - The directions icon in the header appeared
- Clicked ```all four buttons``` in the header
    - Cycled through all the sections
- Clicked ```Find me eat . . .```
    - Taken to the front page and all buttons in the header dissapeared

### Network used for review
- Mentor sessions
- Friends family and their mobile devices

### Form

### Responsive behaviour (Chrome devtools)
#### 360 - 768 in landscape & portrait mode / 360 - 992 in portrait mode
-All section use the whole screen
-Whenever a section is populated the switch icon will appear in the header

#### 768 - 1200 in landscape mode / 992 - 1200 in portrait mode
-The screen is divided into 2 columns
-Left column shows the resultslist or the detail page
-Right column shows the results-map or the direction-map
-Whenever a section is populated the switch icon will appear in the header

#### 1200 - 3840
-The screen is divide into 2 small columns and 1 big one on the right
-The resultslist and detailpage are always visible
-The results-map and direction-map are swichable
-Only the map switches are visible, once populated

## Deployment
### Github Pages
This project was deployed via github pages from the ```master branch```

#### This was done following this procedure:
1. Goto the repository on Github: [Github](https://github.com/Evert-R/milestone-two)
2. Goto ```Settings```
3. Select ```Github pages```
4. Use the ```select source``` dropdown to select the ```master branch```
5. Click ```Save```

The Github pages are now being built.

[Click here to view the deployed website](https://evert-r.github.io/milestone-two)


### Local
To clone this website locally use the following command in your terminal:
- ```git clone https://github.com/Evert-R/milestone-two.git```

To cut ties with this repository:
- ```git remote rm origin```

### Live
- To run this website live, copy all files and folders to the root directory of your webserver.

## Credits
- The methods for accessing the google maps api's are based on the api's documentation
    - [Tutorials](https://developers.google.com/maps/documentation/javascript/tutorial)
    - [Documentation](https://developers.google.com/maps/documentation/javascript/places)

### Content
- [Evert Rot](https://evertrot.nl)
    - Webdesign/coding
- [Star-rating image](http://www.pngmart.com/image/tag/star-rating)
- [Pricing image](https://www.pngfly.com/png-1ukbp8/download.html)
- [Standard image for restaurant](http://www.iconarchive.com/show/colorful-long-shadow-icons-by-graphicloads/restaurant-icon.html)
- [pre-loader image](https://icons8.com/preloaders)
- [Inspiration for collapsible list-items](https://www.w3schools.com/howto/howto_js_collapsible.asp)
- [Inspiration for fullscreen mode](https://www.w3schools.com/HOWTO/howto_js_fullscreen.asp)

### Api
- [Google Places library](https://developers.google.com/maps/documentation/javascript/places)
    - Search for places, plot them on a map and retrieve detailed information
- [Google Directions](https://developers.google.com/maps/documentation/javascript/directions)
    - Finding the route to a restaurant and plot this on a map
- [Google Geocoding library](https://developers.google.com/maps/documentation/javascript/geocoding)
    - Convert city/region name to coordinates
- [Google geometry library](https://developers.google.com/maps/documentation/javascript/geometry)
    - Calculate distance between the user and the restaurant
