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
        res
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
      res.json({ message: "Member Registered" });
    } catch (err) {
      res.status(400).json({
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
  login: async (req, res) => {
    try {
      const { memberEmail, password } = req.body;
      const Member = await MemberModel.findOne({
        where: {
          memberEmail,
        },
      });
      if (!Member) {
        res.status(400).json({ message: "invalid Email" });
      }
      const ComparePassword = await compare(password, Member.password);
      if (!ComparePassword) {
        res.status(400).json({ message: "invalid Password" });
      }
      const Data = {
        id: Member.id,
        email: Member.memberEmail,
        test: "test",
      };
      const token = Jwt.sign(Data, process.env.JWT_SECRET, {
        expiresIn: "10d",
      });
      // console.log(token)
      req.session.membertoken = token;
      req.session.member = Member;
      req.session.save();
      return res.status(200).json({ message: "Loged in succesfully" });
    } catch (err) {
      res
        .status(404)
        .json({ message: "Something bad happened in login.", err });
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
