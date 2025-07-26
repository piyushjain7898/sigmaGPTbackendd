import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

// CORS config

app.use(cors({ origin: "*" }));

// Routes
app.use("/api", chatRoutes);

// Connect DB and start server
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Database!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect with DB:", err);
    process.exit(1);
  }
};

connectDB();
