const Person = require("./Person.js");
const base = require("./base.js");
const uniqid = require("uniqid");

class GraphMaker {
    constructor(nodeLimit) {
        this.persons = [];
        this.men = [];
        this.women = [];

        for (let i = 0; i < base.length && i < nodeLimit; i++) {
            const el = base[i];
            this.persons.push(
                new Person(
                    el.firstName,
                    el.lastName,
                    el.gender,
                    el.email,
                    uniqid.time()
                )
            );
        }

        this.persons.forEach((el) => {
            if (el.gender == "Male") {
                this.men.push(el);
            } else {
                this.women.push(el);
            }
        });

        this.generateRelations(this.women, this.men);
        this.generateRelations(this.men, this.women);
    }

    generateRelations(fromArray, toArray) {
        fromArray.forEach((el) => {
            while (el.likes.persons.length < el.likes.max) {
                var personToLike = this.getFreePerson(el, toArray, "likes");
                el.likes.persons.push(personToLike);
            }
            while (el.loves.persons.length < el.loves.max) {
                var personToLove = this.getFreePerson(el, toArray, "loves");
                el.loves.persons.push(personToLove);
            }
            while (el.dislikes.persons.length < el.dislikes.max) {
                var personToDislike = this.getFreePerson(el, toArray, "dislikes");
                el.dislikes.persons.push(personToDislike);
            }
            while (el.isCloseTo.persons.length < el.isCloseTo.max) {
                var personCloseTo = this.getFreePerson(el, toArray, "isCloseTo");
                el.isCloseTo.persons.push(personCloseTo);
                personCloseTo.isCloseTo.persons.push(el);
            }
        });
    }

    getFreePerson(el, toArray, relationName) {
        for (let i = 0; i < toArray.length; i++) {
            const target = toArray[i];

            switch (relationName) {
                case "likes":
                    if (!this.targetIsInArray(target, el.likes.persons) &&
                        !this.targetIsInArray(target, el.likes.persons) &&
                        !this.targetIsInArray(target, el.likes.persons)
                    ) {
                        return target;
                    }
                    break;

                case "loves":
                    if (!this.targetIsInArray(target, el.likes.persons) &&
                        !this.targetIsInArray(target, el.likes.persons) &&
                        !this.targetIsInArray(target, el.likes.persons)
                    ) {
                        return target;
                    }
                    break;

                case "dislikes":
                    if (!this.targetIsInArray(target, el.likes.persons) &&
                        !this.targetIsInArray(target, el.likes.persons) &&
                        !this.targetIsInArray(target, el.likes.persons)
                    ) {
                        return target;
                    }
                    break;

                case "isCloseTo":
                    if (!this.targetIsInArray(target, el.isCloseTo.persons) &&
                        !this.targetIsInArray(el, target.isCloseTo.persons)
                    ) {
                        return target;
                    }
                    break;
                default:
                    break;
            }
        }
        return null;
    }

    targetIsInArray(el, array) {
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (element == el) return true;
        }
        return false;
    }

    getGraph() {
        return this.persons;
    }
}

module.exports = GraphMaker;