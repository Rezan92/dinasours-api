const Sequelize = require('sequelize')

const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres';

const sequelize = new Sequelize(databaseUrl)

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Sequelize updated database schema')
  })
  .catch(console.error)

module.exports = sequelize