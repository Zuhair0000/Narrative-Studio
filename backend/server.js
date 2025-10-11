const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./db");
const authRouter = require("./routes/authRoutes");

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
