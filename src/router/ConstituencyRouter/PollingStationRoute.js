import { Router } from "express";
import PollingStationController from "../../controller/Constituency/PollingStationCont.js";
import PollingStationValidator from "../../validator/Constituency/PollingStationValidator.js";



const PollingStationRouter = Router()

PollingStationRouter.post("/create",PollingStationValidator.create,PollingStationController.create)
PollingStationRouter.put("/update/:id",PollingStationValidator.create,PollingStationController.update)
PollingStationRouter.get("/getall",PollingStationController.getAll)
PollingStationRouter.get("/getone/:id",PollingStationController.getOnlyOne)


export default PollingStationRouter;