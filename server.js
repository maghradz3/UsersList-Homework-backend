import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

// routes
import userRoutes from "./routes/user.js";
import userList from "./routes/userList.js";

dotenv.config();

const app = express();
app.use(cors());

// middlewares
// general middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

// WHY ARE SAME TOKENS GENERATED

// route middlewares
app.use("/users", userRoutes);
app.use("/userList", userList);

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`server running on PORT=${PORT}`);
    });
  } catch (err) {
    console.log("error while starting", err);
  }
})();
