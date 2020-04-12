require('dotenv').config();

const { Sequelize } = require('sequelize');

module.exports.createStore = () => {
  const db = new Sequelize(process.env.DB_NAME, process.env.DB_ROLE, process.env.DB_PASS, {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
  });

  const users = db.define('user', {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    email: Sequelize.STRING,
    token: Sequelize.STRING,
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

  return { db, users, wishes} 
}