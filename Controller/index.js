// Initial DOM elements selectors
  let homePage = getElementById("PlacesToStay");
  let filteredHomesPage = getElementById("homePage-filtered-homes-section");
  let detailedHomeElement = getElementById("detailed-home");
  let profilePage = getElementById("profile");
  let currentHome; 

  function Router() {
    let url = location.hash.slice(1);

    switch (url) {
      case "PlacesToStay": {
        placesToStay();
        break;
      }
      case "homePage-filtered-homes-section": {
        filteredHomes();
        break;
      }
      case "profile": {
        profile();
        break;
      }
      default: {
        defaultCase();
        break;
      }
    }
  }
  function placesToStay() {
    homePage.style.display = "flex";
    homePage.style.height = "210vw";
    detailedHomeElement.style.display = "none";
    filteredHomesPage.style.display = "none";
    profilePage.style.display = "none";

  }
  
  function defaultCase() {
    let url = location.hash.slice(1);
    parseInt(url, 10);
    if (url) {
      detailedHome();
      currentHome = homeManager.homes[parseInt(url) -1];

    } else {
      placesToStay();
    }
  }
  window.addEventListener("hashchange", Router);
  
  window.addEventListener("DOMContentLoaded", () => {
    location.hash = "PlacesToStay";
    Router();
  });

  function filteredHomes() {
    homePage.style.height = "6.8vw";
    detailedHomeElement.style.display = "none";
    profilePage.style.display = "none";
    filteredHomesPage.style.display = "flex";
 
  }

  function detailedHome() {
    homePage.style.height = "6.8vw";
    filteredHomesPage.style.display = "none";
    profilePage.style.display = "none";
    detailedHomeElement.style.display = "flex";
    showDetailedHome();
  }

  function profile() {
    homePage.style.height = "6.8vw";
    filteredHomesPage.style.display = "none";
    detailedHomeElement.style.display = "none";
    profilePage.style.display = "flex";
    showSliders();
    
  }

