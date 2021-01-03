const Person = require("Person.js")
const base = require("base.js")

class GraphMaker {
    constructor(nodeLimit) {
        this.persons = []
        for (let i = 0; i < base.length && i < nodeLimit; i++) {
            const el = base[i];
            this.persons.push(new Person(el.firstName, el.lastName, el.gender, el.email))
        }

    }
}