import AdminModel from "../../model/Admin/Admin.js";
import MemberModel from "../../model/Member/Member.js";
import NewsModel from "../../model/News/News.js";
import NewsCommmentModel from "../../model/News/NewsComment.js";

const NewsController = {
  NewsUpload: async (req, res) => {
    try {
      const { newsTittle, newsContent } = req.body;
      const { path } = req.file;
      const news = await NewsModel.create({
        newsTittle,
        newsContent,
        newsPicture: path,
        // adminId: req.session.admin.id,
        // memberId: req.session.member.id,
      });
      res.status(200).json({ message: "News uploaded", news });
    } catch (error) {
      res
        .status(404)
        .json({ message: "Something bad happened in news upload.", error });
      // console.log(error)
    }
  },
  Update: async (req, res) => {
    try {
      const { id } = req.params;
      const { newsTittle, newsContent, newsPicture } = req.body;
      const News = await NewsModel.findOne({
        where: { id },
      });
      if (News) {
        News.newsTittle = newsTittle;
        News.newsContent = newsContent;
        News.newsPicture = newsPicture;
        News.save(res.json({ message: "News updated", News }));
      } else {
        res.status(400).json({ message: "News not found" });
      }
    } catch (error) {
      res
        .status(404)
        .json({ message: "Something bad happened in news updation.", error });
    }
  },
  UpdateLikes: async (req, res) => {
    try {
      const { totalLikes } = req.body;
      const { newsId } = req.params;

      // Use direct update method in Sequelize
      const updatedRows = await NewsModel.update(
        { totalLikes },
        { where: { id: newsId } }
      );

      if (updatedRows[0] === 1) {
        res.status(200).json({ message: "Likes updated" });
      } else {
        res
          .status(400)
          .json({ message: "News Id doesn't exist or no rows were updated" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong in likes updation.", error });
    }
  },

  Delete: async (req, res) => {
    try {
      const { id } = req.params;
      const news = await NewsModel.findOne({
        where: { id },
      });
      if (news) {
        news.destroy(res.json({ message: "news deleted successfully" }));
      } else {
        res.status(400).json({ message: "news not found" });
      }
    } catch (error) {
      res
        .status(404)
        .json({ message: "Something bad happened in news deletion." });
    }
  },
  getAllNews: async (req, res) => {
    try {
      const news = await NewsModel.findAll({
        include: [{model:NewsCommmentModel},{model:AdminModel},{model:MemberModel}],
      });
      res.status(200).json({ message: "All news found", news });
    } catch (error) {
      res
        .status(404)
        .json({
          message: "Something bad happened in fetching all news.",
          error,
        });
    }
  },
  getOnlyOne: async (req, res) => {
    try {
      const { id } = req.params;
      const news = await NewsModel.findByPk(id, {
        include: [NewsCommmentModel],
      });
      if (news) {
        res.status(200).json({ message: "news found", news });
      } else {
        res.status(400).json({ message: "news not found" });
      }
    } catch (error) {}
  },
};

export default NewsController;
