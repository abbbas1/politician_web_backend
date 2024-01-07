import SocialCommmentModel from "../../model/Social_Activity/Comment.js";

const socialCommentController = {
  addComment: async (req, res) => {
    try {
      const { Comment } = req.body;
      const { id } = req.params;
      const comment = await SocialCommmentModel.create({
        Comment,
        socialActivityId: id,
      });
      res.status(200).json({ message: "Comment added", comment });
    } catch (error) {
      res
        .status(404)
        .json({ message: "Something bad happened in comment add", error });
    }
  },
};

export default socialCommentController;
