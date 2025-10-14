const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const db = require("./db");
const authRouter = require("./routes/authRoutes");
const StoryRoutes = require("./routes/storyRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/stories", StoryRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
