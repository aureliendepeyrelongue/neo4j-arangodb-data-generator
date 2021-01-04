class Neo4jQueryMaker {
    constructor(graph) {
        this.graph = graph;
    }

    getQuery() {
        var query = "CREATE ";
        this.graph.forEach((el) => {
            query += this.getNodeLabelAndProperties(el);
        });
        this.graph.forEach((el) => {
            query += this.getRelations(el);
        });

        return replaceLast(query, ",", "");
    }

    getNodeLabelAndProperties(el) {
        return `(${el.key}:${el.gender} { first_name: "${el.firstName}", last_name: "${el.lastName}", email : "${el.email}",  age : ${el.age} }),
        `;
    }

    getRelations(el) {
        var str = "";
        el.likes.persons.forEach((target) => {
            str += `(${el.key})-[:LIKES]->(${target.key}),
            `;
        });
        el.loves.persons.forEach((target) => {
            str += `(${el.key})-[:LOVES]->(${target.key}),
            `;
        });
        el.dislikes.persons.forEach((target) => {
            str += `(${el.key})-[:DISLIKES]->(${target.key}),
            `;
        });
        el.isCloseTo.persons.forEach((target) => {
            str += `(${el.key})-[:IS_CLOSE_TO]->(${target.key}),
            `;
        });

        return str;
    }
}

function replaceLast(x, y, z) {
    var a = x.split("");
    a[x.lastIndexOf(y)] = z;
    return a.join("");
}

module.exports = Neo4jQueryMaker;