class UserManager {
    constructor() {
        if (localStorage.getItem("users")) {
            this.users = JSON.parse(localStorage.getItem("users"));
        } else {
            this.users = [];
        }
    }
    registerUser(username, name, password) {
        this.users.push(new User(username, name, password));
        localStorage.setItem("users", JSON.stringify(this.users));
    }
    login(username, password) {
        const isUserLoggedIn = this.users.some(
            (user) => user.username === username && user.password === password
        );
        return isUserLoggedIn;
    }
    validateUser(username, password) {
        if (username.trim().length > 6 && password.trim().length >= 6 && !(this.users.some((user) => user.username === username))) {
            return true;
        }
        return false;
    }
}

let userManager = new UserManager();