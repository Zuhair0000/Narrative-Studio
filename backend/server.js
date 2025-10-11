const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./db");

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
