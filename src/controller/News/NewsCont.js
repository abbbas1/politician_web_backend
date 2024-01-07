import NewsModel from "../../model/News/News.js";
import NewsCommmentModel from "../../model/News/NewsComment.js";

const NewsController = {
    NewsUpload:async(req,res)=>{
        try {
            const{newsTittle,newsContent}=req.body
            const{path}=req.file
            const news = await NewsModel.create({
                newsTittle,
                newsContent,
                newsPicture:path,
                adminId: req.session.admin.id,  
                memberId: req.session.member.id,
            }) 
            res.status(200).json({message:"News uploaded",news})
        } catch (error) {
            res.status(404).json({message:"Something bad happened in news upload.",error})
        }
    },
    Update:async(req,res)=>{
        try {
          const{id}=req.params
          const{newsTittle,newsContent,newsPicture}=req.body
            const News = await NewsModel.findOne({
                where:{id}
            })
            if(News){
                News.newsTittle=newsTittle
                News.newsContent=newsContent
                News.newsPicture=newsPicture
                News.save(res.json({message:"News updated",News}))
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
            const{newsId}=req.params
            const likes = await NewsModel.findOne({
                where:{id:newsId}
            })
            if(!likes){
                res.status(400).json({message:"News Id does'nt exist try a valid Id"})
            }else{
                await NewsModel.update({totalLikes},{where:{id:newsId}})
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
            const news = await NewsModel.findOne({
                where:{id}
            })
            if(news){
                news.destroy(res.json({message:"news deleted successfully"}))
            }else{
                res.status(400).json({message:"news not found"})
            }
        } catch (error) {
            res.status(404).json({message:"Something bad happened in news deletion."})
        }
    },
    getAllNews:async(req,res)=>{
        try {
            const news = await NewsModel.findAll({
                include:[NewsCommmentModel]
            })
            res.status(200).json({message:"All news found",news})
        } catch (error) {
            res.status(404).json({message:"Something bad happened in fetching all news.",error})
        }
    },
    getOnlyOne:async(req,res)=>{
        try {
            const{id}=req.params
            const news =  await NewsModel.findByPk(id,{
                include:[NewsCommmentModel]
            })
            if(news){
                res.status(200).json({message:"news found",news}) 
            }else{
                 res.status(400).json({message:"news not found"})
            }
        } catch (error) {
            
        }
    }
}

export default NewsController;