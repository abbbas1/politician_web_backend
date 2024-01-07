import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";


const SocialCommmentModel = sequelize.define("activitycomment",{
    Comment:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

export default SocialCommmentModel;