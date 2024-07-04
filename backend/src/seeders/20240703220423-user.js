'use strict';

const { faker } = require("@faker-js/faker")
const { NODE_ENV } = require('../utility/config');
const { compareStrings, hashPassword } = require('../utility/helpers');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    if(compareStrings(NODE_ENV, "development")){
      const password = await hashPassword("123456");
      const date = new Date()

      const users = [{
        email: "admin@gmail.com",
        password, username: "admin",
        status: "active",
        role: "admin",
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
      }];

      for (let i = 0; i < 20; i++) {
        const rand_index = Math.floor(Math.random() * 2)

        users.push({
          email: faker.internet.email().toLowerCase(),
          username: faker.person.fullName(),
          password, status: ['pending', 'active'][rand_index],
          role: "user",
          createdAt: date.toISOString(),
          updatedAt: date.toISOString(),
        }) 
      }
      await queryInterface.bulkInsert('Users', users, {});
    }
  },

  async down (queryInterface, Sequelize) {
    if(compareStrings(NODE_ENV, "development")){
      await queryInterface.bulkDelete('Users', null, {});
    }
  }
};
