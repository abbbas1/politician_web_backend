import NewsCommmentModel from "../../model/News/NewsComment.js";

const NewsCommentController = {
  addComment: async (req, res) => {
    try {
      const { Comments } = req.body;
      const{id}=req.params
      const comment = await NewsCommmentModel.create(
        {
            Comments,
            NewsId:id
        }
      )
      res.status(200).json({ message: "Comment added", comment });
    } catch (error) {
      res
        .status(404)
        .json({ message: "Something bad happened in comment add",error });
    }
  },
};

export default NewsCommentController;
