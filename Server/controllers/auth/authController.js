import bcrypt from "bcryptjs";
const { hash } = bcrypt;
import jwt from "jsonwebtoken";
import User from "../../models/user.js";

//Register

export default async function registerUser(req, res) {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ $or: [{ userName }, { email }] });
    if (checkUser) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists.",
      });
    }

    const hashPassword = await hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.error("Error during user registration:", e);
    res.status(500).json({
      success: false,
      message: "An error occurred during registration.",
      error: e.message,
    });
  }
}

// Login

export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );

    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
      process.env.CLIENT_SECRET_KEY || "CLIENT_SECRET_KEY",
      { expiresIn: "3000mins" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
      },
    });
  } catch (e) {
    console.error("Error during login:", e);
    res.status(500).json({
      success: false,
      message: "An error occurred during login.",
      error: e.message,
    });
  }
}
