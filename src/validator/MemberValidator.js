import Joi from "joi";

const MemberValidator={
    create:(req,res,next)=>{
        try{
            const body=req.body
        const schema=Joi.object({
            memberName:Joi.string().min(2).max(50).required(),
            memberEmail:Joi.string().email().min(2).max(50).required(),
            password:Joi.string().min(2).max(50).required(),
            memberPicture:Joi.string().min(2).max(50).required(),
            memberPhoneNumber:Joi.string().min(2).max(50).required(),
            memberAddress:Joi.string().min(2).max(50).required(),
            memberCnic:Joi.string().min(13).max(15).required()
        })
        const{error,value}=schema.validate(body)
        if(error){
            return res.status(400).json({ message:"invalid credentials.",error })
        }
        next()
        }catch(error){
            return res.status(500).json({ message:"something bad happeing Member Validaton.",error })
        }
    }
}


export default MemberValidator 