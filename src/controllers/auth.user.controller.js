import jwt from "jsonwebtoken";

import UserModel from "../models/auth.user.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await UserModel.find({}).select(["-password"]);
  return res.status(200).json(new ApiResponse(200, allUsers, "OK"));
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  return res.status(200).json(new ApiResponse(200, user, "OK"));
});

const signup = asyncHandler(async (req, res) => {
  const { name, mobile, email, username, password, location } = req.body;

  const userExists = await UserModel.findOne({
    $or: [{ email }, { username }, { mobile }],
  });
  if (userExists) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await UserModel.create({
    name,
    mobile,
    email,
    username,
    password,
    location,
  });

  const token = user.generateAccessToken();
  return res.status(201).json(new ApiResponse(201, { token }, "OK"));
});

const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    throw new ApiError(403, "Invalid email or password");
  }
  const user = await UserModel.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(403, "Invalid email or password");
  }

  const token = user.generateAccessToken();

  return res.status(200).json(new ApiResponse(200, { token }, "OK"));
});

export { getAllUsers, getUserById, signup, signin };
