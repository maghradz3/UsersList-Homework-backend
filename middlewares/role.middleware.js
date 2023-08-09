export const roleMiddleware = async (req, res, next) => {
  let role = req.user.role;
  if (!role.includes("user")) {
    res.status(403).json({ message: "You are not authorized for this route!" });
    return;
  }

  next();
};
