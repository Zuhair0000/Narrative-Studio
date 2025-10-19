const pool = require("./db");

(async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Connected to Supabase:", result.rows[0]);
  } catch (err) {
    console.error("❌ Database connection error:", err);
  } finally {
    pool.end();
  }
})();
