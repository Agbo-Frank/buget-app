'use strict';

const { faker } = require('@faker-js/faker');
const { compareStrings } = require('../utility/helpers');
const { NODE_ENV } = require('../utility/config');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    if(compareStrings(NODE_ENV, "development")){
      const users =  await queryInterface.sequelize.query(
        'SELECT * FROM "Users"',
        {type: Sequelize.QueryTypes.SELECT}
      );
      const entries = []
      
      for (let i = 0; i < 100; i++) {
        const date = faker.date.between({from: new Date("2024-01-01").toISOString(), to: new Date("2024-12-01").toISOString()})

        entries.push({
          amount: parseInt(faker.number.int({min: 10000, max: 1000000})),
          description: faker.word.verb(),
          category: ['expense', 'income'][faker.number.int(1)],
          userId: users[faker.number.int(users.length - 1)].id,
          date, 
          updatedAt: date,
          createdAt: date
        })
      }
      await queryInterface.bulkInsert('Entries', entries, {});
    }
  },

  async down (queryInterface, Sequelize) {
    if(compareStrings(NODE_ENV, "development")){
      await queryInterface.bulkDelete('Entries', null, {});
    }
  }
};
