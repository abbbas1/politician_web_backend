import { Router } from "express";
import AdminValidator from "../../validator/AdminValidator.js";
import AdminContoller from "../../controller/Admin/AdminCont.js";
const AdminRouter = Router();

AdminRouter.post("/register", AdminValidator.create, AdminContoller.Register);
// AdminRouter.delete("/delete/:id", AdminContoller.Delete);
AdminRouter.put("/update/:id", AdminValidator.create, AdminContoller.Update);
AdminRouter.post("/login", AdminContoller.login);

export default AdminRouter;
