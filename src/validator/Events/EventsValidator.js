import Joi from "joi";

const EventsValidator={
    create:(req,res,next)=>{
        try{
            const body=req.body
        const schema=Joi.object({
            eventTittle:Joi.string().min(2).max(50).required(),
            eventDescription:Joi.string().min(2).max(50).required(),
            eventPicture:Joi.string().min(2).max(50).required(),
            eventDate:Joi.string().min(2).max(50).required(),
        })
        const{error,value}=schema.validate(body)
        if(error){
            return res.status(400).json({ message:"Please provide valid information.",error })
        }
        next()
        }catch(error){
            return res.status(500).json({ message:"something bad happeing Admin Validaton.",error })
        }
    }
}


export default EventsValidator 