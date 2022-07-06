'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addConstraint('Bookings', {
      fields: ['spotId', 'startDate'],
      type: 'unique',
      name: 'one_spot_one_startDate'
    });

    await queryInterface.addConstraint('Bookings', {
      fields: ['spotId', 'endDate'],
      type: 'unique',
      name: 'one_spot_one_endDate'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Bookings','one_spot_one_startDate');
    await queryInterface.removeConstraint('Bookings','one_spot_one_endDate');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
