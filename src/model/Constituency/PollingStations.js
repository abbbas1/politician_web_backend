import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const PollingStationsModel = sequelize.define("pollingStation",{
    PollingStationName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    PollingStationAddress:{
        type:DataTypes.STRING,
        allowNull:false
    },
    agentName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    agentCnic:{
        type:DataTypes.STRING,
        allowNull:false
    },
    agentPhoneNumber:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

export default PollingStationsModel;