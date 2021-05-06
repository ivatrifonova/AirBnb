function getElementById(element) {
    return document.getElementById(element);
}

function currentHomeId() {
    return parseInt(location.hash.slice(1));
}