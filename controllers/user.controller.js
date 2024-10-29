import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    console.log("all field are required");
    return res.status(400).json({ msg: "All field are required" });
  }

  try {
    const hashPawword = await bcrypt.hash(password, 10);
    const response = await User.create({
      username,
      email,
      password: hashPawword,
    });

    res.status(200).json({ msg: "success", data: response });
  } catch (error) {
    console.log(error);
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("all field are required");
    return res.status(400).json({ msg: "All field are required" });
  }

  try {
    //user checking
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ msg: "email or password is incorrect" });

    //password comparing
    const ispassMatch = await bcrypt.compare(password, user.password);
    if (!ispassMatch)
      return res.status(400).json({ msg: "email or password is incorrect" });

    //jwt token

    const token = jwt.sign(
      {
        username: user.username,
        userId: user._id,
        email: user.email,
      },
      process.env.jwt_secret
    );

    return res
      .status(200)
      .json({ msg: "Your sucessfully logged in", token: token });
  } catch (error) {
    console.log(error);
  }
};

export { createUser, LoginUser };
