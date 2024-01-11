import AdminModel from "../../model/Admin/Admin.js";
import EventsModel from "../../model/Events/Events.js";
import NewsModel from "../../model/News/News.js";
import NewsCommmentModel from "../../model/News/NewsComment.js";
import SocialActivityModel from "../../model/Social_Activity/Social_Activity.js";
import SocialCommmentModel from "../../model/Social_Activity/Comment.js";
import Jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";

const AdminContoller = {
  Register: async (req, res) => {
    const { path } = req.file;
    try {
      const {
        adminName,
        adminEmail,
        password,
        adminPhoneNumber,
        adminAddress,
        adminCnic,
      } = req.body;
      const Admin = await AdminModel.findOne({
        where: {
          adminEmail,
        },
      });
      if (Admin) {
        res
          .status(400)
          .json({ message: `${adminEmail} is already exist try another one.` });
      }
      const hPassword = await hash(password, 10);
      await AdminModel.create({
        adminName,
        adminEmail,
        password: hPassword,
        adminPicture: path,
        adminPhoneNumber,
        adminAddress,
        adminCnic,
      });
      res.json({ message: "Admin Registered" });
    } catch (err) {
      res.status(400).json({
        message: "SOmething bad happening in admin Registration." + err,
      });
    }
  },
  // Delete: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const Admin = await AdminModel.findOne({
  //       where: { id },
  //     });
  //     if (!Admin) {
  //       res.status(400).json({ message: "admin not found for Deletion." });
  //     } else {
  //       Admin.destroy(res.json({ message: "Admin Deleted." }));
  //     }
  //     // res.json({ Admin });
  //   } catch (err) {
  //     res
  //       .status(404)
  //       .json({ message: "something bad happened in Admin Deletion.", err });
  //   }
  // },
  Update: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        adminName,
        adminEmail,
        password,
        adminPicture,
        adminPhoneNumber,
        adminAddress,
        adminCnic,
      } = req.body;
      const Admin = await AdminModel.findOne({
        where: { id },
      });
      const hPassword = await hash(password, 10);
      if (!Admin) {
        res.status(400).json({ message: "Admin not found for Updation." });
      } else {
        Admin.adminName = adminName;
        Admin.adminEmail = adminEmail;
        Admin.password = hPassword;
        Admin.adminPicture = adminPicture;
        Admin.adminPhoneNumber = adminPhoneNumber;
        Admin.adminAddress = adminAddress;
        Admin.adminCnic = adminCnic;
        Admin.save(res.json({ message: "Admin updated." }));
      }
    } catch (err) {
      res
        .status(404)
        .json({ message: "something bad happened in Admin Updation." });
    }
  },
  login: async (req, res) => {
    try {
      const { adminEmail, password } = req.body;
      const Admin = await AdminModel.findOne({
        where: {
          adminEmail,
        },
      });
      if (!Admin) {
        return res.status(400).json({ message: "invalid Email" });
      }
      const ComparePassword = await compare(password, Admin.password);
      if (!ComparePassword) {
        return res.status(400).json({ message: "invalid Password" });
      }
      const Data = {
        id: Admin.id,
        email: Admin.adminEmail,
        test: "test",
      };
      const token = Jwt.sign(Data, process.env.JWT_SECRET, {
        expiresIn: "10d",
      });
      // console.log(token)
      req.session.admintoken = token;
      req.session.admin = Admin;
      req.session.save();
      return res.status(200).json({ message: "Loged in succesfully" });
    } catch (err) {
      return res
        .status(404)
        .json({ message: "Something bad happened in login.", err });
    }
  },
  getAll: async (req, res) => {
    try {
      const admins = await AdminModel.findAll({
        include: [
          { model: EventsModel },
          { model: NewsModel, include: [NewsCommmentModel] },
          { model: SocialActivityModel, include: [SocialCommmentModel] },
        ],
      });
      res.json({ admins });
    } catch (error) {
      res
        .status(400)
        .json({ message: "something bad happened in fetching admins" });
      console.log(error);
    }
  },
};

export default AdminContoller;
