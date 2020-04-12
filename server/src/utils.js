require('dotenv').config();

const { Sequelize } = require('sequelize');
console.log(process.env.DB_NAME)

module.exports.createStore = () => {
  const db = new Sequelize('upon-a-star', process.env.DB_NAME, '', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
  });

  const users = db.define('user', {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
  });

  const wishes = db.define('wish', {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    userId: Sequelize.INTEGER,
    title: Sequelize.STRING,
		description: Sequelize.TEXT,
		link: Sequelize.STRING,
		tags: Sequelize.ARRAY(Sequelize.STRING),
		price: Sequelize.FLOAT,
		imageURL: Sequelize.STRING
  });
}