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
