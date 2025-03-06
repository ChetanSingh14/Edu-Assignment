const mysql = require("mysql2");

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,        // Correct host
  user: process.env.DB_USER,        // Your MySQL username
  password: process.env.DB_PASSWORD,// Your MySQL password
  database: process.env.DB_NAME,    // Your database name
  port: process.env.DB_PORT,        // Correct port
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Check connection
pool.getConnection((err, conn) => {
  if (err) {
    console.error("❌ Database Connection Failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL Database");
  conn.release(); // Release the connection back to the pool
});

// Export the promise-based pool
module.exports = pool.promise();
