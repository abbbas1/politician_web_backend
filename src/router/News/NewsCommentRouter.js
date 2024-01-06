import { Router } from "express";
import NewsCommentController from "../../controller/News/NewsCommentCont.js";


const NewsCommentRouter = Router()

NewsCommentRouter.post("/add",NewsCommentController.addComment)


export default NewsCommentRouter;