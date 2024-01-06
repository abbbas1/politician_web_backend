import Joi from "joi";

const ConstituencyValidator={
    create:(req,res,next)=>{
        try{
            const body=req.body
        const schema=Joi.object({
            constituencyName:Joi.string().min(2).max(50).required(),
            constituencyAddress:Joi.string().min(2).max(50).required(),

        })
        const{error,value}=schema.validate(body)
        if(error){
            return res.status(400).json({ message:"Please provide valid information.",error })
        }
        next()
        }catch(error){
            return res.status(500).json({ message:"something bad happeing constituency Validaton.",error })
        }
    }
}


export default ConstituencyValidator 