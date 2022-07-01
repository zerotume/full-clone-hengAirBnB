'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    let spots = [
      {
        ownerId:1,
        address:'Rd Orange Cat 1',
        city:'Cattown',
        state:'CT',
        country:'Nation of Cat',
        lat:11.1111111,
        lng:111.1111111,
        name:'Cattown Vella',
        description:'Best gathering place for cats in Cattown',
        price:111
      },
      {
        ownerId:2,
        address:'Naughty Kitty St 2',
        city:'Kittyland',
        state:'KL',
        country:'Republic of Kitten',
        lat:-22.2222222,
        lng:112.2222222,
        name:'Kittyland Garden',
        description:'Let\s enjoy catnips in Kittyland Garden!',
        price:122
      },
      {
        ownerId:3,
        address:'Cute Neko Dr 3',
        city:'Nekocity',
        state:'NC',
        country:'United Nekos',
        lat:33.3333333,
        lng:133.3333333,
        name:'Nekocity Onsen',
        description:'Hot spring in Nekocity makes cats loves baths!',
        price:145
      },
      {
        ownerId:1,
        address:'Rd Orange Cat 2',
        city:'Cattown',
        state:'CT',
        country:'Nation of Cat',
        lat:11.1111112,
        lng:111.1111112,
        name:'Cattown Feast House',
        description:'Cattown Feast House has a lot of human serving can food everyday!',
        price:112
      },
    ];

    return queryInterface.bulkInsert('Spots', spots);
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
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete('Spots', {
      city: { [Op.in]: ['Cattown', 'Kittyland', 'Nekocity'] }
     }, {});
  }
};
