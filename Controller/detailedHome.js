const titleOfDetailedHome = getElementById("title-detailed-home");
const peopleReservedThisHome = getElementById("people-reserved-this-home");
const reserveButton = getElementById("reserve-home");
const likeHomeGreyButton = getElementById("div-like-home-grey");
const likeHomeRedButton = getElementById("div-like-home-red");
const descriptionOfHome = getElementById("description-detailed-home");
const detailedHomeImage = getElementById("detailed-home-image");


//amenities
const parkingAmenities = {
    "grey": getElementById("parkingGreyColorOfAmenities"),
    "white": getElementById("parkingWhiteColorOfAmenities"),
}
const swimmingPoolAmenities = {
    "grey": getElementById("swimmingGreyColorOfAmenities"),
    "white": getElementById("swimmingWhiteColorOfAmenities"),
}
const smokingAmenities = {
    "grey": getElementById("smokingGreyColorOfAmenities"),
    "white": getElementById("smokingWhiteColorOfAmenities"),
}
const bathAmenities = {
    "grey": getElementById("bathGreyColorOfAmenities"),
    "white": getElementById("bathWhiteColorOfAmenities"),
}
const airConditioningAmenities = {
    "grey": getElementById("airGreyColorOfAmenities"),
    "white": getElementById("airWhiteColorOfAmenities"),
}
const wifiAmenities = {
    "grey": getElementById("wifiGreyColorOfAmenities"),
    "white": getElementById("wifiWhiteColorOfAmenities"),
}
const tvAmenities = {
    "grey": getElementById("tvGreyColorOfAmenities"),
    "white": getElementById("tvWhiteColorOfAmenities"),
}
const coffeeMachineAmenities = {
    "grey": getElementById("coffeeGreyColorOfAmenities"),
    "white": getElementById("coffeeWhiteColorOfAmenities"),
}
const accessibilityAmenities = {
    "grey": getElementById("accessibilityGreyColorOfAmenities"),
    "white": getElementById("accessibilityWhiteColorOfAmenities"),
}
const basicAmenities = {
    "grey": getElementById("basicGreyColorOfAmenities"),
    "white": getElementById("basicWhiteColorOfAmenities"),
}


//functions
function showDetailedHome() {
    let homeId = currentHomeId();
    let indexOfHome = homeManager.homes.findIndex(home => home.id === homeId);
    let homeObject = homeManager.homes[indexOfHome];

   
    if(LOGGED_USER) {
 //likedHomes
        if (LOGGED_USER.likedHomes.some((home) => home.id === homeObject.id)) {
            changeLikeButton("red");
        } else {
            changeLikeButton("grey");
        }
        // reservedHomes
        if (LOGGED_USER.reservedHomes.some((home) => home.id === homeObject.id)) {
            changeReservedButton("reserved");
        } else {
            changeReservedButton("reserve");
        }
    }
    fillDetailedHome(homeObject);
    changeColorOfAmenities(homeObject);
}


function changeColorOfAmenities(home) {
    for (let property in home.equipment) {
        switch (property) {
            case "parking":
                (home.equipment[property]) ? parkingAmenities.grey.style.display = 'none' : parkingAmenities.white.style.display = 'none';
                break;
            case "swimmingPool":
                (home.equipment[property]) ? swimmingPoolAmenities.grey.style.display = "none" : swimmingPoolAmenities.white.style.display = "none";
                break;
            case "smoking":
                (home.equipment[property]) ? smokingAmenities.grey.style.display = 'none' : smokingAmenities.white.style.display = 'none';
                break;
            case "bath":
                (home.equipment[property]) ? bathAmenities.grey.style.display = 'none' : bathAmenities.white.style.display = 'none';
                break;
            case "airConditioning":
                (home.equipment[property]) ? airConditioningAmenities.grey.style.display = 'none' : airConditioningAmenities.white.style.display = 'none';
                break;
            case "wifi":
                (home.equipment[property]) ? wifiAmenities.grey.style.display = 'none' : wifiAmenities.white.style.display = 'none';
                break;
            case "tv":
                (home.equipment[property]) ? tvAmenities.grey.style.display = 'none' : tvAmenities.white.style.display = 'none';
                break;
            case "coffeeMachine":
                (home.equipment[property]) ? coffeeMachineAmenities.grey.style.display = 'none' : coffeeMachineAmenities.white.style.display = 'none';
                break;
            case "accessibility":
                (home.equipment[property]) ? accessibilityAmenities.grey.style.display = 'none' : accessibilityAmenities.white.style.display = 'none';
                break;
            case "basicAmenities":
                (home.equipment[property]) ? basicAmenities.grey.style.display = 'none' : basicAmenities.white.style.display = 'none';
                break;
        }
    }
}

likeHomeGreyButton.addEventListener("click", () => {
    if(LOGGED_USER) {
        changeLikeButton("red");
        addToLiked();
        showSliders();
    } else {
        openSignUp();
    }
    
});

likeHomeRedButton.addEventListener("click", () => {
    if(LOGGED_USER) {
        changeLikeButton("grey");
        removeFromLiked();
    } else {
        openSignUp();
    }
    
});
reserveButton.addEventListener("click", () => {
    if(LOGGED_USER) {
        reserveButton.style.display = "none";
        addToReserved();
    } else {
        openSignUp();
    }
   
});

function changeLikeButton(color) {
    if (color === "red") {
        likeHomeGreyButton.style.display = "none";
        likeHomeRedButton.style.display = "flex";
    } else {
        likeHomeGreyButton.style.display = "flex";
        likeHomeRedButton.style.display = "none";
    }
}

function changeReservedButton(text) {
    if (text === "reserve") {
        reserveButton.innerText = "Reserve";
    } else {
        reserveButton.style.display = "none";
    }
}

function fillDetailedHome(homeObject) {
    titleOfDetailedHome.innerText = homeObject.name;
    peopleReservedThisHome.innerText = homeObject.booked + " people booked this home";
    descriptionOfHome.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    detailedHomeImage.src = homeObject.image;
}


