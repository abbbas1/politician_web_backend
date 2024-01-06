import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import EventsModel from "../Events/Events.js";
import SocialActivityModel from "../Social_Activity/Social_Activity.js";
import NewsModel from "../News/News.js";


const AdminModel = sequelize.define("admin", {
  adminName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminPicture: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminPhoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminCnic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

AdminModel.hasMany(EventsModel);
EventsModel.belongsTo(AdminModel);

    //News relations
AdminModel.hasMany(NewsModel);
NewsModel.belongsTo(AdminModel);


//______________________________________//

     //Social Activity relations
AdminModel.hasMany(SocialActivityModel);
SocialActivityModel.belongsTo(AdminModel);


//________________________________________//

export default AdminModel;
