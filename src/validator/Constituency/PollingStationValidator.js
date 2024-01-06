import Joi from "joi";

const PollingStationValidator={
    create:(req,res,next)=>{
        try{
            const body=req.body
        const schema=Joi.object({
            PollingStationName:Joi.string().min(2).max(50).required(),
            PollingStationAddress:Joi.string().email().min(2).max(50).required(),
            agentName:Joi.string().min(2).max(50).required(),
            agentCnic:Joi.string().min(13).max(15).required(),
            agentPhoneNumber:Joi.string().min(2).max(50).required(),
        })
        const{error,value}=schema.validate(body)
        if(error){
            return res.status(400).json({ message:"Please provide valid information.",error })
        }
        next()
        }catch(error){
            return res.status(500).json({ message:"something bad happeing Polling station's Validaton.",error })
        }
    }
}


export default PollingStationValidator 