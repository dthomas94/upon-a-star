module.exports = {
  Query: {
    wishLists: (_, __, {dataSources}) => dataSources.userAPI.getAllWishLists(),
		wishList: (_, {id}, {dataSources}) => dataSources.userAPI.getWishList({listId: id}),
		wish: (_, {id}, {dataSources}) => dataSources.userAPI.getWish({wishId: id}),
		wishes: (_, __, {dataSources}) => dataSources.userAPI.getAllWishes(),
		me: (_, __, {dataSources}) => dataSources.userAPI.findOrCreateUser()
  },
  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) return new Buffer(email).toString('base64');
    },
  }
};