const {graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require("graphql");

const Pokemon = new GraphQLObjectType({
    name: "UserType",
    fields: {
        name: {type: GraphQLString},
        weight: {type: GraphQLInt},
        abilities: {type: GraphQLList(GraphQLString)}
    }
})

const PokemonSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "QueryType",
        fields: {
            pokemon: { type: Pokemon }
        }
    })
})

const Resolvers = {
    pokemon() {
        return {
            name: "Ditto",
            weight: 50,
            abilities: ["this", "ability"]
        }
    }
}

const Query = `
    query {
        pokemon {
            name
            weight
            abilities
        }
    }
`;

graphql(PokemonSchema,Query,Resolvers)
    .then(res => console.log(res))