import MemberModel from "../../model/Member/Member.js";
import EventsModel from "../../model/Events/Events.js";
import NewsModel from "../../model/News/News.js";
import NewsCommmentModel from "../../model/News/NewsComment.js";
import SocialActivityModel from "../../model/Social_Activity/Social_Activity.js";
import SocialCommmentModel from "../../model/Social_Activity/Comment.js";
import Jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";

const MemberController = {
  Register: async (req, res) => {
    try {
      const{path}=req.file
      const {
        memberName,
        memberEmail,
        password,
        memberPhoneNumber,
        memberAddress,
        memberCnic,
      } = req.body;
      const member = await MemberModel.findOne({
        where: {
          memberEmail,
        },
      });
      if (member) {
       return res
          .status(400)
          .json({
            message: `${memberEmail} is already exist try another one.`,
          });
      }
      const hPassword = await hash(password, 10);
      await MemberModel.create({
        memberName,
        memberEmail,
        password: hPassword,
        memberPicture:path,
        memberPhoneNumber,
        memberAddress,
        memberCnic,
      });
     return res.json({ message: "Member Registered" });
    } catch (err) {
     return res.status(400).json({
        message: "SOmething bad happening in Member Registration." + err,
      });
    }
  },
  Delete: async (req, res) => {
    try {
      const { id } = req.params;
      const Member = await MemberModel.findOne({
        where: { id },
      });
      if (!Member) {
        res.status(400).json({ message: "Member not found for Deletion." });
      } else {
        Member.destroy(res.json({ message: "Member Deleted." }));
      }
      // res.json({ Member });
    } catch (err) {
      res
        .status(404)
        .json({ message: "something bad happened in Member Deletion.", err });
    }
  },
  Update: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        memberName,
        memberEmail,
        password,
        memberPicture,
        memberPhoneNumber,
        memberAddress,
        memberCnic,
      } = req.body;
      const Member = await MemberModel.findOne({
        where: { id },
      });
      const hPassword = await hash(password, 10);
      if (!Member) {
        res.status(400).json({ message: "Member not found for Updation." });
      } else {
        Member.memberName = memberName;
        Member.memberEmail = memberEmail;
        Member.password = hPassword;
        Member.memberPicture = memberPicture;
        Member.memberPhoneNumber = memberPhoneNumber;
        Member.memberAddress = memberAddress;
        Member.memberCnic = memberCnic;
        Member.save(res.json({ message: "Member updated." }));
      }
    } catch (err) {
      res
        .status(404)
        .json({ message: "something bad happened in Member Updation." });
    }
  },
   login : async (req, res) => {
    try {
      const { memberEmail, password } = req.body;
      const Member = await MemberModel.findOne({
        where: {
          memberEmail,
        },
      });
  
      if (!Member) {
        return res.status(400).json({ message: "Invalid Email" });
      }
  
      const comparePassword = await compare(password, Member.password);
  
      if (!comparePassword) {
        return res.status(400).json({ message: "Invalid Password" });
      }
  
      const data = {
        id: Member.id,
        email: Member.memberEmail,
        test: "test",
      };
  
      const token = Jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "10d",
      });
  
      req.session.membertoken = token;
      req.session.member = Member;
      req.session.save();
  
      return res.status(200).json({ message: "Logged in successfully",Member});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something bad happened in login." });
    }
  },
  
  getAll: async (req, res) => {
    try {
      const Members = await MemberModel.findAll({
        include: [
          {model: EventsModel },
          {model:NewsModel, include: [NewsCommmentModel] },
          {model: SocialActivityModel, include: [SocialCommmentModel] },
        ],  
       });
      res.json({ Members });
    } catch (error) {
      res
        .status(400)
        .json({ message: "something bad happened in fetching Members" });
    }
  },
  getOnlyOne: async (req, res) => {
    const { id } = req.params;
    try {
      const Member = await MemberModel.findOne({
        where: { id },
        include: [
          {model: EventsModel },
          { model:NewsModel, include: [NewsCommmentModel] },
          {model: SocialActivityModel, include: [SocialCommmentModel] },
        ],
         });
      res.status(200).json({ message: "Member Found", Member });
    } catch (error) {
      res
        .status(404)
        .json({ message: "something bad happened in Member find", error });
    }
  },
};

export default MemberController;
