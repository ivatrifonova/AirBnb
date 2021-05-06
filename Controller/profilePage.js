const homeTemplateFavoriteHTML = getElementById("home-template-myProfile").innerHTML;
const homeTemplateReservedHTML = getElementById("home-template-myProfile2").innerHTML;
const templateFavorite = Handlebars.compile(homeTemplateFavoriteHTML);
const templateReserved = Handlebars.compile(homeTemplateReservedHTML);
const splideListFavorite = getElementById("splide__list");
const splideList2Reserved = getElementById("splide__list2");
const profileName = getElementById("profile-name");
const profileUsername = getElementById("profile-username");
const label = getElementById("label-change-photo");
const userFontAwesome = getElementById("user-fontawesome");
const userImgNav = getElementById("user-img-nav");
const favoriteHomesDiv = getElementById("favorite-homes-div");
const reservedHomesDiv = getElementById("reserved-homes-div");

FORM_LOGIN.addEventListener("submit", (ev) => {
    ev.preventDefault();
    fillMyProfile();
});

window.addEventListener("DOMContentLoaded", () => {
    if (LOGGED_USER) {
        fillMyProfile();
        showSliders();
    }
})

function showSliders() {
    splideListFavorite.innerHTML = "";
    splideList2Reserved.innerHTML = "";

    let html = templateFavorite({ homes: LOGGED_USER.likedHomes });
    let html2 = templateReserved({ homes: LOGGED_USER.reservedHomes });

    splideListFavorite.innerHTML = html;
    splideList2Reserved.innerHTML = html2;

    addEventlistenersToHomesInProfile();

    new Splide('#splide', {
        type: "slides",
        perPage: 3,
        perMove: 1,
    }).mount();
    new Splide('#splide2', {
        type: "slides",
        perPage: 3,
        perMove: 1,
    }).mount();
}

function fillMyProfile() {
    profileName.innerText = LOGGED_USER.name;
    profileUsername.innerText = LOGGED_USER.username;
}

function addEventlistenersToHomesInProfile() {
    LOGGED_USER.likedHomes.forEach(home => {
        let stringId = String(home.id);
        let element = getElementById(stringId + "-splide");
        element.addEventListener("click", () => changeHash(stringId));
    });
    LOGGED_USER.reservedHomes.forEach(home => {
        let stringId = String(home.id);
        let element = getElementById(stringId + "-splide2");
        element.addEventListener("click", () => changeHash(stringId));
    });
}

function changeHash(stringId) {
    location.hash = stringId + "-home";
    showDetailedHome();
}







