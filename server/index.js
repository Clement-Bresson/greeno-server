const { ApolloServer } = require('apollo-server');

const models = require('./models');

require('./dbConnect');

const typeDefs = require('../graphql/typeDefs');
const resolvers = require('../graphql/resolvers.js');
const { CommentAPI, PostAPI, UserAPI } = require('../graphql/dataSources.js');

const dataSources = () => ({
  commentAPI: new CommentAPI({ models }),
  postAPI: new PostAPI({ models }),
  userAPI: new UserAPI({ models })
});

const server = new ApolloServer({ dataSources, resolvers, typeDefs });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`); //eslint-disable-line
});
