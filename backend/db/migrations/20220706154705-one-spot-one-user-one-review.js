'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addConstraint('Reviews', {
      fields: ['spotId', 'userId'],
      type: 'unique',
      name: 'one_user_review_once_on_spot'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Reviews','one_user_review_once_on_spot');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
