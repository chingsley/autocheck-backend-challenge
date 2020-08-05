'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Cars',
      [
        {
          make: 'BMW',
          model: 'BMW620',
          vin: '1234567890ABCDEFG',
          features: 'confy seater, warm ac',
          location: '8.225, 82.221',
          price: 8000.989,
        },
        {
          make: 'TYT',
          model: 'TYT282',
          vin: 'confy seater, warm ac',
          features: 'auto balancer, auto seat adjustment',
          location: '34.4222, 67.922',
          price: 7698.234,
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cars');
  },
};
