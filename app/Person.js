class Person {
    constructor(firstName, lastName, gender, email, key) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.email = email;
        this.key = key;
        // generate random age
        this.age = getRandomIntFromInterval(22, 36);
        // set relations random
        this.likes = {
            max: getRandomIntFromInterval(1, 10),
            persons: [],
        };

        this.loves = {
            max: getRandomIntFromInterval(1, 10),
            persons: [],
        };

        this.dislikes = {
            max: getRandomIntFromInterval(1, 6),
            persons: [],
        };

        var interval = this.getGeoSimulation();
        this.isCloseTo = {
            interval,
            persons: [],
        };
    }

    getGeoSimulation() {
        var min = getRandomIntFromInterval(0, 30);
        var max = min + getRandomIntFromInterval(0, 10);
        return { min, max };
    }
}

function getRandomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = Person;