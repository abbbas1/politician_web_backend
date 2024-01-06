import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";


const SocialCommmentModel = sequelize.define("activitycomment",{
    totalComments:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

export default SocialCommmentModel;