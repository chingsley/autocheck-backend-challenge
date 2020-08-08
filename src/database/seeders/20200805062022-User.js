'use strict';

// import * as bcrypt from 'bcryptjs';
const bcrypt = require('bcrypt');

const password = bcrypt.hashSync('testing', Number(process.env.BCRYPT_SALT_ROUNDS));

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'kc',
          lastName: 'eneja',
          email: 'eneja.kc@gmail.com',
          password,
        },
        {
          firstName: 'arya',
          lastName: 'stark',
          email: 'aryastark@gmail.com',
          password,
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users');
  },
};
