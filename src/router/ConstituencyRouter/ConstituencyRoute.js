import { Router } from "express";
import ConstituenController from "../../controller/Constituency/ConstituenCont.js";
import ConstituencyValidator from "../../validator/Constituency/ConstituencyValidator.js";

const ConstituencyRouter = Router();

ConstituencyRouter.post("/create", ConstituencyValidator.create, ConstituenController.create);
ConstituencyRouter.put("/update/:id", ConstituencyValidator.create, ConstituenController.update);
ConstituencyRouter.get("/getall", ConstituenController.getAll);
ConstituencyRouter.get("/getone/:id", ConstituenController.getOnlyOne);

export default ConstituencyRouter;
