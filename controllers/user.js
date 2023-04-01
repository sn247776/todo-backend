import { User } from "../models/user.js";
import bcrypt from "bcrypt";
export const getAllUsers = async (req, res) => {
    const users = await User.find({});
    const keyword = req.query.keyword;
    console.log(keyword);
    res.json({
      success: true,
      users,
    });
  }

  export const login = async (req, res) => {}

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) return res.status(404).json({
    success: false,
    message: "User Already Exist"
  });

  const hashedPassword = await bcrypt.hash(password, 10);
  
  await User.create({ name, email, password: hashedPassword });
  
  res.status(201).json({
    success: true,
    message: "Registerd Successfully"
  })
  }

  export const getUserDetails = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json({
      success: true,
      user,
    });
  }