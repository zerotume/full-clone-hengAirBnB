'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let imgs = [
      {
        url:'https://www.imiaomeng.com/uploads/allimg/220412/1-220412112201C5.jpg',
        imageType:'review',
        spotId:2,
        reviewId:1
      },
      {
        url:'https://stat.ameba.jp/user_images/20131001/22/ysugi522/92/44/j/t02200295_0350047012702521284.jpg',
        imageType:'review',
        spotId:3,
        reviewId:2
      },
      {
        url:'https://attach.setn.com/newsimages/2021/07/03/3214952-PH.jpg',
        imageType:'review',
        spotId:4,
        reviewId:3
      },
      {
        url:'https://www.popo8.com/host/data/201911/27/10/p1574919097_94132.jpg_b.jpg',
        imageType:'spot',
        spotId:3,
        reviewId:null
      },
    ]
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
