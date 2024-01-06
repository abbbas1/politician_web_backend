import Jwt from "jsonwebtoken";

const AdminAuthentication = (req, res, next) => {
  try {
    // let token = req.headers.authorization;
    // token = token.replace("Bearer ", "");
    // Jwt.verify(token, process.env.JWT_SECRET);
    // console.log(token)

    if (!req.session.user || !req.session.token) {
      return res.status(401).json({
        message: "invalid token",
      });
    }
    if (req.session.token !== token) {
      return res.status(401).json({
        message: "invalid token",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      message: "invalid request",error
    });
  }
};

export default AdminAuthentication;
