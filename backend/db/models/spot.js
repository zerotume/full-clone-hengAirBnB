'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(
        models.User,
          { foreignKey: 'ownerId' }
      );

      Spot.hasMany(
        models.Review,
          { foreignKey: 'spotId', onDelete: 'CASCADE',  hooks: true }
      );

      Spot.hasMany(
        models.Image,
          { foreignKey: 'spotId', onDelete: 'CASCADE',  hooks: true }
      );

      Spot.hasMany(
        models.Booking,
          { foreignKey: 'spotId', onDelete: 'CASCADE',  hooks: true }
      );
    }
  }
  Spot.init({
    ownerId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    address: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[3,256],
        is:/([A-Za-z0-9\-\# ])*/g
      }
    },
    city: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[1,100],
        is:/([A-Za-z\- ])*/g
      }
    },
    state: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[2,50],
        isAlpha:true
      }
    },
    country: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[2,50],
        isAlpha:true
      }
    },
    lat: {
      type:DataTypes.DECIMAL,
      allowNull:false,
      validate:{
        max:89.9999999,
        min:-89.9999999
      }
    },
    lng: {
      type:DataTypes.DECIMAL,
      allowNull:false,
      validate:{
        max:179.9999999,
        min:-179.9999999
      }
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[2,50]
      }
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[2,256]
      }
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        min:1
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
