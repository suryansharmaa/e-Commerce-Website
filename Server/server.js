import express from "express";
import mongoose from "mongoose";

import cookieParser from "cookie-parser";
import cors from "cors";

// Connecting to the Database
mongoose
  .connect(
    "mongodb+srv://bitofsol:mongoDBpassword@learningmern.ou9gf.mongodb.net/"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173/",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.listen(PORT, () => console.log(`Server is now running at port ${PORT}`));
