const converter = { Male: "Men", Female: "Women" };

class ArangoDBQueryMaker {
    constructor(graph, women, men) {
        this.graph = graph;
        this.women = women;
        this.men = men;
        this.womenQuery = "let womenData = [";
        this.menQuery = "let menData = [";
        this.lovesQuery = "let lovesEdges = [";
        this.likesQuery = "let likesEdges = [";
        this.dislikesQuery = "let dislikesEdges = [";
        this.isCloseToQuery = "let isCloseToEdges = [";
    }
    getQuery() {
        var query = `let womenData = [
        `;
        this.women.forEach((el) => {
            this.womenQuery += this.getNodeProperties(el);
        });
        this.womenQuery += `]
        FOR w IN womenData
            INSERT w INTO Women
            `;

        this.men.forEach((el) => {
            this.menQuery += this.getNodeProperties(el);
        });

        this.menQuery += `]
        FOR m IN menData
            INSERT m INTO Men
            `;

        this.graph.forEach((el) => {
            el.likes.persons.forEach((target) => {
                this.likesQuery += this.getRelation(el, target);
            });

            el.loves.persons.forEach((target) => {
                this.lovesQuery += this.getRelation(el, target);
            });

            el.dislikes.persons.forEach((target) => {
                this.dislikesQuery += this.getRelation(el, target);
            });

            el.isCloseTo.persons.forEach((target) => {
                this.isCloseToQuery += this.getRelation(el, target);
            });
        });

        this.likesQuery += `]

        FOR l in likesEdges
            INSERT l INTO LIKES
        `;
        this.lovesQuery += `]
                
        FOR l in lovesEdges
            INSERT l INTO LOVES
        `;
        this.dislikesQuery += `]
                        
        FOR d in dislikesEdges
            INSERT d INTO DISLIKES
        `;

        this.isCloseToQuery += `]
                            
        FOR i in isCloseToEdges
            INSERT d INTO IS_CLOSE_TO
        `;

        return {
            men: this.menQuery,
            women: this.womenQuery,
            likes: this.likesQuery,
            loves: this.lovesQuery,
            dislikes: this.dislikesQuery,
            isCloseTo: this.isCloseToQuery,
        };
    }

    getRelation(el, target) {
        return `{ _from: "${converter[el.gender]}/${el.key}", _to: "${
      converter[target.gender]
    }/${target.key}" },
        `;
    }

    getNodeProperties(el) {
        return `{ "_key" : "${el.key}", "first_name" : "${el.firstName}", "last_name" : "${el.lastName}", "age" : ${el.age}, "email" : "${el.email}", "gender" : "${el.gender}"},
            `;
    }
}

module.exports = ArangoDBQueryMaker;