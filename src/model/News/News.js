import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import NewsCommmentModel from "./NewsComment.js";

const NewsModel = sequelize.define("News", {
  newsTittle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  newsContent: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  newsPicture:{
    type:DataTypes.STRING,
    allowNull:false
  },
  totalLikes:{
    type:DataTypes.INTEGER,
    allowNull:false,
    defaultValue: 0
  }
});



NewsModel.hasMany(NewsCommmentModel)
NewsCommmentModel.belongsTo(NewsModel)

export default NewsModel;
