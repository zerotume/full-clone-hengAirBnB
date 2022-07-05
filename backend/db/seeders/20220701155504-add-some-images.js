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
      {
        url:'https://backofthebrain.files.wordpress.com/2012/06/many-cats-in-the-room.jpg',
        imageType:'spot',
        spotId:1,
        reviewId:null
      },
      {
        url:'https://www.gtgoodtimes.com/wp-content/uploads/2019/02/15022019catnip.jpg',
        imageType:'spot',
        spotId:2,
        reviewId:null
      },
      {
        url:'https://www.indy100.com/media-library/image.jpg?id=28042782&width=1245&quality=85&coordinates=111%2C0%2C111%2C0&height=700',
        imageType:'spot',
        spotId:4,
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
     return queryInterface.bulkInsert('Images', imgs);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete('Images', {
       spotId: { [Op.in]: [1,2,3,4] }
     }, {});
  }
};
