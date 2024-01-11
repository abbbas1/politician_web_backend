import { Router } from "express";
import MemberController from "../../controller/Member/MemberCont.js";
import MemberValidator from "../../validator/MemberValidator.js";

const MemberRouter = Router();

MemberRouter.post("/register", MemberValidator.create, MemberController.Register);
MemberRouter.delete("/delete/:id", MemberController.Delete);
MemberRouter.put("/update/:id", MemberValidator.create, MemberController.Update);
MemberRouter.post("/login", MemberController.login);
MemberRouter.get("/getall", MemberController.getAll);
MemberRouter.get("/getone/:id", MemberController.getOnlyOne);

export default MemberRouter;
