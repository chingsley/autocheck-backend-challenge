'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Wallets',
      [
        {
          userId: 1,
          balance: 20000,
          cardNumber: '4187451722960176',
        },
        {
          userId: 2,
          balance: 1000,
          cardNumber: '3187451722960177',
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Wallets');
  },
};
