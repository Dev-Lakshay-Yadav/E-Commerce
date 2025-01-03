import bcrypt from "bcryptjs";
import jwt, { decode } from "jsonwebtoken";
import User from "../../models/User.js";

// register controller
// export like this
export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    // Agar user already exist karta hai to ye message dikhao
    if (checkUser) {
      return res.json({
        success: false,
        message: "User Already exixts with the same email! Please try again",
      });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Regiatration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// login controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body; // form se data lena
  try {
    const checkUser = await User.findOne({ email }); //database mein data compare karna
    // Agar user exist nhi karta hai to ye message dikhao
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exists Please register first",
      });
    }
    // agar user exist karta hai but uska password galat hai to ye meassage dikhao
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect Password! Please try again",
      });
    }

    // ab hamari credentials bilkul shi hai to hum token create karege
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    ); // this secret key is used to parse the token and token gets expires in 60 minutes

    // Token ko cookie mein set kar diya
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in Successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// logout
export const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged Out Successfully",
  });
};

// auth middleware
export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};
