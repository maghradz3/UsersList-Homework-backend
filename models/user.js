import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, requeired: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: [String], default: ["user"] },
  registrationTime: { type: Date, default: Date.now },
  lastLoginTime: { type: Date },
  status: { type: [String], default: ["Active"] },
});

export const User = mongoose.model("User", userSchema);
