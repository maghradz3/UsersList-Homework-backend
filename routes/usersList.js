import express from "express";
import { getMainUsers } from "../controllers/userList.js";
// import { deleteUser } from "../controllers/userList.js";

const router = express();

router.get("/users", getMainUsers);
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.remove();

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
