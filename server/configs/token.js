const jwt = require("jsonwebtoken");

const generateToken = (email) => {
  try {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return token;
  } catch (error) {
    console.log("error in generate Token : ", error);
    return null;
  }
};

module.exports = generateToken;
