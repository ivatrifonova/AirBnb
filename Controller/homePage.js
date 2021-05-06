let filterHomePage = document.getElementById("homePage-filter-form");
let entireHomesLinkHomePage = document.getElementById("liveAnywhere-div-entireHomes");
let cabinsLinkHomePage = document.getElementById("liveAnywhere-div-cabinsAndCottages");
let uniqueLinkHomePage = document.getElementById("liveAnywhere-div-uniqueStays");
let petsAllowedLinkHomePage = document.getElementById("liveAnywhere-div-petsWelcome");
let formSignIn = document.getElementById("signIn-form");
let signinUsername = document.getElementById("username-signIn");
let signinName = document.getElementById("name-signIn");
let signinPassword = document.getElementById("password-signIn");
let signinPasswordRepeat = document.getElementById("password-signIn-Repeat");
let warningParagraph = document.getElementById("warning-signIn");

// inputs
let homePageFilterLocation = document.getElementById("filter-input-location");
let homePageFilterCheckIn = document.getElementById("filter-input-checkIn");
let homePageFilterCheckOut = document.getElementById("filter-input-checkOut");
let homePageFilterGuests = document.getElementById("filter-input-guests");

// divs
let homePageFilterLocationDiv = document.getElementById("location");
let homePageFilterCheckInDiv = document.getElementById("homePage-filter-checkIn-div");
let homePageFilterCheckOutDiv = document.getElementById("homePage-filter-checkOut-div");
let homePageFilterGuestsDiv = document.getElementById("homePage-filter-guests-div");
let homePageLoginDiv = document.getElementById("homePage-login-external-div");
let homePageSignInDiv = document.getElementById("homePage-signIn-external-div");

// paragraphs
let homePageFilterLocationParagraph = document.getElementById("homePage-filter-location-secondText");
let homePageFilterCheckInParagraph = document.getElementById("homePage-filter-checkIn-secondText");
let homePageFilterCheckOutParagraph = document.getElementById("homePage-filter-checkOut-secondText");
let homePageFilterGuestsParagraph = document.getElementById("homePage-filter-guests-secondText");

// elements who open and close
let profileInHeader = document.getElementById("profileInHeader");
let dropdownProfileInHeader = document.getElementById("dropdown-profileInHeader");
let logIn = document.getElementById("homePage-logIn");
let linkLogIn = document.getElementById("dropdown-logIn");
let closeButtonLogIn = document.getElementById("close-logIn-homePage");
let linkSignUp = document.getElementById("dropdown-signIn");
let closeButtonSignIn = document.getElementById("close-signIn-homePage");
let signIn = document.getElementById("homePage-signIn");
let myProfileLink = document.getElementById("my-profile");
let logo = document.getElementById("homePage-logo");

// eventListeners for links in Home Page
entireHomesLink.addEventListener("click", showEntireHomes);

cabinsLink.addEventListener("click", showAllCabins);

uniqueLink.addEventListener("click", showUnique);

petsAllowedLink.addEventListener("click", showPetsAllowedHomes);

window.addEventListener("DOMContentLoaded", changePhotoOfUser);


homePageFilterLocationDiv.addEventListener("click", function () {
    homePageFilterLocationParagraph.style.display = "none";
    homePageFilterLocation.style.display = "block";
});

homePageFilterCheckInDiv.addEventListener("click", function () {
    homePageFilterCheckInParagraph.style.display = 'none';
    homePageFilterCheckIn.style.display = 'block';
});

homePageFilterCheckOutDiv.addEventListener("click", function () {
    homePageFilterCheckOutParagraph.style.display = 'none';
    homePageFilterCheckOut.style.display = 'block';
});

homePageFilterGuestsDiv.addEventListener("click", function () {
    homePageFilterGuestsParagraph.style.display = 'none';
    homePageFilterGuests.style.display = 'block';
});

profileInHeader.addEventListener("click", () => { dropdownProfileInHeader.style.visibility === 'hidden' ? dropdownProfileInHeader.style.visibility = 'visible' : dropdownProfileInHeader.style.visibility = "hidden" });


myProfileLink.addEventListener("click", () => {
    location.hash = 'profile';
    dropdownProfileInHeader.style.visibility = "hidden";
});

linkSignUp.addEventListener("click", openSignUp);
linkLogIn.addEventListener("click", openLogIn);

closeButtonLogIn.addEventListener("click", () => {
    homePageLoginDiv.style.display = 'none';
    logIn.style.display = 'none';
    window.removeEventListener('scroll', scroll);
});

closeButtonSignIn.addEventListener("click", () => {
    homePageSignInDiv.style.display = 'none';
    signIn.style.display = 'none';
    window.removeEventListener('scroll', scroll);
});

logo.addEventListener("click", () => {
    location.hash = 'PlacesToStay';
});

function hideLogInAndSignUp(boolean) {
    if (boolean) {
        linkLogIn.style.display = "flex";
        linkSignUp.style.display = "flex";
        myProfileLink.style.display = "none";
    } else {
        linkLogIn.style.display = "none";
        linkSignUp.style.display = "none";
        myProfileLink.style.marginTop = "2vw";
        myProfileLink.style.display = "flex";
    }
}

function scroll() {
    window.scrollTo(0, 0);
}

function changePhotoOfUser() {
    if (LOGGED_USER) {
        hideLogInAndSignUp(false);
    } else {
        hideLogInAndSignUp(true);
    }
}

function showPetsAllowedHomes() {
    location.hash = "homePage-filtered-homes-section";
    filteredHomesArray.homes = homeManager.homes.filter(home => home.pets === true);
    additionallyFilteredHomes.homes = homeManager.homes.filter(home => home.pets === true);
    title.innerText = "Explore Pets Allowed Places";
    showHomes();
}

function showUnique() {
    location.hash = "homePage-filtered-homes-section";
    filteredHomesArray.homes = filterByType(homeManager.homes, "unique");
    additionallyFilteredHomes.homes = filterByType(homeManager.homes, "unique");
    title.innerText = "Explore Unique Places";
    buttonApartments.element.style.display = "none";
    buttonCabinsAndCottages.element.style.display = "none";
    buttonUniqueHomes.element.style.display = "none";
    showHomes();
}

function showAllCabins() {
    location.hash = "homePage-filtered-homes-section";
    filteredHomesArray.homes = filterByType(homeManager.homes, "cottage/cabin");
    additionallyFilteredHomes.homes = filterByType(homeManager.homes, "cottage/cabin");
    title.innerText = "Explore Cabins And Cottages";
    buttonApartments.element.style.display = "none";
    buttonCabinsAndCottages.element.style.display = "none";
    buttonUniqueHomes.element.style.display = "none";
    showHomes();
}

function showEntireHomes() {
    location.hash = "homePage-filtered-homes-section";
    filteredHomesArray.homes = homeManager.homes;
    additionallyFilteredHomes.homes = homeManager.homes;
    title.innerText = "Explore Entire Homes";
    showHomes();
}
function resetDesignOfFilter() {
    homePageFilterLocationParagraph.style.display = "flex";
    homePageFilterLocation.style.display = "none";
    homePageFilterCheckInParagraph.style.display = 'flex';
    homePageFilterCheckIn.style.display = 'none';
    homePageFilterCheckOutParagraph.style.display = 'flex';
    homePageFilterCheckOut.style.display = 'none';
    homePageFilterGuestsParagraph.style.display = 'flex';
    homePageFilterGuests.style.display = 'none';
}

function openSignUp() {
    homePageSignInDiv.style.display = "block";
    signIn.style.display = 'flex';
    window.addEventListener('scroll', scroll);
    dropdownProfileInHeader.style.visibility = "hidden";
}
function openLogIn() {
    homePageLoginDiv.style.display = "block";
    logIn.style.display = 'flex';
    window.addEventListener('scroll', scroll);
    dropdownProfileInHeader.style.visibility = "hidden";
}
