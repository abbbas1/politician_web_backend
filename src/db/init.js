import AdminModel from "../model/Admin/Admin.js";
import ConstituencyModel from "../model/Constituency/Constituency.js";
import PollingStationsModel from "../model/Constituency/PollingStations.js";
import EventsModel from "../model/Events/Events.js";
import MemberModel from "../model/Member/Member.js";
import NewsModel from "../model/News/News.js";
import NewsCommmentModel from "../model/News/NewsComment.js";
import SocialCommmentModel from "../model/Social_Activity/Comment.js";
import SocialActivityModel from "../model/Social_Activity/Social_Activity.js";



const initdb = async () => {
  await AdminModel.sync({
    alter: true,
    force: false,
  }),
    await MemberModel.sync({
      alter: true,
      force: false,
    }),
    await EventsModel.sync({
      alter: true,
      force: false,
    });


        //Constituency Models

    await ConstituencyModel.sync({
      alter: true,
      force: false,
    });
    await PollingStationsModel.sync({
      alter: true,
      force: false,
    });
//___________________________________//

         //News Models

    await NewsModel.sync({
      alter: true,
      force: false,
    });
  
    await NewsCommmentModel.sync({
      alter: true,
      force: false,
    });
//__________________________________//

        //Social_Activity Model

    await SocialActivityModel.sync({
      alter: true,
      force: false,
    });

    await SocialCommmentModel.sync({
      alter: true,
      force: false,
    });
};

export default initdb;
