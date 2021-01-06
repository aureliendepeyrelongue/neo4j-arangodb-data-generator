const GraphMaker = require("./app/GraphMaker.js");
const Neo4jQueryMaker = require("./app/Neo4jQueryMaker.js");
const ArangoDBQueryMaker = require("./app/ArangoDBQueryMaker.js");
const fs = require("fs");

var args = process.argv.slice(2);
var graphSize = parseInt(args[0]);

if (typeof graphSize == "number") {
    graphSize = graphSize > 0 && graphSize < 1000 ? graphSize : 100;

    const gm = new GraphMaker(graphSize);
    const graph = gm.getGraph();

    const neo4j = new Neo4jQueryMaker(graph);

    const neo4jQuery = neo4j.getQuery();

    console.log("Graph is " + graph.length + " vertexes long.");

    fs.writeFile(
        "./output/neo4j/neo4j_data_query.txt",
        neo4jQuery,
        function(err) {
            if (err) return console.log(err);
            console.log("neo4j file is written.");
        }
    );

    const arangoDB = new ArangoDBQueryMaker(graph, gm.getWomen(), gm.getMen());

    const arangoDBQueries = arangoDB.getQuery();

    for (let value in arangoDBQueries) {
        let query = arangoDBQueries[value];

        fs.writeFile(
            "./output/arangoDB/" + value + "_arangoDB_data_query.txt",
            query,
            function(err) {
                if (err) return console.log(err);
                console.log("ArangoDB " + value + " file is written.");
            }
        );
    }
}