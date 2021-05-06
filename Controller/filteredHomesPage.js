// handlebars 
const homeTemplateHTML = getElementById("home-template").innerHTML;
const template = Handlebars.compile(homeTemplateHTML);

//elements
const filteredHomesDiv = getElementById("homePage-filtered-homes-div");
const filter = getElementById("homePage-filter-form");
const filterInputTown = getElementById("filter-input-location");
const filterInputCapacity = getElementById("filter-input-guests");
const title = getElementById("title-filtered-homes");
const entireHomesLink = getElementById("liveAnywhere-div-entireHomes");
const cabinsLink = getElementById("liveAnywhere-div-cabinsAndCottages");
const uniqueLink = getElementById("liveAnywhere-div-uniqueStays");
const petsAllowedLink = getElementById("liveAnywhere-div-petsWelcome");
const viewOne = getElementById("one-row-view");
const viewTwo = getElementById("two-row-view");
const viewFour = getElementById("four-row-view");
const warningFilter = getElementById("warning-filter");

let view = 4;

//buttons for sort
let buttonAscendingPrice = {
    "element": getElementById("button-ascending-price-homes"),
    "click": false,
};
let buttonDescendingPrice = {
    "element": getElementById("button-descending-price-homes"),
    "click": false,
};
let buttonCapacity = {
    "element": getElementById("button-capacity-homes"),
    "click": false,
};
let buttonBooked = {
    "element": getElementById("button-booked-homes"),
    "click": false,
};

//buttons for filter
let buttonPetsAllowed = {
    "element": getElementById("button-petsAllowed-homes"),
    "click": false,
    "type": "pets",
};
let buttonApartments = {
    "element": getElementById("button-apartments-homes"),
    "click": false,
    "type": "apartment",
};
let buttonCabinsAndCottages = {
    "element": getElementById("button-cabinsAndCottages-homes"),
    "click": false,
    "type": "cottage/cabin",
};
let buttonUniqueHomes = {
    "element": getElementById("butoon-unique-homes"),
    "click": false,
    "type": "unique",
};

//arrays 
let filteredHomesArray = {
    homes: [],
}
let additionallyFilteredHomes = {
    homes: [],
}

let arrayWithButtonsForFilter = [buttonApartments, buttonCabinsAndCottages, buttonUniqueHomes];
let arrayWithButtonsForSort = [buttonAscendingPrice, buttonDescendingPrice, buttonCapacity, buttonBooked];

//test objects
homes.forEach(home => homeManager.addHome(home));


//eventlisteners 
filter.addEventListener("submit", (event) => {
    event.preventDefault();
    let filterTown = filterInputTown.value;
    let filterCapacity = filterInputCapacity.value;
    let properlyCompleted = checkValuesOfFilter(filterTown, filterCapacity);
    if (properlyCompleted) {
        warningFilter.style.display = "none";
        filterHomes(filterTown, filterCapacity);
        location.hash = "homePage-filtered-homes-section";
        filter.reset();
        resetDesignOfFilter();
    } else {
        warningFilter.style.display = "block";
    }
});

//buttons
buttonAscendingPrice.element.addEventListener("click", () => {
    additionallyFilteredHomes.homes = orderByAscendingPrice();
    changeWeightOfTheTextAndClickPropertyOfTheButton(buttonAscendingPrice);
    showHomes();
});

buttonDescendingPrice.element.addEventListener("click", () => {
    additionallyFilteredHomes.homes = orderByDescendingPrice();
    changeWeightOfTheTextAndClickPropertyOfTheButton(buttonDescendingPrice);
    showHomes();
});

buttonCapacity.element.addEventListener("click", () => {
    additionallyFilteredHomes.homes = orderByCapacity();
    changeWeightOfTheTextAndClickPropertyOfTheButton(buttonCapacity);
    showHomes();
});

buttonBooked.element.addEventListener("click", () => {
    additionallyFilteredHomes.homes = orderByTimesBooked();
    changeWeightOfTheTextAndClickPropertyOfTheButton(buttonBooked);
    showHomes();
});

buttonPetsAllowed.element.addEventListener("click", () => {
    changeWeightOfTheTextAndClickPropertyOfTheButton(buttonPetsAllowed);
    createCustomArrayfromHomesWithPets();
});

buttonApartments.element.addEventListener("click", () => {
    changeWeightOfTheTextAndClickPropertyOfTheButton(buttonApartments);
    createCustomArrayfromHomes();
});

buttonCabinsAndCottages.element.addEventListener("click", () => {
    changeWeightOfTheTextAndClickPropertyOfTheButton(buttonCabinsAndCottages);
    createCustomArrayfromHomes();
});

buttonUniqueHomes.element.addEventListener("click", () => {
    changeWeightOfTheTextAndClickPropertyOfTheButton(buttonUniqueHomes);
    createCustomArrayfromHomes();
});

//view buttons
viewOne.addEventListener("click", () => {
    changeView(1);
});

viewTwo.addEventListener("click", () => {
    changeView(2);
});

viewFour.addEventListener("click", () => {
    changeView(4);
});

// functions for filtered homes
function showHomes() {
    filteredHomesDiv.innerHTML = "";
    let html = template(additionallyFilteredHomes);
    filteredHomesDiv.innerHTML = html;
    eventListenersForHomes();
    changeView(view);
}

function eventListenersForHomes() {
    additionallyFilteredHomes.homes.forEach(home => {
        let stringId = String(home.id);
        let element = getElementById(stringId);

        element.addEventListener("click", () => {
            location.hash = stringId + "-home";
            showDetailedHome();
        });
    });
}


function createCustomArrayfromHomesWithPets() {
    if (buttonPetsAllowed.click) {
        additionallyFilteredHomes.homes = additionallyFilteredHomes.homes.filter(home => home.pets === true);
        showHomes();
    } else {
        createCustomArrayfromHomes();
    }
}

function createCustomArrayfromHomes() {
    additionallyFilteredHomes.homes = [];
    let counterClickedButtons = 0;

    arrayWithButtonsForFilter.forEach(button => {
        if (button.click) {
            counterClickedButtons++;
            let newArray = filterByType(filteredHomesArray.homes, button.type);
            additionallyFilteredHomes.homes.push(...newArray);
        }
    });
    if (counterClickedButtons === 0) {
        additionallyFilteredHomes.homes = [...filteredHomesArray.homes];
    }
    showHomes();
}

function orderByAscendingPrice() {
    let ascendingPrice = additionallyFilteredHomes.homes.sort((a, b) => a.price - b.price);
    return ascendingPrice;
}

function orderByDescendingPrice() {
    let descendingPrice = additionallyFilteredHomes.homes.sort((a, b) => b.price - a.price);
    return descendingPrice;
}

function filterByType(array, type) {
    let filteredHomesByType = array.filter(home => home.type === type);
    return filteredHomesByType;
}

function orderByTimesBooked() {
    let orderedByTimesBooked = additionallyFilteredHomes.homes.sort((a, b) => b.booked - a.booked);
    return orderedByTimesBooked;
}

function orderByCapacity() {
    let orderedByCapacity = additionallyFilteredHomes.homes.sort((a, b) => a.capacity - b.capacity);
    return orderedByCapacity;
}

function changeWeightOfTheTextAndClickPropertyOfTheButton(objectClicked) {
    let isThereOneClickedButton = false;

    if (objectClicked.click) {
        objectClicked.click = false;
        objectClicked.element.style.fontWeight = "normal";
    } else {
        objectClicked.click = true;
        objectClicked.element.style.fontWeight = "bold";
        isThereOneClickedButton = true;
    }

    arrayWithButtonsForSort.forEach(button => {
        if (button === objectClicked) {
            return;
        } else {
            button.click = false;
            button.element.style.fontWeight = "normal";
        }
    });

    if (!isThereOneClickedButton) {
        additionallyFilteredHomes.homes = [];
        additionallyFilteredHomes.homes.push(...filteredHomesArray.homes);
    }
}

function filterHomes(town, capacity) {
    title.innerText = `Choose from the best locations in ${town}!`;
    filteredHomesArray.homes = homeManager.filter(town, capacity);
    additionallyFilteredHomes.homes = homeManager.filter(town, capacity);
    showHomes();
}

function changeView(number) {
    view = number;
    additionallyFilteredHomes.homes.forEach(home => {
        let stringId = String(home.id);
        let element = getElementById(stringId);
        let img = getElementById(stringId + "-img");
        let text = getElementById(stringId + "-text");
        let title = getElementById(stringId + "-title");
        let price = getElementById(stringId + "-price");

        switch (number) {
            case 1:
                element.className = "home-template-1";
                img.className = "home-template-img-1";
                text.className = "text-template-1";
                title.className = "template-title-1";
                price.className = "template-price-1";
                viewOne.style.backgroundColor = "rgb(196, 196, 196)";
                viewTwo.style.backgroundColor = "transparent";
                viewFour.style.backgroundColor = "transparent";
                break;
            case 2:
                element.className = "home-template-2";
                img.className = "home-template-img-2";
                text.className = "text-template-2";
                title.className = "template-title-2";
                price.className = "template-price-2";
                viewOne.style.backgroundColor = "transparent";
                viewTwo.style.backgroundColor = "rgb(196, 196, 196)";
                viewFour.style.backgroundColor = "transparent";
                break;
            case 4:
                element.className = "home-template-4";
                img.className = "home-template-img-4";
                text.className = "text-template-4";
                title.className = "template-title-4";
                price.className = "template-price-4";
                viewOne.style.backgroundColor = "transparent";
                viewTwo.style.backgroundColor = "transparent";
                viewFour.style.backgroundColor = "rgb(196, 196, 196)";
                break;
        }
    });
}
function checkValuesOfFilter(town, capacity) {
    if (town === "" || capacity <= 0) {
        return false;
    } return true;
}














