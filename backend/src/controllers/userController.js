import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

export const registerUser = asyncHandler(async(req, res) => {
  const {fullName, emailAddress, password } = req.body;
  
  if (!fullName || !emailAddress || !password) {
      res.status(400)
      throw new Error('Please add required fields')
  }
  
  //check if user exist
  const userExists = await User.findOne({emailAddress})
  if (userExists) {
      res.status(400)
      throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

   // create user
   const user = await User.create({
    fullName,
    emailAddress,
    password: hashedPassword
})

if (user) {
    res.status(201).json({
        _id: user.id,
        fullName: user.fullName,
        emailAddress: user.emailAddress,
        token: generateToken(user._id)
    })
} else {
    res.status(400)
    throw new Error('Invalid user data')
}
})


//Authentication

export const loginUser = asyncHandler(async(req, res) => {
  const { emailAddress, password } = req.body
  
  // check for user emailAddress
  const user = await User.findOne({ emailAddress })
  
  if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        fullName: user.fullName,
        emailAddress: user.emailAddress,
        token: generateToken(user._id),
      });
  } else {
       res.status(400);
       throw new Error("Invalid Email or Password");
  }
})

// @desc    Get user data
// @route   GET /users/me
// @access  Private

export const getMe = asyncHandler(async(req, res) => {
  const { _id, fullName, emailAddress } = await User.findById(req.user.id)
  
  res.status(200).json({
      id: _id,
      fullName,
      emailAddress
  })
})

// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    let users = await User.find();

    if (users.length === 0) {
      return res.status(200).json({
        message: "There are no users in the database",
        status: "success",
      });
    }

    return res.status(200).json({
      message: "operation successful",
      status: "success",
      data: users,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal service error, could not fetch data",
      status: "failed",
    });
  }
});

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
}

