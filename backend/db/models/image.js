'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(
        models.Spot,
          { foreignKey: 'spotId', as:'previewImage' }
      );

      Image.belongsTo(
        models.Review,
          { foreignKey: 'reviewId',  }
      );
    }
  }
  Image.init({
    url: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        isImage(value){
          let img = [
                    '.bmp',
                    '.tif',
                    '.tiff',
                    '.jpg',
                    '.jpeg',
                    '.gif',
                    '.png',
                    '.eps',
                    '.raw'];
          if(!img.includes(value.slice(-4)) &&!img.includes(value.slice(-5))){
              throw new Error("Image url must be a valid image format!");
          }
        }
      }
    },
    imageType: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        isIn:[['review','spot']]
      }
    },
    spotId: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    reviewId: {
      type:DataTypes.INTEGER,
      allowNull:true,
      validate:{
        notReviewImg(value){
          if(this.imageType === 'spot' && value){
            throw new Error('Review id should not be set when it\'s not an review image!');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
