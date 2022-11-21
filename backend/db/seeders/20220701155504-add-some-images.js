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
        url:'https://stat.ameba.jp/user_images/20131001/22/ysugi522/92/44/j/t02200295_0350047012702521284.jpg',
        imageType:'review',
        spotId:3,
        reviewId:2
      },
      {
        url:'https://attach.setn.com/newsimages/2021/07/03/3214952-PH.jpg',
        imageType:'review',
        spotId:4,
        reviewId:4
      },

      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/57523101_3e1021f49e_z.jpg',
        imageType:'spot',
        spotId:1,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/331736815_6a9f8bb37f_b.jpg',
        imageType:'spot',
        spotId:1,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/4062257255_d5538f77c7_b.jpg',
        imageType:'spot',
        spotId:1,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/1808205717_aa616b69cb_b.jpg',
        imageType:'spot',
        spotId:1,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/4427561580_82e0e14d04_b.jpg',
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
        url:'https://live.staticflickr.com/8175/7937196104_11ba2a548b.jpg',
        imageType:'spot',
        spotId:3,
        reviewId:null
      },
      {
        url:'https://www.indy100.com/media-library/image.jpg?id=28042782&width=1245&quality=85&coordinates=111%2C0%2C111%2C0&height=700',
        imageType:'spot',
        spotId:4,
        reviewId:null
      },

      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/11315834234_0a07f924e2_b.jpg',
        imageType:'spot',
        spotId:5,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/cat-kitten-adidas-mackerel-preview.jpg',
        imageType:'spot',
        spotId:5,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/alexander-and-some-other-cats-1929-17327069164-cropped-2e0c5d-1024.jpg',
        imageType:'spot',
        spotId:5,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/30450791070_978aefc2a2_b.jpg',
        imageType:'spot',
        spotId:5,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/Cats_in_Catania_Amphitheatre_2925.jpg',
        imageType:'spot',
        spotId:5,
        reviewId:null
      },

      {
        url:'https://www.gtgoodtimes.com/wp-content/uploads/2019/02/15022019catnip.jpg',
        imageType:'spot',
        spotId:6,
        reviewId:null
      },
      {
        url:'https://live.staticflickr.com/8175/7937196104_11ba2a548b.jpg',
        imageType:'spot',
        spotId:7,
        reviewId:null
      },
      {
        url:'https://www.indy100.com/media-library/image.jpg?id=28042782&width=1245&quality=85&coordinates=111%2C0%2C111%2C0&height=700',
        imageType:'spot',
        spotId:8,
        reviewId:null
      },
      {
        url:'https://backofthebrain.files.wordpress.com/2012/06/many-cats-in-the-room.jpg',
        imageType:'spot',
        spotId:9,
        reviewId:null
      },
      {
        url:'https://www.gtgoodtimes.com/wp-content/uploads/2019/02/15022019catnip.jpg',
        imageType:'spot',
        spotId:10,
        reviewId:null
      },
      // {
      //   url:'https://live.staticflickr.com/8175/7937196104_11ba2a548b.jpg',
      //   imageType:'spot',
      //   spotId:11,
      //   reviewId:null
      // },
      // {
      //   url:'https://www.indy100.com/media-library/image.jpg?id=28042782&width=1245&quality=85&coordinates=111%2C0%2C111%2C0&height=700',
      //   imageType:'spot',
      //   spotId:12,
      //   reviewId:null
      // },
      // {
      //   url:'https://backofthebrain.files.wordpress.com/2012/06/many-cats-in-the-room.jpg',
      //   imageType:'spot',
      //   spotId:13,
      //   reviewId:null
      // },
      // {
      //   url:'https://www.gtgoodtimes.com/wp-content/uploads/2019/02/15022019catnip.jpg',
      //   imageType:'spot',
      //   spotId:14,
      //   reviewId:null
      // },
      // {
      //   url:'https://live.staticflickr.com/8175/7937196104_11ba2a548b.jpg',
      //   imageType:'spot',
      //   spotId:15,
      //   reviewId:null
      // },
      // {
      //   url:'https://www.indy100.com/media-library/image.jpg?id=28042782&width=1245&quality=85&coordinates=111%2C0%2C111%2C0&height=700',
      //   imageType:'spot',
      //   spotId:16,
      //   reviewId:null
      // },
      // {
      //   url:'https://backofthebrain.files.wordpress.com/2012/06/many-cats-in-the-room.jpg',
      //   imageType:'spot',
      //   spotId:17,
      //   reviewId:null
      // },
      // {
      //   url:'https://www.gtgoodtimes.com/wp-content/uploads/2019/02/15022019catnip.jpg',
      //   imageType:'spot',
      //   spotId:18,
      //   reviewId:null
      // },
      // {
      //   url:'https://live.staticflickr.com/8175/7937196104_11ba2a548b.jpg',
      //   imageType:'spot',
      //   spotId:19,
      //   reviewId:null
      // },
      // {
      //   url:'https://www.indy100.com/media-library/image.jpg?id=28042782&width=1245&quality=85&coordinates=111%2C0%2C111%2C0&height=700',
      //   imageType:'spot',
      //   spotId:20,
      //   reviewId:null
      // },
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
