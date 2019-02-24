const {graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require("graphql");
const axios = require('axios')

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
        const apiCall = axios.get('https://pokeapi.co/api/v2/pokemon/pikachu/')
         .then(res => res.data)
        
        return apiCall
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