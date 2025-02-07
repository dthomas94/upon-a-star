const { gql } = require("apollo-server");

const typeDefs = gql`
	enum CurrencyCodeEnum {
		USD
		EUR
		GBP
	}
	type Currency {
		code: CurrencyCodeEnum!
		symbol: String!
		value: Float!
	}
	type Tag {
		id: ID!
		name: String!
	}
	type Wish {
		id: ID!
		title: String!
		description: String
		link: String
		tags: [Tag!]
		price: Currency
		imageURL: String
		createdAt: String!
    createdBy: User!
	}
	type WishList {
		id: ID!
		title: String!
		description: String!
		tags: [Tag!]
		wishes: [Wish!]
		createdAt: String!
    createdBy: User!
	}

	type User {
		id: ID!
		email: String!
		wishLists: [WishList!]
	}

	input CurrencyInput {
		type: CurrencyCodeEnum!
		value: Float!
	}

	input TagInput {
		id: ID!
	}

	input WishInput {
		description: String
		link: String
		tags: [TagInput!]
		price: CurrencyInput
		imageURL: String
	}

	type Query {
		wishLists: [WishList!]
		wishList(id: ID!): WishList
		wish(id: ID!): Wish
		wishes(tags: [String!]): [Wish!]
		tag(id: ID!): Tag
		tags: [Tag!]
		currencyCodes: [CurrencyCodeEnum!]
		me: User
	}

	type Mutation {
    addTag(name: String!): Tag!
    removeTag(id: ID!): String #message verification
		addWish(title: String!, input: WishInput!): Wish!
		addWishList(title: String!, description: String): WishList!
		editWish(id: ID!, title: String, input: WishInput!): Wish!
		editWishList(id: ID!, title: String, description: String): WishList!
		removeWish(id: ID!): String #message verification
		removeWishList(id: ID!): String #message verification
		login(email: String!): String #login token
	}
`;

module.exports = typeDefs;
