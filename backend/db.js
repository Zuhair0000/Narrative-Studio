// const mysql = require("mysql2/promise");
// const dotenv = require("dotenv");

// dotenv.config();

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// db.getConnection()
//   .then(() => console.log("MySQL Connected"))
//   .catch((err) => console.error("DB connection failed:", err.message));

// module.exports = db;

require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
