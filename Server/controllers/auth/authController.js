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
        userName: checkUser.userName,
      },
      process.env.CLIENT_SECRET_KEY || "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
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

// Logout

export function logoutUser(req, res) {
  res.clearCookie("token").json({
    success: "true",
    message: "Logged out Successfully!",
  });
}

// Auth MiddleWare

export async function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized User!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized User!",
    });
  }
}
