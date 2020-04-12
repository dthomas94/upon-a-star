const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require('./resolvers');
const { createStore } = require("./utils");
const Isemail = require('isemail');

const UserAPI = require("./datasources/user");

const store = createStore();

// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
  // simple auth check on every request
	const token = (req.headers && req.headers.authorization) || '';
	
  // find a user by their token
  const users = await store.users.findOrCreate({ where: { token } });
	const user = users && users[0] ? users[0] : null;
	

  return { user };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
	dataSources: () => ({
		userAPI: new UserAPI({ store }),
	}),
	context,
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
