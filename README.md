# Milestone-two

### Deployed version 
[https://evert-r.github.io/milestone-two](https://evert-r.github.io/milestone-two)

## UX
### For who this website is created 
- This website is created for the non-profit organisation 'Geen eieren voor je geld'. Wich in dutch literally means 'No eggs for your money', wich is an old saying and means that you get good value for your money. This organisation wants to promote a vegetarian/vegan lifestyle by providing vegan-cooking workshops, and now via the development of this new web-app.

### At who this website is targeted
- Vegatarians, vegans and other interested people from all over the world.

### What does the organisation wants to achieve with this website
- They want to make it easy to find vegetarian/vegan restaurants wherever you are in the world.


### User stories
1. As a user who is visiting a new region I want to be able to search for a vegetarian restaurant with one press of a button
2. As a user who searches a restaurant based on my location I want to set the radius to search in
2. As a user who doesn't want it's phone or tablet to know my location I want to be able to manually type in the place where I am.
3. As a user who is vegan I want to be able to search for vegan only places.
4. As a user who is planning a trip I want to be able to search from a desktop computer
5. As a user who is deciding on a restaurant I want to be able to see the price-range and ratings straight in the search results
6. As a user who found a place I want to be able to see some details
7. As a user who found a place I want to be able to read some reviews
8. As a user who found a place I want to be able to see some photos of the restaurant
5. As a user who found a place to eat I want to be able to get directions
6. As a user who is getting directions I want to be able to choose wich method of travelling I prefer  

### Mock-ups
The mock-ups for this project are in the UXD folder wich you will find in the root of this project.
- [Wireframe1](UXD/.jpg)
- [Wireframe2](UXD/.jpg)

### Concept
This webpage will let you make a search for restaurants in a specified radius (max 5km) around you, or in a specific destination. It presents you the rating, pricelevel, adress, wether the place is open or not, some reviews and pictures and finally calculates your route to the selected restaurant based on your method of transportation.
The main focus will be on mobile devices as its main purpose is to be used on the road, but it will also work on all desktop devices.
 
### Basic features
- Geographical search
- Manual search
- Select radius for geo-search
- Select vehicle for directions
- Select only open restaurants
- View adress details
- view revies
- view all available photos
- Get directions from you location 
- Created for 360 x 640 most common mobile

### Optional Features to be implemented later
- Get direction without the app knowing your location



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
### Tools
- [w3c Markup Validation](https://validator.w3.org)
    - HTML validation: No errors
- [w3c CSS Validation](https://jigsaw.w3.org/css-validator/validator)
    - CSS validation: No errors
- [Chrome development tools](https://developers.google.com/web/tools/chrome-devtools)
    - Css / responsive behaviour

### Users


### Network used for review
- Mentor sessions
- Slack channel #peer-code-review

### Links and content


### Form

### Responsive behaviour (Chrome devtools)
#### 576 - 768


#### 768 - 992


##### 992 - 1200


##### 1200 - 1920


### Known issues


### Fixed issues


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
- ```git clone https://github.com/Evert-R/milestone-one.git```

To cut ties with this repository:
- ```git remote rm origin```

### Live
- To run this website live, copy all files and folders to the root directory of your webserver.

## Credits
- The methods for accessing the google maps api's are based on the api's documentation
    - [Documentation](https://developers.google.com/maps/documentation/javascript/tutorial)

### Content
- [Evert Rot](https://evertrot.nl)
    - Webdesign/coding
    - Text in the about section
- [Starrating image](http://www.pngmart.com/image/tag/star-rating)
- [Pricing image](https://www.pngfly.com/png-1ukbp8/download.html)
- [Inspiration for collapsible list-items](https://www.w3schools.com/howto/howto_js_collapsible.asp)

### Api
- [Google Places library](https://developers.google.com/maps/documentation/javascript/places)
    - Search for places, plot them on a map and retrieve detailed information
-  [Google Directions](https://developers.google.com/maps/documentation/javascript/directions)
    - Finding the route to a restaurant and plot this on a map














