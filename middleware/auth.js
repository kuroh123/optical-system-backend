import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, "authenticatingopticalsystem");
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

export default authMiddleware;
