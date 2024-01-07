import SocialActivityModel from "../../model/Social_Activity/Social_Activity.js"
import SocialCommmentModel from "../../model/Social_Activity/Comment.js"

const SocialActivityController = {
    AddActivity:async(req,res)=>{
        try {
            const{socialActivityTittle,socialActivityDescription}=req.body
            const{path}=req.file
            const socialActivity = await SocialActivityModel.create({
                
                socialActivityTittle,
                socialActivityDescription,
                socialActivityPicture:path,

                adminId: req.session.admin.id,
                memberId: req.session.member.id,
            }) 
            res.status(200).json({message:"Social activity added",socialActivity})
        } catch (error) {
            res.status(404).json({message:"Something bad happened in Social activity upload.",error})
            // console.log(error);
        }
    },
    Update:async(req,res)=>{
        try {
          const{id}=req.params
          const{socialActivityTittle,socialActivityDescription,socialActivityPicture}=req.body
          const socialActivity = await SocialActivityModel.findOne({
                where:{id}
            })
            if(News){
                socialActivity.socialActivityTittle=socialActivityTittle
                socialActivity.socialActivityDescription=socialActivityDescription
                socialActivity.socialActivityPicture=socialActivityPicture
                socialActivity.save(res.json({message:"social activity updated",socialActivity}))
             }else{
                res.status(400).json({message:"News not found"})
             }
        } catch (error) {
            res.status(404).json({message:"Something bad happened in news updation.",error})
        }
    },
    UpdateLikes:async(req,res)=>{
        try {
            const{totalLikes}=req.body
            const{activityId}=req.params
            const activity = await SocialActivityModel.findOne({
                where:{id:activityId}
            })
            if(!activity){
                res.status(400).json({message:"social Activity Id does'nt exist try a valid Id"})
            }else{
                await SocialActivityModel.update({totalLikes},{where:{id:activityId}})
                res.status(200).json({message:"likes updated"})
                // console.log(likes) 
            }
        } catch (error) {
            res.status(404).json({message:"Somthing bad happened in likes updation.",error})
            // console.log(error);
        } 
    },
    Delete:async(req,res)=>{
        try {
            const{id}=req.params
            const activity = await SocialActivityModel.findOne({
                where:{id}
            })
            if(activity){
                activity.destroy(res.json({message:"activity deleted successfully"}))
            }else{
                res.status(400).json({message:"activity not found"})
            }
        } catch (error) {
            res.status(404).json({message:"Something bad happened in activity deletion."})
        }
    },
    getAllActivities:async(req,res)=>{
        try {
            const activity = await SocialActivityModel.findAll({
                include:[SocialCommmentModel]
            })
            res.status(200).json({message:"All activities found",activity})
        } catch (error) {
            res.status(404).json({message:"Something bad happened in fetching all activities.",error})
        }
    },
    getOnlyOne:async(req,res)=>{
        try {
            const{id}=req.params
            const activity =  await SocialActivityModel.findByPk(id,{
                include:[SocialCommmentModel]
            })
            if(activity){
                res.status(200).json({message:"activity found",activity}) 
            }else{
                 res.status(400).json({message:"activity not found"})
            }
        } catch (error) {
            res.status(404).json({message:"Something bad happened in activity find"})
        }
    }
}

export default SocialActivityController