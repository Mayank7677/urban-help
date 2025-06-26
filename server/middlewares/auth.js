const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModel");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "No token, access denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.email) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User - Invalid Payload",
      });
    }

    const user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("error in auth middleware:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
