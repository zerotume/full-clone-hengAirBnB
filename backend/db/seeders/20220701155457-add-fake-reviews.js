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
   let reviews = [
    {
      userId:1,
      spotId:2,
      review:'Really good catnips, I lost myself for the whole day.',
      stars:5
    },
    {
      userId:2,
      spotId:3,
      review:'Not a nature hot spring but services are okay.',
      stars:3
    },
    {
      userId:3,
      spotId:4,
      review:'Had a big feast! But could you ban the human feeding me rice?',
      stars:4
    },
   ]

   return queryInterface.bulkInsert('Reviews', reviews);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete('Reviews', {
      spotId: { [Op.in]: [2, 3, 4] }
     }, {});
  }
};
