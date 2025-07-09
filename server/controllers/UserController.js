const generateToken = require("../configs/token");
const { uploadFile } = require("../configs/uploadfile");
const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, city, state, phone } = req.body;

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
      phone,
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

    res.status(200).json({ message: "User login successfully", user, token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
    console.log("error in login : ", error);
  }
};

exports.checkAuth = async (req, res) => {
  res.json({ message: "User is authenticated", user: req.user });
};

exports.updateProfilePic = async (req, res) => {
  console.log("req.files : ", req.files);
  try {
    const userId = req.user._id; // assuming you're using auth middleware
    const file = req.files?.profilePic;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const uploadedUrls = await uploadFile(file);

    if (uploadedUrls.length === 0) {
      return res.status(500).json({ message: "Upload failed." });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { profilePic: uploadedUrls[0] },
      { new: true }
    );

    res.status(200).json({
      message: "Profile picture updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile pic:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const { name, city, state, phone } = req.body;
    const { id } = req.params;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        name,
        phone,
        city,
        state,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Profile updated successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error in editProfile : ", error);
  }
};
