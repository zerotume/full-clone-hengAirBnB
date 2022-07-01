'use strict';
const bcrypt = require('bcryptjs');

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

    let users = [
      {
        username:'catuser1',
        firstName:'Meowone',
        lastName:'Cat',
        email:'meowone@cat.com',
        hashedpwd:bcrypt.hashSync('password1')
      },
      {
        username:'catuser2',
        firstName:'Meowtwo',
        lastName:'Kitty',
        email:'meowtwo@cat.com',
        hashedpwd:bcrypt.hashSync('password2')
      },
      {
        username:'catuser3',
        firstName:'Meowthree',
        lastName:'Neko',
        email:'meowthree@cat.com',
        hashedpwd:bcrypt.hashSync('password3')
      }
    ];

    return queryInterface.bulkInsert('Users', users);
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
     return queryInterface.bulkDelete('Users', {
       username: { [Op.in]: ['catuser1', 'catuser2', 'catuser3'] }
     }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
