'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let imgs = [
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/1-220412112201C5.jpg',
        imageType:'review',
        spotId:2,
        reviewId:1
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/You_can_lead_a_cat_to_water..._(291848562).jpg',
        imageType:'review',
        spotId:3,
        reviewId:2
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/97950071_df165721a4_b.jpg',
        imageType:'review',
        spotId:3,
        reviewId:2
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/14694923691_ee27cd10b5_b.jpg',
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
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/15022019catnip111.jpg',
        imageType:'spot',
        spotId:2,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/15022019catnip.jpg',
        imageType:'spot',
        spotId:2,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/149977885_c9e0ccf250_b.jpg',
        imageType:'spot',
        spotId:2,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/3338465030_5012ee9a79_b.jpg',
        imageType:'spot',
        spotId:2,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/270589583_8c7da14d70_b.jpg',
        imageType:'spot',
        spotId:2,
        reviewId:null
      },

      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/7937196104_11ba2a548b.jpg',
        imageType:'spot',
        spotId:3,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/3415731949_732c77293e_b.jpg',
        imageType:'spot',
        spotId:3,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/2264783385_54c5ee5ee9_b.jpg',
        imageType:'spot',
        spotId:3,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/16312412959_f767760fd3_b.jpg',
        imageType:'spot',
        spotId:3,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/As_our_cat_uses_the_bathtub%2C_a_hotel_in_Paris.jpg',
        imageType:'spot',
        spotId:3,
        reviewId:null
      },

      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/19102346263_1b0b52f9af_b.jpg',
        imageType:'spot',
        spotId:4,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/2258103519_6f61987ef8_b.jpg',
        imageType:'spot',
        spotId:4,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/3214952-PH.jpg',
        imageType:'spot',
        spotId:4,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/6207684158_7f546706bb_b.jpg',
        imageType:'spot',
        spotId:4,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/2019-10-23_18_51_36_Three_cats_eating_in_the_Franklin_Farm_section_of_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg',
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
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/9729915268_364b204a8f_b.jpg',
        imageType:'spot',
        spotId:6,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/9461473618_4f806888b4_b.jpg',
        imageType:'spot',
        spotId:6,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/18375701278_72280b6dcf_b.jpg',
        imageType:'spot',
        spotId:6,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/32381270531_cbe975c71e_b.jpg',
        imageType:'spot',
        spotId:6,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/24836019421_1a13399382_b.jpg',
        imageType:'spot',
        spotId:6,
        reviewId:null
      },

      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/cat-sleeping-wash-bowl-basin-preview.jpg',
        imageType:'spot',
        spotId:7,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/cat-bathroom.jpg',
        imageType:'spot',
        spotId:7,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/Cat_in_basin.jpg',
        imageType:'spot',
        spotId:7,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/t02200295_0350047012702521284.jpg',
        imageType:'spot',
        spotId:7,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/Erik_Zachte_one_of_my_cats.jpg',
        imageType:'spot',
        spotId:7,
        reviewId:null
      },

      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/2013-04-13_Street_cats_eating_in_Rome.jpg',
        imageType:'spot',
        spotId:8,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/Group_of_cats_circle_around_catfood.jpg',
        imageType:'spot',
        spotId:8,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/Cats_Eating.jpg',
        imageType:'spot',
        spotId:8,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/Cats_eat.jpg',
        imageType:'spot',
        spotId:8,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/20221121121818.jpg',
        imageType:'spot',
        spotId:8,
        reviewId:null
      },

      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/cats-in-greece-1542124922flB.jpg',
        imageType:'spot',
        spotId:9,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/Domesticated_Indian_cats_sleeping_(cropped_for_better_representation).jpg',
        imageType:'spot',
        spotId:9,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/many-cats-in-the-room.jpg',
        imageType:'spot',
        spotId:9,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/many-cats-in-the-room.jpg',
        imageType:'spot',
        spotId:9,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/preview.jpg',
        imageType:'spot',
        spotId:9,
        reviewId:null
      },

      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/41494608220_2b6606e542_b.jpg',
        imageType:'spot',
        spotId:10,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/Gillie_and_the_catnip_(7382639870).jpg',
        imageType:'spot',
        spotId:10,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/image-16204764027HC.jpg',
        imageType:'spot',
        spotId:10,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/Gillie_stalking_the_catnip_(2587001371).jpg',
        imageType:'spot',
        spotId:10,
        reviewId:null
      },
      {
        url:'https://catbnbimage.s3.us-west-1.amazonaws.com/px500139-image-kwyp8l99.jpg',
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
