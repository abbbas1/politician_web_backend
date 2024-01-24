import { Router } from "express";
import MemberController from "../../controller/Member/MemberCont.js";
import MemberValidator from "../../validator/MemberValidator.js";
import upload from "../../middleware/multer/multerConfig.js";

const MemberRouter = Router();


MemberRouter.post("/:model/register",upload.single("File"),MemberValidator.create, MemberController.Register);
MemberRouter.delete("/delete/:id", MemberController.Delete);
MemberRouter.put("/update/:id", MemberValidator.create, MemberController.Update);
MemberRouter.post("/login", MemberController.login);
MemberRouter.get("/getall", MemberController.getAll);
MemberRouter.get("/getone/:id", MemberController.getOnlyOne)

export default MemberRouter;
