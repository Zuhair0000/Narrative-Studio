const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const db = require("./db");
const authRouter = require("./routes/authRoutes");
const storyRoutes = require("./routes/storyRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_API_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/stories", storyRoutes);
app.use("/api/payments", paymentRoutes);

const PORT = process.env.DB_PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
