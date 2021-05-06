const homeManager = (function () {
    class HomeManager {
        constructor() {
            this.homes = [];
        }
        addHome(home) {
            let isThereTheSameHome = this.homes.some(homeFromArray => homeFromArray.id === home.id);
            if (!isThereTheSameHome) this.homes.push(home);
        }
        removeHome(home) {
            this.homes.splice(this.homes.indexOf(home), 1);
        }
        filter(location, capacity) {
            let filteredHomes = this.homes.filter(home => home.location === location && home.capacity >= capacity);
            return filteredHomes;
        }
    }
    return new HomeManager();
})();
