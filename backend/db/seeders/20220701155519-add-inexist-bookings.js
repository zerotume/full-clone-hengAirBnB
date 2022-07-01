'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    let bookings = [
      {
        startDate:'2021-01-02',
        endDate:'2021-01-10',
        spotId:2,
        userId:1
      },
      {
        startDate:'2021-05-01',
        endDate:'2021-05-10',
        spotId:3,
        userId:2
      },
      {
        startDate:'2022-01-02',
        endDate:'2022-01-10',
        spotId:4,
        userId:3
      },
    ]

    return queryInterface.bulkInsert('Bookings', bookings);
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
     return queryInterface.bulkDelete('Bookings', {
      spotId: { [Op.in]: [2, 3, 4] }
     }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
