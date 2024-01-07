import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import SocialCommmentModel from "./Comment.js";


const SocialActivityModel = sequelize.define("socialActivity", {
    socialActivityTittle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  socialActivityDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  socialActivityPicture:{
    type:DataTypes.STRING,
    allowNull:false
  },
  totalLikes:{
    type:DataTypes.INTEGER,
    allowNull:false,
    defaultValue: 0
  }
});



SocialActivityModel.hasMany(SocialCommmentModel)
SocialCommmentModel.belongsTo(SocialActivityModel)

export default SocialActivityModel;
