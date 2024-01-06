import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import EventsModel from "../Events/Events.js";
import SocialActivityModel from "../Social_Activity/Social_Activity.js";
import NewsModel from "../News/News.js";


const MemberModel = sequelize.define("member", {
  memberName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  memberEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  memberPicture:{
    type:DataTypes.STRING,
    allowNull:false
  },
  memberPhoneNumber:{
    type:DataTypes.STRING,
    allowNull:false
  },
  memberAddress:{
    type:DataTypes.STRING,
    allowNull:false
  },
  memberCnic:{
    type:DataTypes.STRING,
    allowNull:false
  }
});

MemberModel.hasMany(EventsModel);
EventsModel.belongsTo(MemberModel);

    //News relations
MemberModel.hasMany(NewsModel);
NewsModel.belongsTo(MemberModel);


//______________________________________//

     //Social Activity relations
MemberModel.hasMany(SocialActivityModel);
SocialActivityModel.belongsTo(MemberModel);


//________________________________________//


export default MemberModel;
