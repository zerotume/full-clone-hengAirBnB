'use strict';
const {
  Model, Validator
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject(){
      const {id, username, email, firstName, lastName} = this;
      return {id, username, email, firstName, lastName};
    }

    validatePassword(password){
      return bcrypt.compareSync(password, this.hashedpwd.toString());
    }

    static getCurrentUserById(id){//async maybe?
      return User.scope("currentUser").findByPk(id);
    }

    static async login({credential, password}){
      const {Op} = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where:{
          [Op.or]:{
            username:credential,
            email:credential
          }
        }
      });
      if(user && user.validatePassword(password)){
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({username, email, password, firstName, lastName}){
      const hashedpwd = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedpwd,
        firstName,
        lastName
      });
      return await User.scope('currentUser').findByPk(user.id);
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(
        models.Spot,
          { foreignKey: 'ownerId', onDelete: 'CASCADE',  hooks: true }
      );

      User.hasMany(
        models.Review,
          { foreignKey: 'userId', onDelete: 'CASCADE',  hooks: true }
      );

      User.hasMany(
        models.Booking,
          { foreignKey: 'userId', onDelete: 'CASCADE',  hooks: true }
      );
    }
  }
  User.init({
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[4,30],
        isNotEmail(value){
          if(Validator.isEmail(value)){
            throw new Error("Cannot be an email!");
          }
        }
      }
    },
    firstName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[1,256],
      }
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[1,256],
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[3,256]
      }
    },
    hashedpwd: {
      type:DataTypes.STRING.BINARY,
      allowNull:false,
      validate:{
        len:[60,60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope:{
      attributes:{
        exclude:["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    },
    scopes:{
      currentUser:{
        attributes:{exclude:["hashedPassword"]}
      },
      loginUser:{
        attributes:{}
      }
    }
  });
  return User;
};
