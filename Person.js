class Person {
    constructor(firstName, lastName, gender, email, key) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.email = email;
        this.key = key;
        // random age
        this.age = getRandomIntFromInterval(22, 36);
        // relations
        this.likes = {
            max: getRandomIntFromInterval(1, 30),
            persons: [],
        };
        this.loves = {
            max: getRandomIntFromInterval(1, 30),
            persons: [],
        };
        this.dislikes = {
            max: getRandomIntFromInterval(1, 20),
            persons: [],
        };
        this.isCloseTo = {
            max: getRandomIntFromInterval(1, 10),
            persons: [],
        };
    }
}

function getRandomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = Person;