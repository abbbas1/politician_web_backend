import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import PollingStationsModel from "./PollingStations.js";

const ConstituencyModel = sequelize.define("constituency",{
    constituencyName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    constituencyAddress:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

ConstituencyModel.hasMany(PollingStationsModel)
PollingStationsModel.belongsTo(ConstituencyModel)

export default ConstituencyModel;