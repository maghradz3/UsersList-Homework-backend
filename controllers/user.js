import { User } from "../models/user.js";
import { generateToken } from "../utils/generateTOken.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const {
    firstName: reqFirstName,
    lastName: reqLastName,
    email,
    password,
  } = req.body;

  try {
    const emailExists = await User.find({
      email,
    });
    if (emailExists.length) {
      throw new Error("email already exists");
    }
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser && existingUser.status.includes("Blocked")) {
      throw new Error(
        "Registration is not allowed for this email as the account status is Blocked"
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName: reqFirstName,
      lastName: reqLastName,
      email,
      password: hashedPassword,
      registrationTime: new Date(),
    });
    newUser.registrationTime = Date.now();
    const savedUser = await newUser.save();
    const { _id, firstName, lastName, role, status } = newUser;
    const { token, refreshToken } = generateToken(
      { _id, firstName, lastName, role, status },
      "50m",
      "7d"
    );
    return res.status(200).json({
      message: "Registered Succesfully!",
      token,
      refreshToken,
      user: savedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const {
      _id,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    } = existingUser;
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (isPasswordValid) {
      existingUser.lastLoginTime = Date.now();
      await existingUser.save();
      const { token, refreshToken } = generateToken(
        { _id, firstName, lastName, role },
        "50m",
        "7d"
      );
      return res.status(200).json({
        message: "logged in successfully",
        token,
        refreshToken,
        user: existingUser,
      });
    } else {
      return res.status(422).json({ message: "Password Or Email is invalid" });
    }
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};

export const getMainUsers = async (req, res) => {
  try {
    const mainUsers = await User.find({});

    return res.status(200).json({
      message: "Users retrived succesfuly",
      users: mainUsers,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", users: [] });
  }
};

export const getUserInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    return res.json({ user, message: "user retrieved successfully" });
  } catch (error) {
    return res.status(404).json({ message: "user not found", user: null });
  }
};

export const refreshToken = async (req, res) => {
  const { refresh_token } = req.body;

  try {
    const user = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
    if (!!user) {
      const { _id, role, firstName, lastName } = user;
      const { token } = generateToken(
        { _id, firstName, lastName, role },
        "50m",
        "7d"
      );
      res.json({ message: "token refreshed successfully", token });
    }
  } catch (err) {
    res.status(500).json({ message: "something went wrong", err });
  }
};

export const deleteUser = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const UserExists = await User.exists({ _id });
    if (UserExists) {
      await User.findByIdAndRemove(_id);

      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res
        .status(404)
        .json({ message: `User with id of ${_id} does not exists` });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const blockUser = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.status = user.status[0] === "Active" ? ["Blocked"] : ["Blocked"];
    await user.save();
    return res.json({ message: "Status updated successfully", user });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const unBlockUser = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.status = user.status[0] === "Blocked" ? ["Active"] : ["Active"];
    await user.save();
    return res.json({ message: "Status updated successfully", user });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
