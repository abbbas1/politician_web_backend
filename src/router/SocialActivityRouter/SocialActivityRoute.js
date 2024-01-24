import { Router } from "express";
import SocialActivityController from "../../controller/Social_Activity/SocialActivityCont.js";
import socialCommentController from "../../controller/Social_Activity/socialCommentCont.js";
import upload from "../../middleware/multer/multerConfig.js";

const SocialActivityRouter = Router()

SocialActivityRouter.post("/add",upload.single('image') ,SocialActivityController.AddActivity)
SocialActivityRouter.put("/update/:id", SocialActivityController.Update)
SocialActivityRouter.delete("/delete/:id", SocialActivityController.Delete)
SocialActivityRouter.get("/getone/:id", SocialActivityController.getOnlyOne)
SocialActivityRouter.get("/getall", SocialActivityController.getAllActivities)

SocialActivityRouter.put("/updatelikes/:activityId", SocialActivityController.UpdateLikes)

SocialActivityRouter.put("/addcomment/:id", socialCommentController.addComment)

export default SocialActivityRouter;