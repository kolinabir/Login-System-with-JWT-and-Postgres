const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "jwtlogin",
  password: "1111",
  port: 5432,
});

module.exports = pool;
