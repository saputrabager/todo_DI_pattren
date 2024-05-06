const fs = require('fs');
require('dotenv').config();

module.exports = {
  "development": {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "database_development",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "postgres",
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    logging: false
  },
  "test": {
    username: process.env.DB_USER || "root",
    password: process.env.DB_TEST_PASSWORD || null,
    database: process.env.DB_TEST_NAME || "database_test",
    host: process.env.DB_TEST_HOST || "127.0.0.1",
    dialect: process.env.DB_TEST_DIALECT || "postgres",
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    logging: false
  },
  "production": {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    logging: true
  }
}
