'use strict';
const {
  Model,Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(
        models.User,
          { foreignKey: 'userId' }
      );

      Booking.belongsTo(
        models.Spot,
          { foreignKey: 'spotId' }
      );
    }
  }
  Booking.init({
    startDate: {
      type:DataTypes.DATEONLY,
      allowNull:false,
      // validate:{
      //   isAfter:((new Date()).toISOString().split('T'))[0]
      // }
    },
    endDate: {
      type:DataTypes.DATEONLY,
      allowNull:false,
      validate:{
        timeTraveler(value){
          if(this.startDate > value){
            throw new Error('End date must be after the start date.');
          }
        }
      }
    },
    spotId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Booking',
    scopes:{
      notOwner:{
        attributes:['id','spotId','startDate','endDate']
      },
    }
  });
  return Booking;
};
