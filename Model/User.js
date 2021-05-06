class User {
    constructor(username, name, password,likedHomes = [],reservedHomes = [], photo = "../View/pictures/profile.png") {
        this.username = username;
        this.name = name;
        this.password = password;
        this.likedHomes = likedHomes;
        this.reservedHomes = reservedHomes;
        this.photo = photo;
       }
       addToLiked(home) {
           this.likedHomes.push(home);
       }
       removeFromLiked(id) {
        let object = this.likedHomes.filter((home)=> home.id === id);
        let index = this.likedHomes.indexOf(object[0]);
        this.likedHomes.splice(index, 1);
       }
       addToReserved(home) {
           this.reservedHomes.push(home);
       }
}