const {graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList } = require("graphql");
const axios = require('axios')

const User = new GraphQLObjectType({
    name: "UserType",
    fields: {
        name: {type: GraphQLNonNull(GraphQLString)},
        surname: {type: GraphQLNonNull(GraphQLString)}
    }
})

const Schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "QueryType",
        fields: {
                user: { type: User }
            }
        })
    })
    const Resolvers = {
        user() {
            return {
                name: "First Name",
                surname: "Surname"
            }
        }
    }

const Query = `
    query {
        user {
            name
        }
    }
`;

graphql(Schema,Query,Resolvers)
    .then(res => console.log(res))
