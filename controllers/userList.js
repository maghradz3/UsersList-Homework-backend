import { User } from "../models/user.js";

export const getMainUsers = async (req, res) => {
  const data = req.query;
  console.log(data);
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
