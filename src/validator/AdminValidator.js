import Joi from "joi";
import AdminModel from "../model/Admin/Admin.js";
const AdminValidator = {
  create: async (req, res, next) => {
    try {
      const body = req.body;
      const schema = Joi.object({
        adminName: Joi.string().min(2).max(50).required(),
        adminEmail: Joi.string().email().min(2).max(50).required(),
        password: Joi.string().min(2).max(50).required(),
        adminPhoneNumber: Joi.string().min(2).max(50).required(),
        adminAddress: Joi.string().min(2).max(50).required(),
        adminCnic: Joi.string().min(13).max(15).required(),
      });
      const { error, value } = schema.validate(body);
      if (error) {
        return res
          .status(400)
          .json({ message: "Please provide valid information.", error });
      }
      next();
    } catch (error) {
        console.log(error);
      return res
        .status(500)
        .json({ message: "something bad happeing Admin Validaton.", error });
    }
  },
};

export default AdminValidator;
