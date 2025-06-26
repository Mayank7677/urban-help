const generateToken = require("../configs/token");
const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, city, state } = req.body;

    const checkUser = await userModel.findOne({ email });

    if (checkUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      city,
      state,
    });

    const token = await generateToken(email);

    res.status(201).json({ message: "User created successfully", user, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });

    console.log("error in signup : ", error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUser = await userModel.findOne({ email });

    if (!checkUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, checkUser.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = await generateToken(email);

    const user = {
      name: checkUser.name,
      email: checkUser.email,
      role: checkUser.role,
      city: checkUser.city,
      state: checkUser.state,
    };

    res
      .status(200)
      .json({ message: "User login successfully", user, token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
    console.log("error in login : ", error);
  }
};

exports.checkAuth = async (req, res) => {
  res.json({ message: "User is authenticated", user: req.user });
};
