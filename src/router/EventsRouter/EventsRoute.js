import { Router } from "express";
import EventsController from "../../controller/Events/EventsCont.js";
import EventsValidator from "../../validator/Events/EventsValidator.js";


const EventsRouter = Router()

EventsRouter.post("/add",EventsValidator.create,EventsController.AddEvent)
EventsRouter.put("/update/:id",EventsValidator.create,EventsController.update)
EventsRouter.delete("/delete/:id",EventsController.delete)
EventsRouter.get("/getall",EventsController.getAll)
EventsRouter.get("/getone/:id",EventsController.getOnlyOne) 

export default EventsRouter;