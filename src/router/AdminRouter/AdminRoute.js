import { Router } from "express";
import AdminValidator from "../../validator/AdminValidator.js";
import AdminContoller from "../../controller/Admin/AdminCont.js";
import upload from "../../middleware/multer/multerConfig.js";
const AdminRouter = Router();

AdminRouter.post("/:model/register" , upload.single('image'), AdminValidator.create, AdminContoller.Register);
// AdminRouter.delete("/delete/:id", AdminContoller.Delete);
AdminRouter.put("/update/:id", AdminValidator.create, AdminContoller.Update);
AdminRouter.post("/login", AdminContoller.login);
AdminRouter.get("/getall", AdminContoller.getAll);

export default AdminRouter
