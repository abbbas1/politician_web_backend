import { Router } from "express";
import EventsController from "../../controller/Events/EventsCont.js";
import EventsValidator from "../../validator/Events/EventsValidator.js";
import upload from "../../middleware/multer/multerConfig.js";

const EventsRouter = Router()

EventsRouter.post("/add",upload.single('image'),EventsValidator.create,EventsController.AddEvent)
EventsRouter.put("/update/:id",EventsValidator.create,EventsController.update)
EventsRouter.delete("/delete/:id",EventsController.delete)
EventsRouter.get("/getall",EventsController.getAll)
EventsRouter.get("/getone/:id",EventsController.getOnlyOne) 

export default EventsRouter;