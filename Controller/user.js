let loginUsername = getElementById("username-logIn");
let loginPassword = getElementById("password-logIn");
let warningParagraphLogin = getElementById("warning-login");

createLoggedUser();

function createLoggedUser() {
    if (localStorage.getItem("users")) {
        userManager.users = JSON.parse(localStorage.getItem("users"));
        LOGGED_USER = new User(userManager.users[0].username, userManager.users[0].name, userManager.users[0].password, userManager.users[0].likedHomes, userManager.users[0].reservedHomes, userManager.users[0].photo);
    }
}

function addToLiked() {
        LOGGED_USER.addToLiked(currentHome);
        setLocalStorageData();
}
   
function addToReserved() {
        LOGGED_USER.addToReserved(currentHome);
        setLocalStorageData();
   
}
function removeFromLiked() {
    LOGGED_USER.removeFromLiked(currentHomeId());
    setLocalStorageData();
}
function setLocalStorageData() {
    userManager.users[0] = LOGGED_USER;
    localStorage.setItem("users", JSON.stringify(userManager.users));
}

formSignIn.addEventListener("submit", (ev) => {
    ev.preventDefault();
    let username = signinUsername.value;
    let name = signinName.value;
    let password = signinPassword.value;
    let passwordRepeat = signinPasswordRepeat.value;

    let validData = userManager.validateUser(username, password);

    if (password === passwordRepeat) {
        if (validData) {
            userManager.registerUser(username, name, password, " ");
            localStorage.setItem("users", JSON.stringify(userManager.users));
            warningParagraph.innerText = '';
            homePageSignInDiv.style.display = 'none';
            signIn.style.display = 'none';
            window.removeEventListener('scroll', scroll);
        } else {
            warningParagraph.innerText = "Username and Password should be at least 6 symbols";
        }
    } else {
        warningParagraph.innerText = "Passwords are not the same";
    }
    formSignIn.reset();
});

FORM_LOGIN.addEventListener("submit", (ev) => {
    ev.preventDefault();
    let username = loginUsername.value;
    let password = loginPassword.value;

    let existingUser = userManager.login(username, password);

    if (existingUser) {
        homePageLoginDiv.style.display = 'none';
        logIn.style.display = 'none';
        window.removeEventListener('scroll', scroll);
        warningParagraphLogin.innerText = '';
        hideLogInAndSignUp(false);
        fillMyProfile();
        createLOGED_USER();
    } else {
        warningParagraphLogin.innerText = "There is no user with this username or password";
    }
    FORM_LOGIN.reset();
});
