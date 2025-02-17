const Isemail = require("isemail");
const uuidv4 = require("uuid/v4");
const { DataSource } = require("apollo-datasource");

class UserAPI extends DataSource {
	constructor({ store }) {
		super();
    this.store = store;
	}

	/**
	 * This is a function that gets called by ApolloServer when being setup.
	 * This function gets called with the datasource config including things
	 * like caches and context. We'll assign this.context to the request context
	 * here, so we can know about the user making requests
	 */
	initialize(config) {
		this.context = config.context;
	}

	/**
	 * User can be called with an argument that includes email, but it doesn't
	 * have to be. If the user is already on the context, it will use that user
	 * instead
	 */
	async findOrCreateUser({ email: emailArg } = {}) {
		const email =
			this.context && this.context.user ? this.context.user.email : emailArg;
		if (!email || !Isemail.validate(email)) return null;

		const users = await this.store.users.findOrCreate({ where: { email } });
		return users && users[0] ? users[0] : null;
  }
  
  async createWish({ title, description, link, tags, imageURL  }) {
    const userId = this.context.user.id;
		const res = await this.store.wishLists.create({
			title,
      description,
      link,
      tags,
      imageURL,
			userId,
			id: uuidv4(),
		});
		return res && res.length ? res[0].get() : null;
  }

  async getWish({wishId}) {
		const userId = this.context.user.id;
		const res = await this.store.wishes.findOne({
      where: {
        userId,
        id: wishId
      }
		});
		return res && res.length ? res[0].get() : null;
	}
  
  async getAllWishes() {
		const userId = this.context.user.id;
		const res = await this.store.wishes.findAll({
      where: {
        userId
      }
		});
		return res && res.length ? res[0].get() : null;
	}

	async createWishList({ title, description }) {
		const userId = this.context.user.id;
		const res = await this.store.wishLists.create({
			title,
			description,
			userId,
			id: uuidv4(),
		});
		return res && res.length ? res[0].get() : null;
  }

  async getWishList({listId}) {
		const userId = this.context.user.id;
		const res = await this.store.wishes.findOne({
      where: {
        userId,
        id: listId
      }
		});
		return res && res.length ? res[0].get() : null;
  }
  
  async getAllWishLists() {
    console.log(this.store)
		const userId = this.context.user.id;
		const res = await this.store.wishes.findAll({
      where: {
        userId,
      }
		});
		return res && res.length ? res[0].get() : null;
	}

	async removeWishList({ id }) {
		return !!this.store.wishLists.destroy({ where: { id } });
	}
}

module.exports = UserAPI;