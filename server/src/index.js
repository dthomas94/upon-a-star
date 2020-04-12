const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const { createStore } = require("./utils");
//const resolvers = require('./resolvers');

const UserAPI = require("./datasources/userAPI");

const store = createStore();

const server = new ApolloServer({
  typeDefs,
	dataSources: () => ({
		userAPI: new UserAPI({ store }),
	}),
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
