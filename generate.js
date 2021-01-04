const GraphMaker = require("./GraphMaker.js");
const Neo4jQueryMaker = require("./Neo4jQueryMaker.js");

const gm = new GraphMaker(200);

const graph = gm.getGraph();

const neo4j = new Neo4jQueryMaker(graph);

console.log(neo4j.getQuery());