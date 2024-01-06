import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const EventsModel = sequelize.define("event", {
  eventTittle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventPicture:{
    type:DataTypes.STRING,
    allowNull:false
  },
  eventDate:{
    type:DataTypes.STRING,
    allowNull:false
  }
});

export default EventsModel;
