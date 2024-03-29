import { Router } from "express";
import NewsController from "../../controller/News/NewsCont.js";
import NewsCommentController from "../../controller/News/NewsCommentCont.js";
import upload from "../../middleware/multer/multerConfig.js";


const NewsRouter =Router()

NewsRouter.post("/:model/add",upload.single('image'),NewsController.NewsUpload)
NewsRouter.delete("/delete/:id",NewsController.Delete)
NewsRouter.put("/update/:id",NewsController.Update)
NewsRouter.put("/updatelikes/:newsId",NewsController.UpdateLikes)
NewsRouter.get("/getone/:id",NewsController.getOnlyOne)
NewsRouter.get("/getall",NewsController.getAllNews)

NewsRouter.post("/comment/:id",NewsCommentController.addComment)


export default NewsRouter;