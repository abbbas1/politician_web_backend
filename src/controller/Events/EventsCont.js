import EventsModel from "../../model/Events/Events.js";

const EventsController = {
  AddEvent: async (req, res) => {
    try {
      const{eventTittle, eventDescription, eventDate}=req.body;
      const{path}=req.file
      await EventsModel.create({
        eventTittle,
        eventDescription,
        eventPicture:path,
        eventDate,
        adminId: req.session.admin.id,
        memberId: req.session.member.id
      });
      res.status(200).json({ message: "Event added" });
    } catch (error) {
      res
      .status(404)
        .json({ message: "Something bad happened in Event addition", error });
        // console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const Event = await EventsModel.findOne({
        where: { id },
      });
      if (Event) {
        Event.destroy(res.json({ message: "Event deleted successfully." }));
      } else {
        res.status(400).json({ message: "Event not found for deletion" });
      }
    } catch (error) {
      res
        .status(404)
        .json({ message: "Something bad happened in Event deletion" });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const {eventTittle, eventDescription, eventPicture, eventDate}=req.body;
      const Event = await EventsModel.findOne({
        where: { id },
      });
      if (Event) {
        Event.eventTittle = eventTittle;
        Event.eventDescription = eventDescription;
        Event.eventPicture = eventPicture;
        Event.eventDate = eventDate;
        Event.save(res.json({ message: "Event updated successfully." }));
      } else {
        res.status(400).json({ message: "Event not found for updation" });
      }
    } catch (error) {
      res
        .status(404)
        .json({ message: "Something bad happend in Event updation." });
    }
  },
  getAll:async(req,res)=>{
    try {
        const Event = await EventsModel.findAll({})
        res.status(200).json({message:"Events Found",Event})
    } catch (error) {
        res.status(404).json({message:"Something bad happened in fetching events.",error})
    }
  },
  getOnlyOne:async(req,res)=>{
    try {
        const{id}=req.params
        const Event = await EventsModel.findOne({
            where:{id}
        })
        if(Event){
            res.status(200).json({message:"Event found",Event})
        }else{
            res.status(400).json({message:"Event not found"})
        }
    } catch (error) {
        res.status(404).json({message:"Something bad happened in Event found."})
    }
  }
};

export default EventsController;
