const Sequelize = require('sequelize')
const sequelize = require('../db')

const Dino = sequelize.define(
  'dino',
  {
    name: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    type_of_dinosaur: {
      type: Sequelize.STRING,
    },
    lenght: {
      type: Sequelize.DECIMAL,
    },
    diet: {
      type: Sequelize.STRING,
    },
    when_it_lived: {
      type: Sequelize.STRING
    },
    found_in: {
      type: Sequelize.STRING,
    },
    more_info: {
      type: Sequelize.STRING
    },
    taxonomy: {
      type: Sequelize.STRING
    },
    named_by: {
      type: Sequelize.STRING,
    },
  }
)

module.exports = Dino