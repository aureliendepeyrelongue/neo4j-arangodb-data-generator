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

        this.generateRelations(this.women, this.men, "Female");
        this.generateRelations(this.men, this.women, "Male");
    }

    generateRelations(fromArray, toArray, type) {
        fromArray.forEach((el) => {
            this.shuffleGoodArray(type);
            for (
                let i = 0; i < toArray.length && el.likes.persons.length < el.likes.max; i++
            ) {
                let target = toArray[i];
                if (!this.targetIsInArray(target, el.likes.persons) &&
                    !this.targetIsInArray(target, el.loves.persons) &&
                    !this.targetIsInArray(target, el.dislikes.persons)
                ) {
                    el.likes.persons.push(target);
                }
            }
            this.shuffleGoodArray(type);
            for (
                let i = 0; i < toArray.length && el.loves.persons.length < el.loves.max; i++
            ) {
                let target = toArray[i];
                if (!this.targetIsInArray(target, el.likes.persons) &&
                    !this.targetIsInArray(target, el.loves.persons) &&
                    !this.targetIsInArray(target, el.dislikes.persons)
                ) {
                    el.loves.persons.push(target);
                }
            }
            this.shuffleGoodArray(type);
            for (
                let i = 0; i < toArray.length && el.dislikes.persons.length < el.dislikes.max; i++
            ) {
                let target = toArray[i];
                if (!this.targetIsInArray(target, el.likes.persons) &&
                    !this.targetIsInArray(target, el.loves.persons) &&
                    !this.targetIsInArray(target, el.dislikes.persons)
                ) {
                    el.dislikes.persons.push(target);
                }
            }
        });

        if (type == "Female") {
            fromArray.forEach((el) => {
                toArray.forEach((target) => {
                    if (!this.targetIsInArray(target, el.isCloseTo.persons) &&
                        this.intervalIntersect(el, target)
                    ) {
                        el.isCloseTo.persons.push(target);
                    }
                });
            });
        }
    }

    shuffleGoodArray(type) {
        if (type == "Female") {
            this.shuffle(this.men);
        } else {
            this.shuffle(this.women);
        }
    }

    shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var rand = Math.floor(Math.random() * (i + 1));
            [array[i], array[rand]] = [array[rand], array[i]];
        }
    }

    intervalIntersect(el, target) {
        return !(
            el.isCloseTo.interval.max < target.isCloseTo.interval.min ||
            el.isCloseTo.interval.min > target.isCloseTo.interval.max
        );
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

    getWomen() {
        return this.women;
    }

    getMen() {
        return this.men;
    }
}

module.exports = GraphMaker;