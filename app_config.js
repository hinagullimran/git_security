// app_config.js - Demonstrating safe configuration management
require('dotenv').config();

const config = {
  // ✅ Correct way: use environment variables
  apiKey: process.env.API_KEY,
  dbUrl: process.env.DATABASE_URL,
  debug: process.env.DEBUG === 'true'
};

if (!config.apiKey) {
  console.error("❌ ERROR: API_KEY is missing. Please check your .env file.");
} else {
  console.log("✅ Config successfully loaded using environment variables.");
}

module.exports = config;
